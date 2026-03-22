import { ChatMessage } from "@prisma/client";

export const mapConversation = (conversation: any) => {
  return {
    id: conversation.id,
    buyerId: conversation.buyerId,
    sellerId: conversation.sellerId,
    lastMessage: conversation.messages?.[0]?.message || null,
    lastMessageAt: conversation.messages?.[0]?.createdAt || null,
    createdAt: conversation.createdAt,
  };
};

export const mapMessage = (message: ChatMessage) => {
  return {
    id: message.id,
    message: message.message,
    imageUrl: message.imageUrl,
    senderId: message.senderId,
    conversationId: message.conversationId,
    createdAt: message.createdAt,
  };
};