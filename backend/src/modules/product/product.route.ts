import { Router } from "express";
import * as productController from "./product.controller";
import verifyJwt from "../../middlewares/verifyJwt";
import { upload } from "../../middlewares/upload";
import { validate } from "../../middlewares/validate";
import {
  createProductBodySchema,
  productParamsSchema,
  updateProductSchema,
} from "./product.schema";

const router = Router();

router.post(
  "/",
  verifyJwt,
  upload.array("image"),
  validate(createProductBodySchema),
  productController.createProduct,
);

router.get("/", verifyJwt, productController.getAllProducts);

router.get("/my-listings", verifyJwt, productController.getSellerProducts);

router.patch(
  "/:productId",
  verifyJwt,
  validate(updateProductSchema),
  productController.updateProduct,
);

router.delete(
  "/:productId",
  verifyJwt,
  validate(productParamsSchema),
  productController.deleteProduct,
);

export default router;
