export interface Part {
  id: number;
  name: string;
  brand: string;
  sku: string;
  price: number;
  was: number;
  rating: number;
  reviews: number;
  category: string;
  inStock: boolean;
}

export const CATALOG: Record<string, Part[]> = {
  "Engine Parts": [
    { id:101, name:"NGK Iridium Spark Plug Set (4 Pack)",    brand:"NGK",          sku:"NGK4218",         price:34.99,  was:52.00,  rating:4.8, reviews:3201,  category:"Engine Parts",          inStock:true },
    { id:102, name:"Gates Timing Belt Kit w/ Water Pump",    brand:"Gates",        sku:"TCKWP244A",       price:124.99, was:189.99, rating:4.6, reviews:748,   category:"Engine Parts",          inStock:true },
    { id:103, name:"Fel-Pro Head Gasket Set",                brand:"Fel-Pro",      sku:"FP26376PT",       price:89.99,  was:129.99, rating:4.7, reviews:1124,  category:"Engine Parts",          inStock:true },
    { id:104, name:"Clevite Engine Bearing Set",             brand:"Clevite",      sku:"CB745HN10",       price:44.99,  was:64.99,  rating:4.5, reviews:892,   category:"Engine Parts",          inStock:true },
    { id:105, name:"Sealed Power Oil Pump",                  brand:"Sealed Power", sku:"SP224-41655",     price:67.99,  was:94.99,  rating:4.6, reviews:531,   category:"Engine Parts",          inStock:true },
    { id:106, name:"Victor Reinz Valve Cover Gasket",        brand:"Victor Reinz", sku:"VR15-10239-01",   price:28.99,  was:42.00,  rating:4.7, reviews:1087,  category:"Engine Parts",          inStock:true },
  ],
  "Brake System": [
    { id:201, name:"Bosch QuietCast Brake Pad Set",          brand:"Bosch",        sku:"BC0905",          price:42.99,  was:67.99,  rating:4.8, reviews:2847,  category:"Brake System",          inStock:true },
    { id:202, name:"Raybestos Brake Rotor Pair",             brand:"Raybestos",    sku:"980543R",         price:68.99,  was:99.99,  rating:4.7, reviews:1923,  category:"Brake System",          inStock:true },
    { id:203, name:"Cardone Remanufactured Caliper",         brand:"Cardone",      sku:"CA18-4524",       price:94.99,  was:134.99, rating:4.5, reviews:742,   category:"Brake System",          inStock:true },
    { id:204, name:"ACDelco Brake Hose",                     brand:"ACDelco",      sku:"AD18J580",        price:18.99,  was:28.99,  rating:4.6, reviews:1204,  category:"Brake System",          inStock:true },
    { id:205, name:"Prestone DOT 4 Brake Fluid (32oz)",      brand:"Prestone",     sku:"AS401",           price:11.99,  was:16.99,  rating:4.8, reviews:4562,  category:"Brake System",          inStock:true },
    { id:206, name:"EBC Drilled & Slotted Sport Rotor",      brand:"EBC",          sku:"EBC-USR1632",     price:119.99, was:164.99, rating:4.7, reviews:581,   category:"Brake System",          inStock:true },
  ],
  "Suspension & Steering": [
    { id:301, name:"Monroe Shock Absorber – Rear Pair",      brand:"Monroe",       sku:"MN5975",          price:89.99,  was:120.00, rating:4.9, reviews:986,   category:"Suspension & Steering", inStock:true },
    { id:302, name:"Moog Wheel Bearing & Hub Assembly",      brand:"Moog",         sku:"MG512223",        price:78.99,  was:105.00, rating:4.8, reviews:1834,  category:"Suspension & Steering", inStock:true },
    { id:303, name:"KYB Gas-a-Just Strut Assembly",          brand:"KYB",          sku:"KYB339274",       price:134.99, was:184.99, rating:4.7, reviews:1102,  category:"Suspension & Steering", inStock:true },
    { id:304, name:"Moog Stabilizer Bar Link Kit",           brand:"Moog",         sku:"MOGK750088",      price:34.99,  was:52.99,  rating:4.6, reviews:2341,  category:"Suspension & Steering", inStock:true },
    { id:305, name:"Bilstein B8 Performance Shock",          brand:"Bilstein",     sku:"BIL24-186728",    price:189.99, was:239.99, rating:4.9, reviews:672,   category:"Suspension & Steering", inStock:true },
    { id:306, name:"Dorman Upper Ball Joint",                brand:"Dorman",       sku:"DR521-993",       price:46.99,  was:68.99,  rating:4.5, reviews:891,   category:"Suspension & Steering", inStock:true },
  ],
  "Cooling System": [
    { id:401, name:"Dorman OE-Style Radiator Assembly",      brand:"Dorman",       sku:"DR9749",          price:187.99, was:265.00, rating:4.5, reviews:412,   category:"Cooling System",        inStock:true },
    { id:402, name:"Gates Water Pump",                       brand:"Gates",        sku:"GTWP341A",        price:78.99,  was:109.99, rating:4.7, reviews:1543,  category:"Cooling System",        inStock:true },
    { id:403, name:"Prestone 50/50 Antifreeze (1 Gallon)",   brand:"Prestone",     sku:"AF2100",          price:22.99,  was:31.99,  rating:4.8, reviews:8921,  category:"Cooling System",        inStock:true },
    { id:404, name:"Gates Thermostat w/ Gasket",             brand:"Gates",        sku:"GT33568",         price:18.99,  was:28.99,  rating:4.6, reviews:2134,  category:"Cooling System",        inStock:true },
    { id:405, name:"Spectra Premium Radiator",               brand:"Spectra",      sku:"SP-CU2892",       price:219.99, was:299.99, rating:4.6, reviews:328,   category:"Cooling System",        inStock:true },
    { id:406, name:"Four Seasons Cooling Fan Assembly",      brand:"Four Seasons", sku:"FS75783",         price:145.99, was:199.99, rating:4.4, reviews:445,   category:"Cooling System",        inStock:true },
  ],
  "Electrical & Lighting": [
    { id:501, name:"Denso Oxygen Sensor – Universal",        brand:"Denso",        sku:"DS2345813",       price:28.49,  was:45.00,  rating:4.7, reviews:1523,  category:"Electrical & Lighting", inStock:true },
    { id:502, name:"Optima RedTop Battery (Group 35)",       brand:"Optima",       sku:"OPT8020-164",     price:219.99, was:289.99, rating:4.8, reviews:3841,  category:"Electrical & Lighting", inStock:true },
    { id:503, name:"Bosch Remanufactured Alternator",        brand:"Bosch",        sku:"BOSC-AL0782X",    price:148.99, was:209.99, rating:4.6, reviews:891,   category:"Electrical & Lighting", inStock:true },
    { id:504, name:"Dorman Starter Motor",                   brand:"Dorman",       sku:"DR281-6050",      price:124.99, was:174.99, rating:4.5, reviews:742,   category:"Electrical & Lighting", inStock:true },
    { id:505, name:"Philips H11 Halogen Headlight Bulb",     brand:"Philips",      sku:"PHIL-H11",        price:12.99,  was:18.99,  rating:4.7, reviews:6234,  category:"Electrical & Lighting", inStock:true },
    { id:506, name:"Delphi Mass Air Flow Sensor",            brand:"Delphi",       sku:"DEL-AF10064",     price:89.99,  was:124.99, rating:4.6, reviews:1123,  category:"Electrical & Lighting", inStock:true },
  ],
  "Fuel System": [
    { id:601, name:"Delphi Fuel Pump Module Assembly",       brand:"Delphi",       sku:"DEL-FG0166",      price:148.99, was:209.99, rating:4.7, reviews:1234,  category:"Fuel System",           inStock:true },
    { id:602, name:"Bosch Fuel Injector Set (4-Pack)",       brand:"Bosch",        sku:"BOSC-0280156163", price:124.99, was:174.99, rating:4.8, reviews:891,   category:"Fuel System",           inStock:true },
    { id:603, name:"Wix Fuel Filter",                        brand:"Wix",          sku:"WIX33481",        price:14.99,  was:22.99,  rating:4.7, reviews:3421,  category:"Fuel System",           inStock:true },
    { id:604, name:"SMP Throttle Body Assembly",             brand:"SMP",          sku:"SMP-S20023",      price:178.99, was:249.99, rating:4.5, reviews:432,   category:"Fuel System",           inStock:true },
    { id:605, name:"Delphi Fuel Pressure Regulator",         brand:"Delphi",       sku:"DEL-FP10038",     price:44.99,  was:64.99,  rating:4.6, reviews:782,   category:"Fuel System",           inStock:true },
    { id:606, name:"ACDelco Fuel Injector",                  brand:"ACDelco",      sku:"AD217-3451",      price:28.99,  was:42.99,  rating:4.7, reviews:1567,  category:"Fuel System",           inStock:true },
  ],
  "Transmission": [
    { id:701, name:"Motorcraft Mercon V ATF (1qt)",          brand:"Motorcraft",   sku:"XT-5-QMC",        price:8.99,   was:12.99,  rating:4.8, reviews:5421,  category:"Transmission",          inStock:true },
    { id:702, name:"Dorman Transmission Pan w/ Gasket",      brand:"Dorman",       sku:"DR265-820",       price:67.99,  was:94.99,  rating:4.5, reviews:634,   category:"Transmission",          inStock:true },
    { id:703, name:"ATP Transmission Shift Solenoid Kit",    brand:"ATP",          sku:"ATP-SS-50",       price:44.99,  was:64.99,  rating:4.5, reviews:531,   category:"Transmission",          inStock:true },
    { id:704, name:"Timken Output Shaft Bearing",            brand:"Timken",       sku:"TIM-204KD",       price:34.99,  was:49.99,  rating:4.7, reviews:892,   category:"Transmission",          inStock:true },
    { id:705, name:"Dorman Transmission Mount",              brand:"Dorman",       sku:"DR904-201",       price:28.99,  was:42.99,  rating:4.6, reviews:1243,  category:"Transmission",          inStock:true },
    { id:706, name:"Raybestos Transmission Brake Band",      brand:"Raybestos",    sku:"RB-MB140",        price:22.99,  was:34.99,  rating:4.5, reviews:378,   category:"Transmission",          inStock:true },
  ],
  "Exhaust System": [
    { id:801, name:"Walker Quiet-Flow SS Muffler",           brand:"Walker",       sku:"WK22680",         price:89.99,  was:124.99, rating:4.6, reviews:891,   category:"Exhaust System",        inStock:true },
    { id:802, name:"MagnaFlow Performance Muffler",          brand:"MagnaFlow",    sku:"MF11226",         price:149.99, was:209.99, rating:4.8, reviews:1432,  category:"Exhaust System",        inStock:true },
    { id:803, name:"Bosal Catalytic Converter – Direct Fit", brand:"Bosal",        sku:"BS099-1778",      price:219.99, was:299.99, rating:4.5, reviews:342,   category:"Exhaust System",        inStock:true },
    { id:804, name:"Walker Exhaust Flex Pipe",               brand:"Walker",       sku:"WK50360",         price:44.99,  was:64.99,  rating:4.6, reviews:782,   category:"Exhaust System",        inStock:true },
    { id:805, name:"Dorman Exhaust Manifold",                brand:"Dorman",       sku:"DR674-080",       price:124.99, was:174.99, rating:4.4, reviews:543,   category:"Exhaust System",        inStock:true },
    { id:806, name:"Dynomax Super Turbo Muffler",            brand:"Dynomax",      sku:"DYN17724",        price:109.99, was:149.99, rating:4.7, reviews:671,   category:"Exhaust System",        inStock:true },
  ],
  "Filters & Maintenance": [
    { id:901, name:"AC Delco Professional Oil Filter",       brand:"ACDelco",      sku:"PF63",            price:8.99,   was:14.99,  rating:4.7, reviews:5412,  category:"Filters & Maintenance", inStock:true },
    { id:902, name:"K&N High-Flow Air Filter",               brand:"K&N",          sku:"KN33-2304",       price:54.99,  was:74.99,  rating:4.9, reviews:8921,  category:"Filters & Maintenance", inStock:true },
    { id:903, name:"Mann-Filter Cabin Air Filter",           brand:"Mann-Filter",  sku:"MANN-CUK25001",   price:22.99,  was:32.99,  rating:4.7, reviews:3421,  category:"Filters & Maintenance", inStock:true },
    { id:904, name:"Motorcraft Full Synthetic Oil Change Kit",brand:"Motorcraft",  sku:"MCK-FULL",        price:44.99,  was:62.99,  rating:4.8, reviews:2134,  category:"Filters & Maintenance", inStock:true },
    { id:905, name:"Wix Transmission Filter Kit",            brand:"Wix",          sku:"WIX57047",        price:18.99,  was:27.99,  rating:4.6, reviews:1897,  category:"Filters & Maintenance", inStock:true },
    { id:906, name:"Bosch Distance Plus Wiper Blades (2pk)", brand:"Bosch",        sku:"BOSC-3397001539", price:24.99,  was:36.99,  rating:4.7, reviews:4532,  category:"Filters & Maintenance", inStock:true },
  ],
  "Body & Exterior": [
    { id:1001, name:"Dorman Hood Strut Lift Support (2pk)",  brand:"Dorman",       sku:"DR748-108",       price:34.99,  was:49.99,  rating:4.7, reviews:2341,  category:"Body & Exterior",       inStock:true },
    { id:1002, name:"CIPA Side Mirror Assembly",             brand:"CIPA",         sku:"CIPA-17097",      price:78.99,  was:109.99, rating:4.5, reviews:1123,  category:"Body & Exterior",       inStock:true },
    { id:1003, name:"Sherman Front Fender Assembly",         brand:"Sherman",      sku:"SHR-A0072TR",     price:189.99, was:264.99, rating:4.4, reviews:287,   category:"Body & Exterior",       inStock:true },
    { id:1004, name:"3M Headlight Restoration Kit",          brand:"3M",           sku:"3M39008",         price:19.99,  was:29.99,  rating:4.8, reviews:15432, category:"Body & Exterior",       inStock:true },
    { id:1005, name:"WeatherTech Front Floor Liners (2pc)",  brand:"WeatherTech",  sku:"WT-441251",       price:89.99,  was:119.99, rating:4.9, reviews:8934,  category:"Body & Exterior",       inStock:true },
    { id:1006, name:"Dorman Tail Light Assembly – Driver",   brand:"Dorman",       sku:"DR1611085",       price:124.99, was:174.99, rating:4.5, reviews:891,   category:"Body & Exterior",       inStock:true },
  ],
};

