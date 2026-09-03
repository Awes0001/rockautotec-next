import type { Metadata } from "next";
import Link from "next/link";
import {
  Truck, Building2, Phone, ChevronRight, CheckCircle,
  Package, Shield, DollarSign, Clock, Users, Mail,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Fleet & Commercial Accounts",
  description:
    "RockAutoTec Fleet Sales — volume pricing, dedicated account managers, Net-30 terms, and priority fulfillment for repair shops, dealerships, municipalities, and fleet operators.",
};

const BENEFITS = [
  {
    icon: DollarSign,
    title: "Volume Pricing",
    body: "Tiered discounts based on monthly spend. The more you buy, the more you save — up to 25% off retail pricing.",
  },
  {
    icon: Clock,
    title: "Net-30 Terms",
    body: "Qualifying commercial accounts receive Net-30 payment terms with no interest. Apply online or call your account manager.",
  },
  {
    icon: Users,
    title: "Dedicated Account Manager",
    body: "Every commercial account gets a named account manager available directly by phone and email for fast, personal service.",
  },
  {
    icon: Package,
    title: "Priority Fulfillment",
    body: "Commercial orders receive warehouse priority, with guaranteed same-day dispatch on in-stock items ordered before 3pm CT.",
  },
  {
    icon: Truck,
    title: "Consolidated Shipping",
    body: "Combine orders across vehicles and locations into a single weekly shipment to minimize freight costs.",
  },
  {
    icon: Shield,
    title: "Enhanced Warranty",
    body: "Commercial accounts receive an extended 24-month warranty on select part categories as part of the fleet program.",
  },
];

const WHO_WE_SERVE = [
  { icon: "🔧", title: "Independent Repair Shops",  body: "OEM-quality parts at wholesale prices. Keep your bays moving." },
  { icon: "🏢", title: "Dealership Service Centers", body: "Aftermarket alternatives to OEM sourcing with the same fit guarantee." },
  { icon: "🚌", title: "Municipal & Government",     body: "Competitive bid pricing, government procurement compatibility, and compliance documentation." },
  { icon: "🚛", title: "Trucking & Logistics",       body: "Heavy-duty parts for Class 3–8 vehicles. Bulk ordering with consolidated delivery." },
  { icon: "🏗️", title: "Construction & Equipment",  body: "Light truck and van fleets for contractors. Multi-site account management." },
  { icon: "🚕", title: "Rental & Rideshare Fleets",  body: "High-turnover maintenance schedules supported with stock reservation and auto-replenishment." },
];

