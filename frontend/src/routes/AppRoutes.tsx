// routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";

import AppProviders from "@/layouts/Providers";
import AppRoutesContent from "./AppRoutesContent";

// import AdminProviders from "@/layouts/AdminProviderr";
import AdminRoutes from "./AdminRoutes";

export default function AppRoutes() {
  return (
    <Routes>
      {/* MAIN APP */}
      <Route
        path="/*"
        element={
          <AppProviders>
            <AppRoutesContent />
          </AppProviders>
        }
      />

      {/* ADMIN APP */}
      <Route path="/admin/*" element={<AdminRoutes />} />
    </Routes>
  );
}
