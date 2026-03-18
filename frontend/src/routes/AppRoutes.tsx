import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";
import AuthLayout from "@/layouts/AuthLayout";
import LoginPage from "@/pages/auth/LoginPage";
import SignupPage from "@/pages/auth/SignupPage";
import ProtectedLayout from "@/layouts/ProtectedLayout";
import { AuthProvider } from "@/contexts/AuthContext";
import VerificationPage from "@/pages/auth/VerificationPage";
import MarketplacePage from "@/pages/MarketPlacePage";
import StartSellingPage from "@/pages/StartSellingPage";
import MyListingsPage from "@/pages/seller/MyListingPage";

export default function AppRoutes() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/verify" element={<VerificationPage />} />
        </Route>

        {/* Marketplace Dashboard */}
        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<MarketplacePage />} />

          {/* Seller Routes */}
          <Route path="/start-selling" element={<StartSellingPage />} />
          <Route path="/my-listings" element={<MyListingsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}
