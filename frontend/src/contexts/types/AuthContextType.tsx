import type { SignupFormValues } from "@/components/auth/types";

export type Role = "ADMIN" | "SUPER_ADMIN";

export type AuthResponseType = {
  success: boolean,
  message: string,
  data: {
    userData: {
      id: string,
      email: string,
      role: Role,
      fullName: string,
    }
    accessToken: string,
  }
}

export type AuthContextType = {
  authResponse:  AuthResponseType | null,
  login: (email: string, password: string) => Promise<boolean>,
  signup: (data: SignupFormValues) => Promise<boolean>,
  refreshToken: () => Promise<AuthResponseType | null>,
  logout: () => Promise<void>
  loading: boolean;
}