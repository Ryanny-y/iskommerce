import { z } from "zod";

export const createCategorySchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, "Category name is required"),
  })
});

export const updateCategorySchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1)
      .optional(),
  })
});

export const categoryParamsSchema = z.object({
  params: z.object({
    categoryId: z.string().uuid(),
  })
});