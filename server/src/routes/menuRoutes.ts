import express from "express";
import {
  addMenu,
  deleteMenu,
  editMenu,
} from "../controllers/menuController.js";
import isAuthenticated from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.post("/", isAuthenticated, upload.single("imageFile"), addMenu);
router.patch(
  "/:menuId/edit",
  isAuthenticated,
  upload.single("imageFile"),
  editMenu,
);
router.delete("/:menuId/delete", isAuthenticated, deleteMenu);

export default router;
