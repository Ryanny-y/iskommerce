import z from "zod";
import {
  addToCartSchema,
  cartDtoSchema,
  cartItemDtoSchema,
  cartItemParamsSchema,
  checkoutSchema,
  updateCartItemSchema,
} from "./cart.schema";
import { ApiResponse } from "../../types/api";

export type CartDto = z.infer<typeof cartDtoSchema>;
export type CartItemDto = z.infer<typeof cartItemDtoSchema>;
export type AddToCartDto = z.infer<typeof addToCartSchema>["body"];
export type UpdateCartItemDto = z.infer<typeof updateCartItemSchema>["body"];
export type CartItemParams = z.infer<typeof cartItemParamsSchema>["params"];
export type CheckoutDto = z.infer<typeof checkoutSchema>["body"];

export type OrderDto = {
  id: string;
  status: string;
  buyerId: string;
  sellerId: string;
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
  items: {
    id: string;
    productName: string;
    productImageUrl: string | null;
    quantity: number;
    price: number;
  }[];
};

export type CheckoutResultDto = {
  orders: OrderDto[];
  totalAmount: number;
};

export type GetCartResponse = ApiResponse<CartDto>;
export type AddToCartResponse = ApiResponse<CartDto>;
export type UpdateCartItemResponse = ApiResponse<CartDto>;
export type DeleteCartItemResponse = ApiResponse<void>;
export type CheckoutResponse = ApiResponse<CheckoutResultDto>;
