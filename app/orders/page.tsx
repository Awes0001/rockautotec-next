"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth-context";
import { supabase } from "@/components/supabase";
import Link from "next/link";

interface Order {
  id: number;
  created_at: string;
  items: any[];
  total: number;
  status: string;
  name: string;
  city: string;
}

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("orders")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setOrders(data ?? []);
        setLoading(false);
      });
  }, [user]);

  if (!user) {
    return (
      <main className="min-h-screen bg-gray-950 flex flex-col items-center justify-center">
        <p className="text-white text-xl mb-4">Please sign in to view orders</p>
        <Link href="/login" className="bg-red-600 text-white px-6 py-3 rounded-xl">Sign In</Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-950 px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">📦 My Orders</h1>

        {loading && <p className="text-gray-400">Loading...</p>}

        {!loading && orders.length === 0 && (
          <div className="text-center">
            <p className="text-gray-400 mb-4">No orders yet!</p>
            <Link href="/" className="bg-red-600 text-white px-6 py-3 rounded-xl">Shop Now</Link>
          </div>
        )}

        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-white font-semibold">Order #{order.id}</p>
                  <p className="text-gray-400 text-sm">{new Date(order.created_at).toLocaleDateString()}</p>
                </div>
                <span className="bg-green-900 text-green-400 text-xs px-3 py-1 rounded-full">
                  {order.status}
                </span>
              </div>
              <div className="border-t border-gray-800 pt-4">
                {order.items?.map((item: any, i: number) => (
                  <div key={i} className="flex justify-between text-sm mb-2">
                    <p className="text-gray-300">{item.part}</p>
                    <p className="text-white">${item.price}</p>
                  </div>
                ))}
                <div className="border-t border-gray-800 mt-3 pt-3 flex justify-between">
                  <p className="text-white font-bold">Total</p>
                  <p className="text-white font-bold">${order.total?.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}