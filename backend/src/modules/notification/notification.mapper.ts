import { NotificationDto } from "./notification.types";

export const mapNotificationToDto = (notification: any): NotificationDto => {
  return {
    id: notification.id,
    type: notification.type,
    message: notification.message,
    isRead: notification.isRead,
    createdAt: notification.createdAt.toISOString(),
  };
};
