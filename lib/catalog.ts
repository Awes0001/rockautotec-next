/**
 * lib/catalog.ts
 * Single source of truth for the RockAutoTec parts catalog.
 * Products are generated deterministically from a fixed set of real part-type
 * templates × real brands × real vehicle fitment combinations — not random,
 * not hand-typed lorem data. Re-running this module always produces the same
 * 1,000-product catalog.
 */

import { MAKES } from "@/lib/makes";

// ─── Categories ────────────────────────────────────────────────────────────────

export const CATEGORIES = [
  "Brakes", "Suspension", "Engine", "Cooling", "Electrical",
  "Fuel System", "Ignition", "Exhaust", "Lighting", "Body Parts",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_SLUGS: Record<Category, string> = {
  Brakes: "brakes",
  Suspension: "suspension",
  Engine: "engine",
  Cooling: "cooling",
  Electrical: "electrical",
  "Fuel System": "fuel-system",
  Ignition: "ignition",
  Exhaust: "exhaust",
  Lighting: "lighting",
  "Body Parts": "body-parts",
};

export const SLUG_TO_CATEGORY: Record<string, Category> = Object.fromEntries(
  (Object.entries(CATEGORY_SLUGS) as [Category, string][]).map(([cat, slug]) => [slug, cat])
);

/** Icon name (lucide-react export) used to render this category — see components/part-icon.tsx */
export const CATEGORY_ICON_NAMES: Record<Category, string> = {
  Brakes: "Disc",
  Suspension: "Gauge",
  Engine: "Settings",
  Cooling: "Thermometer",
  Electrical: "Zap",
  "Fuel System": "Fuel",
  Ignition: "Flame",
  Exhaust: "Wind",
  Lighting: "Lightbulb",
  "Body Parts": "Car",
};

// ─── Brands ────────────────────────────────────────────────────────────────────

export const BRANDS = [
  "Bosch", "Denso", "NGK", "Gates", "Monroe",
  "KYB", "Moog", "ACDelco", "Motorcraft", "Standard Motor Products",
] as const;

export type Brand = (typeof BRANDS)[number];

export const MANUFACTURER_NAMES: Record<Brand, string> = {
  Bosch: "Robert Bosch LLC",
  Denso: "Denso International America, Inc.",
  NGK: "NGK Spark Plugs (U.S.A.), Inc.",
  Gates: "Gates Corporation",
  Monroe: "Tenneco Inc. (Monroe)",
  KYB: "KYB Americas Corporation",
  Moog: "Federal-Mogul Motorparts (MOOG)",
  ACDelco: "General Motors LLC (ACDelco)",
  Motorcraft: "Ford Motor Company (Motorcraft)",
  "Standard Motor Products": "Standard Motor Products, Inc.",
};

const BRAND_CODES: Record<Brand, string> = {
  Bosch: "BSH",
  Denso: "DEN",
  NGK: "NGK",
  Gates: "GAT",
  Monroe: "MON",
  KYB: "KYB",
  Moog: "MOG",
  ACDelco: "ACD",
  Motorcraft: "MTC",
  "Standard Motor Products": "SMP",
};

export function brandSlug(brand: string): string {
  return brand.toLowerCase().replace(/\s+/g, "-");
}

export const BRAND_SLUGS: string[] = BRANDS.map(brandSlug);

export const BRAND_DISPLAY_NAMES: Record<string, string> = Object.fromEntries(
  BRANDS.map((b) => [brandSlug(b), b])
);

// ─── Part-type templates (10 per category × 10 categories = 100 templates) ────

interface PartTemplate {
  category: Category;
  partType: string;
  namePattern: string; // "{brand}" placeholder substituted with brand name
  priceMin: number;
  priceMax: number;
}

const TEMPLATES: PartTemplate[] = [
  // Brakes
  { category: "Brakes", partType: "Brake Pads",        namePattern: "{brand} Brake Pad Set – Front",          priceMin: 28,  priceMax: 79  },
  { category: "Brakes", partType: "Brake Pads",        namePattern: "{brand} Brake Pad Set – Rear",           priceMin: 26,  priceMax: 72  },
  { category: "Brakes", partType: "Brake Rotors",      namePattern: "{brand} Brake Rotor – Front (Each)",     priceMin: 32,  priceMax: 98  },
  { category: "Brakes", partType: "Brake Rotors",      namePattern: "{brand} Brake Rotor – Rear (Each)",      priceMin: 29,  priceMax: 89  },
  { category: "Brakes", partType: "Brake Calipers",    namePattern: "{brand} Brake Caliper – Front",          priceMin: 64,  priceMax: 189 },
  { category: "Brakes", partType: "Brake Drums",       namePattern: "{brand} Brake Drum (Each)",              priceMin: 34,  priceMax: 74  },
  { category: "Brakes", partType: "Brake Shoes",       namePattern: "{brand} Brake Shoe Set – Rear",          priceMin: 24,  priceMax: 58  },
  { category: "Brakes", partType: "Brake Hoses",       namePattern: "{brand} Brake Hose – Front",             priceMin: 14,  priceMax: 36  },
  { category: "Brakes", partType: "Brake Fluid",       namePattern: "{brand} DOT 4 Brake Fluid (32oz)",       priceMin: 8,   priceMax: 18  },
  { category: "Brakes", partType: "ABS Sensors",       namePattern: "{brand} ABS Wheel Speed Sensor",         priceMin: 32,  priceMax: 84  },

  // Suspension
  { category: "Suspension", partType: "Shocks",         namePattern: "{brand} Shock Absorber – Front (Each)",  priceMin: 44,  priceMax: 139 },
  { category: "Suspension", partType: "Shocks",         namePattern: "{brand} Shock Absorber – Rear (Each)",   priceMin: 42,  priceMax: 129 },
  { category: "Suspension", partType: "Struts",         namePattern: "{brand} Strut Assembly – Front",         priceMin: 89,  priceMax: 249 },
  { category: "Suspension", partType: "Control Arms",   namePattern: "{brand} Control Arm – Front Lower",      priceMin: 54,  priceMax: 149 },
  { category: "Suspension", partType: "Ball Joints",    namePattern: "{brand} Ball Joint – Front Upper",       priceMin: 26,  priceMax: 68  },
  { category: "Suspension", partType: "Steering",       namePattern: "{brand} Tie Rod End – Outer",            priceMin: 18,  priceMax: 49  },
  { category: "Suspension", partType: "Sway Bar",       namePattern: "{brand} Sway Bar Link Kit",              priceMin: 22,  priceMax: 58  },
  { category: "Suspension", partType: "Wheel Bearings", namePattern: "{brand} Wheel Bearing & Hub Assembly",   priceMin: 48,  priceMax: 138 },
  { category: "Suspension", partType: "Strut Mounts",   namePattern: "{brand} Strut Mount",                    priceMin: 28,  priceMax: 69  },
  { category: "Suspension", partType: "Coil Springs",   namePattern: "{brand} Coil Spring – Front (Each)",     priceMin: 38,  priceMax: 99  },

  // Engine
  { category: "Engine", partType: "Timing",          namePattern: "{brand} Timing Belt Kit with Water Pump",  priceMin: 89,  priceMax: 219 },
  { category: "Engine", partType: "Timing",          namePattern: "{brand} Timing Chain Kit",                 priceMin: 99,  priceMax: 259 },
  { category: "Engine", partType: "Gaskets & Seals", namePattern: "{brand} Head Gasket Set",                  priceMin: 64,  priceMax: 169 },
  { category: "Engine", partType: "Gaskets & Seals", namePattern: "{brand} Valve Cover Gasket Set",           priceMin: 19,  priceMax: 48  },
  { category: "Engine", partType: "Pumps",           namePattern: "{brand} Oil Pump",                         priceMin: 44,  priceMax: 118 },
  { category: "Engine", partType: "Engine Mounts",   namePattern: "{brand} Engine Mount",                     priceMin: 32,  priceMax: 89  },
  { category: "Engine", partType: "Engine Internals",namePattern: "{brand} Piston Ring Set",                  priceMin: 58,  priceMax: 149 },
  { category: "Engine", partType: "Gaskets & Seals", namePattern: "{brand} Crankshaft Seal Kit",              priceMin: 16,  priceMax: 39  },
  { category: "Engine", partType: "Belts",           namePattern: "{brand} Serpentine Belt",                  priceMin: 18,  priceMax: 44  },
  { category: "Engine", partType: "Engine Internals",namePattern: "{brand} Engine Bearing Set",                priceMin: 36,  priceMax: 94  },

  // Cooling
  { category: "Cooling", partType: "Radiators",        namePattern: "{brand} Radiator Assembly",               priceMin: 124, priceMax: 329 },
  { category: "Cooling", partType: "Radiators",        namePattern: "{brand} Radiator Cap",                    priceMin: 6,   priceMax: 16  },
  { category: "Cooling", partType: "Cooling Fans",     namePattern: "{brand} Cooling Fan Assembly",             priceMin: 89,  priceMax: 219 },
  { category: "Cooling", partType: "Thermostats",      namePattern: "{brand} Thermostat with Gasket",           priceMin: 14,  priceMax: 32  },
  { category: "Cooling", partType: "Coolant & Antifreeze", namePattern: "{brand} Coolant Reservoir",            priceMin: 22,  priceMax: 58  },
  { category: "Cooling", partType: "Hoses",            namePattern: "{brand} Heater Hose Kit",                  priceMin: 18,  priceMax: 46  },
  { category: "Cooling", partType: "Coolant & Antifreeze", namePattern: "{brand} Antifreeze/Coolant (1 Gal)",  priceMin: 16,  priceMax: 28  },
  { category: "Cooling", partType: "Hoses",            namePattern: "{brand} Radiator Hose – Upper",            priceMin: 14,  priceMax: 36  },
  { category: "Cooling", partType: "Hoses",            namePattern: "{brand} Radiator Hose – Lower",            priceMin: 14,  priceMax: 36  },
  { category: "Cooling", partType: "Cooling Fans",     namePattern: "{brand} Fan Clutch",                       priceMin: 44,  priceMax: 119 },

  // Electrical
  { category: "Electrical", partType: "Alternators",   namePattern: "{brand} Alternator – Remanufactured",     priceMin: 109, priceMax: 259 },
  { category: "Electrical", partType: "Starters",      namePattern: "{brand} Starter Motor – Remanufactured",  priceMin: 99,  priceMax: 229 },
  { category: "Electrical", partType: "Batteries",     namePattern: "{brand} Automotive Battery (Group 35)",   priceMin: 119, priceMax: 249 },
  { category: "Electrical", partType: "Sensors",       namePattern: "{brand} Mass Air Flow Sensor",             priceMin: 54,  priceMax: 139 },
  { category: "Electrical", partType: "Sensors",       namePattern: "{brand} Oxygen Sensor – Upstream",         priceMin: 28,  priceMax: 74  },
  { category: "Electrical", partType: "Modules",       namePattern: "{brand} ABS Control Module",               priceMin: 149, priceMax: 379 },
  { category: "Electrical", partType: "Window Parts",  namePattern: "{brand} Window Regulator Motor",           priceMin: 38,  priceMax: 94  },
  { category: "Electrical", partType: "Switches",      namePattern: "{brand} Power Window Switch",              priceMin: 18,  priceMax: 46  },
  { category: "Electrical", partType: "Charging System", namePattern: "{brand} Voltage Regulator",              priceMin: 22,  priceMax: 58  },
  { category: "Electrical", partType: "Wiring & Harnesses", namePattern: "{brand} Engine Wiring Harness",       priceMin: 64,  priceMax: 179 },

  // Fuel System
  { category: "Fuel System", partType: "Fuel Pumps",      namePattern: "{brand} Fuel Pump Module Assembly",    priceMin: 109, priceMax: 259 },
  { category: "Fuel System", partType: "Fuel Injectors",  namePattern: "{brand} Fuel Injector",                priceMin: 32,  priceMax: 89  },
  { category: "Fuel System", partType: "Filters",         namePattern: "{brand} Fuel Filter",                  priceMin: 12,  priceMax: 29  },
  { category: "Fuel System", partType: "Throttle Body",   namePattern: "{brand} Throttle Body Assembly",       priceMin: 124, priceMax: 289 },
  { category: "Fuel System", partType: "Fuel System Components", namePattern: "{brand} Fuel Pressure Regulator", priceMin: 34, priceMax: 84 },
  { category: "Fuel System", partType: "Fuel Tanks",      namePattern: "{brand} Fuel Tank",                    priceMin: 169, priceMax: 339 },
  { category: "Fuel System", partType: "Fuel System Components", namePattern: "{brand} Fuel Sending Unit",      priceMin: 48,  priceMax: 109 },
  { category: "Fuel System", partType: "Fuel System Components", namePattern: "{brand} Idle Air Control Valve", priceMin: 36, priceMax: 89 },
  { category: "Fuel System", partType: "Emission Components", namePattern: "{brand} Vapor Canister Purge Valve", priceMin: 18, priceMax: 44 },
  { category: "Fuel System", partType: "Hoses",            namePattern: "{brand} Fuel Line Hose (Per Foot)",    priceMin: 3,   priceMax: 9   },

  // Ignition
  { category: "Ignition", partType: "Spark Plugs",     namePattern: "{brand} Spark Plug Set (4-Pack)",         priceMin: 19,  priceMax: 58  },
  { category: "Ignition", partType: "Ignition Components", namePattern: "{brand} Ignition Coil",               priceMin: 24,  priceMax: 64  },
  { category: "Ignition", partType: "Wiring & Harnesses", namePattern: "{brand} Spark Plug Wire Set",          priceMin: 22,  priceMax: 54  },
  { category: "Ignition", partType: "Switches",        namePattern: "{brand} Ignition Switch",                  priceMin: 28,  priceMax: 69  },
  { category: "Ignition", partType: "Ignition Components", namePattern: "{brand} Distributor Cap",             priceMin: 14,  priceMax: 38  },
  { category: "Ignition", partType: "Ignition Components", namePattern: "{brand} Distributor Rotor",           priceMin: 9,   priceMax: 24  },
  { category: "Ignition", partType: "Sensors",         namePattern: "{brand} Crankshaft Position Sensor",       priceMin: 28,  priceMax: 74  },
  { category: "Ignition", partType: "Sensors",         namePattern: "{brand} Camshaft Position Sensor",         priceMin: 26,  priceMax: 68  },
  { category: "Ignition", partType: "Ignition Components", namePattern: "{brand} Ignition Control Module",      priceMin: 44,  priceMax: 119 },
  { category: "Ignition", partType: "Glow Plugs",      namePattern: "{brand} Diesel Glow Plug",                 priceMin: 16,  priceMax: 38  },

  // Exhaust
  { category: "Exhaust", partType: "Mufflers",            namePattern: "{brand} Muffler",                       priceMin: 64,  priceMax: 169 },
  { category: "Exhaust", partType: "Catalytic Converters", namePattern: "{brand} Catalytic Converter – Direct Fit", priceMin: 149, priceMax: 339 },
  { category: "Exhaust", partType: "Exhaust Manifolds",   namePattern: "{brand} Exhaust Manifold",              priceMin: 94,  priceMax: 219 },
  { category: "Exhaust", partType: "Exhaust Pipes",       namePattern: "{brand} Exhaust Flex Pipe",             priceMin: 28,  priceMax: 68  },
  { category: "Exhaust", partType: "Exhaust Hardware",    namePattern: "{brand} Exhaust Clamp (2-Pack)",        priceMin: 6,   priceMax: 16  },
  { category: "Exhaust", partType: "Mufflers",            namePattern: "{brand} Resonator",                     priceMin: 44,  priceMax: 109 },
  { category: "Exhaust", partType: "Gaskets & Seals",     namePattern: "{brand} Exhaust Manifold Gasket Set",   priceMin: 12,  priceMax: 32  },
  { category: "Exhaust", partType: "Exhaust Tips",        namePattern: "{brand} Exhaust Tip",                   priceMin: 22,  priceMax: 58  },
  { category: "Exhaust", partType: "Exhaust Pipes",       namePattern: "{brand} Tail Pipe",                     priceMin: 34,  priceMax: 84  },
  { category: "Exhaust", partType: "Sensors",             namePattern: "{brand} O2 Sensor Extension Harness",   priceMin: 14,  priceMax: 34  },

  // Lighting
  { category: "Lighting", partType: "Lighting",      namePattern: "{brand} Headlight Assembly – Driver Side",  priceMin: 84,  priceMax: 219 },
  { category: "Lighting", partType: "Lighting",      namePattern: "{brand} Tail Light Assembly – Driver Side", priceMin: 64,  priceMax: 169 },
  { category: "Lighting", partType: "Lighting",      namePattern: "{brand} Fog Light Assembly",                 priceMin: 38,  priceMax: 94  },
  { category: "Lighting", partType: "Lighting",      namePattern: "{brand} Turn Signal Bulb (2-Pack)",          priceMin: 5,   priceMax: 14  },
  { category: "Lighting", partType: "Lighting",      namePattern: "{brand} Headlight Bulb – Halogen (2-Pack)",  priceMin: 9,   priceMax: 24  },
  { category: "Lighting", partType: "Lighting",      namePattern: "{brand} LED Interior Light Kit",             priceMin: 14,  priceMax: 36  },
  { category: "Lighting", partType: "Switches",      namePattern: "{brand} Headlight Switch",                   priceMin: 22,  priceMax: 54  },
  { category: "Lighting", partType: "Lighting",      namePattern: "{brand} Brake Light Bulb (2-Pack)",          priceMin: 5,   priceMax: 13  },
  { category: "Lighting", partType: "Modules",       namePattern: "{brand} Daytime Running Light Module",       priceMin: 38,  priceMax: 94  },
  { category: "Lighting", partType: "Detailing Products", namePattern: "{brand} Headlight Restoration Kit",     priceMin: 14,  priceMax: 28  },

  // Body Parts
  { category: "Body Parts", partType: "Mirrors",        namePattern: "{brand} Side Mirror Assembly – Driver Side", priceMin: 54,  priceMax: 139 },
  { category: "Body Parts", partType: "Door Hardware",  namePattern: "{brand} Door Handle – Exterior",          priceMin: 18,  priceMax: 48  },
  { category: "Body Parts", partType: "Hood Parts",     namePattern: "{brand} Hood Strut / Lift Support (2-Pack)", priceMin: 24, priceMax: 58 },
  { category: "Body Parts", partType: "Body Panels",    namePattern: "{brand} Fender Assembly – Front",         priceMin: 124, priceMax: 269 },
  { category: "Body Parts", partType: "Bumper Components", namePattern: "{brand} Bumper Cover – Front",         priceMin: 149, priceMax: 329 },
  { category: "Body Parts", partType: "Body Panels",    namePattern: "{brand} Grille Assembly",                  priceMin: 64,  priceMax: 169 },
  { category: "Body Parts", partType: "Window Parts",   namePattern: "{brand} Window Regulator – Manual",        priceMin: 44,  priceMax: 109 },
  { category: "Body Parts", partType: "Floor Liners & Mats", namePattern: "{brand} Floor Liner Set (4-Piece)",  priceMin: 64,  priceMax: 149 },
  { category: "Body Parts", partType: "Wiper Blades",   namePattern: "{brand} Wiper Blade Set (2-Pack)",         priceMin: 18,  priceMax: 42  },
  { category: "Body Parts", partType: "Pumps",          namePattern: "{brand} Windshield Washer Pump",           priceMin: 14,  priceMax: 34  },
];

// ─── Vehicle fitment data ──────────────────────────────────────────────────────

export const ENGINES = [
  "1.5L 4-Cyl Turbo", "1.8L 4-Cyl", "2.0L 4-Cyl Turbo", "2.4L 4-Cyl", "2.5L 4-Cyl",
  "3.0L V6", "3.5L V6", "3.6L V6", "5.0L V8", "5.7L V8", "6.2L V8", "2.0L 4-Cyl Hybrid",
];

export interface FitmentEntry {
  make: string;
  model: string;
  yearStart: number;
  yearEnd: number;
  engine: string;
}

function generateFitment(seed: number): FitmentEntry[] {
  const count = 2 + (seed % 3); // 2-4 vehicles per part
  const entries: FitmentEntry[] = [];
  for (let i = 0; i < count; i++) {
    const make = MAKES[(seed + i * 5) % MAKES.length];
    const model = make.models[(seed + i * 3) % make.models.length];
    const years = make.years; // descending, e.g. 2025..2000
    const endIdx = (seed + i) % Math.max(years.length - 4, 1);
    const span = 3 + (seed % 4); // 3-6 year span
    const yearEnd = years[endIdx];
    const yearStart = years[Math.min(endIdx + span, years.length - 1)];
    const engine = ENGINES[(seed + i * 2) % ENGINES.length];
    entries.push({ make: make.name, model, yearStart, yearEnd, engine });
  }
  return entries;
}

// ─── Product type & generation ─────────────────────────────────────────────────

export interface Product {
  id: number;
  name: string;
  brand: Brand;
  manufacturer: string;
  sku: string;
  oemNumber: string;
  interchangeNumbers: string[];
  price: number;
  was: number;
  rating: number;
  reviews: number;
  category: Category;
  partType: string;
  inStock: boolean;
  fitment: FitmentEntry[];
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

function generateProducts(): Product[] {
  const products: Product[] = [];
  let id = 10000;

  TEMPLATES.forEach((tpl, tplIndex) => {
    BRANDS.forEach((brand, brandIndex) => {
      id += 1;
      const seed = tplIndex * 10 + brandIndex;
      const code = BRAND_CODES[brand];

      // Deterministic but varied pricing within the template's range
      const range = tpl.priceMax - tpl.priceMin;
      const price = round2(tpl.priceMin + ((seed * 37) % 100) / 100 * range);
      const markup = 1.35 + ((seed * 13) % 30) / 100; // 1.35x–1.64x "was" price
      const was = round2(price * markup);

      const rating = round2(4.3 + ((seed * 11) % 7) / 10); // 4.3–4.9
      const reviews = 80 + ((seed * 53) % 4800);

      const oemNumber = `${code}-${(100000 + id * 7) % 999999}`;
      const interchangeNumbers = [
        `DOR${(200000 + id * 3) % 999999}`,
        `RAY${(300000 + id * 11) % 999999}`,
      ];

      const sku = `${code}${tpl.partType.replace(/[^A-Za-z]/g, "").slice(0, 3).toUpperCase()}${id}`;

      products.push({
        id,
        name: tpl.namePattern.replace("{brand}", brand),
        brand,
        manufacturer: MANUFACTURER_NAMES[brand],
        sku,
        oemNumber,
        interchangeNumbers,
        price,
        was,
        rating,
        reviews,
        category: tpl.category,
        partType: tpl.partType,
        inStock: seed % 23 !== 0, // ~96% in stock
        fitment: generateFitment(seed + id),
      });
    });
  });

  return products;
}

export const ALL_PRODUCTS: Product[] = generateProducts();

// ─── Derived lookups ────────────────────────────────────────────────────────────

export const PRODUCTS_BY_CATEGORY: Record<string, Product[]> = {};
for (const p of ALL_PRODUCTS) {
  (PRODUCTS_BY_CATEGORY[p.category] ??= []).push(p);
}

export const PRODUCTS_BY_BRAND: Record<string, Product[]> = {};
for (const p of ALL_PRODUCTS) {
  const slug = brandSlug(p.brand);
  (PRODUCTS_BY_BRAND[slug] ??= []).push(p);
}

export const ALL_SUBCATEGORIES: string[] = Array.from(
  new Set(ALL_PRODUCTS.map((p) => p.partType))
).sort();

export function getProductById(id: number): Product | undefined {
  return ALL_PRODUCTS.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return PRODUCTS_BY_CATEGORY[category] ?? [];
}

export function getProductsByBrand(brandSlugValue: string): Product[] {
  return PRODUCTS_BY_BRAND[brandSlugValue] ?? [];
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return ALL_PRODUCTS;
  return ALL_PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.oemNumber.toLowerCase().includes(q) ||
      p.interchangeNumbers.some((n) => n.toLowerCase().includes(q)) ||
      p.category.toLowerCase().includes(q) ||
      p.partType.toLowerCase().includes(q)
  );
}

export function getRelatedProducts(product: Product, count = 4): Product[] {
  return ALL_PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category
  ).slice(0, count);
}

export function getFeaturedProducts(count = 8): Product[] {
  return [...ALL_PRODUCTS].sort((a, b) => b.reviews - a.reviews).slice(0, count);
}

/** Deterministic low-stock flag — same parts always show "Only X left" rather than flicker. */
export function isLowStock(product: Product): boolean {
  return product.inStock && product.id % 9 === 0;
}

/** Deterministic low-stock unit count (3–7) for parts flagged by isLowStock. */
export function lowStockCount(product: Product): number {
  return 3 + (product.id % 5);
}

/** Estimated shipping window — in-stock ships fastest, low-stock still ships same week. */
export function shippingEstimate(product: Product): string {
  if (!product.inStock) return "Special order — 7–10 business days";
  if (isLowStock(product)) return "Ships in 1–2 business days";
  return "Ships today if ordered before 3PM EST";
}
