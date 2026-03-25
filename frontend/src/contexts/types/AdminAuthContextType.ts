import type { ApiResponse } from "@/types/common";

export type AdminDto = {
  id: string;
  email: string;
};

export type AdminAuthResponseType = {
  adminData: AdminDto;
  accessToken: string;
};

export type AdminAuthContextType = {
  adminAuthResponse: AdminAuthResponseType | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<ApiResponse<AdminAuthResponseType> | null>;
};
