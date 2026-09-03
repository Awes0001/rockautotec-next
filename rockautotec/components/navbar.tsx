"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Wrench, Search, ShoppingCart, User,
  LogOut, Phone, Menu, X, ChevronDown, ChevronRight,
  Package, Truck, Tag, Building2, Car,
} from "lucide-react";
import { useCart } from "@/components/cart-context";
import { useAuth } from "@/components/auth-context";
import {
  CATEGORIES, CATEGORY_SLUGS, CATEGORY_ICON_NAMES,
  BRANDS, brandSlug,
} from "@/lib/catalog";
import { searchProducts as searchProductsScored } from "@/lib/search";
import PartIcon from "@/components/part-icon";
import { GarageDropdown } from "@/components/my-garage";

// ── Static data ────────────────────────────────────────────────────────────

const NAV_CATEGORIES = CATEGORIES.map((label) => ({
  label,
  slug: CATEGORY_SLUGS[label],
  iconName: CATEGORY_ICON_NAMES[label],
}));

const MAKES = [
  "Ford", "Chevrolet", "GMC", "Ram", "Dodge", "Jeep",
  "Toyota", "Honda", "Nissan", "Hyundai", "Kia", "Mazda",
  "Subaru", "Volkswagen", "Audi", "BMW", "Mercedes-Benz", "Lexus",
  "Acura", "Infiniti", "Cadillac", "Buick", "Lincoln", "Mitsubishi",
  "Volvo", "Tesla",
];

const NAV_BRANDS = BRANDS.map((name) => ({ name, slug: brandSlug(name) }));

type MegaPanel = "make" | "category" | "brand" | null;

// ── Search suggestion hook ─────────────────────────────────────────────────

function useLiveSearch(query: string) {
  return query.trim().length >= 2
    ? searchProductsScored(query).slice(0, 6).map((r) => r.product)
    : [];
}

// ── Component ──────────────────────────────────────────────────────────────

