"use client";

import React, { useState } from "react";
import { Product } from "@/data/mockProducts";
import { useApp } from "@/context/AppContext";
import { formatCLP } from "@/lib/utils";
import { Edit2, X, Save, Layers, Package, Tag, Building } from "lucide-react";

interface EditProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export const EditProductModal: React.FC<EditProductModalProps> = ({ product, onClose }) => {
  const { updateProduct } = useApp();

  const [priceNeto, setPriceNeto] = useState<number>(product?.priceNeto || 0);
  const [stock, setStock] = useState<number>(product?.stock || 0);
  const [disponiblePorLlegar, setDisponiblePorLlegar] = useState<number>(
    product?.disponiblePorLlegar || 0
  );
  const [title, setTitle] = useState<string>(product?.title || "");

  if (!product) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProduct(product.id, {
      priceNeto,
      stock,
      disponiblePorLlegar,
      title,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-stone-200 max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-5 text-xs text-stone-800">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <Edit2 className="w-4 h-4 text-stone-700" />
            <div>
              <h4 className="text-base font-bold text-stone-900 font-serif">
                Edición Rápida de SKU desde Panel
              </h4>
              <p className="text-[11px] text-stone-500 font-mono">
                SKU: {product.sku} &bull; OEM: {product.oem}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-stone-100 flex items-center justify-center text-stone-400 hover:text-stone-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-stone-600 mb-1">
              Descripción Comercial del Repuesto:
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#F6F4EE] border border-stone-200 rounded-xl text-stone-900 font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-stone-600 mb-1">
                Precio Venta Neto (CLP):
              </label>
              <input
                type="number"
                min={100}
                required
                value={priceNeto}
                onChange={(e) => setPriceNeto(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-[#F6F4EE] border border-stone-200 rounded-xl font-mono font-bold text-stone-900"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-stone-600 mb-1">
                Stock Físico Bodega ZOFRI (un.):
              </label>
              <input
                type="number"
                min={0}
                required
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-[#F6F4EE] border border-stone-200 rounded-xl font-mono font-bold text-stone-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-stone-600 mb-1">
              Stock por Llegar en Contenedor (un.):
            </label>
            <input
              type="number"
              min={0}
              value={disponiblePorLlegar}
              onChange={(e) => setDisponiblePorLlegar(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-[#F6F4EE] border border-stone-200 rounded-xl font-mono text-stone-900"
            />
            <span className="text-[10px] text-stone-400 block mt-1">
              Contenedor asignado: {product.contenedor}
            </span>
          </div>

          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-full border border-stone-300 hover:bg-stone-50 font-bold text-stone-700 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-bold transition shadow-sm flex items-center justify-center gap-2"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Guardar Cambios</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
