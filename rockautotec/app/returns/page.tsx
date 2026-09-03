import Link from "next/link";
import {
  RotateCcw, CheckCircle, XCircle, Clock, Package,
  AlertCircle, ArrowRight, Truck, CreditCard, Phone,
} from "lucide-react";

const STEPS = [
  {
    step: "01",
    title: "Initiate Your Return",
    desc: "Log in to your account and go to Order History. Select the item(s) you'd like to return and choose a reason. Alternatively, contact our support team at 1-800-762-5832.",
  },
  {
    step: "02",
    title: "Receive a Return Authorization",
    desc: "Within 1 business hour we'll email you a Return Merchandise Authorization (RMA) number and a prepaid return shipping label for qualifying returns.",
  },
  {
    step: "03",
    title: "Ship the Item Back",
    desc: "Pack the item securely in its original packaging. Attach the prepaid label, drop it at any UPS location, and keep the receipt as proof of return.",
  },
  {
    step: "04",
    title: "Refund Processed",
    desc: "Once we receive and inspect the returned item (typically 2 business days), your refund is issued to the original payment method within 3–5 business days.",
  },
];

const ELIGIBLE = [
  "New, uninstalled parts in original manufacturer packaging",
  "Parts returned within 30 days of the delivery date",
  "Items that have not been modified, cut, or tampered with",
  "Parts with all original hardware, instructions, and accessories included",
  "Electrical parts that have not been powered on or installed",
];

const NOT_ELIGIBLE = [
  "Installed or used parts (any sign of installation voids return eligibility)",
  "Parts returned after 30 days of the delivery date",
  "Special-order or custom-built parts marked 'Non-Returnable' at time of purchase",
  "Hazardous materials (fluids, batteries, aerosols) that have been opened",
  "Parts with missing packaging, hardware, or documentation",
  "Closeout or final-sale items marked as non-returnable",
];

const REFUND_TIMELINE = [
  { method: "Credit Card",     time: "3–5 Business Days" },
  { method: "Debit Card",      time: "3–5 Business Days" },
  { method: "PayPal",          time: "1–3 Business Days" },
  { method: "Apple Pay",       time: "3–5 Business Days" },
  { method: "Store Credit",    time: "Immediate"         },
  { method: "Check (rare)",    time: "7–10 Business Days"},
];

