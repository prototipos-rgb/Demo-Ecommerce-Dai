"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { ArrowRight, ShieldCheck, Container, FileSpreadsheet, Lock, Zap, Search } from "lucide-react";

export const HeroSection: React.FC = () => {
  const { role, setRole, setSearchQuery } = useApp();

  return (
    <section id="inicio" className="relative overflow-hidden bg-slate-950 pt-12 pb-20 border-b border-slate-800">
      {/* Background glow and subtle automotive grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.25),rgba(255,255,255,0))]" />
      <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_70%_50%,rgba(6,182,212,0.1),transparent)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-900/60 text-blue-300 text-xs font-semibold border border-blue-700/60">
            <Container className="w-3.5 h-3.5 text-cyan-400" />
            Recinto Amurallado ZOFRI &bull; Iquique, Chile
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 text-slate-300 text-xs font-medium border border-slate-700">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            Empleado Digital 24/7 &bull; Headless B2B
          </span>
        </div>

        {/* Hero Title & Value Proposition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
              Infraestructura Mayorista de{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400">
                Repuestos Automotrices
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              <strong>Importadora y Exportadora Daisekai Limitada</strong> (Osakansai Group). 
              Conexión directa desde contenedores marítimos en la <strong>Zona Franca de Iquique</strong> para abastecer talleres mecánicos, flotas y casas de repuestos en Chile y Sudamérica.
            </p>

            {/* Quick search input */}
            <div className="p-2 bg-slate-900/90 rounded-2xl border border-slate-700 shadow-xl max-w-xl">
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
                <input
                  type="text"
                  placeholder="Probar búsqueda: 04465-0K260, Hilux, NP300, D4HB..."
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none py-2"
                />
                <Link
                  href="/catalogo"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition shrink-0 flex items-center gap-1 shadow-lg"
                >
                  Buscar <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/catalogo"
                className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-600/30 transition flex items-center gap-2"
              >
                <span>Explorar Catálogo Ciego (26k SKUs)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {role === "blind_guest" ? (
                <button
                  onClick={() => setRole("b2b_client")}
                  className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition flex items-center gap-2 group"
                >
                  <Lock className="w-4 h-4 text-amber-400 group-hover:text-amber-300" />
                  <span>Simular Acceso Taller (Ver Precios)</span>
                </button>
              ) : (
                <Link
                  href="/checkout"
                  className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-lg transition flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Ir a Carrito Masivo / Proforma</span>
                </Link>
              )}
            </div>

            {/* Trust points */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-400 border-t border-slate-800/80">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>Precios protegidos con RUT Empresa</span>
              </div>
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                <span>Sincronización Kardex Multiem</span>
              </div>
              <div className="flex items-center gap-2">
                <Container className="w-4 h-4 text-cyan-400" />
                <span>Despacho Starken / BlueExpress</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Metrics Card / Live Widget */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 p-6 border border-slate-800 shadow-2xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-bold text-slate-200 tracking-wider uppercase">
                    Centro de Mando Operativo
                  </span>
                </div>
                <span className="text-[11px] text-blue-400 font-medium bg-blue-950 px-2 py-0.5 rounded border border-blue-900">
                  ZOFRI En Vivo
                </span>
              </div>

              {/* Grid Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <div className="text-2xl sm:text-3xl font-black text-white">~26.000</div>
                  <div className="text-xs text-slate-400 font-medium mt-1">
                    SKUs en Catálogo Automotriz
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <div className="text-2xl sm:text-3xl font-black text-cyan-400">~8.500</div>
                  <div className="text-xs text-slate-400 font-medium mt-1">
                    SKUs en Rotación Diaria Activa
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <div className="text-2xl sm:text-3xl font-black text-amber-400">G-7 y G-8</div>
                  <div className="text-xs text-slate-400 font-medium mt-1">
                    Galpones Mzna 11 Zofri
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <div className="text-2xl sm:text-3xl font-black text-emerald-400">&gt; 20M CLP</div>
                  <div className="text-xs text-slate-400 font-medium mt-1">
                    Descuento Escalonado Volumen
                  </div>
                </div>
              </div>

              {/* Status Simulation */}
              <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-800/40 text-xs space-y-2">
                <div className="flex items-center justify-between text-blue-300 font-semibold">
                  <span>Pipeline ETL Multiem</span>
                  <span className="text-emerald-400 font-mono">100% Sincronizado</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full w-[96%]" />
                </div>
                <div className="text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Última lectura: 08:30 AM</span>
                  <Link href="/admin" className="text-cyan-400 hover:underline">
                    Ver consola &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
