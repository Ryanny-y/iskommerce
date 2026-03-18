import z from "zod";
import {
  createCategorySchema,
  updateCategorySchema,
  categoryParamsSchema,
} from "./category.schema";

import { ApiResponse } from "../../types/api";

export const categoryDtoSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type CategoryDto = z.infer<typeof categoryDtoSchema>;

export type CreateCategoryDto = z.infer<typeof createCategorySchema>["body"];

export type UpdateCategoryDto = z.infer<typeof updateCategorySchema>["body"];

export type CategoryParams = z.infer<typeof categoryParamsSchema>["params"];

// Responses
export type CreateCategoryResponse = ApiResponse<CategoryDto>;

export type GetCategoriesResponse = ApiResponse<CategoryDto[]>;

export type GetCategoryResponse = ApiResponse<CategoryDto>;

export type UpdateCategoryResponse = ApiResponse<CategoryDto>;

export type DeleteCategoryResponse = ApiResponse<void>;
