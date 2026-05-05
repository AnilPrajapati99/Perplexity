import { io } from "socket.io-client";

export const initialiseSocketConnection = () => {
  const socket = io("http://localhost:3000", {
    withCredentials: true,
  });
  socket.on("connect", () => {
    console.log("Connect to Socket.Io Server");
  });
};
