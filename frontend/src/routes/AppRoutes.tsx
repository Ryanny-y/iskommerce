import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '@/pages/LandingPage';
import AuthLayout from '@/layouts/AuthLayout';
import LoginPage from '@/pages/auth/LoginPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/signup" element={<SignupPage />} /> */}
        {/* <Route path="/role-selection" element={<RoleSelectionPage />} /> */}
        {/* <Route path="/verify" element={<VerificationPage />} /> */}
      </Route>

      {/* Marketplace Dashboard */}
      {/* <Route path="/dashboard" element={<MarketplacePage />} /> */}
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
