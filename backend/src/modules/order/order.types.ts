import z from "zod";
import { acceptOrderSchema, orderDtoSchema, orderItemDtoSchema, orderStatsSchema, updateOrderStatusSchema } from "./order.schema";
import { ApiResponse } from "../../types/api";

export type OrderDto = z.infer<typeof orderDtoSchema>;
export type OrderItemDto = z.infer<typeof orderItemDtoSchema>;
export type UpdateOrderStatusDto = z.infer<typeof updateOrderStatusSchema>["body"];
export type AcceptOrderDto = z.infer<typeof acceptOrderSchema>["body"];
export type OrderParams = z.infer<typeof updateOrderStatusSchema>["params"];
export type OrderStats = z.infer<typeof orderStatsSchema>;

export type GetBuyerOrdersResponse = ApiResponse<OrderDto[]>;
export type GetSellerOrdersResponse = ApiResponse<OrderDto[]>;
export type UpdateOrderStatusResponse = ApiResponse<OrderDto>;
export type AcceptOrderResponse = ApiResponse<OrderDto>;
export type GetOrderStatsResponse = ApiResponse<OrderStats>;