export default function Navbar() {
  const { totalItems } = useCart();
  const { user, signOut } = useAuth();
  const router = useRouter();

  const [mobileOpen, setMobileOpen]   = useState(false);
  const [mobileShop,  setMobileShop]  = useState(false);
  const [megaPanel,   setMegaPanel]   = useState<MegaPanel>(null);
  const [searchQ,     setSearchQ]     = useState("");
  const [searchOpen,  setSearchOpen]  = useState(false);

  const searchRef  = useRef<HTMLDivElement>(null);
  const inputRef   = useRef<HTMLInputElement>(null);
  const megaTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);

  const suggestions = useLiveSearch(searchQ);

  // Close mega panel with delay (allows moving to panel without flicker)
  const openPanel  = useCallback((p: MegaPanel) => {
    if (megaTimer.current) clearTimeout(megaTimer.current);
    setMegaPanel(p);
  }, []);

  const closePanel = useCallback(() => {
    megaTimer.current = setTimeout(() => setMegaPanel(null), 120);
  }, []);

  const keepPanel  = useCallback(() => {
    if (megaTimer.current) clearTimeout(megaTimer.current);
  }, []);

  // Close search on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQ.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQ.trim())}`);
      setSearchOpen(false);
      setSearchQ("");
    }
  }

  return (
    <header className="sticky top-0 z-50 shadow-lg shadow-black/30">

      {/* ── Utility bar ─────────────────────────────────────────────────── */}
      <div className="bg-zinc-950 border-b border-zinc-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-8 text-xs">
            <div className="flex items-center gap-4 text-zinc-400">
              <span className="hidden sm:flex items-center gap-1.5">
                <Truck className="h-3 w-3 text-emerald-500" />
                Free shipping on orders $75+
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="h-3 w-3 text-red-500" />
                <a href="tel:+18007625832" className="hover:text-white transition-colors">
                  1-800-762-5832
                </a>
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-zinc-500">
              <Link href="/fleet" className="hover:text-white transition-colors">Fleet Accounts</Link>
              <Link href="/orders" className="hover:text-white transition-colors">Track Order</Link>
              <Link href="/fitment" className="hover:text-white transition-colors">Fitment Guide</Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main nav bar ────────────────────────────────────────────────── */}
      <nav className="bg-zinc-900 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600 group-hover:bg-red-500 transition-colors">
                <Wrench className="h-4 w-4 text-white" />
              </div>
              <div className="leading-none">
                <span className="block text-white font-extrabold text-base tracking-tight">RockAutoTec</span>
                <span className="block text-[10px] text-zinc-500 font-medium tracking-wide">PROFESSIONAL AUTO PARTS</span>
              </div>
            </Link>

            {/* ── Live search bar (desktop) ──────────────────────────── */}
            <div ref={searchRef} className="hidden md:flex flex-1 max-w-2xl relative">
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative flex items-center">
                  <Search className="absolute left-4 h-4 w-4 text-zinc-500 pointer-events-none z-10" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={searchQ}
                    onChange={(e) => { setSearchQ(e.target.value); setSearchOpen(true); }}
                    onFocus={() => setSearchOpen(true)}
                    placeholder="Search parts, SKU, OEM number…"
                    className="w-full pl-11 pr-4 py-2.5 rounded-l-xl border border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                    aria-label="Search parts"
                  />
                  <button
                    type="submit"
                    className="shrink-0 rounded-r-xl bg-red-600 hover:bg-red-500 active:bg-red-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors border border-red-600"
                  >
                    Search
                  </button>
                </div>
              </form>

              {/* Suggestions dropdown */}
              {searchOpen && (suggestions.length > 0 || searchQ.length >= 2) && (
                <div className="absolute top-full left-0 right-12 mt-1 rounded-xl border border-zinc-700 bg-zinc-900 shadow-2xl shadow-black/50 z-50 overflow-hidden">
                  {suggestions.length > 0 ? (
                    <>
                      <div className="px-3 py-2 border-b border-zinc-800">
                        <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">
                          Suggestions
                        </p>
                      </div>
                      {suggestions.map((part) => (
                        <button
                          key={part.id}
                          onClick={() => {
                            router.push(`/part/${part.id}`);
                            setSearchOpen(false);
                            setSearchQ("");
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-zinc-800 transition-colors text-left"
                        >
                          <PartIcon
                            category={part.category}
                            iconName={CATEGORY_ICON_NAMES[part.category]}
                            className="h-8 w-8 rounded-md shrink-0"
                            iconClassName="h-4 w-4"
                          />
                          <div className="min-w-0">
                            <p className="text-sm text-white truncate">{part.name}</p>
                            <p className="text-xs text-zinc-500">{part.brand} · OEM {part.oemNumber}</p>
                          </div>
                          <span className="ml-auto text-sm font-semibold text-white shrink-0">
                            ${part.price.toFixed(2)}
                          </span>
                        </button>
                      ))}
                      <Link
                        href={`/search?q=${encodeURIComponent(searchQ)}`}
                        onClick={() => { setSearchOpen(false); setSearchQ(""); }}
                        className="flex items-center justify-center gap-2 px-4 py-2.5 bg-zinc-950/50 border-t border-zinc-800 text-xs text-red-400 hover:text-red-300 font-semibold transition-colors"
                      >
                        See all results for &ldquo;{searchQ}&rdquo; <ChevronRight className="h-3 w-3" />
                      </Link>
                    </>
                  ) : (
                    <div className="px-4 py-3 text-sm text-zinc-500">
                      No parts found for &ldquo;{searchQ}&rdquo;
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-1 ml-auto md:ml-0">
              {/* Mobile search */}
              <Link
                href="/search"
                className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              >
                <Search className="h-4 w-4" />
              </Link>

              {/* Orders */}
              <Link
                href="/orders"
                className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              >
                <Package className="h-4 w-4" />
                Orders
              </Link>

              {/* Profile / Sign In */}
              {user ? (
                <>
                  <Link
                    href="/profile"
                    className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                  >
                    <User className="h-4 w-4" />
                    <span className="hidden lg:inline">Profile</span>
                  </Link>
                  <button
                    onClick={signOut}
                    className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-zinc-400 hover:text-red-400 hover:bg-zinc-800 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                >
                  <User className="h-4 w-4" />
                  <span className="hidden lg:inline">Sign In</span>
                </Link>
              )}

              {/* My Garage (desktop only) */}
              <GarageDropdown />

              {/* Cart */}
              <Link
                href="/cart"
                className="relative flex items-center gap-1.5 bg-red-600 hover:bg-red-500 active:bg-red-700 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors"
              >
                <ShoppingCart className="h-4 w-4" />
                <span className="hidden sm:inline">Cart</span>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-400 text-black text-[10px] font-extrabold leading-none ring-2 ring-zinc-900">
                    {totalItems > 9 ? "9+" : totalItems}
                  </span>
                )}
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen((o) => !o)}
                className="lg:hidden flex h-9 w-9 items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Mega-nav bar (desktop) ───────────────────────────────────────── */}
      <div className="hidden lg:block bg-zinc-950 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-10 gap-0.5">

            {/* Shop by Make */}
            <div
              className="relative"
              onMouseEnter={() => openPanel("make")}
              onMouseLeave={closePanel}
            >
              <button
                className={`flex items-center gap-1.5 px-4 h-10 text-xs font-semibold transition-colors whitespace-nowrap rounded-sm ${
                  megaPanel === "make" ? "text-white bg-zinc-800" : "text-zinc-300 hover:text-white hover:bg-zinc-800/60"
                }`}
              >
                <Car className="h-3.5 w-3.5 text-red-500" />
                Shop by Make
                <ChevronDown className={`h-3 w-3 transition-transform ${megaPanel === "make" ? "rotate-180" : ""}`} />
              </button>

              {megaPanel === "make" && (
                <div
                  onMouseEnter={keepPanel}
                  onMouseLeave={closePanel}
                  className="absolute top-full left-0 z-50 w-[480px] rounded-b-xl border border-t-0 border-zinc-700 bg-zinc-900 shadow-2xl shadow-black/60 p-4"
                >
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3 px-1">
                    Shop by Vehicle Make
                  </p>
                  <div className="grid grid-cols-4 gap-1">
                    {MAKES.map((make) => (
                      <Link
                        key={make}
                        href={`/make/${make.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                        onClick={() => setMegaPanel(null)}
                        className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
                      >
                        <ChevronRight className="h-2.5 w-2.5 text-red-500 shrink-0" />
                        {make}
                      </Link>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-zinc-800">
                    <Link
                      href="/parts"
                      onClick={() => setMegaPanel(null)}
                      className="text-xs text-red-400 hover:text-red-300 font-semibold transition-colors"
                    >
                      Browse all vehicles →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Shop by Category */}
            <div
              className="relative"
              onMouseEnter={() => openPanel("category")}
              onMouseLeave={closePanel}
            >
              <button
                className={`flex items-center gap-1.5 px-4 h-10 text-xs font-semibold transition-colors whitespace-nowrap rounded-sm ${
                  megaPanel === "category" ? "text-white bg-zinc-800" : "text-zinc-300 hover:text-white hover:bg-zinc-800/60"
                }`}
              >
                <Package className="h-3.5 w-3.5 text-red-500" />
                Shop by Category
                <ChevronDown className={`h-3 w-3 transition-transform ${megaPanel === "category" ? "rotate-180" : ""}`} />
              </button>

              {megaPanel === "category" && (
                <div
                  onMouseEnter={keepPanel}
                  onMouseLeave={closePanel}
                  className="absolute top-full left-0 z-50 w-72 rounded-b-xl border border-t-0 border-zinc-700 bg-zinc-900 shadow-2xl shadow-black/60 py-2"
                >
                  {NAV_CATEGORIES.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      onClick={() => setMegaPanel(null)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
                    >
                      <PartIcon
                        category={cat.label}
                        iconName={cat.iconName}
                        className="h-7 w-7 rounded-md shrink-0"
                        iconClassName="h-3.5 w-3.5"
                      />
                      {cat.label}
                      <ChevronRight className="ml-auto h-3.5 w-3.5 text-zinc-600" />
                    </Link>
                  ))}
                  <div className="mx-4 mt-2 pt-2 border-t border-zinc-800">
                    <Link
                      href="/parts"
                      onClick={() => setMegaPanel(null)}
                      className="text-xs text-red-400 hover:text-red-300 font-semibold transition-colors"
                    >
                      All categories →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Shop by Brand */}
            <div
              className="relative"
              onMouseEnter={() => openPanel("brand")}
              onMouseLeave={closePanel}
            >
              <button
                className={`flex items-center gap-1.5 px-4 h-10 text-xs font-semibold transition-colors whitespace-nowrap rounded-sm ${
                  megaPanel === "brand" ? "text-white bg-zinc-800" : "text-zinc-300 hover:text-white hover:bg-zinc-800/60"
                }`}
              >
                <Tag className="h-3.5 w-3.5 text-red-500" />
                Shop by Brand
                <ChevronDown className={`h-3 w-3 transition-transform ${megaPanel === "brand" ? "rotate-180" : ""}`} />
              </button>

              {megaPanel === "brand" && (
                <div
                  onMouseEnter={keepPanel}
                  onMouseLeave={closePanel}
                  className="absolute top-full left-0 z-50 w-64 rounded-b-xl border border-t-0 border-zinc-700 bg-zinc-900 shadow-2xl shadow-black/60 py-2"
                >
                  {NAV_BRANDS.map((brand) => (
                    <Link
                      key={brand.slug}
                      href={`/brand/${brand.slug}`}
                      onClick={() => setMegaPanel(null)}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
                    >
                      <div className="h-6 w-6 rounded bg-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-300 shrink-0">
                        {brand.name[0]}
                      </div>
                      {brand.name}
                    </Link>
                  ))}
                  <div className="mx-4 mt-2 pt-2 border-t border-zinc-800">
                    <Link
                      href="/search"
                      onClick={() => setMegaPanel(null)}
                      className="text-xs text-red-400 hover:text-red-300 font-semibold transition-colors"
                    >
                      All brands →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Separator */}
            <div className="w-px h-5 bg-zinc-800 mx-1" />

            {/* Quick links */}
            {[
              { label: "Fleet & Commercial", href: "/fleet", icon: Building2 },
              { label: "Deals",              href: "/search?sort=savings", icon: Tag },
            ].map(({ label, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                className="flex items-center gap-1.5 px-4 h-10 text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors whitespace-nowrap rounded-sm"
              >
                <Icon className="h-3.5 w-3.5 text-zinc-600" />
                {label}
              </Link>
            ))}

            {/* Spacer + Shop All CTA */}
            <Link
              href="/parts"
              className="ml-auto flex items-center gap-1.5 px-4 h-10 text-xs font-bold text-red-400 hover:text-red-300 transition-colors whitespace-nowrap shrink-0"
            >
              Shop All Parts →
            </Link>
          </div>
        </div>
      </div>

      {/* ── Mobile drawer ────────────────────────────────────────────────── */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-[calc(2rem+4rem)] z-40 bg-zinc-950/95 backdrop-blur-sm overflow-y-auto">
          <div className="bg-zinc-900 border-b border-zinc-800 px-4 py-3 space-y-0.5 min-h-full">

            {/* Mobile search */}
            <form
              onSubmit={(e) => { e.preventDefault(); router.push(`/search?q=${encodeURIComponent(searchQ)}`); setMobileOpen(false); setSearchQ(""); }}
              className="mb-4"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <input
                  type="text"
                  value={searchQ}
                  onChange={(e) => setSearchQ(e.target.value)}
                  placeholder="Search parts, SKUs, OEM numbers…"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500 text-sm focus:outline-none focus:border-red-500"
                />
              </div>
            </form>

            {/* Shop by Make accordion */}
            <button
              onClick={() => setMobileShop(!mobileShop)}
              className="flex items-center justify-between w-full px-3 py-3 rounded-xl text-sm font-semibold text-white hover:bg-zinc-800 transition-colors"
            >
              <span className="flex items-center gap-2"><Car className="h-4 w-4 text-red-500" /> Shop by Make</span>
              <ChevronDown className={`h-4 w-4 text-zinc-500 transition-transform ${mobileShop ? "rotate-180" : ""}`} />
            </button>

            {mobileShop && (
              <div className="grid grid-cols-2 gap-1 px-2 pb-2">
                {MAKES.map((make) => (
                  <Link
                    key={make}
                    href={`/make/${make.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                  >
                    <ChevronRight className="h-3 w-3 text-red-500" /> {make}
                  </Link>
                ))}
              </div>
            )}

            {/* Categories */}
            {NAV_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
              >
                <PartIcon
                  category={cat.label}
                  iconName={cat.iconName}
                  className="h-7 w-7 rounded-md shrink-0"
                  iconClassName="h-3.5 w-3.5"
                />
                {cat.label}
              </Link>
            ))}

            <div className="border-t border-zinc-800 my-2" />

            {/* Account links */}
            <Link href="/orders" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
              <Package className="h-4 w-4 text-zinc-500" /> My Orders
            </Link>
            <Link href="/fleet" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
              <Building2 className="h-4 w-4 text-zinc-500" /> Fleet & Commercial
            </Link>

            {user ? (
              <>
                <Link href="/profile" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
                  <User className="h-4 w-4 text-zinc-500" /> My Profile
                </Link>
                <button onClick={() => { signOut(); setMobileOpen(false); }} className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-red-400 hover:bg-zinc-800 transition-colors">
                  <LogOut className="h-4 w-4" /> Sign Out
                </button>
              </>
            ) : (
              <Link href="/login" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
                <User className="h-4 w-4 text-zinc-500" /> Sign In / Register
              </Link>
            )}

            <div className="border-t border-zinc-800 mt-2 pt-2">
              <a href="tel:+18007625832" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-zinc-400">
                <Phone className="h-4 w-4 text-red-500" />
                <div>
                  <p className="text-white font-semibold">1-800-762-5832</p>
                  <p className="text-xs text-zinc-600">Mon–Sat 7am–9pm CT</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
