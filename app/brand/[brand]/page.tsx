"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Star, ShoppingCart, ArrowLeft, Package, SlidersHorizontal, ChevronDown, Check, AlertTriangle } from "lucide-react";
import {
  getProductsByBrand, BRAND_DISPLAY_NAMES, MANUFACTURER_NAMES, CATEGORY_ICON_NAMES,
  isLowStock, lowStockCount, shippingEstimate, type Product, type Brand,
} from "@/lib/catalog";
import { useCart } from "@/components/cart-context";
import PartIcon from "@/components/part-icon";

// ── Types ─────────────────────────────────────────────────────────────────────

type SortKey = "default" | "price-asc" | "price-desc" | "rating" | "reviews";

const SORT_LABELS: Record<SortKey, string> = {
  default:      "Default",
  "price-asc":  "Price: Low to High",
  "price-desc": "Price: High to Low",
  rating:       "Highest Rated",
  reviews:      "Most Reviewed",
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < Math.round(rating)
              ? "fill-amber-400 text-amber-400"
              : "text-zinc-700"
          }`}
        />
      ))}
    </div>
  );
}

function capitalize(str: string) {
  return str
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function BrandPage() {
  const params     = useParams<{ brand: string }>();
  const brandSlug  = params.brand ?? "";
  const { addToCart } = useCart();

  // derive display name: prefer catalog lookup, fallback to capitalized slug
  const brandName =
    BRAND_DISPLAY_NAMES[brandSlug] ??
    capitalize(brandSlug);

  const allProducts = useMemo(() => getProductsByBrand(brandSlug), [brandSlug]);

  // unique part types for filter pills
  const subcategories = useMemo(
    () => ["All", ...Array.from(new Set(allProducts.map((p) => p.partType)))],
    [allProducts]
  );

  const manufacturer = allProducts[0] ? MANUFACTURER_NAMES[allProducts[0].brand as Brand] : "";

  const [selectedSub, setSelectedSub] = useState<string>("All");
  const [sortBy,      setSortBy]      = useState<SortKey>("default");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [showSort,    setShowSort]    = useState(false);
  const [addedId,     setAddedId]     = useState<number | null>(null);

  const filtered = useMemo(() => {
    let list = [...allProducts];
    if (selectedSub !== "All") list = list.filter((p) => p.partType === selectedSub);
    if (inStockOnly)           list = list.filter((p) => p.inStock);
    switch (sortBy) {
      case "price-asc":  list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "rating":     list.sort((a, b) => b.rating - a.rating); break;
      case "reviews":    list.sort((a, b) => b.reviews - a.reviews); break;
    }
    return list;
  }, [allProducts, selectedSub, sortBy, inStockOnly]);

  function handleAdd(p: Product) {
    addToCart({ part: p.name, year: "", make: "", model: "", price: p.price });
    setAddedId(p.id);
    setTimeout(() => setAddedId(null), 1600);
  }

  // ── Empty state ────────────────────────────────────────────────────────────
  if (allProducts.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center px-4 text-center">
        <Package className="h-16 w-16 text-zinc-700 mb-6" />
        <h1 className="text-2xl font-bold text-white mb-2">
          Brand Not Found
        </h1>
        <p className="text-zinc-400 text-sm mb-8 max-w-sm">
          We don&apos;t currently carry products from &ldquo;{brandName}&rdquo;,
          or the brand name may be misspelled.
        </p>
        <Link
          href="/parts"
          className="inline-flex items-center gap-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold px-5 py-2.5 text-sm transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Browse All Parts
        </Link>
      </div>
    );
  }

  const inStockCount = allProducts.filter((p) => p.inStock).length;

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      {/* ── Brand Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-zinc-900 border-b border-zinc-800">
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 70% 40%, #dc2626 0%, transparent 65%)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-zinc-500 mb-6">
            <Link href="/" className="hover:text-red-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/parts" className="hover:text-red-400 transition-colors">Parts</Link>
            <span>/</span>
            <span className="text-zinc-300">{brandName}</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            {/* Brand logo placeholder */}
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-800 text-2xl font-black text-red-500 select-none shadow-md">
              {brandName.charAt(0)}
            </div>

            <div>
              <p className="text-xs font-semibold text-red-400 uppercase tracking-widest mb-1">
                OEM & Aftermarket Parts
              </p>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                {brandName}
              </h1>
              {manufacturer && (
                <p className="mt-1 text-xs text-zinc-500">{manufacturer}</p>
              )}
              <p className="mt-1.5 text-zinc-400 text-sm">
                {allProducts.length} products ·{" "}
                <span className="text-emerald-400 font-semibold">
                  {inStockCount} in stock
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Filters & Sort Toolbar ────────────────────────────────────── */}
        <div className="flex flex-col gap-4 mb-6">

          {/* Subcategory pills */}
          <div className="flex flex-wrap gap-2">
            {subcategories.map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSub(sub)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold border transition-all duration-150 ${
                  selectedSub === sub
                    ? "bg-red-600 border-red-600 text-white"
                    : "border-zinc-700 bg-zinc-800 text-zinc-300 hover:border-zinc-500 hover:text-white"
                }`}
              >
                {sub}
              </button>
            ))}
          </div>

          {/* Sort + In-stock row */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Result count */}
            <p className="text-sm text-zinc-400">
              Showing{" "}
              <span className="text-white font-semibold">{filtered.length}</span>{" "}
              {filtered.length === 1 ? "product" : "products"}
            </p>

            <div className="flex items-center gap-3">
              {/* In-stock toggle */}
              <button
                onClick={() => setInStockOnly((v) => !v)}
                className={`flex items-center gap-2 rounded-lg border px-3.5 py-2 text-xs font-semibold transition-all duration-150 ${
                  inStockOnly
                    ? "bg-emerald-600/20 border-emerald-600/50 text-emerald-400"
                    : "border-zinc-700 bg-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
                }`}
              >
                {inStockOnly ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  <span className="h-3.5 w-3.5 rounded-sm border border-zinc-600 inline-block" />
                )}
                In Stock Only
              </button>

              {/* Sort dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowSort((s) => !s)}
                  className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 text-xs font-medium transition-colors"
                >
                  <SlidersHorizontal className="h-3.5 w-3.5 text-zinc-500" />
                  <span className="hidden sm:inline">{SORT_LABELS[sortBy]}</span>
                  <span className="sm:hidden">Sort</span>
                  <ChevronDown
                    className={`h-3.5 w-3.5 text-zinc-500 transition-transform ${showSort ? "rotate-180" : ""}`}
                  />
                </button>

                {showSort && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowSort(false)} />
                    <div className="absolute right-0 top-full mt-1 w-52 rounded-xl border border-zinc-700 bg-zinc-900 shadow-xl z-20 overflow-hidden">
                      {(Object.entries(SORT_LABELS) as [SortKey, string][]).map(([key, label]) => (
                        <button
                          key={key}
                          onClick={() => { setSortBy(key); setShowSort(false); }}
                          className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                            sortBy === key
                              ? "bg-red-600 text-white font-semibold"
                              : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Free shipping notice ──────────────────────────────────────── */}
        <div className="flex items-center gap-2 rounded-lg border border-emerald-900/50 bg-emerald-950/30 px-4 py-2.5 mb-6 text-sm text-emerald-400">
          <Package className="h-4 w-4 shrink-0" />
          <span>
            Free shipping on orders over <strong>$75</strong> · Same-day dispatch on in-stock items
          </span>
        </div>

        {/* ── Product Grid ──────────────────────────────────────────────── */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Package className="h-12 w-12 text-zinc-700 mb-4" />
            <p className="text-zinc-400 text-sm">
              No products match your current filters.
            </p>
            <button
              onClick={() => { setSelectedSub("All"); setInStockOnly(false); }}
              className="mt-4 text-sm text-red-400 hover:text-red-300 transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((product) => {
              const discount = Math.round(((product.was - product.price) / product.was) * 100);
              const added = addedId === product.id;

              return (
                <div
                  key={product.id}
                  className="flex flex-col rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden hover:border-zinc-700 hover:shadow-lg hover:shadow-zinc-950/60 transition-all duration-150"
                >
                  {/* Image */}
                  <div className="relative border-b border-zinc-800">
                    <PartIcon
                      category={product.category}
                      iconName={CATEGORY_ICON_NAMES[product.category]}
                      className="h-40"
                      iconClassName="h-10 w-10"
                    />
                    {/* Stock badge */}
                    {!product.inStock ? (
                      <span className="absolute top-2.5 right-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-900/60 text-red-400 border border-red-700/40">
                        Out of Stock
                      </span>
                    ) : isLowStock(product) ? (
                      <span className="absolute top-2.5 right-2.5 flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-900/60 text-amber-400 border border-amber-700/40">
                        <AlertTriangle className="h-3 w-3" /> Only {lowStockCount(product)} left
                      </span>
                    ) : (
                      <span className="absolute top-2.5 right-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-900/60 text-emerald-400 border border-emerald-700/40">
                        In Stock
                      </span>
                    )}
                    {/* Discount badge */}
                    {discount > 0 && (
                      <span className="absolute top-2.5 left-2.5 text-[10px] font-bold bg-red-600 text-white px-2 py-0.5 rounded-full">
                        -{discount}%
                      </span>
                    )}
                  </div>

                  {/* Body */}
                  <div className="flex flex-col flex-1 p-4">
                    {/* Category / SKU row */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wide">
                        {product.partType}
                      </span>
                      <span className="text-zinc-700">·</span>
                      <span className="text-[10px] font-mono text-zinc-600 truncate">
                        {product.sku}
                      </span>
                    </div>

                    {/* Name */}
                    <h3 className="text-sm font-semibold text-white leading-snug mb-1.5 line-clamp-2">
                      {product.name}
                    </h3>

                    {/* OEM / shipping */}
                    <p className="text-[11px] text-zinc-600 font-mono mb-1">OEM {product.oemNumber}</p>
                    <p className="text-xs text-zinc-500 leading-relaxed mb-3">
                      {shippingEstimate(product)} · Fits {product.fitment.length} vehicle{product.fitment.length === 1 ? "" : "s"}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      <StarRating rating={product.rating} />
                      <span className="text-xs text-zinc-500">
                        {product.rating} ({product.reviews.toLocaleString()})
                      </span>
                    </div>

                    {/* Price + CTA */}
                    <div className="mt-auto">
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-lg font-bold text-white">
                          ${product.price.toFixed(2)}
                        </span>
                        <span className="text-xs text-zinc-600 line-through">
                          ${product.was.toFixed(2)}
                        </span>
                        <span className="text-xs font-semibold text-emerald-400">
                          Save {discount}%
                        </span>
                      </div>

                      <button
                        onClick={() => handleAdd(product)}
                        disabled={!product.inStock}
                        className={`w-full flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold transition-colors ${
                          added
                            ? "bg-emerald-600 text-white"
                            : product.inStock
                            ? "bg-red-600 hover:bg-red-500 active:bg-red-700 text-white"
                            : "bg-zinc-700 text-zinc-500 cursor-not-allowed"
                        }`}
                      >
                        {added ? (
                          <>
                            <Check className="h-3.5 w-3.5" />
                            Added to Cart!
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="h-3.5 w-3.5" />
                            {product.inStock ? "Add to Cart" : "Out of Stock"}
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── Back link ─────────────────────────────────────────────────── */}
        <div className="mt-12 pt-6 border-t border-zinc-800">
          <Link
            href="/parts"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Browse All Categories
          </Link>
        </div>

      </div>
    </div>
  );
}
