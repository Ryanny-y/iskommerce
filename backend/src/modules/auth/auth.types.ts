import z from "zod";
;
import { authResponseSchema, createUserBodySchema, loginUserBodySchema, refreshTokenCookieSchema, userDtoSchema } from "./auth.schema";
import { ApiResponse } from "../../types/api";

export type UserDto = z.infer<typeof userDtoSchema>;
export type AuthResponseDto = z.infer<typeof authResponseSchema>;

export type RefreshTokenCookies = z.infer<typeof refreshTokenCookieSchema>;

export type CreateUserDto = z.infer<typeof createUserBodySchema>["body"];
export type LoginUserDto = z.infer<typeof loginUserBodySchema>["body"];

// Responses
export type CreateUserResponse = ApiResponse<UserDto>;
export type LoginResponse = ApiResponse<AuthResponseDto>;
export type RefreshTokenResponse = ApiResponse<AuthResponseDto>;
export type LogoutResponse = ApiResponse<void>;