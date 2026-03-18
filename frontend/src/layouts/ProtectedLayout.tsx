import useAuth from "@/contexts/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router";


const ProtectedLayout = () => {
  const { authResponse, loading } = useAuth();
  const location = useLocation();

  // TODO: Make a loading component
  if(loading) return null;

  if (!authResponse) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }  

  return <Outlet />;
}

export default ProtectedLayout