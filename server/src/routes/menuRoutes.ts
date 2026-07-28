import express from "express";
import {
  addMenu,
  deleteMenu,
  editMenu,
  getMenus,
} from "../controllers/menuController.js";
import isAuthenticated from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";
import { uploadImageLimiter } from "../middlewares/rateLimiters.js";

const router = express.Router();

router.post("/", isAuthenticated, upload.single("imageFile"), addMenu);
router.patch(
  "/:menuId/edit",
  uploadImageLimiter,
  isAuthenticated,
  upload.single("imageFile"),
  editMenu,
);
router.delete("/:menuId/delete", isAuthenticated, deleteMenu);
router.get("/", isAuthenticated, getMenus);

export default router;
