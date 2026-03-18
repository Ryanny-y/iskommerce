import { z } from "zod";

export const addToCartSchema = z.object({
  body: z.object({
    productId: z.string().uuid(),
    quantity: z.number().int().min(1),
  }),
});

export const updateCartItemSchema = z.object({
  body: z.object({
    quantity: z.number().int().min(1),
  }),
  params: z.object({
    productId: z.string().uuid(),
  }),
});

export const cartItemParamsSchema = z.object({
  params: z.object({
    productId: z.string().uuid(),
  }),
});

export const cartItemDtoSchema = z.object({
  id: z.string(),
  quantity: z.number(),
  product: z.object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
    stock: z.number(),
    images: z.array(
      z.object({
        url: z.string(),
      }),
    ),
  }),
});

export const cartDtoSchema = z.object({
  id: z.string(),
  items: z.array(cartItemDtoSchema),
});
