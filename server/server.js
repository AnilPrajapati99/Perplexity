import { app } from "./src/app.js";
import { connectTodb } from "./src/config/db.js";
import { configDotenv } from "dotenv";
import { testAI } from "./src/services/ai.service.js";
import http from "http";
import { initSocket } from "./src/socket/server.socket.js";

const httpServer = http.createServer(app);
initSocket(httpServer);
configDotenv();

connectTodb().then(() => {
  httpServer.listen(3000, () => {
    console.log("Connect To server");
  });
});
