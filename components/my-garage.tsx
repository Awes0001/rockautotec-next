"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Car, ChevronDown, X, Check, AlertTriangle, Plus, Pencil, Clock } from "lucide-react";
import { doesPartFit } from "@/data/fitment";
import VehicleSearch, { type VehicleSelection } from "@/components/vehicle-search";

// ─── Storage ─────────────────────────────────────────────────────────────────

const GARAGE_KEY = "rkt_garage";
const ACTIVE_VEHICLE_KEY = "rkt_active_vehicle";

export interface SavedVehicle {
  id: string;
  year: string;
  make: string;
  model: string;
  trim: string;
  engine: string;
  driveType: string;
  bodyStyle: string;
  /** User-assigned label (e.g. "My Daily Driver"). Falls back to the vehicle description when empty. */
  nickname: string;
  addedAt: number;
  lastUsedAt: number;
}

function readGarage(): SavedVehicle[] {
  try {
    const raw = localStorage.getItem(GARAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    // Backward-compatible with vehicles saved before trim/engine/nickname existed
    return (parsed as Partial<SavedVehicle>[]).map((v) => ({
      id: v.id ?? "",
      year: v.year ?? "",
      make: v.make ?? "",
      model: v.model ?? "",
      trim: v.trim ?? "",
      engine: v.engine ?? "",
      driveType: v.driveType ?? "",
      bodyStyle: v.bodyStyle ?? "",
      nickname: v.nickname ?? "",
      addedAt: v.addedAt ?? Date.now(),
      lastUsedAt: v.lastUsedAt ?? v.addedAt ?? Date.now(),
    }));
  } catch {
    return [];
  }
}

function writeGarage(vehicles: SavedVehicle[]) {
  try {
    localStorage.setItem(GARAGE_KEY, JSON.stringify(vehicles));
  } catch {
    // localStorage unavailable — skip silently
  }
}

function readActiveVehicleId(): string | null {
  try {
    return localStorage.getItem(ACTIVE_VEHICLE_KEY);
  } catch {
    return null;
  }
}

function writeActiveVehicleId(id: string | null) {
  try {
    if (id) localStorage.setItem(ACTIVE_VEHICLE_KEY, id);
    else localStorage.removeItem(ACTIVE_VEHICLE_KEY);
  } catch {
    // localStorage unavailable — skip silently
  }
}

export function vehicleLabel(v: SavedVehicle): string {
  if (v.nickname) return v.nickname;
  return [v.year, v.make, v.model, v.trim].filter(Boolean).join(" ");
}

// ─── useGarage hook ─────────────────────────────────────────────────────────────
// Single shared in-memory store + listener pattern so every component using
// useGarage() stays in sync without prop drilling or a context provider.

type Listener = () => void;
const listeners = new Set<Listener>();
let cachedVehicles: SavedVehicle[] | null = null;
let cachedActiveId: string | null | undefined = undefined;

function getVehiclesCache(): SavedVehicle[] {
  if (cachedVehicles === null) cachedVehicles = readGarage();
  return cachedVehicles;
}

function getActiveIdCache(): string | null {
  if (cachedActiveId === undefined) cachedActiveId = readActiveVehicleId();
  return cachedActiveId;
}

function notify() {
  listeners.forEach((l) => l());
}

export function useGarage() {
  const [, setTick] = useState(0);

  useEffect(() => {
    const listener = () => setTick((t) => t + 1);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const vehicles = getVehiclesCache();
  const activeId = getActiveIdCache();
  const activeVehicle = vehicles.find((v) => v.id === activeId) ?? null;

  // Most-recently-used first, capped to the 3 most recent — for "Recently Used" UI.
  const recentlyUsed = [...vehicles].sort((a, b) => b.lastUsedAt - a.lastUsedAt).slice(0, 3);

  const addVehicle = useCallback((vehicle: VehicleSelection) => {
    const now = Date.now();
    const newVehicle: SavedVehicle = {
      id: `${vehicle.year}-${vehicle.make}-${vehicle.model}-${vehicle.trim}-${vehicle.engine}-${now}`
        .toLowerCase()
        .replace(/\s+/g, "-"),
      year: vehicle.year,
      make: vehicle.make,
      model: vehicle.model,
      trim: vehicle.trim,
      engine: vehicle.engine,
      driveType: vehicle.driveType,
      bodyStyle: vehicle.bodyStyle,
      nickname: "",
      addedAt: now,
      lastUsedAt: now,
    };
    const next = [newVehicle, ...getVehiclesCache()];
    cachedVehicles = next;
    writeGarage(next);
    // First saved vehicle automatically becomes the active one
    if (!getActiveIdCache()) {
      cachedActiveId = newVehicle.id;
      writeActiveVehicleId(newVehicle.id);
    }
    notify();
    return newVehicle;
  }, []);

  const removeVehicle = useCallback((id: string) => {
    const next = getVehiclesCache().filter((v) => v.id !== id);
    cachedVehicles = next;
    writeGarage(next);
    if (getActiveIdCache() === id) {
      const fallback = next[0]?.id ?? null;
      cachedActiveId = fallback;
      writeActiveVehicleId(fallback);
    }
    notify();
  }, []);

  const setActiveVehicle = useCallback((id: string | null) => {
    cachedActiveId = id;
    writeActiveVehicleId(id);
    // Touch lastUsedAt so "Recently Used" reflects what's actually being used.
    if (id) {
      const next = getVehiclesCache().map((v) => (v.id === id ? { ...v, lastUsedAt: Date.now() } : v));
      cachedVehicles = next;
      writeGarage(next);
    }
    notify();
  }, []);

  const renameVehicle = useCallback((id: string, nickname: string) => {
    const next = getVehiclesCache().map((v) => (v.id === id ? { ...v, nickname: nickname.trim() } : v));
    cachedVehicles = next;
    writeGarage(next);
    notify();
  }, []);

  return { vehicles, activeVehicle, recentlyUsed, addVehicle, removeVehicle, setActiveVehicle, renameVehicle };
}

// ─── GarageDropdown (desktop navbar) ───────────────────────────────────────────

export function GarageDropdown() {
  const { vehicles, activeVehicle, removeVehicle, setActiveVehicle } = useGarage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Most-recently-used first so the list stays relevant as the garage grows.
  const sorted = [...vehicles].sort((a, b) => b.lastUsedAt - a.lastUsedAt);

  return (
    <div ref={ref} className="relative hidden lg:flex">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
      >
        <Car className="h-4 w-4" />
        <span>{activeVehicle ? vehicleLabel(activeVehicle) : "My Garage"}</span>
        <ChevronDown className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-1 w-72 rounded-xl border border-zinc-700 bg-zinc-900 shadow-2xl shadow-black/60 z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-zinc-800">
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">My Garage</p>
          </div>

          {sorted.length === 0 ? (
            <p className="px-4 py-4 text-sm text-zinc-500">No saved vehicles yet.</p>
          ) : (
            <ul className="max-h-64 overflow-y-auto divide-y divide-zinc-800">
              {sorted.map((v) => (
                <li key={v.id} className="flex items-center gap-2 px-4 py-2.5">
                  <button
                    onClick={() => setActiveVehicle(v.id)}
                    className="flex-1 flex items-center gap-2 text-left min-w-0"
                  >
                    <span
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                        activeVehicle?.id === v.id ? "border-red-500 bg-red-600" : "border-zinc-600"
                      }`}
                    >
                      {activeVehicle?.id === v.id && <Check className="h-2.5 w-2.5 text-white" />}
                    </span>
                    <span className="text-sm text-zinc-200 truncate">{vehicleLabel(v)}</span>
                  </button>
                  <button
                    onClick={() => removeVehicle(v.id)}
                    className="shrink-0 text-zinc-500 hover:text-red-400 transition-colors"
                    aria-label="Remove vehicle"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          )}

          <Link
            href="/fitment"
            onClick={() => setOpen(false)}
            className="flex items-center gap-1.5 px-4 py-3 border-t border-zinc-800 text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-zinc-800/50 transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            Add a Vehicle
          </Link>
        </div>
      )}
    </div>
  );
}

// ─── GarageBanner (product page) ───────────────────────────────────────────────

export function GarageBanner({ sku }: { sku: string }) {
  const { activeVehicle } = useGarage();

  if (!activeVehicle) {
    return (
      <Link
        href="/fitment"
        className="flex items-center gap-2.5 rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-300 hover:border-red-600 hover:text-white transition-colors"
      >
        <Car className="h-4 w-4 text-red-500 shrink-0" />
        Add your vehicle to check fitment
      </Link>
    );
  }

  const year = parseInt(activeVehicle.year, 10);
  const fits = doesPartFit(sku, year, activeVehicle.make, activeVehicle.model);
  const vehicleLabelText = vehicleLabel(activeVehicle);

  if (fits) {
    return (
      <div className="flex items-center gap-2.5 rounded-lg border border-emerald-800/50 bg-emerald-950/30 px-4 py-3 text-sm">
        <Check className="h-4 w-4 text-emerald-400 shrink-0" />
        <span className="text-emerald-300">
          Fits your <strong className="text-white">{vehicleLabelText}</strong>
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2.5 rounded-lg border border-amber-800/50 bg-amber-950/30 px-4 py-3 text-sm">
      <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
      <span className="text-amber-300">
        Fitment not confirmed for your <strong className="text-white">{vehicleLabelText}</strong> —{" "}
        <Link href="/fitment" className="underline underline-offset-2 hover:text-amber-200">
          verify before ordering
        </Link>
      </span>
    </div>
  );
}

// ─── GarageManager (fitment page "My Garage" section) ──────────────────────────

export function GarageManager() {
  const { vehicles, activeVehicle, recentlyUsed, addVehicle, removeVehicle, setActiveVehicle, renameVehicle } = useGarage();
  const [showForm, setShowForm] = useState(false);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");

  function handleSave(selection: VehicleSelection) {
    addVehicle(selection);
    setShowForm(false);
  }

  function startRename(v: SavedVehicle) {
    setRenamingId(v.id);
    setRenameValue(v.nickname);
  }

  function commitRename() {
    if (renamingId) renameVehicle(renamingId, renameValue);
    setRenamingId(null);
  }

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-bold text-white">My Garage</h2>
          <p className="text-sm text-zinc-400 mt-0.5">Save multiple vehicles for instant fitment checks across the site.</p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-sm font-semibold px-4 py-2 transition-colors shrink-0"
          >
            <Plus className="h-4 w-4" />
            Add Vehicle
          </button>
        )}
      </div>

      {showForm && (
        <div className="mb-6 rounded-xl border border-zinc-700 bg-zinc-800/60 p-4">
          <VehicleSearch onSearch={handleSave} variant="compact" />
          <button
            onClick={() => setShowForm(false)}
            className="mt-3 text-xs text-zinc-500 hover:text-white transition-colors"
          >
            Cancel
          </button>
        </div>
      )}

      {recentlyUsed.length > 1 && (
        <div className="mb-5">
          <p className="flex items-center gap-1.5 text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-2.5">
            <Clock className="h-3 w-3" /> Recently Used
          </p>
          <div className="flex flex-wrap gap-2">
            {recentlyUsed.map((v) => (
              <button
                key={v.id}
                onClick={() => setActiveVehicle(v.id)}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  activeVehicle?.id === v.id
                    ? "border-red-600 bg-red-950/30 text-red-400"
                    : "border-zinc-700 bg-zinc-800 text-zinc-300 hover:border-zinc-600"
                }`}
              >
                {vehicleLabel(v)}
              </button>
            ))}
          </div>
        </div>
      )}

      {vehicles.length === 0 ? (
        <p className="text-sm text-zinc-500">No saved vehicles yet. Add one to get fitment confirmation on every part page.</p>
      ) : (
        <ul className="space-y-2.5">
          {vehicles.map((v) => {
            const isActive = activeVehicle?.id === v.id;
            const isRenaming = renamingId === v.id;
            return (
              <li
                key={v.id}
                className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3 transition-colors ${
                  isActive ? "border-red-600 bg-red-950/20" : "border-zinc-800 bg-zinc-950"
                }`}
              >
                <button
                  onClick={() => !isRenaming && setActiveVehicle(v.id)}
                  className="flex items-center gap-3 text-left min-w-0 flex-1"
                  disabled={isRenaming}
                >
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                      isActive ? "border-red-500 bg-red-600" : "border-zinc-600"
                    }`}
                  >
                    {isActive && <Check className="h-3 w-3 text-white" />}
                  </span>
                  <div className="min-w-0 flex-1">
                    {isRenaming ? (
                      <input
                        autoFocus
                        value={renameValue}
                        onChange={(e) => setRenameValue(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => { if (e.key === "Enter") commitRename(); if (e.key === "Escape") setRenamingId(null); }}
                        onBlur={commitRename}
                        placeholder="Vehicle nickname"
                        className="w-full rounded border border-zinc-600 bg-zinc-800 px-2 py-1 text-sm text-white focus:outline-none focus:border-red-500"
                      />
                    ) : (
                      <>
                        <p className="text-sm font-semibold text-white truncate">{vehicleLabel(v)}</p>
                        <p className="text-xs text-zinc-500">
                          {[v.engine, v.driveType, v.bodyStyle].filter(Boolean).join(" · ") || "Engine not specified"}
                        </p>
                      </>
                    )}
                  </div>
                </button>
                <div className="flex items-center gap-3 shrink-0">
                  {isActive && !isRenaming && (
                    <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider">Active</span>
                  )}
                  {!isRenaming && (
                    <button
                      onClick={() => startRename(v)}
                      className="text-zinc-500 hover:text-white transition-colors"
                      aria-label="Rename vehicle"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                  )}
                  <button
                    onClick={() => removeVehicle(v.id)}
                    className="text-zinc-500 hover:text-red-400 transition-colors"
                    aria-label="Remove vehicle"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
