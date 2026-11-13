"use client";

import React, { useState } from "react";
import { useApp, PurchaseOrder } from "@/context/AppContext";
import { formatCLP } from "@/lib/utils";
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  ExternalLink,
  ShieldCheck,
  Search,
  Filter,
  ArrowRight,
  FileText
} from "lucide-react";

export const AdminGestionPedidos: React.FC = () => {
  const { allOrders, updateOrderStatus, addToast } = useApp();
  const [filterStatus, setFilterStatus] = useState<string>("todos");
  const [searchFilter, setSearchFilter] = useState<string>("");

  const filteredOrders = allOrders.filter((order) => {
    const matchStatus = filterStatus === "todos" || order.status === filterStatus;
    const matchSearch =
      !searchFilter ||
      order.id.toLowerCase().includes(searchFilter.toLowerCase()) ||
      order.trackingNumber.toLowerCase().includes(searchFilter.toLowerCase()) ||
      order.contactEmail.toLowerCase().includes(searchFilter.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Cabecera del módulo */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl border border-stone-200 p-6 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-semibold uppercase tracking-wider mb-2">
            <Package className="w-3.5 h-3.5 text-stone-800" />
            <span>Control de Despachos & Órdenes ZOFRI</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif">
            Gestión Central de Pedidos & Logística de Salida
          </h3>
          <p className="text-xs text-stone-500 font-light">
            Panel para validar pedidos, asignar despacho en Galpón 7 y actualizar el tracking en vivo hacia los clientes y transportistas.
          </p>
        </div>

        <span className="text-xs font-mono font-bold text-stone-500 bg-stone-100 px-3 py-1 rounded-full">
          {filteredOrders.length} Órdenes Activas
        </span>
      </div>

      {/* Barra de Filtros */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-2xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative flex-1 w-full">
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Buscar orden por N° pedido (PED-2026-6713), Guía (TRK-BOL) o Correo..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#F6F4EE] border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900 font-medium"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-stone-400 font-medium">Estado:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs font-bold text-stone-800 focus:outline-none"
          >
            <option value="todos">Todos los Estados</option>
            <option value="confirmado">Confirmado</option>
            <option value="preparacion">En Preparación (Galpón 7)</option>
            <option value="en_camino">En Convoy Internacional</option>
            <option value="entregado">Entregado</option>
          </select>
        </div>
      </div>

      {/* Listado de Órdenes Centralizadas */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-4 text-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
              <div className="flex items-center gap-3">
                <span className="font-mono font-black text-sm text-stone-900">
                  {order.id}
                </span>
                <span className="text-stone-300">&bull;</span>
                <span className="text-stone-500 font-mono text-[11px]">{order.date}</span>
                <span className="text-stone-300">&bull;</span>
                <span className="text-stone-700 font-medium">{order.contactEmail}</span>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-bold font-mono ${
                    order.status === "en_camino"
                      ? "bg-blue-100 text-blue-800"
                      : order.status === "preparacion"
                      ? "bg-amber-100 text-amber-800"
                      : order.status === "entregado"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-stone-100 text-stone-800"
                  }`}
                >
                  {order.status === "en_camino" && "EN CONVOY INTERNACIONAL"}
                  {order.status === "preparacion" && "EN PREPARACIÓN GALPÓN 7"}
                  {order.status === "confirmado" && "ORDEN CONFIRMADA"}
                  {order.status === "entregado" && "ENTREGADO EN DESTINO"}
                </span>

                <span className="font-mono font-bold text-stone-900 text-sm">
                  {formatCLP(order.totalFinal)}
                </span>
              </div>
            </div>

            {/* Datos Logísticos y Tributarios */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#F6F4EE]/60 p-3.5 rounded-2xl border border-stone-200/80 font-mono text-[11px]">
              <div>
                <span className="text-stone-400 block text-[10px]">TRANSPORTE ASIGNADO:</span>
                <strong className="text-stone-800">{order.shippingCompany}</strong>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px]">GUÍA DE TRACKING:</span>
                <strong className="text-stone-900 font-black">{order.trackingNumber}</strong>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px]">RÉGIMEN TRIBUTARIO:</span>
                <strong className={order.taxRegime === "zofri_reexpedicion" ? "text-emerald-800" : "text-stone-800"}>
                  {order.documentType || "Factura DTE ZOFRI"}
                </strong>
              </div>
            </div>

            {/* Desglose de Repuestos */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                Repuestos en la Orden ({order.items.length} líneas):
              </span>
              <div className="flex flex-wrap gap-2">
                {order.items.map((it) => (
                  <span
                    key={it.sku}
                    className="px-2.5 py-1 rounded-lg bg-stone-50 border border-stone-200 text-[11px] text-stone-700 font-mono"
                  >
                    <strong>{it.quantity}x</strong> {it.sku} &bull; {it.title}
                  </span>
                ))}
              </div>
            </div>

            {/* Controles para cambiar el estado de despacho */}
            <div className="pt-2 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-[11px] text-stone-500">
                Transicionar estado logístico (impacta el tracker del cliente en vivo):
              </span>

              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => updateOrderStatus(order.id, "confirmado")}
                  className={`px-3 py-1 rounded-lg font-bold text-[10px] transition ${
                    order.status === "confirmado"
                      ? "bg-stone-900 text-white"
                      : "bg-stone-100 hover:bg-stone-200 text-stone-700"
                  }`}
                >
                  1. Confirmado
                </button>
                <button
                  onClick={() => updateOrderStatus(order.id, "preparacion")}
                  className={`px-3 py-1 rounded-lg font-bold text-[10px] transition ${
                    order.status === "preparacion"
                      ? "bg-stone-900 text-white"
                      : "bg-stone-100 hover:bg-stone-200 text-stone-700"
                  }`}
                >
                  2. En Preparación Galpón 7
                </button>
                <button
                  onClick={() => updateOrderStatus(order.id, "en_camino")}
                  className={`px-3 py-1 rounded-lg font-bold text-[10px] transition ${
                    order.status === "en_camino"
                      ? "bg-stone-900 text-white"
                      : "bg-stone-100 hover:bg-stone-200 text-stone-700"
                  }`}
                >
                  3. En Convoy Internacional
                </button>
                <button
                  onClick={() => updateOrderStatus(order.id, "entregado")}
                  className={`px-3 py-1 rounded-lg font-bold text-[10px] transition ${
                    order.status === "entregado"
                      ? "bg-emerald-800 text-white"
                      : "bg-stone-100 hover:bg-stone-200 text-stone-700"
                  }`}
                >
                  4. Entregado
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
