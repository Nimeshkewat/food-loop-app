import type { Restaurant } from "./restaurant";
import type { Order } from "./order";
import type { User } from "./user";

//* Reviews
export interface Review {
  _id: string;
  user: User;
  restaurant: Restaurant;
  order: Order;
  foodRating: number;
  deliveryRating: number;
  comment: string;
}

export interface CreateReviewInputState {
  orderId: string;
  foodRating: number;
  deliveryRating: number;
  comment: string;
}

export interface CreateReviewResponse {
  success: boolean;
  message: string;
  review: Review;
}

export interface RestaurantReviewsResponse {
  success: boolean;
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}

export interface UpdateReviewInputState {
  reviewId: string;
  foodRating: number;
  deliveryRating: number;
  comment: string;
}

export interface UpdateReviewResponse {
  success: boolean;
  message: string;
  review: Review;
}

export interface DeleteReviewResponse {
  success: boolean;
  message: string;
}
