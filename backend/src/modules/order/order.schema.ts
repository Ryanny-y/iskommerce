import { z } from "zod";
import { OrderStatus } from "@prisma/client";

export const updateOrderStatusSchema = z.object({
  body: z.object({
    status: z.enum(OrderStatus),
  }),
  params: z.object({
    orderId: z.uuid(),
  }),
});

export const orderStatsSchema = z.object({
  totalOrders: z.number(),
  pendingOrders: z.number(),
  acceptedOrders: z.number(),
  preparingOrders: z.number(),
  readyOrders: z.number(),
  completedOrders: z.number(),
  cancelledOrders: z.number(),
});

export const orderItemDtoSchema = z.object({
  id: z.string(),
  productId: z.string(),
  productName: z.string(),
  productImageUrl: z.string().nullable(),
  quantity: z.number(),
  price: z.number(),
});

export const orderDtoSchema = z.object({
  id: z.string(),
  status: z.string(),
  buyerId: z.string(),
  buyerName: z.string(),
  sellerId: z.string(),
  sellerName: z.string(),
  fulfillmentType: z.string(),
  pickupLocation: z.string().nullable(),
  pickupTime: z.string().nullable(),
  meetupTime: z.string().nullable(),
  meetupLocation: z.string().nullable(),
  meetupNotes: z.string().nullable(),
  paymentStatus: z.string(),
  paymentMethod: z.string().nullable(),
  total: z.number(),
  createdAt: z.string(),
  acceptedAt: z.string().nullable(),
  preparedAt: z.string().nullable(),
  completedAt: z.string().nullable(),
  cancelledAt: z.string().nullable(),
  cancelReason: z.string().nullable(),
  items: z.array(orderItemDtoSchema),
});
