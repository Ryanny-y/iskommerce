import prisma from "../../config/client";
import { mapOrderToDto } from "./order.mapper";
import { AcceptOrderDto, OrderDto, OrderStats, UpdateOrderStatusDto } from "./order.types";

export const getBuyerOrders = async (buyerId: string): Promise<OrderDto[]> => {
  const orders = await prisma.order.findMany({
    where: { buyerId },
    include: {
      items: true,
      seller: {
        select: {
          fullName: true,
        },
      },
      buyer: {
        select: {
          fullName: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return orders.map((order) => mapOrderToDto(order));
};

export const getSellerOrders = async (
  sellerId: string,
): Promise<OrderDto[]> => {
  const orders = await prisma.order.findMany({
    where: { sellerId },
    include: {
      items: true,
      seller: {
        select: {
          fullName: true,
        },
      },
      buyer: {
        select: {
          fullName: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return orders.map((order) => mapOrderToDto(order));
};

export const updateOrderStatus = async (
  sellerId: string,
  orderId: string,
  data: UpdateOrderStatusDto,
): Promise<OrderDto> => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  if (order.sellerId !== sellerId) {
    throw new Error("Unauthorized to update this order");
  }

  const updateData: any = { status: data.status };

  if (data.status === "ACCEPTED") {
    updateData.acceptedAt = new Date();
  } else if (data.status === "PREPARING") {
    updateData.preparedAt = new Date();
  } else if (data.status === "COMPLETED") {
    updateData.completedAt = new Date();
  } else if (data.status === "CANCELLED") {
    updateData.cancelledAt = new Date();
  }

  const updatedOrder = await prisma.order.update({
    where: { id: orderId },
    data: updateData,
    include: {
      items: true,
    },
  });

  return mapOrderToDto(updatedOrder);
};

export const acceptOrder = async (
  sellerId: string,
  orderId: string,
  data: AcceptOrderDto,
): Promise<OrderDto> => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  if (order.sellerId !== sellerId) {
    throw new Error("Unauthorized to accept this order");
  }

  if (order.status !== "PENDING") {
    throw new Error("Only pending orders can be accepted");
  }

  const updatedOrder = await prisma.order.update({
    where: { id: orderId },
    data: {
      status: "ACCEPTED",
      acceptedAt: new Date(),
      pickupLocation: data.pickupLocation ?? order.pickupLocation,
      pickupTime: data.pickupTime ? new Date(data.pickupTime) : order.pickupTime,
    },
    include: {
      items: true,
    },
  });

  return mapOrderToDto(updatedOrder);
};

export const getBuyerOrderStats = async (
  buyerId: string,
): Promise<OrderStats> => {
  const [total, pending, accepted, preparing, ready, completed, cancelled] =
    await Promise.all([
      prisma.order.count({ where: { buyerId } }),
      prisma.order.count({ where: { buyerId, status: "PENDING" } }),
      prisma.order.count({ where: { buyerId, status: "ACCEPTED" } }),
      prisma.order.count({ where: { buyerId, status: "PREPARING" } }),
      prisma.order.count({ where: { buyerId, status: "READY" } }),
      prisma.order.count({ where: { buyerId, status: "COMPLETED" } }),
      prisma.order.count({ where: { buyerId, status: "CANCELLED" } }),
    ]);

  return {
    totalOrders: total,
    pendingOrders: pending,
    acceptedOrders: accepted,
    preparingOrders: preparing,
    readyOrders: ready,
    completedOrders: completed,
    cancelledOrders: cancelled,
  };
};

export const getSellerOrderStats = async (
  sellerId: string,
): Promise<OrderStats> => {
  const [total, pending, accepted, preparing, ready, completed, cancelled] =
    await Promise.all([
      prisma.order.count({ where: { sellerId } }),
      prisma.order.count({ where: { sellerId, status: "PENDING" } }),
      prisma.order.count({ where: { sellerId, status: "ACCEPTED" } }),
      prisma.order.count({ where: { sellerId, status: "PREPARING" } }),
      prisma.order.count({ where: { sellerId, status: "READY" } }),
      prisma.order.count({ where: { sellerId, status: "COMPLETED" } }),
      prisma.order.count({ where: { sellerId, status: "CANCELLED" } }),
    ]);

  return {
    totalOrders: total,
    pendingOrders: pending,
    acceptedOrders: accepted,
    preparingOrders: preparing,
    readyOrders: ready,
    completedOrders: completed,
    cancelledOrders: cancelled,
  };
};
