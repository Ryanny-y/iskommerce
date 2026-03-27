import { ChatMessage } from "@prisma/client";

export const mapConversation = (conversation: any) => {
  return {
    id: conversation.id,
    buyer: {
      id: conversation.buyer.id,
      name: conversation.buyer.fullName,
      avatar: conversation.buyer.avatar,
    },

    seller: {
      id: conversation.seller.id,
      name: conversation.seller.fullName,
      avatar: conversation.seller.avatar,
    },
    lastMessage: conversation.messages?.[0]?.message || null,
    lastMessageAt: conversation.messages?.[0]?.createdAt || null,
    unreadCount: conversation._count.messages,
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
