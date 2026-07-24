import mongoose, { Document } from "mongoose";

interface ICart {
  user: mongoose.Schema.Types.ObjectId;
  restaurant: mongoose.Schema.Types.ObjectId;
  items: {
    menuId: mongoose.Schema.Types.ObjectId;
    name: string;
    image: string;
    price: number;
    quantity: number;
  }[];
}

interface ICartDocument extends ICart, Document {
  createdAt: string;
  updatedAt: string;
}

const cartSchema = new mongoose.Schema<ICartDocument>(
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
    items: [
      {
        menuId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Menu",
          required: true,
        },
        name: String,
        image: String,
        price: {
          type: Number,
          min: 1,
          default: 1,
          required: true,
        },
        quantity: {
          type: Number,
          min: 1,
          default: 1,
          required: true,
        },
      },
    ],
  },
  { timestamps: true },
);

const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);
export default Cart;
