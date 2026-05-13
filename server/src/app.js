import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import cors from "cors";
import morgan from "morgan";
import chatRouter from "./routes/chat.routes.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Vite dev server
      "http://127.0.0.1:5500", // Live Server
      "http://localhost:5500", // Live Server alternate
      "http://localhost:4173", // Live Server alternate
      process.env.FRONTEND_URL,
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);
console.log(process.env.FRONTEND_URL);
app.use(express.static(path.join(__dirname, "../public")));

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/chats", chatRouter);

//  React Static Files

app.get("{*path}", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});
