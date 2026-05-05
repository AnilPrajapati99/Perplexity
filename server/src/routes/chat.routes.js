import { Router } from "express";
import {
  sendMessage,
  getChats,
  getMessages,
  deleteChat,
} from "../controlers/chat.controllers.js";
import { authUser } from "../middleware/auth.middleware.js";

const chatRouter = Router();

chatRouter.post("/message", authUser, sendMessage);
chatRouter.get("/", authUser, getChats);
chatRouter.get("/:chatId/messages", authUser, getMessages);
chatRouter.delete("/delete/:chatId", authUser, deleteChat);

export default chatRouter;
