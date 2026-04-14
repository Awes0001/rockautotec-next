"use client";

import Link from "next/link";
import { useCart } from "@/components/cart-context";

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className="bg-gray-900 border-b border-gray-800 px-4 py-4 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🔧</span>
          <span className="text-white font-bold text-xl">RockAutoTec</span>
        </Link>

        {/* Cart Icon */}
        <Link
          href="/cart"
          className="relative bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-red-500 text-white px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-2"
        >
          <span>🛒</span>
          <span className="text-sm font-medium">Cart</span>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>

      </div>
    </nav>
  );
}