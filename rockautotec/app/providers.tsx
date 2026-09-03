"use client";

import { CartProvider } from "@/components/cart-context";
import { AuthProvider } from "@/components/auth-context";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </AuthProvider>
  );
}
