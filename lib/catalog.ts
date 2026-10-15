/**
 * lib/catalog.ts
 * Single source of truth for the RockAutoTec parts catalog.
 * Products are generated deterministically from a fixed set of real part-type
 * templates × real brands × real vehicle fitment combinations — not random,
 * not hand-typed lorem data. Re-running this module always produces the same
 * 1,500-product catalog (150 part-type templates × 10 brands).
 */

import { MAKES } from "@/lib/makes";

// ─── Categories ────────────────────────────────────────────────────────────────

export const CATEGORIES = [
  "Brakes", "Suspension", "Engine", "Cooling", "Electrical",
  "Fuel System", "Ignition", "Exhaust", "Lighting", "Body Parts",
  "Tires & Wheels", "Performance", "Towing & Hauling", "Climate Control", "Drivetrain",
  "Filters & Maintenance",
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
  "Tires & Wheels": "tires-wheels",
  Performance: "performance",
  "Towing & Hauling": "towing-hauling",
  "Climate Control": "climate-control",
  Drivetrain: "drivetrain",
  "Filters & Maintenance": "filters-maintenance",
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
  "Tires & Wheels": "CircleDot",
  Performance: "Rocket",
  "Towing & Hauling": "Truck",
  "Climate Control": "Snowflake",
  Drivetrain: "Cog",
  "Filters & Maintenance": "Filter",
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
  { category: "Brakes", partType: "Brake Hardware",    namePattern: "{brand} Brake Hardware Kit",             priceMin: 12,  priceMax: 32  },

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

  // Tires & Wheels
  { category: "Tires & Wheels", partType: "Tires",            namePattern: "{brand} All-Season Tire (Each)",         priceMin: 89,  priceMax: 249 },
  { category: "Tires & Wheels", partType: "Tires",            namePattern: "{brand} Performance Tire (Each)",        priceMin: 109, priceMax: 289 },
  { category: "Tires & Wheels", partType: "Wheels",           namePattern: "{brand} Alloy Wheel Rim (Each)",         priceMin: 149, priceMax: 399 },
  { category: "Tires & Wheels", partType: "Wheel Hardware",   namePattern: "{brand} Wheel Lug Nut Set (20-Pack)",    priceMin: 18,  priceMax: 42  },
  { category: "Tires & Wheels", partType: "TPMS",             namePattern: "{brand} Tire Pressure Sensor (TPMS)",    priceMin: 38,  priceMax: 94  },
  { category: "Tires & Wheels", partType: "Wheel Accessories",namePattern: "{brand} Wheel Hub Cap",                  priceMin: 9,   priceMax: 24  },
  { category: "Tires & Wheels", partType: "Tires",            namePattern: "{brand} Spare Tire Kit",                 priceMin: 64,  priceMax: 149 },
  { category: "Tires & Wheels", partType: "Wheel Hardware",   namePattern: "{brand} Wheel Lock Set",                 priceMin: 22,  priceMax: 54  },
  { category: "Tires & Wheels", partType: "Wheel Accessories",namePattern: "{brand} Tire Valve Stem (4-Pack)",       priceMin: 4,   priceMax: 9   },
  { category: "Tires & Wheels", partType: "Wheel Accessories",namePattern: "{brand} Wheel Center Cap",               priceMin: 12,  priceMax: 28  },

  // Performance
  { category: "Performance", partType: "Intake & Exhaust",        namePattern: "{brand} Cold Air Intake System",         priceMin: 124, priceMax: 289 },
  { category: "Performance", partType: "Intake & Exhaust",        namePattern: "{brand} Cat-Back Performance Exhaust",   priceMin: 349, priceMax: 799 },
  { category: "Performance", partType: "Brakes",                  namePattern: "{brand} Performance Brake Pad Set – Front", priceMin: 64, priceMax: 179 },
  { category: "Performance", partType: "Drivetrain Performance",   namePattern: "{brand} Short Throw Shifter",            priceMin: 89,  priceMax: 189 },
  { category: "Performance", partType: "Suspension Performance",   namePattern: "{brand} Lowering Spring Kit",            priceMin: 199, priceMax: 449 },
  { category: "Performance", partType: "Suspension Performance",   namePattern: "{brand} Strut Tower Brace",              priceMin: 64,  priceMax: 149 },
  { category: "Performance", partType: "Electronics",              namePattern: "{brand} Performance Tuner",              priceMin: 199, priceMax: 399 },
  { category: "Performance", partType: "Engine Performance",       namePattern: "{brand} Underdrive Pulley Kit",          priceMin: 109, priceMax: 249 },
  { category: "Performance", partType: "Drivetrain Performance",   namePattern: "{brand} Performance Clutch Kit",         priceMin: 249, priceMax: 549 },
  { category: "Performance", partType: "Engine Performance",       namePattern: "{brand} Turbocharger Upgrade Kit",       priceMin: 899, priceMax: 1899 },

  // Towing & Hauling
  { category: "Towing & Hauling", partType: "Hitches",            namePattern: "{brand} Trailer Hitch – Class III",      priceMin: 124, priceMax: 249 },
  { category: "Towing & Hauling", partType: "Wiring & Harnesses", namePattern: "{brand} Trailer Wiring Harness",          priceMin: 38,  priceMax: 94  },
  { category: "Towing & Hauling", partType: "Hitches",            namePattern: "{brand} Adjustable Ball Mount",          priceMin: 28,  priceMax: 64  },
  { category: "Towing & Hauling", partType: "Hitches",            namePattern: "{brand} Weight Distribution Hitch Kit",  priceMin: 199, priceMax: 449 },
  { category: "Towing & Hauling", partType: "Towing Accessories", namePattern: "{brand} Trailer Brake Controller",        priceMin: 89,  priceMax: 199 },
  { category: "Towing & Hauling", partType: "Bed Accessories",    namePattern: "{brand} Spray-On Bed Liner Kit",          priceMin: 199, priceMax: 449 },
  { category: "Towing & Hauling", partType: "Bed Accessories",    namePattern: "{brand} Roll-Up Tonneau Cover",           priceMin: 249, priceMax: 549 },
  { category: "Towing & Hauling", partType: "Towing Accessories", namePattern: "{brand} Hitch-Mount Cargo Carrier",       priceMin: 89,  priceMax: 179 },
  { category: "Towing & Hauling", partType: "Hitches",            namePattern: "{brand} Trailer Coupler Lock",            priceMin: 18,  priceMax: 38  },
  { category: "Towing & Hauling", partType: "Mirrors",            namePattern: "{brand} Towing Mirror Pair",              priceMin: 64,  priceMax: 149 },

  // Climate Control
  { category: "Climate Control", partType: "AC Components",    namePattern: "{brand} AC Compressor",                  priceMin: 149, priceMax: 329 },
  { category: "Climate Control", partType: "AC Components",    namePattern: "{brand} AC Condenser",                   priceMin: 89,  priceMax: 219 },
  { category: "Climate Control", partType: "Filters",          namePattern: "{brand} Cabin Air Filter",                priceMin: 12,  priceMax: 28  },
  { category: "Climate Control", partType: "Heating Components", namePattern: "{brand} Heater Core",                   priceMin: 109, priceMax: 259 },
  { category: "Climate Control", partType: "AC Components",    namePattern: "{brand} AC Receiver Drier",               priceMin: 28,  priceMax: 64  },
  { category: "Climate Control", partType: "Blower Motors",    namePattern: "{brand} HVAC Blower Motor",               priceMin: 44,  priceMax: 109 },
  { category: "Climate Control", partType: "Controls",         namePattern: "{brand} HVAC Control Module",             priceMin: 89,  priceMax: 219 },
  { category: "Climate Control", partType: "AC Components",    namePattern: "{brand} AC Refrigerant Recharge Kit",     priceMin: 24,  priceMax: 54  },
  { category: "Climate Control", partType: "AC Components",    namePattern: "{brand} AC Evaporator Core",              priceMin: 124, priceMax: 269 },
  { category: "Climate Control", partType: "AC Components",    namePattern: "{brand} AC Compressor Clutch",            priceMin: 64,  priceMax: 149 },

  // Drivetrain
  { category: "Drivetrain", partType: "Axles",        namePattern: "{brand} CV Axle Shaft – Front",            priceMin: 64,  priceMax: 149 },
  { category: "Drivetrain", partType: "Axles",        namePattern: "{brand} CV Joint Boot Kit",                priceMin: 18,  priceMax: 42  },
  { category: "Drivetrain", partType: "Differentials",namePattern: "{brand} Rear Differential Assembly",       priceMin: 349, priceMax: 799 },
  { category: "Drivetrain", partType: "Transfer Case", namePattern: "{brand} Transfer Case Assembly",           priceMin: 449, priceMax: 999 },
  { category: "Drivetrain", partType: "Drive Shafts", namePattern: "{brand} Front Drive Shaft",                priceMin: 199, priceMax: 429 },
  { category: "Drivetrain", partType: "Drive Shafts", namePattern: "{brand} U-Joint Kit",                      priceMin: 18,  priceMax: 42  },
  { category: "Drivetrain", partType: "Fluids",       namePattern: "{brand} Differential Fluid (1qt)",         priceMin: 9,   priceMax: 16  },
  { category: "Drivetrain", partType: "Bearings",     namePattern: "{brand} 4WD Wheel Hub & Bearing",          priceMin: 64,  priceMax: 159 },
  { category: "Drivetrain", partType: "Bearings",     namePattern: "{brand} Transmission Output Shaft Seal",    priceMin: 12,  priceMax: 28  },
  { category: "Drivetrain", partType: "Bearings",     namePattern: "{brand} Axle Bearing & Seal Kit",          priceMin: 38,  priceMax: 84  },

  // Filters & Maintenance
  { category: "Filters & Maintenance", partType: "Oil Filters",    namePattern: "{brand} Engine Oil Filter",              priceMin: 6,   priceMax: 16  },
  { category: "Filters & Maintenance", partType: "Engine Oil",     namePattern: "{brand} Full Synthetic Engine Oil (5qt)", priceMin: 24,  priceMax: 54  },
  { category: "Filters & Maintenance", partType: "Drain Hardware", namePattern: "{brand} Oil Drain Plug Washer (5-Pack)", priceMin: 4,   priceMax: 12  },
  { category: "Filters & Maintenance", partType: "Air Filters",    namePattern: "{brand} Engine Air Filter",              priceMin: 14,  priceMax: 32  },
  { category: "Filters & Maintenance", partType: "Cabin Filters",  namePattern: "{brand} Cabin Air Filter",                priceMin: 12,  priceMax: 28  },
  { category: "Filters & Maintenance", partType: "Fuel Filters",   namePattern: "{brand} Fuel Filter",                     priceMin: 12,  priceMax: 29  },
  { category: "Filters & Maintenance", partType: "Transmission Filters", namePattern: "{brand} Transmission Filter Kit",  priceMin: 28,  priceMax: 64  },
  { category: "Filters & Maintenance", partType: "Fluids",         namePattern: "{brand} Windshield Washer Fluid (1 Gal)", priceMin: 6,   priceMax: 14  },
  { category: "Filters & Maintenance", partType: "Belts",          namePattern: "{brand} Serpentine Belt Tensioner",       priceMin: 28,  priceMax: 69  },
  { category: "Filters & Maintenance", partType: "Emission Components", namePattern: "{brand} PCV Valve",                 priceMin: 8,   priceMax: 20  },
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
  /** This brand's own catalog number for the part — distinct from the OEM number and from interchangeNumbers (other brands' cross-references). */
  aftermarketNumber: string;
  interchangeNumbers: string[];
  price: number;
  was: number;
  rating: number;
  reviews: number;
  category: Category;
  /** Doubles as "Subcategory" in the schema spec — e.g. category "Brakes", partType "Brake Pads". */
  partType: string;
  inStock: boolean;
  /** Doubles as "Vehicle Compatibility" in the schema spec. */
  fitment: FitmentEntry[];
  /** Category-relevant technical specs shown in the product page's Specifications table. */
  specifications: { label: string; value: string }[];
  warranty: string;
  weight: string;
  dimensions: string;
  material: string;
  countryOfOrigin: string;
  condition: "New" | "Remanufactured";
  /**
   * Image gallery tokens (Phase 3 architecture). A token is either a real
   * image URL (starts with "http" or "/") or a placeholder identifier like
   * "placeholder-1". components/product-gallery.tsx is the single place
   * that decides how to render a token — today every token is a placeholder
   * rendered via PartIcon, but swapping a product's `images` values to real
   * URLs later makes the gallery render real photos with no code changes.
   */
  images: string[];
}

