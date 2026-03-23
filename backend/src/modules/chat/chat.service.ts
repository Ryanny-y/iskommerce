import prisma from "../../config/client";

// Create or get conversation
export const createOrGetConversation = async (
  buyerId: string,
  sellerId: string,
) => {
  return prisma.chatConversation.upsert({
    where: {
      buyerId_sellerId: {
        buyerId,
        sellerId,
      },
    },
    update: {},
    create: {
      buyerId,
      sellerId,
    },
    include: {
      buyer: {
        select: { id: true, fullName: true },
      },
      seller: {
        select: { id: true, fullName: true },
      },
      messages: {
        take: 1,
        orderBy: { createdAt: "desc" },
      },
    },
  });
};

// Get all conversations of a user
export const getUserConversations = async (userId: string) => {
  return prisma.chatConversation.findMany({
    where: {
      OR: [{ buyerId: userId }, { sellerId: userId }],
    },
    include: {
      buyer: {
        select: {
          id: true,
          fullName: true,
        },
      },
      seller: {
        select: {
          id: true,
          fullName: true,
        },
      },
      messages: {
        take: 1,
        orderBy: { createdAt: "desc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

// Get single conversation
export const getSingleConversation = async (
  conversationId: string,
  userId: string,
) => {
  const conversation = await prisma.chatConversation.findUnique({
    where: { id: conversationId },
    include: {
      buyer: {
        select: {
          id: true,
          fullName: true,
        },
      },
      seller: {
        select: {
          id: true,
          fullName: true,
        },
      },
      messages: {
        take: 1,
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!conversation) {
    throw new Error("Conversation not found");
  }

  if (conversation.buyerId !== userId && conversation.sellerId !== userId) {
    throw new Error("Unauthorized to view this conversation");
  }

  return conversation;
};

// Get messages in a conversation
export const getMessages = async (conversationId: string, userId: string) => {
  const conversation = await prisma.chatConversation.findUnique({
    where: { id: conversationId },
  });

  if (!conversation) throw new Error("Conversation not found");

  if (conversation.buyerId !== userId && conversation.sellerId !== userId) {
    throw new Error("Unauthorized");
  }

  return prisma.chatMessage.findMany({
    where: { conversationId },
    orderBy: { createdAt: "asc" },
    take: 50,
  });
};

// Send a message
export const sendMessage = async (data: {
  conversationId: string;
  senderId: string;
  message: string;
  imageUrl?: string;
}) => {
  const { conversationId, senderId, message, imageUrl } = data;

  const conversation = await prisma.chatConversation.findUnique({
    where: { id: conversationId },
  });

  if (!conversation) throw new Error("Conversation not found");

  if (conversation.buyerId !== senderId && conversation.sellerId !== senderId) {
    throw new Error("Unauthorized");
  }

  return prisma.chatMessage.create({
    data: {
      conversationId,
      senderId,
      message,
      imageUrl: imageUrl ?? null,
    },
  });
};
