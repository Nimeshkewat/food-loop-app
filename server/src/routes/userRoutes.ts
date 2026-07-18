import express from "express";
import {
  checkAuth,
  forgotPassword,
  login,
  logout,
  register,
  resetPassword,
  updateProfile,
  verifyEmail,
} from "../controllers/userController.js";
import isAuthenticated from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";

const router = express.Router();
//* base url /api/v1/users
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.get("/check-auth", isAuthenticated, checkAuth);
router.patch(
  "/update-profile",
  isAuthenticated,
  upload.single("imageFile"),
  updateProfile,
);

export default router;
