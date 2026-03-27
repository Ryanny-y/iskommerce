import { z } from "zod";
import { ItemType, ProductCondition, SpicyLevel } from "@prisma/client";
import { uploadedFileSchema } from "../../types/files";

export const createProductBodySchema = z.object({
  body: z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    price: z.coerce.number().min(0.01),
    stock: z.coerce.number().min(1),
    categoryId: z.string(),
    type: z.enum(ItemType),

    // New Category
    newCategoryName: z.string().optional(),

    // FOR FOOD
    food_notes: z.string().optional(),
    allergen_info: z.string().optional(),
    spicy_level: z.enum(SpicyLevel).optional(),

    // FOR NON FOOD
    condition: z.enum(ProductCondition).optional(),
  }),

  files: z.array(uploadedFileSchema).min(1, "At least one image is required."),
});

export const updateProductSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    price: z.coerce.number().positive().optional(),
    stock: z.coerce.number().int().min(0).optional(),
    categoryId: z.string(),
    type: z.enum(ItemType),

    newCategoryName: z.string().optional(),

    // FOR FOOD
    food_notes: z.string().optional(),
    allergen_info: z.string().optional(),
    spicy_level: z.enum(SpicyLevel).nullable().optional(),

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
  key: z.string(),
  fileName: z.string(),
  bucket: z.string(),
  url: z.string(),
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
  type: z.string(),

  // FOR FOOD
  food_notes: z.string().optional(),
  allergen_info: z.string().optional(),
  spicy_level: z.string().optional(),

  // FOR NON FOOD
  condition: z.string(),

  sellerId: z.string(),
  seller: z.string(),
  sellerAvatar: z.string().optional(),
  categoryId: z.string(),
  category: z.string(),

  images: z.array(productImageSchema),

  createdAt: z.string(),
});
