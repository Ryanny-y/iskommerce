import { z } from "zod";
import { FulfillmentType, PaymentMethod } from "@prisma/client";

export const addToCartSchema = z.object({
  body: z.object({
    productId: z.uuid(),
    quantity: z.number().int().min(1),
  }),
});

export const updateCartItemSchema = z.object({
  body: z.object({
    quantity: z.number().int().min(1),
  }),
  params: z.object({
    cartItemId: z.uuid(),
  }),
});

export const cartItemParamsSchema = z.object({
  params: z.object({
    cartItemId: z.uuid(),
  }),
});

export const checkoutSchema = z.object({
  body: z.object({
    paymentMethod: z.enum(PaymentMethod),
    totalAmount: z.number(),
    sellerOrders: z.array(
      z.object({
        sellerId: z.uuid(),
        sellerName: z.string(),
        fulfillmentType: z.enum(FulfillmentType),
        meetupTime: z.iso.datetime().optional(),
        meetupLocation: z.string().optional(),
        meetupNotes: z.string().optional(),
        total: z.number(),

        items: z.array(
          z.object({
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
            })
          }),
        ),
      }),
    ),
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
