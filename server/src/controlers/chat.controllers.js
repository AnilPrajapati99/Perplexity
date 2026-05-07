import { AIMessage } from "langchain";
import { genrateRespose, genrateChatTitle } from "../services/ai.service.js";

import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";

export async function sendMessage(req, res) {
  const { message, chat: chatId } = req.body;

  // console.log(message);

  let title = null,
    chat = null;

  if (!chatId) {
    title = await genrateChatTitle(message);
    // console.log(title);
    chat = await chatModel.create({
      user: req.user.id,
      title,
    });
  }
  const userMEssage = await messageModel.create({
    chat: chatId || chat._id,
    content: message,
    role: "user",
  });
  const messages = await messageModel.find({ chat: chatId || chat._id });
  console.log(messages);
  const result = await genrateRespose(messages);

  const aiMessage = await messageModel.create({
    chat: chatId || chat._id,
    content: result,
    role: "ai",
  });
  // console.log(messages);

  res.status(201).json({
    chatTitle: title,
    message: result,
    chat: chat,
    AIMessage: aiMessage,
  });
}

export async function getChats(req, res) {
  const chats = await chatModel.find({ user: req.user.id });

  if (chats.length == 0) {
    return res.status(404).json({
      message: "No Chat ",
    });
  }

  res.status(201).json(chats);
}

export async function getMessages(req, res) {
  const { chatId } = req.params;
  const chat = await chatModel.findOne({ _id: chatId, user: req.user.id });
  if (!chat) {
    return res.status(404).json({ message: "Chat not found" });
  }
  const messages = await messageModel.find({ chat: chatId });
  res.status(201).json({
    message: "Message Fetch",
    messages,
  });
}

export async function deleteChat(req, res) {
  const { chatId } = req.params;

  const chat = await chatModel.findByIdAndDelete({
    _id: chatId,
    user: req.user.id,
  });
  await messageModel.deleteMany({
    chat: chatId,
  });

  if (!chat) {
    return res.status(404).json({
      message: "Chat Not Found",
    });
  }

  res.status(200).json({
    message: "Chat delete Succesfully",
  });
}
