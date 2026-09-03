"use client";

import Link from "next/link";
import { Package, Truck, CheckCircle, Clock, ArrowRight, ShoppingCart } from "lucide-react";

const DEMO_ORDERS = [
  {
    id: "RAT-2026-94821",
    date: "Jun 12, 2026",
    status: "Delivered",
    statusColor: "text-emerald-400",
    statusBg: "bg-emerald-900/20 border-emerald-800/40",
    statusIcon: CheckCircle,
    total: 132.97,
    items: [
      { name: "Bosch QuietCast Brake Pad Set", sku: "BC0905", price: 42.99 },
      { name: "Raybestos Brake Rotor Pair",    sku: "980543R", price: 68.99 },
      { name: "Prestone DOT 4 Brake Fluid",    sku: "AS401",   price: 11.99 },
    ],
    tracking: "1Z999AA10123456784",
    carrier: "UPS",
  },
  {
    id: "RAT-2026-87443",
    date: "May 28, 2026",
    status: "Delivered",
    statusColor: "text-emerald-400",
    statusBg: "bg-emerald-900/20 border-emerald-800/40",
    statusIcon: CheckCircle,
    total: 89.99,
    items: [
      { name: "Monroe Shock Absorber – Rear Pair", sku: "MN5975", price: 89.99 },
    ],
    tracking: "1Z999AA10123456001",
    carrier: "UPS",
  },
  {
    id: "RAT-2026-81109",
    date: "May 10, 2026",
    status: "In Transit",
    statusColor: "text-yellow-400",
    statusBg: "bg-yellow-900/20 border-yellow-800/40",
    statusIcon: Truck,
    total: 213.98,
    items: [
      { name: "Gates Timing Belt Kit w/ Water Pump", sku: "TCKWP244A", price: 124.99 },
      { name: "Fel-Pro Head Gasket Set",              sku: "FP26376PT", price:  89.99 },
    ],
    tracking: "1Z999AA10123456999",
    carrier: "FedEx",
  },
];

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">My Orders</h1>
            <p className="text-zinc-400 text-sm mt-1">{DEMO_ORDERS.length} orders</p>
          </div>
          <Link href="/" className="inline-flex items-center gap-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold px-4 py-2.5 text-sm transition-colors">
            <ShoppingCart className="h-4 w-4" /> Shop Parts
          </Link>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {["All Orders", "In Transit", "Delivered", "Returns"].map((f, i) => (
            <button key={f} className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${i === 0 ? "bg-red-600 text-white" : "bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-700"}`}>
              {f}
            </button>
          ))}
        </div>

        {/* Order cards */}
        <div className="space-y-4">
          {DEMO_ORDERS.map((order) => {
            const StatusIcon = order.statusIcon;
            return (
              <div key={order.id} className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
                {/* Order header */}
                <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-zinc-800">
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div>
                      <p className="text-xs text-zinc-500 uppercase tracking-wider">Order</p>
                      <p className="font-mono font-semibold text-white">{order.id}</p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 uppercase tracking-wider">Placed</p>
                      <p className="text-zinc-300">{order.date}</p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 uppercase tracking-wider">Total</p>
                      <p className="font-semibold text-white">${order.total.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${order.statusBg} ${order.statusColor}`}>
                    <StatusIcon className="h-3.5 w-3.5" /> {order.status}
                  </div>
                </div>

                {/* Items */}
                <div className="px-5 py-4 space-y-3">
                  {order.items.map((item) => (
                    <div key={item.sku} className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-800 border border-zinc-700 text-base">🔧</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{item.name}</p>
                        <p className="text-xs text-zinc-500 font-mono">{item.sku}</p>
                      </div>
                      <p className="text-sm font-semibold text-white shrink-0">${item.price.toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 bg-zinc-950/50 border-t border-zinc-800">
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                    <Package className="h-3.5 w-3.5 text-zinc-500" />
                    {order.carrier} · <span className="font-mono text-zinc-300">{order.tracking}</span>
                  </div>
                  <div className="flex gap-3">
                    <button className="text-xs font-medium text-zinc-400 hover:text-white transition-colors">Track Package</button>
                    <button className="text-xs font-medium text-zinc-400 hover:text-white transition-colors">Return / Exchange</button>
                    <button className="text-xs font-medium text-red-400 hover:text-red-300 transition-colors flex items-center gap-1">
                      Reorder <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Help strip */}
        <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-red-500 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-white">Need help with an order?</p>
              <p className="text-xs text-zinc-400 mt-0.5">Our team is available Mon–Sat, 7am–9pm CT.</p>
            </div>
          </div>
          <div className="flex gap-3 shrink-0">
            <a href="tel:+18007625832" className="text-xs font-semibold text-red-400 hover:text-red-300 transition-colors">1-800-762-5832</a>
            <Link href="/contact" className="text-xs font-semibold text-zinc-400 hover:text-white transition-colors">Email Support</Link>
            <Link href="/returns" className="text-xs font-semibold text-zinc-400 hover:text-white transition-colors">Return Policy</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
