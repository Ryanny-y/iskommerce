import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";
import useFetchData from "@/hooks/useFetchData";
import useMutation from "@/hooks/useMutation";
import type { CartItem, CartResponse, Product } from "@/types/marketplace";
import type { ApiResponse } from "@/types/common";
import useAuth from "./AuthContext";

interface CartContextType {
  cartItems: CartItem[];
  cartLoading: boolean;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product) => Promise<void>;
  updateQuantity: (id: string, delta: number) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { execute } = useMutation();
  const { authResponse } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const options = useMemo(
    () => ({
      enabled: !!authResponse?.userData,
    }),
    [authResponse?.userData],
  );

  const {
    data: cartData,
    loading: cartLoading,
    error: cartError,
    refetchData: refetchCart,
  } = useFetchData<ApiResponse<CartResponse>>("cart", options);

  useEffect(() => {
    if (cartData && !cartLoading && !cartError) {
      setCartItems(cartData.data?.items ?? []);
    }
  }, [cartData, cartLoading, cartError]);

  const addToCart = async (product: Product) => {
    try {
      await execute("cart/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id, quantity: 1 }),
      });

      const existing = cartItems.find((item) => item.product.id === product.id);
      toast.success(
        existing
          ? `Increased ${product.name} quantity`
          : `Added ${product.name} to cart`,
      );
      refetchCart();
    } catch {
      toast.error("Failed to add to cart");
    }
  };

  const updateQuantity = async (id: string, delta: number) => {
    const item = cartItems.find((i) => i.id === id);
    if (!item) return;

    try {
      const response: ApiResponse<CartResponse> = await execute(
        `cart/items/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity: item.quantity + delta }),
        },
      );
      toast.success(response.message);
      refetchCart();
    } catch {
      toast.error("Failed to update quantity");
    }
  };

  const removeFromCart = async (id: string) => {
    const item = cartItems.find((i) => i.id === id);
    try {
      const data: ApiResponse<void> = await execute(`cart/items/${id}`, {
        method: "DELETE",
      });
      if (item) toast.success(data.message);
      refetchCart();
    } catch {
      toast.error("Failed to remove item");
    }
  };
  
  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (acc, item) => acc + (item.product?.price ?? 0) * item.quantity,
      0,
    );
  }, [cartItems]);
  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartLoading,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        addToCart,
        updateQuantity,
        removeFromCart,
        totalItems: cartItems.reduce((acc, item) => acc + item.quantity, 0),
        subtotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
