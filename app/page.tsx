"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Search, Phone, ShoppingCart, Star, Truck, Shield,
  RotateCcw, Headphones, ChevronDown, Check, ArrowRight,
  Settings, Disc, Gauge, Thermometer, Zap, Fuel,
  Package, Car, Wind, Wrench, Clock, Award, Users,
  Lock, CreditCard, Mail, Facebook, Twitter, Instagram, Youtube,
  CheckCircle, ScanLine, Loader2, AlertTriangle, Eye, TrendingUp,
  Tag,
} from "lucide-react";
import { useCart } from "@/components/cart-context";
import {
  ALL_PARTS, CATEGORY_SLUGS, getPartImage, isLowStock, lowStockCount,
  type Part,
} from "@/components/parts-list";

// ── Vehicle data ─────────────────────────────────────────────────────────────

const YEARS = Array.from({ length: 36 }, (_, i) => String(2025 - i));

const MAKES = [
  "Acura", "Audi", "BMW", "Buick", "Cadillac", "Chevrolet",
  "Chrysler", "Dodge", "Ford", "GMC", "Honda", "Hyundai",
  "Infiniti", "Jeep", "Kia", "Lexus", "Lincoln", "Mazda",
  "Mercedes-Benz", "Mitsubishi", "Nissan", "Ram", "Subaru",
  "Tesla", "Toyota", "Volkswagen", "Volvo",
];

const MODELS_BY_MAKE: Record<string, string[]> = {
  Acura:           ["ILX", "Integra", "MDX", "NSX", "RDX", "TLX"],
  Audi:            ["A3", "A4", "A6", "A8", "e-tron", "Q3", "Q5", "Q7", "R8", "TT"],
  BMW:             ["2 Series", "3 Series", "4 Series", "5 Series", "7 Series", "M3", "M5", "X1", "X3", "X5", "X7"],
  Buick:           ["Enclave", "Encore", "Encore GX", "Envision", "Envista", "LaCrosse"],
  Cadillac:        ["CT4", "CT5", "Escalade", "Lyriq", "XT4", "XT5", "XT6"],
  Chevrolet:       ["Blazer", "Camaro", "Colorado", "Corvette", "Equinox", "Malibu", "Silverado 1500", "Suburban", "Tahoe", "Traverse"],
  Chrysler:        ["300", "Pacifica", "Voyager"],
  Dodge:           ["Challenger", "Charger", "Durango", "Hornet", "Journey"],
  Ford:            ["Bronco", "Edge", "Escape", "Expedition", "Explorer", "F-150", "F-250", "Maverick", "Mustang", "Ranger", "Transit"],
  GMC:             ["Acadia", "Canyon", "Sierra 1500", "Terrain", "Yukon"],
  Honda:           ["Accord", "Civic", "CR-V", "HR-V", "Odyssey", "Passport", "Pilot", "Ridgeline"],
  Hyundai:         ["Elantra", "Ioniq 5", "Ioniq 6", "Kona", "Palisade", "Santa Fe", "Sonata", "Tucson", "Venue"],
  Infiniti:        ["Q50", "Q60", "QX50", "QX60", "QX80"],
  Jeep:            ["Cherokee", "Compass", "Gladiator", "Grand Cherokee", "Renegade", "Wagoneer", "Wrangler"],
  Kia:             ["EV6", "Forte", "K5", "Soul", "Sportage", "Stinger", "Telluride"],
  Lexus:           ["ES", "GX", "IS", "LS", "LX", "NX", "RX", "UX"],
  Lincoln:         ["Aviator", "Continental", "Corsair", "Navigator", "Nautilus"],
  Mazda:           ["CX-30", "CX-5", "CX-50", "CX-9", "Mazda3", "Mazda6", "MX-5 Miata"],
  "Mercedes-Benz": ["A-Class", "C-Class", "CLA", "E-Class", "GLA", "GLC", "GLE", "S-Class"],
  Mitsubishi:      ["Eclipse Cross", "Galant", "Mirage", "Outlander", "Outlander Sport"],
  Nissan:          ["Altima", "Armada", "Frontier", "Maxima", "Murano", "Pathfinder", "Rogue", "Sentra", "Titan", "Versa"],
  Ram:             ["1500", "2500", "3500", "ProMaster", "Rampage"],
  Subaru:          ["Ascent", "BRZ", "Crosstrek", "Forester", "Impreza", "Legacy", "Outback", "WRX"],
  Tesla:           ["Cybertruck", "Model 3", "Model S", "Model X", "Model Y"],
  Toyota:          ["4Runner", "Camry", "Corolla", "GR86", "Highlander", "Land Cruiser", "Prius", "RAV4", "Sequoia", "Sienna", "Tacoma", "Tundra"],
  Volkswagen:      ["Arteon", "Atlas", "Golf", "ID.4", "Jetta", "Passat", "Taos", "Tiguan"],
  Volvo:           ["C40", "S60", "S90", "V60", "XC40", "XC60", "XC90"],
};

