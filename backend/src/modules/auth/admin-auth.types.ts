import z from "zod";
import {
  adminAuthResponseSchema,
  adminDtoSchema,
  adminLoginSchema,
  adminRefreshTokenCookieSchema,
} from "./admin-auth.schema";
import { ApiResponse } from "../../types/api";

export type AdminDto = z.infer<typeof adminDtoSchema>;
export type AdminAuthResponseDto = z.infer<typeof adminAuthResponseSchema>;
export type AdminRefreshTokenCookies = z.infer<
  typeof adminRefreshTokenCookieSchema
>;
export type AdminLoginDto = z.infer<typeof adminLoginSchema>["body"];

export type AdminLoginResponse = ApiResponse<AdminAuthResponseDto>;
export type AdminRefreshTokenResponse = ApiResponse<AdminAuthResponseDto>;
export type AdminLogoutResponse = ApiResponse<void>;
