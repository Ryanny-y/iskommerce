import { createContext, useContext, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { API_URL } from "@/config/secrets";
import type { ApiResponse } from "@/types/common";
import type { AdminAuthContextType, AdminAuthResponseType } from "./types/AdminAuthContextType";

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [adminAuthResponse, setAdminAuthResponse] = useState<AdminAuthResponseType | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/admin-auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data: ApiResponse<AdminAuthResponseType> = await response.json();

      if (!response.ok) {
        throw { message: data.message || response.statusText, status: response.status };
      }

      setAdminAuthResponse(data.data ?? null);
      return true;
    } catch (error: any) {
      setAdminAuthResponse(null);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const refreshToken = async (): Promise<ApiResponse<AdminAuthResponseType> | null> => {
    try {
      const response = await fetch(`${API_URL}/admin-auth/refresh-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data: ApiResponse<AdminAuthResponseType> = await response.json();

      if (!response.ok) {
        throw new Error(data.message || response.statusText);
      }

      setAdminAuthResponse(data.data ?? null);
      return data;
    } catch (error: any) {
      toast.error(error.message || "Session expired. Please log in again.");
      return null;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await fetch(`${API_URL}/admin-auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      toast.success("Logged out.");
    } catch (error: any) {
      toast.error(error.message || "Failed to log out.");
    } finally {
      setAdminAuthResponse(null);
    }
  };

  return (
    <AdminAuthContext.Provider value={{ adminAuthResponse, loading, login, logout, refreshToken }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  return context;
};

export default useAdminAuth;
