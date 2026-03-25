import { Router } from "express";
import * as notificationController from "./notification.controller";
import verifyJwt from "../../middlewares/verifyJwt";

const router = Router();

router.get("/", verifyJwt, notificationController.getUserNotifications);

export default router;
