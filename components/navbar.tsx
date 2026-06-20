"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Wrench, Search, ShoppingCart, Package, User,
  LogOut, Phone, Menu, X, ChevronDown,
} from "lucide-react";
import { useCart } from "@/components/cart-context";
import { useAuth } from "@/components/auth-context";

const CATEGORIES = [
  { label: "Engine Parts",          href: "/category/engine"       },
  { label: "Brake System",          href: "/category/brakes"       },
  { label: "Suspension & Steering", href: "/category/suspension"   },
  { label: "Cooling System",        href: "/category/cooling"      },
  { label: "Electrical & Lighting", href: "/category/electrical"   },
  { label: "Fuel System",           href: "/category/fuel"         },
  { label: "Transmission",          href: "/category/transmission" },
  { label: "Exhaust System",        href: "/category/exhaust"      },
  { label: "Filters & Maintenance", href: "/category/filters"      },
  { label: "Body & Exterior",       href: "/category/body"         },
];

export default function Navbar() {
  const { totalItems } = useCart();
  const { user, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">

      {/* Main nav bar */}
      <nav className="bg-zinc-900 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0 group">
              <Wrench className="h-5 w-5 text-red-500" />
              <span className="text-white font-extrabold text-base sm:text-lg tracking-tight">
                RockAutoTec
              </span>
            </Link>

            {/* Search bar — desktop */}
            <Link
              href="/search"
              className="hidden md:flex flex-1 max-w-lg items-center gap-2.5 rounded-lg border border-zinc-700 bg-zinc-800 hover:border-zinc-600 px-4 py-2.5 text-sm text-zinc-400 transition-colors"
            >
              <Search className="h-4 w-4 shrink-0" />
              Search parts, brands, part numbers…
            </Link>

            {/* Right cluster */}
            <div className="flex items-center gap-1">
              <a
                href="tel:+18007625832"
                className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              >
                <Phone className="h-3.5 w-3.5 text-red-500 shrink-0" />
                1-800-762-5832
              </a>

              {/* Mobile search icon */}
              <Link
                href="/search"
                className="md:hidden flex items-center justify-center h-9 w-9 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              >
                <Search className="h-4 w-4" />
              </Link>

              <Link
                href="/orders"
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              >
                <Package className="h-4 w-4" />
                Orders
              </Link>

              {user ? (
                <>
                  <Link
                    href="/profile"
                    className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                  <button
                    onClick={signOut}
                    className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-zinc-400 hover:text-red-400 hover:bg-zinc-800 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                >
                  <User className="h-4 w-4" />
                  Sign In
                </Link>
              )}

              {/* Cart */}
              <Link
                href="/cart"
                className="relative flex items-center gap-1.5 bg-red-600 hover:bg-red-500 active:bg-red-700 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
              >
                <ShoppingCart className="h-4 w-4" />
                <span className="hidden sm:inline">Cart</span>
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-yellow-400 text-black text-[10px] font-bold leading-none">
                    {totalItems > 9 ? "9+" : totalItems}
                  </span>
                )}
              </Link>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen((o) => !o)}
                className="sm:hidden flex items-center justify-center h-9 w-9 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Secondary nav — desktop only */}
        <div className="hidden md:block border-t border-zinc-800 bg-zinc-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-1 h-10 overflow-x-auto scrollbar-hide">
              <div className="relative group">
                <button
                  onMouseEnter={() => setShopOpen(true)}
                  onMouseLeave={() => setShopOpen(false)}
                  className="flex items-center gap-1 px-3 h-10 text-xs font-semibold text-zinc-400 hover:text-white transition-colors whitespace-nowrap"
                >
                  All Categories <ChevronDown className="h-3 w-3" />
                </button>
                {shopOpen && (
                  <div
                    onMouseEnter={() => setShopOpen(true)}
                    onMouseLeave={() => setShopOpen(false)}
                    className="absolute top-full left-0 z-50 w-56 rounded-xl border border-zinc-700 bg-zinc-900 shadow-xl py-2 mt-0"
                  >
                    {CATEGORIES.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className="block px-4 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              {CATEGORIES.slice(0, 7).map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className="px-3 h-10 flex items-center text-xs font-medium text-zinc-500 hover:text-white transition-colors whitespace-nowrap"
                >
                  {c.label}
                </Link>
              ))}
              <Link href="/parts" className="px-3 h-10 flex items-center text-xs font-medium text-red-500 hover:text-red-400 transition-colors whitespace-nowrap ml-auto shrink-0">
                Shop All →
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="sm:hidden bg-zinc-900 border-b border-zinc-800 px-4 py-3 space-y-0.5">
          <Link href="/search" onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors">
            <Search className="h-4 w-4 text-zinc-500" /> Search Parts
          </Link>
          <Link href="/parts" onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors">
            <Package className="h-4 w-4 text-zinc-500" /> All Categories
          </Link>
          <Link href="/orders" onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors">
            <Package className="h-4 w-4 text-zinc-500" /> My Orders
          </Link>
          {user ? (
            <>
              <Link href="/profile" onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors">
                <User className="h-4 w-4 text-zinc-500" /> My Profile
              </Link>
              <button
                onClick={() => { signOut(); setMobileOpen(false); }}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-zinc-800 transition-colors w-full"
              >
                <LogOut className="h-4 w-4" /> Sign Out
              </button>
            </>
          ) : (
            <Link href="/login" onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors">
              <User className="h-4 w-4 text-zinc-500" /> Sign In / Register
            </Link>
          )}
          <div className="border-t border-zinc-800 mt-2 pt-2">
            <a href="tel:+18007625832" className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-zinc-400">
              <Phone className="h-4 w-4 text-red-500" /> 1-800-762-5832
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
