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
import { CategoryProvider } from "@/contexts/CategoryContext";
import ProductDetailsPage from "@/pages/ProductsDetailsPage";

import { CartProvider } from "@/contexts/CartContext";
import { ProductProvider } from "@/contexts/ProductContext";
import CheckoutPage from "@/pages/CheckoutPage";
import PaymentPage from "@/pages/PaymentPage";
import OrderSuccessPage from "@/pages/OrderSuccessPage";
import MyOrdersPage from "@/pages/MyOrdersPage";
import MySalesPage from "@/pages/seller/MySalesPage";

export default function AppRoutes() {
  return (
    <AuthProvider>
      <CategoryProvider>
        <CartProvider>
          <ProductProvider>
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
              <Route path="/product/:id" element={<ProductDetailsPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/order-success" element={<OrderSuccessPage />} />
              <Route path="/my-orders" element={<MyOrdersPage />} />

              {/* Seller Routes */}
              <Route path="/start-selling" element={<StartSellingPage />} />
              <Route path="/my-listings" element={<MyListingsPage />} />
              <Route path="/my-sales" element={<MySalesPage />} />
              <Route path="/my-sales/:orderId" element={<MySalesPage />} />


              {/* Buyer Routes */}
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          </ProductProvider>
        </CartProvider>
      </CategoryProvider>
    </AuthProvider>
  );
}
