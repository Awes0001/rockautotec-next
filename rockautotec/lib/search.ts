/**
 * lib/search.ts
 * Unified, scored search across name/brand/category/SKU/OEM number/
 * aftermarket number/interchange numbers. Field names match the actual
 * lib/catalog.ts Product interface:
 *   sku: string
 *   oemNumber: string
 *   aftermarketNumber: string
 *   interchangeNumbers: string[]
 *   brand: Brand
 *   category: Category
 *   name: string
 */

import { ALL_PRODUCTS, type Product } from "./catalog";

export interface SearchResult {
  product: Product;
  matchType: "exact-sku" | "exact-oem" | "exact-interchange" | "exact-aftermarket" | "partial" | "brand" | "category" | "name";
  score: number;
}

export function searchProducts(query: string): SearchResult[] {
  if (!query || query.trim().length < 1) return [];

  const q = query.trim().toLowerCase();
  const qClean = q.replace(/[-\s]/g, "");

  const results: SearchResult[] = [];

  for (const product of ALL_PRODUCTS) {
    const sku = (product.sku ?? "").toLowerCase();
    const skuClean = sku.replace(/[-\s]/g, "");

    const oem = (product.oemNumber ?? "").toLowerCase();
    const oemClean = oem.replace(/[-\s]/g, "");

    const interchangeList: string[] = Array.isArray(product.interchangeNumbers)
      ? product.interchangeNumbers
      : [];

    const brand = (product.brand ?? "").toLowerCase();
    const name = (product.name ?? "").toLowerCase();

    // Exact matches — highest priority
    if (skuClean === qClean) {
      results.push({ product, matchType: "exact-sku", score: 100 });
      continue;
    }
    if (oemClean === qClean) {
      results.push({ product, matchType: "exact-oem", score: 95 });
      continue;
    }
    if (interchangeList.some((i) => i.toLowerCase().replace(/[-\s]/g, "") === qClean)) {
      results.push({ product, matchType: "exact-interchange", score: 90 });
      continue;
    }

    // Partial matches
    let score = 0;
    let matchType: SearchResult["matchType"] = "partial";

    if (skuClean.includes(qClean)) { score = Math.max(score, 80); matchType = "exact-sku"; }
    if (oemClean.includes(qClean)) { score = Math.max(score, 75); matchType = "exact-oem"; }
    if (interchangeList.some((i) => i.toLowerCase().replace(/[-\s]/g, "").includes(qClean))) {
      score = Math.max(score, 70); matchType = "exact-interchange";
    }
    if (brand.includes(q)) { score = Math.max(score, 60); matchType = "brand"; }
    if (name.includes(q)) { score = Math.max(score, 50); matchType = "name"; }

    if (score > 0) {
      results.push({ product, matchType, score });
    }
  }

  // Sort: exact matches first, then by score
  return results.sort((a, b) => b.score - a.score);
}

export function getExactMatches(query: string): SearchResult[] {
  return searchProducts(query).filter((r) => r.score >= 90);
}

export function hasExactMatch(query: string): boolean {
  return searchProducts(query).some((r) => r.score >= 90);
}
