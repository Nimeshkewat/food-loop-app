import { Request, Response } from "express";
import crypto from "crypto";
import instance from "../config/razorpay.js";
import Order from "../models/orderModel.js";
import Review from "../models/reviewModel.js";

//* 1. CHECKOUT — called when the user clicks "Place Order" on the frontend.
//*    Creates a Razorpay order + a matching Mongo order (status: pending),
//*    then returns everything the frontend needs to open the Razorpay widget.
export const checkout = async (req: Request, res: Response) => {
  try {
    const { restaurantId, cartItems, deliveryDetails, totalAmount } = req.body;
    const { id } = req.user;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    //* Never trust a totalAmount sent from the client — recompute it here.
    // const totalAmount = cartItems.reduce(
    //   (sum: number, item: { price: number; quantity: number }) =>
    //     sum + item.price * item.quantity,
    //   0,
    // );

    //* Razorpay expects the amount in the smallest currency unit (paise for INR).
    const amountInPaise = Math.round(totalAmount * 100);

    const razorpayOrder = await instance.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    //* Create the order in our own DB in a "pending / unpaid" state.
    //* We only mark it confirmed once payment is verified/webhook fires.
    const newOrder = await Order.create({
      user: id,
      restaurant: restaurantId,
      deliveryDetails,
      cartItems,
      totalAmount,
      status: "pending",
      razorpayOrderId: razorpayOrder.id,
      paymentStatus: "unpaid",
    });

    return res.status(200).json({
      success: true,
      message: "Razorpay order created",
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key: process.env.RAZORPAY_KEY_ID, // public key, safe to expose to frontend
      dbOrderId: newOrder._id,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ success: false, message: errorMessage });
  }
};

//* 2. VERIFY — called by the frontend immediately after the Razorpay checkout
//*    modal succeeds. Razorpay hands back razorpay_order_id, razorpay_payment_id,
//*    and razorpay_signature — we recompute the signature ourselves to make
//*    sure the payment wasn't tampered with, then update the order.
//*   (This gives the user instant feedback; the webhook below is the
//*    authoritative confirmation in case this call never happens.)
export const verify = async (req: Request, res: Response) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, message: "Missing payment details" });
    }

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET as string)
      .update(body)
      .digest("hex");

    const isValid = expectedSignature === razorpay_signature;

    if (!isValid) {
      await Order.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        { paymentStatus: "failed" },
      );
      return res
        .status(400)
        .json({ success: false, message: "Payment verification failed" });
    }

    const order = await Order.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      {
        razorpayPaymentId: razorpay_payment_id,
        paymentStatus: "paid",
        status: "confirmed",
      },
      { returnDocument: "after" },
    );

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      orderId: order._id,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    console.log(errorMessage);
    res.status(500).json({ success: false, message: errorMessage });
  }
};

//* 3. WEBHOOK — Razorpay calls this directly (server-to-server), independent
//*    of the user's browser. This is what you should treat as the real
//*    source of truth for payment status. Requires the raw request body,
//*    so this route must use express.raw() instead of express.json()
//*    (see note below the code).
export const webhook = async (req: Request, res: Response) => {
  try {
    const signature = req.headers["x-razorpay-signature"] as string;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET as string)
      .update(req.body) //* raw buffer — see note below
      .digest("hex");

    if (expectedSignature !== signature) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid webhook signature" });
    }

    const event = JSON.parse(req.body.toString());

    if (event.event === "payment.captured") {
      const razorpayOrderId = event.payload.payment.entity.order_id;
      const razorpayPaymentId = event.payload.payment.entity.id;

      await Order.findOneAndUpdate(
        { razorpayOrderId },
        {
          razorpayPaymentId,
          paymentStatus: "paid",
          status: "confirmed",
        },
      );
    }

    if (event.event === "payment.failed") {
      const razorpayOrderId = event.payload.payment.entity.order_id;
      await Order.findOneAndUpdate(
        { razorpayOrderId },
        { paymentStatus: "failed" },
      );
    }

    //* Always acknowledge with 200, or Razorpay will keep retrying this webhook.
    return res.status(200).json({ success: true });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ success: false, message: errorMessage });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;
    const { orderId } = req.params;
    const order = await Order.findOne({ user: id, _id: orderId }).exec();

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ success: false, message: errorMessage });
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;
    const orders = await Order.find({ user: id })
      .populate("user restaurant")
      .sort({ createdAt: -1 })
      .exec();

    const orderIds = orders.map((order) => order._id);
    const reviews = await Review.find({ order: { $in: orderIds } }).exec();
    const reviewMap = new Map(reviews.map((r) => [r.order.toString(), r]));

    const ordersWithReviewFlag = orders.map((order) => {
      const review = reviewMap.get(order._id.toString());
      return {
        ...order.toObject(),
        hasReview: !!review,
        review: review || null,
      };
    });

    res.status(200).json({ success: true, orders: ordersWithReviewFlag });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ success: false, message: errorMessage });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { returnDocument: "after" },
    ).exec();

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Order status updated", order });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ success: false, message: errorMessage });
  }
};
