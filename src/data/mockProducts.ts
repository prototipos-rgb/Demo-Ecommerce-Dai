export interface Product {
  id: string;
  sku: string; // Código Producto
  oem: string;
  oemCrossReference: string[];
  title: string;
  category: string; // Rubro Principal
  subcategory?: string; // Subrubro específico
  brand: string;
  origin: string;
  vehicleCompatibility: string[];
  vinPrefix: string[];
  stock: number; // Disponible Inmediato ZOFRI
  priceNeto: number; // Cotización
  minWholesaleQty: number; // Cantidad Mínima
  weightKg: number;
  dimensionsCm: { length: number; width: number; height: number };
  image?: string;
  isOsakansaiBrand: boolean;
  featured?: boolean;

  // Encabezados oficiales de la BDD Daisekai / Multiem (Identificadores Clave de Vehículo)
  patenteMarca?: string;
  patenteModelo?: string;
  patenteChasis?: string; // Prefijo Chasis / VIN
  patenteAnio?: string;
  rubro?: string;
  codigoMarutomo?: string;
  informacion?: string;
  descripcion?: string;
  empresa?: string;
  contenedor?: string; // Referencia de contenedor marítimo en ZOFRI
  disponiblePorLlegar?: number; // Stock en tránsito / próximo arribo
  fabricando?: number; // En orden de producción en fábrica
  disponibleFabricacion?: number;
  folio?: string;
}

