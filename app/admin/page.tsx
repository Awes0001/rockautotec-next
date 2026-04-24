"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth-context";
import { supabase } from "@/components/supabase";

interface Part {
  id: number;
  name: string;
  price: number;
  category_id: number;
  in_stock: boolean;
}

interface Order {
  id: number;
  created_at: string;
  total: number;
  status: string;
  name: string;
  email: string;
}

export default function AdminPage() {
  const { user, loading: authLoading } = useAuth();
  const [tab, setTab] = useState<"parts" | "orders">("parts");
  const [parts, setParts] = useState<Part[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [newPart, setNewPart] = useState({ name: "", price: "", category_id: "" });
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    if (!user) return;
    loadData();
  }, [user, authLoading]);

  async function loadData() {
    const { data: partsData } = await supabase.from("parts").select("*").order("id");
    setParts(partsData ?? []);
    const { data: ordersData } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    setOrders(ordersData ?? []);
  }

  async function handleAddPart() {
    if (!newPart.name || !newPart.price || !newPart.category_id) return alert("Fill all fields!");
    setAdding(true);
    await supabase.from("parts").insert({
      name: newPart.name,
      price: parseFloat(newPart.price),
      category_id: parseInt(newPart.category_id),
    });
    setNewPart({ name: "", price: "", category_id: "" });
    setAdding(false);
    loadData();
  }

  async function handleDeletePart(id: number) {
    if (!confirm("Delete this part?")) return;
    await supabase.from("parts").delete().eq("id", id);
    loadData();
  }

  async function handleToggleStock(id: number, current: boolean) {
    await supabase.from("parts").update({ in_stock: !current }).eq("id", id);
    loadData();
  }

  if (authLoading) return (
    <main className="min-h-screen bg-gray-950 flex items-center justify-center">
      <p className="text-gray-400">Loading...</p>
    </main>
  );

  if (!user) return (
    <main className="min-h-screen bg-gray-950 flex items-center justify-center">
      <p className="text-white text-xl">Please sign in first!</p>
    </main>
  );

  return (
    <main className="min-h-screen bg-gray-950 px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">⚙️ Admin Panel</h1>
        <p className="text-gray-400 mb-8">Manage parts and orders</p>

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setTab("parts")}
            className={`px-6 py-2 rounded-xl font-semibold transition-colors ${tab === "parts" ? "bg-red-600 text-white" : "bg-gray-800 text-gray-400"}`}
          >
            🔧 Parts ({parts.length})
          </button>
          <button
            onClick={() => setTab("orders")}
            className={`px-6 py-2 rounded-xl font-semibold transition-colors ${tab === "orders" ? "bg-red-600 text-white" : "bg-gray-800 text-gray-400"}`}
          >
            📦 Orders ({orders.length})
          </button>
        </div>

        {tab === "parts" && (
          <div>
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
              <h2 className="text-white font-semibold mb-4">➕ Add New Part</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <input
                  placeholder="Part Name"
                  value={newPart.name}
                  onChange={(e) => setNewPart({ ...newPart, name: e.target.value })}
                  className="bg-gray-800 text-white border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 placeholder-gray-500"
                />
                <input
                  placeholder="Price (e.g. 49.99)"
                  value={newPart.price}
                  onChange={(e) => setNewPart({ ...newPart, price: e.target.value })}
                  className="bg-gray-800 text-white border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 placeholder-gray-500"
                />
                <input
                  placeholder="Category ID (1-6)"
                  value={newPart.category_id}
                  onChange={(e) => setNewPart({ ...newPart, category_id: e.target.value })}
                  className="bg-gray-800 text-white border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 placeholder-gray-500"
                />
              </div>
              <button
                onClick={handleAddPart}
                disabled={adding}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                {adding ? "Adding..." : "➕ Add Part"}
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {parts.map((part) => (
                <div key={part.id} className="bg-gray-900 border border-gray-800 rounded-xl px-6 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">{part.name}</p>
                    <p className="text-gray-400 text-sm">Category {part.category_id} · ${part.price}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleToggleStock(part.id, part.in_stock)}
                      className={`text-xs px-3 py-1 rounded-full font-semibold ${part.in_stock ? "bg-green-900 text-green-400" : "bg-red-900 text-red-400"}`}
                    >
                      {part.in_stock ? "In Stock" : "Out of Stock"}
                    </button>
                    <button
                      onClick={() => handleDeletePart(part.id)}
                      className="text-red-400 hover:text-red-300 text-sm transition-colors"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "orders" && (
          <div className="flex flex-col gap-4">
            {orders.length === 0 && <p className="text-gray-400">No orders yet!</p>}
            {orders.map((order) => (
              <div key={order.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white font-semibold">Order #{order.id}</p>
                    <p className="text-gray-400 text-sm">{order.name} · {order.email}</p>
                    <p className="text-gray-400 text-sm">{new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold">${order.total?.toFixed(2)}</p>
                    <span className="bg-green-900 text-green-400 text-xs px-3 py-1 rounded-full">
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}