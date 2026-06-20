import Link from "next/link";
import { getPartsByCategory } from "@/components/supabase-data";

interface Props {
  searchParams: Promise<{ id?: string; name?: string; year?: string; make?: string; model?: string }>;
}

export default async function CategoryPage({ searchParams }: Props) {
  const { id, name, year, make, model } = await searchParams;
  const parts = await getPartsByCategory(Number(id));

  return (
    <main className="min-h-screen bg-gray-950 px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <p className="text-gray-400 text-sm mb-1">{year} {make} {model}</p>
        <h1 className="text-3xl font-bold text-white mb-1">{name}</h1>
        <p className="text-gray-400 mb-8">{parts.length} parts available</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {parts.map((part) => {
            const params = new URLSearchParams({
              id: part.id.toString(),
              part: part.name,
              price: part.price.toString(),
              ...(year && { year }),
              ...(make && { make }),
              ...(model && { model }),
            });
            return (
              <Link
                key={part.id}
                href={`/part?${params.toString()}`}
                className="bg-gray-900 border border-gray-800 hover:border-red-500 rounded-xl px-6 py-5 flex items-center justify-between group transition-all duration-200 hover:bg-gray-800"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🔧</span>
                  <div>
                    <p className="text-white font-medium">{part.name}</p>
                    <p className="text-red-400 font-semibold">${part.price}</p>
                  </div>
                </div>
                <span className="text-gray-600 group-hover:text-red-400 transition-colors text-xl">→</span>
              </Link>
            );
          })}
        </div>

        <div className="mt-8">
          <Link
            href={`/parts?year=${year}&make=${make}&model=${model}`}
            className="text-gray-400 hover:text-white text-sm transition-colors"
          >
            ← Back to Categories
          </Link>
        </div>
      </div>
    </main>
  );
}