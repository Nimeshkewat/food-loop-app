import mongoose, { Document } from "mongoose";

interface IMenu {
  restaurant: mongoose.Schema.Types.ObjectId;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface IMenuDocument extends IMenu, Document {
  createdAt: Date;
  updatedAt: Date;
}

const menuSchema = new mongoose.Schema<IMenuDocument>(
  {
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true },
);

const Menu = mongoose.models.Menu || mongoose.model("Menu", menuSchema);
export default Menu;
