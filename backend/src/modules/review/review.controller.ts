import { Request, Response, NextFunction } from "express";
import * as reviewService from "./review.service";
import { CreateReviewDto, GetProductReviewsParams, GetProductReviewsQuery, PaginatedProductReviews, ReviewDto, GetSellerReviewsParams, GetSellerReviewsQuery, PaginatedSellerReviews } from "./review.types";
import { ApiResponse } from "../../types/api";

export const createReview = async (
  req: Request<{}, {}, CreateReviewDto>,
  res: Response<ApiResponse<ReviewDto>>,
  next: NextFunction,
) => {
  try {
    const review = await reviewService.createReview(req.userId!, req.body);

    res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductReviews = async (
  req: Request<GetProductReviewsParams, {}, {}, GetProductReviewsQuery>,
  res: Response<ApiResponse<PaginatedProductReviews>>,
  next: NextFunction,
) => {
  try {
    const { productId } = req.params;
    const page = parseInt(req.query.page || "1");
    const limit = parseInt(req.query.limit || "10");

    const reviews = await reviewService.getProductReviews(
      productId,
      page,
      limit,
    );

    res.json({
      success: true,
      message: "Product reviews retrieved",
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};

export const getSellerReviews = async (
  req: Request<GetSellerReviewsParams, {}, {}, GetSellerReviewsQuery>,
  res: Response<ApiResponse<PaginatedSellerReviews>>,
  next: NextFunction,
) => {
  try {
    const { sellerId } = req.params;
    const page = parseInt(req.query.page || "1");
    const limit = parseInt(req.query.limit || "10");

    const reviews = await reviewService.getSellerReviews(
      sellerId,
      page,
      limit,
    );

    res.json({
      success: true,
      message: "Seller reviews retrieved",
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};
