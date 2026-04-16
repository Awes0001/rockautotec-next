"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/components/supabase";

interface Part {
  id: number;
  name: string;
  price: number;
  category_id: number;
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Part[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  async function handleSearch() {
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);
    const { data } = await supabase
      .from("parts")
      .select("*")
      .ilike("name", `%${query}%`);
    setResults(data ?? []);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-gray-950 px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">🔍 Search Parts</h1>

        {/* Search Input */}
        <div className="flex gap-3 mb-8">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search for a part... e.g. Brake Pads"
            className="flex-1 bg-gray-900 text-white border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 placeholder-gray-500"
          />
          <button
            onClick={handleSearch}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Search
          </button>
        </div>

        {/* Loading */}
        {loading && <p className="text-gray-400">Searching...</p>}

        {/* Results */}
        {!loading && searched && results.length === 0 && (
          <p className="text-gray-400">No parts found for "{query}"</p>
        )}

        {!loading && results.length > 0 && (
          <div className="flex flex-col gap-4">
            <p className="text-gray-400 text-sm">{results.length} parts found</p>
            {results.map((part) => (
              <div
                key={part.id}
                className="bg-gray-900 border border-gray-800 hover:border-red-500 rounded-xl px-6 py-5 flex items-center justify-between transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🔧</span>
                  <div>
                    <p className="text-white font-medium">{part.name}</p>
                    <p className="text-red-400 font-semibold">${part.price}</p>
                  </div>
                </div>
                <Link
                  href={`/part?part=${encodeURIComponent(part.name)}&price=${part.price}`}
                  className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-xl transition-colors"
                >
                  View
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}