import "dotenv/config";
import "./utils/cloudinary.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import connectDB from "./config/db.js";

import userRouter from "./routes/userRoutes.js";
import restaurantRouter from "./routes/restaurantRoutes.js";
import menuRouter from "./routes/menuRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import { webhook } from "./controllers/orderController.js";

//* App instance and Port
const app = express();
const PORT = process.env.PORT || 3000;

//* No auth middleware — Razorpay's servers call this directly.
//* Raw body parsing is required here so the signature check in the
//* webhook controller can hash the exact bytes Razorpay signed.
app.use(
  "/api/order/webhook",
  express.raw({ type: "application/json" }),
  webhook,
);

//* Middlewares
app.use(express.json());
const corsOption = { origin: process.env.FRONTEND_URL!, credentials: true };
app.use(cors(corsOption));
app.use(cookieParser());
app.use(helmet());

//* Routes
app.get("/", (req, res) => {
  res.send("API Running !");
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/restaurant", restaurantRouter);
app.use("/api/v1/menu", menuRouter);
app.post("/api/order", orderRouter);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on  http://localhost:${PORT}`);
});

export default app;
