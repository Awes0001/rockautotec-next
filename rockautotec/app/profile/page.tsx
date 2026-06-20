"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth-context";
import { supabase } from "@/components/supabase";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
  });

  useEffect(() => {
    if (!user) { router.push("/login"); return; }
    supabase.from("profiles").select("*").eq("id", user.id).single()
      .then(({ data }) => {
        if (data) setForm({
          full_name: data.full_name ?? "",
          phone: data.phone ?? "",
          address: data.address ?? "",
          city: data.city ?? "",
          zip: data.zip ?? "",
        });
        setLoading(false);
      });
  }, [user]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSave() {
    if (!user) return;
    setSaving(true);
    await supabase.from("profiles").upsert({ id: user.id, ...form });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (loading) return (
    <main className="min-h-screen bg-gray-950 flex items-center justify-center">
      <p className="text-gray-400">Loading...</p>
    </main>
  );

  return (
    <main className="min-h-screen bg-gray-950 px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">Profile</h1>
        <p className="text-gray-400 mb-8">{user?.email}</p>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
          <h2 className="text-white font-semibold text-lg mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 gap-4">
            {[
              { name: "full_name", placeholder: "Full Name" },
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
        <button
          onClick={handleSave}
          disabled={saving}
          className={`w-full font-semibold py-3 rounded-xl transition-colors ${saved ? "bg-green-600 text-white" : "bg-red-600 hover:bg-red-700 text-white"}`}
        >
          {saved ? "Saved!" : saving ? "Saving..." : "Save Profile"}
        </button>
      </div>
    </main>
  );
}