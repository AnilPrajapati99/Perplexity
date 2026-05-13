import { io } from "socket.io-client";
import BASE_URL from "../../../config/api.config";

export const initialiseSocketConnection = () => {
  const socket = io(BASE_URL, {
    withCredentials: true,
  });
  socket.on("connect", () => {
    console.log("Connect to Socket.Io Server");
  });
};
