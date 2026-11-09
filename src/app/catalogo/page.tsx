"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { formatCLP } from "@/lib/utils";
import { Product } from "@/data/mockProducts";
import {
  Search,
  Filter,
  SlidersHorizontal,
  Grid,
  List,
  Lock,
  Plus,
  CheckCircle2,
  AlertCircle,
  Truck,
  Building,
  Info,
  Car
} from "lucide-react";

export default function CatalogoPage() {
  const { role, setRole, products, addToCart, searchQuery, setSearchQuery } = useApp();
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [selectedOrigin, setSelectedOrigin] = useState<string>("Todos");

  const categories = [
    "Todos",
    "Frenos y Cilindros",
    "Embragues y Transmisión",
    "Motor y Empaquetaduras",
    "Suspensión y Dirección",
    "Inyección y Filtros",
    "Eléctrico e Ignición",
  ];

  const origins = ["Todos", "Japón", "Corea del Sur", "Tailandia", "Taiwán"];

  const filtered = products.filter((p) => {
    const matchesCat = selectedCategory === "Todos" || p.category === selectedCategory;
    const matchesOrigin = selectedOrigin === "Todos" || p.origin === selectedOrigin;
    const matchesStock = !onlyInStock || p.stock > 0;

    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCat && matchesOrigin && matchesStock;

    const matchesQuery =
      p.title.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.oem.toLowerCase().includes(q) ||
      p.oemCrossReference.some((x) => x.toLowerCase().includes(q)) ||
      p.vehicleCompatibility.some((v) => v.toLowerCase().includes(q)) ||
      p.vinPrefix.some((v) => v.toLowerCase().includes(q));

    return matchesCat && matchesOrigin && matchesStock && matchesQuery;
  });

  return (
    <div className="bg-slate-950 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-blue-400 font-semibold mb-2">
              <span>Recinto Amurallado ZOFRI</span>
              <span>&bull;</span>
              <span>Galpones 7 y 8</span>
              <span>&bull;</span>
              <span className="text-cyan-400">Rotación ~8.500 SKUs Diarios</span>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">
              Catálogo Mayorista de Repuestos
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Búsqueda de piezas por código OEM, equivalencia, número de chasis (VIN) y compatibilidad vehicular.
            </p>
          </div>

          {/* Mode Indicator & Toggles */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-slate-900 border border-slate-800 p-1 rounded-xl flex items-center">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                  viewMode === "grid"
                    ? "bg-blue-600 text-white shadow"
                    : "text-slate-400 hover:text-white"
                }`}
                title="Vista Cuadrícula con Fotografías Scrapeadas"
              >
                <Grid className="w-4 h-4" />
                <span className="hidden sm:inline">Tarjetas</span>
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                  viewMode === "table"
                    ? "bg-blue-600 text-white shadow"
                    : "text-slate-400 hover:text-white"
                }`}
                title="Vista Tabla de Pedido Rápido para Mayoristas"
              >
                <List className="w-4 h-4" />
                <span className="hidden sm:inline">Pedido Rápido (Tabla)</span>
              </button>
            </div>

            {role === "blind_guest" && (
              <button
                onClick={() => setRole("b2b_client")}
                className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg transition flex items-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5 text-amber-300" />
                <span>Simular Acceso Mayorista</span>
              </button>
            )}
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por código OEM (ej. 04465-0K260), Chasis VIN (ej. MR0HA3CD), SKU..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            </div>

            {/* Origin Dropdown */}
            <div className="md:col-span-3">
              <select
                value={selectedOrigin}
                onChange={(e) => setSelectedOrigin(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {origins.map((orig) => (
                  <option key={orig} value={orig}>
                    Origen: {orig}
                  </option>
                ))}
              </select>
            </div>

            {/* In Stock Only Checkbox */}
            <div className="md:col-span-3 flex items-center justify-end">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300 select-none">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-700 text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <span>Solo piezas con Stock ZOFRI</span>
              </label>
            </div>
          </div>

          {/* Category Badges */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 scrollbar-none border-t border-slate-800/80">
            <span className="text-slate-500 text-xs font-semibold mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Rubro:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white font-semibold"
                    : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span>
            Mostrando <strong>{filtered.length}</strong> repuestos automotrices encontrados
          </span>
          {role === "blind_guest" && (
            <span className="text-amber-400 font-medium flex items-center gap-1">
              <Lock className="w-3.5 h-3.5" /> Modo Vitrina Ciega: Precios Ocultos
            </span>
          )}
        </div>

        {/* VIEW 1: Grid Cards */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900 rounded-2xl border border-slate-800 hover:border-slate-700 overflow-hidden flex flex-col justify-between transition group"
              >
                {/* Photo & Scraper Tag */}
                <div className="relative h-48 bg-slate-950 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 rounded bg-slate-950/80 backdrop-blur-md text-cyan-300 text-[10px] font-bold border border-cyan-800/60">
                      {item.brand}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-950/80 backdrop-blur-md text-slate-300 text-[10px] font-mono border border-slate-700">
                      OEM: {item.oem}
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3">
                    <span className="px-2 py-0.5 rounded bg-blue-950/90 text-blue-300 text-[10px] font-medium border border-blue-800">
                      Scraper Auto-ID
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition">
                      {item.title}
                    </h3>

                    <div className="mt-2 space-y-1 text-xs text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-500">SKU:</span>
                        <span className="font-mono text-slate-300">{item.sku}</span>
                        <span className="text-slate-600">&bull;</span>
                        <span className="text-slate-500">Origen:</span>
                        <span className="text-slate-300">{item.origin}</span>
                      </div>

                      <div className="text-[11px] text-slate-400 pt-1">
                        <strong className="text-slate-500 flex items-center gap-1">
                          <Car className="w-3 h-3 text-blue-400" /> Compatibilidad:
                        </strong>
                        <ul className="list-disc list-inside mt-0.5 space-y-0.5 text-slate-300">
                          {item.vehicleCompatibility.slice(0, 2).map((vc, i) => (
                            <li key={i} className="truncate">
                              {vc}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {item.vinPrefix.length > 0 && (
                        <div className="text-[10px] text-slate-500 font-mono">
                          Prefijo Chasis/VIN: {item.vinPrefix.join(", ")}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Pricing / CTA */}
                  <div className="pt-3 border-t border-slate-800">
                    {role === "blind_guest" ? (
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Lock className="w-4 h-4 text-amber-400" />
                          <div className="text-[11px] leading-tight">
                            <span className="font-bold text-slate-300 block">
                              Precio Oculto
                            </span>
                            <span className="text-[10px] text-slate-500">
                              Solo talleres autorizados
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => setRole("b2b_client")}
                          className="px-2.5 py-1 text-[11px] font-bold text-blue-400 bg-blue-950 border border-blue-800 rounded-lg hover:bg-blue-900 transition"
                        >
                          Ver precio &rarr;
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex items-baseline justify-between">
                          <div>
                            <span className="text-[10px] text-slate-500 block">Neto Mayorista:</span>
                            <span className="text-lg font-black text-white">
                              {formatCLP(item.priceNeto)}
                            </span>
                          </div>

                          <div className="text-right">
                            {item.stock > 0 ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800">
                                <CheckCircle2 className="w-3 h-3" />
                                {item.stock} en Zofri
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-950 text-amber-400 border border-amber-800">
                                <AlertCircle className="w-3 h-3" />
                                Proforma Backorder
                              </span>
                            )}
                          </div>
                        </div>

                        <button
                          onClick={() => addToCart(item)}
                          className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow ${
                            item.stock > 0
                              ? "bg-blue-600 hover:bg-blue-500 text-white"
                              : "bg-amber-600 hover:bg-amber-500 text-white"
                          }`}
                        >
                          <Plus className="w-4 h-4" />
                          <span>
                            {item.stock > 0
                              ? `Agregar ${item.minWholesaleQty} al Pedido`
                              : "Pedir Proforma Condicionada"}
                          </span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* VIEW 2: Dense Table View (Refax / Alsacia style for fast high-volume B2B orders) */
          <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-4">SKU / OEM</th>
                    <th className="py-3 px-4">Descripción del Repuesto</th>
                    <th className="py-3 px-4">Marca / Origen</th>
                    <th className="py-3 px-4">Aplicación Vehicular</th>
                    <th className="py-3 px-4 text-center">Stock ZOFRI</th>
                    <th className="py-3 px-4 text-right">Precio Neto</th>
                    <th className="py-3 px-4 text-center">Acción B2B</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {filtered.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/50 transition">
                      <td className="py-3 px-4">
                        <div className="font-mono font-bold text-white">{item.sku}</div>
                        <div className="font-mono text-[11px] text-cyan-400">
                          OEM: {item.oem}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-200">{item.title}</div>
                        <div className="text-[10px] text-slate-500">{item.category}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-slate-300 font-medium">{item.brand}</div>
                        <div className="text-[10px] text-slate-500">{item.origin}</div>
                      </td>
                      <td className="py-3 px-4 max-w-xs">
                        <div className="truncate text-slate-400">
                          {item.vehicleCompatibility[0]}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        {role === "blind_guest" ? (
                          <span className="text-slate-500 text-[10px]">Protegido</span>
                        ) : item.stock > 0 ? (
                          <span className="inline-block px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-semibold text-[10px]">
                            {item.stock} un.
                          </span>
                        ) : (
                          <span className="inline-block px-2 py-0.5 rounded bg-amber-950 text-amber-400 font-semibold text-[10px]">
                            Backorder
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        {role === "blind_guest" ? (
                          <span className="text-amber-400 text-[11px] flex items-center justify-end gap-1">
                            <Lock className="w-3 h-3" /> Solo Mayorista
                          </span>
                        ) : (
                          <div>
                            <span className="font-bold text-white text-sm">
                              {formatCLP(item.priceNeto)}
                            </span>
                            <span className="block text-[10px] text-slate-500">
                              Mín. {item.minWholesaleQty}
                            </span>
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {role === "blind_guest" ? (
                          <button
                            onClick={() => setRole("b2b_client")}
                            className="px-2.5 py-1 text-[11px] bg-slate-800 hover:bg-slate-700 text-blue-400 rounded-md transition"
                          >
                            Ver &rarr;
                          </button>
                        ) : (
                          <button
                            onClick={() => addToCart(item)}
                            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-xs shadow flex items-center gap-1 mx-auto"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Pedir</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
