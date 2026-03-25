import useAdminAuth from "@/contexts/AdminAuthContext";
import { Navigate, Outlet, useLocation } from "react-router";

const AdminProtectedLayout = () => {
  const { adminAuthResponse, loading } = useAdminAuth();
  const location = useLocation();

  if (loading) return null;

  if (!adminAuthResponse) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default AdminProtectedLayout;
