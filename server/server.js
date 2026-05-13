import "dotenv/config";
import { app } from "./src/app.js";
import { connectTodb } from "./src/config/db.js";
import http from "http";
import { initSocket } from "./src/socket/server.socket.js";

const httpServer = http.createServer(app);
initSocket(httpServer);

const PORT = process.env.PORT;

connectTodb().then(() => {
  httpServer.listen(PORT, () => {
    console.log("Connect To server");
  });
});
