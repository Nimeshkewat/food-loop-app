import express from "express";
import isAuthenticated from "../middlewares/auth.js";
import {
  checkout,
  getAllOrders,
  getOrderById,
  verify,
} from "../controllers/orderController.js";
import { checkoutLimiter } from "../middlewares/rateLimiters.js";

const router = express.Router();

router.post("/", checkoutLimiter, isAuthenticated, checkout);
router.post("/verify-payment", isAuthenticated, verify);
router.get("/", isAuthenticated, getAllOrders);
router.get("/:orderId", isAuthenticated, getOrderById);

export default router;
