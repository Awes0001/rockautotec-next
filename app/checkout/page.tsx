"use client";

import { useState } from "react";
import { useCart } from "@/components/cart-context";
import { useAuth } from "@/components/auth-context";
import { useRouter } from "next/navigation";
import { supabase } from "@/components/supabase";

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [placed, setPlaced] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    address: "", city: "", zip: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleOrder() {
    const allFilled = Object.values(form).every((v) => v.trim() !== "");
    if (!allFilled) return alert("Please fill all fields!");

    if (user) {
      await supabase.from("orders").insert({
        user_id: user.id,
        items: cart,
        total: totalPrice,
        ...form,
      });
    }

    setPlaced(true);
    clearCart();
    setTimeout(() => router.push("/"), 3000);
  }

  if (placed) {
    return (
      <main className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-4">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className