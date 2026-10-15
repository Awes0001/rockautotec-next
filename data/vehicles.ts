/**
 * data/vehicles.ts
 * Normalized vehicle-fitment reference database: Manufacturer → Model → Trim
 * → Engine (with Drive Type / Body Style as properties of each engine
 * record, surfaced as their own selectable step only when more than one
 * option exists for the chosen engine — "if available", per spec).
 *
 * Architecture (Phase 7): four flat, normalized entity arrays (no duplicated
 * nested records) plus a set of Map indices built once at module load.
 * Every public lookup below resolves through those indices in O(1)/O(small)
 * time instead of re-scanning the dataset, so the same code path keeps
 * working as the dataset grows from today's ~2,500 generated trim/engine
 * records toward a much larger one — adding rows never changes the
 * lookup complexity.
 *
 * The 31 makes, their real model nameplates, and each model's production-year
 * range are unchanged from the previous version of this file (that research
 * is preserved verbatim in MAKE_MODEL_DATA below). Trim names and per-trim
 * engine/drive-type/body-style options are generated deterministically from
 * a small set of segment templates — the same "templates × variations"
 * approach already used by lib/catalog.ts for the parts catalog — rather
 * than hand-typing thousands of near-identical records.
 */

const CURRENT_YEAR = 2026;
const DB_START_YEAR = 1990;

type Segment =
  | "truck" | "hd_truck" | "suv" | "fullsize_suv" | "compact" | "sedan"
  | "luxury_sedan" | "luxury_suv" | "sport" | "ev" | "minivan" | "van";

interface SegmentConfig {
  /** Distinct engine sizes offered across this segment, smallest/base first. */
  engines: string[];
  /** Drive types available. A single entry means the field is fixed and the
   *  Drive Type step is skipped in the UI ("if available"). */
  driveTypes: string[];
  /** Body style is modeled as a single fixed value per segment in this
   *  dataset (most nameplates don't vary body style independently of model),
   *  which is itself a valid "not available" case for that UI step. */
  bodyStyle: string;
  /** Trim ladder, base → top. */
  trims: string[];
}

const SEGMENT_CONFIG: Record<Segment, SegmentConfig> = {
  truck:        { engines: ["2.7L V6 Turbo", "3.5L V6", "3.5L V6 Turbo", "5.0L V8"], driveTypes: ["RWD", "4WD"], bodyStyle: "Truck", trims: ["Base", "XL", "XLT", "Lariat"] },
  hd_truck:     { engines: ["6.2L V8", "6.6L V8 Diesel", "6.7L I6 Diesel"],           driveTypes: ["RWD", "4WD"], bodyStyle: "Truck", trims: ["SLE", "SLT", "Laramie", "Limited"] },
  suv:          { engines: ["1.5L 4-Cyl Turbo", "2.5L 4-Cyl", "3.6L V6"],             driveTypes: ["FWD", "AWD"], bodyStyle: "SUV",   trims: ["Base", "SE", "SEL", "Limited"] },
  fullsize_suv: { engines: ["3.5L V6 Turbo", "5.3L V8", "6.2L V8"],                   driveTypes: ["RWD", "4WD"], bodyStyle: "SUV",   trims: ["Base", "SE", "SLT", "Limited"] },
  compact:      { engines: ["1.5L 4-Cyl Turbo", "1.8L 4-Cyl", "2.0L 4-Cyl"],          driveTypes: ["FWD"],        bodyStyle: "Hatchback", trims: ["Base", "LX", "EX", "Touring"] },
  sedan:        { engines: ["2.0L 4-Cyl Turbo", "2.5L 4-Cyl", "3.5L V6"],             driveTypes: ["FWD"],        bodyStyle: "Sedan", trims: ["Base", "LX", "EX", "Touring"] },
  luxury_sedan: { engines: ["2.0L 4-Cyl Turbo", "3.0L I6 Turbo", "4.0L V8 Turbo"],    driveTypes: ["RWD", "AWD"], bodyStyle: "Sedan", trims: ["Base", "Premium", "Sport", "Signature"] },
  luxury_suv:   { engines: ["2.0L 4-Cyl Turbo", "3.0L I6 Turbo", "4.0L V8 Turbo"],    driveTypes: ["AWD"],        bodyStyle: "SUV",   trims: ["Base", "Premium", "Sport", "Signature"] },
  sport:        { engines: ["2.3L 4-Cyl Turbo", "3.0L I6 Turbo", "5.0L V8", "6.2L V8 Supercharged"], driveTypes: ["RWD", "AWD"], bodyStyle: "Coupe", trims: ["Base", "Sport", "Track", "Performance"] },
  ev:           { engines: ["Electric Motor – Single Motor", "Electric Motor – Dual Motor AWD"], driveTypes: ["FWD", "AWD"], bodyStyle: "EV", trims: ["Standard Range", "Long Range", "Performance"] },
  minivan:      { engines: ["3.5L V6", "3.6L V6"],                                    driveTypes: ["FWD"],        bodyStyle: "Minivan", trims: ["Base", "SE", "Limited"] },
  van:          { engines: ["3.5L V6", "2.0L 4-Cyl Turbo Diesel"],                    driveTypes: ["FWD"],        bodyStyle: "Van",   trims: ["Base", "SE", "Limited"] },
};

