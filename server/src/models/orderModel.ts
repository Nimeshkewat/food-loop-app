import mongoose from "mongoose";

type DeliveryDetailsType = {
  name: string;
  email: string;
  address: string;
  city: string;
};

type CartItemsType = {
  menuId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

export interface IOrder extends Document {
  user: mongoose.Schema.Types.ObjectId;
  restaurant: mongoose.Schema.Types.ObjectId;
  deliveryDetails: DeliveryDetailsType;
  cartItems: CartItemsType[];
  totalAmount: number;
  status:
    | "pending"
    | "confirmed"
    | "preparing"
    | "outfordelivery"
    | "delivered";

  //! Razorpay specific fields
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  paymentStatus: "unpaid" | "paid" | "failed";
}

const orderSchema = new mongoose.Schema<IOrder>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    deliveryDetails: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      contact: { type: Number, required: true },
    },
    cartItems: [
      {
        menuId: { type: String, required: true },
        name: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "preparing",
        "outfordelivery",
        "delivered",
      ],
      default: "pending",
    },
    razorpayOrderId: {
      type: String,
      required: true,
    },
    razorpayPaymentId: String,
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid", "failed"],
      default: "unpaid",
    },
  },
  { timestamps: true },
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
