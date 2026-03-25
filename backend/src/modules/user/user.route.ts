import { Router } from "express";
import * as userController from "./user.controller";
import verifyJwt from "../../middlewares/verifyJwt";
import { verifyAdmin } from "../../middlewares/verifyAdmin";
import { validate } from "../../middlewares/validate";
import { updateUserStatusSchema } from "./user.schema";

const router = Router();

router.get("/", verifyJwt, verifyAdmin, userController.getAllUsers);

router.patch(
  "/:userId/status",
  verifyJwt,
  verifyAdmin,
  validate(updateUserStatusSchema),
  userController.updateUserStatus,
);

export default router;
