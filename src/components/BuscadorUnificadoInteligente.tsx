"use client";

import React, { useState, useEffect, useRef } from "react";
import { useApp } from "@/context/AppContext";
import { Product } from "@/data/mockProducts";
import {
  Search,
  Car,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  X,
  SlidersHorizontal,
  RotateCcw,
  Tag,
  Hash,
  Wrench,
  Layers,
  Building,
  Filter
} from "lucide-react";

export interface PresetVehicle {
  patente: string;
  patenteMarca: string;
  patenteModelo: string;
  patenteChasis: string;
  patenteAnio: string;
  motor: string;
  rubros: string[];
  searchKey: string;
}

export const PRESET_VEHICLES: PresetVehicle[] = [
  {
    patente: "LJ-RG-42",
    patenteMarca: "TOYOTA",
    patenteModelo: "HILUX REVO 2.8 D-4D 4X4",
    patenteChasis: "MR0HA3CD",
    patenteAnio: "2016-2024",
    motor: "1GD-FTV 2.8L Turbo Diésel Intercooler",
    rubros: ["Cilindros y Frenos", "Empaquetaduras MLS", "Amortiguadores"],
    searchKey: "Hilux",
  },
  {
    patente: "BB-CL-19",
    patenteMarca: "NISSAN",
    patenteModelo: "NAVARA D40 2.5 DCI DIESEL",
    patenteChasis: "VSKCVND40",
    patenteAnio: "2006-2015",
    motor: "YD25DDTi 2.5L Common Rail",
    rubros: ["Cilindros Maestros", "Discos de Embrague HD", "Cremalleras"],
    searchKey: "Navara",
  },
  {
    patente: "HK-FP-88",
    patenteMarca: "HYUNDAI",
    patenteModelo: "SANTA FE 2.2 CRDI 4WD",
    patenteChasis: "KMHSH81W",
    patenteAnio: "2012-2021",
    motor: "D4HB 2.2L R-Engine 197 HP",
    rubros: ["Empaquetaduras de Culata MLS", "Cilindros de Freno"],
    searchKey: "D4HB",
  },
  {
    patente: "PW-TX-33",
    patenteMarca: "MITSUBISHI",
    patenteModelo: "L200 KATANA 2.5 DID CR",
    patenteChasis: "MMBJRKB40",
    patenteAnio: "2008-2017",
    motor: "4D56 DI-D 16V Turbo",
    rubros: ["Cilindro Rueda Trasero", "Kits de Embrague", "Amortiguadores a Gas"],
    searchKey: "L200",
  },
  {
    patente: "GR-ST-51",
    patenteMarca: "ISUZU",
    patenteModelo: "D-MAX 2.5 / 3.0 TD 4X4",
    patenteChasis: "MP1TFS85",
    patenteAnio: "2005-2019",
    motor: "4JJ1-TCX 3.0L Diésel",
    rubros: ["Cilindros de Freno Doble Efecto", "Alternadores Reforzados"],
    searchKey: "D-Max",
  },
];

interface BuscadorUnificadoInteligenteProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedSubcategory: string;
  setSelectedSubcategory: (sub: string) => void;
  selectedBrand: string;
  setSelectedBrand: (brand: string) => void;
  selectedOrigin: string;
  setSelectedOrigin: (origin: string) => void;
  selectedYearRange: string;
  setSelectedYearRange: (yr: string) => void;
  categories: string[];
  subcategories: string[];
  brandOptions: string[];
  originOptions: string[];
  yearRanges: string[];
  totalProductsCount: number;
  filteredProductsCount: number;
  autocompleteSuggestions: Product[];
  onSelectSuggestion: (sug: Product) => void;
  identifiedVehicle: PresetVehicle | null;
  setIdentifiedVehicle: (vehicle: PresetVehicle | null) => void;
}

