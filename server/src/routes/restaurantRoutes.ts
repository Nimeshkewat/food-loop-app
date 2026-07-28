import express from "express";
import {
  createRestaurant,
  getRestaurant,
  getRestaurantOrders,
  getRestaurantWithFilters,
  getSingleRestaurant,
  updateOrderStatus,
  updateRestaurant,
} from "../controllers/restaurantController.js";
import isAuthenticated from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";
import { uploadImageLimiter } from "../middlewares/rateLimiters.js";

const router = express.Router();

router.post("/", isAuthenticated, upload.single("imageFile"), createRestaurant);
router.get("/", isAuthenticated, getRestaurant);
router.put(
  "/",
  uploadImageLimiter,
  isAuthenticated,
  upload.single("imageFile"),
  updateRestaurant,
);

router.get("/orders", isAuthenticated, getRestaurantOrders);
router.patch("/orders/:orderId/status", isAuthenticated, updateOrderStatus);
router.get("/search/:searchText", getRestaurantWithFilters);
router.get("/:restaurantId", getSingleRestaurant);

export default router;
