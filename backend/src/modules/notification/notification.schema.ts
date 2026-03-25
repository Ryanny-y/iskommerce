import { z } from "zod";

export const notificationDtoSchema = z.object({
  id: z.string(),
  type: z.string(),
  message: z.string(),
  isRead: z.boolean(),
  createdAt: z.string(),
});
