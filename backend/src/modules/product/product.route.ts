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

router.get("/:productId", verifyJwt, productController.getProductById);

router.patch(
  "/:productId",
  verifyJwt,
  upload.array('image'),
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