const FAQS = [
  {
    q: "Do I have to pay for return shipping?",
    a: "No — for parts returned due to a fitment error on our part, we cover return shipping 100%. For returns due to a change of mind or ordering error, a $9.99 restocking/shipping fee is deducted from the refund.",
  },
  {
    q: "What if I installed the part and it's defective?",
    a: "Defective parts are covered under warranty (see our warranty policy). Contact us with photos and a description of the defect. We'll arrange a replacement or refund without requiring you to return the installed part in most cases.",
  },
  {
    q: "Can I exchange instead of return?",
    a: "Yes. Request an exchange when initiating your return. If the replacement is a different price, we'll charge or refund the difference. Exchanges ship as soon as the return is processed.",
  },
  {
    q: "What if I ordered the wrong part?",
    a: "If you ordered the wrong part due to an error in our fitment data, we cover return shipping and priority-ship the correct part at no extra charge. If the error was yours, standard return terms apply.",
  },
  {
    q: "How do I return a large or freight item?",
    a: "Contact our support team directly for oversized returns. We'll coordinate LTL freight pickup from your location. Freight returns may take 5–10 business days to arrive at our warehouse.",
  },
];

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      {/* Hero */}
      <section className="relative overflow-hidden bg-zinc-900 border-b border-zinc-800">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 70% 40%, #dc2626 0%, transparent 65%)" }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-600/10 px-4 py-1.5 text-sm text-red-400">
              <RotateCcw className="h-3.5 w-3.5" />
              30-Day Return Window
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              Return <span className="text-red-500">Policy</span>
            </h1>
            <p className="mt-4 text-zinc-400 leading-relaxed">
              We stand behind every part we sell. If you&apos;re not satisfied for any reason,
              our 30-day hassle-free return policy has you covered.
            </p>
            <p className="mt-3 text-xs text-zinc-500">Last updated: January 15, 2026</p>
          </div>
        </div>
      </section>

      {/* Summary badges */}
      <section className="bg-zinc-800 border-b border-zinc-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: Clock,    stat: "30 Days",   sub: "Return window"              },
              { icon: Truck,    stat: "Free",       sub: "Return shipping (fitment)"  },
              { icon: Package,  stat: "2 Days",     sub: "Inspection turnaround"      },
              { icon: CreditCard, stat: "3–5 Days", sub: "Refund to card"            },
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

        {/* Return process */}
        <section>
          <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
            <RotateCcw className="h-5 w-5 text-red-500" /> How to Return a Part
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {STEPS.map(({ step, title, desc }) => (
              <div key={step} className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-red-600/40 bg-red-600/10 text-red-500 text-sm font-bold">
                  {step}
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1.5">{title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link
              href="/orders"
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold px-6 py-3 text-sm transition-colors"
            >
              Start a Return <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* What's eligible */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="rounded-xl border border-emerald-800/40 bg-emerald-900/10 p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-emerald-500" /> Eligible for Return
            </h2>
            <ul className="space-y-2.5">
              {ELIGIBLE.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-zinc-300">
                  <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-red-800/40 bg-red-900/10 p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-500" /> Not Eligible for Return
            </h2>
            <ul className="space-y-2.5">
              {NOT_ELIGIBLE.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-zinc-300">
                  <XCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Refund timeline */}
        <section>
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-red-500" /> Refund Timeline
          </h2>
          <div className="rounded-xl border border-zinc-800 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-800 border-b border-zinc-700">
                  <th className="text-left px-5 py-3.5 font-semibold text-zinc-300">Payment Method</th>
                  <th className="text-left px-5 py-3.5 font-semibold text-zinc-300">Refund Time After Inspection</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {REFUND_TIMELINE.map(({ method, time }) => (
                  <tr key={method} className="bg-zinc-900 hover:bg-zinc-800 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-white">{method}</td>
                    <td className="px-5 py-3.5 text-zinc-400">{time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="border-t border-zinc-800 bg-zinc-900 px-5 py-3">
              <p className="text-xs text-zinc-500">
                Inspection is completed within 2 business days of receiving the return. Refund timing after inspection depends on your financial institution.
              </p>
            </div>
          </div>
        </section>

        {/* Warranty note */}
        <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="flex gap-4">
            <AlertCircle className="h-6 w-6 text-yellow-500 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-lg font-bold text-white mb-2">Warranty Claims vs. Returns</h2>
              <p className="text-sm text-zinc-400 leading-relaxed mb-3">
                Defective parts that fail after proper installation are handled as <strong className="text-white">warranty claims</strong>,
                not standard returns. Most parts carry a manufacturer warranty of 1–2 years. Contact us with your
                order number, proof of installation, and a description or photos of the defect. Warranty replacements
                typically ship within 1–2 business days at no charge.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-red-400 hover:text-red-300 transition-colors"
              >
                File a Warranty Claim <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQS.map(({ q, a }) => (
              <div key={q} className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
                <h3 className="text-sm font-semibold text-white mb-2">{q}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact footer */}
        <section className="rounded-xl border border-zinc-700 bg-zinc-900 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-white mb-1">Still have questions about returns?</h3>
            <p className="text-sm text-zinc-400">Our team is available Monday–Saturday and will resolve your issue on the first contact.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="tel:+18007625832"
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold px-5 py-2.5 text-sm transition-colors"
            >
              <Phone className="h-4 w-4" /> 1-800-762-5832
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-semibold px-5 py-2.5 text-sm transition-colors"
            >
              Email Support
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
