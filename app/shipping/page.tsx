import Link from "next/link";
import {
  Truck, Clock, Package, MapPin, AlertCircle,
  CheckCircle, ArrowRight, Calendar, Shield,
} from "lucide-react";

const METHODS = [
  {
    name: "Standard Shipping",
    carrier: "UPS / FedEx Ground",
    time: "3–7 Business Days",
    cost: "FREE on orders $75+ · $7.99 below",
    cutoff: "4:00 pm CT",
    highlight: false,
  },
  {
    name: "Expedited Shipping",
    carrier: "UPS 2-Day / FedEx 2Day",
    time: "2 Business Days",
    cost: "$14.99 flat",
    cutoff: "2:00 pm CT",
    highlight: false,
  },
  {
    name: "Overnight Shipping",
    carrier: "UPS Next Day Air",
    time: "Next Business Day",
    cost: "$29.99 flat",
    cutoff: "12:00 pm CT",
    highlight: true,
  },
  {
    name: "Economy Shipping",
    carrier: "USPS First Class / Parcel Select",
    time: "5–10 Business Days",
    cost: "$5.99 flat",
    cutoff: "4:00 pm CT",
    highlight: false,
  },
];

const STATES_TWO_DAY = [
  "AL","AR","CO","CT","DE","FL","GA","IA","IL","IN","KS","KY","LA",
  "MA","MD","MI","MN","MO","MS","NC","NE","NH","NJ","NY","OH","OK",
  "PA","RI","SC","TN","TX","VA","VT","WI","WV",
];