type ModelTuple = [name: string, yearStart: number, yearEnd: number, segment: Segment];

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

// ─── Source data: 31 makes, real nameplates, real production-year ranges ──────
// (Unchanged from the previous version of this file — preserved verbatim.)

const MAKE_MODEL_DATA: [make: string, models: ModelTuple[]][] = [
  ["Ford", [
    ["Bronco", 2021, 2026, "suv"], ["Edge", 2007, 2023, "suv"], ["Escape", 2001, 2026, "suv"],
    ["Expedition", 1997, 2026, "fullsize_suv"], ["Explorer", 1991, 2026, "suv"], ["F-150", 1990, 2026, "truck"],
    ["F-250", 1990, 2026, "hd_truck"], ["F-350", 1990, 2026, "hd_truck"], ["Maverick", 2022, 2026, "truck"],
    ["Mustang", 1990, 2026, "sport"], ["Ranger", 1990, 2026, "truck"], ["Transit", 2015, 2026, "van"],
    ["Transit Connect", 2010, 2026, "van"],
  ]],
  ["Chevrolet", [
    ["Blazer", 2019, 2026, "suv"], ["Camaro", 1990, 2024, "sport"], ["Colorado", 2004, 2026, "truck"],
    ["Corvette", 1990, 2026, "sport"], ["Equinox", 2005, 2026, "suv"], ["Malibu", 1990, 2026, "sedan"],
    ["Silverado 1500", 1999, 2026, "truck"], ["Silverado 2500HD", 1999, 2026, "hd_truck"],
    ["Suburban", 1990, 2026, "fullsize_suv"], ["Tahoe", 1995, 2026, "fullsize_suv"],
    ["Traverse", 2009, 2026, "suv"], ["Trax", 2015, 2026, "compact"],
  ]],
  ["GMC", [
    ["Acadia", 2007, 2026, "suv"], ["Canyon", 2004, 2026, "truck"], ["Envoy", 1998, 2009, "suv"],
    ["Sierra 1500", 1999, 2026, "truck"], ["Sierra 2500HD", 1999, 2026, "hd_truck"],
    ["Sierra 3500HD", 1999, 2026, "hd_truck"], ["Terrain", 2010, 2026, "suv"],
    ["Yukon", 1992, 2026, "fullsize_suv"], ["Yukon XL", 1992, 2026, "fullsize_suv"],
  ]],
  ["Dodge", [
    ["Challenger", 2008, 2023, "sport"], ["Charger", 2006, 2026, "sport"], ["Dart", 2013, 2016, "compact"],
    ["Durango", 1998, 2026, "fullsize_suv"], ["Grand Caravan", 1990, 2020, "minivan"],
    ["Hornet", 2023, 2026, "suv"], ["Journey", 2009, 2020, "suv"], ["Viper", 1991, 2017, "sport"],
  ]],
  ["Ram", [
    ["1500", 1994, 2026, "truck"], ["2500", 1994, 2026, "hd_truck"], ["3500", 1994, 2026, "hd_truck"],
    ["4500", 2008, 2026, "hd_truck"], ["5500", 2008, 2026, "hd_truck"],
    ["ProMaster", 2014, 2026, "van"], ["ProMaster City", 2015, 2022, "van"],
  ]],
  ["Jeep", [
    ["Cherokee", 1990, 2023, "suv"], ["Compass", 2007, 2026, "suv"], ["Gladiator", 2020, 2026, "truck"],
    ["Grand Cherokee", 1993, 2026, "suv"], ["Grand Cherokee L", 2021, 2026, "suv"],
    ["Renegade", 2015, 2023, "compact"], ["Wagoneer", 2022, 2026, "fullsize_suv"], ["Wrangler", 1990, 2026, "suv"],
  ]],
  ["Toyota", [
    ["4Runner", 1990, 2026, "suv"], ["Avalon", 1995, 2022, "sedan"], ["Camry", 1990, 2026, "sedan"],
    ["Corolla", 1990, 2026, "compact"], ["GR86", 2022, 2026, "sport"], ["Highlander", 2001, 2026, "suv"],
    ["Land Cruiser", 1990, 2026, "fullsize_suv"], ["Prius", 2001, 2026, "compact"], ["RAV4", 1996, 2026, "suv"],
    ["Sequoia", 2001, 2026, "fullsize_suv"], ["Sienna", 1998, 2026, "minivan"], ["Tacoma", 1995, 2026, "truck"],
    ["Tundra", 2000, 2026, "truck"],
  ]],
  ["Honda", [
    ["Accord", 1990, 2026, "sedan"], ["Civic", 1990, 2026, "compact"], ["CR-V", 1997, 2026, "suv"],
    ["CR-Z", 2010, 2016, "sport"], ["Element", 2003, 2011, "suv"], ["Fit", 2007, 2020, "compact"],
    ["HR-V", 2016, 2026, "suv"], ["Odyssey", 1995, 2026, "minivan"], ["Passport", 2019, 2026, "suv"],
    ["Pilot", 2003, 2026, "suv"], ["Ridgeline", 2006, 2026, "truck"],
  ]],
  ["Nissan", [
    ["Altima", 1993, 2026, "sedan"], ["Armada", 2004, 2026, "fullsize_suv"], ["Frontier", 1998, 2026, "truck"],
    ["GT-R", 2009, 2024, "sport"], ["Leaf", 2011, 2026, "ev"], ["Maxima", 1990, 2023, "sedan"],
    ["Murano", 2003, 2026, "suv"], ["Pathfinder", 1990, 2026, "suv"], ["Rogue", 2008, 2026, "suv"],
    ["Rogue Sport", 2017, 2023, "suv"], ["Sentra", 1990, 2026, "compact"], ["Titan", 2004, 2026, "truck"],
    ["Versa", 2007, 2026, "compact"],
  ]],
  ["BMW", [
    ["2 Series", 2014, 2026, "luxury_sedan"], ["3 Series", 1990, 2026, "luxury_sedan"],
    ["4 Series", 2014, 2026, "luxury_sedan"], ["5 Series", 1990, 2026, "luxury_sedan"],
    ["7 Series", 1990, 2026, "luxury_sedan"], ["8 Series", 1990, 2026, "sport"], ["i4", 2022, 2026, "ev"],
    ["iX", 2022, 2026, "ev"], ["M2", 2016, 2026, "sport"], ["M3", 1990, 2026, "sport"],
    ["M4", 2015, 2026, "sport"], ["M5", 1990, 2026, "sport"], ["X1", 2010, 2026, "luxury_suv"],
    ["X3", 2004, 2026, "luxury_suv"], ["X5", 2000, 2026, "luxury_suv"], ["X7", 2019, 2026, "luxury_suv"],
  ]],
  ["Mercedes-Benz", [
    ["A-Class", 2019, 2026, "compact"], ["C-Class", 1994, 2026, "luxury_sedan"], ["CLA", 2014, 2026, "luxury_sedan"],
    ["CLS", 2005, 2023, "luxury_sedan"], ["E-Class", 1990, 2026, "luxury_sedan"], ["EQS", 2022, 2026, "ev"],
    ["G-Class", 1990, 2026, "luxury_suv"], ["GLA", 2015, 2026, "luxury_suv"], ["GLC", 2016, 2026, "luxury_suv"],
    ["GLE", 1998, 2026, "luxury_suv"], ["GLS", 2007, 2026, "luxury_suv"], ["S-Class", 1990, 2026, "luxury_sedan"],
    ["SL", 1990, 2026, "sport"], ["Sprinter", 2002, 2026, "van"],
  ]],
  ["Audi", [
    ["A3", 2006, 2026, "compact"], ["A4", 1996, 2026, "luxury_sedan"], ["A5", 2008, 2026, "luxury_sedan"],
    ["A6", 1995, 2026, "luxury_sedan"], ["A7", 2011, 2026, "luxury_sedan"], ["A8", 1990, 2026, "luxury_sedan"],
    ["e-tron", 2019, 2023, "ev"], ["e-tron GT", 2021, 2026, "ev"], ["Q3", 2015, 2026, "luxury_suv"],
    ["Q5", 2009, 2026, "luxury_suv"], ["Q7", 2007, 2026, "luxury_suv"], ["Q8", 2019, 2026, "luxury_suv"],
    ["R8", 2008, 2024, "sport"], ["S4", 1991, 2026, "sport"], ["TT", 1999, 2023, "sport"],
  ]],
  ["Hyundai", [
    ["Elantra", 1991, 2026, "compact"], ["Genesis", 2009, 2016, "luxury_sedan"], ["Ioniq 5", 2021, 2026, "ev"],
    ["Ioniq 6", 2023, 2026, "ev"], ["Kona", 2018, 2026, "suv"], ["Palisade", 2020, 2026, "suv"],
    ["Santa Cruz", 2022, 2026, "truck"], ["Santa Fe", 2001, 2026, "suv"], ["Sonata", 1990, 2026, "sedan"],
    ["Tucson", 2005, 2026, "suv"], ["Venue", 2020, 2026, "compact"],
  ]],
  ["Kia", [
    ["Carnival", 2022, 2026, "minivan"], ["EV6", 2022, 2026, "ev"], ["Forte", 2010, 2026, "compact"],
    ["K5", 2021, 2026, "sedan"], ["Niro", 2017, 2026, "compact"], ["Seltos", 2021, 2026, "suv"],
    ["Soul", 2010, 2023, "compact"], ["Sportage", 1995, 2026, "suv"], ["Stinger", 2018, 2023, "sport"],
    ["Telluride", 2020, 2026, "suv"],
  ]],
  ["Subaru", [
    ["Ascent", 2019, 2026, "suv"], ["BRZ", 2013, 2026, "sport"], ["Crosstrek", 2013, 2026, "suv"],
    ["Forester", 1998, 2026, "suv"], ["Impreza", 1993, 2026, "compact"], ["Legacy", 1990, 2026, "sedan"],
    ["Outback", 1995, 2026, "suv"], ["Solterra", 2023, 2026, "ev"], ["WRX", 2002, 2026, "sport"],
  ]],
  ["Volkswagen", [
    ["Arteon", 2019, 2023, "sedan"], ["Atlas", 2018, 2026, "suv"], ["Atlas Cross Sport", 2020, 2026, "suv"],
    ["Golf", 1990, 2024, "compact"], ["Golf GTI", 1990, 2026, "sport"], ["Golf R", 2012, 2026, "sport"],
    ["ID.4", 2021, 2026, "ev"], ["Jetta", 1990, 2026, "compact"], ["Passat", 1990, 2022, "sedan"],
    ["Taos", 2021, 2026, "suv"], ["Tiguan", 2009, 2026, "suv"],
  ]],
  ["Lexus", [
    ["ES", 1990, 2026, "luxury_sedan"], ["GS", 1991, 2020, "luxury_sedan"], ["GX", 2003, 2026, "luxury_suv"],
    ["IS", 1999, 2026, "luxury_sedan"], ["LC", 2018, 2026, "sport"], ["LS", 1990, 2026, "luxury_sedan"],
    ["LX", 1996, 2026, "luxury_suv"], ["NX", 2015, 2026, "luxury_suv"], ["RC", 2015, 2026, "sport"],
    ["RX", 1999, 2026, "luxury_suv"], ["RZ", 2023, 2026, "ev"], ["UX", 2019, 2026, "luxury_suv"],
  ]],
  ["Acura", [
    ["ILX", 2013, 2022, "compact"], ["Integra", 2023, 2026, "compact"], ["MDX", 2001, 2026, "luxury_suv"],
    ["NSX", 1991, 2022, "sport"], ["RDX", 2007, 2026, "luxury_suv"], ["TL", 1996, 2014, "luxury_sedan"],
    ["TLX", 2015, 2026, "luxury_sedan"], ["TSX", 2004, 2014, "sedan"], ["ZDX", 2010, 2013, "luxury_suv"],
  ]],
  ["Infiniti", [
    ["G35", 2003, 2008, "sport"], ["G37", 2008, 2013, "sport"], ["Q50", 2014, 2026, "luxury_sedan"],
    ["Q60", 2017, 2022, "sport"], ["Q70", 2014, 2019, "luxury_sedan"], ["QX50", 2014, 2026, "luxury_suv"],
    ["QX55", 2022, 2026, "luxury_suv"], ["QX60", 2013, 2026, "luxury_suv"], ["QX70", 2014, 2017, "luxury_suv"],
    ["QX80", 2011, 2026, "fullsize_suv"],
  ]],
  ["Cadillac", [
    ["CT4", 2020, 2026, "luxury_sedan"], ["CT5", 2020, 2026, "luxury_sedan"], ["CT6", 2016, 2020, "luxury_sedan"],
    ["Escalade", 1999, 2026, "fullsize_suv"], ["Escalade ESV", 2002, 2026, "fullsize_suv"],
    ["Lyriq", 2023, 2026, "ev"], ["SRX", 2004, 2016, "luxury_suv"], ["XT4", 2019, 2026, "luxury_suv"],
    ["XT5", 2017, 2026, "luxury_suv"], ["XT6", 2020, 2026, "luxury_suv"],
  ]],
  ["Lincoln", [
    ["Aviator", 2020, 2026, "luxury_suv"], ["Blackwood", 2002, 2002, "truck"], ["Continental", 2017, 2020, "luxury_sedan"],
    ["Corsair", 2020, 2026, "luxury_suv"], ["MKC", 2015, 2019, "luxury_suv"], ["MKT", 2010, 2019, "luxury_suv"],
    ["MKX", 2007, 2018, "luxury_suv"], ["MKZ", 2007, 2020, "luxury_sedan"], ["Navigator", 1998, 2026, "fullsize_suv"],
    ["Nautilus", 2019, 2026, "luxury_suv"],
  ]],
  ["Porsche", [
    ["911", 1990, 2026, "sport"], ["718 Boxster", 1996, 2026, "sport"], ["718 Cayman", 2006, 2026, "sport"],
    ["Cayenne", 2003, 2026, "luxury_suv"], ["Macan", 2014, 2026, "luxury_suv"], ["Panamera", 2010, 2026, "luxury_sedan"],
    ["Taycan", 2020, 2026, "ev"],
  ]],
  ["Volvo", [
    ["C40", 2022, 2026, "ev"], ["EX30", 2024, 2026, "ev"], ["EX90", 2024, 2026, "ev"],
    ["S60", 1990, 2026, "luxury_sedan"], ["S90", 2017, 2026, "luxury_sedan"], ["V60", 2015, 2026, "luxury_sedan"],
    ["V90", 2017, 2026, "luxury_sedan"], ["XC40", 2018, 2026, "luxury_suv"], ["XC60", 2003, 2026, "luxury_suv"],
    ["XC90", 2003, 2026, "luxury_suv"],
  ]],
  ["Land Rover", [
    ["Defender", 1990, 2026, "truck"], ["Discovery", 1990, 2026, "luxury_suv"], ["Discovery Sport", 2015, 2026, "luxury_suv"],
    ["Range Rover", 1990, 2026, "luxury_suv"], ["Range Rover Evoque", 2012, 2026, "luxury_suv"],
    ["Range Rover Sport", 2006, 2026, "luxury_suv"], ["Range Rover Velar", 2018, 2026, "luxury_suv"],
  ]],
  ["Mazda", [
    ["CX-30", 2020, 2026, "suv"], ["CX-5", 2013, 2026, "suv"], ["CX-50", 2023, 2026, "suv"],
    ["CX-9", 2007, 2023, "suv"], ["CX-90", 2024, 2026, "suv"], ["Mazda2", 2011, 2014, "compact"],
    ["Mazda3", 1990, 2026, "compact"], ["Mazda6", 2003, 2021, "sedan"], ["MX-5 Miata", 1990, 2026, "sport"],
    ["MX-30", 2022, 2023, "ev"],
  ]],
  ["Mitsubishi", [
    ["Eclipse Cross", 2018, 2026, "suv"], ["Galant", 1990, 2012, "sedan"], ["Lancer", 2002, 2017, "compact"],
    ["Mirage", 2014, 2026, "compact"], ["Outlander", 2003, 2026, "suv"], ["Outlander PHEV", 2018, 2026, "suv"],
    ["Outlander Sport", 2011, 2026, "suv"], ["Raider", 2006, 2009, "truck"],
  ]],
  ["Buick", [
    ["Enclave", 2008, 2026, "suv"], ["Encore", 2013, 2024, "compact"], ["Encore GX", 2020, 2026, "suv"],
    ["Envision", 2016, 2026, "suv"], ["Envista", 2024, 2026, "suv"], ["LaCrosse", 2005, 2019, "sedan"],
    ["Regal", 2011, 2020, "sedan"], ["Verano", 2012, 2017, "compact"],
  ]],
  ["Chrysler", [
    ["200", 2011, 2017, "sedan"], ["300", 2004, 2026, "sedan"], ["Pacifica", 2017, 2026, "minivan"],
    ["Town & Country", 1990, 2016, "minivan"], ["Voyager", 2020, 2026, "minivan"],
  ]],
  ["Tesla", [
    ["Cybertruck", 2024, 2026, "ev"], ["Model 3", 2017, 2026, "ev"], ["Model S", 2012, 2026, "ev"],
    ["Model X", 2015, 2026, "ev"], ["Model Y", 2020, 2026, "ev"], ["Roadster", 2008, 2012, "ev"],
  ]],
  ["Jaguar", [
    ["E-Pace", 2018, 2026, "luxury_suv"], ["F-Pace", 2017, 2026, "luxury_suv"], ["F-Type", 2014, 2024, "sport"],
    ["I-Pace", 2019, 2026, "ev"], ["XE", 2017, 2020, "luxury_sedan"], ["XF", 2009, 2026, "luxury_sedan"],
    ["XJ", 1990, 2019, "luxury_sedan"],
  ]],
  ["Mini", [
    ["Clubman", 2008, 2026, "compact"], ["Convertible", 2005, 2026, "compact"], ["Countryman", 2011, 2026, "suv"],
    ["Hardtop 2 Door", 1990, 2026, "compact"], ["Hardtop 4 Door", 2015, 2026, "compact"],
  ]],
];