/** Category-level physical material used for the spec sheet and the Material field. Not per-part-type precise (e.g. rotors vs. pads), which would require many more categories — a reasonable simplification at catalog scale. */
const CATEGORY_MATERIAL: Record<Category, string> = {
  Brakes: "Semi-Metallic / Cast Iron",
  Suspension: "Forged Steel",
  Engine: "Aluminum / Steel",
  Cooling: "Aluminum / Plastic Composite",
  Electrical: "Copper / Plastic Composite",
  "Fuel System": "Steel / Composite",
  Ignition: "Ceramic / Metal Alloy",
  Exhaust: "Stainless Steel",
  Lighting: "Polycarbonate / Glass",
  "Body Parts": "ABS Plastic / Steel",
  "Tires & Wheels": "Rubber / Aluminum Alloy",
  Performance: "Aluminum / Stainless Steel",
  "Towing & Hauling": "Steel, Powder-Coated",
  "Climate Control": "Aluminum",
  Drivetrain: "Forged Steel",
  "Filters & Maintenance": "Synthetic Fiber / Steel",
};

const CATEGORY_SPECIFICATIONS: Record<Category, { label: string; value: string }[]> = {
  Brakes: [
    { label: "Friction Material", value: "Ceramic / Semi-Metallic" },
    { label: "Includes Hardware", value: "Yes" },
  ],
  Suspension: [
    { label: "Mounting Type", value: "Direct OEM Bolt-On" },
    { label: "Finish", value: "Corrosion-Resistant Coating" },
  ],
  Engine: [
    { label: "OEM Compliant", value: "Yes" },
    { label: "Tolerance", value: "OEM Spec" },
  ],
  Cooling: [
    { label: "Coolant Type", value: "Universal (verify OEM spec)" },
    { label: "Pressure Rating", value: "OEM Spec" },
  ],
  Electrical: [
    { label: "Voltage", value: "12V" },
    { label: "Connector Type", value: "OEM-Matched" },
  ],
  "Fuel System": [
    { label: "Fuel Compatibility", value: "Gasoline (E10 Max)" },
    { label: "Pressure Rating", value: "OEM Spec" },
  ],
  Ignition: [
    { label: "Voltage", value: "12V" },
    { label: "Heat Range", value: "OEM Spec" },
  ],
  Exhaust: [
    { label: "Finish", value: "Aluminized Steel" },
    { label: "Sound Level", value: "OEM-Comparable" },
  ],
  Lighting: [
    { label: "Voltage", value: "12V" },
    { label: "Bulb/LED Type", value: "OEM-Matched" },
  ],
  "Body Parts": [
    { label: "Finish", value: "Primed, Paint-Ready" },
    { label: "Mounting Type", value: "Direct OEM Bolt-On" },
  ],
  "Tires & Wheels": [
    { label: "Load Rating", value: "Standard" },
    { label: "Speed Rating", value: "Standard" },
  ],
  Performance: [
    { label: "Application", value: "Street / Track" },
    { label: "Finish", value: "Polished / Powder-Coated" },
  ],
  "Towing & Hauling": [
    { label: "Weight Capacity", value: "See title for class rating" },
    { label: "Finish", value: "Powder-Coated Steel" },
  ],
  "Climate Control": [
    { label: "Refrigerant Type", value: "R-134a / 1234yf (verify OEM)" },
    { label: "Pressure Rating", value: "OEM Spec" },
  ],
  Drivetrain: [
    { label: "Drive Configuration", value: "OEM-Matched" },
    { label: "Finish", value: "Corrosion-Resistant Coating" },
  ],
  "Filters & Maintenance": [
    { label: "Filter Media", value: "Multi-Fiber / Synthetic" },
    { label: "Service Interval", value: "Per OEM maintenance schedule" },
  ],
};

