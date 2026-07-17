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

const router = express.Router();

router.post("/", isAuthenticated, upload.single("imageFile"), createRestaurant);
router.get("/", getRestaurant);
router.patch(
  "/",
  isAuthenticated,
  upload.single("imageFile"),
  updateRestaurant,
);
router.get("/order", isAuthenticated, getRestaurantOrders);
router.patch("/order/:orderId/status", isAuthenticated, updateOrderStatus);
router.get("/search/:searchText", getRestaurantWithFilters);
router.get("/:restaurantId", getSingleRestaurant);

export default router;
