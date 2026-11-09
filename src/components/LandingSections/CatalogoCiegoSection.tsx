"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { formatCLP } from "@/lib/utils";
import {
  Lock,
  Unlock,
  CheckCircle2,
  AlertCircle,
  Plus,
  Search,
  SlidersHorizontal,
  ArrowRight,
  Shield,
  Layers
} from "lucide-react";

export const CatalogoCiegoSection: React.FC = () => {
  const { role, setRole, products, addToCart, searchQuery, setSearchQuery } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");

  const categories = [
    "Todos",
    "Frenos y Cilindros",
    "Embragues y Transmisión",
    "Motor y Empaquetaduras",
    "Suspensión y Dirección",
    "Inyección y Filtros",
  ];

  const filteredProducts = products.filter((item) => {
    const matchesCat = selectedCategory === "Todos" || item.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesQuery =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.oem.toLowerCase().includes(q) ||
      item.sku.toLowerCase().includes(q) ||
      item.vehicleCompatibility.some((v) => v.toLowerCase().includes(q));
    return matchesCat && matchesQuery;
  });

  return (
    <section id="vitrina" className="py-20 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/80 text-blue-400 text-xs font-semibold border border-blue-800/60 mb-3">
              <Layers className="w-3.5 h-3.5" />
              Catálogo Ciego B2B &bull; 26.000 SKUs Indexados
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight">
              Vitrina de Productos & Búsqueda OEM
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-2xl">
              Diseñado como portal ciego de captación SEO: protege los márgenes de los talleres mecánicos al ocultar precios a usuarios finales no autorizados.
            </p>
          </div>

          {/* Role Status Banner in Section */}
          <div className="flex items-center gap-3 bg-slate-900 p-3 rounded-xl border border-slate-800">
            <div className="text-right">
              <div className="text-xs font-bold text-white">
                {role === "blind_guest"
                  ? "Modo: Catálogo Ciego (Público)"
                  : "Modo: Mayorista Validado (B2B)"}
              </div>
              <div className="text-[11px] text-slate-400">
                {role === "blind_guest"
                  ? "Precios y stock protegidos"
                  : "Precios netos y stock visible"}
              </div>
            </div>
            <button
              onClick={() => setRole(role === "blind_guest" ? "b2b_client" : "blind_guest")}
              className={`p-2.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                role === "blind_guest"
                  ? "bg-blue-600 hover:bg-blue-500 text-white"
                  : "bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700"
              }`}
            >
              {role === "blind_guest" ? (
                <>
                  <Unlock className="w-4 h-4" />
                  <span>Ver Precios (Simular Login)</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Ocultar Precios</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Category Pills & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:bg-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="w-full sm:w-72 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filtrar por OEM o pieza..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.slice(0, 6).map((item) => (
            <div
              key={item.id}
              className="bg-slate-900/90 rounded-2xl border border-slate-800 hover:border-slate-700 p-5 flex flex-col justify-between transition duration-200 group relative"
            >
              {/* Card Header: Brand & OEM */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                    {item.brand}
                  </span>
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono border border-slate-700">
                    OEM: {item.oem}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition mb-2">
                  {item.title}
                </h3>

                <div className="text-xs text-slate-400 space-y-1 mb-4">
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-500">SKU:</span>
                    <span className="font-mono text-slate-300 font-semibold">{item.sku}</span>
                    <span className="text-slate-600">&bull;</span>
                    <span className="text-slate-500">Origen:</span>
                    <span className="text-slate-300">{item.origin}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 line-clamp-1">
                    <strong className="text-slate-500">Compatibilidad:</strong>{" "}
                    {item.vehicleCompatibility[0]}
                  </div>
                </div>
              </div>

              {/* Pricing & Commercial Logic Area */}
              <div className="pt-4 border-t border-slate-800/80">
                {role === "blind_guest" ? (
                  /* BLIND MODE: Price is protected */
                  <div className="bg-slate-950/70 rounded-xl p-3 border border-slate-800/90 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-amber-400 shrink-0" />
                      <div className="text-[11px] leading-tight">
                        <span className="font-semibold text-slate-300 block">
                          Precio Protegido
                        </span>
                        <span className="text-slate-500 text-[10px]">
                          Solo clientes mayoristas
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setRole("b2b_client")}
                      className="px-2.5 py-1 text-[11px] font-bold text-blue-400 bg-blue-950 hover:bg-blue-900 border border-blue-800 rounded-md transition"
                    >
                      Ver precio &rarr;
                    </button>
                  </div>
                ) : (
                  /* B2B AUTHENTICATED MODE: Price and stock revealed */
                  <div className="space-y-3">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-xs text-slate-400 block">Precio Neto Mayorista:</span>
                        <span className="text-xl font-black text-white">
                          {formatCLP(item.priceNeto)}
                        </span>
                        <span className="text-[10px] text-slate-500 ml-1">
                          + IVA ({formatCLP(Math.round(item.priceNeto * 1.19))} Bruto)
                        </span>
                      </div>

                      <div className="text-right">
                        {item.stock > 0 ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800/50">
                            <CheckCircle2 className="w-3 h-3" />
                            {item.stock} en ZOFRI
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-950 text-amber-400 border border-amber-800/50">
                            <AlertCircle className="w-3 h-3" />
                            Backorder Activo
                          </span>
                        )}
                        <span className="block text-[10px] text-slate-500 mt-0.5">
                          Mínimo: {item.minWholesaleQty} unid.
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => addToCart(item)}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-md ${
                        item.stock > 0
                          ? "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/20"
                          : "bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/20"
                      }`}
                    >
                      <Plus className="w-4 h-4" />
                      <span>
                        {item.stock > 0
                          ? `Agregar ${item.minWholesaleQty} al Pedido`
                          : "Solicitar Proforma Condicionada (Sin Stock)"}
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* View all button */}
        <div className="mt-12 text-center">
          <Link
            href="/catalogo"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm border border-slate-700 shadow-xl transition"
          >
            <span>Ver los 26.000 SKUs en Vista de Pedido Rápido</span>
            <ArrowRight className="w-4 h-4 text-blue-400" />
          </Link>
        </div>
      </div>
    </section>
  );
};
