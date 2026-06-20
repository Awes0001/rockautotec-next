import Link from "next/link";
import { getCategories } from "@/components/supabase-data";

interface Props {
  searchParams: Promise<{ year?: string; make?: string; model?: string }>;
}

const categoryIcons: Record<string, string> = {
  "Brake System": "🛑",
  "Engine Parts": "⚙️",
  "Cooling System": "❄️",
  "Suspension": "🔩",
  "Electrical": "⚡",
  "Exhaust": "💨",
};

export default async function PartsPage({ searchParams }: Props) {
  const { year, make, model } = await searchParams;
  const categories = await getCategories();

  return (
    <main className="min-h-screen bg-gray-950 px-4 py-10">
      <div className="max-w-4xl mx-auto mb-8">
        <p className="text-gray-400 text-sm mb-1">Vehicle Selected</p>
        <h1 className="text-3xl font-bold text-white">{year} {make} {model}</h1>
        <p className="text-gray-400 mt-1">Select a category to find parts</p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((cat) => {
          const params = new URLSearchParams({
            id: cat.id.toString(),
            name: cat.name,
            ...(year && { year }),
            ...(make && { make }),
            ...(model && { model }),
          });
          return (
            <Link
              key={cat.id}
              href={`/category?${params.toString()}`}
              className="bg-gray-900 border border-gray-800 hover:border-red-500 rounded-xl p-6 flex flex-col items-center justify-center gap-3 transition-all duration-200 hover:bg-gray-800"
            >
              <span className="text-4xl">{categoryIcons[cat.name] ?? "🔧"}</span>
              <span className="text-white font-semibold text-center">{cat.name}</span>
            </Link>
          );
        })}
      </div>

      <div className="max-w-4xl mx-auto mt-8">
        <Link href="/" className="text-gray-400 hover:text-white text-sm transition-colors">
          ← Change Vehicle
        </Link>
      </div>
    </main>
  );
}