"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Phone, Mail, Clock, MapPin, Send, CheckCircle,
  MessageSquare, Headphones, Wrench, ChevronDown, ChevronUp,
} from "lucide-react";

const SUBJECTS = [
  "Order Status / Tracking",
  "Returns & Exchanges",
  "Part Fitment Question",
  "Product Availability",
  "Billing & Payment",
  "Dealer / Wholesale Inquiry",
  "Feedback & Suggestions",
  "Other",
];

const FAQS = [
  {
    q: "How do I track my order?",
    a: "Once your order ships you'll receive a confirmation email with a tracking number. You can also track orders under My Account → Order History.",
  },
  {
    q: "What is your return window?",
    a: "We accept returns on most parts within 90 days of delivery. Parts must be in new, uninstalled condition in original packaging. See our Return Policy for full details.",
  },
  {
    q: "Do you price match?",
    a: "Yes. If you find an identical part (same brand, part number, and condition) at a lower price from an authorized retailer, contact us and we'll match it.",
  },
  {
    q: "Can I change or cancel my order?",
    a: "Orders can be modified or cancelled within 1 hour of placement. After that, they enter our fulfillment system. Contact us immediately and we'll do our best to help.",
  },
  {
    q: "Do you ship internationally?",
    a: "We ship to Canada and Mexico. International orders typically arrive in 7–14 business days. Duties and taxes are the responsibility of the recipient.",
  },
];