export const BuscadorUnificadoInteligente: React.FC<BuscadorUnificadoInteligenteProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedSubcategory,
  setSelectedSubcategory,
  selectedBrand,
  setSelectedBrand,
  selectedOrigin,
  setSelectedOrigin,
  selectedYearRange,
  setSelectedYearRange,
  categories,
  subcategories,
  brandOptions,
  originOptions,
  yearRanges,
  totalProductsCount,
  filteredProductsCount,
  autocompleteSuggestions,
  onSelectSuggestion,
  identifiedVehicle,
  setIdentifiedVehicle,
}) => {
  const { addToast } = useApp();
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Cerrar autocompletado si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowAutocomplete(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Función para resolver y verificar si el query corresponde a un vehículo de la base de datos
  const evaluateVehicleQuery = (queryText: string) => {
    const clean = queryText.trim().toUpperCase().replace(/[\s-]/g, "");
    if (!clean) {
      setIdentifiedVehicle(null);
      return;
    }

    const match = PRESET_VEHICLES.find(
      (v) =>
        v.patente.replace(/[\s-]/g, "") === clean ||
        v.patenteChasis.toUpperCase().includes(clean) ||
        clean.includes(v.patenteChasis.toUpperCase()) ||
        (clean.length >= 3 && v.patenteModelo.toUpperCase().replace(/\s/g, "").includes(clean)) ||
        (clean.length >= 3 && v.searchKey.toUpperCase() === clean)
    );

    if (match) {
      setIdentifiedVehicle(match);
      addToast(
        "Vehículo Identificado",
        `Compatibilidad resuelta: ${match.patenteMarca} ${match.patenteModelo} (${match.patenteAnio}). Catálogo filtrado con precisión técnica.`,
        "success"
      );
    }
  };

  const handleInputChange = (val: string) => {
    setSearchQuery(val);
    setShowAutocomplete(true);
    // Auto-detectar si coincide directamente
    const clean = val.trim().toUpperCase().replace(/[\s-]/g, "");
    const match = PRESET_VEHICLES.find(
      (v) =>
        v.patente.replace(/[\s-]/g, "") === clean ||
        v.patenteChasis.toUpperCase() === clean
    );
    if (match) {
      setIdentifiedVehicle(match);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAutocomplete(false);
    evaluateVehicleQuery(searchQuery);
  };

  const handleSelectQuickVehicle = (vehicle: PresetVehicle) => {
    setSearchQuery(vehicle.patente);
    setIdentifiedVehicle(vehicle);
    setShowAutocomplete(false);
    addToast(
      "Identificador Aplicado",
      `Patente ${vehicle.patente} aplicada. Filtrando catálogo para ${vehicle.patenteMarca} ${vehicle.patenteModelo}.`,
      "info"
    );
  };

  const handleSelectQuickOEM = (oemCode: string, label: string) => {
    setIdentifiedVehicle(null);
    setSearchQuery(oemCode);
    setShowAutocomplete(false);
    addToast("Filtro OEM Aplicado", `Buscando piezas para código oficial ${oemCode} (${label})`, "info");
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setIdentifiedVehicle(null);
    setShowAutocomplete(false);
  };

  const handleResetAll = () => {
    setSearchQuery("");
    setIdentifiedVehicle(null);
    setSelectedCategory("Todos");
    setSelectedSubcategory("Todos");
    setSelectedBrand("Todos");
    setSelectedOrigin("Todos");
    setSelectedYearRange("Todos");
    setShowAutocomplete(false);
    addToast("Búsqueda Restablecida", "Todos los filtros técnicos y de búsqueda han sido restablecidos.", "info");
  };

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    identifiedVehicle !== null ||
    selectedCategory !== "Todos" ||
    selectedSubcategory !== "Todos" ||
    selectedBrand !== "Todos" ||
    selectedOrigin !== "Todos" ||
    selectedYearRange !== "Todos";

  return (
    <div
      ref={containerRef}
      className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-sm relative"
    >
      {/* 1. ENCABEZADO UNIFICADO */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-stone-100 pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h3 className="text-lg font-bold text-stone-900 font-serif tracking-tight">
              Buscador Técnico Unificado & Decodificador Inteligente B2B
            </h3>
            <span className="text-[10px] font-bold text-stone-600 uppercase tracking-widest bg-stone-100 px-2.5 py-0.5 rounded-full border border-stone-200">
              Cruce Multiem ZOFRI
            </span>
          </div>
          <p className="text-xs text-stone-500 font-light mt-0.5">
            Consulte por Patente vehicular chilena, Chasis (VIN), Código OEM de fábrica, Marutomo, Modelo o especificación técnica.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs font-bold text-stone-700 bg-[#F6F4EE] px-3 py-1.5 rounded-xl border border-stone-200 font-mono">
            {filteredProductsCount} de {totalProductsCount} repuestos
          </span>

          {hasActiveFilters && (
            <button
              onClick={handleResetAll}
              className="text-xs font-bold text-stone-500 hover:text-stone-900 flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 hover:bg-stone-50 transition shadow-2xs"
              title="Restablecer todos los filtros"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restablecer</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. BARRA DE BÚSQUEDA PRINCIPAL */}
      <form onSubmit={handleFormSubmit} className="relative space-y-3">
        <div className="relative flex items-center">
          <div className="absolute left-4.5 text-stone-400 pointer-events-none">
            <Search className="w-5 h-5" />
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={() => setShowAutocomplete(true)}
            placeholder="Ingrese Patente (ej: LJ-RG-42), Chasis VIN (MR0HA3CD), OEM (04465-0K260), Modelo (Hilux) o SKU..."
            className="w-full pl-12 pr-32 py-4 bg-[#FBF9F5] border border-stone-300 rounded-2xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:bg-white transition shadow-inner font-medium"
          />

          <div className="absolute right-2.5 flex items-center gap-1.5">
            {searchQuery && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="w-7 h-7 rounded-full text-stone-400 hover:text-stone-800 hover:bg-stone-200 flex items-center justify-center transition"
                title="Limpiar texto"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition flex items-center gap-1.5"
            >
              <span>Identificar</span>
              <ArrowRight className="w-3.5 h-3.5 text-stone-300" />
            </button>
          </div>
        </div>

        {/* 3. MENÚ DE AUTOCOMPLETADO INTELIGENTE FLOTANTE */}
        {showAutocomplete && autocompleteSuggestions.length > 0 && (
          <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl border border-stone-200 shadow-2xl z-40 p-2 space-y-1 animate-in fade-in duration-150">
            <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-400 font-mono flex items-center justify-between border-b border-stone-100">
              <span>Sugerencias Técnicas en Tiempo Real:</span>
              <span className="text-[9px] text-stone-400">Clic para aplicar filtro</span>
            </div>
            {autocompleteSuggestions.map((sug) => (
              <div
                key={sug.id}
                onClick={() => {
                  onSelectSuggestion(sug);
                  setShowAutocomplete(false);
                }}
                className="p-3 rounded-xl hover:bg-[#FBF9F5] cursor-pointer flex items-center justify-between text-xs transition border border-transparent hover:border-stone-200"
              >
                <div className="space-y-0.5">
                  <div className="font-bold text-stone-900 flex items-center gap-2">
                    <span>{sug.title}</span>
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-stone-100 text-stone-700 font-mono">
                      {sug.brand}
                    </span>
                  </div>
                  <div className="text-[11px] text-stone-500 font-mono flex items-center gap-2">
                    <span>OEM: <strong className="text-stone-800">{sug.oem}</strong></span>
                    {sug.patenteChasis && <span>&bull; Chasis: {sug.patenteChasis}</span>}
                    {sug.patenteModelo && <span>&bull; {sug.patenteModelo}</span>}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] font-bold font-mono px-2 py-1 rounded-md bg-stone-900 text-white block">
                    {sug.sku}
                  </span>
                  <span className="text-[9px] text-stone-400 block mt-0.5">
                    Stock: {sug.stock} un.
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </form>

      {/* 4. TARJETA DE VEHÍCULO IDENTIFICADO (SI COINCIDE PATENTE O CHASIS) */}
      {identifiedVehicle && (
        <div className="p-4 sm:p-5 rounded-2xl bg-[#FBF9F5] border-2 border-stone-900 text-stone-900 space-y-3 shadow-xs animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-stone-900 text-white flex items-center justify-center font-bold shrink-0">
                <Car className="w-5 h-5 text-stone-200" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                    Vehículo Decodificado en BDD Multiem:
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Compatibilidad Técnica 100%
                  </span>
                </div>
                <h4 className="text-sm sm:text-base font-black text-stone-900 font-serif">
                  {identifiedVehicle.patenteMarca} {identifiedVehicle.patenteModelo} ({identifiedVehicle.patenteAnio})
                </h4>
              </div>
            </div>

            <button
              onClick={() => {
                setIdentifiedVehicle(null);
                setSearchQuery("");
              }}
              className="text-xs text-stone-500 hover:text-stone-900 font-bold px-3 py-1.5 rounded-xl border border-stone-300 hover:bg-stone-100 transition self-start sm:self-auto flex items-center gap-1.5"
            >
              <X className="w-3.5 h-3.5" />
              <span>Quitar Filtro Vehicular</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-white border border-stone-200">
              <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block">
                Patente Chilena:
              </span>
              <strong className="text-stone-900 font-mono text-xs">
                {identifiedVehicle.patente}
              </strong>
            </div>

            <div className="p-2.5 rounded-xl bg-white border border-stone-200">
              <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block">
                Chasis VIN:
              </span>
              <strong className="text-stone-900 font-mono text-xs">
                {identifiedVehicle.patenteChasis}
              </strong>
            </div>

            <div className="p-2.5 rounded-xl bg-white border border-stone-200">
              <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block">
                Motor / Inyección:
              </span>
              <strong className="text-stone-900 text-[11px] truncate block" title={identifiedVehicle.motor}>
                {identifiedVehicle.motor}
              </strong>
            </div>

            <div className="p-2.5 rounded-xl bg-white border border-stone-200">
              <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block">
                Rubros Aplicables:
              </span>
              <strong className="text-stone-900 text-[11px] truncate block">
                {identifiedVehicle.rubros.join(", ")}
              </strong>
            </div>
          </div>
        </div>
      )}

      {/* 5. ACCESOS RÁPIDOS Y PATENTES DE DEMOSTRACIÓN */}
      <div className="space-y-2 pt-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] text-stone-500 font-medium">
          <span className="uppercase tracking-wider text-[10px] font-bold text-stone-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-stone-500" />
            Acceso Rápido • Patentes & Códigos OEM de Demostración:
          </span>
          <span className="text-[10px] text-stone-400">
            Haga clic en cualquier píldora para auto-completar y filtrar:
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {PRESET_VEHICLES.map((v) => {
            const isSelected = identifiedVehicle?.patente === v.patente;
            return (
              <button
                key={v.patente}
                type="button"
                onClick={() => handleSelectQuickVehicle(v)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-stone-900 text-white border-stone-900 shadow-xs"
                    : "bg-[#FBF9F5] hover:bg-stone-100 text-stone-800 border-stone-200/90"
                }`}
              >
                <Car className="w-3 h-3 text-stone-400" />
                <strong className="font-mono">{v.patente}</strong>
                <span className="text-[10px] opacity-75">&bull; {v.patenteModelo.split(" ")[0]} {v.searchKey}</span>
              </button>
            );
          })}

          <div className="h-4 w-px bg-stone-300 mx-1 hidden sm:block" />

          {/* Botones de códigos OEM y categorías clave */}
          <button
            type="button"
            onClick={() => handleSelectQuickOEM("04465-0K260", "Pastillas OEM Hilux")}
            className="px-2.5 py-1.5 rounded-xl text-xs font-mono bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200 transition"
          >
            OEM 04465-0K260
          </button>
          <button
            type="button"
            onClick={() => handleSelectQuickOEM("47550-35280", "Cilindro OEM")}
            className="px-2.5 py-1.5 rounded-xl text-xs font-mono bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200 transition"
          >
            OEM 47550-35280
          </button>
          <button
            type="button"
            onClick={() => handleSelectQuickOEM("11115-0L010", "Culata MLS")}
            className="px-2.5 py-1.5 rounded-xl text-xs font-mono bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200 transition"
          >
            OEM 11115-0L010
          </button>
        </div>
      </div>

      {/* 6. GRILLA DE FILTROS DESPLEGABLES DIMENSIONALES */}
      <div className="pt-3 border-t border-stone-100 space-y-2">
        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-stone-400">
          <span className="flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-stone-500" />
            Filtros Técnicos de Catálogo:
          </span>
          {hasActiveFilters && (
            <span className="text-emerald-700 font-semibold lowercase">
              filtros activos aplicados
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
              Línea / Rubro:
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-900 transition"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
              Subcategoría:
            </label>
            <select
              value={selectedSubcategory}
              onChange={(e) => setSelectedSubcategory(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-900 transition"
            >
              {subcategories.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
              Fabricante Vehicular:
            </label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-900 transition"
            >
              {brandOptions.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
              Año Compatibilidad:
            </label>
            <select
              value={selectedYearRange}
              onChange={(e) => setSelectedYearRange(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-900 transition"
            >
              {yearRanges.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
              Origen de Fábrica:
            </label>
            <select
              value={selectedOrigin}
              onChange={(e) => setSelectedOrigin(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-900 transition"
            >
              {originOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
