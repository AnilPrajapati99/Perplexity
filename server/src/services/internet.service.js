import "dotenv/config";
import { tavily } from "@tavily/core";

const TAVILY_API_KEY = process.env.TAVILY_API_KEY;

const tvily = tavily({
  apiKey: TAVILY_API_KEY,
});

export async function internetSearch({ query }) {
  const response = await tvily.search(query, {
    maxResults: 5,
    searchDepth: "advanced",
  });
  return response;
}
