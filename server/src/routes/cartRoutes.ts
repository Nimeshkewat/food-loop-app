import express from "express";
import isAuthenticated from "../middlewares/auth.js";
import {
  addToCart,
  clearCart,
  deleteItemFromCart,
  getCart,
  updateCartQuantity,
} from "../controllers/cartController.js";

const router = express.Router();

router.post("/", isAuthenticated, addToCart);
router.patch("/:menuId", isAuthenticated, updateCartQuantity);
router.delete("/clear", isAuthenticated, clearCart);
router.delete("/:menuId", isAuthenticated, deleteItemFromCart);
router.get("/", isAuthenticated, getCart);

export default router;