// ── Categories ───────────────────────────────────────────────────────────────

const CATEGORIES = [
  { name: "Engine Parts",          icon: Settings,    count: "45,200+", href: "/category/engine"       },
  { name: "Brake System",          icon: Disc,        count: "32,800+", href: "/category/brakes"       },
  { name: "Suspension & Steering", icon: Gauge,       count: "28,400+", href: "/category/suspension"   },
  { name: "Cooling System",        icon: Thermometer, count: "18,100+", href: "/category/cooling"      },
  { name: "Electrical & Lighting", icon: Zap,         count: "41,600+", href: "/category/electrical"   },
  { name: "Fuel System",           icon: Fuel,        count: "22,300+", href: "/category/fuel"         },
  { name: "Transmission",          icon: Settings,    count: "15,700+", href: "/category/transmission" },
  { name: "Exhaust System",        icon: Wind,        count: "12,900+", href: "/category/exhaust"      },
  { name: "Filters & Maintenance", icon: Package,     count: "38,500+", href: "/category/filters"      },
  { name: "Body & Exterior",       icon: Car,         count: "55,200+", href: "/category/body"         },
];

// ── Brands ───────────────────────────────────────────────────────────────────

const BRANDS = [
  "Bosch", "Denso", "NGK", "Monroe", "Moog", "Gates", "Dorman",
  "ACDelco", "KYB", "Bilstein", "Raybestos", "Cardone", "Delphi", "Motorcraft",
];

// ── Reviews ───────────────────────────────────────────────────────────────────

const REVIEWS = [
  {
    name: "Mike Torrence", location: "Houston, TX", rating: 5, date: "Dec 14, 2025",
    text: "Found my hard-to-find Jeep Grand Cherokee suspension parts here when three other sites were backordered. Shipped same day, arrived perfectly packaged.",
    product: "Monroe Shock Absorber – Rear Pair",
  },
  {
    name: "Sarah Kowalski", location: "Phoenix, AZ", rating: 5, date: "Jan 8, 2026",
    text: "Best prices I've found online for OEM-quality parts. The vehicle selector saved me time — picked my '22 Camry and only compatible parts showed up.",
    product: "Denso Oxygen Sensor – Universal",
  },
  {
    name: "James Reddick", location: "Chicago, IL", rating: 5, date: "Feb 2, 2026",
    text: "Ordered Bosch brake pads Thursday evening, had them Friday morning. The 30-day return policy gives me complete peace of mind on every order.",
    product: "Bosch QuietCast Brake Pad Set",
  },
  {
    name: "Carlos Medina", location: "Los Angeles, CA", rating: 4, date: "Mar 11, 2026",
    text: "Great selection and competitive prices. Customer support helped me nail the right part number for my BMW in minutes. Will definitely order again.",
    product: "Gates Timing Belt Kit w/ Water Pump",
  },
  {
    name: "Denise Albright", location: "Tampa, FL", rating: 5, date: "Mar 22, 2026",
    text: "Run a 3-bay shop and switched our parts account here last fall. Net-30 terms and the bulk pricing tiers have genuinely saved us money every month.",
    product: "ACDelco Professional Oil Filter (case)",
  },
  {
    name: "Pete Vandermeer", location: "Grand Rapids, MI", rating: 5, date: "Apr 5, 2026",
    text: "Wasn't sure my Silverado's wheel bearing would be in stock but it shipped that afternoon. Install was a breeze with the included hardware.",
    product: "Moog Wheel Bearing & Hub Assembly",
  },
  {
    name: "Aaliyah Brooks", location: "Atlanta, GA", rating: 4, date: "Apr 19, 2026",
    text: "Ordered a radiator for my Accord after a leak. Packaging was solid — no dents on arrival, unlike the last place I ordered from.",
    product: "Dorman OE-Style Radiator Assembly",
  },
  {
    name: "Tom Whitfield", location: "Denver, CO", rating: 5, date: "May 2, 2026",
    text: "The fitment guarantee is real — got the wrong sensor variant on my first order and they shipped the correct one overnight with a prepaid return label.",
    product: "Delphi Mass Air Flow Sensor",
  },
];

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

