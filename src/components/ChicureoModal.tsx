"use client";

import React, { useState, useEffect } from "react";
import { Product } from "@/data/mockProducts";
import { formatCLP } from "@/lib/utils";
import { useApp } from "@/context/AppContext";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Image as ImageIcon
} from "lucide-react";

interface ChicureoModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (p: Product, qty: number) => void;
}

export const ChicureoModal: React.FC<ChicureoModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const { role, clientApprovalStatus } = useApp();
  const [selectedQty, setSelectedQty] = useState<number>(1);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (product) {
      setSelectedQty(product.minWholesaleQty || 1);
    }
  }, [product]);

  if (!product) return null;

  const isOutOfStock = product.stock <= 0;
  const isClientUnapproved = role === "b2b_client" && clientApprovalStatus === "sin_aprobar";

  const handleAdd = () => {
    onAddToCart(product, selectedQty);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#FBF9F5] rounded-3xl border border-stone-200 max-w-5xl w-full p-6 sm:p-10 shadow-2xl space-y-6 relative my-8">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white border border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-100 flex items-center justify-center transition shadow-xs z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Encabezado Estilo Chicureo 200 */}
        <div className="text-center max-w-2xl mx-auto space-y-1.5 pt-2">
          <h2 className="text-2xl sm:text-4xl font-normal text-stone-900 tracking-tight font-serif">
            {product.title}
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 font-light">
            Especificación técnica, tolerancias y aplicación para tu flota a medida.
          </p>
        </div>

        {/* Contenedor Principal: Estilo Chicureo 200 (Foto + Ficha 6 Cajas) */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* LADO IZQUIERDO: VISUALIZADOR CON "ESPACIO PARA FOTO OEM" Y BADGES */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative rounded-2xl bg-[#F6F4EE] border border-stone-200/90 aspect-[4/3] flex flex-col items-center justify-center overflow-hidden p-6 group">
              {/* Badges superiores estilo Chicureo 200 */}
              <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-md bg-white/95 text-stone-800 text-xs font-bold shadow-xs border border-stone-200 font-mono">
                  OEM: {product.oem}
                </span>

                {!isClientUnapproved && (
                  <span className="px-3 py-1 rounded-md bg-stone-900 text-white text-xs font-semibold shadow-xs">
                    Desde {formatCLP(product.priceNeto)} NETO
                  </span>
                )}
              </div>

              {/* Botones de carrusel simulados */}
              <button
                onClick={() => setActiveSlide((prev) => (prev > 0 ? prev - 1 : 2))}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-stone-900/30 hover:bg-stone-900/60 text-white flex items-center justify-center transition z-10"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveSlide((prev) => (prev < 2 ? prev + 1 : 0))}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-stone-900/30 hover:bg-stone-900/60 text-white flex items-center justify-center transition z-10"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Espacio para Foto OEM Estandarizado (Sin fotos de vehículos ni repuestos) */}
              <div className="text-center space-y-3">
                <div className="w-24 h-24 rounded-2xl bg-white/80 border border-stone-200 flex items-center justify-center mx-auto shadow-sm text-stone-400">
                  <ImageIcon className="w-10 h-10" />
                </div>
                <div>
                  <div className="text-sm font-bold uppercase tracking-widest text-stone-700 font-mono">
                    ESPACIO PARA FOTO OEM
                  </div>
                  <div className="text-[11px] text-stone-400 font-mono mt-0.5">
                    SKU: {product.sku} &bull; ESPECIFICACIÓN FÁBRICA OSAKANSAI
                  </div>
                </div>
              </div>

              {/* Indicadores de puntos carrusel estilo Chicureo 200 */}
              <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-1.5 z-10">
                {[0, 1, 2, 3, 4].map((dot) => (
                  <span
                    key={dot}
                    className={`h-1.5 rounded-full transition-all ${
                      dot === activeSlide
                        ? "w-6 bg-stone-800"
                        : "w-1.5 bg-stone-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* LADO DERECHO: 6 CAJAS DE ESPECIFICACIONES (IDÉNTICO A MOD JOURNEY) */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <h3 className="text-lg font-bold text-stone-900 leading-snug">
                Distribución técnica del repuesto
              </h3>
              <p className="text-xs text-stone-600 mt-1.5 leading-relaxed font-light">
                Fabricación de alta durabilidad para flotas comerciales y faenas continuas. Homologación directa y compatibilidad probada con <strong>{product.vehicleCompatibility[0]}</strong>.
              </p>
            </div>

            {/* 6 CAJAS DE METADATOS TÉCNICOS (GRID 2x3 o 3x2) */}
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 rounded-2xl bg-[#F6F4EE] border border-stone-200/80 space-y-0.5">
                <div className="text-base font-black text-stone-900 font-mono">
                  {product.weightKg} kg
                </div>
                <div className="text-[10px] text-stone-500 uppercase tracking-wider font-medium">
                  Peso Unitario
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#F6F4EE] border border-stone-200/80 space-y-0.5">
                <div className="text-base font-black text-stone-900 font-mono">
                  {product.minWholesaleQty} un.
                </div>
                <div className="text-[10px] text-stone-500 uppercase tracking-wider font-medium">
                  Mínimo Mayorista
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#F6F4EE] border border-stone-200/80 space-y-0.5">
                <div className="text-base font-black text-stone-900 font-mono">
                  {isOutOfStock ? (
                    <span className="text-amber-700 text-xs font-bold uppercase">En Espera</span>
                  ) : (
                    <span>{product.stock} un.</span>
                  )}
                </div>
                <div className="text-[10px] text-stone-500 uppercase tracking-wider font-medium">
                  Disponibilidad
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#F6F4EE] border border-stone-200/80 space-y-0.5">
                <div className="text-sm font-black text-stone-900">
                  {product.origin}
                </div>
                <div className="text-[10px] text-stone-500 uppercase tracking-wider font-medium">
                  Procedencia
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#F6F4EE] border border-stone-200/80 space-y-0.5">
                <div className="text-xs font-black text-stone-900 truncate px-1">
                  {product.brand.split(" ")[0]}
                </div>
                <div className="text-[10px] text-stone-500 uppercase tracking-wider font-medium">
                  Línea de Marca
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#F6F4EE] border border-stone-200/80 space-y-0.5">
                <div className="text-xs font-black text-stone-900 truncate px-1">
                  {product.category.split(" ")[0]}
                </div>
                <div className="text-[10px] text-stone-500 uppercase tracking-wider font-medium">
                  Categoría
                </div>
              </div>
            </div>

            {/* Aviso si está sin stock: Budget de espera / Congelado */}
            {isOutOfStock && (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="text-[11px] leading-snug">
                  <strong>Ítem en Espera de Stock:</strong> Si se agrega al pedido, se congelará sin cobro inmediato hasta verificación física en bodega.
                </span>
              </div>
            )}

            {/* Fila de Acciones: Selector de Cantidad Mayorista + Botón Cotizar */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stone-200/80">
              {/* Selector de Cantidad (Reemplaza 'Ver Ficha Técnica' para definir la cantidad antes de agregar al carrito) */}
              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <span className="text-xs font-bold text-stone-700 uppercase tracking-wider font-mono">
                  Cantidad:
                </span>
                <div className="flex items-center rounded-full border border-stone-300 bg-[#F6F4EE] p-1 shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setSelectedQty((prev) => Math.max(product.minWholesaleQty || 1, prev - 1))}
                    className="w-7 h-7 rounded-full bg-white hover:bg-stone-200 text-stone-700 font-bold text-sm flex items-center justify-center transition shadow-xs"
                    title="Restar 1 unidad"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min={product.minWholesaleQty || 1}
                    value={selectedQty}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 1;
                      setSelectedQty(Math.max(1, val));
                    }}
                    className="w-14 text-center font-mono font-bold text-xs bg-transparent text-stone-900 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setSelectedQty((prev) => prev + 1)}
                    className="w-7 h-7 rounded-full bg-white hover:bg-stone-200 text-stone-700 font-bold text-sm flex items-center justify-center transition shadow-xs"
                    title="Sumar 1 unidad"
                  >
                    +
                  </button>
                </div>
                <span className="text-[10px] text-stone-400 font-mono">
                  (Mín. {product.minWholesaleQty || 1} un.)
                </span>
              </div>

              {isClientUnapproved ? (
                <button
                  disabled
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-stone-300 text-stone-500 text-xs font-bold cursor-not-allowed"
                >
                  Cuenta en Evaluación
                </button>
              ) : (
                <button
                  onClick={handleAdd}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold shadow-md transition flex items-center justify-center gap-2 group"
                >
                  <span>
                    {isOutOfStock
                      ? `Agregar ${selectedQty} un. a Espera`
                      : `Cotizar ${selectedQty} un. al Carrito`}
                  </span>
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition">
                    <ArrowRight className="w-3 h-3 text-white" />
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
