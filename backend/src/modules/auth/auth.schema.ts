import { z } from "zod";
import { Role, UserRole } from "@prisma/client";

export const createUserBodySchema = z.object({
  body: z.object({
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

    roles: z.array(z.enum(Role)).min(1, "Al leaste one role is required"),
  })
});

export const loginUserBodySchema = z.object({
  body: z.object({
    email: z.email().min(1, "Email is required."),
    password: z.string().min(1, "Password is required."),
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
  roles: z.array(z.enum(Role)),
});

export const authResponseSchema = z.object({
  userData: userDtoSchema,
  accessToken: z.string(),
  refreshToken: z.string().optional()
})