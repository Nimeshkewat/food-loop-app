import express from "express";
import isAuthenticated from "../middlewares/auth.js";
import { checkout, verify, webhook } from "../controllers/orderController.js";

const router = express.Router();

router.post("/checkout", isAuthenticated, checkout);
router.post("/verify", isAuthenticated, verify);

export default router;