export default function FleetPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      {/* Hero */}
      <section className="relative overflow-hidden bg-zinc-900 border-b border-zinc-800 py-16 lg:py-24">
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 30% 50%, #dc2626 0%, transparent 70%)" }}
        />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-xs text-zinc-500 mb-6">
            <Link href="/" className="hover:text-red-400 transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-zinc-300">Fleet & Commercial</span>
          </nav>
          <div className="flex items-start gap-5 mb-8">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-600/10 border border-red-600/20">
              <Building2 className="h-7 w-7 text-red-500" />
            </div>
            <div>
              <p className="text-xs font-semibold text-red-400 uppercase tracking-widest mb-1">Commercial Accounts</p>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
                Fleet & Commercial<br className="hidden sm:block" /> Parts Program
              </h1>
            </div>
          </div>
          <p className="text-lg text-zinc-300 max-w-2xl leading-relaxed">
            Purpose-built for repair shops, dealerships, municipalities, and fleet operators.
            Volume pricing, Net-30 terms, dedicated support, and a catalog of 1,500+ OEM and aftermarket parts.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-bold px-7 py-3.5 text-base transition-colors"
            >
              Apply for a Commercial Account
            </Link>
            <a
              href="tel:18007622886"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-600 hover:border-zinc-500 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-bold px-7 py-3.5 text-base transition-colors"
            >
              <Phone className="h-4 w-4" />
              Call Fleet Sales
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">

        {/* Benefits */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Commercial Account Benefits</h2>
          <p className="text-zinc-400 mb-8">Everything you need to run a high-volume parts operation efficiently.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600/10 border border-red-600/20">
                  <Icon className="h-5 w-5 text-red-500" />
                </div>
                <h3 className="text-base font-bold text-white">{title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Who We Serve */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Who We Serve</h2>
          <p className="text-zinc-400 mb-8">Tailored programs for every type of commercial vehicle operation.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {WHO_WE_SERVE.map(({ icon, title, body }) => (
              <div key={title} className="flex items-start gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
                <span className="text-3xl shrink-0">{icon}</span>
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">{title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing tiers */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">Volume Pricing Tiers</h2>
          <div className="overflow-x-auto rounded-2xl border border-zinc-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-800 text-left">
                  {["Tier", "Monthly Spend", "Discount off Retail", "Account Benefits"].map((h) => (
                    <th key={h} className="py-3 px-5 text-xs font-bold text-zinc-400 uppercase tracking-wider whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 bg-zinc-900">
                {[
                  { tier: "Silver",   spend: "$500–$2,499",    discount: "5–10%",  benefits: "Net-30 terms, dedicated support line" },
                  { tier: "Gold",     spend: "$2,500–$9,999",  discount: "11–17%", benefits: "Priority fulfillment, account manager" },
                  { tier: "Platinum", spend: "$10,000+",        discount: "18–25%", benefits: "All Gold benefits + extended warranty, consolidated shipping" },
                ].map(({ tier, spend, discount, benefits }) => (
                  <tr key={tier} className="hover:bg-zinc-800/50 transition-colors">
                    <td className="py-4 px-5">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${
                        tier === "Platinum" ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" :
                        tier === "Gold"     ? "bg-amber-600/20 text-amber-400 border border-amber-600/30" :
                                             "bg-zinc-600/20 text-zinc-300 border border-zinc-600/30"
                      }`}>
                        {tier}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-zinc-200 font-medium">{spend}</td>
                    <td className="py-4 px-5 text-emerald-400 font-semibold">{discount}</td>
                    <td className="py-4 px-5 text-zinc-400 text-xs">{benefits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-zinc-500 mt-3">
            Discount tier is based on a rolling 30-day average. Tier adjustments apply at the start of the following billing cycle.
          </p>
        </section>

        {/* How to Apply */}
        <section className="rounded-2xl border border-zinc-700 bg-zinc-900 p-7 sm:p-10">
          <h2 className="text-xl font-bold text-white mb-6">How to Apply</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            {[
              { step: "1", title: "Submit Your Application", body: "Fill out the commercial account form with your business name, EIN, and estimated monthly parts spend." },
              { step: "2", title: "Credit Review (1–2 Days)", body: "Our fleet team reviews your application and contacts you with your approved tier and credit terms." },
              { step: "3", title: "Start Ordering", body: "Your account is activated with volume pricing applied immediately. Your account manager will reach out to introduce themselves." },
            ].map(({ step, title, body }) => (
              <div key={step} className="flex flex-col items-center text-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white font-extrabold text-lg">
                  {step}
                </div>
                <h3 className="text-sm font-bold text-white">{title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold px-6 py-3 text-sm transition-colors"
            >
              <Mail className="h-4 w-4" />
              Apply Online
            </Link>
            <div className="flex items-center gap-3 text-sm text-zinc-400">
              <Phone className="h-4 w-4 text-red-500 shrink-0" />
              <span>Prefer to talk? Call <a href="tel:18007622886" className="text-white font-semibold hover:text-red-400">1-800-ROC-AUTO</a> — Fleet Sales available Mon–Fri 7am–6pm CT</span>
            </div>
          </div>
        </section>

        {/* What we stock */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">1,500+ Parts In Stock</h2>
          <p className="text-zinc-400 mb-6 max-w-2xl">
            From OEM-grade engine components to lighting and body parts — our catalog spans every major vehicle system across
            domestic, import, and light-duty commercial vehicles.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              "Brakes", "Suspension", "Engine", "Cooling", "Electrical",
              "Fuel System", "Ignition", "Exhaust", "Lighting", "Body Parts",
            ].map((cat) => (
              <div key={cat} className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2.5 text-center">
                <p className="text-xs font-semibold text-zinc-300">{cat}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
            <p className="text-sm text-zinc-400">All parts carry the RockAutoTec fitment guarantee — wrong part ships free return, no questions asked.</p>
          </div>
        </section>

      </div>
    </div>
  );
}