export const RAW_PRODUCTS: Product[] = [
  {
    id: "prod-001",
    sku: "OSK-BP-7701",
    oem: "04465-0K260",
    oemCrossReference: ["04465-0K090", "04465-0K340", "D1060-0K260"],
    title: "Pastillas de Freno Delanteras Cerámicas HD",
    category: "Cilindros y Frenos",
    brand: "Osakansai Genuine",
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
    isOsakansaiBrand: true,
    featured: true,
  },
  {
    id: "prod-002",
    sku: "OSK-BC-4119",
    oem: "47550-35280",
    oemCrossReference: ["47550-0K020", "47550-26140"],
    title: "Cilindro de Rueda Freno Trasero 7/8'' Doble Pistón",
    category: "Cilindros y Frenos",
    brand: "Osakansai Genuine",
    origin: "Japón",
    vehicleCompatibility: [
      "Toyota Hilux 4x2 / 4x4 KUN26 (1998-2015)",
      "Toyota 4Runner 2.7 / 3.4 (1996-2002)",
      "Mitsubishi L200 Katana 2.5 DID"
    ],
    vinPrefix: ["JT3HN86R", "MR0FZ29G", "MMBJRKB40"],
    stock: 210,
    priceNeto: 14200,
    minWholesaleQty: 8,
    weightKg: 0.85,
    dimensionsCm: { length: 12, width: 9, height: 7 },
    isOsakansaiBrand: true,
    featured: true,
  },
  {
    id: "prod-003",
    sku: "OSK-BC-4125",
    oem: "44100-EB70A",
    oemCrossReference: ["44100-EB300", "44100-VK000"],
    title: "Cilindro Maestro de Freno Principal con Depósito",
    category: "Cilindros y Frenos",
    brand: "Osakansai Genuine",
    origin: "Japón",
    vehicleCompatibility: [
      "Nissan Navara D40 2.5 dCi (2006-2015)",
      "Nissan Terrano 2.5 Di Turbo (2003-2013)",
      "Nissan NP300 D22"
    ],
    vinPrefix: ["VSKCVND40", "MNTCB22"],
    stock: 75,
    priceNeto: 42500,
    minWholesaleQty: 4,
    weightKg: 1.8,
    dimensionsCm: { length: 24, width: 14, height: 12 },
    isOsakansaiBrand: true,
    featured: true,
  },
  {
    id: "prod-004",
    sku: "OSK-GK-9921",
    oem: "22311-2F000",
    oemCrossReference: ["22311-2F010", "22311-2F020"],
    title: "Empaquetadura de Culata Metálica MLS Multi-Lámina",
    category: "Empaques y Culatas",
    brand: "Osakansai Engine Parts",
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
    isOsakansaiBrand: true,
    featured: true,
  },
  {
    id: "prod-005",
    sku: "OSK-GK-1104",
    oem: "11115-0L010",
    oemCrossReference: ["11115-30030", "11115-30040"],
    title: "Empaque de Culata Multilámina Motor 1KD-FTV / 2KD",
    category: "Empaques y Culatas",
    brand: "Osakansai Engine Parts",
    origin: "Japón",
    vehicleCompatibility: [
      "Toyota Hilux 2.5 / 3.0 D-4D KUN25 KUN26 (2005-2015)",
      "Toyota Hiace 2.5 D-4D (2006-2018)",
      "Toyota Fortuner 3.0 D-4D"
    ],
    vinPrefix: ["MR0FZ29G", "JTFAZ22P"],
    stock: 165,
    priceNeto: 34900,
    minWholesaleQty: 5,
    weightKg: 0.95,
    dimensionsCm: { length: 50, width: 24, height: 2 },
    isOsakansaiBrand: true,
    featured: true,
  },
  {
    id: "prod-006",
    sku: "OSK-CL-3310",
    oem: "30100-4KH0A",
    oemCrossReference: ["C0100-4KH0A", "30210-4KH0A"],
    title: "Kit Disco de Embrague Reforzado Heavy Duty 275mm",
    category: "Embragues y Transmisión",
    brand: "Osakansai Heavy Duty",
    origin: "Japón",
    vehicleCompatibility: [
      "Nissan NP300 Frontier 2.3 dCi Turbo (2016-2024)",
      "Nissan Navara D23 2.3 TT (2016-2023)",
      "Renault Alaskan 2.3 dCi"
    ],
    vinPrefix: ["MNTAD23", "MNTCB23", "VF16T2"],
    stock: 65,
    priceNeto: 84500,
    minWholesaleQty: 4,
    weightKg: 7.8,
    dimensionsCm: { length: 32, width: 32, height: 9 },
    isOsakansaiBrand: true,
    featured: true,
  },
  {
    id: "prod-007",
    sku: "OSK-CL-7780",
    oem: "31250-0K204",
    oemCrossReference: ["31250-0K202", "31210-0K080"],
    title: "Disco de Embrague Cerámico Reforzado para Faenas",
    category: "Embragues y Transmisión",
    brand: "Osakansai Heavy Duty",
    origin: "Japón",
    vehicleCompatibility: [
      "Toyota Hilux Revo 2.4 / 2.8 GD (2016-2023)",
      "Toyota Fortuner 2.8 GD"
    ],
    vinPrefix: ["MR0HA3CD", "MR0HA8CD"],
    stock: 50,
    priceNeto: 76000,
    minWholesaleQty: 3,
    weightKg: 6.9,
    dimensionsCm: { length: 30, width: 30, height: 8 },
    isOsakansaiBrand: true,
    featured: false,
  },
  {
    id: "prod-008",
    sku: "OSK-SH-5514",
    oem: "48510-09P10",
    oemCrossReference: ["48510-0K100", "48510-80491"],
    title: "Amortiguador Delantero Presurizado a Gas Nitrógeno",
    category: "Amortiguadores y Suspensión",
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
    isOsakansaiBrand: true,
    featured: true,
  },
  {
    id: "prod-009",
    sku: "OSK-SH-9920",
    oem: "E6210-4KH0A",
    oemCrossReference: ["E6210-4JA0A", "56210-EB70A"],
    title: "Amortiguador Trasero de Carga Pesada Heavy Duty",
    category: "Amortiguadores y Suspensión",
    brand: "Osakansai Suspension Pro",
    origin: "Japón",
    vehicleCompatibility: [
      "Nissan NP300 D23 4x4 (2016-2024)",
      "Nissan Navara D40 (2008-2015)"
    ],
    vinPrefix: ["MNTAD23", "VSKCVND40"],
    stock: 110,
    priceNeto: 38500,
    minWholesaleQty: 6,
    weightKg: 3.8,
    dimensionsCm: { length: 58, width: 12, height: 12 },
    isOsakansaiBrand: true,
    featured: false,
  },
  {
    id: "prod-010",
    sku: "OSK-RK-6022",
    oem: "44200-0K040",
    oemCrossReference: ["44200-0K230", "44200-0K390"],
    title: "Cremallera de Dirección Hidráulica Completa con Axiales",
    category: "Cremalleras y Dirección",
    brand: "Osakansai Steering Masters",
    origin: "Taiwán",
    vehicleCompatibility: [
      "Toyota Hilux 4x4 KUN26 / KUN16 (2005-2015)",
      "Toyota Fortuner 4x4 (2006-2015)"
    ],
    vinPrefix: ["MR0FZ29G", "MR0FZ22G"],
    stock: 0,
    priceNeto: 165000,
    minWholesaleQty: 2,
    weightKg: 13.5,
    dimensionsCm: { length: 125, width: 22, height: 18 },
    isOsakansaiBrand: true,
    featured: true,
  },
  {
    id: "prod-011",
    sku: "OSK-RK-7714",
    oem: "49001-4KH0A",
    oemCrossReference: ["49001-EB300", "49001-VK000"],
    title: "Cremallera de Dirección Asistida Reforzada",
    category: "Cremalleras y Dirección",
    brand: "Osakansai Steering Masters",
    origin: "Taiwán",
    vehicleCompatibility: [
      "Nissan NP300 Frontier (2016-2023)",
      "Nissan Navara D23 4x4"
    ],
    vinPrefix: ["MNTAD23"],
    stock: 14,
    priceNeto: 178000,
    minWholesaleQty: 2,
    weightKg: 14.1,
    dimensionsCm: { length: 130, width: 24, height: 20 },
    isOsakansaiBrand: true,
    featured: false,
  },
  {
    id: "prod-012",
    sku: "OSK-SC-3301",
    oem: "90919-22386",
    oemCrossReference: ["90919-22400", "90919-YZZAE"],
    title: "Juego de Cables de Bujía de Silicona 8mm Alta Conductividad",
    category: "Cables de Bujía y Eléctrico",
    brand: "Osakansai Ignition",
    origin: "Japón",
    vehicleCompatibility: [
      "Toyota Hilux 2.7 3RZ-FE / 2TR-FE (1998-2015)",
      "Toyota 4Runner 2.7",
      "Toyota Hiace 2.7"
    ],
    vinPrefix: ["RZN169", "TGN126"],
    stock: 85,
    priceNeto: 21500,
    minWholesaleQty: 6,
    weightKg: 0.65,
    dimensionsCm: { length: 28, width: 18, height: 6 },
    isOsakansaiBrand: true,
    featured: false,
  },
  {
    id: "prod-013",
    sku: "OSK-SC-8890",
    oem: "27501-26D00",
    oemCrossReference: ["27501-22B10", "27501-23B70"],
    title: "Set Cables de Bujía de Competición Núcleo de Cobre",
    category: "Cables de Bujía y Eléctrico",
    brand: "Osakansai Ignition",
    origin: "Corea del Sur",
    vehicleCompatibility: [
      "Hyundai Accent 1.4 / 1.6 G4EE G4ED (2006-2012)",
      "Kia Rio 1.4 / 1.6 G4EE (2005-2011)",
      "Hyundai Getz 1.4"
    ],
    vinPrefix: ["KMHCT41C", "KNADE12"],
    stock: 130,
    priceNeto: 16900,
    minWholesaleQty: 8,
    weightKg: 0.55,
    dimensionsCm: { length: 25, width: 16, height: 5 },
    isOsakansaiBrand: true,
    featured: false,
  },
  {
    id: "prod-014",
    sku: "OSK-FP-1190",
    oem: "17042-0W000",
    oemCrossReference: ["31111-25000", "15100-65D00"],
    title: "Bomba Eléctrica de Combustible Sumergible 3.5 Bar",
    category: "Bombas y Filtros",
    brand: "Osakansai Fuel Systems",
    origin: "Japón",
    vehicleCompatibility: [
      "Nissan Pathfinder 3.3 / 3.5 V6 (1997-2004)",
      "Suzuki Grand Vitara 1.6 / 2.0 (1999-2005)",
      "Hyundai Accent / Elantra 1.5 - 1.8"
    ],
    vinPrefix: ["JN8AR05W", "JS3TD02V", "KMHVF41D"],
    stock: 0,
    priceNeto: 28500,
    minWholesaleQty: 6,
    weightKg: 0.65,
    dimensionsCm: { length: 15, width: 8, height: 8 },
    isOsakansaiBrand: true,
    featured: false,
  },
  {
    id: "prod-015",
    sku: "OSK-WP-4480",
    oem: "16100-39465",
    oemCrossReference: ["16100-39466", "16100-39515"],
    title: "Bomba de Agua con Empaque Reforzado y Turbina de Acero",
    category: "Bombas y Filtros",
    brand: "Osakansai Engine Parts",
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
    isOsakansaiBrand: true,
    featured: false,
  },
  {
    id: "prod-016",
    sku: "OSK-FL-1008",
    oem: "23390-0L050",
    oemCrossReference: ["23390-YZZA1", "23390-0L041"],
    title: "Filtro de Combustible Diésel Common Rail Alta Retención",
    category: "Bombas y Filtros",
    brand: "Osakansai Filtration",
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
    isOsakansaiBrand: true,
    featured: false,
  },
  {
    id: "prod-017",
    sku: "OSK-IG-8840",
    oem: "22401-AA720",
    oemCrossReference: ["SILFR6A11", "90919-01210"],
    title: "Pack 4 Bujías de Iridio Láser Long Life",
    category: "Cables de Bujía y Eléctrico",
    brand: "Osakansai Ignition",
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
    isOsakansaiBrand: true,
    featured: false,
  },
  {
    id: "prod-018",
    sku: "OSK-GK-4402",
    oem: "MD350221",
    oemCrossReference: ["MD346925", "1005A206"],
    title: "Empaque de Tapa de Válvulas y Sellos de Bujía",
    category: "Empaques y Culatas",
    brand: "Osakansai Engine Parts",
    origin: "Japón",
    vehicleCompatibility: [
      "Mitsubishi L200 Katana 2.5 DID 4D56 (2007-2016)",
      "Mitsubishi Montero Sport 2.5 DID",
      "Mitsubishi Pajero 2.5"
    ],
    vinPrefix: ["MMBJRKB40", "JMBONV75"],
    stock: 195,
    priceNeto: 18400,
    minWholesaleQty: 8,
    weightKg: 0.42,
    dimensionsCm: { length: 42, width: 18, height: 4 },
    isOsakansaiBrand: true,
    featured: false,
  },
  {
    id: "prod-019",
    sku: "OSK-SH-1142",
    oem: "54651-2S000",
    oemCrossReference: ["54651-2S100", "54661-2S000"],
    title: "Amortiguador Delantero Gas Strut Reforzado",
    category: "Amortiguadores y Suspensión",
    brand: "Osakansai Suspension Pro",
    origin: "Corea del Sur",
    vehicleCompatibility: [
      "Hyundai Tucson 2.0 / 2.4 (2010-2015)",
      "Kia Sportage 2.0 CRDi (2010-2016)"
    ],
    vinPrefix: ["KMHJU81B", "KNAPC812"],
    stock: 78,
    priceNeto: 41200,
    minWholesaleQty: 4,
    weightKg: 4.6,
    dimensionsCm: { length: 55, width: 15, height: 15 },
    isOsakansaiBrand: true,
    featured: false,
  },
  {
    id: "prod-020",
    sku: "OSK-BC-5520",
    oem: "8-97100-344-0",
    oemCrossReference: ["8-97100-344-1", "8971003440"],
    title: "Cilindro de Freno Trasero Doble Efecto Camioneta",
    category: "Cilindros y Frenos",
    brand: "Osakansai Genuine",
    origin: "Japón",
    vehicleCompatibility: [
      "Isuzu D-Max 2.5 / 3.0 TD (2005-2019)",
      "Chevrolet D-Max 2.5 / 3.0 Diésel (2006-2018)"
    ],
    vinPrefix: ["MP1TFR85", "MP1TFS85"],
    stock: 145,
    priceNeto: 15900,
    minWholesaleQty: 6,
    weightKg: 0.9,
    dimensionsCm: { length: 13, width: 10, height: 8 },
    isOsakansaiBrand: true,
    featured: false,
  },
  {
    id: "prod-021",
    sku: "OSK-CL-9904",
    oem: "22100-65J00",
    oemCrossReference: ["22400-65J00", "22100-65J01"],
    title: "Kit Embrague Prensa y Disco 225mm 4WD",
    category: "Embragues y Transmisión",
    brand: "Osakansai Heavy Duty",
    origin: "Japón",
    vehicleCompatibility: [
      "Suzuki Grand Vitara 1.6 / 2.0 JB420 (2006-2015)",
      "Suzuki SX4 2.0 4x4 (2007-2014)"
    ],
    vinPrefix: ["JS3TD54V", "JS2EYA11"],
    stock: 42,
    priceNeto: 68500,
    minWholesaleQty: 3,
    weightKg: 5.8,
    dimensionsCm: { length: 28, width: 28, height: 8 },
    isOsakansaiBrand: true,
    featured: false,
  },
  {
    id: "prod-022",
    sku: "OSK-ALT-9040",
    oem: "27060-0L021",
    oemCrossReference: ["104210-9010", "27060-0L020"],
    title: "Alternador 12V 100A Reforzado Faena Minera",
    category: "Cables de Bujía y Eléctrico",
    brand: "Osakansai Heavy Duty",
    origin: "Japón",
    vehicleCompatibility: [
      "Toyota Hilux 2.5 / 3.0 1KD-FTV / 2KD (2005-2015)",
      "Toyota Fortuner 3.0 D-4D"
    ],
    vinPrefix: ["MR0FZ29G"],
    stock: 28,
    priceNeto: 145000,
    minWholesaleQty: 2,
    weightKg: 7.2,
    dimensionsCm: { length: 25, width: 22, height: 20 },
    isOsakansaiBrand: true,
    featured: false,
  }
];

