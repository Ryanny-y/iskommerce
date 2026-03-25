export type UserStatus = "PENDING" | "APPROVED" | "REJECTED";

export type AdminUser = {
  id: string;
  fullName: string;
  email: string;
  roles: string[];
  createdAt: string;
  status: UserStatus;
};
