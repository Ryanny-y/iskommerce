import { NextFunction, Request, Response } from "express";
import * as authService from "./auth.service";
import { AuthResponseDto, CreateUserDto, CreateUserResponse, LoginResponse, LoginUserDto, LogoutResponse, RefreshTokenResponse } from "./auth.types";
import { refreshTokenCookieSchema } from "./auth.schema";
import { ZodError } from "zod";
import { CustomError } from "../../utils/Errors";

export const createUser = async (
  req: Request<{}, {}, CreateUserDto>,
  res: Response<CreateUserResponse>,
  next: NextFunction,
) => {
  try {
    const createdUser = await authService.createUser(req.body);

    return res.status(201).json({
      success: true,
      message: "Sign up successfully.",
      data: createdUser,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request<{}, {}, LoginUserDto>,
  res: Response<LoginResponse>,
  next: NextFunction,
) => {
  try {
    const loginData: AuthResponseDto = await authService.login(req.body);

    res.cookie("refresh_token", loginData.refreshToken as string, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 * 7,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      path: "/api/v1/auth",
    });

    const loginResponse = {
      userData: loginData.userData,
      accessToken: loginData.accessToken,
    };

    return res.json({
      success: true,
      message: "User Login",
      data: loginResponse,
    });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (
  req: Request,
  res: Response<RefreshTokenResponse>,
  next: NextFunction,
) => {
  try {
    const { cookies } = refreshTokenCookieSchema.parse({
      cookies: req.cookies,
    });
    const { refresh_token } = cookies;

    const refreshResponse = await authService.refreshToken(refresh_token);

    return res.json({
      success: true,
      message: "Access Token Refreshed",
      data: refreshResponse,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return next(new CustomError(401, "Unauthorized"));
    }
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response<LogoutResponse>,
  next: NextFunction,
) => {
  try {
    const parsed = refreshTokenCookieSchema.safeParse({
      cookies: req.cookies,
    });

    if (parsed.success) {
      const { refresh_token } = parsed.data.cookies;
      await authService.logout(refresh_token);
    }

    res.clearCookie("refresh_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      path: "/api/v1/auth",
    });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};