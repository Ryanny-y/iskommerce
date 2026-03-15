import z from "zod";
import {
  createProductBodySchema,
  productDtoSchema,
  productParamsSchema,
  sellerProductsParamsSchema,
  updateProductSchema,
} from "./product.schema";

import { ApiResponse } from "../../types/api";

export type ProductDto = z.infer<typeof productDtoSchema>;

export type CreateProductDto = z.infer<typeof createProductBodySchema>["body"];

export type UpdateProductDto = z.infer<typeof updateProductSchema>["body"];

export type ProductParams = z.infer<typeof productParamsSchema>["params"];

export type SellerProductsParams = z.infer<
  typeof sellerProductsParamsSchema
>["params"];

// RESPONSES
export type CreateProductResponse = ApiResponse<ProductDto>;
export type GetSellerProductsResponse = ApiResponse<ProductDto[]>;
export type UpdateProductResponse = ApiResponse<ProductDto>;
export type DeleteProductResponse = ApiResponse<void>;
