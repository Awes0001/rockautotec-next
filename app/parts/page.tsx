import Link from "next/link";
import { ChevronRight, Search } from "lucide-react";
import { CATALOG, CATEGORY_IMAGES, CATEGORY_ICONS, CATEGORY_SLUGS } from "@/components/parts-list";

interface Props {
  searchParams: Promise<{ year?: string; make?: string; model?: string }>;
}

const TOTAL_PARTS = Object.values(CATALOG).flat().length;

export default async function PartsPage({ searchParams }: Props) {
  const { year, make, model } = await searchParams;
  const hasVehicle = Boolean(year && make && model);

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ── Header ────────────────────────────────────────────────────── */}
        <div className="mb-8">
          {hasVehicle ? (
            <>
              <p className="text-sm text-zinc-500 mb-1.5">Parts for your vehicle</p>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                {year} {make} {model}
              </h1>
              <p className="text-zinc-400 text-sm mt-1.5">
                Select a category below to find compatible parts
              </p>
            </>
          ) : (
            <>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Shop All Categories
              </h1>
              <p className="text-zinc-400 text-sm mt-1.5">
                Browse our full catalog of {TOTAL_PARTS.toLocaleString()}+ quality auto parts
              </p>
            </>
          )}
        </div>

        {/* ── Search shortcut ───────────────────────────────────────────── */}
        <Link
          href="/search"
          className="flex items-center gap-3 rounded-xl border border-zinc-700 bg-zinc-900 hover:border-zinc-600 px-4 py-3.5 mb-8 transition-colors group"
        >
          <Search className="h-4 w-4 text-zinc-500 group-hover:text-red-400 transition-colors shrink-0" />
          <span className="text-sm text-zinc-500 group-hover:text-zinc-300 transition-colors">
            Search for a specific part, brand, or SKU…
          </span>
          <span className="ml-auto text-xs text-zinc-600 shrink-0">Search →</span>
        </Link>

        {/* ── Category grid ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {Object.entries(CATALOG).map(([name, parts]) => {
            const slug = CATEGORY_SLUGS[name] ?? "engine";
            const params = hasVehicle
              ? `?year=${year}&make=${make}&model=${model}`
              : "";
            const href = `/category/${slug}${params}`;

            return (
              <Link
                key={name}
                href={href}
                className="group relative rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden hover:border-red-600/50 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-950/30"
              >
                {/* Image */}
                <div className="relative h-24 sm:h-28 bg-zinc-800 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={CATEGORY_IMAGES[name]}
                    alt={name}
                    className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />
                  <span className="absolute top-2 right-2 text-xl sm:text-2xl">
                    {CATEGORY_ICONS[name] ?? "🔧"}
                  </span>
                </div>

                {/* Label */}
                <div className="p-3 pr-7">
                  <p className="text-xs sm:text-sm font-semibold text-white group-hover:text-red-400 transition-colors leading-tight">
                    {name}
                  </p>
                  <p className="text-[11px] text-zinc-500 mt-0.5">{parts.length} parts</p>
                </div>

                <ChevronRight className="absolute right-2.5 bottom-3.5 h-3.5 w-3.5 text-zinc-700 group-hover:text-red-500 transition-colors" />
              </Link>
            );
          })}
        </div>

        {hasVehicle && (
          <div className="mt-8 pt-6 border-t border-zinc-800">
            <Link
              href="/"
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              ← Change Vehicle
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
