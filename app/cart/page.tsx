"use client";

import Link from "next/link";
import { useCart } from "@/components/cart-context";
import { ShoppingCart, Trash2, ArrowRight, Truck, RotateCcw, Shield, Tag } from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart, clearCart, totalItems, totalPrice } = useCart();
  const shipping    = totalPrice >= 75 ? 0 : 7.99;
  const tax         = totalPrice * 0.0825;
  const orderTotal  = totalPrice + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center px-4 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-zinc-800 border border-zinc-700 mb-6">
          <ShoppingCart className="h-9 w-9 text-zinc-500" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Your cart is empty</h1>
        <p className="text-zinc-400 text-sm mb-8 max-w-xs">
          Add parts to your cart and they&apos;ll appear here.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/" className="inline-flex items-center gap-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold px-6 py-3 text-sm transition-colors">
            <ShoppingCart className="h-4 w-4" /> Find Parts
          </Link>
          <Link href="/parts" className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-semibold px-6 py-3 text-sm transition-colors">
            Browse Categories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Shopping Cart</h1>
            <p className="text-zinc-400 text-sm mt-1">{totalItems} item{totalItems !== 1 ? "s" : ""}</p>
          </div>
          <button onClick={clearCart} className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-red-400 transition-colors">
            <Trash2 className="h-4 w-4" /> Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-3">
            {totalPrice < 75 ? (
              <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 mb-2">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-zinc-400 flex items-center gap-1.5">
                    <Truck className="h-4 w-4 text-red-500" />
                    Add <strong className="text-white mx-1">${(75 - totalPrice).toFixed(2)}</strong> more for FREE shipping
                  </span>
                  <span className="text-xs text-zinc-500">${totalPrice.toFixed(2)} / $75.00</span>
                </div>
                <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                  <div className="h-full rounded-full bg-red-600 transition-all" style={{ width: `${Math.min((totalPrice / 75) * 100, 100)}%` }} />
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-emerald-800/40 bg-emerald-900/10 p-3 mb-2 flex items-center gap-2 text-sm text-emerald-400">
                <Truck className="h-4 w-4 shrink-0" /> Your order qualifies for <strong className="ml-1">FREE shipping!</strong>
              </div>
            )}

            {cart.map((item, index) => (
              <div key={index} className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 sm:p-5 flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-zinc-800 border border-zinc-700 text-2xl">🔧</div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-white leading-snug">{item.part}</h3>
                  {(item.year || item.make || item.model) && (
                    <p className="text-xs text-zinc-500 mt-0.5">{[item.year, item.make, item.model].filter(Boolean).join(" ")}</p>
                  )}
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-xs text-emerald-400 font-medium">In Stock</span>
                    <span className="text-xs text-zinc-500">Ships Today</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span className="text-base font-bold text-white">${item.price.toFixed(2)}</span>
                  <button onClick={() => removeFromCart(index)} className="flex items-center gap-1 text-xs text-zinc-500 hover:text-red-400 transition-colors">
                    <Trash2 className="h-3 w-3" /> Remove
                  </button>
                </div>
              </div>
            ))}

            <Link href="/" className="inline-block pt-2 text-sm text-red-400 hover:text-red-300 transition-colors">
              ← Continue Shopping
            </Link>
          </div>

          {/* Summary */}
          <div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 sticky top-24">
              <h2 className="text-base font-bold text-white mb-5">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-zinc-400">Subtotal ({totalItems} items)</span><span className="text-white">${totalPrice.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-zinc-400">Shipping</span><span className={shipping === 0 ? "text-emerald-400 font-semibold" : "text-white"}>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span></div>
                <div className="flex justify-between"><span className="text-zinc-400">Tax (est.)</span><span className="text-white">${tax.toFixed(2)}</span></div>
                <div className="border-t border-zinc-800 pt-3 flex justify-between">
                  <span className="font-bold text-white">Order Total</span>
                  <span className="font-bold text-lg text-white">${orderTotal.toFixed(2)}</span>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <input type="text" placeholder="Promo code" className="flex-1 rounded-lg border border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500 px-3 py-2 text-sm focus:outline-none focus:border-red-500 transition-colors" />
                <button className="rounded-lg border border-zinc-600 hover:border-red-500 text-zinc-300 px-3 py-2 transition-colors"><Tag className="h-4 w-4" /></button>
              </div>
              <Link href="/checkout" className="mt-5 flex items-center justify-center gap-2 w-full rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold py-3.5 text-sm transition-colors">
                Proceed to Checkout <ArrowRight className="h-4 w-4" />
              </Link>
              <div className="mt-5 space-y-2.5">
                {[
                  { icon: Shield,    text: "Secure 256-bit SSL checkout"  },
                  { icon: RotateCcw, text: "90-day hassle-free returns"   },
                  { icon: Truck,     text: "Same-day shipping by 4pm CT"  },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-xs text-zinc-500">
                    <Icon className="h-3.5 w-3.5 text-zinc-600 shrink-0" /> {text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
