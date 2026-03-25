// routes/AdminRoutes.jsx
import AdminUsersPage from "@/pages/admin/AdminUsersPage";
import AdminLoginPage from "@/pages/admin/AdminLoginPage";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminProviders from "@/layouts/AdminProviders";
import AdminProtectedLayout from "@/layouts/AdminProtectedLayout";

export default function AdminRoutes() {
  return (
    <AdminProviders>
      <Routes>
        <Route path="/login" element={<AdminLoginPage />} />

        <Route element={<AdminProtectedLayout />}>
          <Route path="/users" element={<AdminUsersPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/admin/login" replace />} />
      </Routes>
    </AdminProviders>
  );
}
