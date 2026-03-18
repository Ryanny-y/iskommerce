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
  refreshToken: () => Promise<AuthResponseType | null>,
  logout: () => Promise<void>
  loading: boolean;
}