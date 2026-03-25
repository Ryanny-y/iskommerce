import { Router } from "express";
import {
  adminLogin,
  adminLogout,
  adminRefreshToken,
} from "./admin-auth.controller";
import { adminLoginSchema, adminRefreshTokenCookieSchema } from "./admin-auth.schema";
import { validate } from "../../middlewares/validate";

const router = Router();

router.post("/login", validate(adminLoginSchema), adminLogin);
router.post("/refresh-token", validate(adminRefreshTokenCookieSchema), adminRefreshToken);
router.post("/logout", adminLogout);

export default router;
