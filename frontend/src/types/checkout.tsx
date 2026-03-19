import { type CartItem } from "./marketplace";

export type FulfillmentType = "PICKUP" | "MEETUP";

export interface SellerOrderFulfillment {
  sellerId: string;
  sellerName: string;
  items: CartItem[];
  fulfillmentType: FulfillmentType;
  meetupLocation?: string;
  meetupTime?: string;
  meetupNotes?: string;
}

export interface CheckoutFormData {
  sellerOrders: SellerOrderFulfillment[];
}

export type PaymentMethod = "CASH" | "GCASH" | "CARD";

export interface PaymentData extends CheckoutFormData {
  paymentMethod: PaymentMethod;
  totalAmount: number;
}
