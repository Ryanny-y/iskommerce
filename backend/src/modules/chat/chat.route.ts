import { Router } from "express";
import * as chatController from "./chat.controller";
import verifyJwt from "../../middlewares/verifyJwt";

const router = Router();

// Conversations
router.post("/conversations", verifyJwt, chatController.createConversation);
router.get("/conversations", verifyJwt, chatController.getMyConversations);
router.get(
  "/conversations/:conversationId",
  verifyJwt,
  chatController.getSingleConversation,
);

// Messages
router.get(
  "/conversations/:conversationId/messages",
  verifyJwt,
  chatController.getMessages,
);
router.post("/messages", verifyJwt, chatController.sendMessage);

export default router;
