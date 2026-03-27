import prisma from "../../config/client";
import { uploadFile } from "../../services/s3.service";
import { mapUserToDto, mapSingleUserToDto } from "./user.mapper";
import { UpdateUserStatusDto, UserDto, SingleUserDto, UpdateUserProfileDto } from "./user.types";

export const getAllUsers = async (): Promise<UserDto[]> => {
  const users = await prisma.user.findMany({
    include: {
      roles: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return users.map((user) => mapUserToDto(user));
};

export const updateUserStatus = async (
  userId: string,
  data: UpdateUserStatusDto,
): Promise<UserDto> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      userStatus: data.userStatus,
    },
    include: {
      roles: true,
    },
  });

  return mapUserToDto(updatedUser);
};

export const getSingleUser = async (userId: string): Promise<SingleUserDto> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      roles: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return mapSingleUserToDto(user);
};

export const updateUserProfile = async (
  userId: string,
  data: UpdateUserProfileDto,
  file?: Express.Multer.File,
): Promise<SingleUserDto> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  let avatarUrl: string | undefined;

  if (file) {
    const s3Result = await uploadFile(
      file.buffer,
      file.originalname,
      file.mimetype,
      `avatars/${userId}`,
    );
    avatarUrl = s3Result.url;
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      ...(data.bio !== undefined && { bio: data.bio }),
      ...(avatarUrl && { avatar: avatarUrl }),
      ...(data.fullName !== undefined && { fullName: data.fullName }),
    },
    include: {
      roles: true,
    },
  });

  return mapSingleUserToDto(updatedUser);
};
