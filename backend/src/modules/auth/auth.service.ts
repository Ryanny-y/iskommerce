import prismaClient from "../../config/client";
import bcrypt from "bcrypt";
import {
  AuthResponseDto,
  CreateUserDto,
  LoginUserDto,
  UserDto,
} from "./auth.types";
import { UserRole } from "@prisma/client";
import { CustomError } from '../../utils/Errors'
import jwt from "jsonwebtoken";
import { addDays } from "date-fns";

export const createUser = async (data: CreateUserDto): Promise<UserDto> => {
  const {
    id,
    fullName,
    email,
    password,
    confirmPassword,
    role,
  } = data;

  const normalizedEmail = email.toLowerCase();

  // Check if user exists
  const existingUser = await prismaClient.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (existingUser) {
    throw new CustomError(409, "User already exists");
  }

  if (password !== confirmPassword) {
    throw new CustomError(400, "Passwords do not match.");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const createdUser = await prismaClient.user.create({
    data: {
      ...(id && { id }),
      fullName,
      email: normalizedEmail,
      password: hashedPassword,
      role: role as UserRole,
    }
  });

  return {
    id: createdUser.id,
    fullName: createdUser.fullName,
    email: createdUser.email,
    role: createdUser.role,
  };
};

export const login = async (data: LoginUserDto): Promise<AuthResponseDto> => {
  const { email, password } = data;

  const foundUser = await prismaClient.user.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (!foundUser) throw new CustomError(401, "Email or password is incorrect.");

  const match = await bcrypt.compare(password, foundUser.password);
  if (!match) throw new CustomError(401, "Email or password is incorrect.");

  // CREATE JWTS
  const accessToken = jwt.sign(
    {
      sub: foundUser.id,
      role: foundUser.role,
    },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: "15m" },
  );

  const refreshToken = jwt.sign(
    {
      sub: foundUser.id,
      role: foundUser.role,
    },
    process.env.REFRESH_TOKEN_SECRET!,
    { expiresIn: "7d" },
  );

  // HASH PASSWORD BEFORE STORING IN THE DATABASE
  const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

  await prismaClient.user.update({
    where: {
      id: foundUser.id,
    },
    data: {
      refreshTokenHash: hashedRefreshToken,
      refreshTokenExpiresAt: addDays(new Date(), 7),
    },
  });

  return {
    userData: {
      id: foundUser.id,
      fullName: foundUser.fullName,
      email: foundUser.email,
      role: foundUser.role,
    },
    accessToken,
    refreshToken,
  };
};

export const refreshToken = async (
  refreshToken: string,
): Promise<AuthResponseDto> => {
  let payload: any;

  try {
    payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!);
  } catch {
    throw new CustomError(401, "Unauthorized");
  }

  const user = await prismaClient.user.findUnique({
    where: {
      id: payload.sub,
    },
  });

  if (!user || !user?.refreshTokenHash)
    throw new CustomError(401, "Unauthorized");

  const isSameToken = await bcrypt.compare(refreshToken, user.refreshTokenHash);

  if (
    !user.refreshTokenExpiresAt ||
    !isSameToken ||
    user.refreshTokenExpiresAt.getTime() < Date.now()
  ) {
    throw new CustomError(401, "Unauthorized");
  }

  const newAccessToken = jwt.sign(
    {
      sub: user.id,
      role: user.role,
    },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: "15m" },
  );

  return {
    userData: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    },
    accessToken: newAccessToken,
  };
};

export const logout = async (refreshToken: string): Promise<void> => {
  let payload: any;

  try {
    payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!);
  } catch {
    return;
  }

  const user = await prismaClient.user.findUnique({
    where: {
      id: payload.sub,
    },
    select: {
      refreshTokenHash: true,
    },
  });

  if (!user || !user.refreshTokenHash) {
    return;
  }

  const isValid = await bcrypt.compare(refreshToken, user.refreshTokenHash);

  if (!isValid) {
    return;
  }

  await prismaClient.user.update({
    where: {
      id: payload.sub,
    },
    data: {
      refreshTokenHash: null,
      refreshTokenExpiresAt: null,
    },
  });
};
