"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, SlidersHorizontal, X, Star, ShoppingCart, ChevronDown, Tag, AlertTriangle, Check } from "lucide-react";
import {
  ALL_PRODUCTS, CATEGORIES, CATEGORY_ICON_NAMES, searchProducts,
  isLowStock, lowStockCount, shippingEstimate, type Product,
} from "@/lib/catalog";
import { useCart } from "@/components/cart-context";
import PartIcon from "@/components/part-icon";

const PRICE_RANGES = [
  { label: "Under $25",     min: 0,   max: 25 },
  { label: "$25 – $75",     min: 25,  max: 75 },
  { label: "$75 – $150",    min: 75,  max: 150 },
  { label: "$150 – $300",   min: 150, max: 300 },
  { label: "$300+",         min: 300, max: Infinity },
];

type SortKey = "relevance" | "price-asc" | "price-desc" | "rating" | "reviews";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-3 w-3 ${i < Math.floor(rating) ? "text-amber-400 fill-amber-400" : "text-zinc-700"}`}
        />
      ))}
    </div>
  );
}

function StockBadge({ part }: { part: Product }) {
  if (!part.inStock) return <span className="text-[10px] font-semibold text-red-500 shrink-0">Out of Stock</span>;
  if (isLowStock(part)) {
    return (
      <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-400 shrink-0">
        <AlertTriangle className="h-3 w-3" /> Only {lowStockCount(part)} left
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-500 shrink-0">
      <Check className="h-3 w-3" /> In Stock
    </span>
  );
}

function SearchContent() {
  const rawParams = useSearchParams();
  const { addToCart } = useCart();

  const [query, setQuery]                   = useState(rawParams.get("q") ?? "");
  const [selectedCats, setSelectedCats]     = useState<string[]>([]);
  const [priceRange, setPriceRange]         = useState<{ label: string; min: number; max: number } | null>(null);
  const [sortBy, setSortBy]                 = useState<SortKey>("relevance");
  const [showFilters, setShowFilters]       = useState(false);
  const [addedId, setAddedId]               = useState<number | null>(null);

  const vehicleYear  = rawParams.get("year")  ?? "";
  const vehicleMake  = rawParams.get("make")  ?? "";
  const vehicleModel = rawParams.get("model") ?? "";
  const hasVehicle = Boolean(vehicleYear && vehicleMake && vehicleModel);

  const activeFilterCount = selectedCats.length + (priceRange ? 1 : 0);

  const results = useMemo(() => {
    let parts: Product[] = query.trim() ? searchProducts(query) : ALL_PRODUCTS;

    if (hasVehicle) {
      const yearNum = parseInt(vehicleYear, 10);
      parts = parts.filter((p) =>
        p.fitment.some(
          (f) =>
            f.make.toLowerCase() === vehicleMake.toLowerCase() &&
            f.model.toLowerCase() === vehicleModel.toLowerCase() &&
            yearNum >= f.yearStart && yearNum <= f.yearEnd
        )
      );
    }

    if (selectedCats.length > 0) {
      parts = parts.filter((p) => selectedCats.includes(p.category));
    }

    if (priceRange) {
      parts = parts.filter((p) => p.price >= priceRange.min && p.price <= priceRange.max);
    }

    switch (sortBy) {
      case "price-asc":  return [...parts].sort((a, b) => a.price - b.price);
      case "price-desc": return [...parts].sort((a, b) => b.price - a.price);
      case "rating":     return [...parts].sort((a, b) => b.rating - a.rating);
      case "reviews":    return [...parts].sort((a, b) => b.reviews - a.reviews);
      default:           return parts;
    }
  }, [query, selectedCats, priceRange, sortBy, hasVehicle, vehicleYear, vehicleMake, vehicleModel]);

  function handleAddToCart(part: Product) {
    addToCart({ part: part.name, year: vehicleYear, make: vehicleMake, model: vehicleModel, price: part.price });
    setAddedId(part.id);
    setTimeout(() => setAddedId(null), 1500);
  }

  function toggleCat(cat: string) {
    setSelectedCats((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  }

  function clearAll() {
    setSelectedCats([]);
    setPriceRange(null);
  }

  const savings = (part: Product) => Math.round(((part.was - part.price) / part.was) * 100);

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {hasVehicle && (
          <div className="mb-5 flex items-center gap-2.5 rounded-lg border border-emerald-800/50 bg-emerald-950/30 px-4 py-3 text-sm">
            <Check className="h-4 w-4 text-emerald-400 shrink-0" />
            <span className="text-emerald-300">
              Showing parts confirmed to fit your <strong className="text-white">{vehicleYear} {vehicleMake} {vehicleModel}</strong>
            </span>
          </div>
        )}

        {/* ── Search bar ─────────────────────────────────────────────────── */}
        <div className="relative mb-5">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search part name, brand, SKU, or OEM number…"
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 text-white placeholder:text-zinc-500 pl-12 pr-10 py-3.5 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* ── Active filter pills ─────────────────────────────────────────── */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {selectedCats.map((cat) => (
              <button
                key={cat}
                onClick={() => toggleCat(cat)}
                className="flex items-center gap-1.5 rounded-full bg-red-900/30 border border-red-800/50 text-red-300 text-xs px-3 py-1.5 hover:bg-red-900/50 transition-colors"
              >
                <Tag className="h-3 w-3" /> {cat} <X className="h-3 w-3 ml-0.5" />
              </button>
            ))}
            {priceRange && (
              <button
                onClick={() => setPriceRange(null)}
                className="flex items-center gap-1.5 rounded-full bg-red-900/30 border border-red-800/50 text-red-300 text-xs px-3 py-1.5 hover:bg-red-900/50 transition-colors"
              >
                {priceRange.label} <X className="h-3 w-3 ml-0.5" />
              </button>
            )}
            <button onClick={clearAll} className="text-xs text-zinc-500 hover:text-white transition-colors underline">
              Clear all
            </button>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-6">

          {/* ── Mobile filter toggle ──────────────────────────────────────── */}
          <div className="lg:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white font-medium"
            >
              <SlidersHorizontal className="h-4 w-4 text-red-500 shrink-0" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white font-bold">
                  {activeFilterCount}
                </span>
              )}
              <ChevronDown
                className={`ml-auto h-4 w-4 text-zinc-500 transition-transform duration-200 ${showFilters ? "rotate-180" : ""}`}
              />
            </button>
          </div>

          {/* ── Filter sidebar ────────────────────────────────────────────── */}
          <aside
            className={`${showFilters ? "block" : "hidden"} lg:block w-full lg:w-60 xl:w-64 shrink-0 space-y-4`}
          >
            {/* Category */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-white">Category</h3>
                {selectedCats.length > 0 && (
                  <button
                    onClick={() => setSelectedCats([])}
                    className="text-xs text-red-400 hover:text-red-300 transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="space-y-1.5">
                {CATEGORIES.map((cat) => {
                  const count = ALL_PRODUCTS.filter((p) => p.category === cat).length;
                  return (
                    <label key={cat} className="flex items-center gap-2.5 cursor-pointer group py-0.5">
                      <input
                        type="checkbox"
                        checked={selectedCats.includes(cat)}
                        onChange={() => toggleCat(cat)}
                        className="h-4 w-4 shrink-0 rounded border-zinc-600 bg-zinc-800 text-red-500 focus:ring-red-500 focus:ring-offset-0 cursor-pointer"
                      />
                      <span className="flex-1 text-sm text-zinc-400 group-hover:text-white transition-colors leading-tight">
                        {cat}
                      </span>
                      <span className="text-xs text-zinc-600">{count}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Price range */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-white">Price</h3>
                {priceRange && (
                  <button
                    onClick={() => setPriceRange(null)}
                    className="text-xs text-red-400 hover:text-red-300 transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="space-y-1">
                {PRICE_RANGES.map((range) => {
                  const active = priceRange?.label === range.label;
                  return (
                    <button
                      key={range.label}
                      onClick={() => setPriceRange(active ? null : range)}
                      className={`w-full text-left rounded-lg px-3 py-2 text-sm transition-colors ${
                        active
                          ? "bg-red-600 text-white font-medium"
                          : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                      }`}
                    >
                      {range.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {activeFilterCount > 0 && (
              <button
                onClick={clearAll}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white text-sm py-2.5 transition-colors"
              >
                Clear All Filters
              </button>
            )}
          </aside>

          {/* ── Results ──────────────────────────────────────────────────── */}
          <div className="flex-1 min-w-0">
            {/* Results header */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <p className="text-sm text-zinc-400">
                {query ? (
                  <>
                    <span className="text-white font-semibold">{results.length}</span> results
                    {" "}for &ldquo;<span className="text-red-400">{query}</span>&rdquo;
                  </>
                ) : (
                  <>
                    <span className="text-white font-semibold">{results.length}</span> parts
                  </>
                )}
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortKey)}
                className="rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-300 px-3 py-2 text-xs focus:outline-none focus:border-red-500 cursor-pointer"
              >
                <option value="relevance">Sort: Best Match</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviewed</option>
              </select>
            </div>

            {/* Empty state */}
            {results.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center rounded-xl border border-zinc-800 bg-zinc-900">
                <Search className="h-12 w-12 text-zinc-700 mb-4" />
                <p className="text-white font-semibold mb-2">No parts found</p>
                <p className="text-sm text-zinc-500 mb-6">
                  Try adjusting your search terms or clearing filters
                </p>
                <button
                  onClick={() => { setQuery(""); clearAll(); }}
                  className="text-sm text-red-400 hover:text-red-300 transition-colors"
                >
                  Clear everything and browse all parts
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {results.map((part) => (
                  <div
                    key={part.id}
                    className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden hover:border-zinc-700 transition-all duration-150 flex flex-col"
                  >
                    <Link href={`/part/${part.id}`} className="relative block">
                      <PartIcon
                        category={part.category}
                        iconName={CATEGORY_ICON_NAMES[part.category]}
                        className="h-32"
                        iconClassName="h-9 w-9"
                      />
                      {savings(part) > 0 && (
                        <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                          SAVE {savings(part)}%
                        </span>
                      )}
                    </Link>

                    <div className="flex items-center justify-between gap-2 px-4 py-2.5 border-b border-zinc-800 bg-zinc-950/60">
                      <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider truncate">
                        {part.category}
                      </span>
                      <StockBadge part={part} />
                    </div>

                    <div className="p-4 flex-1 flex flex-col">
                      <div className="mb-2">
                        <Link
                          href={`/part/${part.id}`}
                          className="text-sm font-semibold text-white hover:text-red-400 leading-snug line-clamp-2 transition-colors"
                        >
                          {part.name}
                        </Link>
                        <p className="text-xs text-zinc-500 mt-0.5">
                          {part.brand} · <span className="font-mono">{part.sku}</span>
                        </p>
                        <p className="text-[11px] text-zinc-600 font-mono mt-0.5">OEM {part.oemNumber}</p>
                      </div>

                      <div className="flex items-center gap-2 mb-2">
                        <StarRating rating={part.rating} />
                        <span className="text-[11px] text-zinc-500">
                          {part.rating} ({part.reviews.toLocaleString()})
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-500 mb-3">{shippingEstimate(part)}</p>

                      <div className="mt-auto flex items-end justify-between gap-2">
                        <div>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-lg font-bold text-white">
                              ${part.price.toFixed(2)}
                            </span>
                            <span className="text-xs text-zinc-600 line-through">
                              ${part.was.toFixed(2)}
                            </span>
                          </div>
                          <span className="inline-block text-[10px] font-semibold text-emerald-400 bg-emerald-950/50 border border-emerald-900/50 rounded px-1.5 py-0.5 mt-0.5">
                            Save {savings(part)}%
                          </span>
                        </div>
                        <button
                          onClick={() => handleAddToCart(part)}
                          disabled={!part.inStock}
                          className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-colors shrink-0 ${
                            addedId === part.id
                              ? "bg-emerald-600 text-white"
                              : part.inStock
                              ? "bg-red-600 hover:bg-red-500 text-white"
                              : "bg-zinc-700 text-zinc-500 cursor-not-allowed"
                          }`}
                        >
                          {addedId === part.id ? (
                            "Added!"
                          ) : (
                            <>
                              <ShoppingCart className="h-3.5 w-3.5" />
                              Add
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
          <div className="animate-spin h-8 w-8 border-2 border-red-600 border-t-transparent rounded-full" />
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
