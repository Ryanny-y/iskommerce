import { CartDrawer } from "@/components/cart/CartDrawer";
import { Topbar } from "@/components/marketplace/Topbar";
import useAuth from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { Navigate, Outlet, useLocation } from "react-router";

const ProtectedLayout = () => {
  const { authResponse, loading } = useAuth();
  const { cartItems, isCartOpen, closeCart, updateQuantity, removeFromCart } =
    useCart();

  const location = useLocation();

  // TODO: Make a loading component
  if (loading) return null;

  if (!authResponse) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <>
      <Topbar />
      <Outlet />
      <CartDrawer
        isOpen={isCartOpen}
        onClose={closeCart}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />
    </>
  );
};

export default ProtectedLayout;
