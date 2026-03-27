import { z } from "zod";

export const createReviewSchema = z.object({
  body: z.object({
    orderId: z.string().uuid(),
    productReviews: z
      .array(
        z.object({
          productId: z.string().uuid(),
          rating: z.number().int().min(1).max(5),
          comment: z.string().optional(),
        }),
      )
      .optional(),
    sellerReview: z
      .object({
        rating: z.number().int().min(1).max(5),
        comment: z.string().optional(),
      })
      .optional(),
  }),
});

export const reviewDtoSchema = z.object({
  productReviews: z.array(
    z.object({
      id: z.string(),
      productId: z.string(),
      productName: z.string(),
      rating: z.number(),
      comment: z.string().nullable(),
      createdAt: z.string(),
    }),
  ),
  sellerReview: z
    .object({
      id: z.string(),
      sellerId: z.string(),
      sellerName: z.string(),
      rating: z.number(),
      comment: z.string().nullable(),
      createdAt: z.string(),
    })
    .nullable(),
});
