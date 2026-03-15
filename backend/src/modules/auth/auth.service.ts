import prismaClient from "../../config/client";
import bcrypt from "bcrypt";
import {
  AuthResponseDto,
  CreateUserDto,
  LoginUserDto,
  UserDto,
} from "./auth.types";
import { CustomError } from "../../utils/Errors";
import jwt from "jsonwebtoken";
import { addDays } from "date-fns";
import { Role, UserRole } from "@prisma/client";

export const createUser = async (data: CreateUserDto): Promise<UserDto> => {
  const { fullName, email, password, confirmPassword, roles } = data;

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
      fullName,
      email: normalizedEmail,
      password: hashedPassword,

      roles: {
        create: roles.map((role: Role) => ({
          role,
        })),
      },
    },
    include: {
      roles: true,
    },
  });

  return {
    id: createdUser.id,
    fullName: createdUser.fullName,
    email: createdUser.email,
    roles: convertUserRoleToRoleEnum(createdUser.roles),
  };
};

export const login = async (data: LoginUserDto): Promise<AuthResponseDto> => {
  const { email, password } = data;

  const foundUser = await prismaClient.user.findUnique({
    where: { email: email.toLowerCase() },
    include: {
      roles: true,
    },
  });

  if (!foundUser) throw new CustomError(401, "Email or password is incorrect.");

  const match = await bcrypt.compare(password, foundUser.password);
  if (!match) throw new CustomError(401, "Email or password is incorrect.");

  const userRoles = convertUserRoleToRoleEnum(foundUser.roles);

  // CREATE JWTS
  const accessToken = jwt.sign(
    {
      sub: foundUser.id,
      role: userRoles,
    },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: "15m" },
  );

  const refreshToken = jwt.sign(
    {
      sub: foundUser.id,
      role: userRoles,
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
      roles: userRoles
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

  const foundUser = await prismaClient.user.findUnique({
    where: {
      id: payload.sub,
    },
    include: {
      roles: true
    }
  });

  if (!foundUser || !foundUser?.refreshTokenHash)
    throw new CustomError(401, "Unauthorized");

  const isSameToken = await bcrypt.compare(refreshToken, foundUser.refreshTokenHash);

  if (
    !foundUser.refreshTokenExpiresAt ||
    !isSameToken ||
    foundUser.refreshTokenExpiresAt.getTime() < Date.now()
  ) {
    throw new CustomError(401, "Unauthorized");
  }

  const userRoles = convertUserRoleToRoleEnum(foundUser.roles);

  const newAccessToken = jwt.sign(
    {
      sub: foundUser.id,
      role: userRoles,
    },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: "15m" },
  );

  return {
    userData: {
      id: foundUser.id,
      fullName: foundUser.fullName,
      email: foundUser.email,
      roles: userRoles,
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

const convertUserRoleToRoleEnum = (roles: UserRole[]) => {
  return roles.map((r) => r.role);
};
