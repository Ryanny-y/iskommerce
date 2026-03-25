import { z } from "zod";

export const createAdminSchema = z.object({
  body: z.object({
    email: z.email("Invalid email address").min(1, "Email is required"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
  }),
});

export const adminLoginSchema = z.object({
  body: z.object({
    email: z.email().min(1, "Email is required."),
    password: z.string().min(1, "Password is required."),
  }),
});

export const adminRefreshTokenCookieSchema = z.object({
  cookies: z.object({
    admin_refresh_token: z.string(),
  }),
});

export const adminDtoSchema = z.object({
  id: z.string(),
  email: z.email(),
});

export const adminAuthResponseSchema = z.object({
  adminData: adminDtoSchema,
  accessToken: z.string(),
});
