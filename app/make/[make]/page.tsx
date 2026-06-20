import Link from "next/link";
import { Car, ChevronRight, ArrowLeft, Search } from "lucide-react";
import { MAKES_BY_SLUG } from "@/lib/makes";

// ── Category quick-links ──────────────────────────────────────────────────────

const SHOP_CATEGORIES = [
  { label: "Engine Parts",          slug: "engine"       },
  { label: "Brake System",          slug: "brakes"       },
  { label: "Suspension & Steering", slug: "suspension"   },
  { label: "Cooling System",        slug: "cooling"      },
  { label: "Electrical & Lighting", slug: "electrical"   },
  { label: "Fuel System",           slug: "fuel"         },
  { label: "Transmission",          slug: "transmission" },
  { label: "Exhaust System",        slug: "exhaust"      },
  { label: "Filters & Maintenance", slug: "filters"      },
  { label: "Body & Exterior",       slug: "body"         },
];

// ── Page ─────────────────────────────────────────────────────────────────────

interface Props {
  params: Promise<{ make: string }>;
}

export default async function MakePage({ params }: Props) {
  const { make: makeSlug } = await params;
  const makeData = MAKES_BY_SLUG[makeSlug];

  // ── 404-style fallback ────────────────────────────────────────────────────
  if (!makeData) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center px-4 text-center">
        <Car className="h-16 w-16 text-zinc-700 mb-6" />
        <h1 className="text-2xl font-bold text-white mb-2">Make Not Found</h1>
        <p className="text-zinc-400 text-sm mb-8 max-w-sm">
          We couldn&apos;t find a make matching &ldquo;{makeSlug}&rdquo;.
          Check the spelling or browse all makes below.
        </p>
        <Link
          href="/parts"
          className="inline-flex items-center gap-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold px-5 py-2.5 text-sm transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Browse All Categories
        </Link>
      </div>
    );
  }

  const makeName = makeData.name;
  const encodedMake = encodeURIComponent(makeName);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-zinc-900 border-b border-zinc-800">
        {/* radial glow */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 60% 50%, #dc2626 0%, transparent 65%)" }}
        />
        {/* grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-zinc-500 mb-6">
            <Link href="/" className="hover:text-red-400 transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/parts" className="hover:text-red-400 transition-colors">Makes</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-zinc-300">{makeName}</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            {/* Make logo / icon */}
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-zinc-700 bg-zinc-800 text-5xl select-none shadow-lg">
              {makeData.logo ?? "🚗"}
            </div>

            <div>
              <p className="text-xs font-semibold text-red-400 uppercase tracking-widest mb-1">
                Shop by Make
              </p>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {makeName}
              </h1>
              <p className="mt-2 text-zinc-400 text-sm sm:text-base">
                Find Parts for Your {makeName} · {makeData.models.length} models ·{" "}
                {makeData.years[makeData.years.length - 1]}–{makeData.years[0]}
              </p>
            </div>
          </div>

          {/* Quick search CTA */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-xl">
            <Link
              href={`/search?make=${encodedMake}`}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-semibold px-5 py-3 text-sm transition-colors"
            >
              <Search className="h-4 w-4" />
              Search All {makeName} Parts
            </Link>
            <Link
              href={`/parts?make=${encodedMake}`}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-600 hover:border-zinc-500 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold px-5 py-3 text-sm transition-colors"
            >
              Browse by Category
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">

        {/* ── Popular Models ─────────────────────────────────────────────── */}
        <section>
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Most Popular {makeName} Models
              </h2>
              <p className="text-sm text-zinc-400 mt-1">
                Top-selling models — click to shop compatible parts
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {makeData.popularModels.map((model) => {
              const encodedModel = encodeURIComponent(model);
              return (
                <Link
                  key={model}
                  href={`/search?make=${encodedMake}&model=${encodedModel}`}
                  className="group relative flex flex-col rounded-xl border border-zinc-800 bg-zinc-900 p-5 hover:border-red-600 hover:bg-zinc-800/80 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-950/40"
                >
                  {/* Popular badge */}
                  <span className="absolute top-3 right-3 text-[10px] font-bold bg-red-600/20 text-red-400 border border-red-600/30 rounded-full px-2 py-0.5">
                    Popular
                  </span>

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600/10 text-red-500 mb-4 group-hover:bg-red-600 group-hover:text-white transition-all duration-200">
                    <Car className="h-6 w-6" />
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-red-400 transition-colors leading-snug">
                    {makeName} {model}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1">
                    {makeData.years[makeData.years.length - 1]}–{makeData.years[0]}
                  </p>

                  <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-red-400 group-hover:text-red-300 transition-colors">
                    Shop Parts
                    <ChevronRight className="h-3.5 w-3.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── All Models ─────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
            All {makeName} Models
          </h2>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900 divide-y divide-zinc-800 overflow-hidden">
            {makeData.models.map((model) => {
              const encodedModel = encodeURIComponent(model);
              return (
                <Link
                  key={model}
                  href={`/search?make=${encodedMake}&model=${encodedModel}`}
                  className="group flex items-center justify-between px-5 py-3.5 hover:bg-zinc-800 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Car className="h-4 w-4 text-zinc-600 group-hover:text-red-500 transition-colors shrink-0" />
                    <span className="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors">
                      {makeName} {model}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="hidden sm:block text-xs text-zinc-600 group-hover:text-zinc-400 transition-colors">
                      {makeData.years[makeData.years.length - 1]}–{makeData.years[0]}
                    </span>
                    <ChevronRight className="h-4 w-4 text-zinc-700 group-hover:text-red-500 transition-colors" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── Shop by Category ───────────────────────────────────────────── */}
        <section>
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Shop {makeName} Parts by Category
            </h2>
            <p className="text-sm text-zinc-400 mt-1">
              Browse OEM-quality parts filtered to fit your {makeName}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {SHOP_CATEGORIES.map(({ label, slug }) => (
              <Link
                key={slug}
                href={`/category/${slug}?make=${encodedMake}`}
                className="group flex flex-col items-center text-center rounded-xl border border-zinc-800 bg-zinc-900 p-4 hover:border-red-600 hover:bg-zinc-800 transition-all duration-200"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 border border-zinc-700 group-hover:bg-red-600 group-hover:border-red-600 transition-all duration-200 mb-2.5">
                  <Search className="h-4 w-4 text-zinc-400 group-hover:text-white transition-colors" />
                </div>
                <p className="text-xs font-semibold text-zinc-200 group-hover:text-white leading-snug transition-colors">
                  {label}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Model Year Selector ────────────────────────────────────────── */}
        <section>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-bold text-white">
                  Shop by Year — {makeName}
                </h2>
                <p className="text-sm text-zinc-400 mt-1">
                  Select a model year to find year-specific parts
                </p>
              </div>
              <Link
                href={`/search?make=${encodedMake}`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-400 hover:text-red-300 transition-colors whitespace-nowrap"
              >
                All Years <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="flex flex-wrap gap-2">
              {makeData.years.map((year) => (
                <Link
                  key={year}
                  href={`/search?make=${encodedMake}&year=${year}`}
                  className="rounded-lg border border-zinc-700 bg-zinc-800 hover:border-red-500 hover:bg-red-600/10 hover:text-red-400 text-zinc-300 text-sm font-medium px-3.5 py-1.5 transition-all duration-150"
                >
                  {year}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Back to all makes ─────────────────────────────────────────── */}
        <div className="pb-4">
          <Link
            href="/parts"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All Categories
          </Link>
        </div>

      </div>
    </div>
  );
}

// Optional: generate static params for all makes at build time
export function generateStaticParams() {
  const { MAKE_SLUGS } = require("@/lib/makes");
  return (MAKE_SLUGS as string[]).map((make: string) => ({ make }));
}
