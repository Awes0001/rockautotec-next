/**
 * Stylized manufacturer emblem badge — initials in a gold-ringed shield,
 * not a licensed manufacturer logo. RockAutoTec doesn't hold rights to
 * reproduce OEM trademarks (Ford/Toyota/BMW/etc. logos), so every "logo"
 * slot across the site (marquee, Shop by Make) uses this consistent,
 * legally safe wordmark-style emblem instead of real brand artwork.
 */
function initialsFor(name: string): string {
  const words = name.replace(/[^A-Za-z\s-]/g, "").split(/[\s-]+/).filter(Boolean);
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

export default function BrandLogo({
  name,
  size = "md",
  className = "",
}: {
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const dims = {
    sm: "h-10 w-10 text-xs",
    md: "h-14 w-14 text-base",
    lg: "h-20 w-20 text-2xl",
  }[size];

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full border-2 border-red-500 bg-gradient-to-br from-zinc-800 to-zinc-950 font-serif font-bold text-red-500 tracking-wide ${dims} ${className}`}
      aria-label={`${name} emblem`}
      title={name}
    >
      {initialsFor(name)}
    </div>
  );
}