// ─── Normalized entity types (Phase 7) ──────────────────────────────────────────

export interface Manufacturer {
  id: string;
  name: string;
  slug: string;
}

export interface VehicleModel {
  id: string;
  manufacturerId: string;
  name: string;
  yearStart: number;
  yearEnd: number;
}

export interface VehicleTrim {
  id: string;
  modelId: string;
  name: string;
  yearStart: number;
  yearEnd: number;
}

export interface VehicleEngine {
  id: string;
  trimId: string;
  name: string;
  driveType: string;
  bodyStyle: string;
}

// ─── Generation ──────────────────────────────────────────────────────────────────

const manufacturers: Manufacturer[] = [];
const models: VehicleModel[] = [];
const trims: VehicleTrim[] = [];
const engines: VehicleEngine[] = [];

let modelSeq = 0;
let trimSeq = 0;
let engineSeq = 0;

for (const [makeName, modelTuples] of MAKE_MODEL_DATA) {
  const manufacturer: Manufacturer = { id: slugify(makeName), name: makeName, slug: slugify(makeName) };
  manufacturers.push(manufacturer);

  for (const [modelName, yearStart, yearEndRaw, segment] of modelTuples) {
    const yearEnd = Math.min(yearEndRaw, CURRENT_YEAR);
    const modelId = `m${modelSeq++}`;
    models.push({ id: modelId, manufacturerId: manufacturer.id, name: modelName, yearStart, yearEnd });

    const config = SEGMENT_CONFIG[segment];

    config.trims.forEach((trimName, trimIndex) => {
      const trimId = `t${trimSeq++}`;
      trims.push({ id: trimId, modelId, name: trimName, yearStart, yearEnd });

      // Higher trims unlock progressively more engine choices (and always
      // retain the choices available to the trims below them).
      const engineChoices = config.engines.slice(0, Math.min(trimIndex + 1, config.engines.length));

      for (const engineName of engineChoices) {
        for (const driveType of config.driveTypes) {
          engines.push({
            id: `e${engineSeq++}`,
            trimId,
            name: engineName,
            driveType,
            bodyStyle: config.bodyStyle,
          });
        }
      }
    });
  }
}

