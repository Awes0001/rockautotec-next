import {
  Disc, Gauge, Settings, Thermometer, Zap, Fuel, Flame, Wind, Lightbulb, Car,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  Disc, Gauge, Settings, Thermometer, Zap, Fuel, Flame, Wind, Lightbulb, Car,
};

const GRADIENTS: Record<string, string> = {
  Brakes:       "from-red-950 to-zinc-900",
  Suspension:   "from-zinc-800 to-zinc-900",
  Engine:       "from-orange-950 to-zinc-900",
  Cooling:      "from-blue-950 to-zinc-900",
  Electrical:   "from-amber-950 to-zinc-900",
  "Fuel System":"from-emerald-950 to-zinc-900",
  Ignition:     "from-red-950 to-zinc-900",
  Exhaust:      "from-zinc-700 to-zinc-900",
  Lighting:     "from-yellow-950 to-zinc-900",
  "Body Parts": "from-indigo-950 to-zinc-900",
};

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
}: {
  category: string;
  iconName: string;
  className?: string;
  iconClassName?: string;
}) {
  const Icon = ICONS[iconName] ?? Settings;
  const gradient = GRADIENTS[category] ?? "from-zinc-800 to-zinc-900";

  return (
    <div
      className={`flex items-center justify-center bg-gradient-to-br ${gradient} ${className}`}
    >
      <Icon className={`${iconClassName} text-zinc-500`} strokeWidth={1.5} />
    </div>
  );
}
