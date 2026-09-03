/**
 * data/fitment.ts
 * Curated, hand-verified fitment overrides for a set of popular SKUs.
 * Unlike the generated fitment baked into each catalog Product (which spreads
 * coverage across the full 31-make vehicle database), these entries represent
 * a "verified by our fitment team" tier with specific engines and install
 * notes — looked up first by app/part/[id]/page.tsx before falling back to
 * the product's generated fitment array.
 */

import { ALL_PRODUCTS } from "@/lib/catalog";

export interface FitmentRange {
  year_start: number;
  year_end: number;
  make: string;
  model: string;
  engine?: string;
  notes?: string;
}

export interface SkuFitment {
  sku: string;
  fitment: FitmentRange[];
}

/** Resolves a real catalog SKU by brand + a substring of the product name. */
function sku(brand: string, nameIncludes: string): string {
  const product = ALL_PRODUCTS.find(
    (p) => p.brand === brand && p.name.includes(nameIncludes)
  );
  if (!product) {
    throw new Error(`data/fitment.ts: no catalog product found for ${brand} "${nameIncludes}"`);
  }
  return product.sku;
}

export const FITMENT_DATABASE: SkuFitment[] = [
  {
    sku: sku("Bosch", "Brake Pad Set – Front"),
    fitment: [
      { year_start: 2018, year_end: 2024, make: "Toyota", model: "Camry", engine: "2.5L 4-Cyl", notes: "All trims; torque lug nuts to 83 ft-lbs." },
      { year_start: 2016, year_end: 2024, make: "Toyota", model: "RAV4", engine: "2.5L 4-Cyl" },
      { year_start: 2018, year_end: 2022, make: "Honda", model: "Accord", engine: "1.5L 4-Cyl Turbo" },
    ],
  },
  {
    sku: sku("NGK", "Spark Plug Set"),
    fitment: [
      { year_start: 2012, year_end: 2026, make: "Honda", model: "Civic", engine: "1.5L 4-Cyl Turbo", notes: "Torque to 13 ft-lbs; anti-seize not required." },
      { year_start: 2013, year_end: 2024, make: "Toyota", model: "Corolla", engine: "1.8L 4-Cyl" },
      { year_start: 2015, year_end: 2023, make: "Nissan", model: "Altima", engine: "2.5L 4-Cyl" },
    ],
  },
  {
    sku: sku("Monroe", "Shock Absorber – Front"),
    fitment: [
      { year_start: 2014, year_end: 2018, make: "Ford", model: "F-150", engine: "5.0L V8", notes: "2WD and 4WD; verify ride height package before ordering." },
      { year_start: 2014, year_end: 2019, make: "Chevrolet", model: "Silverado 1500", engine: "5.3L V8" },
    ],
  },
  {
    sku: sku("Gates", "Timing Belt Kit"),
    fitment: [
      { year_start: 2007, year_end: 2017, make: "Honda", model: "CR-V", engine: "2.4L 4-Cyl", notes: "Includes tensioner and idler pulley; water pump sold separately on some kits." },
      { year_start: 2009, year_end: 2014, make: "Subaru", model: "Outback", engine: "2.5L 4-Cyl" },
    ],
  },
  {
    sku: sku("ACDelco", "Alternator – Remanufactured"),
    fitment: [
      { year_start: 2014, year_end: 2019, make: "Chevrolet", model: "Silverado 1500", engine: "5.3L V8", notes: "150-amp output; core return required for warranty." },
      { year_start: 2015, year_end: 2020, make: "GMC", model: "Sierra 1500", engine: "5.3L V8" },
    ],
  },
  {
    sku: sku("Denso", "Oxygen Sensor – Upstream"),
    fitment: [
      { year_start: 2013, year_end: 2021, make: "Toyota", model: "Corolla", engine: "1.8L 4-Cyl", notes: "Bank 1 Sensor 1; clear codes after install." },
      { year_start: 2012, year_end: 2018, make: "Nissan", model: "Sentra", engine: "1.8L 4-Cyl" },
    ],
  },
  {
    sku: sku("KYB", "Strut Assembly – Front"),
    fitment: [
      { year_start: 2013, year_end: 2018, make: "Nissan", model: "Altima", engine: "2.5L 4-Cyl", notes: "Sold individually; replace in pairs for even handling." },
      { year_start: 2014, year_end: 2019, make: "Honda", model: "Accord", engine: "2.4L 4-Cyl" },
    ],
  },
  {
    sku: sku("Moog", "Control Arm – Front Lower"),
    fitment: [
      { year_start: 2015, year_end: 2020, make: "Ford", model: "F-150", engine: "3.5L V6 Turbo", notes: "Includes ball joint; alignment required after install." },
      { year_start: 2009, year_end: 2014, make: "Ford", model: "F-150", engine: "5.0L V8" },
    ],
  },
  {
    sku: sku("Motorcraft", "Automotive Battery"),
    fitment: [
      { year_start: 2015, year_end: 2023, make: "Ford", model: "F-150", engine: "2.7L V6 Turbo", notes: "Group 65; verify terminal orientation before ordering." },
      { year_start: 2013, year_end: 2019, make: "Ford", model: "Escape", engine: "1.5L 4-Cyl Turbo" },
    ],
  },
  {
    sku: sku("Standard Motor Products", "Ignition Coil"),
    fitment: [
      { year_start: 2011, year_end: 2019, make: "Chevrolet", model: "Equinox", engine: "2.4L 4-Cyl", notes: "Sold individually; replace all coils together if mileage exceeds 100k." },
      { year_start: 2010, year_end: 2017, make: "GMC", model: "Terrain", engine: "2.4L 4-Cyl" },
    ],
  },
  {
    sku: sku("Bosch", "Fuel Injector"),
    fitment: [
      { year_start: 2011, year_end: 2019, make: "Ram", model: "1500", engine: "5.7L V8", notes: "Flow-matched set recommended; do not mix with used injectors." },
    ],
  },
  {
    sku: sku("Gates", "Serpentine Belt"),
    fitment: [
      { year_start: 2013, year_end: 2022, make: "Toyota", model: "Camry", engine: "2.5L 4-Cyl", notes: "Check tensioner and idler pulley condition at install." },
      { year_start: 2012, year_end: 2020, make: "Honda", model: "Civic", engine: "1.8L 4-Cyl" },
    ],
  },
  {
    sku: sku("Denso", "Mass Air Flow Sensor"),
    fitment: [
      { year_start: 2014, year_end: 2021, make: "Subaru", model: "Forester", engine: "2.5L 4-Cyl", notes: "Clean throttle body before testing for false codes." },
    ],
  },
  {
    sku: sku("ACDelco", "Starter Motor – Remanufactured"),
    fitment: [
      { year_start: 2007, year_end: 2013, make: "Chevrolet", model: "Silverado 1500", engine: "5.3L V8", notes: "Core return required for warranty credit." },
      { year_start: 2007, year_end: 2014, make: "GMC", model: "Sierra 1500", engine: "5.3L V8" },
    ],
  },
  {
    sku: sku("Moog", "Wheel Bearing & Hub Assembly"),
    fitment: [
      { year_start: 2013, year_end: 2018, make: "Ford", model: "Escape", engine: "2.0L 4-Cyl Turbo", notes: "Front; torque axle nut to 148 ft-lbs." },
      { year_start: 2013, year_end: 2019, make: "Ford", model: "Fusion", engine: "2.5L 4-Cyl" },
    ],
  },
  {
    sku: sku("NGK", "Ignition Coil"),
    fitment: [
      { year_start: 2009, year_end: 2014, make: "Nissan", model: "Murano", engine: "3.5L V6", notes: "Replace spark plugs at the same time for best results." },
    ],
  },
  {
    sku: sku("Gates", "Timing Belt Kit with Water Pump"),
    fitment: [
      { year_start: 2011, year_end: 2017, make: "Hyundai", model: "Sonata", engine: "2.4L 4-Cyl", notes: "Combine with timing service to save labor cost; includes water pump." },
    ],
  },
  {
    sku: sku("KYB", "Shock Absorber – Rear (Each)"),
    fitment: [
      { year_start: 2014, year_end: 2020, make: "Jeep", model: "Grand Cherokee", engine: "3.6L V6", notes: "Non-air-suspension models only." },
    ],
  },
  {
    sku: sku("Bosch", "ABS Wheel Speed Sensor"),
    fitment: [
      { year_start: 2015, year_end: 2021, make: "Volkswagen", model: "Jetta", engine: "1.8L 4-Cyl", notes: "Front left; clear ABS module memory after install." },
    ],
  },
  {
    sku: sku("Motorcraft", "Coolant Reservoir"),
    fitment: [
      { year_start: 2013, year_end: 2020, make: "Ford", model: "Fusion", engine: "2.5L 4-Cyl", notes: "Includes cap; bleed cooling system after refill." },
    ],
  },
];

