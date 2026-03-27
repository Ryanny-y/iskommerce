import { Router } from "express";
import * as userController from "./user.controller";
import verifyJwt from "../../middlewares/verifyJwt";
import { verifyAdmin } from "../../middlewares/verifyAdmin";
import { validate } from "../../middlewares/validate";
import { updateUserStatusSchema, userParamsSchema, updateUserProfileSchema } from "./user.schema";
import { upload } from "../../middlewares/upload";

const router = Router();

router.get("/", verifyJwt, verifyAdmin, userController.getAllUsers);

router.get(
  "/:userId",
  verifyJwt,
  validate(userParamsSchema),
  userController.getSingleUser,
);

router.patch(
  "/",
  verifyJwt,
  upload.single("avatar"),
  validate(updateUserProfileSchema),
  userController.updateUserProfile,
);

router.patch(
  "/:userId/status",
  verifyJwt,
  verifyAdmin,
  validate(updateUserStatusSchema),
  userController.updateUserStatus,
);

export default router;
