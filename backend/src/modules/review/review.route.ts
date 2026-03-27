import { Router } from "express";
import * as reviewController from "./review.controller";
import verifyJwt from "../../middlewares/verifyJwt";
import { validate } from "../../middlewares/validate";
import { createReviewSchema } from "./review.schema";

const router = Router();

router.post(
  "/",
  verifyJwt,
  validate(createReviewSchema),
  reviewController.createReview,
);

export default router;
