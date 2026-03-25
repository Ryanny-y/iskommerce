import prismaClient from "../../config/client";
import bcrypt from "bcrypt";
import { AdminAuthResponseDto, AdminDto, AdminLoginDto } from "./admin-auth.types";
import { CustomError } from "../../utils/Errors";
import jwt from "jsonwebtoken";
import { addDays } from "date-fns";

export const adminLogin = async (data: AdminLoginDto) => {
  const { email, password } = data;

  const foundAdmin = await prismaClient.admin.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (!foundAdmin)
    throw new CustomError(401, "Email or password is incorrect.");

  const match = await bcrypt.compare(password, foundAdmin.password);
  if (!match) throw new CustomError(401, "Email or password is incorrect.");

  const accessToken = jwt.sign(
    {
      sub: foundAdmin.id,
      role: "ADMIN",
    },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: "15m" },
  );

  const refreshToken = jwt.sign(
    {
      sub: foundAdmin.id,
      role: "ADMIN",
    },
    process.env.REFRESH_TOKEN_SECRET!,
    { expiresIn: "7d" },
  );

  return {
    adminData: {
      id: foundAdmin.id,
      email: foundAdmin.email,
    },
    accessToken,
    refreshToken,
  };
};

export const adminRefreshToken = async (
  refreshToken: string,
): Promise<AdminAuthResponseDto> => {
  let payload: any;
  try {
    payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!);
  } catch {
    throw new CustomError(401, "Unauthorized");
  }

  const foundAdmin = await prismaClient.admin.findUnique({
    where: {
      id: payload.sub,
    },
  });

  if (!foundAdmin) throw new CustomError(401, "Unauthorized");

  const newAccessToken = jwt.sign(
    {
      sub: foundAdmin.id,
      role: "ADMIN",
    },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: "15m" },
  );

  return {
    adminData: {
      id: foundAdmin.id,
      email: foundAdmin.email,
    },
    accessToken: newAccessToken,
  };
};

export const adminLogout = async (refreshToken: string): Promise<void> => {
  let payload: any;

  try {
    payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!);
  } catch {
    return;
  }

  const admin = await prismaClient.admin.findUnique({
    where: {
      id: payload.sub,
    },
  });

  if (!admin) {
    return;
  }
};
