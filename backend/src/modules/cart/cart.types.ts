import z from "zod";
import {
  addToCartSchema,
  cartDtoSchema,
  cartItemDtoSchema,
  cartItemParamsSchema,
  updateCartItemSchema,
} from "./cart.schema";
import { ApiResponse } from "../../types/api";

export type CartDto = z.infer<typeof cartDtoSchema>;
export type CartItemDto = z.infer<typeof cartItemDtoSchema>;
export type AddToCartDto = z.infer<typeof addToCartSchema>["body"];
export type UpdateCartItemDto = z.infer<typeof updateCartItemSchema>["body"];
export type CartItemParams = z.infer<typeof cartItemParamsSchema>["params"];

export type GetCartResponse = ApiResponse<CartDto>;
export type AddToCartResponse = ApiResponse<CartDto>;
export type UpdateCartItemResponse = ApiResponse<CartDto>;
export type DeleteCartItemResponse = ApiResponse<void>;
