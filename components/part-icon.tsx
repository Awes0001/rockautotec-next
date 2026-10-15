import {
  Disc, Gauge, Settings, Thermometer, Zap, Fuel, Flame, Wind, Lightbulb, Car,
  CircleDot, Rocket, Truck, Snowflake, Cog, Filter,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  Disc, Gauge, Settings, Thermometer, Zap, Fuel, Flame, Wind, Lightbulb, Car,
  CircleDot, Rocket, Truck, Snowflake, Cog, Filter,
};

const GRADIENTS: Record<string, string> = {
  Brakes:             "from-red-950 to-zinc-900",
  Suspension:         "from-zinc-800 to-zinc-900",
  Engine:             "from-orange-950 to-zinc-900",
  Cooling:            "from-blue-950 to-zinc-900",
  Electrical:         "from-amber-950 to-zinc-900",
  "Fuel System":      "from-emerald-950 to-zinc-900",
  Ignition:           "from-red-950 to-zinc-900",
  Exhaust:            "from-zinc-700 to-zinc-900",
  Lighting:           "from-yellow-950 to-zinc-900",
  "Body Parts":       "from-indigo-950 to-zinc-900",
  "Tires & Wheels":   "from-slate-800 to-zinc-900",
  Performance:        "from-rose-950 to-zinc-900",
  "Towing & Hauling": "from-stone-800 to-zinc-900",
  "Climate Control":  "from-cyan-950 to-zinc-900",
  Drivetrain:         "from-purple-950 to-zinc-900",
  "Filters & Maintenance": "from-lime-950 to-zinc-900",
};

/** Subtle per-slot variation so a 4-image gallery built from one icon family doesn't look like 4 copies of the same tile. */
const VARIANT_TRANSFORMS = ["rotate-0 scale-100", "rotate-6 scale-95", "-rotate-6 scale-95", "rotate-3 scale-90"];

/**
 * Renders a category-specific icon tile in place of a product photo.
 * Used everywhere a part doesn't have licensed product photography —
 * avoids ever showing an unrelated stock/lifestyle image.
 */
export default function PartIcon({
  category,
  iconName,
  className = "",
  iconClassName = "h-10 w-10",
  variant,
  zoom = false,
}: {
  category: string;
  iconName: string;
  className?: string;
  iconClassName?: string;
  /** 0-3 — picks a slightly different rotation/scale so gallery thumbnails read as distinct shots. Omit for the default look used everywhere else. */
  variant?: number;
  /** Scales the icon up on hover — used by the product page's main gallery image. */
  zoom?: boolean;
}) {
  const Icon = ICONS[iconName] ?? Settings;
  const gradient = GRADIENTS[category] ?? "from-zinc-800 to-zinc-900";
  const transform = variant !== undefined ? VARIANT_TRANSFORMS[variant % VARIANT_TRANSFORMS.length] : "";

  return (
    <div
      className={`group/icon flex items-center justify-center overflow-hidden bg-gradient-to-br ${gradient} ${className}`}
    >
      <Icon
        className={`${iconClassName} text-zinc-500 transition-transform duration-300 ${transform} ${
          zoom ? "group-hover/icon:scale-125" : ""
        }`}
        strokeWidth={1.5}
      />
    </div>
  );
}
