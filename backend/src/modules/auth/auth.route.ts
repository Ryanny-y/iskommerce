  import { Router } from "express";
import { createUser, login, logout, refreshToken } from "./auth.controller";
import {
  createUserBodySchema,
  loginUserBodySchema,
  refreshTokenCookieSchema,
} from "./auth.schema";
import { validate } from "../../middlewares/validate";

const router = Router();

router.post("/signup", validate(createUserBodySchema), createUser);
router.post("/login", validate(loginUserBodySchema), login);
router.post("/refresh-token", validate(refreshTokenCookieSchema), refreshToken);
router.post("/logout", logout)

export default router;