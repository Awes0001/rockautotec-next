"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth-context";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  User, Car, Package, Settings, CheckCircle,
  LogOut, Plus, X, Shield, Mail,
} from "lucide-react";

const STORAGE_KEY = "rockautotec_profile";

type ProfileData = {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
};

type GarageVehicle = { id: string; year: string; make: string; model: string };

type Tab = "account" | "garage";

const STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
  "VA","WA","WV","WI","WY",
];

export default function ProfilePage() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [tab, setTab]                     = useState<Tab>("account");
  const [saving, setSaving]               = useState(false);
  const [saved, setSaved]                 = useState(false);
  const [profile, setProfile]             = useState<ProfileData>({
    fullName: "", phone: "", address: "", city: "", state: "", zip: "",
  });
  const [garage, setGarage]               = useState<GarageVehicle[]>([]);
  const [showAdd, setShowAdd]             = useState(false);
  const [newVehicle, setNewVehicle]       = useState({ year: "", make: "", model: "" });

  useEffect(() => {
    if (!user) { router.push("/login"); return; }
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const { profile: p, garage: g } = JSON.parse(raw);
        if (p) setProfile(p);
        if (g) setGarage(g);
      }
    } catch {
      // ignore corrupt localStorage
    }
  }, [user, router]);

  function persist(next: { profile?: ProfileData; garage?: GarageVehicle[] }) {
    try {
      const current = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...current, ...next }));
    } catch {
      // ignore storage errors
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSave() {
    setSaving(true);
    persist({ profile });
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }, 500);
  }

  function addVehicle() {
    if (!newVehicle.year || !newVehicle.make || !newVehicle.model) return;
    const updated: GarageVehicle[] = [
      ...garage,
      { ...newVehicle, id: Date.now().toString() },
    ];
    setGarage(updated);
    persist({ garage: updated });
    setNewVehicle({ year: "", make: "", model: "" });
    setShowAdd(false);
  }

  function removeVehicle(id: string) {
    const updated = garage.filter((v) => v.id !== id);
    setGarage(updated);
    persist({ garage: updated });
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ── Header ────────────────────────────────────────────────────── */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">My Account</h1>
            <div className="flex items-center gap-1.5 mt-1.5">
              <Mail className="h-3.5 w-3.5 text-zinc-500" />
              <p className="text-zinc-400 text-sm">{user.email}</p>
            </div>
          </div>
          <button
            onClick={signOut}
            className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white px-4 py-2.5 text-sm font-medium transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>

        {/* ── Tab nav ───────────────────────────────────────────────────── */}
        <div className="flex gap-1 rounded-xl border border-zinc-800 bg-zinc-900 p-1 mb-6">
          {([
            { id: "account" as Tab, label: "Account Info", icon: Settings },
            { id: "garage"  as Tab, label: "My Garage",    icon: Car      },
          ]).map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                tab === id ? "bg-red-600 text-white" : "text-zinc-400 hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{label}</span>
              <span className="sm:hidden">{id === "account" ? "Account" : "Garage"}</span>
            </button>
          ))}
        </div>

        {/* ── Account tab ───────────────────────────────────────────────── */}
        {tab === "account" && (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
            {/* Avatar row */}
            <div className="flex items-center gap-4 px-6 py-5 border-b border-zinc-800 bg-zinc-950/40">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-red-900/30 border border-red-800/50">
                <User className="h-7 w-7 text-red-400" />
              </div>
              <div>
                <p className="font-semibold text-white">{profile.fullName || "Your Name"}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Shield className="h-3 w-3 text-emerald-500" />
                  <p className="text-xs text-zinc-400">Verified Account</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {([
                  ["fullName", "Full Name",       "text"],
                  ["phone",    "Phone Number",    "tel"],
                  ["address",  "Street Address",  "text"],
                  ["city",     "City",            "text"],
                ] as [keyof ProfileData, string, string][]).map(([name, label, type]) => (
                  <div key={name}>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                      {label}
                    </label>
                    <input
                      name={name}
                      type={type}
                      value={profile[name]}
                      onChange={handleChange}
                      placeholder={label}
                      className="w-full rounded-lg border border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500 px-4 py-3 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                    />
                  </div>
                ))}

                {/* State */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                    State
                  </label>
                  <select
                    name="state"
                    value={profile.state}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 text-white px-4 py-3 text-sm focus:outline-none focus:border-red-500 transition-colors appearance-none cursor-pointer"
                  >
                    <option value="">Select State</option>
                    {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                {/* ZIP */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                    ZIP Code
                  </label>
                  <input
                    name="zip"
                    type="text"
                    value={profile.zip}
                    onChange={handleChange}
                    placeholder="75201"
                    maxLength={10}
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500 px-4 py-3 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                  />
                </div>
              </div>

              {/* Footer actions */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-5 border-t border-zinc-800">
                <Link
                  href="/orders"
                  className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  <Package className="h-4 w-4" />
                  View Order History
                </Link>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors ${
                    saved
                      ? "bg-emerald-600 text-white"
                      : "bg-red-600 hover:bg-red-500 disabled:opacity-60 text-white"
                  }`}
                >
                  {saved ? (
                    <><CheckCircle className="h-4 w-4" /> Saved!</>
                  ) : saving ? (
                    "Saving…"
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Garage tab ────────────────────────────────────────────────── */}
        {tab === "garage" && (
          <div className="space-y-3">
            <p className="text-sm text-zinc-400 mb-4">
              Save your vehicles to quickly find compatible parts.
            </p>

            {garage.length === 0 && !showAdd && (
              <div className="rounded-xl border border-zinc-800 bg-zinc-900 py-12 flex flex-col items-center text-center px-4">
                <Car className="h-12 w-12 text-zinc-700 mb-4" />
                <p className="text-white font-semibold mb-1">No vehicles yet</p>
                <p className="text-sm text-zinc-500 mb-6">Add your car to find the right parts faster</p>
              </div>
            )}

            {garage.map((v) => (
              <div
                key={v.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 border border-zinc-700">
                    <Car className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{v.year} {v.make} {v.model}</p>
                    <p className="text-xs text-zinc-500 mt-0.5">Saved vehicle</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Link
                    href={`/?year=${v.year}&make=${v.make}&model=${v.model}`}
                    className="text-xs font-semibold text-red-400 hover:text-red-300 transition-colors"
                  >
                    Shop Parts →
                  </Link>
                  <button
                    onClick={() => removeVehicle(v.id)}
                    className="text-zinc-600 hover:text-red-400 transition-colors"
                    aria-label="Remove vehicle"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}

            {/* Add vehicle form */}
            {showAdd ? (
              <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-5">
                <p className="text-sm font-semibold text-white mb-4">Add Vehicle</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                  {(["year", "make", "model"] as const).map((f) => (
                    <div key={f}>
                      <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                      </label>
                      <input
                        value={newVehicle[f]}
                        onChange={(e) => setNewVehicle((prev) => ({ ...prev, [f]: e.target.value }))}
                        placeholder={f === "year" ? "2022" : f === "make" ? "Toyota" : "Camry"}
                        className="w-full rounded-lg border border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500 px-3 py-2.5 text-sm focus:outline-none focus:border-red-500 transition-colors"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={addVehicle}
                    className="flex-1 sm:flex-none rounded-lg bg-red-600 hover:bg-red-500 text-white text-sm font-semibold px-5 py-2.5 transition-colors"
                  >
                    Add to Garage
                  </button>
                  <button
                    onClick={() => { setShowAdd(false); setNewVehicle({ year: "", make: "", model: "" }); }}
                    className="rounded-lg border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white text-sm px-4 py-2.5 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowAdd(true)}
                className="w-full flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-zinc-700 hover:border-red-700/50 bg-transparent py-5 text-sm text-zinc-500 hover:text-white transition-all"
              >
                <Plus className="h-4 w-4" />
                Add a Vehicle
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
