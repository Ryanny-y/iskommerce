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

export const getProductReviewsSchema = z.object({
  params: z.object({
    productId: z.string().uuid(),
  }),
  query: z.object({
    page: z.string().optional().default("1"),
    limit: z.string().optional().default("10"),
  }),
});

export const getSellerReviewsSchema = z.object({
  params: z.object({
    sellerId: z.string().uuid(),
  }),
  query: z.object({
    page: z.string().optional().default("1"),
    limit: z.string().optional().default("10"),
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

export const productReviewItemSchema = z.object({
  id: z.string(),
  rating: z.number(),
  comment: z.string().nullable(),
  createdAt: z.string(),
  user: z.object({
    id: z.string(),
    fullName: z.string(),
  }),
});

export const paginatedProductReviewsSchema = z.object({
  reviews: z.array(productReviewItemSchema),
  pagination: z.object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    totalPages: z.number(),
  }),
});

export const sellerReviewItemSchema = z.object({
  id: z.string(),
  rating: z.number(),
  comment: z.string().nullable(),
  createdAt: z.string(),
  reviewer: z.object({
    id: z.string(),
    fullName: z.string(),
    avatar: z.string().optional(),
    isVerified: z.boolean()
  }),
});

export const paginatedSellerReviewsSchema = z.object({
  reviews: z.array(sellerReviewItemSchema),
  pagination: z.object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    totalPages: z.number(),
  }),
});
