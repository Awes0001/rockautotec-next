"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Phone, ShoppingCart, Star, Truck, Shield, Lock, Hash,
  RotateCcw, Headphones, Check, ArrowRight,
  Car, Package, Tag, ScanLine, Loader2, AlertTriangle,
  TrendingUp, Building2, Mail, Facebook, Twitter, Instagram, Youtube,
  Clock, CreditCard,
} from "lucide-react";
import { useCart } from "@/components/cart-context";
import {
  ALL_PRODUCTS, CATEGORIES, CATEGORY_SLUGS, CATEGORY_ICON_NAMES,
  BRANDS, brandSlug, isLowStock, lowStockCount, shippingEstimate,
  getFeaturedProducts, getProductsByCategory,
  type Product,
} from "@/lib/catalog";
import { MAKES } from "@/lib/makes";
import { getTotalVehicleCount } from "@/data/vehicles";
import PartIcon from "@/components/part-icon";
import VehicleSearch, { type VehicleSelection } from "@/components/vehicle-search";
import BrandMarquee from "@/components/brand-marquee";
import BrandLogo from "@/components/brand-logo";
import PartsBrandMarquee from "@/components/parts-brand-marquee";
import RotatingPromoBanner from "@/components/rotating-promo-banner";
import AnimatedCounter from "@/components/animated-counter";

// ── Helpers ───────────────────────────────────────────────────────────────────

function Stars({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const cls = size === "md" ? "h-5 w-5" : "h-3.5 w-3.5";
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`${cls} ${n <= Math.round(rating) ? "fill-yellow-400 text-yellow-400" : "text-zinc-600"}`}
        />
      ))}
    </div>
  );
}

function StockTag({ part }: { part: Product }) {
  if (!part.inStock) {
    return <span className="text-xs font-semibold text-rose-500">Out of Stock</span>;
  }
  if (isLowStock(part)) {
    return (
      <span className="text-xs font-semibold text-amber-400 flex items-center gap-1">
        <AlertTriangle className="h-3 w-3" /> Only {lowStockCount(part)} left
      </span>
    );
  }
  return (
    <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
      <Check className="h-3 w-3" /> In Stock
    </span>
  );
}

