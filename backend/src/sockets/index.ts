import { Server } from "socket.io";
import registerChatSocket from "./chat.socket";
import registerNotificationSocket from "./notification.socket";

export default function registerSocketHandlers(io: Server) {

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    registerChatSocket(io, socket);
    registerNotificationSocket(io, socket);

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

}