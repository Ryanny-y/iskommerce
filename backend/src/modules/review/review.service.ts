import prisma from "../../config/client";
import { CreateReviewDto, ReviewDto } from "./review.types";

export const createReview = async (
  userId: string,
  data: CreateReviewDto,
): Promise<ReviewDto> => {
  const order = await prisma.order.findUnique({
    where: { id: data.orderId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
      seller: true,
    },
  });

  console.log("Fetched order:", order);
  console.log(
    "Order item product IDs:",
    order?.items.map((i) => i.productId),
  );

  if (!order) {
    throw new Error("Order not found");
  }

  if (order.buyerId !== userId) {
    throw new Error("Unauthorized to review this order");
  }

  if (order.status !== "COMPLETED") {
    throw new Error("Can only review completed orders");
  }

  console.log("Incoming productReviews payload:", data.productReviews);
  const result = await prisma.$transaction(async (tx) => {
    const createdProductReviews = [];
    let createdSellerReview = null;

    if (data.productReviews && data.productReviews.length > 0) {
      for (const productReview of data.productReviews) {
        console.log("Creating review for productId:", productReview.productId);
        const existingReview = await tx.productReview.findUnique({
          where: {
            userId_productId_orderId: {
              userId,
              productId: productReview.productId,
              orderId: data.orderId,
            },
          },
        });

        if (existingReview) {
          throw new Error(
            `Product ${productReview.productId} already reviewed for this order`,
          );
        }

        const review = await tx.productReview.create({
          data: {
            userId,
            productId: productReview.productId,
            orderId: data.orderId,
            rating: productReview.rating,
            comment: productReview.comment ?? null,
          },
          include: {
            product: true,
          },
        });

        const productReviews = await tx.productReview.findMany({
          where: { productId: productReview.productId },
        });

        const avgRating =
          productReviews.reduce((sum, r) => sum + r.rating, 0) /
          productReviews.length;

        await tx.product.update({
          where: { id: productReview.productId },
          data: { rating: avgRating },
        });

        createdProductReviews.push(review);
      }
    }

    if (data.sellerReview) {
      const existingSellerReview = await tx.userReview.findUnique({
        where: {
          reviewerId_reviewedId_orderId: {
            reviewerId: userId,
            reviewedId: order.sellerId,
            orderId: data.orderId,
          },
        },
      });

      if (existingSellerReview) {
        throw new Error("Seller already reviewed for this order");
      }

      createdSellerReview = await tx.userReview.create({
        data: {
          reviewerId: userId,
          reviewedId: order.sellerId,
          orderId: data.orderId,
          rating: data.sellerReview.rating,
          comment: data.sellerReview.comment ?? null,
        },
      });

      const sellerReviews = await tx.userReview.findMany({
        where: { reviewedId: order.sellerId },
      });

      const avgRating =
        sellerReviews.reduce((sum, r) => sum + r.rating, 0) /
        sellerReviews.length;

      await tx.user.update({
        where: { id: order.sellerId },
        data: { rating: avgRating },
      });
    }

    return { createdProductReviews, createdSellerReview, order };
  });

  return {
    productReviews: result.createdProductReviews.map((review) => ({
      id: review.id,
      productId: review.productId,
      productName: review.product.name,
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt.toISOString(),
    })),
    sellerReview: result.createdSellerReview
      ? {
          id: result.createdSellerReview.id,
          sellerId: result.order.sellerId,
          sellerName: result.order.seller.fullName,
          rating: result.createdSellerReview.rating,
          comment: result.createdSellerReview.comment,
          createdAt: result.createdSellerReview.createdAt.toISOString(),
        }
      : null,
  };
};
