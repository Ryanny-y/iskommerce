import { Router } from "express";
import * as cartController from "./cart.controller";
import verifyJwt from "../../middlewares/verifyJwt";
import { validate } from "../../middlewares/validate";
import {
  addToCartSchema,
  cartItemParamsSchema,
  updateCartItemSchema,
} from "./cart.schema";

const router = Router();

router.get("/", verifyJwt, cartController.getCart);

router.post(
  "/items",
  verifyJwt,
  validate(addToCartSchema),
  cartController.addToCart,
);

router.patch(
  "/items/:productId",
  verifyJwt,
  validate(updateCartItemSchema),
  cartController.updateCartItem,
);

router.delete(
  "/items/:productId",
  verifyJwt,
  validate(cartItemParamsSchema),
  cartController.removeFromCart,
);

router.delete("/items", verifyJwt, cartController.clearCart);

export default router;
