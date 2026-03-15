import { z } from "zod";
import { UserRole } from "@prisma/client";

export const createUserBodySchema = z.object({
  body: z.object({
    id: z.string().regex(/^\d{11}$/, "ID must be exactly 11 digits").optional(),
    fullName: z.string().min(1, "Full name is required"),
    email: z.email("Invalid email address").min(1, "Email is required"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .regex(/[A-Z]/, "Must contain an uppercase letter")
      .regex(/[0-9]/, "Must contain a number"),

    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .regex(/[A-Z]/, "Must contain an uppercase letter")
      .regex(/[0-9]/, "Must contain a number"),

    role: z.enum(UserRole),
  })
});

export const loginUserBodySchema = z.object({
  body: z.object({
    email: z.email().min(1, "Email is required."),
    password: z.string().min(1, "Password is required."),
    role: z.enum(UserRole)
  })
})

export const refreshTokenCookieSchema = z.object({
  cookies: z.object({
    refresh_token: z.string(),
  }),
});

export const userDtoSchema = z.object({
  id: z.string(),
  fullName: z.string().optional(),
  email: z.email(),
  role: z.enum(UserRole),
});

export const authResponseSchema = z.object({
  userData: userDtoSchema,
  accessToken: z.string(),
  refreshToken: z.string().optional()
})