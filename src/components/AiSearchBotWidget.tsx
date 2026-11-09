"use client";

import React, { useState } from "react";
import { Sparkles, Bot, X, Search, CheckCircle2, ArrowRight, MessageSquare, ShieldCheck } from "lucide-react";
import { useApp } from "@/context/AppContext";

export const AiSearchBotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeQuery, setActiveQuery] = useState("");
  const { setSearchQuery } = useApp();

  const samplePrompts = [
    {
      label: "Búsqueda por Chasis / VIN",
      query: "04465-0K260",
      description: "Pastillas delanteras Hilux Revo Chasis MR0HA3CD",
    },
    {
      label: "Equivalencia OEM Multimarca",
      query: "30100-4KH0A",
      description: "Kit Embrague reforzado NP300 motor 2.3 dCi",
    },
    {
      label: "Filtro Diésel Common Rail",
      query: "23390-0L050",
      description: "Filtro combustible Toyota Hilux 1KD/2KD",
    },
  ];

  const handleSelectSample = (query: string) => {
    setSearchQuery(query);
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative group flex items-center gap-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-full shadow-2xl hover:shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all duration-300 border border-blue-400/40"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-900 animate-pulse" />
          </div>
          <span className="font-semibold text-xs tracking-wide pr-1 hidden sm:inline">
            Asistente IA Daisekai
          </span>
          <span className="bg-blue-900/80 text-[10px] text-cyan-300 px-1.5 py-0.5 rounded-full font-bold border border-blue-400/30">
            DEMO
          </span>
        </button>
      </div>

      {/* Preview Dialog */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-[380px] sm:w-[420px] max-w-[calc(100vw-2rem)] bg-slate-900 text-white rounded-2xl shadow-2xl border border-blue-500/40 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 px-5 py-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600/30 border border-blue-400/50 flex items-center justify-center text-blue-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                  Bot de Búsqueda IA (24/7)
                </h3>
                <p className="text-[11px] text-slate-400">
                  Tolerancia a erratas &bull; Búsqueda OEM / VIN
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 space-y-4">
            <div className="bg-blue-950/40 border border-blue-800/40 p-3 rounded-xl text-xs text-slate-300 space-y-1.5">
              <div className="font-semibold text-blue-300 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Módulo Enterprise B2B Integral
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Este agente de IA resolverá consultas técnicas complejas de talleres mecánicos y flotas, mapeando códigos cruzados de fabricantes y números de chasis hacia los 26.000 SKUs de Daisekai.
              </p>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Simular consulta frecuente:
              </span>
              <div className="space-y-2">
                {samplePrompts.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectSample(p.query)}
                    className="w-full text-left p-2.5 rounded-lg bg-slate-800/70 hover:bg-blue-900/40 border border-slate-700 hover:border-blue-500/50 transition group flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-semibold text-slate-200 group-hover:text-blue-300 flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
                        {p.label}
                      </div>
                      <div className="text-[11px] text-slate-400">{p.description}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 shrink-0 group-hover:translate-x-0.5 transition" />
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
              <span>* Demo visual - Integración sin API externa</span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-blue-400 hover:underline font-medium"
              >
                Cerrar vista
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
