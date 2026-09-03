"use client";

import { useEffect, useState } from "react";
import {
  Truck, Building2, Users, Clock, ShieldCheck,
  type LucideIcon,
} from "lucide-react";

interface PromoMessage {
  icon: LucideIcon;
  text: string;
}

const MESSAGES: PromoMessage[] = [
  { icon: Truck,       text: "Free Shipping on Orders $75+" },
  { icon: Building2,   text: "Dealer Pricing Available for Repair Shops" },
  { icon: Users,       text: "Fleet Discounts for Commercial Accounts" },
  { icon: Clock,       text: "Same-Day Processing Before 3PM EST" },
  { icon: ShieldCheck, text: "OEM Quality Guaranteed on Every Part" },
];

export default function RotatingPromoBanner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % MESSAGES.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const { icon: Icon, text } = MESSAGES[index];

  return (
    <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 border-y border-blue-800/50 py-3">
      <div
        key={index}
        className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-2.5 text-sm sm:text-base font-semibold text-white animate-promo-fade"
      >
        <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-red-400 shrink-0" />
        <span>{text}</span>
      </div>
    </div>
  );
}
