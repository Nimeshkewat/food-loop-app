import "dotenv/config";
import "./config/cloudinary.js";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import userRouter from "./routes/userRoutes.js";
import restaurantRouter from "./routes/restaurantRoutes.js";
import menuRouter from "./routes/menuRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import reviewRouter from "./routes/reviewRoutes.js";

import { webhook } from "./controllers/orderController.js";

const app = express();

// Razorpay webhook
app.use(
  "/api/v1/orders/webhook",
  express.raw({ type: "application/json" }),
  webhook,
);

// Middlewares
app.use(express.json());

const corsOption = {
  origin: process.env.FRONTEND_URL!,
  credentials: true,
};

app.use(cors(corsOption));
app.use(cookieParser());
app.use(helmet());

// Routes
app.get("/", (req, res) => {
  res.send("API Running !");
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/restaurants", restaurantRouter);
app.use("/api/v1/menus", menuRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/reviews", reviewRouter);

export default app;
