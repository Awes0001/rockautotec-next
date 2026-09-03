import BrandLogo from "@/components/brand-logo";

/**
 * Decorative "brands we work with" marquee for the homepage. Distinct from
 * the vehicle-make BrandMarquee (Ford/Toyota/etc.) — this one lists auto
 * parts manufacturers. Several of these (SKF, Mahle, Delphi, Bilstein,
 * Continental, Cardone) aren't in RockAutoTec's current 10-brand catalog
 * (see lib/catalog.ts BRANDS) — they're included here as recognized
 * industry placeholder logos per the request, the same way the functional
 * "Shop by Brand" grid elsewhere on the page only lists brands actually
 * stocked. Reuses the existing BrandLogo emblem component (no licensed
 * artwork) and the same .animate-marquee keyframe as BrandMarquee.
 */
const PARTS_BRANDS = [
  "Bosch", "Denso", "NGK", "ACDelco", "Motorcraft", "KYB", "Monroe",
  "SKF", "Mahle", "Delphi", "Gates", "Bilstein", "Continental", "Cardone",
];

export default function PartsBrandMarquee() {
  const doubled = [...PARTS_BRANDS, ...PARTS_BRANDS];

  return (
    <div className="overflow-hidden border-y border-zinc-800 bg-zinc-900/60 py-6">
      <div className="flex w-max animate-marquee gap-10 sm:gap-14">
        {doubled.map((brand, i) => (
          <div key={`${brand}-${i}`} className="flex flex-col items-center gap-2 px-2">
            <BrandLogo name={brand} size="sm" />
            <span className="text-xs font-semibold text-zinc-400 whitespace-nowrap">{brand}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