// ─── Indices (Phase 6 / Phase 8 — O(1) average lookups) ────────────────────────

const manufacturerByName = new Map<string, Manufacturer>(
  manufacturers.map((m) => [m.name.toLowerCase(), m])
);

const modelsByManufacturerId = new Map<string, VehicleModel[]>();
for (const model of models) {
  const list = modelsByManufacturerId.get(model.manufacturerId);
  if (list) list.push(model);
  else modelsByManufacturerId.set(model.manufacturerId, [model]);
}

const modelByManufacturerAndName = new Map<string, VehicleModel>(
  models.map((m) => [`${m.manufacturerId}|${m.name.toLowerCase()}`, m])
);

const trimsByModelId = new Map<string, VehicleTrim[]>();
for (const trim of trims) {
  const list = trimsByModelId.get(trim.modelId);
  if (list) list.push(trim);
  else trimsByModelId.set(trim.modelId, [trim]);
}

const trimByModelAndName = new Map<string, VehicleTrim>(
  trims.map((t) => [`${t.modelId}|${t.name.toLowerCase()}`, t])
);

const enginesByTrimId = new Map<string, VehicleEngine[]>();
for (const engine of engines) {
  const list = enginesByTrimId.get(engine.trimId);
  if (list) list.push(engine);
  else enginesByTrimId.set(engine.trimId, [engine]);
}

