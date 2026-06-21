import Link from "next/link";
import {
  Award, Users, Package, Truck, Shield,
  ArrowRight, CheckCircle, Wrench, Clock,
} from "lucide-react";
import { ALL_PRODUCTS, CATEGORIES, BRANDS } from "@/lib/catalog";
import { MAKES } from "@/lib/makes";

const STATS = [
  { value: "2015",                          label: "Founded"          },
  { value: `${ALL_PRODUCTS.length}+`,       label: "Parts In Stock"   },
  { value: `${CATEGORIES.length}`,          label: "Part Categories"  },
  { value: `${MAKES.length}`,               label: "Vehicle Makes Supported" },
];

const VALUES = [
  {
    icon: Award,
    title: "Quality Without Compromise",
    desc: `We carry parts from ${BRANDS.length} established manufacturers, including ${BRANDS.slice(0, 3).join(", ")}. Every part is matched against OEM and interchange numbers before it's listed.`,
  },
  {
    icon: Shield,
    title: "Fitment Guarantee",
    desc: "Every product page includes a Year/Make/Model/Engine fitment table. If a part doesn't fit your vehicle, we cover return shipping at no cost to you.",
  },
  {
    icon: Users,
    title: "Built for Real Mechanics",
    desc: "Our catalog, fitment data, and account tools are built around how repair shops and fleet buyers actually work — not just retail browsing.",
  },
  {
    icon: Truck,
    title: "Speed You Can Count On",
    desc: "Orders placed before 3PM EST on in-stock items ship the same business day, with free shipping on orders over $75.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      {/* Hero */}
      <section className="relative overflow-hidden bg-zinc-900 border-b border-zinc-800">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 30% 60%, #dc2626 0%, transparent 65%)" }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-600/10 px-4 py-1.5 text-sm text-red-400">
              <Wrench className="h-3.5 w-3.5" />
              Our Story
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Built by Mechanics,{" "}
              <span className="text-red-500">for Everyone.</span>
            </h1>
            <p className="mt-5 text-lg text-zinc-400 leading-relaxed max-w-2xl">
              RockAutoTec was founded in 2015 with a simple belief: every driver — professional technician
              or weekend DIYer — deserves access to quality auto parts at fair prices, with fitment data
              you can actually trust.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/parts"
                className="inline-flex items-center gap-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold px-6 py-3 text-sm transition-colors"
              >
                Shop Parts <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-semibold px-6 py-3 text-sm transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-zinc-800 border-b border-zinc-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <div className="text-3xl sm:text-4xl font-extrabold text-red-500">{value}</div>
                <div className="mt-1 text-sm text-zinc-400">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="bg-zinc-950 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">Our Mission</h2>
              <p className="text-zinc-400 leading-relaxed mb-4">
                The auto parts industry has too many barriers: confusing fitment data, inflated prices,
                slow shipping, and customer service that doesn't understand cars. We built RockAutoTec
                to fix that.
              </p>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Our catalog covers {CATEGORIES.join(", ").toLowerCase()} parts from {BRANDS.length} trusted
                brands, with vehicle fitment data for {MAKES.length} makes. Every part listing includes its
                OEM number, interchange numbers, and a fitment table — no guesswork.
              </p>
              <ul className="space-y-3">
                {[
                  "OEM-quality parts at competitive prices",
                  "Same-day shipping on in-stock orders before 3PM EST",
                  "Fitment guarantee on every order",
                  "Real support team available 6 days a week",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-zinc-300">
                    <CheckCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Visual block */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Package, label: `${ALL_PRODUCTS.length}+`, sub: "Parts cataloged" },
                  { icon: Award,   label: `${BRANDS.length}`,         sub: "Trusted brands"  },
                  { icon: Clock,   label: "30-Day",                  sub: "Return window"   },
                  { icon: Truck,   label: "$75+",                    sub: "Free shipping"    },
                ].map(({ icon: Icon, label, sub }) => (
                  <div key={sub} className="rounded-xl border border-zinc-700 bg-zinc-800 p-4 text-center">
                    <Icon className="h-6 w-6 text-red-500 mx-auto mb-2" />
                    <div className="text-xl font-bold text-white">{label}</div>
                    <div className="text-xs text-zinc-400 mt-0.5">{sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-zinc-900 border-y border-zinc-800 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">What We Stand For</h2>
            <p className="mt-2 text-zinc-400">The four principles that guide every decision we make</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-xl border border-zinc-700 bg-zinc-800 p-6 flex gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-600/15 text-red-500">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">{title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-zinc-950 py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Ready to Find Your Parts?
          </h2>
          <p className="text-zinc-400 mb-8">
            {ALL_PRODUCTS.length}+ parts in stock, with same-day shipping and a fitment guarantee you can trust.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/parts"
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold px-8 py-3 text-sm transition-colors"
            >
              Shop All Parts <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-semibold px-8 py-3 text-sm transition-colors"
            >
              Talk to an Expert
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
