import express from "express";
import {
  checkAuth,
  deleteUserAccount,
  forgotPassword,
  getProfile,
  login,
  logout,
  register,
  resetPassword,
  updateProfile,
  verifyEmail,
} from "../controllers/userController.js";
import isAuthenticated from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";
import {
  loginLimiter,
  registerLimiter,
  uploadImageLimiter,
} from "../middlewares/rateLimiters.js";

const router = express.Router();
//* base url /api/v1/users
router.post("/register", registerLimiter, register);
router.post("/login", loginLimiter, login);
router.post("/logout", logout);

router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.get("/check-auth", isAuthenticated, checkAuth);

router.get("/profile", isAuthenticated, getProfile);
router.patch(
  "/update-profile",
  uploadImageLimiter,
  isAuthenticated,
  upload.single("imageFile"),
  updateProfile,
);

router.patch("/delete-profile", isAuthenticated, deleteUserAccount);

export default router;
