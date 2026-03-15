import { z } from "zod";
import { ItemType, ProductCondition, SpicyLevel } from "@prisma/client";
import { uploadedFileSchema } from "../../types/files";

export const createProductBodySchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    price: z.coerce.number(),
    stock: z.coerce.number(),
    categoryId: z.uuid(),
    type: z.enum(ItemType),

    // FOR FOOD
    food_notes: z.string().optional(),
    allergen_info: z.string().optional(),
    spicy_level: z.enum(SpicyLevel).optional(),

    // FOR NON FOOD
    condition: z.enum(ProductCondition),
  }),

  files: z.array(uploadedFileSchema).optional().default([]),
});

export const updateProductSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    price: z.coerce.number().positive().optional(),
    stock: z.coerce.number().int().min(0).optional(),

    // FOR FOOD
    food_notes: z.string().optional(),
    allergen_info: z.string().optional(),
    spicy_level: z.enum(SpicyLevel).optional(),

    // FOR NON_FOOD
    condition: z.enum(ProductCondition).optional(),
  }),
  params: z.object({
    productId: z.uuid(),
  }),
});

export const productParamsSchema = z.object({
  params: z.object({
    productId: z.uuid(),
  }),
});

export const sellerProductsParamsSchema = z.object({
  params: z.object({
    sellerId: z.uuid(),
  }),
});

export const productImageSchema = z.object({
  url: z.string(),
  key: z.string(),
  fileName: z.string(),
  mimeType: z.string().optional(),
  size: z.number().optional(),
});

export const productDtoSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  stock: z.number(),
  rating: z.number(),

  // FOR FOOD
  food_notes: z.string().optional(),
  allergen_info: z.string().optional(),
  spicy_level: z.string().optional(),

  // FOR NON FOOD
  condition: z.string(),

  sellerId: z.string(),
  categoryId: z.string(),

  images: z.array(productImageSchema),

  createdAt: z.string(),
});
