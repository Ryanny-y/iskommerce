import { Server, Socket } from "socket.io";
import prisma from "../config/client";

export default function registerNotificationSocket(io: Server, socket: Socket) {
  const userId = socket.data.userId;

  const createAndSendNotification = async ({
    userId,
    type,
    message,
  }: {
    userId: string;
    type: "ORDER_UPDATE" | "NEW_ORDER" | "NEW_MESSAGE" | "REVIEW";
    message: string;
  }) => {
    const notification = await prisma.notification.create({
      data: {
        userId,
        type,
        message,
      },
    });

    // Send real-time
    io.to(`user:${userId}`).emit("notification:new", notification);
  };

  /**
   * 🛒 EVENT: NEW ORDER (Buyer → Seller)
   */
  socket.on("notification:new_order", async (orderId: string) => {
    try {
      const order = await prisma.order.findUnique({
        where: { id: orderId },
      });

      if (!order) {
        return socket.emit("error", "Order not found");
      }

      // Notify SELLER
      await createAndSendNotification({
        userId: order.sellerId,
        type: "NEW_ORDER",
        message: `You have a new order.`,
      });
    } catch (error) {
      console.error(error);
    }
  });

  /**
   * 📦 EVENT: ORDER STATUS UPDATE (Seller → Buyer)
   */
  socket.on(
    "notification:order_status_update",
    async ({ orderId, status }: { orderId: string; status: string }) => {
      try {
        const order = await prisma.order.findUnique({
          where: { id: orderId },
        });

        if (!order) {
          return socket.emit("error", "Order not found");
        }

        // Notify BUYER
        await createAndSendNotification({
          userId: order.buyerId,
          type: "ORDER_UPDATE",
          message: `Your order is now ${status}`,
        });
      } catch (error) {
        console.error(error);
      }
    },
  );

  /**
   * 📖 MARK NOTIFICATIONS AS READ
   */
  socket.on("notification:mark_read", async () => {
    try {
      await prisma.notification.updateMany({
        where: {
          userId,
          isRead: false,
        },
        data: {
          isRead: true,
        },
      });

      io.to(`user:${userId}`).emit("notification:all_read");
    } catch (error) {
      console.error(error);
    }
  });

  /**
   * 🔢 GET UNREAD COUNT
   */
  socket.on("notification:get_unread_count", async () => {
    const count = await prisma.notification.count({
      where: {
        userId,
        isRead: false,
      },
    });

    socket.emit("notification:unread_count", count);
  });

  socket.on("notification:mark_single_read", async ({ id }) => {
    await prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });

    // Optionally, broadcast updated unread count
    const unreadCount = await prisma.notification.count({
      where: { userId: userId, isRead: false },
    });

    socket.emit("notification:unread_count", unreadCount);
  });
}