function StockTag({ part }: { part: Part }) {
  if (!part.inStock) {
    return <span className="text-xs font-semibold text-red-500">Out of Stock</span>;
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

function ProductCard({ part, onView }: { part: Part; onView?: (id: number) => void }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const discount = Math.round((1 - part.price / part.was) * 100);

  return (
    <div className="flex flex-col rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden hover:border-red-600/60 hover:shadow-xl hover:shadow-red-950/30 transition-all duration-200 group">
      <Link href={`/part/${part.id}`} onClick={() => onView?.(part.id)} className="relative h-40 sm:h-44 overflow-hidden block bg-zinc-800">
        <img
          src={getPartImage(part)}
          alt={part.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded shadow">
            SAVE {discount}%
          </span>
        )}
      </Link>

      <div className="flex flex-col flex-1 p-4">
        <p className="text-[11px] text-zinc-500 mb-1 uppercase tracking-wide font-semibold">
          {part.brand} · <span className="font-mono text-zinc-400">{part.sku}</span>
        </p>
        <Link
          href={`/part/${part.id}`}
          onClick={() => onView?.(part.id)}
          className="text-sm font-semibold text-white leading-snug mb-2 hover:text-red-400 transition-colors line-clamp-2"
        >
          {part.name}
        </Link>
        <div className="flex items-center gap-2 mb-2">
          <Stars rating={part.rating} />
          <span className="text-xs text-zinc-400">
            {part.rating.toFixed(1)} ({part.reviews.toLocaleString()})
          </span>
        </div>

        <div className="mt-auto">
          <div className="flex items-baseline gap-2 mb-1.5">
            <span className="text-lg font-bold text-white">${part.price.toFixed(2)}</span>
            {discount > 0 && (
              <span className="text-sm text-zinc-500 line-through">${part.was.toFixed(2)}</span>
            )}
          </div>
          <div className="mb-3"><StockTag part={part} /></div>

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
                  ? "bg-red-600 hover:bg-red-500 active:bg-red-700 text-white"
                  : "bg-zinc-700 text-zinc-500 cursor-not-allowed"
              }`}
            >
              {added ? <Check className="h-3.5 w-3.5" /> : <ShoppingCart className="h-3.5 w-3.5" />}
              {added ? "Added!" : "Add to Cart"}
            </button>
            <Link
              href={`/part/${part.id}`}
              onClick={() => onView?.(part.id)}
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

const RECENTLY_VIEWED_KEY = "rockautotec_recently_viewed";

function pushRecentlyViewed(id: number) {
  try {
    const raw = localStorage.getItem(RECENTLY_VIEWED_KEY);
    const ids: number[] = raw ? JSON.parse(raw) : [];
    const next = [id, ...ids.filter((x) => x !== id)].slice(0, 8);
    localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(next));
  } catch {
    // localStorage unavailable — skip silently
  }
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [year, setYear]   = useState("");
  const [make, setMake]   = useState("");
  const [model, setModel] = useState("");
  const models = make ? (MODELS_BY_MAKE[make] ?? []) : [];

  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<number[]>([]);

  // VIN decoder state
  const [vin, setVin] = useState("");
  const [vinLoading, setVinLoading] = useState(false);
  const [vinResult, setVinResult] = useState<{ year: string; make: string; model: string } | null>(null);
  const [vinError, setVinError] = useState("");

  const sealRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = sealRef.current;
    if (el && !el.querySelector("script")) {
      const s = document.createElement("script");
      s.type = "text/javascript";
      s.src = "https://rapidscansecure.com/siteseal/siteseal.js?code=17,F50AAA385EEF0238AF8EC5D332A2360021087E2A";
      el.appendChild(s);
    }
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(RECENTLY_VIEWED_KEY);
      if (raw) setRecentlyViewedIds(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  const handleSearch = () => {
    if (year && make && model) {
      window.location.href = `/parts?year=${encodeURIComponent(year)}&make=${encodeURIComponent(make)}&model=${encodeURIComponent(model)}`;
    }
  };

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

  // Best sellers: highest review counts
  const bestSellers = useMemo(
    () => [...ALL_PARTS].sort((a, b) => b.reviews - a.reviews).slice(0, 8),
    []
  );

  // Today's deals: biggest discount percentage
  const todaysDeals = useMemo(
    () =>
      [...ALL_PARTS]
        .sort((a, b) => (1 - a.price / a.was) - (1 - b.price / b.was))
        .reverse()
        .slice(0, 8),
    []
  );

  const recentlyViewedParts = useMemo(
    () =>
      recentlyViewedIds
        .map((id) => ALL_PARTS.find((p) => p.id === id))
        .filter((p): p is Part => Boolean(p)),
    [recentlyViewedIds]
  );

  const inventoryParts = useMemo(
    () =>
      activeCategory === "All"
        ? ALL_PARTS
        : ALL_PARTS.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  const categoryNames = useMemo(() => Array.from(new Set(ALL_PARTS.map((p) => p.category))), []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      {/* ── Announcement Bar ──────────────────────────────────────────────── */}
      <div className="bg-red-700 py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-white">
          <span className="flex items-center gap-1.5">
            <Truck className="h-3.5 w-3.5 shrink-0" />
            Free Shipping on Orders $75+
          </span>
          <span className="hidden sm:block text-red-400">|</span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 shrink-0" />
            Same-Day Shipping Before 3PM EST
          </span>
          <span className="hidden sm:block text-red-400">|</span>
          <span className="flex items-center gap-1.5">
            <RotateCcw className="h-3.5 w-3.5 shrink-0" />
            30-Day Returns
          </span>
          <span className="hidden sm:block text-red-400">|</span>
          <span className="flex items-center gap-1.5">
            <Phone className="h-3.5 w-3.5 shrink-0" />
            1-800-762-5832
          </span>
        </div>
      </div>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-zinc-900 border-b border-zinc-800">
        <div
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 70% 50%, #dc2626 0%, transparent 65%)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "48px 48px" }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-600/10 px-4 py-1.5 text-sm text-red-400">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse shrink-0" />
              Serving Mechanics &amp; Drivers Since 2015 · Over 1 Million Parts In Stock
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
              Save Up to 60%{" "}
              <span className="text-red-500">vs. Dealer Prices.</span>
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto">
              OEM-quality auto parts for every make and model. Competitive prices, expert fitment, fast delivery.
            </p>

            {/* Vehicle selector card */}
            <div className="mt-10 mx-auto max-w-3xl">
              <div className="rounded-2xl border border-zinc-700 bg-zinc-800/80 backdrop-blur p-5 shadow-2xl">
                <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-4 text-left">
                  Select Your Vehicle
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Year */}
                  <div className="relative">
                    <select
                      value={year}
                      onChange={(e) => { setYear(e.target.value); setMake(""); setModel(""); }}
                      className="w-full appearance-none rounded-lg border border-zinc-600 bg-zinc-700 text-white px-4 py-3 pr-10 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors cursor-pointer"
                    >
                      <option value="">Select Year</option>
                      {YEARS.map((y) => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
                  </div>

                  {/* Make */}
                  <div className="relative">
                    <select
                      value={make}
                      onChange={(e) => { setMake(e.target.value); setModel(""); }}
                      disabled={!year}
                      className="w-full appearance-none rounded-lg border border-zinc-600 bg-zinc-700 text-white px-4 py-3 pr-10 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <option value="">Select Make</option>
                      {MAKES.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
                  </div>

                  {/* Model */}
                  <div className="relative">
                    <select
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      disabled={!make}
                      className="w-full appearance-none rounded-lg border border-zinc-600 bg-zinc-700 text-white px-4 py-3 pr-10 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <option value="">Select Model</option>
                      {models.map((mdl) => (
                        <option key={mdl} value={mdl}>{mdl}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
                  </div>
                </div>

                <button
                  onClick={handleSearch}
                  disabled={!year || !make || !model}
                  className="mt-3 w-full rounded-lg bg-red-600 hover:bg-red-500 active:bg-red-700 disabled:bg-zinc-700 disabled:text-zinc-500 text-white font-semibold py-3.5 px-6 flex items-center justify-center gap-2 transition-colors text-sm"
                >
                  <Search className="h-4 w-4" />
                  Find Parts for My{" "}
                  {year && make && model
                    ? `${year} ${make} ${model}`
                    : "Vehicle"}
                </button>

                <p className="mt-2.5 text-xs text-zinc-500 text-center">
                  Or{" "}
                  <Link href="/search" className="text-red-400 hover:text-red-300 underline underline-offset-2">
                    search by part number
                  </Link>{" "}
                  or keyword
                </p>
              </div>
            </div>

            {/* Hero stats */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-8 text-sm">
              {[
                { num: "1M+",    label: "Parts In Stock" },
                { num: "48K+",   label: "5-Star Reviews" },
                { num: "60%",    label: "Avg. Savings vs Dealer" },
                { num: "3PM EST", label: "Same-Day Cutoff" },
              ].map(({ num, label }) => (
                <div key={label} className="text-center">
                  <div className="text-xl font-bold text-white">{num}</div>
                  <div className="text-xs text-zinc-500 mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VIN Decoder ───────────────────────────────────────────────────── */}
      <section className="bg-zinc-950 border-b border-zinc-800 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">
            <div className="flex items-start gap-3 mb-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-600/15 text-red-500">
                <ScanLine className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Know Your VIN? Get an Exact Match</h2>
                <p className="text-sm text-zinc-400 mt-0.5">
                  Enter your 17-character Vehicle Identification Number for a precise year/make/model match — powered by the NHTSA vehicle database.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={vin}
                onChange={(e) => setVin(e.target.value.toUpperCase().slice(0, 17))}
                placeholder="e.g. 1HGCM82633A004352"
                maxLength={17}
                className="flex-1 rounded-lg border border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500 px-4 py-3 text-sm font-mono tracking-wider focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
              />
              <button
                onClick={handleVinDecode}
                disabled={vinLoading}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 hover:bg-red-500 active:bg-red-700 disabled:opacity-60 text-white font-semibold px-6 py-3 text-sm transition-colors whitespace-nowrap"
              >
                {vinLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ScanLine className="h-4 w-4" />}
                {vinLoading ? "Decoding…" : "Decode VIN"}
              </button>
            </div>
            <p className="mt-2 text-xs text-zinc-500">{vin.length}/17 characters</p>

            {vinError && (
              <div className="mt-4 flex items-start gap-2 rounded-lg border border-red-800/50 bg-red-950/30 px-4 py-3 text-sm text-red-300">
                <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                {vinError}
              </div>
            )}

            {vinResult && (
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border border-emerald-800/50 bg-emerald-950/30 px-4 py-3.5">
                <div className="flex items-center gap-2 text-sm text-emerald-300">
                  <CheckCircle className="h-4 w-4 shrink-0" />
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
          </div>
        </div>
      </section>

      {/* ── Trust Badges ─────────────────────────────────────────────────── */}
      <section className="bg-zinc-900 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              { icon: Truck,       title: "Free Shipping",      sub: "All orders $75 and over"   },
              { icon: Clock,       title: "Same-Day Shipping",  sub: "Order before 3PM EST"       },
              { icon: RotateCcw,   title: "30-Day Returns",     sub: "Hassle-free, no questions"  },
              { icon: Headphones,  title: "Expert Support",     sub: "Mon–Sat 7am–9pm CT"          },
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

      {/* ── Categories ───────────────────────────────────────────────────── */}
      <section className="bg-zinc-950 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Shop by Category</h2>
              <p className="mt-1 text-sm text-zinc-400">Over 1 million parts across 10 major categories</p>
            </div>
            <Link
              href="/parts"
              className="hidden sm:flex items-center gap-1 text-sm font-medium text-red-400 hover:text-red-300 transition-colors"
            >
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="group flex flex-col items-center text-center rounded-xl border border-zinc-800 bg-zinc-900 p-4 sm:p-5 hover:border-red-600 hover:bg-zinc-800 transition-all duration-200"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600/10 text-red-500 group-hover:bg-red-600 group-hover:text-white transition-all duration-200 mb-3">
                  <cat.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xs sm:text-sm font-semibold text-white leading-tight">{cat.name}</h3>
                <p className="mt-1 text-xs text-zinc-500">{cat.count} parts</p>
              </Link>
            ))}
          </div>

          <div className="mt-6 text-center sm:hidden">
            <Link href="/parts" className="inline-flex items-center gap-1 text-sm font-medium text-red-400">
              View All Categories <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Recently Viewed ────────────────────────────────────────────────── */}
      {recentlyViewedParts.length > 0 && (
        <section className="bg-zinc-900 border-y border-zinc-800 py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-6">
              <Eye className="h-5 w-5 text-red-500" />
              <h2 className="text-xl sm:text-2xl font-bold text-white">Recently Viewed</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {recentlyViewedParts.map((p) => (
                <ProductCard key={p.id} part={p} onView={pushRecentlyViewed} />
              ))}
            </div>
          </div>
        </section>
      )}

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
            {bestSellers.map((p) => (
              <ProductCard key={p.id} part={p} onView={pushRecentlyViewed} />
            ))}
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
            {todaysDeals.map((p) => (
              <ProductCard key={p.id} part={p} onView={pushRecentlyViewed} />
            ))}
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
                {inventoryParts.length} parts shown · {ALL_PARTS.length} total parts across all categories
              </p>
            </div>
          </div>

          {/* Category filter pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setActiveCategory("All")}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                activeCategory === "All"
                  ? "bg-red-600 text-white"
                  : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
              }`}
            >
              All Parts
            </button>
            {categoryNames.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                  activeCategory === cat
                    ? "bg-red-600 text-white"
                    : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {inventoryParts.map((p) => (
              <ProductCard key={p.id} part={p} onView={pushRecentlyViewed} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ─────────────────────────────────────────────────── */}
      <section className="bg-zinc-950 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Why Choose RockAutoTec?</h2>
            <p className="mt-2 text-zinc-400 max-w-xl mx-auto">
              Supplying professional mechanics and serious DIY drivers since 2015
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: Award,
                title: "OEM-Quality Parts",
                desc: "Every part meets or exceeds OEM specifications. We source directly from top-tier manufacturers.",
              },
              {
                icon: Truck,
                title: "Fast & Free Shipping",
                desc: "Free on orders $75+. Most in-stock orders ship the same business day with cutoff at 3pm EST.",
              },
              {
                icon: Users,
                title: "Fitment Guarantee",
                desc: "Our experts verify every order. If it doesn't fit, we pay the return shipping – no questions asked.",
              },
              {
                icon: Lock,
                title: "Secure & Trusted",
                desc: "Shop with confidence using 256-bit SSL encryption. Accepted cards: Visa, MC, Amex, PayPal.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 text-center hover:border-zinc-700 transition-colors"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-red-600/15 text-red-500">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Customer Reviews ──────────────────────────────────────────────── */}
      <section className="bg-zinc-900 border-y border-zinc-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">What Our Customers Say</h2>
            <div className="mt-3 flex items-center justify-center gap-2">
              <Stars rating={5} size="md" />
              <span className="text-zinc-200 text-sm font-semibold">4.8 out of 5</span>
              <span className="text-zinc-500 text-sm">· 48,000+ verified reviews</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {REVIEWS.map((r) => (
              <div
                key={r.name}
                className="rounded-xl border border-zinc-700 bg-zinc-800 p-5 flex flex-col"
              >
                <div className="flex items-center justify-between mb-3">
                  <Stars rating={r.rating} />
                  <span className="text-xs text-zinc-500">{r.date}</span>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed flex-1 mb-4">
                  &ldquo;{r.text}&rdquo;
                </p>
                <div>
                  <p className="text-xs text-zinc-500 mb-2">
                    Purchased:{" "}
                    <span className="text-zinc-400">{r.product}</span>
                  </p>
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-white text-xs font-bold shrink-0">
                      {r.name[0]}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">{r.name}</p>
                      <p className="text-xs text-zinc-500">{r.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Brands ───────────────────────────────────────────────────────── */}
      <section className="bg-zinc-950 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-8">
            Trusted Brands We Carry
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {BRANDS.map((brand) => (
              <Link
                key={brand}
                href={`/search?brand=${encodeURIComponent(brand)}`}
                className="rounded-lg border border-zinc-800 bg-zinc-900 px-5 py-2.5 text-sm font-extrabold tracking-tight text-zinc-300 hover:border-red-600 hover:text-white transition-all duration-150"
              >
                {brand}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-red-700 py-16">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 20% 50%, #7f1d1d 0%, transparent 70%)" }}
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Get 10% Off Your First Order
          </h2>
          <p className="mt-3 text-red-200 text-base sm:text-lg max-w-xl mx-auto">
            Sign up for our newsletter and unlock exclusive deals, early-access sales, and expert maintenance tips.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full rounded-lg border border-red-500 bg-red-800/50 text-white placeholder:text-red-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="w-full sm:w-auto whitespace-nowrap rounded-lg bg-white text-red-700 hover:bg-red-50 active:bg-red-100 font-semibold px-6 py-3 text-sm transition-colors">
              Get My 10% Off
            </button>
          </div>
          <p className="mt-3 text-xs text-red-300">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="bg-zinc-900 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">

            {/* Brand column */}
            <div className="col-span-2 sm:col-span-3 lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Wrench className="h-6 w-6 text-red-500" />
                <span className="text-xl font-extrabold text-white tracking-tight">RockAutoTec</span>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">
                Your trusted source for quality auto parts since 2015. Over 1 million parts for every make and model.
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

            {/* Shop */}
            <div>
              <h4 className="text-xs font-semibold text-white uppercase tracking-widest mb-4">Shop</h4>
              <ul className="space-y-2">
                {[
                  ["Engine Parts",    "/category/engine"],
                  ["Brake System",    "/category/brakes"],
                  ["Suspension",      "/category/suspension"],
                  ["Electrical",      "/category/electrical"],
                  ["Fuel System",     "/category/fuel"],
                  ["Transmission",    "/category/transmission"],
                  ["Exhaust",         "/category/exhaust"],
                  ["Body Parts",      "/category/body"],
                  ["Filters",         "/category/filters"],
                  ["All Categories",  "/parts"],
                ].map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="text-sm text-zinc-400 hover:text-red-400 transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Account */}
            <div>
              <h4 className="text-xs font-semibold text-white uppercase tracking-widest mb-4">Account</h4>
              <ul className="space-y-2">
                {[
                  ["Sign In",        "/login"],
                  ["Create Account", "/login"],
                  ["Order History",  "/orders"],
                  ["Track My Order", "/orders"],
                  ["My Garage",      "/profile"],
                  ["Saved Parts",    "/profile"],
                  ["Returns",        "/returns"],
                  ["Wish List",      "/profile"],
                ].map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="text-sm text-zinc-400 hover:text-red-400 transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help */}
            <div>
              <h4 className="text-xs font-semibold text-white uppercase tracking-widest mb-4">Help & Info</h4>
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

        {/* ── Compliance Certification Bar ─────────────────────────────── */}
        <div className="border-t border-zinc-800 bg-zinc-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap items-center justify-between gap-4">

              {/* Badge cards */}
              <div className="flex flex-wrap items-center gap-2.5">
                {/* PCI DSS */}
                <div className="flex items-center gap-2.5 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 shadow-sm">
                  <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-white leading-none tracking-tight">PCI DSS 4.0.1 Compliant</p>
                    <p className="text-[10px] text-zinc-500 mt-0.5 font-mono">Merchant #565500001190152</p>
                  </div>
                </div>

                {/* Authorize.Net */}
                <div className="flex items-center gap-2.5 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 shadow-sm">
                  <Shield className="h-4 w-4 text-blue-400 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-white leading-none tracking-tight">Authorize.Net Secured</p>
                    <p className="text-[10px] text-zinc-500 mt-0.5">PCI Validated Payment Processing</p>
                  </div>
                </div>

                {/* SSL */}
                <div className="flex items-center gap-2.5 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 shadow-sm">
                  <Lock className="h-4 w-4 text-emerald-400 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-white leading-none tracking-tight">256-bit SSL Encrypted</p>
                    <p className="text-[10px] text-zinc-500 mt-0.5">Secure Checkout</p>
                  </div>
                </div>

                {/* Valid Until */}
                <div className="flex items-center gap-2.5 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 shadow-sm">
                  <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-white leading-none tracking-tight">Valid Until June 2027</p>
                    <p className="text-[10px] text-zinc-500 mt-0.5">Annual Compliance Verified</p>
                  </div>
                </div>
              </div>

              {/* RapidScan site seal — script is appended via useEffect */}
              <div ref={sealRef} className="seal shrink-0 min-h-[40px] min-w-[40px]" />

            </div>
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
                ["Cookie Policy",   "/privacy"],
                ["Accessibility",   "/contact"],
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
