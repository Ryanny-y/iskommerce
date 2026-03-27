import { Router } from "express";
import * as reviewController from "./review.controller";
import verifyJwt from "../../middlewares/verifyJwt";
import { validate } from "../../middlewares/validate";
import { createReviewSchema, getProductReviewsSchema, getSellerReviewsSchema } from "./review.schema";

const router = Router();

router.post(
  "/",
  verifyJwt,
  validate(createReviewSchema),
  reviewController.createReview,
);

router.get(
  "/product/:productId",
  verifyJwt,
  validate(getProductReviewsSchema),
  reviewController.getProductReviews,
);

router.get(
  "/seller/:sellerId",
  verifyJwt,
  validate(getSellerReviewsSchema),
  reviewController.getSellerReviews,
);

export default router;
