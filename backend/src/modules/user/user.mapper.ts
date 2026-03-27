import { UserDto, SingleUserDto } from "./user.types";

export const mapUserToDto = (user: any): UserDto => {
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    roles: user.roles.map((r: any) => r.role),
    userStatus: user.userStatus,
    isVerified: user.isVerified,
    createdAt: user.createdAt.toISOString(),
  };
};

export const mapSingleUserToDto = (user: any): SingleUserDto => {
  return {
    id: user.id,
    bio: user.bio,
    avatar: user.avatar,
    fullName: user.fullName,
    email: user.email,
    rating: user.rating ? parseFloat(user.rating.toString()) : null,
    roles: user.roles.map((r: any) => r.role),
    createdAt: user.createdAt.toISOString(),
    isVerified: user.isVerified,
  };
};