/** Precomputed: which manufacturer IDs have at least one model+trim spanning a given year. */
const manufacturerIdsByYear = new Map<number, Set<string>>();
/** Precomputed: which model IDs (within a manufacturer) span a given year. */
const modelIdsByManufacturerYear = new Map<string, Set<string>>();

for (const model of models) {
  for (let y = model.yearStart; y <= model.yearEnd; y++) {
    if (!manufacturerIdsByYear.has(y)) manufacturerIdsByYear.set(y, new Set());
    manufacturerIdsByYear.get(y)!.add(model.manufacturerId);

    const key = `${model.manufacturerId}|${y}`;
    if (!modelIdsByManufacturerYear.has(key)) modelIdsByManufacturerYear.set(key, new Set());
    modelIdsByManufacturerYear.get(key)!.add(model.id);
  }
}

// ─── Resolution helpers ──────────────────────────────────────────────────────────

function resolveManufacturer(make: string): Manufacturer | undefined {
  return manufacturerByName.get(make.toLowerCase());
}

function resolveModel(make: string, model: string): VehicleModel | undefined {
  const mfr = resolveManufacturer(make);
  if (!mfr) return undefined;
  return modelByManufacturerAndName.get(`${mfr.id}|${model.toLowerCase()}`);
}

function resolveTrim(make: string, model: string, trim: string): VehicleTrim | undefined {
  const mo = resolveModel(make, model);
  if (!mo) return undefined;
  return trimByModelAndName.get(`${mo.id}|${trim.toLowerCase()}`);
}

