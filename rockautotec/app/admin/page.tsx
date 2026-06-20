"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const vehicleData: Record<string, Record<string, string[]>> = {
  Toyota: {
    Camry: ["2018", "2019", "2020", "2021", "2022", "2023"],
    Corolla: ["2018", "2019", "2020", "2021", "2022", "2023"],
    Highlander: ["2018", "2019", "2020", "2021", "2022", "2023"],
    RAV4: ["2018", "2019", "2020", "2021", "2022", "2023"],
    Tacoma: ["2018", "2019", "2020", "2021", "2022", "2023"],
    Tundra: ["2018", "2019", "2020", "2021", "2022", "2023"],
  },
  Honda: {
    Civic: ["2018", "2019", "2020", "2021", "2022", "2023"],
    Accord: ["2018", "2019", "2020", "2021", "2022", "2023"],
    CRV: ["2018", "2019", "2020", "2021", "2022", "2023"],
    Pilot: ["2018", "2019", "2020", "2021", "2022", "2023"],
    Odyssey: ["2018", "2019", "2020", "2021", "2022", "2023"],
    Ridgeline: ["2018", "2019", "2020", "2021", "2022", "2023"],
  },
  Ford: {
    Mustang: ["2018", "2019", "2020", "2021", "2022", "2023"],
    F150: ["2018", "2019", "2020", "2021", "2022", "2023"],
    Explorer: ["2018", "2019", "2020", "2021", "2022", "2023"],
    Escape: ["2018", "2019", "2020", "2021", "2022", "2023"],
    Edge: ["2018", "2019", "2020", "2021", "2022", "2023"],
    Bronco: ["2021", "2022", "2023"],
  },
  BMW: {
    "3 Series": ["2018", "2019", "2020", "2021", "2022", "2023"],
    "5 Series": ["2018", "2019", "2020", "2021", "2022", "2023"],
    "7 Series": ["2018", "2019", "2020", "2021", "2022", "2023"],
    X3: ["2018", "2019", "2020", "2021", "2022", "2023"],
    X5: ["2018", "2019", "2020", "2021", "2022", "2023"],
    M3: ["2018", "2019", "2020", "2021", "2022", "2023"],
  },
  Mercedes: {
    "C Class": ["2018", "2019", "2020", "2021", "2022", "2023"],
    "E Class": ["2018", "2019", "2020", "2021", "2022", "2023"],
    "S Class": ["2018", "2019", "2020", "2021", "2022", "2023"],
    GLE: ["2018", "2019", "2020", "2021", "2022", "2023"],
    GLC: ["2018", "2019", "2020", "2021", "2022", "2023"],
    AMG: ["2018", "2019", "2020", "2021", "2022", "2023"],
  },
  Nissan: {
    Altima: ["2018", "2019", "2020", "2021", "2022", "2023"],
    Maxima: ["2018", "2019", "2020", "2021", "2022", "2023"],
    Rogue: ["2018", "2019", "2020", "2021", "2022", "2023"],
    Pathfinder: ["2018", "2019", "2020", "2021", "2022", "2023"],
    Frontier: ["2018", "2019", "2020", "2021", "2022", "2023"],
    Titan: ["2018", "2019", "2020", "2021", "2022", "2023"],
  },
  Chevrolet: {
    Silverado: ["2018", "2019", "2020", "2021", "2022", "2023"],
    Malibu: ["2018", "2019", "2020", "2021", "2022", "2023"],
    Equinox: ["2018", "2019", "2020", "2021", "2022", "2023"],
    Traverse: ["2018", "2019", "2020", "2021", "2022", "2023"],
    Tahoe: ["2018", "2019", "2020", "2021", "2022", "2023"],
    Camaro: ["2018", "2019", "2020", "2021", "2022", "2023"],
  },
  Hyundai: {
    Elantra: ["2018", "2019", "2020", "2021", "2022", "2023"],
    Sonata: ["2018", "2019", "2020", "2021", "2022", "2023"],
    Tucson: ["2018", "2019", "2020", "2021", "2022", "2023"],
    "Santa Fe": ["2018", "2019", "2020", "2021", "2022", "2023"],
    Palisade: ["2020", "2021", "2022", "2023"],
    Kona: ["2018", "2019", "2020", "2021", "2022", "2023"],
  },
  Jeep: {
    Wrangler: ["2018", "2019", "2020", "2021", "2022", "2023"],
    Cherokee: ["2018", "2019", "2020", "2021", "2022", "2023"],
    "Grand Cherokee": ["2018", "2019", "2020", "2021", "2022", "2023"],
    Compass: ["2018", "2019", "2020", "2021", "2022", "2023"],
    Renegade: ["2018", "2019", "2020", "2021", "2022", "2023"],
    Gladiator: ["2020", "2021", "2022", "2023"],
  },
  Volkswagen: {
    Jetta: ["2018", "2019", "2020", "2021", "2022", "2023"],
    Passat: ["2018", "2019", "2020", "2021", "2022", "2023"],
    Tiguan: ["2018", "2019", "2020", "2021", "2022", "2023"],
    Atlas: ["2018", "2019", "2020", "2021", "2022", "2023"],
    Golf: ["2018", "2019", "2020", "2021", "2022", "2023"],
    ID4: ["2021", "2022", "2023"],
  },
};

export default function HomePage() {
  const router = useRouter();
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");

  const makes = Object.keys(vehicleData);
  const models = make ? Object.keys(vehicleData[make]) : [];
  const years = make && model ? vehicleData[make][model] : [];

  function handleSearch() {
    if (!make || !model || !year) return alert("Please select all fields!");
    router.push(`/parts?year=${year}&make=${make}&model=${model}`);
  }

  return (
    <main className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-white mb-2">🔧 RockAutoTec</h1>
        <p className="text-gray-400 text-lg">Find the right parts for your vehicle</p>
      </div>
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 w-full max-w-md shadow-xl">
        <h2 className="text-white text-xl font-semibold mb-6">Select Your Vehicle</h2>
        <div className="mb-4">
          <label className="block text-gray-400 text-sm mb-1">Make</label>
          <select
            value={make}
            onChange={(e) => { setMake(e.target.value); setModel(""); setYear(""); }}
            className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500"
          >
            <option value="">Select Make</option>
            {makes.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-400 text-sm mb-1">Model</label>
          <select
            value={model}
            onChange={(e) => { setModel(e.target.value); setYear(""); }}
            disabled={!make}
            className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 disabled:opacity-40"
          >
            <option value="">Select Model</option>
            {models.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-gray-400 text-sm mb-1">Year</label>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            disabled={!model}
            className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 disabled:opacity-40"
          >
            <option value="">Select Year</option>
            {years.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
        <button
          onClick={handleSearch}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
        >
          🔍 Find Parts
        </button>
      </div>
    </main>
  );
}