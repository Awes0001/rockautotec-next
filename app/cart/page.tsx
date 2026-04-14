"use client";

import Link from "next/link";
import { useCart } from "@/components/cart-context";

export default function CartPage() {
  const { cart, removeFromCart, clearCart, totalItems, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-4">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="text-2xl font-bold text-white mb-2">Your cart is empty</h1>
        <p className="text-gray-400 mb-6">Add some parts to get started</p>
        <Link href="/" className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
          🔍 Find Parts
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-950 px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Your Cart</h1>
            <p className="text-gray-400">{totalItems} item{totalItems > 1 ? "s" : ""}</p>
          </div>
          <button onClick={clearCart} className="text-red-400 hover:text-red-300 text-sm transition-colors">
            Clear All
          </button>
        </div>

        <div className="flex flex-col gap-4 mb-8">
          {cart.map((item, index) => (
            <div key={index} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-gray-800 rounded-xl p-3 text-2xl">🔧</div>
                <div>
                  <p className="text-white font-semibold">{item.part}</p>
                  <p className="text-gray-400 text-sm">{item.year} {item.make} {item.model}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-white font-bold">${item.price.toFixed(2)}</p>
                <button onClick={() => removeFromCart(index)} className="text-gray-500 hover:text-red-400 transition-colors text-xl">✕</button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
          <div className="flex justify-between items-center mb-2">
            <p className="text-gray-400">Subtotal ({totalItems} items)</p>
            <p className="text-white font-semibold">${totalPrice.toFixed(2)}</p>
          </div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-gray-400">Shipping</p>
            <p className="text-green-400 font-semibold">FREE</p>
          </div>
          <div className="border-t border-gray-800 mt-4 pt-4 flex justify-between items-center">
            <p className="text-white font-bold text-lg">Total</p>
            <p className="text-white font-bold text-2xl">${totalPrice.toFixed(2)}</p>
          </div>
        </div>

        <Link href="/checkout" className="block w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 rounded-xl transition-colors text-lg mb-4 text-center">
          ✅ Proceed to Checkout
        </Link>

        <Link href="/" className="block text-center text-gray-400 hover:text-white text-sm transition-colors">
          ← Continue Shopping
        </Link>
      </div>
    </main>
  );
}