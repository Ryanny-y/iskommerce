import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type {
  AuthContextType,
  AuthResponseType,
} from "./types/AuthContextType";
import { toast } from "sonner";
import { API_URL } from "@/config/secrets";
import type { SignupFormValues } from "@/components/auth/types";
import type { ApiResponse } from "@/types/common";

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

      const data: ApiResponse<AuthResponseType> = await response.json();

      if (!response.ok) {
        throw {
          message: data.message || response.statusText,
          status: response.status,
        };
      }

      setAuthResponse(data.data ?? null);
      return true;
    } catch (error: any) {
      setAuthResponse(null);
      throw error;
    }
  };

  const signup = async (signupForm: SignupFormValues): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: signupForm.fullName,
          email: signupForm.email,
          password: signupForm.password,
          confirmPassword: signupForm.confirmPassword,
          roles: signupForm.roles,
        }),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || response.statusText);
      }

      return true;
    } catch (error: any) {
      throw error;
    }
  };

  const refreshToken =
    async (): Promise<ApiResponse<AuthResponseType> | null> => {
      try {
        
        const response = await fetch(`${API_URL}/auth/refresh-token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const data: ApiResponse<AuthResponseType> = await response.json();

        if (!response.ok) {
          throw new Error(data.message || response.statusText);
        }

        setAuthResponse(data.data ?? null);
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
      toast.success("Logged out.");
    } catch (error: any) {
      toast.error(error.message || "Session expired. Please log in again.");
    } finally {
      setAuthResponse(null);
    }
  };

  const verifyEmail = async (
    email: string,
    code: string,
  ): Promise<ApiResponse<void>> => {
    try {
      const response = await fetch(`${API_URL}/auth/verify-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          code,
        }),
        credentials: "include",
      });

      const data: ApiResponse<void> = await response.json();

      if (!response.ok) {
        throw new Error(data.message || response.statusText);
      }

      return data;
    } catch (error: any) {
      toast.error(error.message || "Session expired. Please log in again.");
      throw error;
    }
  };

  const sendVerificationCode = async (
    email: string,
  ): Promise<ApiResponse<void>> => {
    try {
      const response = await fetch(`${API_URL}/auth/send-verification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
        credentials: "include",
      });

      const data: ApiResponse<void> = await response.json();

      if (!response.ok) {
        throw new Error(data.message || response.statusText);
      }

      return data;
    } catch (error: any) {
      toast.error(error.message || "Session expired. Please log in again.");
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authResponse,
        login,
        signup,
        refreshToken,
        logout,
        verifyEmail,
        sendVerificationCode,
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
