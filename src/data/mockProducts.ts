export interface Product {
  id: string;
  sku: string;
  oem: string;
  oemCrossReference: string[];
  title: string;
  category: string;
  brand: string;
  origin: string;
  vehicleCompatibility: string[];
  vinPrefix: string[];
  stock: number;
  priceNeto: number;
  minWholesaleQty: number;
  weightKg: number;
  dimensionsCm: { length: number; width: number; height: number };
  image: string;
  isOsakansaiBrand: boolean;
  featured?: boolean;
}

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "prod-001",
    sku: "OSK-BP-7701",
    oem: "04465-0K260",
    oemCrossReference: ["04465-0K090", "04465-0K340", "D1060-0K260"],
    title: "Pastillas de Freno Delanteras Cerámicas HD",
    category: "Frenos y Cilindros",
    brand: "Osakansai Genuine Parts",
    origin: "Japón",
    vehicleCompatibility: [
      "Toyota Hilux Revo 2.4 / 2.8 D-4D (2016-2024)",
      "Toyota Fortuner 2.8 GD (2016-2023)",
      "Toyota Land Cruiser Prado 150"
    ],
    vinPrefix: ["MR0HA3CD", "MR0HA8CD", "JTEBU49J"],
    stock: 180,
    priceNeto: 18900,
    minWholesaleQty: 10,
    weightKg: 2.1,
    dimensionsCm: { length: 18, width: 12, height: 8 },
    image: "https://images.unsplash.com/photo-1600790142055-619df03207e6?w=600&auto=format&fit=crop&q=80",
    isOsakansaiBrand: true,
    featured: true,
  },
  {
    id: "prod-002",
    sku: "OSK-CL-3310",
    oem: "30100-4KH0A",
    oemCrossReference: ["C0100-4KH0A", "30210-4KH0A"],
    title: "Kit Disco de Embrague Reforzado 275mm",
    category: "Embragues y Transmisión",
    brand: "Osakansai Heavy Duty",
    origin: "Japón",
    vehicleCompatibility: [
      "Nissan NP300 Frontier 2.3 dCi Turbo Diesel (2016-2024)",
      "Nissan Navara D23 2.3 TT (2016-2023)",
      "Renault Alaskan 2.3 dCi"
    ],
    vinPrefix: ["MNTAD23", "MNTCB23", "VF16T2"],
    stock: 65,
    priceNeto: 84500,
    minWholesaleQty: 4,
    weightKg: 7.8,
    dimensionsCm: { length: 32, width: 32, height: 9 },
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&auto=format&fit=crop&q=80",
    isOsakansaiBrand: true,
    featured: true,
  },
  {
    id: "prod-003",
    sku: "OSK-GK-9921",
    oem: "22311-2F000",
    oemCrossReference: ["22311-2F010", "22311-2F020"],
    title: "Empaquetadura de Culata Metálica MLS Multi-lámina",
    category: "Motor y Empaquetaduras",
    brand: "Osakansai Engine Solutions",
    origin: "Corea del Sur",
    vehicleCompatibility: [
      "Hyundai Santa Fe 2.2 CRDi D4HB (2012-2021)",
      "Kia Sorento 2.2 CRDi D4HB (2011-2020)",
      "Hyundai Tucson 2.0 CRDi D4HA"
    ],
    vinPrefix: ["KMHSU81W", "KNAKU814", "KMHJU81B"],
    stock: 140,
    priceNeto: 32400,
    minWholesaleQty: 5,
    weightKg: 0.9,
    dimensionsCm: { length: 48, width: 22, height: 2 },
    image: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=600&auto=format&fit=crop&q=80",
    isOsakansaiBrand: true,
    featured: true,
  },
  {
    id: "prod-004",
    sku: "OSK-SH-5514",
    oem: "48510-09P10",
    oemCrossReference: ["48510-0K100", "48510-80491"],
    title: "Amortiguador Delantero Presurizado a Gas Nitrógeno",
    category: "Suspensión y Dirección",
    brand: "Osakansai Suspension Pro",
    origin: "Japón",
    vehicleCompatibility: [
      "Toyota Hilux 4x4 KUN25 / KUN26 (2005-2015)",
      "Toyota Hilux Revo 4x4 GUN125 / GUN126 (2016-2023)"
    ],
    vinPrefix: ["MR0FZ29G", "MR0HA3CD", "MROHA8CD"],
    stock: 92,
    priceNeto: 43900,
    minWholesaleQty: 6,
    weightKg: 4.3,
    dimensionsCm: { length: 60, width: 14, height: 14 },
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&auto=format&fit=crop&q=80",
    isOsakansaiBrand: true,
    featured: true,
  },
  {
    id: "prod-005",
    sku: "OSK-FL-1008",
    oem: "23390-0L050",
    oemCrossReference: ["23390-YZZA1", "23390-0L041"],
    title: "Filtro de Combustible Diésel Common Rail de Alta Eficiencia",
    category: "Inyección y Filtros",
    brand: "Osakansai Filtration Systems",
    origin: "Tailandia",
    vehicleCompatibility: [
      "Toyota Hilux 2.5 / 3.0 D-4D 1KD/2KD (2005-2015)",
      "Toyota Hiace 2.5 D-4D 2KD (2006-2019)",
      "Toyota Fortuner 3.0 D-4D"
    ],
    vinPrefix: ["MR0FZ22G", "JTFAZ22P"],
    stock: 450,
    priceNeto: 8900,
    minWholesaleQty: 25,
    weightKg: 0.45,
    dimensionsCm: { length: 12, width: 12, height: 14 },
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&auto=format&fit=crop&q=80",
    isOsakansaiBrand: true,
    featured: false,
  },
  {
    id: "prod-006",
    sku: "OSK-BC-4119",
    oem: "47550-35280",
    oemCrossReference: ["47550-0K020", "47550-26140"],
    title: "Cilindro de Rueda Freno Trasero 7/8'' Doble Pistón",
    category: "Frenos y Cilindros",
    brand: "Osakansai Genuine Parts",
    origin: "Japón",
    vehicleCompatibility: [
      "Toyota Hilux 4x2 / 4x4 (1998-2015)",
      "Toyota 4Runner 2.7 / 3.4 (1996-2002)",
      "Mitsubishi L200 Katana 2.5 DID"
    ],
    vinPrefix: ["JT3HN86R", "MR0FZ29G", "MMBJRKB40"],
    stock: 210,
    priceNeto: 14200,
    minWholesaleQty: 8,
    weightKg: 0.85,
    dimensionsCm: { length: 12, width: 9, height: 7 },
    image: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=600&auto=format&fit=crop&q=80",
    isOsakansaiBrand: true,
    featured: false,
  },
  {
    id: "prod-007",
    sku: "OSK-IG-8840",
    oem: "22401-AA720",
    oemCrossReference: ["SILFR6A11", "90919-01210"],
    title: "Pack 4 Bujías de Iridio Láser Long Life",
    category: "Eléctrico e Ignición",
    brand: "Osakansai Ignition Tech",
    origin: "Japón",
    vehicleCompatibility: [
      "Subaru Forester 2.0 / 2.5 FB20 (2012-2022)",
      "Subaru Outback 2.5i (2010-2021)",
      "Subaru XV 2.0 (2012-2020)"
    ],
    vinPrefix: ["JF1SJ526", "JF2BS96C", "JF1GP7LE"],
    stock: 320,
    priceNeto: 24900,
    minWholesaleQty: 10,
    weightKg: 0.35,
    dimensionsCm: { length: 10, width: 10, height: 4 },
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600&auto=format&fit=crop&q=80",
    isOsakansaiBrand: true,
    featured: false,
  },
  {
    id: "prod-008",
    sku: "OSK-RK-6022",
    oem: "44200-0K040",
    oemCrossReference: ["44200-0K230", "44200-0K390"],
    title: "Cremallera de Dirección Hidráulica Completa",
    category: "Suspensión y Dirección",
    brand: "Osakansai Steering Masters",
    origin: "Taiwán",
    vehicleCompatibility: [
      "Toyota Hilux 4x4 KUN26 / KUN16 (2005-2015)",
      "Toyota Fortuner 4x4 (2006-2015)"
    ],
    vinPrefix: ["MR0FZ29G", "MR0FZ22G"],
    stock: 0, // Stock Cero para simular Backorder / Proforma condicionada
    priceNeto: 165000,
    minWholesaleQty: 2,
    weightKg: 13.5,
    dimensionsCm: { length: 125, width: 22, height: 18 },
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&auto=format&fit=crop&q=80",
    isOsakansaiBrand: true,
    featured: true,
  },
  {
    id: "prod-009",
    sku: "OSK-FP-1190",
    oem: "17042-0W000",
    oemCrossReference: ["31111-25000", "15100-65D00"],
    title: "Bomba Eléctrica de Combustible Sumergible 3.5 Bar",
    category: "Inyección y Filtros",
    brand: "Osakansai Fuel Systems",
    origin: "Japón",
    vehicleCompatibility: [
      "Nissan Pathfinder 3.3 / 3.5 V6 (1997-2004)",
      "Suzuki Grand Vitara 1.6 / 2.0 (1999-2005)",
      "Hyundai Accent / Elantra 1.5 - 1.8"
    ],
    vinPrefix: ["JN8AR05W", "JS3TD02V", "KMHVF41D"],
    stock: 0, // Stock Cero para Backorder demo
    priceNeto: 28500,
    minWholesaleQty: 6,
    weightKg: 0.65,
    dimensionsCm: { length: 15, width: 8, height: 8 },
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&auto=format&fit=crop&q=80",
    isOsakansaiBrand: true,
    featured: false,
  },
  {
    id: "prod-010",
    sku: "OSK-WP-4480",
    oem: "16100-39465",
    oemCrossReference: ["16100-39466", "16100-39515"],
    title: "Bomba de Agua con Empaque Reforzado",
    category: "Motor y Empaquetaduras",
    brand: "Osakansai Engine Solutions",
    origin: "Japón",
    vehicleCompatibility: [
      "Toyota Yaris 1.3 / 1.5 2NZ-FE / 1NZ-FE (2000-2017)",
      "Toyota Corolla 1.6 / 1.8 1ZR-FE",
      "Toyota Vitz 1.3"
    ],
    vinPrefix: ["JTDKW923", "NCP9100", "MR053AT2"],
    stock: 88,
    priceNeto: 31900,
    minWholesaleQty: 5,
    weightKg: 1.6,
    dimensionsCm: { length: 18, width: 16, height: 14 },
    image: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=600&auto=format&fit=crop&q=80",
    isOsakansaiBrand: true,
    featured: false,
  }
];
