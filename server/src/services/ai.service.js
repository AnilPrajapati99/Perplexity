import "dotenv/config";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import { response } from "express";
import { HumanMessage, SystemMessage, AIMessage } from "langchain";

const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GOOGLE_API_KEY,
});

const mistralModel = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY,
});

console.log(process.env.GOOGLE_API_KEY);

export async function genrateRespose(messages) {
  const response = await geminiModel.invoke(
    messages.map((msg) => {
      console.log(msg);
      if (msg.role == "user") {
        return new HumanMessage(msg.content);
      } else if (msg.role == "ai") {
        return new AIMessage(msg.content);
      }
    }),
  );
  return response.text;
}

export async function genrateChatTitle(message) {
  const response = await mistralModel.invoke([
    new SystemMessage(`You are a helpful assistant that generates a concise and descriptive title for a chat conversation based on the following message: "${message}". The title should be no more than 5 words long and should capture the essence of the conversation.
      
      user will provide you with a message, and you will respond with a suitable title for the chat conversation. Please ensure that the title is relevant and accurately reflects the content of the message.

      `),
    new HumanMessage(
      `Generate a title for the following message: "${message}"`,
    ),
  ]);
  return response.text;
}