// ─── Public API ──────────────────────────────────────────────────────────────────

export const ALL_YEARS: number[] = Array.from(
  { length: CURRENT_YEAR - DB_START_YEAR + 1 },
  (_, i) => CURRENT_YEAR - i
); // 2026..1990, descending for dropdown use

export function getAllMakes(): string[] {
  return manufacturers.map((m) => m.name);
}

/** Makes with at least one model available in the given year — Year selected first. */
export function getMakesForYear(year: number): string[] {
  const ids = manufacturerIdsByYear.get(year);
  if (!ids) return [];
  return manufacturers.filter((m) => ids.has(m.id)).map((m) => m.name);
}

export function getModelsForMake(make: string): string[] {
  const mfr = resolveManufacturer(make);
  if (!mfr) return [];
  return (modelsByManufacturerId.get(mfr.id) ?? []).map((m) => m.name);
}

/** Models of `make` actually produced in `year`. */
export function getModelsForMakeYear(make: string, year: number): string[] {
  const mfr = resolveManufacturer(make);
  if (!mfr) return [];
  const ids = modelIdsByManufacturerYear.get(`${mfr.id}|${year}`);
  if (!ids) return [];
  return (modelsByManufacturerId.get(mfr.id) ?? [])
    .filter((m) => ids.has(m.id))
    .map((m) => m.name);
}

