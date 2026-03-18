import useAuth from "@/contexts/AuthContext";
import { useEffect } from "react";

const useIsLoggedIn = () => {
  const { authResponse } = useAuth();

  useEffect(() => {
    if (!authResponse) {
      window.location.href = "/";
    }
  }, [authResponse]);
};

export default useIsLoggedIn;
