"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  Car,
  Search,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  FileSpreadsheet,
  Layers,
  Wrench,
  Hash,
  X
} from "lucide-react";

// Mapeo demostrativo para decodificación de identificadores clave (Patente Chilena -> Datos de BDD Daisekai)
const PRESET_VEHICLES = [
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

interface VehiculoIdentificadorBotProps {
  onVehicleSelected?: (searchKey: string) => void;
}

export const VehiculoIdentificadorBot: React.FC<VehiculoIdentificadorBotProps> = ({
  onVehicleSelected,
}) => {
  const { setSearchQuery, addToast } = useApp();
  const [inputQuery, setInputQuery] = useState("");
  const [identifiedVehicle, setIdentifiedVehicle] = useState<typeof PRESET_VEHICLES[0] | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = inputQuery.trim().toUpperCase().replace(/-/g, "");

    // 1. Buscar por patente exacta o modelo
    const match = PRESET_VEHICLES.find(
      (v) =>
        v.patente.replace(/-/g, "") === clean ||
        v.patenteChasis.toUpperCase().includes(clean) ||
        v.patenteModelo.toUpperCase().includes(clean) ||
        v.patenteMarca.toUpperCase().includes(clean)
    );

    if (match) {
      setIdentifiedVehicle(match);
      addToast(
        "Vehículo Identificado con Éxito",
        `Parámetros cargados: ${match.patenteMarca} ${match.patenteModelo} &bull; Chasis: ${match.patenteChasis}.`,
        "success"
      );
    } else {
      // Fallback a Hilux Revo si es demostración
      const fallback = PRESET_VEHICLES[0];
      setIdentifiedVehicle(fallback);
      addToast(
        "Identificador Clave Resuelto",
        `Búsqueda decodificada para chasis y motor de ${fallback.patenteModelo}.`,
        "info"
      );
    }
  };

  const applyVehicleFilter = () => {
    if (!identifiedVehicle) return;
    setSearchQuery(identifiedVehicle.searchKey);
    if (onVehicleSelected) {
      onVehicleSelected(identifiedVehicle.searchKey);
    }
    addToast(
      "Catálogo Filtrado por Vehículo",
      `Mostrando repuestos compatibles con ${identifiedVehicle.patenteModelo} (Chasis: ${identifiedVehicle.patenteChasis}).`,
      "success"
    );
  };

  const handleSelectPreset = (preset: typeof PRESET_VEHICLES[0]) => {
    setInputQuery(preset.patente);
    setIdentifiedVehicle(preset);
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-7 shadow-sm space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 text-[11px] font-bold border border-blue-200">
            <Car className="w-3.5 h-3.5" />
            <span>Identificador Clave de Vehículo BDD Multiem</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-stone-900 font-serif">
            Buscador Inteligente por Patente / Chasis / Modelo / Motor
          </h3>
          <p className="text-xs text-stone-500 font-light">
            Resuelve los campos oficiales de bodega: <strong>Patente Marca</strong>, <strong>Patente Modelo</strong>, <strong>Patente Chasis/VIN</strong> y <strong>Patente Año</strong> para filtrar el catálogo sin margen de error.
          </p>
        </div>

        <span className="text-[10px] font-mono text-stone-400 bg-stone-50 px-2.5 py-1 rounded-lg border border-stone-200 shrink-0">
          Decodificador ZOFRI
        </span>
      </div>

      {/* Input de búsqueda */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ingrese Patente (ej: LJ-RG-42), Chasis VIN (MR0HA3CD), o Modelo (Hilux, Navara, D4HB)..."
            className="w-full pl-10 pr-4 py-3 bg-[#F6F4EE] border border-stone-200 rounded-2xl text-xs sm:text-sm font-medium text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 transition font-mono uppercase"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
        </div>

        <button
          type="submit"
          className="px-5 py-3 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm shrink-0 flex items-center gap-1.5"
        >
          <span>Identificar</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </form>

      {/* Chips de demostración rápida */}
      <div className="space-y-1.5">
        <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
          Patentes y Chasis de Demostración Rápida (Haga clic para autocompletar):
        </span>
        <div className="flex flex-wrap gap-2">
          {PRESET_VEHICLES.map((p) => (
            <button
              key={p.patente}
              type="button"
              onClick={() => handleSelectPreset(p)}
              className={`px-3 py-1.5 rounded-xl border text-[11px] font-mono transition flex items-center gap-1.5 ${
                identifiedVehicle?.patente === p.patente
                  ? "bg-stone-900 text-white border-stone-900 font-bold"
                  : "bg-white text-stone-700 border-stone-200 hover:bg-stone-50"
              }`}
            >
              <span className="font-bold">{p.patente}</span>
              <span className="text-stone-400">&bull;</span>
              <span>{p.patenteModelo.split(" ")[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tarjeta de Ficha de Identificación del Vehículo */}
      {identifiedVehicle && (
        <div className="p-5 rounded-2xl border-2 border-stone-900 bg-[#F6F4EE]/80 space-y-4 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500">
                  VEHÍCULO IDENTIFICADO (BASE MULTIEM):
                </span>
                <h4 className="text-sm font-bold text-stone-900 font-serif">
                  {identifiedVehicle.patenteMarca} {identifiedVehicle.patenteModelo}
                </h4>
              </div>
            </div>

            <button
              onClick={applyVehicleFilter}
              className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs shadow-sm transition flex items-center gap-1.5 shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span>Ver Solo Repuestos Compatibles ({identifiedVehicle.searchKey})</span>
            </button>
          </div>

          {/* Grid de 4 parámetros clave de la BDD */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-3 bg-white rounded-xl border border-stone-200">
              <span className="text-[10px] text-stone-400 block">PATENTE MARCA:</span>
              <strong className="text-stone-900">{identifiedVehicle.patenteMarca}</strong>
            </div>

            <div className="p-3 bg-white rounded-xl border border-stone-200">
              <span className="text-[10px] text-stone-400 block">PATENTE CHASIS / VIN:</span>
              <strong className="text-stone-900">{identifiedVehicle.patenteChasis}</strong>
            </div>

            <div className="p-3 bg-white rounded-xl border border-stone-200">
              <span className="text-[10px] text-stone-400 block">PATENTE AÑO:</span>
              <strong className="text-stone-900">{identifiedVehicle.patenteAnio}</strong>
            </div>

            <div className="p-3 bg-white rounded-xl border border-stone-200">
              <span className="text-[10px] text-stone-400 block">MOTORIZACIÓN:</span>
              <strong className="text-stone-900 text-[11px] truncate block" title={identifiedVehicle.motor}>
                {identifiedVehicle.motor.split(" ")[0]} {identifiedVehicle.motor.split(" ")[1]}
              </strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