export const ALL_PARTS: Part[] = Object.values(CATALOG).flat();

export const SLUG_TO_CATEGORY: Record<string, string> = {
  engine:       "Engine Parts",
  brakes:       "Brake System",
  suspension:   "Suspension & Steering",
  cooling:      "Cooling System",
  electrical:   "Electrical & Lighting",
  fuel:         "Fuel System",
  transmission: "Transmission",
  exhaust:      "Exhaust System",
  filters:      "Filters & Maintenance",
  body:         "Body & Exterior",
};

// Legacy export kept for backward compatibility
export const partsList = {
  "Brake System":   [{ name:"Ceramic Brake Pads", price:39 }, { name:"Brake Rotors Set", price:85 },  { name:"Brake Caliper",      price:120 }],
  "Engine Parts":   [{ name:"Spark Plug Set",     price:25 }, { name:"Timing Belt Kit",  price:110 }, { name:"Oil Pump",           price:75  }],
  "Cooling System": [{ name:"Radiator Assembly",  price:140}, { name:"Water Pump",        price:65  }, { name:"Thermostat",         price:22  }],
  "Suspension":     [{ name:"Front Struts",       price:160}, { name:"Control Arm",       price:95  }, { name:"Ball Joint",         price:40  }],
  "Electrical":     [{ name:"Alternator",         price:180}, { name:"Starter Motor",     price:130 }, { name:"Ignition Coil",      price:55  }],
  "Exhaust":        [{ name:"Catalytic Converter",price:320}, { name:"Muffler",           price:140 }, { name:"Oxygen Sensor",      price:70  }],
};
