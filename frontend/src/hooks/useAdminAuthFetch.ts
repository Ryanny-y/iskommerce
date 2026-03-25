import useAdminAuth from "@/contexts/AdminAuthContext";
import { useCallback } from "react";

const useAdminAuthFetch = () => {
  const apiURL = import.meta.env.VITE_API_URL;
  const { adminAuthResponse, refreshToken, logout } = useAdminAuth();

  const adminAuthFetch = useCallback(
    async <T = any>(url: string, options: RequestInit = {}): Promise<T> => {
      let token = adminAuthResponse?.accessToken;
      const isFormData = options.body instanceof FormData;

      const buildHeaders = (accessToken?: string) => {
        const headers = new Headers(options.headers || {});
        if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);
        if (!isFormData) headers.set("Content-Type", "application/json");
        return headers;
      };

      try {
        let response = await fetch(`${apiURL}/${url}`, {
          ...options,
          headers: buildHeaders(token),
          credentials: "include",
        });

        if (response.status === 401) {
          try {
            const newTokens = await refreshToken();
            token = newTokens?.data?.accessToken;
            response = await fetch(`${apiURL}/${url}`, {
              ...options,
              headers: buildHeaders(token),
              credentials: "include",
            });
          } catch (refreshErr: any) {
            logout();
            throw refreshErr;
          }
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.message || response.statusText);
        }

        return data;
      } catch (error: any) {
        throw error;
      }
    },
    [apiURL, adminAuthResponse?.accessToken, refreshToken, logout],
  );

  return adminAuthFetch;
};

export default useAdminAuthFetch;
