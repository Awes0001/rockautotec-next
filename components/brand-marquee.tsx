import BrandLogo from "@/components/brand-logo";

const MARQUEE_MAKES = [
  "Ford", "Chevrolet", "Toyota", "Honda", "Nissan", "BMW",
  "Mercedes", "Audi", "Jeep", "Ram", "Lexus", "Hyundai", "Kia",
];

export default function BrandMarquee() {
  // Render the list twice back-to-back; the animation scrolls exactly -50%
  // so the seam between the two copies is invisible, giving an infinite loop.
  const doubled = [...MARQUEE_MAKES, ...MARQUEE_MAKES];

  return (
    <div className="overflow-hidden border-y border-zinc-800 bg-zinc-900/60 py-6">
      <div className="flex w-max animate-marquee gap-10 sm:gap-14">
        {doubled.map((make, i) => (
          <div key={`${make}-${i}`} className="flex flex-col items-center gap-2 px-2">
            <BrandLogo name={make} size="sm" />
            <span className="text-xs font-semibold text-zinc-400 whitespace-nowrap">{make}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
