// routes/AdminRoutes.jsx
import AdminUsersPage from "@/pages/admin/AdminUsersPage";
import { Routes, Route, Navigate } from "react-router-dom";
// import AdminLayout from "@/layouts/AdminLayout";

// import AdminDashboard from "@/pages/admin/AdminDashboard";
// import AdminUsers from "@/pages/admin/AdminUsers";

export default function AdminRoutes() {
  return (
    <Routes>
      {/* <Route element={<AdminLayout />}> */}
      {/* <Route path="/" element={<AdminDashboard />} /> */}
      <Route path="/users" element={<AdminUsersPage />} />
      {/* </Route> */}

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
