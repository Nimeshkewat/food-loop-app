import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import connectDB from "./config/db";

//* App instance and Port
const app = express();
const PORT = process.env.PROT || 3000;

if (!process.env.FRONTEND_URL) {
  throw new Error("FRONTEND_URL is missing");
}

//* Middlewares
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(helmet());

//* Routes
app.get("/", (req, res) => {
  res.send("API Running !");
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on  http://localhost:${PORT}`);
});

export default app;
