import { Router } from "express";
import * as orderController from "./order.controller";
import verifyJwt from "../../middlewares/verifyJwt";
import { validate } from "../../middlewares/validate";
import { acceptOrderSchema, cancelOrderSchema, completeOrderSchema, orderParamsSchema, updateOrderStatusSchema } from "./order.schema";

const router = Router();

router.get("/buyer", verifyJwt, orderController.getBuyerOrders);

router.get("/buyer/stats", verifyJwt, orderController.getBuyerOrderStats);

router.get("/seller", verifyJwt, orderController.getSellerOrders);

router.get("/seller/stats", verifyJwt, orderController.getSellerOrderStats);

router.get(
  "/seller/:orderId",
  verifyJwt,
  validate(orderParamsSchema),
  orderController.getSellerOrder,
);

router.post(
  "/:orderId/accept",
  verifyJwt,
  validate(acceptOrderSchema),
  orderController.acceptOrder,
);

router.post(
  "/:orderId/complete",
  verifyJwt,
  validate(completeOrderSchema),
  orderController.completeOrder,
);

router.post(
  "/:orderId/cancel",
  verifyJwt,
  validate(cancelOrderSchema),
  orderController.cancelOrder,
);

router.patch(
  "/:orderId/status",
  verifyJwt,
  validate(updateOrderStatusSchema),
  orderController.updateOrderStatus,
);

export default router;
