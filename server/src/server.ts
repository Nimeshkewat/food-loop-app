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

//* App instance and Port
const app = express();
const PORT = process.env.PROT || 3000;

if (!process.env.FRONTEND_URL) {
  throw new Error("FRONTEND_URL is missing");
}

//* Middlewares
const corsOption = { origin: process.env.FRONTEND_URL, credentials: true };
app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());

//* Routes
app.get("/", (req, res) => {
  res.send("API Running !");
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/restaurant", restaurantRouter);
app.use("/api/v1/menu", menuRouter);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on  http://localhost:${PORT}`);
});

export default app;
