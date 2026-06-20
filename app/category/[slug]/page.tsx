"use client";

import { useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Star, ShoppingCart, Package, SlidersHorizontal, ChevronDown } from "lucide-react";
import { CATALOG, SLUG_TO_CATEGORY, CATEGORY_IMAGES, CATEGORY_ICONS, Part } from "@/components/parts-list";
import { useCart } from "@/components/cart-context";

type SortKey = "default" | "price-asc" | "price-desc" | "rating" | "reviews";

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

export default function CategorySlugPage() {
  const { slug }       = useParams<{ slug: string }>();
  const searchParams   = useSearchParams();
  const { addToCart }  = useCart();

  const year  = searchParams.get("year")  ?? "";
  const make  = searchParams.get("make")  ?? "";
  const model = searchParams.get("model") ?? "";

  const [sortBy,   setSortBy]   = useState<SortKey>("default");
  const [addedId,  setAddedId]  = useState<number | null>(null);
  const [showSort, setShowSort] = useState(false);

  const categoryName = SLUG_TO_CATEGORY[slug ?? ""] ?? "";
  const rawParts: Part[] = CATALOG[categoryName] ?? [];

  const parts = [...rawParts].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":  return a.price - b.price;
      case "price-desc": return b.price - a.price;
      case "rating":     return b.rating - a.rating;
      case "reviews":    return b.reviews - a.reviews;
      default:           return 0;
    }
  });

  const hasVehicle = Boolean(year && make && model);
  const backHref   = hasVehicle ? `/parts?year=${year}&make=${make}&model=${model}` : "/parts";

  const sortLabels: Record<SortKey, string> = {
    default:    "Default",
    "price-asc":  "Price: Low to High",
    "price-desc": "Price: High to Low",
    rating:     "Highest Rated",
    reviews:    "Most Reviewed",
  };

  function handleAdd(part: Part) {
    addToCart({ part: part.name, year, make, model, price: part.price });
    setAddedId(part.id);
    setTimeout(() => setAddedId(null), 1500);
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

  const savings = (p: Part) => Math.round(((p.was - p.price) / p.was) * 100);

  return (
    <div className="min-h-screen bg-zinc-950">

      {/* ── Category hero ───────────────────────────────────────────────── */}
      <div className="relative h-36 sm:h-48 bg-zinc-800 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={CATEGORY_IMAGES[categoryName]}
          alt={categoryName}
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/70 to-transparent" />
        <div className="absolute inset-0 flex items-center px-4 sm:px-8 lg:px-12">
          <div>
            <span className="text-3xl sm:text-4xl mb-2 block">{CATEGORY_ICONS[categoryName]}</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {categoryName}
            </h1>
            {hasVehicle && (
              <p className="text-zinc-400 text-sm mt-1">For your {year} {make} {model}</p>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Toolbar ───────────────────────────────────────────────────── */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-4">
            <Link
              href={backHref}
              className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Categories</span>
              <span className="sm:hidden">Back</span>
            </Link>
            <span className="text-zinc-700">|</span>
            <p className="text-sm text-zinc-400">
              <span className="text-white font-semibold">{parts.length}</span> parts
            </p>
          </div>

          {/* Sort dropdown */}
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
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowSort(false)}
                />
                <div className="absolute right-0 top-full mt-1 w-52 rounded-xl border border-zinc-700 bg-zinc-900 shadow-xl z-20 overflow-hidden">
                  {(Object.entries(sortLabels) as [SortKey, string][]).map(([key, label]) => (
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

        {/* ── Free shipping notice ──────────────────────────────────────── */}
        <div className="flex items-center gap-2 rounded-lg border border-emerald-900/50 bg-emerald-950/30 px-4 py-2.5 mb-6 text-sm text-emerald-400">
          <Package className="h-4 w-4 shrink-0" />
          <span>Free shipping on orders over <strong>$75</strong></span>
        </div>

        {/* ── Parts grid ────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {parts.map((part) => (
            <div
              key={part.id}
              className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden hover:border-zinc-700 hover:shadow-lg hover:shadow-zinc-950/50 transition-all duration-150 flex flex-col"
            >
              {/* SKU row */}
              <div className="flex items-center justify-between gap-2 px-4 py-2.5 border-b border-zinc-800 bg-zinc-950/60">
                <span className="text-xs font-mono text-zinc-500 truncate">{part.sku}</span>
                <span
                  className={`text-[10px] font-bold shrink-0 ${
                    part.inStock ? "text-emerald-500" : "text-red-500"
                  }`}
                >
                  {part.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              {/* Body */}
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-800 border border-zinc-700 text-lg select-none">
                    🔧
                  </div>
                  <div className="min-w-0">
                    <Link
                      href={`/part/${part.id}`}
                      className="text-sm font-semibold text-white hover:text-red-400 leading-snug line-clamp-2 transition-colors"
                    >
                      {part.name}
                    </Link>
                    <p className="text-xs text-zinc-500 mt-0.5">{part.brand}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <StarRating rating={part.rating} />
                  <span className="text-[11px] text-zinc-500">
                    {part.rating} ({part.reviews.toLocaleString()})
                  </span>
                </div>

                <div className="mt-auto flex items-end justify-between gap-3">
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl font-bold text-white">
                        ${part.price.toFixed(2)}
                      </span>
                      <span className="text-xs text-zinc-600 line-through">
                        ${part.was.toFixed(2)}
                      </span>
                    </div>
                    <span className="inline-block text-[10px] font-bold text-emerald-400 mt-0.5">
                      Save {savings(part)}%
                    </span>
                  </div>

                  <button
                    onClick={() => handleAdd(part)}
                    disabled={!part.inStock}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-xs font-semibold transition-colors shrink-0 ${
                      addedId === part.id
                        ? "bg-emerald-600 text-white"
                        : part.inStock
                        ? "bg-red-600 hover:bg-red-500 active:bg-red-700 text-white"
                        : "bg-zinc-700 text-zinc-500 cursor-not-allowed"
                    }`}
                  >
                    {addedId === part.id ? (
                      "Added!"
                    ) : (
                      <>
                        <ShoppingCart className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Add to Cart</span>
                        <span className="sm:hidden">Add</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
