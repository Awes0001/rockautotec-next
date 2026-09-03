"use client";

import { useState, useMemo } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, Star, ShoppingCart, Package, SlidersHorizontal,
  ChevronDown, X, Check, AlertTriangle, Car,
} from "lucide-react";
import {
  SLUG_TO_CATEGORY, CATEGORY_ICON_NAMES, getProductsByCategory,
  isLowStock, lowStockCount, shippingEstimate, type Product,
} from "@/lib/catalog";
import { useCart } from "@/components/cart-context";
import PartIcon from "@/components/part-icon";

type SortKey = "default" | "price-asc" | "price-desc" | "rating" | "reviews";

const PRICE_RANGES = [
  { label: "Under $25",   min: 0,   max: 25 },
  { label: "$25 – $75",   min: 25,  max: 75 },
  { label: "$75 – $150",  min: 75,  max: 150 },
  { label: "$150 – $300", min: 150, max: 300 },
  { label: "$300+",       min: 300, max: Infinity },
];

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
  if (!part.inStock) {
    return <span className="text-[10px] font-bold shrink-0 text-rose-500">Out of Stock</span>;
  }
  if (isLowStock(part)) {
    return (
      <span className="flex items-center gap-1 text-[10px] font-bold shrink-0 text-amber-400">
        <AlertTriangle className="h-3 w-3" /> Only {lowStockCount(part)} left
      </span>
    );
  }
  return <span className="text-[10px] font-bold shrink-0 text-emerald-500">In Stock</span>;
}

