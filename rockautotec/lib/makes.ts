export interface MakeData {
  name: string;
  slug: string;
  models: string[];
  popularModels: string[];
  years: number[];
  logo?: string;
}

const YEAR_RANGE = Array.from({ length: 26 }, (_, i) => 2025 - i); // 2025..2000

export const MAKES: MakeData[] = [
  {
    name: "Ford",
    slug: "ford",
    logo: "🔵",
    models: [
      "Bronco", "Edge", "Escape", "Expedition", "Explorer",
      "F-150", "F-250", "F-350", "Maverick", "Mustang",
      "Ranger", "Transit", "Transit Connect",
    ],
    popularModels: ["F-150", "Mustang", "Explorer", "Escape"],
    years: YEAR_RANGE,
  },
  {
    name: "Chevrolet",
    slug: "chevrolet",
    logo: "🟡",
    models: [
      "Blazer", "Camaro", "Colorado", "Corvette", "Equinox",
      "Malibu", "Silverado 1500", "Silverado 2500HD", "Suburban",
      "Tahoe", "Traverse", "Trax",
    ],
    popularModels: ["Silverado 1500", "Equinox", "Tahoe", "Camaro"],
    years: YEAR_RANGE,
  },
  {
    name: "GMC",
    slug: "gmc",
    logo: "🔴",
    models: [
      "Acadia", "Canyon", "Envoy", "Sierra 1500",
      "Sierra 2500HD", "Sierra 3500HD", "Terrain", "Yukon", "Yukon XL",
    ],
    popularModels: ["Sierra 1500", "Terrain", "Yukon", "Acadia"],
    years: YEAR_RANGE,
  },
  {
    name: "Ram",
    slug: "ram",
    logo: "🐏",
    models: [
      "1500", "2500", "3500", "4500", "5500",
      "ProMaster", "ProMaster City", "Rampage",
    ],
    popularModels: ["1500", "2500", "ProMaster", "3500"],
    years: YEAR_RANGE,
  },
  {
    name: "Dodge",
    slug: "dodge",
    logo: "🔴",
    models: [
      "Challenger", "Charger", "Dart", "Durango",
      "Grand Caravan", "Hornet", "Journey", "Viper",
    ],
    popularModels: ["Charger", "Challenger", "Durango", "Hornet"],
    years: YEAR_RANGE,
  },
  {
    name: "Jeep",
    slug: "jeep",
    logo: "🟢",
    models: [
      "Cherokee", "Compass", "Gladiator", "Grand Cherokee",
      "Grand Cherokee L", "Renegade", "Wagoneer", "Wrangler",
    ],
    popularModels: ["Wrangler", "Grand Cherokee", "Cherokee", "Gladiator"],
    years: YEAR_RANGE,
  },
  {
    name: "Toyota",
    slug: "toyota",
    logo: "🔴",
    models: [
      "4Runner", "Avalon", "Camry", "Corolla", "GR86",
      "Highlander", "Land Cruiser", "Prius", "RAV4",
      "Sequoia", "Sienna", "Tacoma", "Tundra",
    ],
    popularModels: ["Camry", "RAV4", "Tacoma", "Corolla"],
    years: YEAR_RANGE,
  },
  {
    name: "Honda",
    slug: "honda",
    logo: "⚪",
    models: [
      "Accord", "Civic", "CR-V", "CR-Z", "Element",
      "Fit", "HR-V", "Odyssey", "Passport", "Pilot", "Ridgeline",
    ],
    popularModels: ["Civic", "Accord", "CR-V", "Pilot"],
    years: YEAR_RANGE,
  },
  {
    name: "Nissan",
    slug: "nissan",
    logo: "⚪",
    models: [
      "Altima", "Armada", "Frontier", "GT-R", "Leaf",
      "Maxima", "Murano", "Pathfinder", "Rogue",
      "Rogue Sport", "Sentra", "Titan", "Versa",
    ],
    popularModels: ["Altima", "Rogue", "Frontier", "Sentra"],
    years: YEAR_RANGE,
  },
  {
    name: "Hyundai",
    slug: "hyundai",
    logo: "🔵",
    models: [
      "Elantra", "Genesis", "Ioniq 5", "Ioniq 6", "Kona",
      "Palisade", "Santa Cruz", "Santa Fe", "Sonata",
      "Tucson", "Venue",
    ],
    popularModels: ["Elantra", "Tucson", "Santa Fe", "Sonata"],
    years: YEAR_RANGE,
  },
  {
    name: "Kia",
    slug: "kia",
    logo: "⚫",
    models: [
      "Carnival", "EV6", "Forte", "K5", "Niro",
      "Seltos", "Soul", "Sportage", "Stinger",
      "Telluride",
    ],
    popularModels: ["Sportage", "Telluride", "Forte", "Soul"],
    years: YEAR_RANGE,
  },
  {
    name: "Mazda",
    slug: "mazda",
    logo: "⚪",
    models: [
      "CX-30", "CX-5", "CX-50", "CX-9", "CX-90",
      "Mazda2", "Mazda3", "Mazda6", "MX-5 Miata", "MX-30",
    ],
    popularModels: ["CX-5", "Mazda3", "MX-5 Miata", "CX-50"],
    years: YEAR_RANGE,
  },
  {
    name: "Subaru",
    slug: "subaru",
    logo: "🔵",
    models: [
      "Ascent", "BRZ", "Crosstrek", "Forester",
      "Impreza", "Legacy", "Outback", "Solterra", "WRX",
    ],
    popularModels: ["Outback", "Forester", "Crosstrek", "WRX"],
    years: YEAR_RANGE,
  },
  {
    name: "Volkswagen",
    slug: "volkswagen",
    logo: "🔵",
    models: [
      "Arteon", "Atlas", "Atlas Cross Sport", "Golf",
      "Golf GTI", "Golf R", "ID.4", "Jetta",
      "Passat", "Taos", "Tiguan",
    ],
    popularModels: ["Jetta", "Tiguan", "Golf GTI", "ID.4"],
    years: YEAR_RANGE,
  },
  {
    name: "Audi",
    slug: "audi",
    logo: "⚪",
    models: [
      "A3", "A4", "A5", "A6", "A7", "A8",
      "e-tron", "e-tron GT", "Q3", "Q5",
      "Q7", "Q8", "R8", "S4", "TT",
    ],
    popularModels: ["A4", "Q5", "Q7", "A6"],
    years: YEAR_RANGE,
  },
  {
    name: "BMW",
    slug: "bmw",
    logo: "🔵",
    models: [
      "2 Series", "3 Series", "4 Series", "5 Series",
      "7 Series", "8 Series", "i4", "iX",
      "M2", "M3", "M4", "M5",
      "X1", "X3", "X5", "X7",
    ],
    popularModels: ["3 Series", "5 Series", "X5", "X3"],
    years: YEAR_RANGE,
  },
  {
    name: "Mercedes-Benz",
    slug: "mercedes-benz",
    logo: "⚪",
    models: [
      "A-Class", "C-Class", "CLA", "CLS",
      "E-Class", "EQS", "G-Class", "GLA",
      "GLC", "GLE", "GLS", "S-Class",
      "SL", "Sprinter",
    ],
    popularModels: ["C-Class", "E-Class", "GLC", "GLE"],
    years: YEAR_RANGE,
  },
  {
    name: "Lexus",
    slug: "lexus",
    logo: "⚪",
    models: [
      "ES", "GS", "GX", "IS", "LC",
      "LS", "LX", "NX", "RC", "RX",
      "RZ", "UX",
    ],
    popularModels: ["RX", "ES", "NX", "IS"],
    years: YEAR_RANGE,
  },
  {
    name: "Acura",
    slug: "acura",
    logo: "⚪",
    models: [
      "ILX", "Integra", "MDX", "NSX",
      "RDX", "TL", "TLX", "TSX", "ZDX",
    ],
    popularModels: ["MDX", "RDX", "TLX", "Integra"],
    years: YEAR_RANGE,
  },
  {
    name: "Infiniti",
    slug: "infiniti",
    logo: "⚫",
    models: [
      "G35", "G37", "Q50", "Q60",
      "Q70", "QX50", "QX55", "QX60",
      "QX70", "QX80",
    ],
    popularModels: ["Q50", "QX60", "QX80", "Q60"],
    years: YEAR_RANGE,
  },
  {
    name: "Cadillac",
    slug: "cadillac",
    logo: "⚫",
    models: [
      "CT4", "CT5", "CT6", "Escalade",
      "Escalade ESV", "Lyriq", "SRX",
      "XT4", "XT5", "XT6",
    ],
    popularModels: ["Escalade", "XT5", "CT5", "XT4"],
    years: YEAR_RANGE,
  },
  {
    name: "Buick",
    slug: "buick",
    logo: "⚫",
    models: [
      "Enclave", "Encore", "Encore GX",
      "Envision", "Envista", "LaCrosse",
      "Regal", "Verano",
    ],
    popularModels: ["Enclave", "Encore GX", "Envision", "LaCrosse"],
    years: YEAR_RANGE,
  },
  {
    name: "Lincoln",
    slug: "lincoln",
    logo: "⚫",
    models: [
      "Aviator", "Blackwood", "Continental",
      "Corsair", "MKC", "MKT", "MKX",
      "MKZ", "Navigator", "Nautilus",
    ],
    popularModels: ["Navigator", "Aviator", "Nautilus", "Corsair"],
    years: YEAR_RANGE,
  },
  {
    name: "Mitsubishi",
    slug: "mitsubishi",
    logo: "🔴",
    models: [
      "Eclipse Cross", "Galant", "Lancer",
      "Mirage", "Outlander", "Outlander PHEV",
      "Outlander Sport", "Raider",
    ],
    popularModels: ["Outlander", "Eclipse Cross", "Outlander Sport", "Mirage"],
    years: YEAR_RANGE,
  },
  {
    name: "Volvo",
    slug: "volvo",
    logo: "🔵",
    models: [
      "C40", "EX30", "EX90", "S60",
      "S90", "V60", "V90", "XC40",
      "XC60", "XC90",
    ],
    popularModels: ["XC60", "XC90", "S60", "XC40"],
    years: YEAR_RANGE,
  },
  {
    name: "Tesla",
    slug: "tesla",
    logo: "⚡",
    models: [
      "Cybertruck", "Model 3", "Model S",
      "Model X", "Model Y", "Roadster",
    ],
    popularModels: ["Model Y", "Model 3", "Model S", "Cybertruck"],
    // Tesla's first model delivered in 2008; practical repair parts from ~2012
    years: Array.from({ length: 14 }, (_, i) => 2025 - i), // 2025..2012
  },
];

/** Lookup make by slug (e.g. "mercedes-benz") */
export const MAKES_BY_SLUG: Record<string, MakeData> = Object.fromEntries(
  MAKES.map((m) => [m.slug, m])
);

/** All available make slugs */
export const MAKE_SLUGS: string[] = MAKES.map((m) => m.slug);
