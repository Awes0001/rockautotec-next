import Link from "next/link";
import { partsCategories } from "@/components/parts-data";

interface Props {
  searchParams: Promise<{ name?: string; year?: string; make?: string; model?: string }>;
}

export default async function CategoryPage({ searchParams }: Props) {
  const { name, year, make, model } = await searchParams;
  const categoryName = decodeURIComponent(name ?? "");
  const category = partsCategories.find((cat) => cat.name === categoryName);

  if (!category) {
    return (
      <main className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-white">Category not found: "{categoryName}"</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-950 px-4 py-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <p className="text-gray-400 text-sm mb-1">{year} {make} {model}</p>
        <h1 className="text-3xl font-bold text-white mb-1">{category.name}</h1>
        <p className="text-gray-400 mb-8">{category.parts.length} parts available</p>

        {/* Parts List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {category.parts.map((part) => {
            const params = new URLSearchParams({
              part,
              ...(year && { year }),
              ...(make && { make }),
              ...(model && { model }),
            });
            return (
              <Link
                key={part}
                href={`/part?${params.toString()}`}
                className="bg-gray-900 border border-gray-800 hover:border-red-500 rounded-xl px-6 py-5 flex items-center justify-between group transition-all duration-200 hover:bg-gray-800"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🔧</span>
                  <span className="text-white font-medium">{part}</span>
                </div>
                <span className="text-gray-600 group-hover:text-red-400 transition-colors text-xl">→</span>
              </Link>
            );
          })}
        </div>

        {/* Back */}
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