export default function CategorySlugPage() {
  const { slug }       = useParams<{ slug: string }>();
  const searchParams   = useSearchParams();
  const { addToCart }  = useCart();

  const year  = searchParams.get("year")  ?? "";
  const make  = searchParams.get("make")  ?? "";
  const model = searchParams.get("model") ?? "";

  const [sortBy, setSortBy]               = useState<SortKey>("default");
  const [addedId, setAddedId]             = useState<number | null>(null);
  const [showSort, setShowSort]           = useState(false);
  const [showFilters, setShowFilters]     = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange]       = useState<{ label: string; min: number; max: number } | null>(null);
  const [minRating, setMinRating]         = useState<number | null>(null);

  const categoryName = SLUG_TO_CATEGORY[slug ?? ""] ?? "";
  const rawParts: Product[] = categoryName ? getProductsByCategory(categoryName) : [];

  const brands = useMemo(
    () => Array.from(new Set(rawParts.map((p) => p.brand))).sort(),
    [rawParts]
  );

  const partTypes = useMemo(
    () => Array.from(new Set(rawParts.map((p) => p.partType))).sort(),
    [rawParts]
  );

  const activeFilterCount =
    selectedBrands.length + selectedTypes.length + (priceRange ? 1 : 0) + (minRating ? 1 : 0);

  const parts = useMemo(() => {
    let filtered = rawParts;
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((p) => selectedBrands.includes(p.brand));
    }
    if (selectedTypes.length > 0) {
      filtered = filtered.filter((p) => selectedTypes.includes(p.partType));
    }
    if (priceRange) {
      filtered = filtered.filter((p) => p.price >= priceRange.min && p.price <= priceRange.max);
    }
    if (minRating) {
      filtered = filtered.filter((p) => p.rating >= minRating);
    }
    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "price-asc":  return a.price - b.price;
        case "price-desc": return b.price - a.price;
        case "rating":     return b.rating - a.rating;
        case "reviews":    return b.reviews - a.reviews;
        default:           return 0;
      }
    });
  }, [rawParts, selectedBrands, selectedTypes, priceRange, minRating, sortBy]);

  const hasVehicle = Boolean(year && make && model);
  const backHref   = hasVehicle ? `/search?year=${year}&make=${make}&model=${model}` : "/parts";

  const sortLabels: Record<SortKey, string> = {
    default:      "Best Match",
    "price-asc":  "Price: Low to High",
    "price-desc": "Price: High to Low",
    rating:       "Highest Rated",
    reviews:      "Most Reviewed",
  };

  function handleAdd(part: Product) {
    addToCart({ part: part.name, year, make, model, price: part.price });
    setAddedId(part.id);
    setTimeout(() => setAddedId(null), 1500);
  }

  function toggleBrand(brand: string) {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  }

  function toggleType(type: string) {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  }

  function clearFilters() {
    setSelectedBrands([]);
    setSelectedTypes([]);
    setPriceRange(null);
    setMinRating(null);
  }

  if (!categoryName) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-center px-4">
        <Package className="h-14 w-14 text-zinc-700 mb-4" />
        <h1 className="text-xl font-bold text-white mb-2">Category Not Found</h1>
        <p className="text-zinc-400 text-sm mb-6">
          The category &ldquo;{slug}&rdquo; doesn&apos;t exist.
        </p>
        <Link href="/parts" className="text-sm text-red-400 hover:text-red-300 transition-colors">
          ← Browse all categories
        </Link>
      </div>
    );
  }

  const savings = (p: Product) => Math.round(((p.was - p.price) / p.was) * 100);

  return (
    <div className="min-h-screen bg-zinc-950">

      {/* ── Category hero ───────────────────────────────────────────────── */}
      <div className="relative h-32 sm:h-40 overflow-hidden">
        <PartIcon
          category={categoryName}
          iconName={CATEGORY_ICON_NAMES[categoryName]}
          className="absolute inset-0 w-full h-full"
          iconClassName="h-16 w-16 opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/70 to-transparent" />
        <div className="absolute inset-0 flex items-center px-4 sm:px-8 lg:px-12">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {categoryName}
            </h1>
            {hasVehicle && (
              <p className="text-zinc-400 text-sm mt-1">For your {year} {make} {model}</p>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Toolbar ───────────────────────────────────────────────────── */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-4">
            <Link href={backHref} className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back</span>
            </Link>
            <span className="text-zinc-700">|</span>
            <p className="text-sm text-zinc-400">
              <span className="text-white font-semibold">{parts.length}</span> of {rawParts.length} parts
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2.5 text-sm font-medium transition-colors"
            >
              <SlidersHorizontal className="h-4 w-4 text-red-500" />
              Filters
              {activeFilterCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] text-white font-bold">
                  {activeFilterCount}
                </span>
              )}
            </button>

            <div className="relative">
              <button
                onClick={() => setShowSort(!showSort)}
                className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2.5 text-sm font-medium transition-colors"
              >
                <SlidersHorizontal className="h-4 w-4 text-zinc-500" />
                <span className="hidden sm:inline">{sortLabels[sortBy]}</span>
                <span className="sm:hidden">Sort</span>
                <ChevronDown className={`h-4 w-4 text-zinc-500 transition-transform ${showSort ? "rotate-180" : ""}`} />
              </button>

              {showSort && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowSort(false)} />
                  <div className="absolute right-0 top-full mt-1 w-52 rounded-xl border border-zinc-700 bg-zinc-900 shadow-xl z-20 overflow-hidden">
                    {(Object.entries(sortLabels) as [SortKey, string][]).map(([key, label]) => (
                      <button
                        key={key}
                        onClick={() => { setSortBy(key); setShowSort(false); }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                          sortBy === key ? "bg-red-600 text-white font-semibold" : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
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

        {activeFilterCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-5">
            {selectedBrands.map((b) => (
              <button key={b} onClick={() => toggleBrand(b)} className="flex items-center gap-1.5 rounded-full bg-red-900/30 border border-red-800/50 text-red-300 text-xs px-3 py-1.5 hover:bg-red-900/50 transition-colors">
                {b} <X className="h-3 w-3" />
              </button>
            ))}
            {selectedTypes.map((t) => (
              <button key={t} onClick={() => toggleType(t)} className="flex items-center gap-1.5 rounded-full bg-red-900/30 border border-red-800/50 text-red-300 text-xs px-3 py-1.5 hover:bg-red-900/50 transition-colors">
                {t} <X className="h-3 w-3" />
              </button>
            ))}
            {priceRange && (
              <button onClick={() => setPriceRange(null)} className="flex items-center gap-1.5 rounded-full bg-red-900/30 border border-red-800/50 text-red-300 text-xs px-3 py-1.5 hover:bg-red-900/50 transition-colors">
                {priceRange.label} <X className="h-3 w-3" />
              </button>
            )}
            {minRating && (
              <button onClick={() => setMinRating(null)} className="flex items-center gap-1.5 rounded-full bg-red-900/30 border border-red-800/50 text-red-300 text-xs px-3 py-1.5 hover:bg-red-900/50 transition-colors">
                {minRating}★ &amp; up <X className="h-3 w-3" />
              </button>
            )}
            <button onClick={clearFilters} className="text-xs text-zinc-500 hover:text-white transition-colors underline">
              Clear all
            </button>
          </div>
        )}

        <div className="flex items-center gap-2 rounded-lg border border-emerald-900/50 bg-emerald-950/30 px-4 py-2.5 mb-6 text-sm text-emerald-400">
          <Package className="h-4 w-4 shrink-0" />
          <span>Free shipping on orders over <strong>$75</strong></span>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">

          {/* ── Filter sidebar ────────────────────────────────────────────── */}
          <aside className={`${showFilters ? "block" : "hidden"} lg:block w-full lg:w-60 xl:w-64 shrink-0 space-y-4`}>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
              <h3 className="text-sm font-semibold text-white mb-3">Brand</h3>
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {brands.map((brand) => (
                  <label key={brand} className="flex items-center gap-2.5 cursor-pointer group">
                    <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                      selectedBrands.includes(brand) ? "bg-red-600 border-red-600" : "border-zinc-600 group-hover:border-zinc-400"
                    }`}>
                      {selectedBrands.includes(brand) && <Check className="h-3 w-3 text-white" />}
                    </span>
                    <input type="checkbox" checked={selectedBrands.includes(brand)} onChange={() => toggleBrand(brand)} className="sr-only" />
                    <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
              <h3 className="text-sm font-semibold text-white mb-3">Part Type</h3>
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {partTypes.map((type) => (
                  <label key={type} className="flex items-center gap-2.5 cursor-pointer group">
                    <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                      selectedTypes.includes(type) ? "bg-red-600 border-red-600" : "border-zinc-600 group-hover:border-zinc-400"
                    }`}>
                      {selectedTypes.includes(type) && <Check className="h-3 w-3 text-white" />}
                    </span>
                    <input type="checkbox" checked={selectedTypes.includes(type)} onChange={() => toggleType(type)} className="sr-only" />
                    <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
              <h3 className="text-sm font-semibold text-white mb-3">Price Range</h3>
              <div className="space-y-2">
                {PRICE_RANGES.map((range) => (
                  <label key={range.label} className="flex items-center gap-2.5 cursor-pointer group">
                    <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors ${
                      priceRange?.label === range.label ? "border-red-600" : "border-zinc-600 group-hover:border-zinc-400"
                    }`}>
                      {priceRange?.label === range.label && <span className="h-2 w-2 rounded-full bg-red-600" />}
                    </span>
                    <input type="radio" checked={priceRange?.label === range.label} onChange={() => setPriceRange(priceRange?.label === range.label ? null : range)} className="sr-only" />
                    <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">{range.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
              <h3 className="text-sm font-semibold text-white mb-3">Customer Rating</h3>
              <div className="space-y-2">
                {[4.5, 4, 3].map((r) => (
                  <label key={r} className="flex items-center gap-2.5 cursor-pointer group">
                    <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors ${
                      minRating === r ? "border-red-600" : "border-zinc-600 group-hover:border-zinc-400"
                    }`}>
                      {minRating === r && <span className="h-2 w-2 rounded-full bg-red-600" />}
                    </span>
                    <input type="radio" checked={minRating === r} onChange={() => setMinRating(minRating === r ? null : r)} className="sr-only" />
                    <span className="flex items-center gap-1.5 text-sm text-zinc-300 group-hover:text-white transition-colors">
                      <StarRating rating={r} /> &amp; up
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* ── Parts grid ────────────────────────────────────────────────── */}
          <div className="flex-1 min-w-0">
            {parts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center rounded-xl border border-zinc-800 bg-zinc-900">
                <Package className="h-12 w-12 text-zinc-700 mb-4" />
                <p className="text-white font-semibold mb-2">No parts match your filters</p>
                <button onClick={clearFilters} className="text-sm text-red-400 hover:text-red-300 transition-colors">
                  Clear filters and see all {rawParts.length} parts
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {parts.map((part) => (
                  <div key={part.id} className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden hover:border-zinc-700 hover:shadow-lg hover:shadow-zinc-950/50 transition-all duration-150 flex flex-col">
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
                      <span className="text-xs font-mono text-zinc-500 truncate">SKU {part.sku}</span>
                      <StockBadge part={part} />
                    </div>

                    <div className="p-4 flex-1 flex flex-col">
                      <Link href={`/part/${part.id}`} className="text-sm font-semibold text-white hover:text-red-400 leading-snug line-clamp-2 transition-colors mb-0.5">
                        {part.name}
                      </Link>
                      <p className="text-xs text-zinc-500 mb-1">{part.brand}</p>
                      <p className="text-[11px] text-zinc-600 font-mono mb-3">OEM {part.oemNumber}</p>

                      <div className="flex items-center gap-2 mb-2">
                        <StarRating rating={part.rating} />
                        <span className="text-[11px] text-zinc-500">{part.rating} ({part.reviews.toLocaleString()})</span>
                      </div>
                      <p className="text-[11px] text-zinc-500 mb-2">{shippingEstimate(part)}</p>
                      <div className="mb-3">
                        <span className="inline-flex items-center gap-1 rounded-full border border-red-500/30 bg-red-600/10 px-2 py-0.5 text-[10px] font-semibold text-red-400">
                          <Car className="h-3 w-3" />
                          Fits {part.fitment.length} vehicle{part.fitment.length === 1 ? "" : "s"}
                        </span>
                      </div>

                      <div className="mt-auto flex items-end justify-between gap-3">
                        <div>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-xl font-bold text-white">${part.price.toFixed(2)}</span>
                            <span className="text-xs text-zinc-600 line-through">${part.was.toFixed(2)}</span>
                          </div>
                          <span className="inline-block text-[10px] font-bold text-emerald-400 mt-0.5">Save {savings(part)}%</span>
                        </div>

                        <button
                          onClick={() => handleAdd(part)}
                          disabled={!part.inStock}
                          className={`flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-xs font-semibold transition-colors shrink-0 ${
                            addedId === part.id ? "bg-emerald-600 text-white" : part.inStock ? "bg-red-600 hover:bg-red-500 active:bg-red-700 text-white" : "bg-zinc-700 text-zinc-500 cursor-not-allowed"
                          }`}
                        >
                          {addedId === part.id ? "Added!" : (<><ShoppingCart className="h-3.5 w-3.5" /><span className="hidden sm:inline">Add to Cart</span><span className="sm:hidden">Add</span></>)}
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
