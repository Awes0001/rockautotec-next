"use client";

import { useState } from "react";
import { useCart } from "@/components/cart-context";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [placed, setPlaced] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    address: "", city: "", zip: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleOrder() {
    const allFilled = Object.values(form).every((v) => v.trim() !== "");
    if (!allFilled) return alert("Please fill all fields!");
    setPlaced(true);
    clearCart();
    setTimeout(() => router.push("/"), 3000);
  }

  if (placed) {
    return (
      <main className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-4">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-3xl font-bold text-white mb-2">Order Placed!</h1>
        <p className="text-gray-400 mb-2">Thank you for your order.</p>
        <p className="text-gray-500 text-sm">Redirecting to home...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-950 px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">Checkout</h1>
        <p className="text-gray-400 mb-8">{cart.length} item{cart.length > 1 ? "s" : ""} · Total: ${totalPrice.toFixed(2)}</p>

        {/* Delivery Info */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
          <h2 className="text-white font-semibold text-lg mb-4">📦 Delivery Information</h2>
          <div className="grid grid-cols-1 gap-4">
            {[
              { name: "name", placeholder: "Full Name" },
              { name: "email", placeholder: "Email Address" },
              { name: "phone", placeholder: "Phone Number" },
              { name: "address", placeholder: "Street Address" },
              { name: "city", placeholder: "City" },
              { name: "zip", placeholder: "ZIP Code" },
            ].map((field) => (
              <input
                key={field.name}
                name={field.name}
                placeholder={field.placeholder}
                value={form[field.name as keyof typeof form]}
                onChange={handleChange}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 placeholder-gray-500"
              />
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
          <h2 className="text-white font-semibold text-lg mb-4">🧾 Order Summary</h2>
          {cart.map((item, i) => (
            <div key={i} className="flex justify-between text-sm mb-2">
              <p className="text-gray-300">{item.part} <span className="text-gray-500">({item.year} {item.make} {item.model})</span></p>
              <p className="text-white font-medium">${item.price.toFixed(2)}</p>
            </div>
          ))}
          <div className="border-t border-gray-800 mt-4 pt-4 flex justify-between">
            <p className="text-white font-bold">Total</p>
            <p className="text-white font-bold text-xl">${totalPrice.toFixed(2)}</p>
          </div>
        </div>

        {/* Place Order */}
        <button
          onClick={handleOrder}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 rounded-xl transition-colors text-lg"
        >
          🚀 Place Order
        </button>
      </div>
    </main>
  );
}