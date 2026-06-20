import type { Metadata } from "next";
import Link from "next/link";
import { Wrench, Check, Phone, ChevronRight, Car, Search, Shield, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Fitment Verification Guide",
  description:
    "RockAutoTec fitment guarantee — how to verify a part fits your vehicle, what to do if a part doesn't fit, and our hassle-free wrong-part return policy.",
};

const HOW_IT_WORKS = [
  {
    step: "1",
    icon: Car,
    title: "Enter Your Vehicle",
    body: "Use the Year / Make / Model search at the top of any page. Our fitment database checks compatibility before you add to cart.",
  },
  {
    step: "2",
    icon: Search,
    title: "Verify the Part Number",
    body: "Cross-reference the SKU or OEM part number on the product page with your vehicle's existing part. The exact number is listed on the part you're replacing.",
  },
  {
    step: "3",
    icon: Check,
    title: "Confirm Sub-model & Engine",
    body: "Many fitment differences come down to engine displacement or trim level. Always confirm engine size and trim when ordering suspension, braking, or engine components.",
  },
  {
    step: "4",
    icon: Shield,
    title: "Order With Confidence",
    body: "If the part doesn't fit your verified vehicle, return it within 30 days for free. No restocking fees, no hassle.",
  },
];

const TIPS = [
  {
    title: "Use the Full VIN",
    body: "Your Vehicle Identification Number (VIN) — found on the driver's door jamb or dashboard — gives the most precise fitment confirmation. Call us with your VIN for expert verification.",
  },
  {
    title: "Check the Part You're Replacing",
    body: "The old part often has a manufacturer's number stamped on it. Search RockAutoTec by that number for a guaranteed cross-reference match.",
  },
  {
    title: "Engine Size Matters",
    body: "A 2021 Ford F-150 with a 3.5L EcoBoost uses different parts than the same truck with a 5.0L V8. Always specify engine displacement.",
  },
  {
    title: "Trim Level & Options",
    body: "Features like all-wheel drive, sport suspension, towing packages, and electronic stability control all affect which parts are compatible.",
  },
  {
    title: "Production Date vs. Model Year",
    body: "Some manufacturers introduce mid-year design changes. If your vehicle was built in the latter half of the model year, verify production date for precision fitment.",
  },
];

export default function FitmentPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      {/* Hero */}
      <section className="bg-zinc-900 border-b border-zinc-800 py-14 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-xs text-zinc-500 mb-6">
            <Link href="/" className="hover:text-red-400 transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-zinc-300">Fitment Verification</span>
          </nav>
          <div className="flex items-start gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-600/10 border border-red-600/20">
              <Wrench className="h-7 w-7 text-red-500" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Fitment Verification Guide
              </h1>
              <p className="text-zinc-400 mt-2 max-w-xl">
                Getting the right part the first time saves time and frustration.
                Here&apos;s how to confirm fitment before ordering — and what happens if a part doesn&apos;t fit.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

        {/* Guarantee callout */}
        <div className="rounded-2xl border border-emerald-700/40 bg-emerald-900/10 p-6 flex items-start gap-4">
          <Shield className="h-6 w-6 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-base font-bold text-white">RockAutoTec Fitment Guarantee</p>
            <p className="text-sm text-zinc-300 mt-1 leading-relaxed">
              If a part you ordered using our vehicle selector doesn&apos;t fit your vehicle, return it within 30 days for
              a <strong className="text-white">free exchange or full refund</strong> — including return shipping.
              No restocking fees. No questions asked.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">How Fitment Verification Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {HOW_IT_WORKS.map(({ step, icon: Icon, title, body }) => (
              <div key={step} className="flex items-start gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-600 text-white font-extrabold text-sm">
                  {step}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="h-4 w-4 text-red-400" />
                    <h3 className="text-sm font-bold text-white">{title}</h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pro Tips */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Fitment Tips from Our Experts</h2>
          <div className="space-y-3">
            {TIPS.map(({ title, body }) => (
              <div key={title} className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
                <div className="flex items-start gap-3">
                  <Wrench className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-white mb-1">{title}</p>
                    <p className="text-sm text-zinc-400 leading-relaxed">{body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Common Fitment Issues */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Common Fitment Mistakes to Avoid</h2>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 divide-y divide-zinc-800 overflow-hidden">
            {[
              "Ordering for the wrong model year — especially for vehicles with significant redesigns",
              "Selecting a part compatible with the base engine when your vehicle has a performance or diesel variant",
              "Overlooking rear vs. front fitment on symmetrical parts like brakes, shocks, and wheel bearings",
              "Assuming all hatchback / sedan versions of the same model share identical parts",
              "Ignoring the difference between left (driver's side) and right (passenger's side) on directional parts",
            ].map((tip) => (
              <div key={tip} className="flex items-start gap-3 px-5 py-4">
                <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-sm text-zinc-300">{tip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* VIN Lookup CTA */}
        <section className="rounded-2xl border border-zinc-700 bg-zinc-900 p-7 sm:p-10">
          <h2 className="text-xl font-bold text-white mb-3">Need Expert Fitment Help?</h2>
          <p className="text-zinc-400 text-sm mb-6 max-w-xl">
            Our parts specialists can verify fitment using your VIN in under 2 minutes.
            Call, email, or chat — no appointment needed.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a
              href="tel:18007622886"
              className="flex items-center justify-center gap-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold px-4 py-3 text-sm transition-colors"
            >
              <Phone className="h-4 w-4" />
              1-800-ROC-AUTO
            </a>
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 rounded-lg border border-zinc-600 hover:border-zinc-500 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold px-4 py-3 text-sm transition-colors"
            >
              Email Our Team
            </Link>
            <Link
              href="/search"
              className="flex items-center justify-center gap-2 rounded-lg border border-zinc-600 hover:border-zinc-500 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold px-4 py-3 text-sm transition-colors"
            >
              <Search className="h-4 w-4" />
              Search by VIN / Part #
            </Link>
          </div>
          <p className="text-xs text-zinc-500 mt-4">Available Mon–Fri 7am–8pm CT · Sat–Sun 9am–5pm CT</p>
        </section>

        {/* Related links */}
        <div className="flex flex-wrap gap-3 pb-6">
          {[
            { label: "Return Policy", href: "/returns" },
            { label: "Warranty Policy", href: "/warranty" },
            { label: "Shipping Info", href: "/shipping" },
            { label: "Contact Us", href: "/contact" },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="inline-flex items-center gap-1.5 text-sm text-red-400 hover:text-red-300 font-semibold transition-colors"
            >
              {label} <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
