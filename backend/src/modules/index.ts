import { Request, Response, Router } from "express";
import authRoute from "./auth/auth.route";
import adminAuthRoute from "./auth/admin-auth.route";
import productRoute from './product/product.route'
import categoryRoute from './category/category.route'
import cartRoute from './cart/cart.route'
import orderRoute from './order/order.route'
import notificationRoute from './notification/notification.route'
import chatRoute from './chat/chat.route'

const router = Router();

// AUTH
router.use("/auth", authRoute);
router.use("/admin-auth", adminAuthRoute);

// PUBLIC
router.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

// PROTECTED
router.use("/products", productRoute);
router.use("/categories", categoryRoute);
router.use("/cart", cartRoute);
router.use("/orders", orderRoute);
router.use("/notifications", notificationRoute);

router.use("/chat", chatRoute)


export default router;