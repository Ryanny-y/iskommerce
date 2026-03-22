export interface CreateConversationDTO {
  sellerId: string;
}

export interface SendMessageDTO {
  conversationId: string;
  message: string;
  imageUrl?: string;
}