const BRAND_ORIGIN: Record<Brand, string> = {
  Bosch: "Germany",
  Denso: "Japan",
  NGK: "Japan",
  Gates: "USA",
  Monroe: "USA",
  KYB: "Japan",
  Moog: "USA",
  ACDelco: "USA",
  Motorcraft: "USA",
  "Standard Motor Products": "USA",
};

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
      const aftermarketNumber = `AM-${code}-${(id * 13) % 99999}`;
      const interchangeNumbers = [
        `DOR${(200000 + id * 3) % 999999}`,
        `RAY${(300000 + id * 11) % 999999}`,
      ];

      const sku = `${code}${tpl.partType.replace(/[^A-Za-z]/g, "").slice(0, 3).toUpperCase()}${id}`;
      const name = tpl.namePattern.replace("{brand}", brand);
      const condition: Product["condition"] = name.includes("Remanufactured") ? "Remanufactured" : "New";

      const weight = `${(1 + price / 40).toFixed(1)} lbs`;
      const dimensions = `${8 + (id % 10)} x ${4 + (id % 6)} x ${2 + (id % 4)} in`;

      products.push({
        id,
        name,
        brand,
        manufacturer: MANUFACTURER_NAMES[brand],
        sku,
        oemNumber,
        aftermarketNumber,
        interchangeNumbers,
        price,
        was,
        rating,
        reviews,
        category: tpl.category,
        partType: tpl.partType,
        inStock: seed % 23 !== 0, // ~96% in stock
        fitment: generateFitment(seed + id),
        specifications: CATEGORY_SPECIFICATIONS[tpl.category],
        warranty: "12 months / 12,000 miles",
        weight,
        dimensions,
        material: CATEGORY_MATERIAL[tpl.category],
        countryOfOrigin: BRAND_ORIGIN[brand],
        condition,
        images: ["placeholder-1", "placeholder-2", "placeholder-3", "placeholder-4"],
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

/**
 * Scored recommendations (Phase 4): same category, same brand, overlapping
 * vehicle fitment, and shared interchange/OEM cross-references all push a
 * candidate's score up. Same partType (the closest possible match, e.g.
 * "Brake Pads" → "Brake Pads" from a different brand) outranks everything.
 */
function relatedScore(product: Product, candidate: Product): number {
  let score = 0;
  if (candidate.category === product.category) score += 3;
  if (candidate.partType === product.partType) score += 4;
  if (candidate.brand === product.brand) score += 2;
  if (candidate.oemNumber === product.oemNumber) score += 5;
  if (candidate.interchangeNumbers.some((n) => product.interchangeNumbers.includes(n))) score += 3;
  const sharesVehicle = candidate.fitment.some((cf) =>
    product.fitment.some((pf) => pf.make === cf.make && pf.model === cf.model)
  );
  if (sharesVehicle) score += 2;
  return score;
}

export function getRelatedProducts(product: Product, count = 4): Product[] {
  return ALL_PRODUCTS
    .filter((p) => p.id !== product.id && p.category === product.category)
    .map((p) => ({ p, score: relatedScore(product, p) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map(({ p }) => p);
}

// Phase 5 — explicit companion chains for the catalog's signature cross-sell
// examples (brake job parts, oil-change parts). Every other part type falls
// back to "a different part type in the same category", unchanged from
// before this map existed.
const COMPANION_PART_TYPES: Record<string, string[]> = {
  "Brake Pads": ["Brake Rotors", "Brake Hardware"],
  "Brake Rotors": ["Brake Pads", "Brake Hardware"],
  "Brake Hardware": ["Brake Pads", "Brake Rotors"],
  "Oil Filters": ["Engine Oil", "Drain Hardware"],
  "Engine Oil": ["Oil Filters", "Drain Hardware"],
  "Drain Hardware": ["Oil Filters", "Engine Oil"],
};

/** Frequently Bought Together (Phase 5): companion part types when a mapping exists, otherwise any other part type in the same category. */
export function getFrequentlyBoughtTogether(product: Product, count = 3): Product[] {
  const companionTypes = COMPANION_PART_TYPES[product.partType];
  const pool = companionTypes
    ? ALL_PRODUCTS.filter((p) => p.id !== product.id && companionTypes.includes(p.partType))
    : ALL_PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category && p.partType !== product.partType);

  const seenTypes = new Set<string>([product.partType]);
  const picks: Product[] = [];
  for (const p of pool.sort((a, b) => relatedScore(product, b) - relatedScore(product, a))) {
    if (seenTypes.has(p.partType)) continue;
    seenTypes.add(p.partType);
    picks.push(p);
    if (picks.length === count) break;
  }
  return picks;
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
