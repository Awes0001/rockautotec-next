import Link from "next/link";
import {
  Award, Users, Package, Truck, Shield, Star,
  ArrowRight, CheckCircle, Wrench, Clock,
} from "lucide-react";

const STATS = [
  { value: "2008",    label: "Founded"            },
  { value: "1M+",    label: "Parts In Stock"      },
  { value: "2.4M+",  label: "Orders Fulfilled"    },
  { value: "48K+",   label: "5-Star Reviews"      },
];

const VALUES = [
  {
    icon: Award,
    title: "Quality Without Compromise",
    desc: "We source exclusively from ISO-certified manufacturers. Every part is verified to meet or exceed OEM specifications before it reaches your door.",
  },
  {
    icon: Shield,
    title: "Fitment Guarantee",
    desc: "Our catalog team validates fitment data daily. If a part doesn't fit your vehicle, we cover return shipping and ship you the correct part at no extra cost.",
  },
  {
    icon: Users,
    title: "Customer-First Service",
    desc: "Real automotive experts answer your calls—not bots. Our average hold time is under 2 minutes and our team resolves 94% of issues on the first contact.",
  },
  {
    icon: Truck,
    title: "Speed You Can Count On",
    desc: "Orders placed before 4pm CT ship the same business day. We maintain strategically located distribution centers to reach 95% of the US in 2 days.",
  },
];

const TIMELINE = [
  { year: "2008", event: "Founded in Dallas, TX with a 10,000-part catalog and a mission to make quality parts accessible to every driver." },
  { year: "2011", event: "Expanded to a 120,000 sq ft warehouse facility and launched the vehicle-specific fitment system." },
  { year: "2014", event: "Surpassed 500,000 parts in catalog. Launched the Dealer Program, serving over 800 independent shops." },
  { year: "2017", event: "Opened East Coast distribution center, achieving 2-day shipping coverage for 80% of the continental US." },
  { year: "2020", event: "Crossed 1 million parts in stock. Launched mobile site and same-day shipping for select markets." },
  { year: "2024", event: "Fulfilled our 2 millionth order. Expanded international shipping to Canada and Mexico." },
  { year: "2026", event: "Today — serving 2.4M+ customers with over 1 million parts and a team of 340+ automotive professionals." },
];

const TEAM = [
  { name: "David Ortega",    role: "CEO & Co-Founder",          bio: "Former ASE Master Technician with 20 years in the industry. Built RockAutoTec to solve the parts availability problems he faced in his own shop." },
  { name: "Lisa Nguyen",     role: "VP of Operations",          bio: "Logistics expert who architected our same-day fulfillment system. Previously led supply chain for a Fortune 500 auto manufacturer." },
  { name: "Marcus Webb",     role: "Head of Catalog & Fitment", bio: "Oversees a team of 40 fitment specialists who verify 10,000+ part applications daily to ensure accuracy." },
  { name: "Priya Sharma",    role: "Director of Customer Experience", bio: "Led support at two top e-commerce companies before joining RockAutoTec to build our industry-leading service model." },
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
              RockAutoTec was founded in 2008 with a simple belief: every driver—
              professional technician or weekend DIYer—deserves access to quality auto parts
              at fair prices, backed by people who actually know cars.
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
                slow shipping, and customer service that doesn't understand cars. We set out to fix all of that.
              </p>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Today, RockAutoTec ships over 7,000 orders every business day from our two distribution
                centers in Dallas, TX and Columbus, OH. Our catalog spans over 1 million SKUs from 200+
                trusted brands, and our fitment team validates every application in our database.
              </p>
              <ul className="space-y-3">
                {[
                  "OEM-quality parts at competitive prices",
                  "Same-day shipping on in-stock orders before 4pm CT",
                  "Expert fitment guarantee on every order",
                  "ASE-certified support team available 6 days a week",
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
                  { icon: Package, label: "7,000+",  sub: "Orders/day"     },
                  { icon: Star,    label: "4.8/5",   sub: "Average rating" },
                  { icon: Clock,   label: "< 2 min", sub: "Avg hold time"  },
                  { icon: Truck,   label: "95%",     sub: "2-day US reach" },
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

      {/* Timeline */}
      <section className="bg-zinc-950 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Our Journey</h2>
            <p className="mt-2 text-zinc-400">From a small Dallas warehouse to a national parts leader</p>
          </div>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-zinc-800" />
            <div className="space-y-8">
              {TIMELINE.map(({ year, event }) => (
                <div key={year} className="relative flex gap-6 pl-14">
                  <div className="absolute left-0 flex h-12 w-12 items-center justify-center rounded-full border border-red-600/40 bg-red-600/10 text-red-500 text-xs font-bold shrink-0">
                    {year}
                  </div>
                  <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 flex-1">
                    <p className="text-sm text-zinc-300 leading-relaxed">{event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="bg-zinc-900 border-y border-zinc-800 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Our Leadership Team</h2>
            <p className="mt-2 text-zinc-400">Automotive professionals with deep industry experience</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TEAM.map(({ name, role, bio }) => (
              <div key={name} className="rounded-xl border border-zinc-700 bg-zinc-800 p-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600/15 border border-red-600/30 text-red-500 text-xl font-bold mb-4">
                  {name.split(" ").map((n) => n[0]).join("")}
                </div>
                <h3 className="font-semibold text-white">{name}</h3>
                <p className="text-xs text-red-400 mt-0.5 mb-3">{role}</p>
                <p className="text-xs text-zinc-400 leading-relaxed">{bio}</p>
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
            Over 1 million parts in stock, with same-day shipping and a fitment guarantee you can trust.
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
