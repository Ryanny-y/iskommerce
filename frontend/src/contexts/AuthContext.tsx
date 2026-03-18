
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type {
  AuthContextType,
  AuthResponseType,
} from "./types/AuthContextType";
import { toast } from "sonner";
import { API_URL } from "@/config/secrets";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authResponse, setAuthResponse] = useState<AuthResponseType | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(false);

  // useEffect(() => {
  //   const initializeAuth = async () => {
  //     const data = await refreshToken();
  //       if (data) {
  //         if(data.data.role || ["ADMIN", "SUPER_ADMIN"].includes(data.data.role)) {
  //           setAuthResponse(data);
  //         } else {
  //           setAuthResponse(null);
  //           await logout();
  //         }
  //       } else {
  //         await logout();
  //       }
  //     setLoading(false);
  //   };
  //   initializeAuth();
  // }, []);

  // const
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data: AuthResponseType = await response.json();

      if (!response.ok) {
        throw new Error(data.message || response.statusText);
      }
      
      setAuthResponse(data);
      return true;
    } catch (error: any) {
      setAuthResponse(null);
      throw error;
    }
  };

  const refreshToken = async (): Promise<AuthResponseType | null> => {
    try {
      const response = await fetch(`${API_URL}/auth/refresh-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data: AuthResponseType = await response.json();

      if (!response.ok) {
        throw new Error(data.message || response.statusText);
      }

      setAuthResponse(data);
      return data;
    } catch (error: any) {
      toast.error(error.message || "Session expired. Please log in again.");
      return null;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      toast.success("Logged out.")
    } catch (error: any) {
      toast.error(error.message || "Session expired. Please log in again.");
    } finally {
      setAuthResponse(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authResponse,
        login,
        refreshToken,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default useAuth;
