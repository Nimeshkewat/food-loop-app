import express from "express";
import isAuthenticated from "../middlewares/auth.js";
import {
  createReview,
  getRestaurantReviews,
  updateReview,
} from "../controllers/reviewController.js";

const router = express.Router();

router.post("/", isAuthenticated, createReview);
router.get("/:restaurantId", getRestaurantReviews);
router.patch("/:reviewId", isAuthenticated, updateReview);
router.delete("/:reviewId", isAuthenticated, updateReview);

export default router;
