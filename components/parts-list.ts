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
    { id:101, name:"NGK Iridium Spark Plug Set (4-Pack)",       brand:"NGK",          sku:"NGK4218",          price:34.99,  was:52.00,  rating:4.8, reviews:3201,  category:"Engine Parts",          inStock:true },
    { id:102, name:"Gates Timing Belt Kit w/ Water Pump",       brand:"Gates",        sku:"TCKWP244A",        price:124.99, was:189.99, rating:4.6, reviews:748,   category:"Engine Parts",          inStock:true },
    { id:103, name:"Fel-Pro Head Gasket Set",                   brand:"Fel-Pro",      sku:"FP26376PT",        price:89.99,  was:129.99, rating:4.7, reviews:1124,  category:"Engine Parts",          inStock:true },
    { id:104, name:"Clevite Engine Bearing Set",                brand:"Clevite",      sku:"CB745HN10",        price:44.99,  was:64.99,  rating:4.5, reviews:892,   category:"Engine Parts",          inStock:true },
    { id:105, name:"Sealed Power Oil Pump",                     brand:"Sealed Power", sku:"SP224-41655",      price:67.99,  was:94.99,  rating:4.6, reviews:531,   category:"Engine Parts",          inStock:true },
    { id:106, name:"Victor Reinz Valve Cover Gasket",           brand:"Victor Reinz", sku:"VR15-10239-01",    price:28.99,  was:42.00,  rating:4.7, reviews:1087,  category:"Engine Parts",          inStock:true },
    { id:107, name:"Dorman Intake Manifold Gasket Set",         brand:"Dorman",       sku:"DR615-188",        price:32.99,  was:49.99,  rating:4.6, reviews:643,   category:"Engine Parts",          inStock:true },
    { id:108, name:"Melling Engine Oil Pump",                   brand:"Melling",      sku:"MEL-M72",          price:54.99,  was:79.99,  rating:4.5, reviews:412,   category:"Engine Parts",          inStock:true },
    { id:109, name:"ACDelco PCV Valve",                         brand:"ACDelco",      sku:"AD214",            price:9.99,   was:14.99,  rating:4.7, reviews:2841,  category:"Engine Parts",          inStock:true },
    { id:110, name:"Cloyes Timing Chain Kit",                   brand:"Cloyes",       sku:"CLO-9-0398SB",     price:149.99, was:214.99, rating:4.6, reviews:387,   category:"Engine Parts",          inStock:true },
    { id:111, name:"Mahle Piston Ring Set",                     brand:"Mahle",        sku:"MHL-40832",        price:78.99,  was:109.99, rating:4.5, reviews:298,   category:"Engine Parts",          inStock:true },
    { id:112, name:"SKF Crankshaft Seal Kit",                   brand:"SKF",          sku:"SKF-15814",        price:22.99,  was:34.99,  rating:4.6, reviews:731,   category:"Engine Parts",          inStock:true },
  ],
  "Brake System": [
    { id:201, name:"Bosch QuietCast Brake Pad Set",             brand:"Bosch",        sku:"BC0905",           price:42.99,  was:67.99,  rating:4.8, reviews:2847,  category:"Brake System",          inStock:true },
    { id:202, name:"Raybestos Brake Rotor Pair",                brand:"Raybestos",    sku:"980543R",          price:68.99,  was:99.99,  rating:4.7, reviews:1923,  category:"Brake System",          inStock:true },
    { id:203, name:"Cardone Remanufactured Caliper",            brand:"Cardone",      sku:"CA18-4524",        price:94.99,  was:134.99, rating:4.5, reviews:742,   category:"Brake System",          inStock:true },
    { id:204, name:"ACDelco Brake Hose",                        brand:"ACDelco",      sku:"AD18J580",         price:18.99,  was:28.99,  rating:4.6, reviews:1204,  category:"Brake System",          inStock:true },
    { id:205, name:"Prestone DOT 4 Brake Fluid (32oz)",         brand:"Prestone",     sku:"AS401",            price:11.99,  was:16.99,  rating:4.8, reviews:4562,  category:"Brake System",          inStock:true },
    { id:206, name:"EBC Drilled & Slotted Sport Rotor",         brand:"EBC",          sku:"EBC-USR1632",      price:119.99, was:164.99, rating:4.7, reviews:581,   category:"Brake System",          inStock:true },
    { id:207, name:"StopTech Sport Brake Pad Set",              brand:"StopTech",     sku:"ST309-0729",       price:64.99,  was:89.99,  rating:4.8, reviews:1134,  category:"Brake System",          inStock:true },
    { id:208, name:"Power Stop Z23 Evolution Kit (Pads+Rotors)",brand:"Power Stop",   sku:"PS-Z23-981",       price:189.99, was:259.99, rating:4.9, reviews:2341,  category:"Brake System",          inStock:true },
    { id:209, name:"Raybestos Element3 EHT Brake Pad Set",      brand:"Raybestos",    sku:"RB-EHT905H",       price:54.99,  was:76.99,  rating:4.7, reviews:876,   category:"Brake System",          inStock:true },
    { id:210, name:"Centric Parts Premium Brake Shoe Set",      brand:"Centric",      sku:"CEN111.0900",      price:34.99,  was:49.99,  rating:4.6, reviews:543,   category:"Brake System",          inStock:true },
    { id:211, name:"Wagner ThermoQuiet Ceramic Pads",           brand:"Wagner",       sku:"WGN-QC905",        price:48.99,  was:69.99,  rating:4.7, reviews:1892,  category:"Brake System",          inStock:true },
    { id:212, name:"ACDelco Advantage Brake Drum",              brand:"ACDelco",      sku:"AD18B2503A",       price:44.99,  was:64.99,  rating:4.5, reviews:634,   category:"Brake System",          inStock:true },
  ],
  "Suspension & Steering": [
    { id:301, name:"Monroe Shock Absorber – Rear Pair",         brand:"Monroe",       sku:"MN5975",           price:89.99,  was:120.00, rating:4.9, reviews:986,   category:"Suspension & Steering", inStock:true },
    { id:302, name:"Moog Wheel Bearing & Hub Assembly",         brand:"Moog",         sku:"MG512223",         price:78.99,  was:105.00, rating:4.8, reviews:1834,  category:"Suspension & Steering", inStock:true },
    { id:303, name:"KYB Gas-a-Just Strut Assembly",             brand:"KYB",          sku:"KYB339274",        price:134.99, was:184.99, rating:4.7, reviews:1102,  category:"Suspension & Steering", inStock:true },
    { id:304, name:"Moog Stabilizer Bar Link Kit",              brand:"Moog",         sku:"MOGK750088",       price:34.99,  was:52.99,  rating:4.6, reviews:2341,  category:"Suspension & Steering", inStock:true },
    { id:305, name:"Bilstein B8 Performance Shock",             brand:"Bilstein",     sku:"BIL24-186728",     price:189.99, was:239.99, rating:4.9, reviews:672,   category:"Suspension & Steering", inStock:true },
    { id:306, name:"Dorman Upper Ball Joint",                   brand:"Dorman",       sku:"DR521-993",        price:46.99,  was:68.99,  rating:4.5, reviews:891,   category:"Suspension & Steering", inStock:true },
    { id:307, name:"Mevotech Supreme Control Arm w/ Ball Joint",brand:"Mevotech",     sku:"MVO-CMS251151",    price:74.99,  was:104.99, rating:4.7, reviews:743,   category:"Suspension & Steering", inStock:true },
    { id:308, name:"KYB Excel-G Strut Mount",                   brand:"KYB",          sku:"KYB-SM5763",       price:44.99,  was:64.99,  rating:4.6, reviews:532,   category:"Suspension & Steering", inStock:true },
    { id:309, name:"Moog Tie Rod End – Front Outer",            brand:"Moog",         sku:"MOGES3486",        price:29.99,  was:44.99,  rating:4.7, reviews:1456,  category:"Suspension & Steering", inStock:true },
    { id:310, name:"Monroe Quick-Strut Complete Assembly",      brand:"Monroe",       sku:"MN172144",         price:159.99, was:219.99, rating:4.8, reviews:1231,  category:"Suspension & Steering", inStock:true },
    { id:311, name:"Dorman Front Sway Bar Bushing Kit",         brand:"Dorman",       sku:"DR928-328",        price:18.99,  was:27.99,  rating:4.5, reviews:876,   category:"Suspension & Steering", inStock:true },
    { id:312, name:"ACDelco Steering Rack & Pinion Assembly",   brand:"ACDelco",      sku:"AD36R2465",        price:289.99, was:399.99, rating:4.6, reviews:312,   category:"Suspension & Steering", inStock:true },
  ],
  "Cooling System": [
    { id:401, name:"Dorman OE-Style Radiator Assembly",         brand:"Dorman",       sku:"DR9749",           price:187.99, was:265.00, rating:4.5, reviews:412,   category:"Cooling System",        inStock:true },
    { id:402, name:"Gates Water Pump",                          brand:"Gates",        sku:"GTWP341A",         price:78.99,  was:109.99, rating:4.7, reviews:1543,  category:"Cooling System",        inStock:true },
    { id:403, name:"Prestone 50/50 Antifreeze (1 Gallon)",      brand:"Prestone",     sku:"AF2100",           price:22.99,  was:31.99,  rating:4.8, reviews:8921,  category:"Cooling System",        inStock:true },
    { id:404, name:"Gates Thermostat w/ Gasket",                brand:"Gates",        sku:"GT33568",          price:18.99,  was:28.99,  rating:4.6, reviews:2134,  category:"Cooling System",        inStock:true },
    { id:405, name:"Spectra Premium Radiator",                  brand:"Spectra",      sku:"SP-CU2892",        price:219.99, was:299.99, rating:4.6, reviews:328,   category:"Cooling System",        inStock:true },
    { id:406, name:"Four Seasons Cooling Fan Assembly",         brand:"Four Seasons", sku:"FS75783",          price:145.99, was:199.99, rating:4.4, reviews:445,   category:"Cooling System",        inStock:true },
    { id:407, name:"Mishimoto Performance Radiator",            brand:"Mishimoto",    sku:"MMR-RAD-UN",       price:329.99, was:429.99, rating:4.9, reviews:287,   category:"Cooling System",        inStock:true },
    { id:408, name:"Dorman Radiator Cap",                       brand:"Dorman",       sku:"DR54244",          price:7.99,   was:12.99,  rating:4.7, reviews:3421,  category:"Cooling System",        inStock:true },
    { id:409, name:"Stant Locking Fuel Cap",                    brand:"Stant",        sku:"STN-10834",        price:14.99,  was:21.99,  rating:4.6, reviews:1892,  category:"Cooling System",        inStock:true },
    { id:410, name:"Motorcraft Coolant Reservoir",              brand:"Motorcraft",   sku:"KH-424",           price:34.99,  was:49.99,  rating:4.5, reviews:543,   category:"Cooling System",        inStock:true },
    { id:411, name:"Four Seasons Heater Hose Kit",              brand:"Four Seasons", sku:"FS86108",          price:28.99,  was:42.99,  rating:4.4, reviews:732,   category:"Cooling System",        inStock:true },
    { id:412, name:"ACDelco OE Serpentine Belt",                brand:"ACDelco",      sku:"AD6K945",          price:24.99,  was:36.99,  rating:4.7, reviews:2134,  category:"Cooling System",        inStock:true },
  ],
  "Electrical & Lighting": [
    { id:501, name:"Denso Oxygen Sensor – Universal",           brand:"Denso",        sku:"DS2345813",        price:28.49,  was:45.00,  rating:4.7, reviews:1523,  category:"Electrical & Lighting", inStock:true },
    { id:502, name:"Optima RedTop Battery (Group 35)",          brand:"Optima",       sku:"OPT8020-164",      price:219.99, was:289.99, rating:4.8, reviews:3841,  category:"Electrical & Lighting", inStock:true },
    { id:503, name:"Bosch Remanufactured Alternator",           brand:"Bosch",        sku:"BOSC-AL0782X",     price:148.99, was:209.99, rating:4.6, reviews:891,   category:"Electrical & Lighting", inStock:true },
    { id:504, name:"Dorman Starter Motor",                      brand:"Dorman",       sku:"DR281-6050",       price:124.99, was:174.99, rating:4.5, reviews:742,   category:"Electrical & Lighting", inStock:true },
    { id:505, name:"Philips H11 Halogen Headlight Bulb",        brand:"Philips",      sku:"PHIL-H11",         price:12.99,  was:18.99,  rating:4.7, reviews:6234,  category:"Electrical & Lighting", inStock:true },
    { id:506, name:"Delphi Mass Air Flow Sensor",               brand:"Delphi",       sku:"DEL-AF10064",      price:89.99,  was:124.99, rating:4.6, reviews:1123,  category:"Electrical & Lighting", inStock:true },
    { id:507, name:"Standard Motor Ignition Coil",              brand:"Standard",     sku:"SMP-UF340",        price:44.99,  was:64.99,  rating:4.7, reviews:1876,  category:"Electrical & Lighting", inStock:true },
    { id:508, name:"Sylvania ZEVO LED Interior Kit",            brand:"Sylvania",     sku:"SYL-194LED",       price:19.99,  was:29.99,  rating:4.5, reviews:3421,  category:"Electrical & Lighting", inStock:true },
    { id:509, name:"ACDelco ABS Wheel Speed Sensor",            brand:"ACDelco",      sku:"AD-45905409",      price:54.99,  was:79.99,  rating:4.6, reviews:892,   category:"Electrical & Lighting", inStock:true },
    { id:510, name:"Dorman Trailer Hitch Wiring Harness",       brand:"Dorman",       sku:"DR923-023",        price:38.99,  was:56.99,  rating:4.5, reviews:654,   category:"Electrical & Lighting", inStock:true },
    { id:511, name:"Bosch ICON Wiper Blade (2-pk)",             brand:"Bosch",        sku:"BOSC-26A18",       price:34.99,  was:49.99,  rating:4.8, reviews:5132,  category:"Electrical & Lighting", inStock:true },
    { id:512, name:"NGK Spark Plug Wire Set",                   brand:"NGK",          sku:"NGK-9929",         price:29.99,  was:44.99,  rating:4.6, reviews:1234,  category:"Electrical & Lighting", inStock:true },
  ],
  "Fuel System": [
    { id:601, name:"Delphi Fuel Pump Module Assembly",          brand:"Delphi",       sku:"DEL-FG0166",       price:148.99, was:209.99, rating:4.7, reviews:1234,  category:"Fuel System",           inStock:true },
    { id:602, name:"Bosch Fuel Injector Set (4-Pack)",          brand:"Bosch",        sku:"BOSC-0280156163",  price:124.99, was:174.99, rating:4.8, reviews:891,   category:"Fuel System",           inStock:true },
    { id:603, name:"Wix Fuel Filter",                           brand:"Wix",          sku:"WIX33481",         price:14.99,  was:22.99,  rating:4.7, reviews:3421,  category:"Fuel System",           inStock:true },
    { id:604, name:"SMP Throttle Body Assembly",                brand:"SMP",          sku:"SMP-S20023",       price:178.99, was:249.99, rating:4.5, reviews:432,   category:"Fuel System",           inStock:true },
    { id:605, name:"Delphi Fuel Pressure Regulator",            brand:"Delphi",       sku:"DEL-FP10038",      price:44.99,  was:64.99,  rating:4.6, reviews:782,   category:"Fuel System",           inStock:true },
    { id:606, name:"ACDelco Fuel Injector",                     brand:"ACDelco",      sku:"AD217-3451",       price:28.99,  was:42.99,  rating:4.7, reviews:1567,  category:"Fuel System",           inStock:true },
    { id:607, name:"Spectra Premium Fuel Tank",                 brand:"Spectra",      sku:"SP-F66A",          price:219.99, was:299.99, rating:4.5, reviews:287,   category:"Fuel System",           inStock:true },
    { id:608, name:"Dorman Fuel Sending Unit",                  brand:"Dorman",       sku:"DR692-068",        price:64.99,  was:89.99,  rating:4.6, reviews:431,   category:"Fuel System",           inStock:true },
    { id:609, name:"Standard Motor Idle Air Control Valve",     brand:"Standard",     sku:"SMP-AC187",        price:48.99,  was:69.99,  rating:4.5, reviews:654,   category:"Fuel System",           inStock:true },
    { id:610, name:"Dorman Vapor Canister Purge Valve",         brand:"Dorman",       sku:"DR911-093",        price:22.99,  was:34.99,  rating:4.6, reviews:1123,  category:"Fuel System",           inStock:true },
    { id:611, name:"Delphi Fuel Injector Cleaner Kit",          brand:"Delphi",       sku:"DEL-GDI105",       price:34.99,  was:49.99,  rating:4.7, reviews:892,   category:"Fuel System",           inStock:true },
    { id:612, name:"Gates Fuel Line Hose (Per Foot)",           brand:"Gates",        sku:"GT27072",          price:4.99,   was:7.99,   rating:4.5, reviews:2341,  category:"Fuel System",           inStock:true },
  ],
  "Transmission": [
    { id:701, name:"Motorcraft Mercon V ATF (1qt)",             brand:"Motorcraft",   sku:"XT-5-QMC",         price:8.99,   was:12.99,  rating:4.8, reviews:5421,  category:"Transmission",          inStock:true },
    { id:702, name:"Dorman Transmission Pan w/ Gasket",         brand:"Dorman",       sku:"DR265-820",        price:67.99,  was:94.99,  rating:4.5, reviews:634,   category:"Transmission",          inStock:true },
    { id:703, name:"ATP Transmission Shift Solenoid Kit",       brand:"ATP",          sku:"ATP-SS-50",        price:44.99,  was:64.99,  rating:4.5, reviews:531,   category:"Transmission",          inStock:true },
    { id:704, name:"Timken Output Shaft Bearing",               brand:"Timken",       sku:"TIM-204KD",        price:34.99,  was:49.99,  rating:4.7, reviews:892,   category:"Transmission",          inStock:true },
    { id:705, name:"Dorman Transmission Mount",                 brand:"Dorman",       sku:"DR904-201",        price:28.99,  was:42.99,  rating:4.6, reviews:1243,  category:"Transmission",          inStock:true },
    { id:706, name:"Raybestos Transmission Brake Band",         brand:"Raybestos",    sku:"RB-MB140",         price:22.99,  was:34.99,  rating:4.5, reviews:378,   category:"Transmission",          inStock:true },
    { id:707, name:"ACDelco Complete Transmission Kit",         brand:"ACDelco",      sku:"AD29541266",       price:189.99, was:259.99, rating:4.6, reviews:219,   category:"Transmission",          inStock:true },
    { id:708, name:"Dorman Transfer Case Motor",                brand:"Dorman",       sku:"DR600-943",        price:124.99, was:174.99, rating:4.5, reviews:341,   category:"Transmission",          inStock:true },
    { id:709, name:"Pennzoil Platinum ATF+4 (1qt)",             brand:"Pennzoil",     sku:"PEN-550045232",    price:6.99,   was:10.99,  rating:4.7, reviews:3421,  category:"Transmission",          inStock:true },
    { id:710, name:"Dorman Automatic Trans Kickdown Cable",     brand:"Dorman",       sku:"DR905-101",        price:22.99,  was:34.99,  rating:4.4, reviews:432,   category:"Transmission",          inStock:true },
    { id:711, name:"ATP Extension Housing Seal",                brand:"ATP",          sku:"ATP-TJ-095",       price:12.99,  was:18.99,  rating:4.6, reviews:654,   category:"Transmission",          inStock:true },
    { id:712, name:"Timken Front Pinion Bearing Kit",           brand:"Timken",       sku:"TIM-TIMKEN-KIT",   price:54.99,  was:79.99,  rating:4.7, reviews:287,   category:"Transmission",          inStock:true },
  ],
  "Exhaust System": [
    { id:801, name:"Walker Quiet-Flow SS Muffler",              brand:"Walker",       sku:"WK22680",          price:89.99,  was:124.99, rating:4.6, reviews:891,   category:"Exhaust System",        inStock:true },
    { id:802, name:"MagnaFlow Performance Muffler",             brand:"MagnaFlow",    sku:"MF11226",          price:149.99, was:209.99, rating:4.8, reviews:1432,  category:"Exhaust System",        inStock:true },
    { id:803, name:"Bosal Catalytic Converter – Direct Fit",    brand:"Bosal",        sku:"BS099-1778",       price:219.99, was:299.99, rating:4.5, reviews:342,   category:"Exhaust System",        inStock:true },
    { id:804, name:"Walker Exhaust Flex Pipe",                  brand:"Walker",       sku:"WK50360",          price:44.99,  was:64.99,  rating:4.6, reviews:782,   category:"Exhaust System",        inStock:true },
    { id:805, name:"Dorman Exhaust Manifold",                   brand:"Dorman",       sku:"DR674-080",        price:124.99, was:174.99, rating:4.4, reviews:543,   category:"Exhaust System",        inStock:true },
    { id:806, name:"Dynomax Super Turbo Muffler",               brand:"Dynomax",      sku:"DYN17724",         price:109.99, was:149.99, rating:4.7, reviews:671,   category:"Exhaust System",        inStock:true },
    { id:807, name:"AP Exhaust Manifold Gasket Set",            brand:"AP",           sku:"AP-MG-53900",      price:18.99,  was:28.99,  rating:4.6, reviews:1123,  category:"Exhaust System",        inStock:true },
    { id:808, name:"Thrush Turbo Performance Muffler",          brand:"Thrush",       sku:"THR-17713",        price:64.99,  was:89.99,  rating:4.7, reviews:892,   category:"Exhaust System",        inStock:true },
    { id:809, name:"Flowmaster American Thunder Muffler",       brand:"Flowmaster",   sku:"FLO-817470",       price:134.99, was:184.99, rating:4.8, reviews:1234,  category:"Exhaust System",        inStock:true },
    { id:810, name:"Dorman Exhaust Clamp (2-Pack)",             brand:"Dorman",       sku:"DR55204",          price:8.99,   was:13.99,  rating:4.5, reviews:2341,  category:"Exhaust System",        inStock:true },
    { id:811, name:"Walker Standard Pipe & Resonator",          brand:"Walker",       sku:"WK53553",          price:54.99,  was:79.99,  rating:4.5, reviews:432,   category:"Exhaust System",        inStock:true },
    { id:812, name:"Vibrant Performance SS Exhaust Tip",        brand:"Vibrant",      sku:"VIB-1148",         price:44.99,  was:64.99,  rating:4.6, reviews:543,   category:"Exhaust System",        inStock:true },
  ],
  "Filters & Maintenance": [
    { id:901, name:"ACDelco Professional Oil Filter",           brand:"ACDelco",      sku:"PF63",             price:8.99,   was:14.99,  rating:4.7, reviews:5412,  category:"Filters & Maintenance", inStock:true },
    { id:902, name:"K&N High-Flow Air Filter",                  brand:"K&N",          sku:"KN33-2304",        price:54.99,  was:74.99,  rating:4.9, reviews:8921,  category:"Filters & Maintenance", inStock:true },
    { id:903, name:"Mann-Filter Cabin Air Filter",              brand:"Mann-Filter",  sku:"MANN-CUK25001",    price:22.99,  was:32.99,  rating:4.7, reviews:3421,  category:"Filters & Maintenance", inStock:true },
    { id:904, name:"Motorcraft Full Synthetic Oil Change Kit",  brand:"Motorcraft",   sku:"MCK-FULL",         price:44.99,  was:62.99,  rating:4.8, reviews:2134,  category:"Filters & Maintenance", inStock:true },
    { id:905, name:"Wix Transmission Filter Kit",              brand:"Wix",          sku:"WIX57047",         price:18.99,  was:27.99,  rating:4.6, reviews:1897,  category:"Filters & Maintenance", inStock:true },
    { id:906, name:"Bosch Distance Plus Wiper Blades (2-pk)",  brand:"Bosch",        sku:"BOSC-3397001539",  price:24.99,  was:36.99,  rating:4.7, reviews:4532,  category:"Filters & Maintenance", inStock:true },
    { id:907, name:"Mobil 1 Full Synthetic 5W-30 (5qt)",       brand:"Mobil 1",      sku:"MOB-120764",       price:29.99,  was:42.99,  rating:4.9, reviews:15432, category:"Filters & Maintenance", inStock:true },
    { id:908, name:"Pennzoil Ultra Platinum 0W-20 (5qt)",      brand:"Pennzoil",     sku:"PEN-550040841",    price:31.99,  was:44.99,  rating:4.8, reviews:8923,  category:"Filters & Maintenance", inStock:true },
    { id:909, name:"WD-40 Multi-Use Product (16oz)",           brand:"WD-40",        sku:"WD40-10110",       price:7.99,   was:11.99,  rating:4.8, reviews:22341, category:"Filters & Maintenance", inStock:true },
    { id:910, name:"Amsoil Signature Series 5W-30 (1qt)",      brand:"Amsoil",       sku:"AMS-ASL",          price:12.99,  was:17.99,  rating:4.9, reviews:4321,  category:"Filters & Maintenance", inStock:true },
    { id:911, name:"STP Fuel System Cleaner (5.25oz)",         brand:"STP",          sku:"STP-78577",        price:5.99,   was:8.99,   rating:4.7, reviews:6234,  category:"Filters & Maintenance", inStock:true },
    { id:912, name:"Royal Purple High Performance Oil Filter",  brand:"Royal Purple", sku:"RP-10-2835",       price:12.99,  was:18.99,  rating:4.8, reviews:3421,  category:"Filters & Maintenance", inStock:true },
  ],
  "Body & Exterior": [
    { id:1001, name:"Dorman Hood Strut Lift Support (2-pk)",    brand:"Dorman",       sku:"DR748-108",        price:34.99,  was:49.99,  rating:4.7, reviews:2341,  category:"Body & Exterior",       inStock:true },
    { id:1002, name:"CIPA Side Mirror Assembly",                brand:"CIPA",         sku:"CIPA-17097",       price:78.99,  was:109.99, rating:4.5, reviews:1123,  category:"Body & Exterior",       inStock:true },
    { id:1003, name:"Sherman Front Fender Assembly",            brand:"Sherman",      sku:"SHR-A0072TR",      price:189.99, was:264.99, rating:4.4, reviews:287,   category:"Body & Exterior",       inStock:true },
    { id:1004, name:"3M Headlight Restoration Kit",             brand:"3M",           sku:"3M39008",          price:19.99,  was:29.99,  rating:4.8, reviews:15432, category:"Body & Exterior",       inStock:true },
    { id:1005, name:"WeatherTech Front Floor Liners (2-pc)",    brand:"WeatherTech",  sku:"WT-441251",        price:89.99,  was:119.99, rating:4.9, reviews:8934,  category:"Body & Exterior",       inStock:true },
    { id:1006, name:"Dorman Tail Light Assembly – Driver",      brand:"Dorman",       sku:"DR1611085",        price:124.99, was:174.99, rating:4.5, reviews:891,   category:"Body & Exterior",       inStock:true },
    { id:1007, name:"Meguiar's Ultimate Polish (15.2oz)",       brand:"Meguiar's",    sku:"MEG-G19216",       price:18.99,  was:27.99,  rating:4.8, reviews:7821,  category:"Body & Exterior",       inStock:true },
    { id:1008, name:"Dorman Window Regulator w/ Motor",         brand:"Dorman",       sku:"DR741-556",        price:94.99,  was:134.99, rating:4.5, reviews:762,   category:"Body & Exterior",       inStock:true },
    { id:1009, name:"LKQ OEM Door Handle – Front Right",        brand:"LKQ",          sku:"LKQ-DH-FR",        price:34.99,  was:54.99,  rating:4.4, reviews:432,   category:"Body & Exterior",       inStock:true },
    { id:1010, name:"3M Clear Paint Protection Film Kit",       brand:"3M",           sku:"3M-1080-SP10",     price:44.99,  was:64.99,  rating:4.6, reviews:1234,  category:"Body & Exterior",       inStock:true },
    { id:1011, name:"Dorman Bumper Mounting Kit",               brand:"Dorman",       sku:"DR42680",          price:24.99,  was:36.99,  rating:4.5, reviews:876,   category:"Body & Exterior",       inStock:true },
    { id:1012, name:"Covercraft Custom WeatherShield Seat Cover",brand:"Covercraft",  sku:"COV-SS7369PCCH",   price:149.99, was:199.99, rating:4.7, reviews:543,   category:"Body & Exterior",       inStock:true },
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

export const CATEGORY_SLUGS: Record<string, string> = {
  "Engine Parts":          "engine",
  "Brake System":          "brakes",
  "Suspension & Steering": "suspension",
  "Cooling System":        "cooling",
  "Electrical & Lighting": "electrical",
  "Fuel System":           "fuel",
  "Transmission":          "transmission",
  "Exhaust System":        "exhaust",
  "Filters & Maintenance": "filters",
  "Body & Exterior":       "body",
};

export const CATEGORY_ICONS: Record<string, string> = {
  "Engine Parts":          "⚙️",
  "Brake System":          "🛑",
  "Suspension & Steering": "🔩",
  "Cooling System":        "❄️",
  "Electrical & Lighting": "⚡",
  "Fuel System":           "⛽",
  "Transmission":          "🔄",
  "Exhaust System":        "💨",
  "Filters & Maintenance": "🔧",
  "Body & Exterior":       "🚗",
};

// Real auto-parts photography from Unsplash (verified live URLs), one primary per category
export const CATEGORY_IMAGES: Record<string, string> = {
  "Engine Parts":          "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=1200&q=80&auto=format&fit=crop",
  "Brake System":          "https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?w=1200&q=80&auto=format&fit=crop",
  "Suspension & Steering": "https://images.unsplash.com/photo-1542362567-b07e54358753?w=1200&q=80&auto=format&fit=crop",
  "Cooling System":        "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=1200&q=80&auto=format&fit=crop",
  "Electrical & Lighting": "https://images.unsplash.com/photo-1620891549027-942fdc95d3f5?w=1200&q=80&auto=format&fit=crop",
  "Fuel System":           "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=1200&q=80&auto=format&fit=crop",
  "Transmission":          "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=80&auto=format&fit=crop",
  "Exhaust System":        "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1200&q=80&auto=format&fit=crop",
  "Filters & Maintenance": "https://images.unsplash.com/photo-1567789884554-0b844b597180?w=1200&q=80&auto=format&fit=crop",
  "Body & Exterior":       "https://images.unsplash.com/photo-1551522435-a13afa10f103?w=1200&q=80&auto=format&fit=crop",
};

// Two verified Unsplash photos per category for product-card visual variety
const PART_IMAGE_VARIANTS: Record<string, [string, string]> = {
  "Engine Parts":          ["1487754180451-c456f719a1fc", "1503376780353-7e6692767b70"],
  "Brake System":          ["1632833239869-a37e3a5806d2", "1605559424843-9e4c228bf1c2"],
  "Suspension & Steering": ["1542362567-b07e54358753",   "1517524008697-84bbe3c3fd98"],
  "Cooling System":        ["1530046339160-ce3e530c7d2f", "1600661653561-629509216228"],
  "Electrical & Lighting": ["1620891549027-942fdc95d3f5", "1607853554439-0069ec0f29b6"],
  "Fuel System":           ["1486006920555-c77dcf18193c", "1503376780353-7e6692767b70"],
  "Transmission":          ["1492144534655-ae79c964c9d7", "1518987048-93e29699e79a"],
  "Exhaust System":        ["1502877338535-766e1452684a", "1449965408869-eaa3f722e40d"],
  "Filters & Maintenance": ["1567789884554-0b844b597180", "1573497019940-1c28c88b4f3e"],
  "Body & Exterior":       ["1551522435-a13afa10f103",   "1494976388531-d1058494cdd8"],
};

/** Returns a real Unsplash product photo for a part, alternating between two per category for variety. */
export function getPartImage(part: Part, width = 600): string {
  const variants = PART_IMAGE_VARIANTS[part.category] ?? PART_IMAGE_VARIANTS["Engine Parts"];
  const photoId = variants[part.id % 2];
  return `https://images.unsplash.com/photo-${photoId}?w=${width}&q=80&auto=format&fit=crop`;
}

/** Deterministic low-stock flag so the same parts always show "Only X left" rather than random flicker. */
export function isLowStock(part: Part): boolean {
  return part.id % 9 === 0;
}

/** Deterministic low-stock unit count (3–7) for parts flagged by isLowStock. */
export function lowStockCount(part: Part): number {
  return 3 + (part.id % 5);
}

// Keyword buckets used to derive a "Part Type" facet from each part's name,
// ordered most-specific-first so multi-word matches win over generic ones.
const PART_TYPE_KEYWORDS: [string, string][] = [
  ["spark plug",        "Spark Plugs"],
  ["timing belt",        "Timing Belts & Chains"],
  ["timing chain",       "Timing Belts & Chains"],
  ["head gasket",        "Gaskets & Seals"],
  ["gasket",             "Gaskets & Seals"],
  ["seal kit",           "Gaskets & Seals"],
  ["oil pump",           "Pumps"],
  ["water pump",         "Pumps"],
  ["fuel pump",          "Pumps"],
  ["bearing",            "Bearings"],
  ["piston ring",        "Engine Internals"],
  ["belt",               "Belts"],
  ["brake pad",          "Brake Pads"],
  ["rotor",              "Brake Rotors"],
  ["caliper",            "Brake Calipers"],
  ["brake hose",         "Brake Hoses & Lines"],
  ["brake fluid",        "Brake Fluid"],
  ["brake drum",         "Brake Drums & Shoes"],
  ["brake shoe",         "Brake Drums & Shoes"],
  ["shock absorber",     "Shocks & Struts"],
  ["strut",              "Shocks & Struts"],
  ["control arm",        "Control Arms"],
  ["ball joint",         "Ball Joints"],
  ["tie rod",            "Steering Components"],
  ["rack & pinion",      "Steering Components"],
  ["stabilizer",         "Sway Bar Components"],
  ["sway bar",           "Sway Bar Components"],
  ["radiator",           "Radiators"],
  ["thermostat",         "Thermostats"],
  ["coolant",            "Coolant & Antifreeze"],
  ["antifreeze",         "Coolant & Antifreeze"],
  ["cooling fan",        "Cooling Fans"],
  ["heater hose",        "Hoses"],
  ["hose",               "Hoses"],
  ["oxygen sensor",      "Sensors"],
  ["sensor",             "Sensors"],
  ["battery",            "Batteries"],
  ["alternator",         "Alternators"],
  ["starter",            "Starters"],
  ["headlight",          "Lighting"],
  ["bulb",               "Lighting"],
  ["led",                "Lighting"],
  ["ignition coil",      "Ignition Components"],
  ["wiring",             "Wiring & Harnesses"],
  ["harness",            "Wiring & Harnesses"],
  ["wiper blade",        "Wiper Blades"],
  ["fuel injector",      "Fuel Injectors"],
  ["throttle body",      "Throttle Body"],
  ["fuel filter",        "Filters"],
  ["fuel tank",          "Fuel Tanks"],
  ["fuel pressure",      "Fuel System Components"],
  ["idle air control",   "Fuel System Components"],
  ["purge valve",        "Emission Components"],
  ["fuel sending",       "Fuel System Components"],
  ["transmission pan",   "Transmission Pans"],
  ["transmission mount", "Mounts"],
  ["solenoid",           "Solenoids"],
  ["transmission kit",   "Rebuild Kits"],
  ["transmission",       "Transmission Fluid & Parts"],
  ["atf",                "Transmission Fluid & Parts"],
  ["muffler",            "Mufflers"],
  ["catalytic converter","Catalytic Converters"],
  ["exhaust manifold",   "Exhaust Manifolds"],
  ["exhaust clamp",      "Exhaust Hardware"],
  ["exhaust tip",        "Exhaust Tips"],
  ["resonator",          "Mufflers"],
  ["flex pipe",          "Exhaust Pipes"],
  ["pipe",               "Exhaust Pipes"],
  ["oil filter",         "Oil Filters"],
  ["air filter",         "Air Filters"],
  ["cabin air filter",   "Cabin Air Filters"],
  ["transmission filter","Filters"],
  ["motor oil",          "Motor Oil"],
  ["synthetic",          "Motor Oil"],
  ["cleaner",            "Additives & Cleaners"],
  ["wd-40",              "Additives & Cleaners"],
  ["hood strut",         "Hood Parts"],
  ["mirror",             "Mirrors"],
  ["fender",             "Body Panels"],
  ["headlight restoration","Detailing Products"],
  ["floor liner",        "Floor Liners & Mats"],
  ["tail light",         "Lighting"],
  ["polish",             "Detailing Products"],
  ["window regulator",   "Window Parts"],
  ["door handle",        "Door Hardware"],
  ["paint protection",   "Detailing Products"],
  ["bumper",             "Bumper Components"],
  ["seat cover",         "Seat Covers"],
];

/** Derives a human-readable "Part Type" facet from a part's name for filtering. */
export function getPartType(part: Part): string {
  const lower = part.name.toLowerCase();
  for (const [keyword, label] of PART_TYPE_KEYWORDS) {
    if (lower.includes(keyword)) return label;
  }
  return part.category;
}

// Legacy export kept for backward compatibility
export const partsList = {
  "Brake System":   [{ name:"Ceramic Brake Pads", price:39 }, { name:"Brake Rotors Set", price:85 },  { name:"Brake Caliper",      price:120 }],
  "Engine Parts":   [{ name:"Spark Plug Set",     price:25 }, { name:"Timing Belt Kit",  price:110 }, { name:"Oil Pump",           price:75  }],
  "Cooling System": [{ name:"Radiator Assembly",  price:140}, { name:"Water Pump",        price:65  }, { name:"Thermostat",         price:22  }],
  "Suspension":     [{ name:"Front Struts",       price:160}, { name:"Control Arm",       price:95  }, { name:"Ball Joint",         price:40  }],
  "Electrical":     [{ name:"Alternator",         price:180}, { name:"Starter Motor",     price:130 }, { name:"Ignition Coil",      price:55  }],
  "Exhaust":        [{ name:"Catalytic Converter",price:320}, { name:"Muffler",           price:140 }, { name:"Oxygen Sensor",      price:70  }],
};
