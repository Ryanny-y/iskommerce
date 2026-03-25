import { Server, Socket } from "socket.io";
import prisma from "../config/client";

export default function registerChatSocket(io: Server, socket: Socket) {
  const userId = socket.data.userId;

  const joinAllConversations = async () => {
    const conversations = await prisma.chatConversation.findMany({
      where: { OR: [{ buyerId: userId }, { sellerId: userId }] },
      select: { id: true },
    });

    conversations.forEach((conv) => {
      socket.join(`conversation:${conv.id}`);
    });

    // Join personal room for unread updates
    socket.join(`user:${userId}`);
  };
  joinAllConversations();

  // JOIN CONVERSATION
  socket.on("chat:join", async (conversationId: string) => {
    try {
      const conversation = await prisma.chatConversation.findUnique({
        where: { id: conversationId },
      });

      if (!conversation) {
        return socket.emit("error", "Conversation not found");
      }

      // Ensure user is part of conversation
      if (conversation.buyerId !== userId && conversation.sellerId !== userId) {
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
          isRead: false,
        },
      });

      // Emit to both buyer & seller
      io.to(`conversation:${conversationId}`).emit(
        "chat:new_message",
        newMessage,
      );

      io.to(`user:${conversation.buyerId}`)
        .to(`user:${conversation.sellerId}`)
        .emit("chat:conversation_updated", {
          conversationId,
          lastMessage: message,
          lastMessageAt: newMessage.createdAt,
        });

      const receiverId =
        senderId === conversation.buyerId
          ? conversation.sellerId
          : conversation.buyerId;

      const unreadCount = await prisma.chatMessage.count({
        where: {
          conversationId,
          senderId: { not: receiverId },
          isRead: false,
          conversation: {
            OR: [{ buyerId: receiverId }, { sellerId: receiverId }],
          },
        },
      });

      io.to(`user:${receiverId}`).emit("chat:unread_update", {
        conversationId,
        unreadCount,
      });
    } catch (error) {
      console.error(error);
    }
  });

  socket.on("chat:mark_read", async (conversationId: string) => {
    const userId = socket.data.userId;

    await prisma.chatMessage.updateMany({
      where: {
        conversationId,
        senderId: {
          not: userId,
        },
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });

    const unreadCount = await prisma.chatMessage.count({
      where: {
        senderId: { not: userId },
        isRead: false,
        conversation: {
          OR: [{ buyerId: userId }, { sellerId: userId }],
        },
      },
    });

    io.to(`user:${userId}`).emit("chat:unread_update", {
      conversationId,
      unreadCount,
    });
  });
}