const RESTRICTIONS = [
  { item: "Oversized Items", note: "Hoods, bumpers, doors and other large body panels ship freight (LTL). Estimated delivery 5–10 business days. Freight charges calculated at checkout." },
  { item: "Hazardous Materials", note: "Batteries, fluids, and aerosols are subject to additional carrier restrictions. These items cannot ship via air or to P.O. Boxes." },
  { item: "P.O. Boxes", note: "Standard ground orders can ship to P.O. Boxes via USPS. Expedited and overnight shipping requires a street address." },
  { item: "APO / FPO Addresses", note: "We ship to military APO/FPO addresses via USPS Priority Mail. Delivery times vary by destination." },
];

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      {/* Hero */}
      <section className="relative overflow-hidden bg-zinc-900 border-b border-zinc-800">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 60% 50%, #dc2626 0%, transparent 65%)" }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-600/10 px-4 py-1.5 text-sm text-red-400">
              <Truck className="h-3.5 w-3.5" />
              Shipping Information
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              Shipping <span className="text-red-500">Policy</span>
            </h1>
            <p className="mt-4 text-zinc-400 leading-relaxed">
              Most in-stock orders placed before the daily cutoff ship the same business day.
              Here&apos;s everything you need to know about how we get parts to your door.
            </p>
            <p className="mt-3 text-xs text-zinc-500">Last updated: January 15, 2026</p>
          </div>
        </div>
      </section>

      {/* Quick facts */}
      <section className="bg-zinc-800 border-b border-zinc-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: Truck,   stat: "FREE",          sub: "Shipping on $75+ orders"   },
              { icon: Clock,   stat: "Same Day",       sub: "Shipping cutoff 4pm CT"    },
              { icon: MapPin,  stat: "2 Days",         sub: "To 35+ US states"          },
              { icon: Package, stat: "7,000+",         sub: "Orders shipped per day"    },
            ].map(({ icon: Icon, stat, sub }) => (
              <div key={sub} className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-600/15 text-red-500">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-base font-bold text-white">{stat}</div>
                  <div className="text-xs text-zinc-400">{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-14">

        {/* Shipping methods table */}
        <section>
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Truck className="h-5 w-5 text-red-500" /> Shipping Methods & Rates
          </h2>
          <div className="rounded-xl border border-zinc-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-zinc-800 border-b border-zinc-700">
                    <th className="text-left px-5 py-3.5 font-semibold text-zinc-300">Method</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-zinc-300">Carrier</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-zinc-300">Transit Time</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-zinc-300">Cost</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-zinc-300">Order Cutoff</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {METHODS.map((m) => (
                    <tr
                      key={m.name}
                      className={m.highlight ? "bg-red-950/20" : "bg-zinc-900 hover:bg-zinc-800 transition-colors"}
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-white">{m.name}</span>
                          {m.highlight && (
                            <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded font-bold">
                              FASTEST
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-4 text-zinc-400">{m.carrier}</td>
                      <td className="px-5 py-4 text-zinc-300 font-medium">{m.time}</td>
                      <td className="px-5 py-4 text-zinc-300">{m.cost}</td>
                      <td className="px-5 py-4 text-zinc-400">{m.cutoff}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="border-t border-zinc-800 bg-zinc-900 px-5 py-3">
              <p className="text-xs text-zinc-500">
                All transit times are business days (Mon–Fri, excluding federal holidays). Cutoff times are based on Central Time (CT).
              </p>
            </div>
          </div>
        </section>

        {/* Order processing */}
        <section>
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-red-500" /> Order Processing
          </h2>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 space-y-4 text-sm text-zinc-400 leading-relaxed">
            <p>
              Orders placed on our website are typically processed within <strong className="text-white">1 business hour</strong> during
              operating hours. Orders placed before <strong className="text-white">4:00 pm CT Monday through Friday</strong> ship the same
              business day for in-stock items.
            </p>
            <p>
              Orders placed after 4:00 pm CT, on weekends, or on federal holidays are processed on the next business day.
              You will receive an email confirmation when your order ships, including a tracking number.
            </p>
            <p>
              During peak periods (Black Friday, Cyber Monday, holiday season), processing times may be extended by
              1–2 business days. We&apos;ll notify you via email if your order is affected.
            </p>
            <div className="mt-4 rounded-lg border border-yellow-700/40 bg-yellow-900/10 p-4 flex gap-3">
              <AlertCircle className="h-4 w-4 text-yellow-500 shrink-0 mt-0.5" />
              <p className="text-yellow-200/80">
                <strong className="text-yellow-300">Special-order and backordered items</strong> have longer processing
                times. The estimated ship date will be displayed on the product page and in your order confirmation email.
              </p>
            </div>
          </div>
        </section>

        {/* 2-day coverage */}
        <section>
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-red-500" /> 2-Day Ground Coverage
          </h2>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-sm text-zinc-400 mb-5">
              Thanks to our two distribution centers in <strong className="text-white">Dallas, TX</strong> and{" "}
              <strong className="text-white">Columbus, OH</strong>, standard ground shipping reaches the following
              states in 2 business days at no extra charge (on eligible orders over $75):
            </p>
            <div className="flex flex-wrap gap-2">
              {STATES_TWO_DAY.map((s) => (
                <span key={s} className="text-xs font-mono font-semibold bg-zinc-800 border border-zinc-700 text-zinc-300 px-2.5 py-1 rounded">
                  {s}
                </span>
              ))}
            </div>
            <p className="text-xs text-zinc-500 mt-4">
              * Coverage is based on in-stock items shipping from our nearest distribution center. Actual delivery may vary by specific zip code.
            </p>
          </div>
        </section>

        {/* Restrictions */}
        <section>
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-500" /> Special Items & Restrictions
          </h2>
          <div className="space-y-3">
            {RESTRICTIONS.map(({ item, note }) => (
              <div key={item} className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-800 border border-zinc-700 text-red-500">
                  <Package className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1">{item}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{note}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* International */}
        <section>
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Shield className="h-5 w-5 text-red-500" /> International Shipping
          </h2>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 space-y-3 text-sm text-zinc-400 leading-relaxed">
            <p>
              We currently ship internationally to <strong className="text-white">Canada</strong> and{" "}
              <strong className="text-white">Mexico</strong>. International orders are subject to the following:
            </p>
            <ul className="space-y-2">
              {[
                "Shipping rates are calculated at checkout based on weight and destination.",
                "Estimated delivery: 7–14 business days for Canada, 10–21 business days for Mexico.",
                "Duties, taxes, and customs fees are the sole responsibility of the recipient.",
                "We are not responsible for delays caused by customs clearance processes.",
                "Certain hazardous materials (batteries, fluids) cannot be shipped internationally.",
                "Returns on international orders require a Return Authorization number. Contact us before shipping anything back.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle className="h-3.5 w-3.5 text-red-500 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Missing / damaged */}
        <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-lg font-bold text-white mb-3">Missing or Damaged Shipments</h2>
          <p className="text-sm text-zinc-400 leading-relaxed mb-4">
            If your order arrives damaged or items are missing, contact us within{" "}
            <strong className="text-white">5 business days</strong> of delivery. Please keep all original
            packaging and take photos of any damage—we&apos;ll need these to file a carrier claim.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-sm font-semibold text-red-400 hover:text-red-300 transition-colors"
          >
            Contact Support <ArrowRight className="h-4 w-4" />
          </Link>
        </section>

      </div>
    </div>
  );
}
