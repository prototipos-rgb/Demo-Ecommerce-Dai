"use client";

import React from "react";
import { useApp, UserRole } from "@/context/AppContext";
import { ShieldCheck, UserCheck, EyeOff, FileSpreadsheet, ShoppingBag, Sparkles, Building2 } from "lucide-react";
import Link from "next/link";

export const DemoControlBar: React.FC = () => {
  const { role, setRole, cart, orderSummary } = useApp();

  return (
    <div className="bg-slate-950 text-white border-b border-blue-900/50 px-4 py-2 text-xs sticky top-0 z-50 backdrop-blur-md bg-opacity-95 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Brand Demo Tag */}
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-600/20 text-blue-400 font-semibold border border-blue-500/30">
            <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            DEMO OFICIAL B2B
          </span>
          <span className="hidden md:inline text-slate-400 font-medium">
            Daisekai Automotriz &bull; Infraestructura Aerys IT
          </span>
        </div>

        {/* Role Switcher */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
          <span className="text-[11px] font-semibold text-slate-400 px-2 uppercase tracking-wider hidden sm:inline">
            Modo Demo:
          </span>

          <button
            onClick={() => setRole("blind_guest")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all font-medium ${
              role === "blind_guest"
                ? "bg-slate-700 text-white shadow-sm ring-1 ring-slate-500"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
            }`}
            title="Vista pública de captación: Precios y stock ocultos"
          >
            <EyeOff className="w-3.5 h-3.5 text-amber-400" />
            <span>1. Catálogo Ciego (Público)</span>
          </button>

          <button
            onClick={() => setRole("b2b_client")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all font-medium ${
              role === "b2b_client"
                ? "bg-blue-600 text-white shadow-sm ring-1 ring-blue-400"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
            }`}
            title="Vista de cliente mayorista autenticado con RUT Empresa validado"
          >
            <Building2 className="w-3.5 h-3.5 text-cyan-300" />
            <span>2. Mayorista B2B (Precios/Stock)</span>
          </button>

          <button
            onClick={() => setRole("admin_vendor")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all font-medium ${
              role === "admin_vendor"
                ? "bg-emerald-600 text-white shadow-sm ring-1 ring-emerald-400"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
            }`}
            title="Panel administrativo: Carga de Kardex Excel Multiem y Scraper"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-300" />
            <span>3. Admin (ETL Kardex Excel)</span>
          </button>
        </div>

        {/* Quick Links & Shortcuts */}
        <div className="flex items-center gap-2">
          <Link
            href="/admin"
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
          >
            <FileSpreadsheet className="w-3 h-3 text-emerald-400" />
            <span>Consola ETL Multiem</span>
          </Link>

          <Link
            href="/checkout"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white font-medium shadow transition"
          >
            <ShoppingBag className="w-3 h-3" />
            <span>Cotización / Carrito</span>
            <span className="bg-blue-950 text-blue-200 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
              {cart.reduce((a, b) => a + b.quantity, 0)}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
