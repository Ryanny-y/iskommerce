import { Request, Response } from "express";
import * as chatService from "./chat.service";
import { mapConversation, mapMessage } from "./chat.mapper";

class ChatController {

  async createConversation(req: Request, res: Response) {
    try {
      const buyerId = req.userId!; 
      const { sellerId } = req.body;

      const conversation = await chatService.createOrGetConversation(
        buyerId,
        sellerId
      );

      res.json(mapConversation(conversation));
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  async getMyConversations(req: Request, res: Response) {
    try {
      const userId = req.userId!;

      const conversations = await chatService.getUserConversations(userId);

      res.json(conversations.map(mapConversation));
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  async getMessages(req: Request<{ conversationId: string }>, res: Response) {
    try {
      const userId = req.userId!;
      const { conversationId } = req.params;

      const messages = await chatService.getMessages(
        conversationId,
        userId
      );

      res.json(messages.map(mapMessage));
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  async sendMessage(req: Request, res: Response) {
    try {
      const senderId = req.userId!;
      const { conversationId, message, imageUrl } = req.body;

      const newMessage = await chatService.sendMessage({
        conversationId,
        senderId,
        message,
        imageUrl,
      });

      res.json(mapMessage(newMessage));
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }
}

export default new ChatController();