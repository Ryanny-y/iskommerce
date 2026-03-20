import { Router } from "express";
import * as orderController from "./order.controller";
import verifyJwt from "../../middlewares/verifyJwt";
import { validate } from "../../middlewares/validate";
import { updateOrderStatusSchema } from "./order.schema";

const router = Router();

router.get("/buyer", verifyJwt, orderController.getBuyerOrders);

router.get("/buyer/stats", verifyJwt, orderController.getBuyerOrderStats);

router.get("/seller", verifyJwt, orderController.getSellerOrders);

router.get("/seller/stats", verifyJwt, orderController.getSellerOrderStats);

router.patch(
  "/:orderId/status",
  verifyJwt,
  validate(updateOrderStatusSchema),
  orderController.updateOrderStatus,
);

export default router;
