export type ChatMessage = {
  id: string;
  message: string;
  imageUrl?: string;
  senderId: string;
  createdAt: string;
  conversationId: string;
};

export type ChatConversation = {
  id: string;

  buyer: {
    id: string;
    name: string;
  };

  seller: {
    id: string;
    name: string;
  };

  lastMessage: any;
  lastMessageAt: any;
  createdAt: string;
};
