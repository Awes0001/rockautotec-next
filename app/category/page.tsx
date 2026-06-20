"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, Star, ShoppingCart, Package } from "lucide-react";
import { CATALOG, Part } from "@/components/parts-list";
import { useCart } from "@/components/cart-context";

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

function CategoryContent() {
  const searchParams = useSearchParams();
  const { addToCart }  = useCart();

  const name  = searchParams.get("name")  ?? "";
  const year  = searchParams.get("year")  ?? "";
  const make  = searchParams.get("make")  ?? "";
  const model = searchParams.get("model") ?? "";

  const [addedId, setAddedId] = useState<number | null>(null);

  const parts: Part[] = CATALOG[name] ?? [];
  const backHref = year
    ? `/parts?year=${year}&make=${make}&model=${model}`
    : "/parts";

  function handleAdd(part: Part) {
    addToCart({ part: part.name, year, make, model, price: part.price });
    setAddedId(part.id);
    setTimeout(() => setAddedId(null), 1500);
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Back */}
        <Link
          href={backHref}
          className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Categories
        </Link>

        {/* Header */}
        <div className="mb-8">
          {year && (
            <p className="text-sm text-zinc-500 mb-1">{year} {make} {model}</p>
          )}
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            {name || "Category"}
          </h1>
          <p className="text-zinc-400 text-sm mt-1">{parts.length} parts available</p>
        </div>

        {parts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center rounded-xl border border-zinc-800 bg-zinc-900">
            <Package className="h-12 w-12 text-zinc-700 mb-4" />
            <p className="text-white font-semibold mb-2">Category not found</p>
            <Link href="/parts" className="text-sm text-red-400 hover:text-red-300 transition-colors">
              Browse all categories
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {parts.map((part) => (
              <div
                key={part.id}
                className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden hover:border-zinc-700 transition-colors flex flex-col"
              >
                {/* SKU row */}
                <div className="flex items-center justify-between gap-2 px-4 py-2.5 border-b border-zinc-800 bg-zinc-950/60">
                  <span className="text-xs font-mono text-zinc-500">{part.sku}</span>
                  <span className={`text-[10px] font-semibold ${part.inStock ? "text-emerald-500" : "text-red-500"}`}>
                    {part.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>

                {/* Body */}
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-800 border border-zinc-700 text-lg">
                      🔧
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white leading-snug line-clamp-2">
                        {part.name}
                      </p>
                      <p className="text-xs text-zinc-500 mt-0.5">{part.brand}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <StarRating rating={part.rating} />
                    <span className="text-[11px] text-zinc-500">
                      {part.rating} ({part.reviews.toLocaleString()})
                    </span>
                  </div>

                  <div className="mt-auto flex items-end justify-between gap-2">
                    <div>
                      <p className="text-lg font-bold text-white">${part.price.toFixed(2)}</p>
                      <p className="text-xs text-zinc-600 line-through">${part.was.toFixed(2)}</p>
                    </div>
                    <button
                      onClick={() => handleAdd(part)}
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
                          Add to Cart
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
  );
}

export default function CategoryPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
          <div className="animate-spin h-8 w-8 border-2 border-red-600 border-t-transparent rounded-full" />
        </div>
      }
    >
      <CategoryContent />
    </Suspense>
  );
}
