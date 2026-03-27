import prisma from "../../config/client";
import { mapUserToDto, mapSingleUserToDto } from "./user.mapper";
import { UpdateUserStatusDto, UserDto, SingleUserDto } from "./user.types";

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
