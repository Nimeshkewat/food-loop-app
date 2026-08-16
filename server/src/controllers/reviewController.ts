import { Request, Response } from "express";
import Review from "../models/reviewModel.js";
import Order from "../models/orderModel.js";

export const createReview = async (req: Request, res: Response) => {
  try {
    const { id: userId } = req.user;
    const { orderId, foodRating, deliveryRating, comment } = req.body;

    if (!orderId || !foodRating || !comment || !deliveryRating) {
      return res.status(400).json({
        success: false,
        message:
          "orderId, foodRating, deliveryRating, and comment are required",
      });
    }

    //* verify this order belongs to the user and is actually delivered
    const order = await Order.findOne({
      _id: orderId,
      user: userId,
      status: "delivered",
    }).exec();

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Delivered order not found for this user",
      });
    }

    //* prevent duplicate review (schema-level unique index also enforces this)
    const existingReview = await Review.findOne({ order: orderId }).exec();
    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this order",
      });
    }

    const review = await Review.create({
      user: userId,
      restaurant: order.restaurant,
      order: orderId,
      foodRating,
      deliveryRating,
      comment,
    });

    res.status(201).json({
      success: true,
      message: "Review submitted successfully",
      review,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ success: false, message: errorMessage });
  }
};

export const getRestaurantReviews = async (req: Request, res: Response) => {
  try {
    const { restaurantId } = req.params;

    const reviews = await Review.find({ restaurant: restaurantId })
      .populate("user", "fullname profilePicture")
      .sort({ createdAt: -1 })
      .exec();

    const averageRating =
      reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.foodRating, 0) / reviews.length
        : 0;

    res.status(200).json({
      success: true,
      reviews,
      averageRating: Number(averageRating.toFixed(1)),
      totalReviews: reviews.length,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ success: false, message: errorMessage });
  }
};

export const updateReview = async (req: Request, res: Response) => {
  try {
    const { id: userId } = req.user;
    const { reviewId } = req.params;
    const { foodRating, deliveryRating, comment } = req.body;

    const review = await Review.findOne({ _id: reviewId, user: userId }).exec();
    if (!review) {
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });
    }

    review.foodRating = foodRating ?? review.foodRating;
    review.deliveryRating = deliveryRating ?? review.deliveryRating;
    review.comment = comment ?? review.comment;
    await review.save();

    res.status(200).json({ success: true, message: "Review updated", review });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ success: false, message: errorMessage });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  try {
    const { id: userId } = req.user;
    const { reviewId } = req.params;

    const review = await Review.findOneAndDelete({
      _id: reviewId,
      user: userId,
    }).exec();

    if (!review) {
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });
    }

    res.status(200).json({ success: true, message: "Review deleted" });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ success: false, message: errorMessage });
  }
};