// Enriquecimiento automático con los campos oficiales de la Base de Datos Daisekai Multiem
// (Patente Marca, Patente Modelo, Patente Chasis/VIN, Patente Año, Rubro, Codigo Marutomo, Contenedor, Folio)
export const INITIAL_PRODUCTS: Product[] = RAW_PRODUCTS.map((p, idx) => {
  const comp = p.vehicleCompatibility[0] || "";
  const parts = comp.split(" ");
  const brandUpper = parts[0]?.toUpperCase() || "TOYOTA";
  const modelUpper = comp.split("(")[0]?.trim().toUpperCase() || "HILUX";
  const yearMatch = comp.match(/\((.*?)\)/);
  const anio = yearMatch ? yearMatch[1] : "2015-2024";

  // Subrubros automotrices específicos
  let subcat = "Componente Mecánico";
  if (p.category === "Cilindros y Frenos") {
    subcat = p.title.toLowerCase().includes("pastilla")
      ? "Pastillas Cerámicas HD"
      : p.title.toLowerCase().includes("maestro")
      ? "Cilindros Maestros de Freno"
      : "Cilindros de Rueda";
  } else if (p.category === "Empaques y Culatas") {
    subcat = p.title.toLowerCase().includes("culata")
      ? "Empaquetaduras de Culata MLS"
      : "Juntas de Cárter y Motor";
  } else if (p.category === "Embragues y Transmisión") {
    subcat = p.title.toLowerCase().includes("disco")
      ? "Discos de Embrague HD"
      : "Kits de Embrague Prensa";
  } else if (p.category === "Amortiguadores y Suspensión") {
    subcat = "Amortiguadores a Gas Doble Tubo";
  } else if (p.category === "Cremalleras y Dirección") {
    subcat = "Cremalleras Hidráulicas";
  } else if (p.category === "Cables de Bujía y Eléctrico") {
    subcat = p.title.toLowerCase().includes("alternador")
      ? "Alternadores y Motores de Partida"
      : "Cables de Bujía Siliconados";
  }

  return {
    ...p,
    subcategory: subcat,
    patenteMarca: p.patenteMarca || brandUpper,
    patenteModelo: p.patenteModelo || modelUpper,
    patenteChasis: p.patenteChasis || (p.vinPrefix && p.vinPrefix[0]) || "MR0HA3CD",
    patenteAnio: p.patenteAnio || anio,
    rubro: p.category,
    codigoMarutomo:
      p.codigoMarutomo || `MRT-${p.oem.replace(/[^0-9A-Z]/gi, "").slice(0, 8)}`,
    informacion: `Especificación japonesa para faenas y flotas. Diámetro y tolerancias calibradas.`,
    descripcion: `${p.title} - Aplicación: ${p.vehicleCompatibility.join(" / ")}`,
    empresa: p.isOsakansaiBrand ? "OSAKANSAI LIMITADA" : "DAISEKAI AUTOMOTIVE",
    contenedor: `MSKU-${982140 + idx} (En Galpón 7 Recinto ZOFRI)`,
    disponiblePorLlegar: p.stock <= 0 ? 80 : 35,
    fabricando: 50,
    disponibleFabricacion: 50,
    folio: `FOL-2026-${String(idx + 1).padStart(4, "0")}`,
  };
});

