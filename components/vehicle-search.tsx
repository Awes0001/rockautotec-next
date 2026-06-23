"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";
import { getAllMakes, getModelsForMake, getYearsForModel, getEnginesForVehicle } from "@/data/vehicles";

interface VehicleSelection {
  year: string;
  make: string;
  model: string;
  engine: string;
}

interface VehicleSearchProps {
  /** Called with the full selection once Year/Make/Model are all set and the button is clicked. */
  onSearch?: (selection: VehicleSelection) => void;
  /** Visual variant — "hero" is the larger 4-up layout, "compact" is a tighter inline row. */
  variant?: "hero" | "compact";
  className?: string;
}

const MAKES = getAllMakes();

export default function VehicleSearch({ onSearch, variant = "hero", className = "" }: VehicleSearchProps) {
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [engine, setEngine] = useState("");

  const models = make ? getModelsForMake(make) : [];
  const years = make && model ? getYearsForModel(make, model) : [];
  const engines = make && model && year ? getEnginesForVehicle(make, model, parseInt(year, 10)) : [];

  // Reset downstream selections when an upstream field changes
  useEffect(() => { setModel(""); setYear(""); setEngine(""); }, [make]);
  useEffect(() => { setYear(""); setEngine(""); }, [model]);
  useEffect(() => { setEngine(""); }, [year]);

  function handleSubmit() {
    if (year && make && model) {
      onSearch?.({ year, make, model, engine });
    }
  }

  const selectClass =
    "w-full appearance-none rounded-lg border border-zinc-600 bg-zinc-700 text-white px-3 py-3 pr-8 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors cursor-pointer disabled:opacity-40";

  const gridClass = variant === "hero" ? "grid grid-cols-2 sm:grid-cols-4 gap-3" : "grid grid-cols-2 sm:grid-cols-5 gap-2";

  return (
    <div className={className}>
      <div className={gridClass}>
        {/* Make */}
        <div className="relative">
          <select value={make} onChange={(e) => setMake(e.target.value)} className={selectClass}>
            <option value="">Make</option>
            {MAKES.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
        </div>

        {/* Model */}
        <div className="relative">
          <select value={model} onChange={(e) => setModel(e.target.value)} disabled={!make} className={selectClass}>
            <option value="">Model</option>
            {models.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
        </div>

        {/* Year */}
        <div className="relative">
          <select value={year} onChange={(e) => setYear(e.target.value)} disabled={!model} className={selectClass}>
            <option value="">Year</option>
            {years.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
        </div>

        {/* Engine */}
        <div className="relative">
          <select value={engine} onChange={(e) => setEngine(e.target.value)} disabled={!year} className={selectClass}>
            <option value="">Engine</option>
            {engines.map((e) => <option key={e} value={e}>{e}</option>)}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!year || !make || !model}
        className="mt-3 w-full rounded-lg bg-red-600 hover:bg-red-500 active:bg-red-700 disabled:bg-zinc-700 disabled:text-zinc-500 text-white font-semibold py-3.5 px-6 flex items-center justify-center gap-2 transition-colors text-sm"
      >
        <Search className="h-4 w-4" />
        Find Parts for My{" "}
        {year && make && model ? `${year} ${make} ${model}` : "Vehicle"}
      </button>
    </div>
  );
}
