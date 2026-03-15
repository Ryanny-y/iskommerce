import { Request, Response, Router } from "express";
import authRoute from "./auth/auth.route";

const router = Router();

// AUTH
router.use("/auth", authRoute);

// PUBLIC
router.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

// PROTECTED



export default router;