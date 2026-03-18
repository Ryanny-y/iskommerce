import useAuth from "@/contexts/AuthContext";
import { useCallback } from "react";

const useAuthFetch = () => {
  const apiURL = import.meta.env.VITE_API_URL;
  const { authResponse, refreshToken, logout } = useAuth();

  const authFetch = useCallback(  
    async <T = any>(url: string, options: RequestInit &  { raw?: boolean } = {}): Promise<T>=> {
      let token = authResponse?.accessToken;
      const isFormData = options.body instanceof FormData;

      const buildHeaders = (accessToken?: string) => {
        const headers = new Headers(options.headers || {});
        if (accessToken) {
          headers.set("Authorization", `Bearer ${accessToken}`);
        }
        // If it's not a form data, then set to application/json
        if (!isFormData && !options.raw) {
          headers.set("Content-Type", "application/json");
        }
        return headers;
      };

      try {
        let response = await fetch(`${apiURL}/${url}`, {
          ...options,
          headers: buildHeaders(token),
          "credentials": 'include'
        });

        if (response.status === 401) {
          try {
            const newTokens = await refreshToken();
            token = newTokens?.data?.accessToken;

            response = await fetch(`${apiURL}/${url}`, {
              ...options,
              headers: buildHeaders(token),
              "credentials": "include"
            })
          } catch (refreshErr: any) {
            logout();
            throw refreshErr;
          }
        }

        if (options.raw) {
          return response as T;
        }

        const data = await response.json();
        
        if(!response.ok) {
          throw new Error(data?.message || response.statusText);
        }

        return data;
      } catch (error: any) {
        throw error;
      }

  }, [apiURL, authResponse?.accessToken, refreshToken, logout]);

  return authFetch;
};

export default useAuthFetch;