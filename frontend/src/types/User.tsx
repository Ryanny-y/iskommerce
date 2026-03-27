export const roles = ['BUYER', 'SELLER'] as const;
export type Role = (typeof roles)[number];
export interface User {
  id: string;
  bio?: string;
  avatar?: string;
  fullName: string;
  email: string;
  rating?: number;
  roles: Role[];
  createdAt: string;
  isVerified: boolean;
}