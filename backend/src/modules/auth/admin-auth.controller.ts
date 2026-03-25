import { NextFunction, Request, Response } from "express";
import * as adminAuthService from "./admin-auth.service";
import {
  AdminLoginDto,
  AdminLoginResponse,
  AdminLogoutResponse,
  AdminRefreshTokenResponse,
} from "./admin-auth.types";
import { adminRefreshTokenCookieSchema } from "./admin-auth.schema";
import { ZodError } from "zod";
import { CustomError } from "../../utils/Errors";

export const adminLogin = async (
  req: Request<{}, {}, AdminLoginDto>,
  res: Response<AdminLoginResponse>,
  next: NextFunction,
) => {
  try {
    const loginData = await adminAuthService.adminLogin(req.body);

    res.cookie("admin_refresh_token", loginData.refreshToken as string, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 * 7,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      path: "/api/v1/admin-auth",
    });

    const loginResponse = {
      adminData: loginData.adminData,
      accessToken: loginData.accessToken,
    };

    return res.json({
      success: true,
      message: "Admin Login",
      data: loginResponse,
    });
  } catch (error) {
    next(error);
  }
};

export const adminRefreshToken = async (
  req: Request,
  res: Response<AdminRefreshTokenResponse>,
  next: NextFunction,
) => {
  try {
    const { cookies } = adminRefreshTokenCookieSchema.parse({
      cookies: req.cookies,
    });

    const { admin_refresh_token } = cookies;

    const refreshResponse =
      await adminAuthService.adminRefreshToken(admin_refresh_token);

    return res.json({
      success: true,
      message: "Admin Access Token Refreshed",
      data: refreshResponse,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return next(new CustomError(401, "Unauthorized"));
    }
    next(error);
  }
};

export const adminLogout = async (
  req: Request,
  res: Response<AdminLogoutResponse>,
  next: NextFunction,
) => {
  try {
    const parsed = adminRefreshTokenCookieSchema.safeParse({
      cookies: req.cookies,
    });

    if (parsed.success) {
      const { admin_refresh_token } = parsed.data.cookies;
      await adminAuthService.adminLogout(admin_refresh_token);
    }

    res.clearCookie("admin_refresh_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      path: "/api/v1/admin-auth",
    });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
