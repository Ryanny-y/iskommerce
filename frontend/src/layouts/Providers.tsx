// src/providers/AppProviders.jsx

import { AuthProvider } from "@/contexts/AuthContext";
import { SocketProvider } from "@/contexts/SocketContext";
import { ChatProvider } from "@/contexts/ChatContext";
import { CategoryProvider } from "@/contexts/CategoryContext";
import { CartProvider } from "@/contexts/CartContext";
import { ProductProvider } from "@/contexts/ProductContext";
import type { ReactNode } from "react";
import { NotificationProvider } from "@/contexts/NotificationContext";

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <SocketProvider>
        <NotificationProvider>
          <ChatProvider>
            <CategoryProvider>
              <CartProvider>
                <ProductProvider>{children}</ProductProvider>
              </CartProvider>
            </CategoryProvider>
          </ChatProvider>
        </NotificationProvider>
      </SocketProvider>
    </AuthProvider>
  );
}
