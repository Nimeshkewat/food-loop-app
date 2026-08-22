import express from "express";
import isAuthenticated from "../middlewares/auth.js";
import { getDashboardAnalytics } from "../controllers/analyticsContoller.js";

const router = express.Router();

router.get("/dashboard", isAuthenticated, getDashboardAnalytics);

export default router;
