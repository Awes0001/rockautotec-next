"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useCart } from "@/components/cart-context";
import { useState, Suspense } from "react";

function PartDetail() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const part = decodeURIComponent(searchParams.get("part") ?? "");
  const year = searchParams.get("year") ?? "";
  const make = searchParams.get("make") ?? "";
  const model = searchParams.get("model") ?? "";
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    addToCart({ part, year, make, model, price: 49.99 });
    setAdded(true);
    setTimeout(() => {
      router.push("/cart");
    }, 1000);
  }

  if (!part) {
    return (
      <main className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-white">Part not found.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-950 px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <p className="text-gray-400 text-sm mb-1">{year} {make} {model}</p>
        <h1 className="text-3xl font-bold text-white mb-6">{part}</h1>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-gray-800 rounded-xl p-4 text-4xl">🔧</div>
            <div>
              <h2 className="text-white text-xl font-semibold">{part}</h2>
              <p className="text-gray-400 text-sm">OEM Compatible Part</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800 rounded-xl p-4">
              <p className="text-gray-400 text-xs mb-1">Fits Vehicle</p>
              <p className="text-white font-medium">{year} {make} {model}</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-4">
              <p className="text-gray-400 text-xs mb-1">Availability</p>
              <p className="text-green-400 font-medium">✅ In Stock</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-4">
              <p className="text-gray-400 text-xs mb-1">Condition</p>
              <p className="text-white font-medium">Brand New</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-4">
              <p className="text-gray-400 text-xs mb-1">Warranty</p>
              <p className="text-white font-medium">1 Year</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex items-center justify-between mb-6">
          <div>
            <p className="text-gray-400 text-xs mb-1">Price</p>
            <p className="text-3xl font-bold text-white">$49.99</p>
          </div>
          <button
            onClick={handleAddToCart}
            className={`font-semibold px-8 py-3 rounded-xl transition-all duration-200 ${
              added
                ? "bg-green-600 text-white"
                : "bg-red-600 hover:bg-red-700 text-white"
            }`}
          >
            {added ? "✅ Added!" : "🛒 Add to Cart"}
          </button>
        </div>
        <Link
          href={`/parts?year=${year}&make=${make}&model=${model}`}
          className="text-gray-400 hover:text-white text-sm transition-colors"
        >
          ← Back to Categories
        </Link>
      </div>
    </main>
  );
}

export default function PartPage() {
  return (
    <Suspense>
      <PartDetail />
    </Suspense>
  );
}