function ProductCard({ part }: { part: Product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const discount = Math.round((1 - part.price / part.was) * 100);
  const vehicleCount = part.fitment.length;

  return (
    <div className="flex flex-col rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden hover:border-red-600/60 hover:shadow-xl hover:shadow-red-950/30 transition-all duration-200 group">
      <Link href={`/part/${part.id}`} className="relative block">
        <PartIcon
          category={part.category}
          iconName={CATEGORY_ICON_NAMES[part.category]}
          className="h-20 w-full"
          iconClassName="h-7 w-7 group-hover:scale-110 transition-transform duration-200"
        />
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded shadow">
            SAVE {discount}%
          </span>
        )}
      </Link>

      <div className="flex flex-col flex-1 p-4">
        <p className="text-[11px] text-zinc-500 mb-1 uppercase tracking-wide font-semibold">
          {part.brand} · {part.partType}
        </p>
        <Link
          href={`/part/${part.id}`}
          className="text-sm font-semibold text-white leading-snug mb-1.5 hover:text-red-400 transition-colors line-clamp-2"
        >
          {part.name}
        </Link>
        <div className="text-[11px] text-zinc-500 font-mono mb-2 space-y-0.5">
          <p>SKU: {part.sku}</p>
          <p>OEM: {part.oemNumber}</p>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <Stars rating={part.rating} />
          <span className="text-xs text-zinc-400">
            {part.rating.toFixed(1)} ({part.reviews.toLocaleString()})
          </span>
        </div>

        <div className="mt-auto">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-lg font-bold text-white">${part.price.toFixed(2)}</span>
            {discount > 0 && (
              <span className="text-sm text-zinc-500 line-through">${part.was.toFixed(2)}</span>
            )}
          </div>
          <div className="mb-1"><StockTag part={part} /></div>
          <p className="text-[11px] text-zinc-500 mb-2">{shippingEstimate(part)}</p>
          <div className="mb-3">
            <span className="inline-flex items-center gap-1 rounded-full border border-red-500/30 bg-red-600/10 px-2 py-0.5 text-[10px] font-semibold text-red-400">
              <Car className="h-3 w-3" />
              Fits {vehicleCount} vehicle{vehicleCount === 1 ? "" : "s"}
            </span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                addToCart({ part: part.name, year: "", make: "", model: "", price: part.price });
                setAdded(true);
                setTimeout(() => setAdded(false), 1500);
              }}
              disabled={!part.inStock}
              className={`flex-1 text-xs font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                added
                  ? "bg-emerald-600 text-white"
                  : part.inStock
                  ? "bg-cta-600 hover:bg-cta-500 active:bg-cta-700 text-white"
                  : "bg-zinc-700 text-zinc-500 cursor-not-allowed"
              }`}
            >
              {added ? <Check className="h-3.5 w-3.5" /> : <ShoppingCart className="h-3.5 w-3.5" />}
              {added ? "Added!" : "Add to Cart"}
            </button>
            <Link
              href={`/part/${part.id}`}
              className="border border-zinc-700 hover:border-red-500 text-zinc-400 hover:text-red-400 px-3 rounded-lg transition-colors flex items-center justify-center text-xs font-semibold whitespace-nowrap"
            >
              Check Fitment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [lookupTab, setLookupTab] = useState<"vehicle" | "vin" | "oem">("vehicle");
  const [oemQuery, setOemQuery] = useState("");

  const [activeCategory, setActiveCategory] = useState<string>("All");

  // VIN decoder state
  const [vin, setVin] = useState("");
  const [vinLoading, setVinLoading] = useState(false);
  const [vinResult, setVinResult] = useState<{ year: string; make: string; model: string } | null>(null);
  const [vinError, setVinError] = useState("");

  function handleVehicleSearch(selection: VehicleSelection) {
    const { year, make, model, engine } = selection;
    const qs = new URLSearchParams({ year, make, model, ...(engine ? { engine } : {}) });
    window.location.href = `/search?${qs.toString()}`;
  }

  async function handleVinDecode() {
    const cleaned = vin.trim().toUpperCase();
    setVinError("");
    setVinResult(null);
    if (cleaned.length !== 17) {
      setVinError("VINs are exactly 17 characters. Please check and try again.");
      return;
    }
    setVinLoading(true);
    try {
      const res = await fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${cleaned}?format=json`
      );
      const data = await res.json();
      const r = data?.Results?.[0];
      if (r && r.Make && r.ModelYear) {
        setVinResult({ year: r.ModelYear, make: r.Make, model: r.Model || "" });
      } else {
        setVinError("We couldn't decode that VIN. Double-check the characters or contact our fitment team.");
      }
    } catch {
      setVinError("VIN lookup service is temporarily unavailable. Please try the Year/Make/Model selector instead.");
    } finally {
      setVinLoading(false);
    }
  }

  const vehiclesSupported = useMemo(() => getTotalVehicleCount(), []);

  const bestSellers = useMemo(() => getFeaturedProducts(8), []);

  const todaysDeals = useMemo(
    () =>
      [...ALL_PRODUCTS]
        .sort((a, b) => (1 - a.price / a.was) - (1 - b.price / b.was))
        .reverse()
        .slice(0, 8),
    []
  );

  const inventoryParts = useMemo(
    () =>
      (activeCategory === "All" ? ALL_PRODUCTS : getProductsByCategory(activeCategory)).slice(0, 48),
    [activeCategory]
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      {/* ── Announcement Bar ──────────────────────────────────────────────── */}
      <div className="bg-blue-900 py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-white">
          <span className="flex items-center gap-1.5">
            <Truck className="h-3.5 w-3.5 shrink-0" />
            Free Shipping on Orders $75+
          </span>
          <span className="hidden sm:block text-blue-400">|</span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 shrink-0" />
            Same-Day Shipping Before 3PM EST
          </span>
          <span className="hidden sm:block text-blue-400">|</span>
          <span className="flex items-center gap-1.5">
            <RotateCcw className="h-3.5 w-3.5 shrink-0" />
            30-Day Returns
          </span>
          <span className="hidden sm:block text-blue-400">|</span>
          <span className="flex items-center gap-1.5">
            <Phone className="h-3.5 w-3.5 shrink-0" />
            1-800-762-5832
          </span>
        </div>
      </div>

      {/* ── Hero: Vehicle Lookup (primary homepage element) ───────────────── */}
      <section className="relative overflow-hidden bg-zinc-900 border-b border-zinc-800">
        <div className="absolute inset-0 bg-blueprint-grid opacity-40 pointer-events-none" />
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 70% 40%, #1d4ed8 0%, transparent 65%)" }}
        />
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 10% 90%, #1e3a8a 0%, transparent 60%)" }}
        />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center mb-10">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-600/10 px-4 py-1.5 text-sm text-red-400">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse shrink-0" />
              Serving Mechanics &amp; Drivers Since 2015 · 1,500+ Parts In Stock
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
              Find the Right Part for{" "}
              <span className="text-blue-400">Your Exact Vehicle.</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed">
              Search by Year, Make, Model &amp; Engine — or decode your VIN — for a guaranteed fitment match.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-600/10 px-4 py-1.5 text-sm font-semibold text-red-400">
              <Shield className="h-4 w-4" />
              100% Fitment Guarantee
            </div>
          </div>

          {/* Lookup card */}
          <div className="mx-auto max-w-2xl rounded-2xl border border-blue-900/60 bg-zinc-800/80 backdrop-blur p-5 sm:p-6 shadow-2xl shadow-blue-950/40">
            {/* Tabs */}
            <div className="flex gap-1 mb-5 rounded-lg bg-zinc-900 p-1">
              <button
                onClick={() => setLookupTab("vehicle")}
                className={`flex-1 flex items-center justify-center gap-1.5 rounded-md py-2 text-sm font-semibold transition-colors ${
                  lookupTab === "vehicle" ? "bg-blue-600 text-white" : "text-zinc-400 hover:text-white"
                }`}
              >
                <Car className="h-4 w-4" /> By Vehicle
              </button>
              <button
                onClick={() => setLookupTab("vin")}
                className={`flex-1 flex items-center justify-center gap-1.5 rounded-md py-2 text-sm font-semibold transition-colors ${
                  lookupTab === "vin" ? "bg-blue-600 text-white" : "text-zinc-400 hover:text-white"
                }`}
              >
                <ScanLine className="h-4 w-4" /> By VIN
              </button>
              <button
                onClick={() => setLookupTab("oem")}
                className={`flex-1 flex items-center justify-center gap-1.5 rounded-md py-2 text-sm font-semibold transition-colors ${
                  lookupTab === "oem" ? "bg-blue-600 text-white" : "text-zinc-400 hover:text-white"
                }`}
              >
                <Hash className="h-4 w-4" /> By OEM #
              </button>
            </div>

            {lookupTab === "vehicle" ? (
              <VehicleSearch onSearch={handleVehicleSearch} />
            ) : lookupTab === "oem" ? (
              <>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (oemQuery.trim()) window.location.href = `/search?q=${encodeURIComponent(oemQuery.trim())}`;
                  }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <input
                    type="text"
                    value={oemQuery}
                    onChange={(e) => setOemQuery(e.target.value)}
                    placeholder="e.g. 04465-AZ010, PF63"
                    className="flex-1 rounded-lg border border-zinc-600 bg-zinc-700 text-white placeholder:text-zinc-500 px-4 py-3 text-sm font-mono tracking-wider focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={!oemQuery.trim()}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-cta-600 hover:bg-cta-500 active:bg-cta-700 disabled:opacity-60 text-white font-semibold px-6 py-3 text-sm transition-colors whitespace-nowrap"
                  >
                    <Hash className="h-4 w-4" />
                    Search OEM #
                  </button>
                </form>
                <p className="mt-2 text-xs text-zinc-500">
                  Searches OEM numbers, interchange numbers, and SKUs across the full catalog
                </p>
              </>
            ) : (
              <>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={vin}
                    onChange={(e) => setVin(e.target.value.toUpperCase().slice(0, 17))}
                    placeholder="e.g. 1HGCM82633A004352"
                    maxLength={17}
                    className="flex-1 rounded-lg border border-zinc-600 bg-zinc-700 text-white placeholder:text-zinc-500 px-4 py-3 text-sm font-mono tracking-wider focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                  />
                  <button
                    onClick={handleVinDecode}
                    disabled={vinLoading}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-cta-600 hover:bg-cta-500 active:bg-cta-700 disabled:opacity-60 text-white font-semibold px-6 py-3 text-sm transition-colors whitespace-nowrap"
                  >
                    {vinLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ScanLine className="h-4 w-4" />}
                    {vinLoading ? "Decoding…" : "Decode VIN"}
                  </button>
                </div>
                <p className="mt-2 text-xs text-zinc-500">{vin.length}/17 characters · powered by the NHTSA vehicle database</p>

                {vinError && (
                  <div className="mt-4 flex items-start gap-2 rounded-lg border border-rose-800/50 bg-rose-950/30 px-4 py-3 text-sm text-rose-300">
                    <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                    {vinError}
                  </div>
                )}

                {vinResult && (
                  <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border border-emerald-800/50 bg-emerald-950/30 px-4 py-3.5">
                    <div className="flex items-center gap-2 text-sm text-emerald-300">
                      <Check className="h-4 w-4 shrink-0" />
                      Decoded: <strong className="text-white">{vinResult.year} {vinResult.make} {vinResult.model}</strong>
                    </div>
                    <Link
                      href={`/search?year=${encodeURIComponent(vinResult.year)}&make=${encodeURIComponent(vinResult.make)}&model=${encodeURIComponent(vinResult.model)}`}
                      className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold px-4 py-2 transition-colors shrink-0"
                    >
                      Shop Parts <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                )}
              </>
            )}

            <p className="mt-3 text-xs text-zinc-500 text-center">
              Or{" "}
              <Link href="/search" className="text-red-400 hover:text-red-300 underline underline-offset-2">
                search by part name, SKU, or OEM number
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ── Brand Marquee ────────────────────────────────────────────────── */}
      <BrandMarquee />

      {/* ── Trust Badges ─────────────────────────────────────────────────── */}
      <section className="bg-zinc-900 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {[
              { icon: Truck,       title: "Fast Shipping",        sub: "Same-day before 3PM EST"     },
              { icon: Package,     title: "OEM & Aftermarket",    sub: "1,500+ parts in stock"        },
              { icon: Lock,        title: "Secure Checkout",      sub: "256-bit SSL encryption"       },
              { icon: Shield,      title: "Fitment Guarantee",    sub: "Wrong part ships free return"  },
              { icon: Headphones,  title: "USA Support",          sub: "Mon–Sat 7am–9pm CT"            },
              { icon: RotateCcw,   title: "Easy Returns",         sub: "30-day return window"          },
            ].map(({ icon: Icon, title, sub }) => (
              <div key={title} className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-800/60 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-600/15 text-red-500">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{title}</p>
                  <p className="text-xs text-zinc-400 leading-tight mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Statistics ───────────────────────────────────────────────────── */}
      <section className="bg-zinc-950 py-14 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 text-center">
            {[
              { value: ALL_PRODUCTS.length, suffix: "+", label: "OEM Parts" },
              { value: BRANDS.length,       suffix: "",  label: "Trusted Brands" },
              { value: 10000,               suffix: "+", label: "Customers Served" },
              { value: vehiclesSupported,   suffix: "+", label: "Vehicles Supported" },
              { value: 99,                  suffix: "%", label: "Fitment Accuracy" },
            ].map(({ value, suffix, label }) => (
              <div key={label}>
                <AnimatedCounter
                  value={value}
                  suffix={suffix}
                  className="block text-3xl sm:text-4xl font-extrabold text-blue-400"
                />
                <p className="mt-1.5 text-xs sm:text-sm text-zinc-400">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Rotating Promo Banner ─────────────────────────────────────────── */}
      <RotatingPromoBanner />

      {/* ── Shop by Category ───────────────────────────────────────────────── */}
      <section className="bg-zinc-950 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Shop by Category</h2>
              <p className="mt-1 text-sm text-zinc-400">1,500 parts across 15 automotive categories</p>
            </div>
            <Link href="/parts" className="hidden sm:flex items-center gap-1 text-sm font-medium text-red-400 hover:text-red-300 transition-colors">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat}
                href={`/category/${CATEGORY_SLUGS[cat]}`}
                className="group flex flex-col items-center text-center rounded-2xl border border-zinc-800 bg-zinc-900 p-5 sm:p-6 hover:border-red-500 hover:bg-zinc-800 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-950/30 transition-all duration-300"
              >
                <PartIcon
                  category={cat}
                  iconName={CATEGORY_ICON_NAMES[cat]}
                  className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300"
                  iconClassName="h-8 w-8 sm:h-10 sm:w-10"
                />
                <h3 className="text-xs sm:text-sm font-semibold text-white leading-tight">{cat}</h3>
                <p className="mt-1 text-xs text-zinc-500">{getProductsByCategory(cat).length} parts</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Shop by Make ──────────────────────────────────────────────────── */}
      <section className="bg-zinc-900 border-y border-zinc-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div className="flex items-center gap-2">
              <Car className="h-6 w-6 text-red-500" />
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">Shop by Make</h2>
                <p className="mt-1 text-sm text-zinc-400">Browse parts for your specific vehicle make</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {MAKES.slice(0, 12).map((m) => (
              <Link
                key={m.slug}
                href={`/make/${m.slug}`}
                className="group flex flex-col items-center gap-2.5 rounded-xl bg-zinc-800 p-4 text-center hover:bg-zinc-700 hover:-translate-y-0.5 transition-all duration-200"
              >
                <BrandLogo name={m.name} size="md" className="group-hover:scale-105 transition-transform duration-200" />
                <span className="text-sm font-bold text-white">{m.name}</span>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/parts" className="inline-flex items-center gap-1 text-sm font-medium text-red-400 hover:text-red-300 transition-colors">
              View All 26 Makes <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Shop by Brand ─────────────────────────────────────────────────── */}
      <section className="bg-zinc-950 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-8">
            <Tag className="h-6 w-6 text-red-500" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Shop by Brand</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {BRANDS.map((brand) => (
              <Link
                key={brand}
                href={`/brand/${brandSlug(brand)}`}
                className="flex items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-5 text-base font-extrabold tracking-tight text-zinc-300 hover:border-red-600 hover:text-white transition-all duration-150"
              >
                {brand}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Brands ───────────────────────────────────────────────── */}
      <section className="bg-zinc-900 border-y border-zinc-800 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-2">
          <h2 className="text-center text-xs font-semibold text-zinc-500 uppercase tracking-widest">
            Featured Brands We Work With
          </h2>
        </div>
        <PartsBrandMarquee />
      </section>

      {/* ── Best Sellers ──────────────────────────────────────────────────── */}
      <section className="bg-zinc-900 border-y border-zinc-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-red-500" />
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">Best Sellers</h2>
                <p className="mt-1 text-sm text-zinc-400">Our most-reviewed parts, ranked by customer volume</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {bestSellers.map((p) => <ProductCard key={p.id} part={p} />)}
          </div>
        </div>
      </section>

      {/* ── Today's Deals ─────────────────────────────────────────────────── */}
      <section className="bg-zinc-950 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div className="flex items-center gap-2">
              <Tag className="h-6 w-6 text-red-500" />
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">Today&apos;s Deals</h2>
                <p className="mt-1 text-sm text-zinc-400">The deepest discounts in our catalog right now</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {todaysDeals.map((p) => <ProductCard key={p.id} part={p} />)}
          </div>
        </div>
      </section>

      {/* ── Full Inventory ────────────────────────────────────────────────── */}
      <section className="bg-zinc-900 border-y border-zinc-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Shop Our In-Stock Inventory</h2>
              <p className="mt-1 text-sm text-zinc-400">
                Showing {inventoryParts.length} of {ALL_PRODUCTS.length} total parts
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setActiveCategory("All")}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                activeCategory === "All" ? "bg-red-600 text-white" : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
              }`}
            >
              All Parts
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                  activeCategory === cat ? "bg-red-600 text-white" : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {inventoryParts.map((p) => <ProductCard key={p.id} part={p} />)}
          </div>

          <div className="mt-8 text-center">
            <Link
              href={activeCategory === "All" ? "/parts" : `/category/${CATEGORY_SLUGS[activeCategory as keyof typeof CATEGORY_SLUGS]}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-400 hover:text-red-300 transition-colors"
            >
              View All {activeCategory === "All" ? ALL_PRODUCTS.length : getProductsByCategory(activeCategory).length} Parts <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Trust & Support ───────────────────────────────────────────────── */}
      <section className="bg-zinc-950 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Trust &amp; Support</h2>
            <p className="mt-2 text-zinc-400 max-w-xl mx-auto">
              Built for repair shops, mechanics, fleet buyers, and vehicle owners since 2015
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Shield,      title: "Secure Checkout",       desc: "Encrypted checkout with all major cards and digital wallets accepted.", href: "/checkout" },
              { icon: Check,       title: "Fitment Verification",  desc: "Every order is checked against our vehicle fitment database before it ships.", href: "/fitment" },
              { icon: Package,     title: "Order Tracking",        desc: "Track every order from warehouse to driveway from your account dashboard.", href: "/orders" },
              { icon: RotateCcw,   title: "Returns Policy",        desc: "30-day hassle-free returns on unused parts in original packaging.", href: "/returns" },
              { icon: Building2,   title: "Commercial Accounts",   desc: "Volume pricing and Net-30 terms for repair shops and dealerships.", href: "/fleet" },
              { icon: Truck,       title: "Fleet Support",         desc: "Dedicated account management for fleet operators and municipalities.", href: "/fleet" },
              { icon: Headphones,  title: "Customer Support",      desc: "Speak with a real parts specialist Mon–Sat, 7am–9pm CT.", href: "/contact" },
              { icon: Phone,       title: "Call a Specialist",     desc: "Need help confirming fitment? Call 1-800-762-5832.", href: "tel:+18007625832" },
            ].map(({ icon: Icon, title, desc, href }) => (
              <Link
                key={title}
                href={href}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 text-center hover:border-zinc-700 transition-colors"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-red-600/15 text-red-500">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-blue-900 py-16">
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 20% 50%, #1d4ed8 0%, transparent 70%)" }}
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Get 10% Off Your First Order
          </h2>
          <p className="mt-3 text-blue-200 text-base sm:text-lg max-w-xl mx-auto">
            Sign up for restock alerts and parts deals. No spam — just real inventory updates.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full rounded-lg border border-blue-700 bg-blue-800/50 text-white placeholder:text-blue-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="w-full sm:w-auto whitespace-nowrap rounded-lg bg-cta-600 hover:bg-cta-500 active:bg-cta-700 text-white font-semibold px-6 py-3 text-sm transition-colors">
              Get My 10% Off
            </button>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="bg-zinc-900 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">

            <div className="col-span-2 sm:col-span-3 lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Package className="h-6 w-6 text-red-500" />
                <span className="text-xl font-extrabold text-white tracking-tight">RockAutoTec</span>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">
                Your trusted source for quality auto parts since 2015. 1,500+ parts across 15 categories for every make and model.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-zinc-400">
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-red-500 shrink-0" />
                  1-800-762-5832
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-red-500 shrink-0" />
                  support@rockautotec.com
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-red-500 shrink-0" />
                  Mon–Sat 7am–9pm CT
                </li>
              </ul>
              <div className="mt-5 flex gap-2.5">
                {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 hover:bg-red-600 text-zinc-400 hover:text-white transition-all duration-150"
                    aria-label="Social link"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-white uppercase tracking-widest mb-4">Shop</h4>
              <ul className="space-y-2">
                {CATEGORIES.map((cat) => (
                  <li key={cat}>
                    <Link href={`/category/${CATEGORY_SLUGS[cat]}`} className="text-sm text-zinc-400 hover:text-red-400 transition-colors">
                      {cat}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-white uppercase tracking-widest mb-4">Account</h4>
              <ul className="space-y-2">
                {[
                  ["Sign In",        "/login"],
                  ["Create Account", "/login"],
                  ["Order History",  "/orders"],
                  ["Track My Order", "/orders"],
                  ["My Garage",      "/profile"],
                  ["Returns",        "/returns"],
                ].map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="text-sm text-zinc-400 hover:text-red-400 transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-white uppercase tracking-widest mb-4">Help &amp; Info</h4>
              <ul className="space-y-2">
                {[
                  ["Help Center",          "/contact"],
                  ["Shipping Policy",      "/shipping"],
                  ["Return Policy",        "/returns"],
                  ["Fitment Guarantee",    "/fitment"],
                  ["Fleet & Commercial",   "/fleet"],
                  ["Warranty Policy",      "/warranty"],
                  ["Contact Us",           "/contact"],
                  ["About Us",             "/about"],
                ].map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="text-sm text-zinc-400 hover:text-red-400 transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Compliance badges */}
        <div className="border-t border-zinc-800 bg-zinc-950/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            <span className="flex items-center gap-2 text-xs text-zinc-500">
              <Shield className="h-4 w-4 text-emerald-500" />
              PCI DSS Compliant Checkout
            </span>
            <span className="flex items-center gap-2 text-xs text-zinc-500">
              <Lock className="h-4 w-4 text-emerald-500" />
              256-bit SSL Encryption
            </span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-zinc-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-zinc-500 text-center sm:text-left">
              © 2026 RockAutoTec LLC. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {([
                ["Privacy Policy",  "/privacy"],
                ["Terms of Service","/terms"],
                ["Sitemap",         "/parts"],
              ] as [string, string][]).map(([l, href]) => (
                <Link key={l} href={href} className="text-xs text-zinc-500 hover:text-red-400 transition-colors">
                  {l}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-1.5 text-zinc-600 text-xs">
              <CreditCard className="h-4 w-4" />
              <span>Visa · MC · Amex · PayPal · Apple Pay</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
