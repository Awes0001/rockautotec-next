/**
 * lib/catalog.ts
 * Local product catalog used by brand pages and other non-Supabase pages.
 * All data is static — no server calls required.
 */

export interface Product {
  id: number;
  name: string;
  brand: string;
  sku: string;
  price: number;
  was: number;
  rating: number;
  reviews: number;
  category: string;
  subcategory: string;
  inStock: boolean;
  description: string;
}

// ─── Full catalog (brand-keyed) ───────────────────────────────────────────────

const ALL_PRODUCTS: Product[] = [
  // ── Bosch ────────────────────────────────────────────────────────────────
  { id:1001, brand:"Bosch", name:"Bosch QuietCast Premium Brake Pad Set",      sku:"BC0905",        price:42.99,  was:67.99,  rating:4.8, reviews:2847,  category:"Brake System",          subcategory:"Brake Pads",       inStock:true,  description:"OE-style friction formulation for quiet stops and long pad life." },
  { id:1002, brand:"Bosch", name:"Bosch Remanufactured Alternator",             sku:"BOSC-AL0782X",  price:148.99, was:209.99, rating:4.6, reviews:891,   category:"Electrical & Lighting", subcategory:"Charging System",  inStock:true,  description:"100% new internal components; tested to OE standards." },
  { id:1003, brand:"Bosch", name:"Bosch ICON Premium Wiper Blade (2-Pack)",     sku:"BOSC-26A18",    price:34.99,  was:49.99,  rating:4.8, reviews:5132,  category:"Filters & Maintenance", subcategory:"Wiper Blades",     inStock:true,  description:"Exclusive curved beam design for all-season streak-free wiping." },
  { id:1004, brand:"Bosch", name:"Bosch Fuel Injector Set (4-Pack)",            sku:"BOSC-0280156163",price:124.99,was:174.99, rating:4.8, reviews:891,   category:"Fuel System",           subcategory:"Fuel Injectors",   inStock:true,  description:"OE-matched spray pattern; compatible with flex-fuel applications." },
  { id:1005, brand:"Bosch", name:"Bosch Distance Plus Wiper Blades (2-Pack)",   sku:"BOSC-3397001539",price:24.99, was:36.99,  rating:4.7, reviews:4532,  category:"Filters & Maintenance", subcategory:"Wiper Blades",     inStock:true,  description:"Up to 40% longer life than conventional wiper blades." },
  { id:1006, brand:"Bosch", name:"Bosch Oxygen Sensor – Upstream",              sku:"BOSC-17014",    price:38.99,  was:57.99,  rating:4.7, reviews:2134,  category:"Electrical & Lighting", subcategory:"Sensors",          inStock:true,  description:"Premium OE fit; wide-band sensor with OEM-level accuracy." },
  { id:1007, brand:"Bosch", name:"Bosch Cabin Air Filter Insert",               sku:"BOSC-C3688WS",  price:18.99,  was:27.99,  rating:4.7, reviews:3421,  category:"Filters & Maintenance", subcategory:"Air Filters",      inStock:true,  description:"Activated carbon layer blocks pollen, dust, and odors." },

  // ── Denso ────────────────────────────────────────────────────────────────
  { id:2001, brand:"Denso", name:"Denso Oxygen Sensor – Universal",             sku:"DS2345813",     price:28.49,  was:45.00,  rating:4.7, reviews:1523,  category:"Electrical & Lighting", subcategory:"Sensors",          inStock:true,  description:"OE-quality zirconia element; direct OEM replacement." },
  { id:2002, brand:"Denso", name:"Denso Iridium Long Life Spark Plug (4-Pack)", sku:"DENSO-IK20",    price:36.99,  was:54.99,  rating:4.8, reviews:4231,  category:"Engine Parts",          subcategory:"Spark Plugs",      inStock:true,  description:"1.1mm ultra-fine iridium tip for maximum ignitability." },
  { id:2003, brand:"Denso", name:"Denso Water Pump with Gasket",                sku:"DENSO-280-0174",price:74.99,  was:104.99, rating:4.7, reviews:1102,  category:"Cooling System",        subcategory:"Water Pumps",      inStock:true,  description:"OE-matched impeller design for optimal coolant flow." },
  { id:2004, brand:"Denso", name:"Denso Mass Airflow Sensor",                   sku:"DENSO-197-6221",price:84.99,  was:119.99, rating:4.6, reviews:892,   category:"Electrical & Lighting", subcategory:"Sensors",          inStock:true,  description:"100% OEM match with precision hot-wire sensing element." },
  { id:2005, brand:"Denso", name:"Denso Starter Motor – Remanufactured",        sku:"DENSO-280-0137",price:139.99, was:194.99, rating:4.6, reviews:543,   category:"Electrical & Lighting", subcategory:"Starting System",  inStock:true,  description:"OE specifications with 100% quality tested performance." },
  { id:2006, brand:"Denso", name:"Denso AC Compressor with Clutch",             sku:"DENSO-471-1223",price:214.99, was:299.99, rating:4.5, reviews:418,   category:"Electrical & Lighting", subcategory:"AC System",        inStock:true,  description:"Factory new compressor; OEM-matched for direct bolt-on fit." },

  // ── NGK ──────────────────────────────────────────────────────────────────
  { id:3001, brand:"NGK", name:"NGK Iridium IX Spark Plug Set (4-Pack)",       sku:"NGK4218",        price:34.99,  was:52.00,  rating:4.8, reviews:3201,  category:"Engine Parts",          subcategory:"Spark Plugs",      inStock:true,  description:"Iridium-tipped electrode for high ignitability and longevity." },
  { id:3002, brand:"NGK", name:"NGK Laser Platinum Spark Plug Set (6-Pack)",   sku:"NGK-ZFR5FP-11G", price:56.99,  was:82.99,  rating:4.7, reviews:1876,  category:"Engine Parts",          subcategory:"Spark Plugs",      inStock:true,  description:"Double platinum construction; up to 105,000-mile service life." },
  { id:3003, brand:"NGK", name:"NGK NTK Oxygen Sensor – Downstream",           sku:"NGK-25037",      price:32.99,  was:49.99,  rating:4.7, reviews:1234,  category:"Electrical & Lighting", subcategory:"Sensors",          inStock:true,  description:"OE-style titania or zirconia element; plug-and-play fitment." },
  { id:3004, brand:"NGK", name:"NGK Spark Plug Wire Set",                      sku:"NGK-9929",       price:29.99,  was:44.99,  rating:4.6, reviews:1234,  category:"Electrical & Lighting", subcategory:"Ignition",         inStock:true,  description:"Spiral-wound core; suppresses EMI for modern ECU compatibility." },
  { id:3005, brand:"NGK", name:"NGK V-Power Spark Plug Set (8-Pack)",          sku:"NGK-TR6",        price:18.99,  was:28.99,  rating:4.6, reviews:2781,  category:"Engine Parts",          subcategory:"Spark Plugs",      inStock:true,  description:"V-groove center electrode for fast flame kernel growth." },

  // ── Monroe ───────────────────────────────────────────────────────────────
  { id:4001, brand:"Monroe", name:"Monroe OESpectrum Shock Absorber – Rear Pair", sku:"MN5975",      price:89.99,  was:120.00, rating:4.9, reviews:986,   category:"Suspension & Steering", subcategory:"Shocks",           inStock:true,  description:"Comfort-tuned to match OEM vehicle handling characteristics." },
  { id:4002, brand:"Monroe", name:"Monroe Quick-Strut Complete Assembly",          sku:"MN172144",    price:159.99, was:219.99, rating:4.8, reviews:1231,  category:"Suspension & Steering", subcategory:"Struts",           inStock:true,  description:"All-in-one unit; mount, spring, bumper, and strut included." },
  { id:4003, brand:"Monroe", name:"Monroe Reflex Shock Absorber – Front Pair",     sku:"MN-32369",    price:94.99,  was:129.99, rating:4.7, reviews:742,   category:"Suspension & Steering", subcategory:"Shocks",           inStock:true,  description:"Velocity-sensitive valving for balanced ride and control." },
  { id:4004, brand:"Monroe", name:"Monroe Sensa-Trac Load Adjusting Shock",        sku:"MN-58640",    price:54.99,  was:79.99,  rating:4.7, reviews:1543,  category:"Suspension & Steering", subcategory:"Shocks",           inStock:true,  description:"Self-adjusting for towing and hauling applications." },

  // ── Moog ─────────────────────────────────────────────────────────────────
  { id:5001, brand:"Moog", name:"Moog Wheel Bearing & Hub Assembly",           sku:"MG512223",       price:78.99,  was:105.00, rating:4.8, reviews:1834,  category:"Suspension & Steering", subcategory:"Wheel Bearings",   inStock:true,  description:"Forged steel housing; pre-greased for long service life." },
  { id:5002, brand:"Moog", name:"Moog Stabilizer Bar Link Kit",                sku:"MOGK750088",     price:34.99,  was:52.99,  rating:4.6, reviews:2341,  category:"Suspension & Steering", subcategory:"Sway Bar",         inStock:true,  description:"Problem Solver design addresses OE design weaknesses." },
  { id:5003, brand:"Moog", name:"Moog Tie Rod End – Front Outer",              sku:"MOGES3486",      price:29.99,  was:44.99,  rating:4.7, reviews:1456,  category:"Suspension & Steering", subcategory:"Steering",         inStock:true,  description:"High-strength alloy housing; factory-installed boot." },
  { id:5004, brand:"Moog", name:"Moog Front Upper Ball Joint",                 sku:"MOGK8695T",      price:42.99,  was:62.99,  rating:4.7, reviews:1102,  category:"Suspension & Steering", subcategory:"Ball Joints",      inStock:true,  description:"Metal bearing design for strength and durability." },
  { id:5005, brand:"Moog", name:"Moog Control Arm with Ball Joint – Front Lower",sku:"MOGCMS401204", price:94.99,  was:134.99, rating:4.8, reviews:812,   category:"Suspension & Steering", subcategory:"Control Arms",     inStock:true,  description:"Includes pre-installed ball joint for easy installation." },

  // ── Gates ────────────────────────────────────────────────────────────────
  { id:6001, brand:"Gates", name:"Gates Timing Belt Kit with Water Pump",      sku:"TCKWP244A",      price:124.99, was:189.99, rating:4.6, reviews:748,   category:"Engine Parts",          subcategory:"Timing",           inStock:true,  description:"Complete OE replacement kit; tensioner and idler included." },
  { id:6002, brand:"Gates", name:"Gates Water Pump",                           sku:"GTWP341A",       price:78.99,  was:109.99, rating:4.7, reviews:1543,  category:"Cooling System",        subcategory:"Water Pumps",      inStock:true,  description:"OE-matched impeller and seal for dependable coolant flow." },
  { id:6003, brand:"Gates", name:"Gates Serpentine Belt",                      sku:"GT-K060842",     price:28.99,  was:42.99,  rating:4.7, reviews:2134,  category:"Engine Parts",          subcategory:"Belts",            inStock:true,  description:"EPDM construction; built to exceed OEM specifications." },
  { id:6004, brand:"Gates", name:"Gates Thermostat with Gasket",               sku:"GT33568",        price:18.99,  was:28.99,  rating:4.6, reviews:2134,  category:"Cooling System",        subcategory:"Thermostat",       inStock:true,  description:"Wax-pellet design for consistent coolant temperature control." },
  { id:6005, brand:"Gates", name:"Gates Fuel Line Hose (Per Foot)",            sku:"GT27072",        price:4.99,   was:7.99,   rating:4.5, reviews:2341,  category:"Fuel System",           subcategory:"Hoses & Lines",    inStock:true,  description:"SAE 30R9 rated; compatible with ethanol-blended fuels." },
  { id:6006, brand:"Gates", name:"Gates Timing Chain Kit",                     sku:"GT-TCK328",      price:164.99, was:229.99, rating:4.6, reviews:432,   category:"Engine Parts",          subcategory:"Timing",           inStock:true,  description:"OE-quality chain, tensioner, guides, and hardware." },

  // ── Dorman ───────────────────────────────────────────────────────────────
  { id:7001, brand:"Dorman", name:"Dorman OE-Style Radiator Assembly",         sku:"DR9749",         price:187.99, was:265.00, rating:4.5, reviews:412,   category:"Cooling System",        subcategory:"Radiators",        inStock:true,  description:"Direct-fit aluminum core; exceeds OEM cooling capacity." },
  { id:7002, brand:"Dorman", name:"Dorman Starter Motor",                      sku:"DR281-6050",     price:124.99, was:174.99, rating:4.5, reviews:742,   category:"Electrical & Lighting", subcategory:"Starting System",  inStock:true,  description:"100% quality tested; OE-matched connector and mounting." },
  { id:7003, brand:"Dorman", name:"Dorman Window Regulator with Motor",        sku:"DR741-556",      price:94.99,  was:134.99, rating:4.5, reviews:762,   category:"Body & Exterior",       subcategory:"Window Parts",     inStock:true,  description:"One-piece assembly eliminates the hassle of separate parts." },
  { id:7004, brand:"Dorman", name:"Dorman Transmission Pan with Gasket",       sku:"DR265-820",      price:67.99,  was:94.99,  rating:4.5, reviews:634,   category:"Transmission",          subcategory:"Trans Pans",       inStock:true,  description:"Stamped steel pan; reusable cork gasket included." },
  { id:7005, brand:"Dorman", name:"Dorman Hood Strut Lift Support (2-Pack)",   sku:"DR748-108",      price:34.99,  was:49.99,  rating:4.7, reviews:2341,  category:"Body & Exterior",       subcategory:"Hood Parts",       inStock:true,  description:"Nitrogen-charged struts; pair sold together." },
  { id:7006, brand:"Dorman", name:"Dorman Exhaust Manifold",                   sku:"DR674-080",      price:124.99, was:174.99, rating:4.4, reviews:543,   category:"Exhaust System",        subcategory:"Manifolds",        inStock:true,  description:"Engineered with heat-resistant alloy for long-term reliability." },
  { id:7007, brand:"Dorman", name:"Dorman Vapor Canister Purge Valve",         sku:"DR911-093",      price:22.99,  was:34.99,  rating:4.6, reviews:1123,  category:"Fuel System",           subcategory:"Emission Control",  inStock:true,  description:"Eliminates check-engine codes P0443, P0446, P0455." },

  // ── ACDelco ───────────────────────────────────────────────────────────────
  { id:8001, brand:"ACDelco", name:"ACDelco Professional Oil Filter",          sku:"PF63",           price:8.99,   was:14.99,  rating:4.7, reviews:5412,  category:"Filters & Maintenance", subcategory:"Oil Filters",      inStock:true,  description:"GM OE replacement; dual-flow anti-drain valve." },
  { id:8002, brand:"ACDelco", name:"ACDelco OE Serpentine Belt",               sku:"AD6K945",        price:24.99,  was:36.99,  rating:4.7, reviews:2134,  category:"Engine Parts",          subcategory:"Belts",            inStock:true,  description:"OEM GM part; EPDM rubber for 100,000-mile durability." },
  { id:8003, brand:"ACDelco", name:"ACDelco Brake Hose",                       sku:"AD18J580",       price:18.99,  was:28.99,  rating:4.6, reviews:1204,  category:"Brake System",          subcategory:"Brake Hoses",      inStock:true,  description:"OE GM material and end fittings; pressure tested." },
  { id:8004, brand:"ACDelco", name:"ACDelco ABS Wheel Speed Sensor",           sku:"AD-45905409",    price:54.99,  was:79.99,  rating:4.6, reviews:892,   category:"Electrical & Lighting", subcategory:"Sensors",          inStock:true,  description:"OE-matched hall-effect sensor; pigtail included." },
  { id:8005, brand:"ACDelco", name:"ACDelco Advantage Brake Drum",             sku:"AD18B2503A",     price:44.99,  was:64.99,  rating:4.5, reviews:634,   category:"Brake System",          subcategory:"Brake Drums",      inStock:true,  description:"Balanced to reduce vibration; ready-to-install." },
  { id:8006, brand:"ACDelco", name:"ACDelco Complete Transmission Overhaul Kit",sku:"AD29541266",   price:189.99, was:259.99, rating:4.6, reviews:219,   category:"Transmission",          subcategory:"Rebuild Kits",     inStock:true,  description:"Includes friction plates, steels, and seals for a full rebuild." },

  // ── KYB ──────────────────────────────────────────────────────────────────
  { id:9001, brand:"KYB", name:"KYB Gas-a-Just Monotube Strut Assembly",      sku:"KYB339274",       price:134.99, was:184.99, rating:4.7, reviews:1102,  category:"Suspension & Steering", subcategory:"Struts",           inStock:true,  description:"High-pressure monotube design for improved vehicle control." },
  { id:9002, brand:"KYB", name:"KYB Excel-G Strut Mount",                     sku:"KYB-SM5763",      price:44.99,  was:64.99,  rating:4.6, reviews:532,   category:"Suspension & Steering", subcategory:"Strut Mounts",     inStock:true,  description:"OE-matched rubber isolator; bearing plate included." },
  { id:9003, brand:"KYB", name:"KYB Strut-Plus Complete Assembly – Front",    sku:"KYB-SP400040",    price:174.99, was:239.99, rating:4.8, reviews:891,   category:"Suspension & Steering", subcategory:"Struts",           inStock:true,  description:"Ready-to-install complete unit; no spring compressor needed." },
  { id:9004, brand:"KYB", name:"KYB Gas Shock – Rear (Each)",                 sku:"KYB-344369",      price:48.99,  was:69.99,  rating:4.7, reviews:1654,  category:"Suspension & Steering", subcategory:"Shocks",           inStock:true,  description:"OE-performance gas-charged monotube shock absorber." },

  // ── Bilstein ─────────────────────────────────────────────────────────────
  { id:10001, brand:"Bilstein", name:"Bilstein B8 Performance Shock",         sku:"BIL24-186728",    price:189.99, was:239.99, rating:4.9, reviews:672,   category:"Suspension & Steering", subcategory:"Shocks",           inStock:true,  description:"Velocity-sensitive monotube for sport-tuned handling." },
  { id:10002, brand:"Bilstein", name:"Bilstein B6 HD Shock Absorber",         sku:"BIL33-187253",    price:139.99, was:189.99, rating:4.8, reviews:892,   category:"Suspension & Steering", subcategory:"Shocks",           inStock:true,  description:"Heavy-duty monotube for improved control with towing loads." },
  { id:10003, brand:"Bilstein", name:"Bilstein B4 OE Replacement Strut",      sku:"BIL22-141474",    price:114.99, was:159.99, rating:4.7, reviews:1231,  category:"Suspension & Steering", subcategory:"Struts",           inStock:true,  description:"OE ride quality restored; direct bolt-on replacement." },
  { id:10004, brand:"Bilstein", name:"Bilstein B8 5100 Ride Height Adjustable Shock", sku:"BIL33-185768", price:214.99, was:284.99, rating:4.8, reviews:541, category:"Suspension & Steering", subcategory:"Shocks",      inStock:true,  description:"Adjustable ride height for leveling or mild lift applications." },
];

