  import { Router } from "express";
import { createUser, login, logout, refreshToken, sendVerificationCode, verifyEmail } from "./auth.controller";
import {
  createUserBodySchema,
  loginUserBodySchema,
  refreshTokenCookieSchema,
  sendVerificationCodeSchema,
  verifyEmailSchema,
} from "./auth.schema";
import { validate } from "../../middlewares/validate";

const router = Router();

router.post("/signup", validate(createUserBodySchema), createUser);
router.post("/login", validate(loginUserBodySchema), login);
router.post("/refresh-token", validate(refreshTokenCookieSchema), refreshToken);
router.post("/logout", logout)
router.post("/send-verification", validate(sendVerificationCodeSchema), sendVerificationCode);
router.post("/verify-email", validate(verifyEmailSchema), verifyEmail);

export default router;