// ─── Indices (Phase 6 — built once at module load) ──────────────────────────────
//
// getFitmentForSku/doesPartFit/getPartsForVehicle below are the public API
// every consumer (app/part/[id]/page.tsx, components/my-garage.tsx) already
// calls — signatures and return shapes are unchanged. What changed is how
// they resolve: instead of linear-scanning FITMENT_DATABASE on every call
// (fine at 20 records, not at 500,000), each entry is indexed once by SKU
// and by "make|model" so both lookup directions stay O(1) + O(records for
// that one vehicle) as the dataset grows, instead of O(every record).

const fitmentBySku = new Map<string, FitmentRange[]>(
  FITMENT_DATABASE.map((f) => [f.sku, f.fitment])
);

interface IndexedFitment extends FitmentRange {
  sku: string;
}

const fitmentByMakeModel = new Map<string, IndexedFitment[]>();
for (const { sku: skuValue, fitment } of FITMENT_DATABASE) {
  for (const range of fitment) {
    const key = `${range.make.toLowerCase()}|${range.model.toLowerCase()}`;
    const entry: IndexedFitment = { ...range, sku: skuValue };
    const list = fitmentByMakeModel.get(key);
    if (list) list.push(entry);
    else fitmentByMakeModel.set(key, [entry]);
  }
}

// ─── Public API ──────────────────────────────────────────────────────────────────

export function getFitmentForSku(skuValue: string): FitmentRange[] {
  return fitmentBySku.get(skuValue) ?? [];
}

export function doesPartFit(skuValue: string, year: number, make: string, model: string): boolean {
  const candidates = fitmentByMakeModel.get(`${make.toLowerCase()}|${model.toLowerCase()}`);
  if (!candidates) return false;
  return candidates.some((f) => f.sku === skuValue && year >= f.year_start && year <= f.year_end);
}

export function getPartsForVehicle(year: number, make: string, model: string): string[] {
  const candidates = fitmentByMakeModel.get(`${make.toLowerCase()}|${model.toLowerCase()}`);
  if (!candidates) return [];
  const skus = new Set<string>();
  for (const f of candidates) {
    if (year >= f.year_start && year <= f.year_end) skus.add(f.sku);
  }
  return Array.from(skus);
}