export default function ContactPage() {
  const [open, setOpen] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    subject: "", orderNumber: "", message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      {/* Hero */}
      <section className="relative overflow-hidden bg-zinc-900 border-b border-zinc-800">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 80% 40%, #dc2626 0%, transparent 60%)" }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-600/10 px-4 py-1.5 text-sm text-red-400">
              <Headphones className="h-3.5 w-3.5" />
              We&apos;re Here to Help
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              Contact <span className="text-red-500">Our Team</span>
            </h1>
            <p className="mt-4 text-zinc-400 text-lg leading-relaxed">
              ASE-certified experts are standing by Monday through Saturday. Average response
              time under 2 minutes by phone, under 4 hours by email.
            </p>
          </div>
        </div>
      </section>

      {/* Contact cards */}
      <section className="bg-zinc-900 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: Phone,
                title: "Call Us",
                primary: "1-844-408-3004",
                secondary: "Mon–Sat 7am–9pm CT",
                action: "tel:+18444083004",
                label: "Call Now",
              },
              {
                icon: Mail,
                title: "Email Us",
                primary: "support@rockautotec.com",
                secondary: "Reply within 4 hours",
                action: "mailto:support@rockautotec.com",
                label: "Send Email",
              },
              {
                icon: MessageSquare,
                title: "Live Chat",
                primary: "Chat with an Expert",
                secondary: "Mon–Sat 8am–8pm CT",
                action: "#chat",
                label: "Start Chat",
              },
              {
                icon: MapPin,
                title: "Headquarters",
                primary: "Dallas, TX 75201",
                secondary: "Distribution also in Columbus, OH",
                action: "#",
                label: "Get Directions",
              },
            ].map(({ icon: Icon, title, primary, secondary, action, label }) => (
              <div key={title} className="rounded-xl border border-zinc-700 bg-zinc-800 p-5 flex flex-col gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600/15 text-red-500">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">{title}</p>
                  <p className="text-sm font-semibold text-white mt-1">{primary}</p>
                  <p className="text-xs text-zinc-500 mt-0.5">{secondary}</p>
                </div>
                <a
                  href={action}
                  className="mt-auto text-xs font-semibold text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
                >
                  {label} →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Hours */}
      <section className="bg-zinc-950 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Contact form */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-white mb-2">Send Us a Message</h2>
              <p className="text-sm text-zinc-400 mb-8">
                Fill out the form below and a team member will respond within 4 business hours.
              </p>

              {submitted ? (
                <div className="rounded-xl border border-emerald-700 bg-emerald-900/20 p-8 text-center">
                  <CheckCircle className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Message Received!</h3>
                  <p className="text-zinc-400 text-sm mb-6">
                    Thanks, {form.firstName}. We&apos;ll reply to{" "}
                    <span className="text-white">{form.email}</span> within 4 business hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ firstName:"", lastName:"", email:"", phone:"", subject:"", orderNumber:"", message:"" }); }}
                    className="text-sm text-red-400 hover:text-red-300 transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="firstName" required value={form.firstName} onChange={handleChange}
                        placeholder="John"
                        className="w-full rounded-lg border border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500 px-4 py-3 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="lastName" required value={form.lastName} onChange={handleChange}
                        placeholder="Smith"
                        className="w-full rounded-lg border border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500 px-4 py-3 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email" name="email" required value={form.email} onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full rounded-lg border border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500 px-4 py-3 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel" name="phone" value={form.phone} onChange={handleChange}
                        placeholder="(555) 000-0000"
                        className="w-full rounded-lg border border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500 px-4 py-3 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          name="subject" required value={form.subject} onChange={handleChange}
                          className="w-full appearance-none rounded-lg border border-zinc-700 bg-zinc-800 text-white px-4 py-3 pr-10 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors cursor-pointer"
                        >
                          <option value="">Select a subject</option>
                          {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                        Order Number (if applicable)
                      </label>
                      <input
                        name="orderNumber" value={form.orderNumber} onChange={handleChange}
                        placeholder="RAT-000000"
                        className="w-full rounded-lg border border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500 px-4 py-3 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message" required value={form.message} onChange={handleChange}
                      rows={6}
                      placeholder="Please describe your question or issue in as much detail as possible..."
                      className="w-full rounded-lg border border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500 px-4 py-3 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-semibold px-8 py-3 text-sm transition-colors"
                  >
                    <Send className="h-4 w-4" /> Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar: hours + info */}
            <div className="space-y-5">
              <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-5 w-5 text-red-500" />
                  <h3 className="font-semibold text-white">Support Hours</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  {[
                    { day: "Monday – Friday", hours: "7:00 am – 9:00 pm CT" },
                    { day: "Saturday",        hours: "8:00 am – 6:00 pm CT" },
                    { day: "Sunday",          hours: "Closed"               },
                  ].map(({ day, hours }) => (
                    <li key={day} className="flex justify-between items-center py-1.5 border-b border-zinc-800 last:border-0">
                      <span className="text-zinc-400">{day}</span>
                      <span className={`font-medium ${hours === "Closed" ? "text-zinc-500" : "text-white"}`}>
                        {hours}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Wrench className="h-5 w-5 text-red-500" />
                  <h3 className="font-semibold text-white">Before You Contact Us</h3>
                </div>
                <ul className="space-y-3 text-sm text-zinc-400">
                  <li>
                    <span className="text-white font-medium block mb-0.5">Order Status</span>
                    Check your email for a shipping confirmation or log in to view your{" "}
                    <Link href="/orders" className="text-red-400 hover:text-red-300">Order History</Link>.
                  </li>
                  <li>
                    <span className="text-white font-medium block mb-0.5">Returns</span>
                    Review our{" "}
                    <Link href="/returns" className="text-red-400 hover:text-red-300">Return Policy</Link>{" "}
                    and submit a return request from your account.
                  </li>
                  <li>
                    <span className="text-white font-medium block mb-0.5">Fitment Questions</span>
                    Use the vehicle selector on any product page to check compatibility before calling.
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-red-900/40 bg-red-900/10 p-5">
                <p className="text-sm text-red-400 font-semibold mb-1">Need Immediate Help?</p>
                <p className="text-xs text-zinc-400 mb-3">For urgent order issues, calling is fastest.</p>
                <a
                  href="tel:+18007625832"
                  className="flex items-center justify-center gap-2 w-full rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold py-2.5 text-sm transition-colors"
                >
                  <Phone className="h-4 w-4" /> 1-800-762-5832
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-zinc-900 border-t border-zinc-800 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Frequently Asked Questions</h2>
            <p className="mt-2 text-zinc-400 text-sm">Quick answers to common questions</p>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="rounded-xl border border-zinc-700 bg-zinc-800 overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-sm font-semibold text-white">{faq.q}</span>
                  {open === i
                    ? <ChevronUp className="h-4 w-4 text-red-500 shrink-0" />
                    : <ChevronDown className="h-4 w-4 text-zinc-400 shrink-0" />}
                </button>
                {open === i && (
                  <div className="px-5 pb-4 border-t border-zinc-700">
                    <p className="text-sm text-zinc-400 leading-relaxed pt-3">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
