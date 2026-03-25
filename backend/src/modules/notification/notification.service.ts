import { NotificationType } from "@prisma/client";
import prisma from "../../config/client";
import { getSocketIO } from "../../sockets/socketInstance";
import { mapNotificationToDto } from "./notification.mapper";
import { NotificationDto } from "./notification.types";

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

export const getUserNotifications = async (
  userId: string,
): Promise<NotificationDto[]> => {
  const notifications = await prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return notifications.map((notification) =>
    mapNotificationToDto(notification),
  );
};