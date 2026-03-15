import z from "zod";
import { uuidSchema } from "./schema";

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

export type UuidDto = z.infer<typeof uuidSchema>