import { UserDto } from "./user.types";

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
