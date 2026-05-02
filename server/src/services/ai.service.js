import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

export async function testAI() {
  model.invoke("WHat is ai explain in 100 words ").then((res) => {
    console.log(res.text);
  });
}
