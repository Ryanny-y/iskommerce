import { NotificationType } from "@prisma/client";
import prisma from "../../config/client";
import { getSocketIO } from "../../sockets/socketInstance";

export const sendNotification = async ({
  userId,
  type,
  message,
}: {
  userId: string;
  type: NotificationType;
  message: string;
}) => {
  const notification = await prisma.notification.create({
    data: { userId, type, message },
  });

  try {
    const io = getSocketIO();
    io.to(`user:${userId}`).emit("notification:new", notification);
  } catch (error) {
    console.error("Socket emit failed:", error);
  }

  return notification;
};