"use client";

import { Suspense } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ShoppingCart, Star, Shield, Truck, RotateCcw, Phone,
  ChevronRight, ArrowLeft, Check, Package, Wrench, CheckCircle, Hash,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/components/cart-context";
import {
  getProductById, getRelatedProducts, CATEGORY_SLUGS, CATEGORY_ICON_NAMES,
  isLowStock, lowStockCount, shippingEstimate, type Product,
} from "@/lib/catalog";
import PartIcon from "@/components/part-icon";

const RECENTLY_VIEWED_KEY = "rockautotec_recently_viewed";

function trackRecentlyViewed(id: number) {
  try {
    const raw = localStorage.getItem(RECENTLY_VIEWED_KEY);
    const ids: number[] = raw ? JSON.parse(raw) : [];
    const next = [id, ...ids.filter((x) => x !== id)].slice(0, 8);
    localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(next));
  } catch {
    // localStorage unavailable — skip silently
  }
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`h-4 w-4 ${s <= Math.round(rating) ? "fill-yellow-400 text-yellow-400" : "text-zinc-700"}`}
        />
      ))}
    </div>
  );
}

function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);

  const partId = parseInt(id ?? "0", 10);
  const product = getProductById(partId);

  const vehicleYear  = searchParams.get("year")  ?? "";
  const vehicleMake  = searchParams.get("make")  ?? "";
  const vehicleModel = searchParams.get("model") ?? "";
  const hasVehicleContext = Boolean(vehicleYear && vehicleMake && vehicleModel);

  useEffect(() => {
    if (partId) trackRecentlyViewed(partId);
  }, [partId]);

  if (!product) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center px-4 text-center">
        <Package className="h-16 w-16 text-zinc-700 mb-6" />
        <h1 className="text-2xl font-bold text-white mb-2">Part Not Found</h1>
        <p className="text-zinc-400 text-sm mb-8">
          We couldn&apos;t find a part with ID #{id}. It may have been removed or the link is incorrect.
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

  const savings = Math.round(((product.was - product.price) / product.was) * 100);
  const categorySlug = CATEGORY_SLUGS[product.category];
  const related = getRelatedProducts(product, 4);

  function handleAddToCart() {
    for (let i = 0; i < qty; i++) {
      addToCart({ part: product!.name, year: vehicleYear, make: vehicleMake, model: vehicleModel, price: product!.price });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-zinc-500 mb-6 flex-wrap">
          <Link href="/" className="hover:text-red-400 transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <Link href="/parts" className="hover:text-red-400 transition-colors">Parts</Link>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <Link href={`/category/${categorySlug}`} className="hover:text-red-400 transition-colors">
            {product.category}
          </Link>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <span className="text-zinc-300 truncate max-w-[200px]">{product.name}</span>
        </nav>

        {/* Vehicle fitment confirmation */}
        {hasVehicleContext && (
          <div className="mb-6 flex items-center gap-2.5 rounded-lg border border-emerald-800/50 bg-emerald-950/30 px-4 py-3 text-sm">
            <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
            <span className="text-emerald-300">
              Fits your <strong className="text-white">{vehicleYear} {vehicleMake} {vehicleModel}</strong>
            </span>
          </div>
        )}

        {/* Main Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-14">
          {/* Left — Image */}
          <div className="space-y-3">
            <div className="relative rounded-2xl overflow-hidden border border-zinc-800 aspect-[4/3]">
              <PartIcon
                category={product.category}
                iconName={CATEGORY_ICON_NAMES[product.category]}
                className="w-full h-full"
                iconClassName="h-24 w-24"
              />
              {savings > 0 && (
                <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                  SAVE {savings}%
                </span>
              )}
              {!product.inStock ? (
                <span className="absolute top-4 right-4 bg-zinc-600 text-zinc-200 text-xs font-semibold px-2.5 py-1 rounded-lg">
                  Out of Stock
                </span>
              ) : isLowStock(product) ? (
                <span className="absolute top-4 right-4 bg-amber-600/90 text-white text-xs font-semibold px-2.5 py-1 rounded-lg">
                  Only {lowStockCount(product)} left
                </span>
              ) : (
                <span className="absolute top-4 right-4 bg-emerald-600/90 text-white text-xs font-semibold px-2.5 py-1 rounded-lg">
                  In Stock
                </span>
              )}
            </div>

            {/* Trust badges row */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: Truck,      label: "Free Shipping",  sub: "Orders $75+" },
                { icon: RotateCcw,  label: "30-Day Returns", sub: "Easy process" },
                { icon: Shield,     label: "Fitment Verified", sub: "OEM/aftermarket" },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex flex-col items-center text-center rounded-xl border border-zinc-800 bg-zinc-900 p-3 gap-1">
                  <Icon className="h-4 w-4 text-red-500 mb-0.5" />
                  <span className="text-xs font-semibold text-white">{label}</span>
                  <span className="text-[10px] text-zinc-500">{sub}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Product Info */}
          <div className="space-y-5">
            <div>
              <p className="text-xs font-semibold text-red-400 uppercase tracking-widest mb-1.5">{product.category} · {product.partType}</p>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-2">{product.name}</h1>
              <p className="text-sm text-zinc-400">Brand: <span className="text-zinc-200 font-medium">{product.brand}</span></p>
              <p className="text-xs text-zinc-500 mt-0.5">Manufacturer: {product.manufacturer}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <div className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5">
                  <Hash className="h-3.5 w-3.5 text-red-400 shrink-0" />
                  <span className="text-xs text-zinc-400">SKU:</span>
                  <span className="text-xs text-white font-mono font-bold">{product.sku}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5">
                  <Hash className="h-3.5 w-3.5 text-red-400 shrink-0" />
                  <span className="text-xs text-zinc-400">OEM #:</span>
                  <span className="text-xs text-white font-mono font-bold">{product.oemNumber}</span>
                </div>
              </div>
              <p className="text-xs text-zinc-500 mt-2">
                Interchange #: <span className="font-mono text-zinc-400">{product.interchangeNumbers.join(", ")}</span>
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <StarRow rating={product.rating} />
              <span className="text-sm font-semibold text-white">{product.rating.toFixed(1)}</span>
              <span className="text-sm text-zinc-400">({product.reviews.toLocaleString()} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-end gap-3 pt-1">
              <span className="text-4xl font-extrabold text-white">${product.price.toFixed(2)}</span>
              <div className="pb-1">
                <span className="text-sm text-zinc-500 line-through">${product.was.toFixed(2)}</span>
                <p className="text-xs text-emerald-400 font-semibold">
                  You save ${(product.was - product.price).toFixed(2)} ({savings}%)
                </p>
              </div>
            </div>

            <p className="text-sm text-zinc-400">{shippingEstimate(product)}</p>

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-3 pt-1">
              <div className="flex items-center rounded-lg border border-zinc-700 bg-zinc-800 overflow-hidden">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-3 py-2.5 text-zinc-300 hover:bg-zinc-700 transition-colors font-bold text-lg leading-none"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="px-4 py-2.5 text-white font-semibold min-w-[2.5rem] text-center">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="px-3 py-2.5 text-zinc-300 hover:bg-zinc-700 transition-colors font-bold text-lg leading-none"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-red-600 hover:bg-red-500 active:bg-red-700 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white font-bold px-6 py-3 transition-colors"
              >
                {added ? (
                  <>
                    <Check className="h-4 w-4" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </>
                )}
              </button>
            </div>

            {/* Shipping / Returns info */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 space-y-2.5">
              <div className="flex items-start gap-3">
                <Truck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-white">Free Shipping on orders $75+</p>
                  <p className="text-xs text-zinc-400">{shippingEstimate(product)} · Expedited available at checkout</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RotateCcw className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-white">30-Day Returns</p>
                  <p className="text-xs text-zinc-400">Unused, in original packaging · <Link href="/returns" className="text-red-400 hover:text-red-300">Return policy</Link></p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-white">Expert Fitment Support</p>
                  <p className="text-xs text-zinc-400">Call 1-800-762-5832 · Mon–Sat 7am–9pm CT</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs: Description · Specifications · Fitment · Warranty */}
        <ProductTabs product={product} />

        {/* Related Products */}
        {related.length > 0 && (
          <section className="mt-14">
            <div className="flex items-end justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white">Related Parts</h2>
              <Link
                href={`/category/${categorySlug}`}
                className="text-sm text-red-400 hover:text-red-300 font-semibold flex items-center gap-1"
              >
                View All <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((p) => (
                <RelatedCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function ProductTabs({ product }: { product: Product }) {
  const [tab, setTab] = useState<"description" | "specs" | "fitment" | "warranty">("description");

  const tabs = [
    { id: "description", label: "Description" },
    { id: "specs",       label: "Specifications" },
    { id: "fitment",     label: "Vehicle Fitment" },
    { id: "warranty",    label: "Warranty" },
  ] as const;

  const SPECS: { label: string; value: string }[] = [
    { label: "SKU",            value: product.sku },
    { label: "OEM Number",     value: product.oemNumber },
    { label: "Interchange #s", value: product.interchangeNumbers.join(", ") },
    { label: "Brand",          value: product.brand },
    { label: "Manufacturer",   value: product.manufacturer },
    { label: "Category",       value: product.category },
    { label: "Part Type",      value: product.partType },
    { label: "Condition",      value: "New" },
    { label: "Warranty",       value: "12 months / 12,000 miles" },
  ];

  return (
    <div className="border border-zinc-800 rounded-2xl overflow-hidden">
      {/* Tab bar */}
      <div className="flex overflow-x-auto border-b border-zinc-800 bg-zinc-900">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 min-w-[120px] px-4 py-3.5 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 ${
              tab === t.id
                ? "border-red-500 text-red-400 bg-zinc-800/50"
                : "border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/30"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="bg-zinc-900 p-6 sm:p-8">
        {tab === "description" && (
          <div className="space-y-4 max-w-3xl">
            <p className="text-zinc-300 leading-relaxed">
              The <strong className="text-white">{product.name}</strong> is manufactured by{" "}
              <strong className="text-white">{product.manufacturer}</strong> and engineered to meet or exceed
              original equipment manufacturer (OEM) specifications for the {product.partType.toLowerCase()} category.
            </p>
            <p className="text-zinc-300 leading-relaxed">
              Cross-referenced under OEM number <span className="font-mono text-zinc-200">{product.oemNumber}</span>{" "}
              and interchange numbers <span className="font-mono text-zinc-200">{product.interchangeNumbers.join(", ")}</span>.
              Confirmed compatible with {product.fitment.length} vehicle configuration{product.fitment.length === 1 ? "" : "s"} —
              see the Vehicle Fitment tab for the full compatibility table.
            </p>
            <ul className="space-y-2 text-sm text-zinc-300">
              {[
                "Direct OEM replacement — no modifications required",
                "Precision-manufactured to OEM tolerances",
                "Tested for quality, performance, and fit before shipment",
                "Includes all necessary hardware for installation",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {tab === "specs" && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-zinc-800">
                {SPECS.map(({ label, value }) => (
                  <tr key={label} className="hover:bg-zinc-800/40 transition-colors">
                    <td className="py-3 pr-6 text-zinc-400 font-medium w-1/3 whitespace-nowrap">{label}</td>
                    <td className="py-3 text-zinc-200 font-mono">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "fitment" && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-zinc-400 mb-4">
              <Wrench className="h-4 w-4 text-red-500" />
              Confirmed fitment for this exact part — verified against our vehicle compatibility database.
            </div>
            <div className="overflow-x-auto rounded-xl border border-zinc-800">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-zinc-800 text-left">
                    {["Year Range", "Make", "Model", "Engine"].map((h) => (
                      <th key={h} className="py-2.5 px-4 text-xs font-bold text-zinc-400 uppercase tracking-wider whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {product.fitment.map((v, i) => (
                    <tr key={i} className="hover:bg-zinc-800/40 transition-colors">
                      <td className="py-3 px-4 text-zinc-200 font-medium whitespace-nowrap">{v.yearStart}–{v.yearEnd}</td>
                      <td className="py-3 px-4 text-zinc-200">{v.make}</td>
                      <td className="py-3 px-4 text-zinc-200">{v.model}</td>
                      <td className="py-3 px-4 text-zinc-400 font-mono text-xs">{v.engine}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-zinc-500">
              Don&apos;t see your exact vehicle?{" "}
              <Link href="/fitment" className="text-red-400 hover:text-red-300 underline underline-offset-2">
                Use our fitment verification tool
              </Link>{" "}
              or call <span className="text-zinc-300">1-800-762-5832</span>.
            </p>
          </div>
        )}

        {tab === "warranty" && (
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-start gap-4 rounded-xl bg-zinc-800 border border-zinc-700 p-5">
              <Shield className="h-8 w-8 text-red-500 shrink-0" />
              <div>
                <h3 className="text-base font-bold text-white mb-1">12-Month / 12,000-Mile Warranty</h3>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  This part is covered by a <strong>1-year / 12,000-mile limited warranty</strong> against defects in materials
                  and workmanship from {product.manufacturer}. Coverage begins on the date of purchase.
                </p>
              </div>
            </div>
            <ul className="space-y-3 text-sm text-zinc-300">
              {[
                "Covers manufacturing defects and premature failure under normal use",
                "Does not cover damage from improper installation, misuse, or accidents",
                "Warranty claim requires original proof of purchase",
                "Replacement part or full refund at RockAutoTec's discretion",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/warranty" className="inline-flex items-center gap-1.5 text-sm text-red-400 hover:text-red-300 font-semibold">
              Full Warranty Policy <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function RelatedCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const savings = Math.round(((product.was - product.price) / product.was) * 100);

  return (
    <Link
      href={`/part/${product.id}`}
      className="group flex flex-col rounded-xl border border-zinc-800 bg-zinc-900 hover:border-red-600/50 hover:bg-zinc-800/80 transition-all duration-200 overflow-hidden"
    >
      <PartIcon
        category={product.category}
        iconName={CATEGORY_ICON_NAMES[product.category]}
        className="aspect-[4/3]"
        iconClassName="h-9 w-9 group-hover:scale-110 transition-transform duration-200"
      />
      <div className="flex flex-col flex-1 p-4 gap-2">
        <p className="text-xs text-zinc-500">{product.brand}</p>
        <h3 className="text-sm font-semibold text-zinc-100 group-hover:text-white leading-snug line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center gap-1.5 mt-auto pt-1">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs text-zinc-400">{product.rating} ({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-base font-bold text-white">${product.price.toFixed(2)}</span>
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart({ part: product.name, year: "", make: "", model: "", price: product.price });
              setAdded(true);
              setTimeout(() => setAdded(false), 1500);
            }}
            className="text-xs font-semibold bg-red-600 hover:bg-red-500 text-white px-2.5 py-1.5 rounded-lg transition-colors"
          >
            {added ? "Added!" : "+ Cart"}
          </button>
        </div>
        {savings > 0 && (
          <span className="text-[10px] font-bold text-emerald-400">Save {savings}%</span>
        )}
      </div>
    </Link>
  );
}

export default function PartDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
          <div className="animate-pulse text-zinc-500">Loading part details…</div>
        </div>
      }
    >
      <ProductPage />
    </Suspense>
  );
}
