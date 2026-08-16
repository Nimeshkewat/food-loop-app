import mongoose, { Document, Model, Schema } from "mongoose";

export interface IReview {
  user: mongoose.Types.ObjectId;
  restaurant: mongoose.Types.ObjectId;
  order: mongoose.Types.ObjectId;
  foodRating: number;
  deliveryRating: number;
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IReviewDocument extends IReview, Document {}

const reviewSchema = new Schema<IReviewDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      unique: true, //* Prevents multiple reviews for the same order
    },
    foodRating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    deliveryRating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

//* Indexes for fast lookup on restaurant page
reviewSchema.index({ restaurant: 1, createdAt: -1 });

const Review: Model<IReviewDocument> =
  mongoose.models.Review ||
  mongoose.model<IReviewDocument>("Review", reviewSchema);

export default Review;
