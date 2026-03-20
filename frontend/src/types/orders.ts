export interface Order {
  id: string;
  status: OrderStatus;
  buyerId: string;
  sellerId: string;
  sellerName: string;
  fulfillmentType: string;
  pickupLocation: string | null;
  pickupTime: string | null;
  meetupTime: string | null;
  meetupLocation: string | null;
  meetupNotes: string | null;
  paymentStatus: string;
  paymentMethod: string | null;
  total: number;
  createdAt: string;
  acceptedAt: string | null;
  preparedAt: string | null;
  completedAt: string | null;
  cancelledAt: string | null;
  cancelReason: string | null;
  items: OrderItem[];
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImageUrl?: string;
  quantity: number;
  price: number;
}

export type OrderStatus =
  | "PENDING"
  | "ACCEPTED"
  | "PREPARING"
  | "READY"
  | "COMPLETED"
  | "CANCELLED";

export type FulfillmentType = "PICKUP" | "MEETUP";

export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";

export type PaymentMethod = "CASH" | "GCASH" | "CARD";

export interface OrdersStatsData {
  totalOrders: number;
  pendingOrders: number;
  readyOrders: number;
  completedOrders: number;
}
