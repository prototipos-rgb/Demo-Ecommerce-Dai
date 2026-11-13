"use client";

import React from "react";
import { FileSpreadsheet, Layers, Clock, AlertCircle } from "lucide-react";

export const VendedorInventarioSubido: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Cabecera del módulo */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl border border-stone-200 p-6 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-semibold uppercase tracking-wider mb-2">
            <Layers className="w-3.5 h-3.5 text-stone-800" />
            <span>Inventario Maestro Kardex Multiem</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif">
            Inventario Subido Kardex (Normalizado)
          </h3>
          <p className="text-xs text-stone-500 font-light">
            Vista oficial para la visualización del archivo de inventario normalizado tras la ingestión Excel 2007.
          </p>
        </div>

        <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold font-mono">
          Estructura Oficial en Espera
        </span>
      </div>

      {/* Vista creada pero vacía como se solicitó explícitamente */}
      <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center shadow-sm space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-[#F6F4EE] border border-stone-200 flex items-center justify-center mx-auto text-stone-400">
          <FileSpreadsheet className="w-8 h-8" />
        </div>

        <div className="max-w-md mx-auto space-y-2">
          <h4 className="text-base font-bold text-stone-900 font-serif">
            Vista de Inventario Subido Creada (Sin Registros)
          </h4>
          <p className="text-xs text-stone-500 leading-relaxed font-light">
            Esta sección se encuentra habilitada y vinculada a la arquitectura del sistema. Desplegará la totalidad de las existencias una vez recibido el formato oficial de columnas y campos que entregará la empresa.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-600 text-[11px] font-mono">
          <Clock className="w-3.5 h-3.5 text-stone-400" />
          <span>Pipeline de lectura preparado para Excel 2007 (.xlsx/.xls)</span>
        </div>
      </div>
    </div>
  );
};
