import express from "express";
import isAuthenticated from "../middlewares/auth.js";
import {
  checkout,
  getAllOrders,
  verify,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", isAuthenticated, checkout);
router.post("/verify-payment", isAuthenticated, verify);
router.get("/", isAuthenticated, getAllOrders);

export default router;
