import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";
import AuthLayout from "@/layouts/AuthLayout";
import LoginPage from "@/pages/auth/LoginPage";
import SignupPage from "@/pages/auth/SignupPage";
import ProtectedLayout from "@/layouts/ProtectedLayout";
import VerificationPage from "@/pages/auth/VerificationPage";
import MarketplacePage from "@/pages/MarketPlacePage";
import StartSellingPage from "@/pages/StartSellingPage";
import MyListingsPage from "@/pages/seller/MyListingPage";
import ProductDetailsPage from "@/pages/ProductsDetailsPage";

import CheckoutPage from "@/pages/CheckoutPage";
import PaymentPage from "@/pages/PaymentPage";
import OrderSuccessPage from "@/pages/OrderSuccessPage";
import MyOrdersPage from "@/pages/MyOrdersPage";
import MySalesPage from "@/pages/seller/MySalesPage";
import SellerOrderDetailsPage from "@/pages/seller/SellerOrderDetailsPage";
import MessagesPage from "@/pages/MessagePage";
import ChatPage from "@/pages/ChatPage";
import AppProviders from "@/layouts/Providers";

export default function AppRoutes() {
  return (
    <AppProviders>
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
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/messages/:conversationId" element={<ChatPage />} />

          {/* Seller Routes */}
          <Route path="/start-selling" element={<StartSellingPage />} />
          <Route path="/my-listings" element={<MyListingsPage />} />
          <Route path="/my-sales" element={<MySalesPage />} />
          <Route
            path="/my-sales/:orderId"
            element={<SellerOrderDetailsPage />}
          />

          {/* Buyer Routes */}
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
          <Route path="/my-orders" element={<MyOrdersPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppProviders>
  );
}
