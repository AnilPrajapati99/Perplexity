import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import cors from "cors";
import morgan from "morgan";
import chatRouter from "./routes/chat.routes.js";

// ?Middleware
export const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

// ?Auth
app.use("/api/auth", authRouter);

// ?Chat Router
app.use("/api/chats", chatRouter);

app.get("/", (req, res) => {
  res.json({ message: "Server is Running" });
});
