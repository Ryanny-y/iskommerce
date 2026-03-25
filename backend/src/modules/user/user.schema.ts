import { z } from "zod";
import { UserStatus } from "@prisma/client";

export const updateUserStatusSchema = z.object({
  body: z.object({
    userStatus: z.nativeEnum(UserStatus),
  }),
  params: z.object({
    userId: z.string().uuid(),
  }),
});

export const userDtoSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  email: z.string(),
  roles: z.array(z.string()),
  userStatus: z.string(),
  isVerified: z.boolean(),
  createdAt: z.string(),
});
