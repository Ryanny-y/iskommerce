import { Server } from "socket.io";
import registerChatSocket from "./chat.socket";
import registerNotificationSocket from "./notification.socket";
import { socketAuthMiddleware } from "./socketAuthMiddleware";

export default function registerSocketHandlers(io: Server) {

  io.use(socketAuthMiddleware);

  io.on("connection", (socket) => {
     const userId = socket.data.userId;

    socket.join(`user:${userId}`);

    registerChatSocket(io, socket);
    registerNotificationSocket(io, socket);

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

}