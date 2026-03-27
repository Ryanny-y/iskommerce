import z from "zod";
import { createReviewSchema, getProductReviewsSchema, paginatedProductReviewsSchema, reviewDtoSchema, getSellerReviewsSchema, paginatedSellerReviewsSchema } from "./review.schema";
import { ApiResponse } from "../../types/api";

export type CreateReviewDto = z.infer<typeof createReviewSchema>["body"];
export type ReviewDto = z.infer<typeof reviewDtoSchema>;
export type GetProductReviewsParams = z.infer<typeof getProductReviewsSchema>["params"];
export type GetProductReviewsQuery = z.infer<typeof getProductReviewsSchema>["query"];
export type PaginatedProductReviews = z.infer<typeof paginatedProductReviewsSchema>;
export type GetSellerReviewsParams = z.infer<typeof getSellerReviewsSchema>["params"];
export type GetSellerReviewsQuery = z.infer<typeof getSellerReviewsSchema>["query"];
export type PaginatedSellerReviews = z.infer<typeof paginatedSellerReviewsSchema>;

export type CreateReviewResponse = ApiResponse<ReviewDto>;
export type GetProductReviewsResponse = ApiResponse<PaginatedProductReviews>;
export type GetSellerReviewsResponse = ApiResponse<PaginatedSellerReviews>;
