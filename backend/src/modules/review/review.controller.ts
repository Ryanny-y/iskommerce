import { Request, Response, NextFunction } from "express";
import * as reviewService from "./review.service";
import { CreateReviewDto, ReviewDto } from "./review.types";
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
