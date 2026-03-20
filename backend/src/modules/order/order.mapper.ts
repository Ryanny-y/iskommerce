import { OrderDto } from "./order.types";

export const mapOrderToDto = (order: any): OrderDto => {
  return {
    id: order.id,
    status: order.status,
    buyerId: order.buyerId,
    buyerName: order.buyer.fullName || null,
    sellerId: order.sellerId,
    sellerName: order.seller.fullName || null,
    fulfillmentType: order.fulfillmentType,
    pickupLocation: order.pickupLocation,
    pickupTime: order.pickupTime?.toISOString() || null,
    meetupTime: order.meetupTime?.toISOString() || null,
    meetupLocation: order.meetupLocation,
    meetupNotes: order.meetupNotes,
    paymentStatus: order.paymentStatus,
    paymentMethod: order.paymentMethod,
    total: order.total,
    createdAt: order.createdAt.toISOString(),
    acceptedAt: order.acceptedAt?.toISOString() || null,
    preparedAt: order.preparedAt?.toISOString() || null,
    completedAt: order.completedAt?.toISOString() || null,
    cancelledAt: order.cancelledAt?.toISOString() || null,
    cancelReason: order.cancelReason,
    items: order.items.map((item: any) => ({
      id: item.id,
      productId: item.productId,
      productName: item.productName,
      productImageUrl: item.productImageUrl,
      quantity: item.quantity,
      price: item.price,
    })),
  };
};
