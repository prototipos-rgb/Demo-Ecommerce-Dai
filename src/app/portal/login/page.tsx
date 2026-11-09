"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { Building2, ShieldCheck, Lock, ArrowRight, UserCheck, EyeOff, Sparkles } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { setRole } = useApp();
  const [rut, setRut] = useState("76.842.190-K");
  const [password, setPassword] = useState("••••••••");

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRole("b2b_client");
    router.push("/catalogo");
  };

  const handleQuickLogin = (roleType: "b2b_client" | "admin_vendor" | "blind_guest") => {
    setRole(roleType);
    if (roleType === "admin_vendor") {
      router.push("/admin");
    } else {
      router.push("/catalogo");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_40%,rgba(37,99,235,0.15),transparent)]" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center text-white font-black text-2xl shadow-xl border border-blue-400/40">
            D
          </div>
        </div>

        <h2 className="text-center text-2xl font-black text-white tracking-tight">
          Portal de Clientes Mayoristas
        </h2>
        <p className="mt-1 text-center text-xs text-slate-400">
          Importadora y Exportadora Daisekai Limitada &bull; ZOFRI
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <div className="bg-slate-900 py-8 px-6 sm:px-10 rounded-2xl border border-slate-800 shadow-2xl space-y-6">
          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                RUT Empresa / Taller Automotriz
              </label>
              <input
                type="text"
                required
                value={rut}
                onChange={(e) => setRut(e.target.value)}
                placeholder="76.xxx.xxx-x"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                Contraseña / Clave de Acceso
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-between text-[11px]">
              <label className="flex items-center gap-1.5 text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded bg-slate-950 border-slate-700 text-blue-600"
                />
                <span>Recordar sesión B2B</span>
              </label>
              <a href="#" className="text-blue-400 hover:underline">
                ¿Olvidaste tu clave?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg transition flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>Ingresar y Desbloquear Precios</span>
            </button>
          </form>

          {/* Quick Demo Credentials for presentation ease */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              Accesos Rápidos para Demostración:
            </span>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => handleQuickLogin("b2b_client")}
                className="w-full text-left p-2.5 rounded-xl bg-slate-950 hover:bg-blue-950/60 border border-slate-800 hover:border-blue-700/60 transition group flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-slate-200 group-hover:text-blue-300 flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Cliente Mayorista (Flotas del Norte)
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Precios netos, stock real y cupo \$45M
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400" />
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin("admin_vendor")}
                className="w-full text-left p-2.5 rounded-xl bg-slate-950 hover:bg-emerald-950/60 border border-slate-800 hover:border-emerald-700/60 transition group flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-slate-200 group-hover:text-emerald-300 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Admin / Vendedor Daisekai
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Consola Drag & Drop ETL Multiem y Scraper
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400" />
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin("blind_guest")}
                className="w-full text-left p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 transition group flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-semibold text-slate-400 group-hover:text-slate-200 flex items-center gap-1.5">
                    <EyeOff className="w-3.5 h-3.5 text-amber-400" />
                    Navegar como Público Ciego
                  </div>
                  <div className="text-[11px] text-slate-500">
                    26.000 SKUs con precios ocultos
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
