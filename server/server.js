import { app } from "./src/app.js";
import { connectTodb } from "./src/config/db.js";
import { configDotenv } from "dotenv";
import { testAI } from "./src/services/ai.service.js";

configDotenv();
testAI();

connectTodb().then(() => {
  app.listen(3000, () => {
    console.log("Connect To server");
  });
});
