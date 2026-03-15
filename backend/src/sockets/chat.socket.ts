import { Server, Socket } from "socket.io";

export default function registerChatSocket(io: Server, socket: Socket) {

  socket.on("chat:join", (conversationId: string) => {
    socket.join(`conversation:${conversationId}`);
  });

  socket.on("chat:send_message", (data) => {

    const { conversationId, message } = data;

    io.to(`conversation:${conversationId}`).emit("chat:new_message", {
      message,
      conversationId
    });

  });

}