export function getYearsForModel(make: string, model: string): number[] {
  const mo = resolveModel(make, model);
  if (!mo) return [];
  const start = Math.max(mo.yearStart, DB_START_YEAR);
  const end = Math.min(mo.yearEnd, CURRENT_YEAR);
  return Array.from({ length: end - start + 1 }, (_, i) => end - i); // descending
}

/** Trims of `model` available in `year`. */
export function getTrimsForVehicle(make: string, model: string, year: number): string[] {
  const mo = resolveModel(make, model);
  if (!mo) return [];
  return (trimsByModelId.get(mo.id) ?? [])
    .filter((t) => year >= t.yearStart && year <= t.yearEnd)
    .map((t) => t.name);
}

/** Distinct engine sizes offered for a specific make/model/trim. */
export function getEngineSizesForTrim(make: string, model: string, trim: string): string[] {
  const t = resolveTrim(make, model, trim);
  if (!t) return [];
  const list = enginesByTrimId.get(t.id) ?? [];
  return Array.from(new Set(list.map((e) => e.name)));
}

/** Drive types available for that engine size, within that trim. Length <= 1 means "not available" — caller should hide the step. */
export function getDriveTypesForEngine(make: string, model: string, trim: string, engineName: string): string[] {
  const t = resolveTrim(make, model, trim);
  if (!t) return [];
  const list = enginesByTrimId.get(t.id) ?? [];
  return Array.from(new Set(list.filter((e) => e.name === engineName).map((e) => e.driveType)));
}

/** Body styles available for that engine + drive type combo. Length <= 1 means "not available" — caller should hide the step. */
export function getBodyStylesForEngine(
  make: string, model: string, trim: string, engineName: string, driveType: string
): string[] {
  const t = resolveTrim(make, model, trim);
  if (!t) return [];
  const list = enginesByTrimId.get(t.id) ?? [];
  return Array.from(
    new Set(list.filter((e) => e.name === engineName && e.driveType === driveType).map((e) => e.bodyStyle))
  );
}

/** Backward-compatible helper: full engine name list for a make/model/year (no trim narrowing). Used where only Year/Make/Model/Engine matters. */
export function getEnginesForVehicle(make: string, model: string, year: number): string[] {
  const mo = resolveModel(make, model);
  if (!mo || year < mo.yearStart || year > mo.yearEnd) return [];
  const modelTrims = (trimsByModelId.get(mo.id) ?? []).filter((t) => year >= t.yearStart && year <= t.yearEnd);
  const names = new Set<string>();
  for (const t of modelTrims) {
    for (const e of enginesByTrimId.get(t.id) ?? []) names.add(e.name);
  }
  return Array.from(names);
}

export function getTotalVehicleCount(): number {
  return engines.length;
}
