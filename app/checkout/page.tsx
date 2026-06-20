"use client";

import { useState } from "react";
import { useCart } from "@/components/cart-context";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Lock, Truck, CreditCard, Shield } from "lucide-react";

type FormData = {
  firstName: string; lastName: string; email: string; phone: string;
  address: string; city: string; state: string; zip: string;
  cardName: string; cardNumber: string; expiry: string; cvv: string;
};

const STATES = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [placed, setPlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormData>({
    firstName:"", lastName:"", email:"", phone:"",
    address:"", city:"", state:"", zip:"",
    cardName:"", cardNumber:"", expiry:"", cvv:"",
  });

  const shipping   = totalPrice >= 75 ? 0 : 7.99;
  const tax        = totalPrice * 0.0825;
  const orderTotal = totalPrice + shipping + tax;

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleOrder(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    clearCart();
    setPlaced(true);
    setLoading(false);
    setTimeout(() => router.push("/"), 5000);
  }

  if (cart.length === 0 && !placed) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-bold text-white mb-3">Your cart is empty</h1>
        <Link href="/" className="text-sm text-red-400 hover:text-red-300 transition-colors">← Go Shopping</Link>
      </div>
    );
  }

  if (placed) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-center px-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-900/30 border border-emerald-700 mb-6">
          <CheckCircle className="h-10 w-10 text-emerald-400" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Order Placed!</h1>
        <p className="text-zinc-400 mb-1">Thank you, {form.firstName}. Your order has been confirmed.</p>
        <p className="text-zinc-500 text-sm mb-6">A confirmation email will be sent to <span className="text-white">{form.email}</span>.</p>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 mb-8 text-sm text-left max-w-xs w-full">
          <p className="text-zinc-400">Estimated Delivery</p>
          <p className="text-white font-semibold mt-1">2–5 Business Days</p>
          <p className="text-zinc-400 mt-3">Shipping To</p>
          <p className="text-white font-semibold mt-1">{form.address}, {form.city}, {form.state} {form.zip}</p>
        </div>
        <p className="text-xs text-zinc-600">Redirecting to home in 5 seconds…</p>
        <Link href="/" className="mt-3 text-sm text-red-400 hover:text-red-300 transition-colors">Return Home →</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8 flex items-center gap-3">
          <Lock className="h-5 w-5 text-emerald-500" />
          <h1 className="text-2xl font-bold text-white">Secure Checkout</h1>
        </div>

        <form onSubmit={handleOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: form */}
            <div className="lg:col-span-2 space-y-6">

              {/* Delivery */}
              <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
                <h2 className="text-base font-semibold text-white mb-5 flex items-center gap-2">
                  <Truck className="h-4 w-4 text-red-500" /> Delivery Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {([["firstName","First Name",true],["lastName","Last Name",true],["email","Email Address",true],["phone","Phone Number",false]] as [keyof FormData, string, boolean][]).map(([name, label, req]) => (
                    <div key={name}>
                      <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                        {label} {req && <span className="text-red-500">*</span>}
                      </label>
                      <input
                        name={name} required={req} value={form[name]} onChange={handleChange}
                        type={name === "email" ? "email" : name === "phone" ? "tel" : "text"}
                        className="w-full rounded-lg border border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500 px-4 py-3 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                      />
                    </div>
                  ))}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">Street Address <span className="text-red-500">*</span></label>
                    <input name="address" required value={form.address} onChange={handleChange} placeholder="123 Main Street" className="w-full rounded-lg border border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500 px-4 py-3 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">City <span className="text-red-500">*</span></label>
                    <input name="city" required value={form.city} onChange={handleChange} placeholder="Dallas" className="w-full rounded-lg border border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500 px-4 py-3 text-sm focus:outline-none focus:border-red-500 transition-colors" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">State <span className="text-red-500">*</span></label>
                      <select name="state" required value={form.state} onChange={handleChange} className="w-full rounded-lg border border-zinc-700 bg-zinc-800 text-white px-4 py-3 text-sm focus:outline-none focus:border-red-500 transition-colors appearance-none cursor-pointer">
                        <option value="">Select</option>
                        {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">ZIP <span className="text-red-500">*</span></label>
                      <input name="zip" required value={form.zip} onChange={handleChange} placeholder="75201" maxLength={10} className="w-full rounded-lg border border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500 px-4 py-3 text-sm focus:outline-none focus:border-red-500 transition-colors" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
                <h2 className="text-base font-semibold text-white mb-5 flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-red-500" /> Payment Information
                  <span className="ml-auto flex items-center gap-1 text-xs text-emerald-400 font-normal">
                    <Lock className="h-3 w-3" /> SSL Secured
                  </span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">Name on Card <span className="text-red-500">*</span></label>
                    <input name="cardName" required value={form.cardName} onChange={handleChange} placeholder="John Smith" className="w-full rounded-lg border border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500 px-4 py-3 text-sm focus:outline-none focus:border-red-500 transition-colors" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">Card Number <span className="text-red-500">*</span></label>
                    <input name="cardNumber" required value={form.cardNumber} onChange={handleChange} placeholder="•••• •••• •••• ••••" maxLength={19} className="w-full rounded-lg border border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500 px-4 py-3 text-sm focus:outline-none focus:border-red-500 transition-colors font-mono" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">Expiry <span className="text-red-500">*</span></label>
                    <input name="expiry" required value={form.expiry} onChange={handleChange} placeholder="MM / YY" maxLength={7} className="w-full rounded-lg border border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500 px-4 py-3 text-sm focus:outline-none focus:border-red-500 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">CVV <span className="text-red-500">*</span></label>
                    <input name="cvv" required value={form.cvv} onChange={handleChange} placeholder="•••" maxLength={4} className="w-full rounded-lg border border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500 px-4 py-3 text-sm focus:outline-none focus:border-red-500 transition-colors font-mono" />
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-zinc-500">
                  {["Visa","Mastercard","Amex","Discover","PayPal","Apple Pay"].map((b) => (
                    <span key={b} className="rounded border border-zinc-700 bg-zinc-800 px-2.5 py-1">{b}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: summary */}
            <div>
              <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 sticky top-24">
                <h2 className="text-base font-bold text-white mb-4">Order Summary</h2>
                <div className="space-y-3 mb-4">
                  {cart.map((item, i) => (
                    <div key={i} className="flex items-start justify-between gap-3 text-sm">
                      <span className="text-zinc-300 leading-snug flex-1">{item.part}</span>
                      <span className="text-white font-medium shrink-0">${item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-zinc-800 pt-3 space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-zinc-400">Subtotal</span><span className="text-white">${totalPrice.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span className="text-zinc-400">Shipping</span><span className={shipping === 0 ? "text-emerald-400" : "text-white"}>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span></div>
                  <div className="flex justify-between"><span className="text-zinc-400">Tax</span><span className="text-white">${tax.toFixed(2)}</span></div>
                  <div className="border-t border-zinc-800 pt-2 flex justify-between font-bold">
                    <span className="text-white">Total</span>
                    <span className="text-white text-lg">${orderTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  type="submit" disabled={loading}
                  className="mt-5 w-full flex items-center justify-center gap-2 rounded-lg bg-red-600 hover:bg-red-500 active:bg-red-700 disabled:opacity-60 text-white font-semibold py-3.5 text-sm transition-colors"
                >
                  {loading ? (
                    <span className="flex items-center gap-2"><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg>Processing…</span>
                  ) : (
                    <><Lock className="h-4 w-4" /> Place Order — ${orderTotal.toFixed(2)}</>
                  )}
                </button>

                <div className="mt-4 space-y-2">
                  {[
                    { icon: Shield, text: "256-bit SSL encryption"    },
                    { icon: Truck,  text: "Estimated delivery 2–5 days"},
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2 text-xs text-zinc-500">
                      <Icon className="h-3.5 w-3.5 text-zinc-600 shrink-0" /> {text}
                    </div>
                  ))}
                </div>

                <p className="text-xs text-zinc-600 mt-4 leading-relaxed">
                  By placing your order you agree to our{" "}
                  <Link href="/terms" className="text-red-400 underline">Terms</Link>{" "}and{" "}
                  <Link href="/privacy" className="text-red-400 underline">Privacy Policy</Link>.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
