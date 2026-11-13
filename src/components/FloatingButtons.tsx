"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { MessageCircle, Bot, X, Sparkles, Search, ArrowRight, ShieldCheck } from "lucide-react";

export const FloatingButtons: React.FC = () => {
  const { role } = useApp();
  const [aiModalOpen, setAiModalOpen] = useState(false);

  // Requisito explícito: Solo visible en el rol de cliente mayorista.
  // Se oculta para Vendedor y Administrador.
  if (role !== "b2b_client") {
    return null;
  }

  return (
    <>
      {/* Botones flotantes en la esquina inferior izquierda */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3 pointer-events-auto">
        {/* 1. Botón Flotante Asistente IA (No funcional con API externa) */}
        <button
          onClick={() => setAiModalOpen(true)}
          className="group flex items-center gap-2.5 bg-stone-900 hover:bg-stone-800 text-white px-4 py-2.5 rounded-full shadow-xl border border-stone-700 hover:border-stone-500 transition-all duration-300 transform hover:scale-105"
          title="Asistente IA Daisekai (Demostración de Interfaz)"
        >
          <div className="relative">
            <Bot className="w-4 h-4 text-cyan-400" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          </div>
          <span className="text-xs font-bold tracking-tight pr-1 hidden sm:inline">
            Asistente IA
          </span>
          <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-bold px-1.5 py-0.5 rounded border border-cyan-400/30">
            DEMO
          </span>
        </button>

        {/* 2. Botón Flotante WhatsApp (100% Funcional) */}
        <a
          href="https://wa.me/56975236397?text=Hola%20Daisekai%2C%20quisiera%20consultar%20por%20repuestos%20automotrices%20mayoristas."
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-3 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
          title="Contactar por WhatsApp a ventas ZOFRI: +56 9 7523 6397"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
          <span className="text-xs font-bold tracking-tight pr-1 hidden sm:inline">
            WhatsApp Ventas
          </span>
        </a>
      </div>

      {/* Modal / Ventana de Demostración del Bot IA (No funcional) */}
      {aiModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center sm:justify-start p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-stone-200 shadow-2xl w-full max-w-sm sm:max-w-md overflow-hidden text-stone-800">
            {/* Cabecera */}
            <div className="bg-stone-900 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-400/40">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold leading-tight font-serif">
                    Bot de Búsqueda IA Daisekai
                  </h4>
                  <p className="text-[10px] text-stone-400 font-mono">
                    Navegación técnica &bull; Tolerancia a fallos OEM/VIN
                  </p>
                </div>
              </div>
              <button
                onClick={() => setAiModalOpen(false)}
                className="text-stone-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cuerpo */}
            <div className="p-5 space-y-4 text-xs">
              <div className="p-3.5 rounded-xl bg-[#F6F4EE] border border-stone-200 text-stone-700 space-y-1">
                <div className="font-bold text-stone-900 flex items-center gap-1.5 text-[11px]">
                  <Sparkles className="w-3.5 h-3.5 text-stone-800" />
                  Módulo de Búsqueda Asistida (Demostración de Interfaz)
                </div>
                <p className="text-[11px] leading-relaxed text-stone-600 font-light">
                  Este agente inteligente permitirá a los talleres consultar repuestos por descripción coloquial, número de chasis (VIN) o códigos cruzados sin navegar menús manuales.
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block font-mono">
                  Ejemplos de consultas que responderá:
                </span>

                <div className="p-2.5 rounded-xl border border-stone-200 bg-[#FBF9F5] text-stone-700 font-mono text-[11px]">
                  &ldquo;¿Tienes cilindros de freno para Toyota Hilux 2014 chasis KUN26?&rdquo;
                </div>

                <div className="p-2.5 rounded-xl border border-stone-200 bg-[#FBF9F5] text-stone-700 font-mono text-[11px]">
                  &ldquo;Buscar equivalencias para el código OEM 04465-0K260&rdquo;
                </div>

                <div className="p-2.5 rounded-xl border border-stone-200 bg-[#FBF9F5] text-stone-700 font-mono text-[11px]">
                  &ldquo;Empaquetadura de culata para motor Hyundai D4HB&rdquo;
                </div>
              </div>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
                <span>* Vista de interfaz &bull; Sin conexión a API externa</span>
                <button
                  onClick={() => setAiModalOpen(false)}
                  className="text-stone-900 hover:underline font-bold"
                >
                  Entendido
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
