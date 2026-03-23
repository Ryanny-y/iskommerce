import { ChatMessage } from "@prisma/client";

export const mapConversation = (conversation: any) => {
  return {
    id: conversation.id,
    buyer: {
      id: conversation.buyer.id,
      name: conversation.buyer.fullName,
    },

    seller: {
      id: conversation.seller.id,
      name: conversation.seller.fullName,
    },
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
