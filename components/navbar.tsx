"use client";

import Link from "next/link";
import { useCart } from "@/components/cart-context";
import { useAuth } from "@/components/auth-context";

export default function Navbar() {
  const { totalItems } = useCart();
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-gray-900 border-b border-gray-800 px-4 py-4 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🔧</span>
          <span className="text-white font-bold text-xl">RockAutoTec</span>
        </Link>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="text-gray-400 text-sm hidden md:block">{user.email}</span>
              <button
                onClick={signOut}
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Sign In
            </Link>
          )}

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
      </div>
    </nav>
  );
}