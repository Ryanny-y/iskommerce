import type { SignupFormValues } from "@/components/auth/types";
import type { ApiResponse } from "@/types/common";

export type Role = "ADMIN" | "SUPER_ADMIN";

export type AuthResponseType = {
  userData: {
    id: string;
    email: string;
    role: Role;
    fullName: string;
  };
  accessToken: string;
};

export type AuthContextType = {
  authResponse: AuthResponseType | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (data: SignupFormValues) => Promise<boolean>;
  refreshToken: () => Promise<ApiResponse<AuthResponseType> | null>;
  logout: () => Promise<void>;
  verifyEmail: (email: string, code: string) => Promise<ApiResponse<void>>
  sendVerificationCode: (email: string) => Promise<ApiResponse<void>>
  loading: boolean;
};
