import { Request, Response, Router } from "express";
import authRoute from "./auth/auth.route";
import categoryRoute from './category/category.route'

const router = Router();

// AUTH
router.use("/auth", authRoute);

// PUBLIC
router.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

// PROTECTED
router.use("/categories", categoryRoute);


export default router;