// ─── Derived lookups ──────────────────────────────────────────────────────────

/** All unique brand slugs (lowercase) */
export const BRAND_SLUGS: string[] = [
  ...new Set(ALL_PRODUCTS.map((p) => p.brand.toLowerCase().replace(/\s+/g, "-"))),
];

/** Map brand slug → display name */
export const BRAND_DISPLAY_NAMES: Record<string, string> = Object.fromEntries(
  ALL_PRODUCTS.map((p) => [
    p.brand.toLowerCase().replace(/\s+/g, "-"),
    p.brand,
  ])
);

/** Products keyed by brand slug */
export const PRODUCTS_BY_BRAND: Record<string, Product[]> = {};
for (const p of ALL_PRODUCTS) {
  const slug = p.brand.toLowerCase().replace(/\s+/g, "-");
  if (!PRODUCTS_BY_BRAND[slug]) PRODUCTS_BY_BRAND[slug] = [];
  PRODUCTS_BY_BRAND[slug].push(p);
}

/** Get products for a given brand slug */
export function getProductsByBrand(brandSlug: string): Product[] {
  return PRODUCTS_BY_BRAND[brandSlug] ?? [];
}

/** All products as a flat array */
export const ALL_CATALOG_PRODUCTS: Product[] = ALL_PRODUCTS;
