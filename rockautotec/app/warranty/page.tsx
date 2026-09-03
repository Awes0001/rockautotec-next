import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Check, Phone, ChevronRight, AlertCircle, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Warranty Policy",
  description:
    "RockAutoTec warranty coverage details — 12-month / 12,000-mile limited warranty on all parts. Learn what's covered, how to file a claim, and our OEM-grade quality commitment.",
};

const WARRANTY_ITEMS = [
  "Manufacturing defects in materials or workmanship",
  "Premature failure under normal driving conditions",
  "Defective seals, gaskets, or hardware included in the kit",
  "Parts that fail to meet OEM-specified performance thresholds",
];

const EXCLUSIONS = [
  "Damage from improper installation or failure to follow instructions",
  "Normal wear and tear (brake pads, filters, wiper blades beyond expected life)",
  "Damage resulting from accidents, collisions, or environmental hazards",
  "Parts modified from their original configuration",
  "Misuse, neglect, or use outside the part's intended application",
  "Damage from contaminated fluids or incompatible chemicals",
];

export default function WarrantyPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      {/* Hero */}
      <section className="bg-zinc-900 border-b border-zinc-800 py-14 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-xs text-zinc-500 mb-6">
            <Link href="/" className="hover:text-red-400 transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-zinc-300">Warranty Policy</span>
          </nav>
          <div className="flex items-start gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-600/10 border border-red-600/20">
              <Shield className="h-7 w-7 text-red-500" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Warranty Policy
              </h1>
              <p className="text-zinc-400 mt-2 max-w-xl">
                Every part sold by RockAutoTec is backed by a comprehensive limited warranty.
                We stand behind the quality of every product in our catalog.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">

        {/* Standard Warranty */}
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900 overflow-hidden">
          <div className="bg-red-600/10 border-b border-red-600/20 px-6 py-4 flex items-center gap-3">
            <Clock className="h-5 w-5 text-red-400" />
            <h2 className="text-lg font-bold text-white">Standard Limited Warranty</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 rounded-xl bg-zinc-800 border border-zinc-700 p-5 text-center">
                <p className="text-3xl font-extrabold text-red-400 mb-1">12</p>
                <p className="text-sm font-semibold text-white">Months</p>
                <p className="text-xs text-zinc-400 mt-1">from purchase date</p>
              </div>
              <div className="flex items-center justify-center text-zinc-600 font-bold text-lg">OR</div>
              <div className="flex-1 rounded-xl bg-zinc-800 border border-zinc-700 p-5 text-center">
                <p className="text-3xl font-extrabold text-red-400 mb-1">12,000</p>
                <p className="text-sm font-semibold text-white">Miles</p>
                <p className="text-xs text-zinc-400 mt-1">whichever comes first</p>
              </div>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed">
              All parts sold by RockAutoTec are covered under a <strong className="text-white">12-month / 12,000-mile limited warranty</strong> against
              defects in materials and workmanship. This warranty applies to the original purchaser only and is non-transferable.
            </p>
            <p className="text-sm text-zinc-400">
              Certain product categories — including remanufactured components from select brands — may carry extended manufacturer&apos;s
              warranties. These are noted on the individual product page where applicable.
            </p>
          </div>
        </section>

        {/* What's Covered */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">What&apos;s Covered</h2>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 divide-y divide-zinc-800 overflow-hidden">
            {WARRANTY_ITEMS.map((item) => (
              <div key={item} className="flex items-start gap-3 px-5 py-4">
                <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-sm text-zinc-200">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What's Not Covered */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">What&apos;s Not Covered</h2>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 divide-y divide-zinc-800 overflow-hidden">
            {EXCLUSIONS.map((item) => (
              <div key={item} className="flex items-start gap-3 px-5 py-4">
                <AlertCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                <p className="text-sm text-zinc-400">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How to File a Claim */}
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-white mb-6">How to File a Warranty Claim</h2>
          <div className="space-y-5">
            {[
              {
                step: "1",
                title: "Contact Us Within the Warranty Period",
                body: "Reach out to our customer support team within 12 months of purchase by phone, email, or the contact form below. Have your order number ready.",
              },
              {
                step: "2",
                title: "Provide Documentation",
                body: "Submit your original proof of purchase (order confirmation email or invoice) and a brief description of the issue with the part.",
              },
              {
                step: "3",
                title: "Return the Defective Part",
                body: "We'll email you a prepaid return shipping label. Package the part securely in its original packaging if available and drop it off at any carrier location.",
              },
              {
                step: "4",
                title: "Receive Replacement or Refund",
                body: "Upon inspection, we'll ship a replacement part at no charge, or issue a full refund to your original payment method — your choice.",
              },
            ].map(({ step, title, body }) => (
              <div key={step} className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-600 text-white font-bold text-sm">
                  {step}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white mb-1">{title}</p>
                  <p className="text-sm text-zinc-400 leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-2xl border border-zinc-700 bg-zinc-900 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <Phone className="h-6 w-6 text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-base font-bold text-white">Need Help With a Warranty Claim?</p>
              <p className="text-sm text-zinc-400 mt-0.5">Our team is available Mon–Fri 7am–8pm CT · Sat–Sun 9am–5pm CT</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold px-5 py-2.5 text-sm transition-colors"
            >
              Contact Support
            </Link>
            <a
              href="tel:18007622886"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-600 hover:border-zinc-500 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold px-5 py-2.5 text-sm transition-colors"
            >
              1-800-ROC-AUTO
            </a>
          </div>
        </section>

        {/* Related links */}
        <div className="flex flex-wrap gap-3 pt-2 pb-6">
          {[
            { label: "Return Policy", href: "/returns" },
            { label: "Shipping Policy", href: "/shipping" },
            { label: "Fitment Guarantee", href: "/fitment" },
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
