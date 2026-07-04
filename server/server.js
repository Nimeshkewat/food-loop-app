import express from "express";
import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

//! App instance
const app = express();
const PORT = process.env.PORT || 3000;

//! Middlewares
app.use(express.json({ limit: "4mb" }));
app.use(helmet());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  }),
);

//! Routes
app.get("/", (req, res) => res.json({ message: "Api Working !" }));

//! Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
