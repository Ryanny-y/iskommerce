import { Server, Socket } from "socket.io";
import prisma from "../config/client";

export default function registerChatSocket(io: Server, socket: Socket) {

  // JOIN CONVERSATION
  socket.on("chat:join", async (conversationId: string) => {
    try {
      const userId = socket.data.userId; // from auth middleware

      const conversation = await prisma.chatConversation.findUnique({
        where: { id: conversationId },
      });

      if (!conversation) {
        return socket.emit("error", "Conversation not found");
      }

      // Ensure user is part of conversation
      if (
        conversation.buyerId !== userId &&
        conversation.sellerId !== userId
      ) {
        return socket.emit("error", "Unauthorized");
      }

      socket.join(`conversation:${conversationId}`);
    } catch (error) {
      console.error(error);
    }
  });

  // SEND MESSAGE
  socket.on("chat:send_message", async (data) => {
    try {
      const { conversationId, message, imageUrl } = data;
      const senderId = socket.data.userId;

      // Validate conversation
      const conversation = await prisma.chatConversation.findUnique({
        where: { id: conversationId },
      });

      if (!conversation) {
        return socket.emit("error", "Conversation not found");
      }

      if (
        conversation.buyerId !== senderId &&
        conversation.sellerId !== senderId
      ) {
        return socket.emit("error", "Unauthorized");
      }

      // Save message to DB
      const newMessage = await prisma.chatMessage.create({
        data: {
          message,
          imageUrl,
          senderId,
          conversationId,
        },
      });

      // Emit to both buyer & seller
      io.to(`conversation:${conversationId}`).emit("chat:new_message", newMessage);

    } catch (error) {
      console.error(error);
    }
  });
}