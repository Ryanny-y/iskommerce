import z from "zod";
import { createReviewSchema, reviewDtoSchema } from "./review.schema";
import { ApiResponse } from "../../types/api";

export type CreateReviewDto = z.infer<typeof createReviewSchema>["body"];
export type ReviewDto = z.infer<typeof reviewDtoSchema>;

export type CreateReviewResponse = ApiResponse<ReviewDto>;
