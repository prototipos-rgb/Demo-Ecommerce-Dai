"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { formatCLP } from "@/lib/utils";
import { generateProformaPDF } from "@/lib/pdfGenerator";
import {
  Trash2,
  Plus,
  Minus,
  FileCheck,
  CreditCard,
  Mail,
  Download,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
  TrendingDown,
  Truck,
  Building,
  Printer,
  X,
  Send,
  ArrowRight,
  Receipt
} from "lucide-react";

export default function CheckoutPage() {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    orderSummary,
    clientInfo,
    role,
    setRole,
    clientApprovalStatus,
    setClientApprovalStatus
  } = useApp();

  const [isProformaModalOpen, setIsProformaModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [emailSentNotice, setEmailSentNotice] = useState(false);
  const [paymentSuccessNotice, setPaymentSuccessNotice] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"webpay" | "transferencia">("webpay");

  const progressToDiscount = Math.min(
    100,
    Math.round((orderSummary.subtotalNeto / 20000000) * 100)
  );

  const missingToDiscount = Math.max(0, 20000000 - orderSummary.subtotalNeto);

  const handleSendEmailSimulation = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailSentNotice(true);
    setTimeout(() => {
      setEmailSentNotice(false);
      setIsEmailModalOpen(false);
    }, 2500);
  };

  const handleSimulatePayment = () => {
    setPaymentSuccessNotice(true);
  };

  return (
    <div className="bg-slate-950 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-blue-400 font-semibold mb-2">
              <Building className="w-3.5 h-3.5" />
              <span>{clientInfo.razonSocial}</span>
              <span>&bull;</span>
              <span className="text-slate-400 font-mono">RUT: {clientInfo.rutEmpresa}</span>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">
              Cotización & Carrito Mayorista B2B
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Revisa los ítems para despacho desde ZOFRI, evalúa el descuento por volumen y genera tu proforma o pago.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/catalogo"
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold rounded-xl border border-slate-700 transition"
            >
              &larr; Agregar Más SKUs
            </Link>
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="px-3 py-2 text-xs text-rose-400 hover:text-rose-300 transition"
              >
                Vaciar Carrito
              </button>
            )}
          </div>
        </div>

        {/* Guest Warning if in blind mode */}
        {clientApprovalStatus === "sin_aprobar" && (
          <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-amber-200 text-xs flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <strong className="block text-white font-semibold">
                  Tu cuenta está en proceso de evaluación por Administración.
                </strong>
                Para emitir la proforma formal y aplicar descuentos por volumen, la cuenta debe estar aprobada.
              </div>
            </div>
            <button
              onClick={() => setClientApprovalStatus("aprobado")}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg shrink-0 shadow transition"
            >
              Simular Aprobación RUT
            </button>
          </div>
        )}

        {/* Volume Discount Progress Engine Bar */}
        <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 space-y-3 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/30">
                <TrendingDown className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  <span>Incentivo al Volumen: Regla Comercial &gt; $20.000.000 CLP</span>
                  {orderSummary.qualifiesForVolumeDiscount && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-[10px] border border-emerald-800 font-bold">
                      ¡12% DESCUENTO APLICADO!
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-slate-400">
                  {orderSummary.qualifiesForVolumeDiscount
                    ? `Tu compra mayorista supera los 20M CLP. Has ahorrado ${formatCLP(orderSummary.volumeDiscountAmount)} automáticamente.`
                    : `Agrega ${formatCLP(missingToDiscount)} adicionales para desbloquear 12% de descuento en todo el pedido.`}
                </div>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-bold text-slate-300">
                {progressToDiscount}% de la meta
              </span>
            </div>
          </div>

          <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
            <div
              className={`h-full transition-all duration-500 ${
                orderSummary.qualifiesForVolumeDiscount
                  ? "bg-gradient-to-r from-emerald-500 to-cyan-400"
                  : "bg-gradient-to-r from-blue-600 to-amber-500"
              }`}
              style={{ width: `${progressToDiscount}%` }}
            />
          </div>
        </div>

        {/* Cart Items & Summary Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Items Table */}
          <div className="lg:col-span-8 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Líneas de Pedido</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  {orderSummary.itemsCount} unidades
                </span>
              </h2>

              {orderSummary.frozenItemsCount > 0 && (
                <span className="text-[11px] px-2.5 py-1 rounded-md bg-amber-950 text-amber-300 border border-amber-800 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {orderSummary.frozenItemsCount} unidades bajo Proforma Condicionada (Budget Congelado)
                </span>
              )}
            </div>

            {cart.length === 0 ? (
              <div className="p-12 text-center space-y-4">
                <Receipt className="w-12 h-12 text-slate-600 mx-auto" />
                <div className="text-slate-300 font-bold text-sm">
                  El carrito está vacío
                </div>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Agrega repuestos desde el catálogo o prueba cargando el Kardex Excel en el panel de administración.
                </p>
                <Link
                  href="/catalogo"
                  className="inline-block px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow transition"
                >
                  Explorar Catálogo
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-slate-800">
                {cart.map((item) => {
                  const isOutOfStock = item.product.stock <= 0;
                  const itemSubtotal = item.product.priceNeto * item.quantity;

                  return (
                    <div
                      key={item.product.id}
                      className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-800/40 transition"
                    >
                      <div className="flex items-start gap-3 flex-1">
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          className="w-16 h-16 rounded-xl object-cover bg-slate-950 shrink-0 border border-slate-800"
                        />
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-xs font-bold text-white">
                              {item.product.sku}
                            </span>
                            <span className="text-[11px] font-mono text-cyan-400">
                              OEM: {item.product.oem}
                            </span>
                            {isOutOfStock ? (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950 text-amber-400 border border-amber-800">
                                Proforma Backorder (Sin Stock Físico)
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                                Stock ZOFRI: {item.product.stock} un.
                              </span>
                            )}
                          </div>

                          <h4 className="text-sm font-semibold text-slate-200">
                            {item.product.title}
                          </h4>

                          <div className="text-[11px] text-slate-400">
                            {item.product.brand} &bull; Peso: {item.product.weightKg} kg/un &bull;{" "}
                            {item.product.vehicleCompatibility[0]}
                          </div>
                        </div>
                      </div>

                      {/* Controls & Price */}
                      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-slate-800">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-slate-700 rounded-lg bg-slate-950">
                          <button
                            onClick={() =>
                              updateCartQuantity(item.product.id, item.quantity - 1)
                            }
                            className="p-1.5 text-slate-400 hover:text-white transition"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 py-1 font-mono text-xs font-bold text-white min-w-[36px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateCartQuantity(item.product.id, item.quantity + 1)
                            }
                            className="p-1.5 text-slate-400 hover:text-white transition"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Price Breakdown */}
                        <div className="text-right min-w-[110px]">
                          <div className="text-sm font-black text-white">
                            {formatCLP(itemSubtotal)}
                          </div>
                          <div className="text-[10px] text-slate-500">
                            {formatCLP(item.product.priceNeto)} c/u neto
                          </div>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-slate-500 hover:text-rose-400 p-1.5 transition"
                          title="Eliminar ítem"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Summary Column & Multi-Option Triggers */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-5">
              <h3 className="text-base font-bold text-white flex items-center justify-between pb-3 border-b border-slate-800">
                <span>Resumen de Liquidación</span>
                <span className="text-[11px] text-blue-400 font-mono">B2B ZOFRI</span>
              </h3>

              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Subtotal Neto:</span>
                  <span className="font-semibold">{formatCLP(orderSummary.subtotalNeto)}</span>
                </div>

                {orderSummary.qualifiesForVolumeDiscount && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Descuento Volumen (12%):</span>
                    <span>- {formatCLP(orderSummary.volumeDiscountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-cyan-400" /> Flete Mayorista Internacional ({orderSummary.totalWeightKg} kg):
                  </span>
                  <span className="font-semibold text-cyan-400">
                    {formatCLP(orderSummary.shippingCostCLP || orderSummary.estimatedFreightCLP)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">IVA (19% DTE Nacional):</span>
                  <span className="font-semibold">{formatCLP(orderSummary.ivaCLP)}</span>
                </div>

                <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
                  <div>
                    <span className="text-sm font-bold text-white block">Total Liquidación:</span>
                    <span className="text-[10px] text-slate-500">
                      Incluye flete e impuestos
                    </span>
                  </div>
                  <span className="text-2xl font-black text-white">
                    {formatCLP(orderSummary.totalFinalCLP)}
                  </span>
                </div>
              </div>

              {/* Action Buttons: 3 Required Channels */}
              <div className="space-y-2.5 pt-2">
                {/* 1. Proforma Descargable */}
                <button
                  onClick={() => setIsProformaModalOpen(true)}
                  disabled={cart.length === 0}
                  className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs shadow-lg transition flex items-center justify-center gap-2"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>Descargar / Imprimir Proforma Oficial</span>
                </button>

                {/* 2. Enviar por Correo */}
                <button
                  onClick={() => setIsEmailModalOpen(true)}
                  disabled={cart.length === 0}
                  className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 font-semibold text-xs border border-slate-700 transition flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span>Enviar Cotización a Ejecutivo / Vendedor</span>
                </button>

                {/* 3. Simulación Pasarela de Pago */}
                <button
                  onClick={() => setIsPaymentModalOpen(true)}
                  disabled={cart.length === 0}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs shadow-lg transition flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Simular Pasarela de Pago (Webpay Plus)</span>
                </button>
              </div>

              <div className="text-[10px] text-slate-500 text-center flex items-center justify-center gap-1.5 pt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Transacción segura cifrada &bull; Facturación Electrónica DTE</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MODAL 1: PROFORMA FORMAL DESCARGABLE ================= */}
      {isProformaModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl text-white shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Controls Bar */}
            <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-blue-400" />
                <span className="font-bold text-sm">
                  Documento Proforma Comercial N° PRF-2026-0891
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    generateProformaPDF({
                      proformaNumber: "PRF-2026-0891",
                      date: new Date().toLocaleDateString("es-CL"),
                      validityDays: 15,
                      client: {
                        razonSocial: clientInfo.razonSocial,
                        rut: clientInfo.rutEmpresa,
                        giro: clientInfo.giro,
                        contacto: clientInfo.contacto,
                        telefono: clientInfo.telefono,
                        correo: clientInfo.correo,
                        ciudad: "Iquique / Pozo Almonte",
                      },
                      items: cart.map((it) => ({
                        sku: it.product.sku,
                        oem: it.product.oem,
                        title: it.product.title,
                        quantity: it.quantity,
                        unitPrice: it.product.priceNeto,
                        totalPrice: it.product.priceNeto * it.quantity,
                        isFrozenWait: it.isFrozenWait,
                      })),
                      taxRegime: orderSummary.taxRegime || "nacional",
                      deliveryOption: "envio",
                      shippingCompany: "Trans-Bolivia Heavy Logistics & Cargo S.R.L.",
                      deliveryDays: "5 a 7 días hábiles",
                      subtotalNeto: orderSummary.subtotalNeto,
                      discountAmount: orderSummary.volumeDiscountAmount,
                      discountPercentage: orderSummary.volumeDiscountPercent,
                      iva: orderSummary.ivaCLP,
                      shippingCost: orderSummary.shippingCostCLP,
                      totalFinal: orderSummary.totalFinalCLP,
                    });
                  }}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Descargar Proforma en PDF</span>
                </button>
                <button
                  onClick={() => setIsProformaModalOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Document Body (Printable Formatted Sheet) */}
            <div className="p-8 space-y-6 bg-slate-900 text-slate-200 text-xs font-sans">
              {/* Header Letterhead */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-slate-700">
                <div className="space-y-1">
                  <div className="text-xl font-black text-white tracking-wider flex items-center gap-2">
                    <span>DAISEKAI LIMITADA</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-blue-900 text-cyan-300 font-bold">
                      OSAKANSAI
                    </span>
                  </div>
                  <div className="text-slate-400">
                    Importadora y Exportadora Daisekai Limitada &bull; RUT: 76.543.210-9
                  </div>
                  <div className="text-slate-400">
                    Manzana 11, Galpones 7 y 8, Recinto Amurallado ZOFRI, Iquique, Chile
                  </div>
                  <div className="text-slate-400">
                    Contacto: +56 9 7523 6397 &bull; Fijo: +56 57 2 544220 &bull; ventas@daisekai.cl
                  </div>
                </div>

                <div className="text-left sm:text-right bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="text-xs font-bold text-cyan-400 uppercase">
                    PROFORMA CONDICIONADA B2B
                  </div>
                  <div className="text-base font-black text-white font-mono mt-0.5">
                    N° PRF-2026-0891
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Fecha de Emisión: 09/11/2026
                  </div>
                  <div className="text-[11px] text-amber-400 font-medium">
                    Validez Comercial: 7 Días Hábiles
                  </div>
                </div>
              </div>

              {/* Client Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Razón Social Cliente:
                  </span>
                  <span className="text-sm font-bold text-white block">
                    {clientInfo.razonSocial}
                  </span>
                  <span className="text-slate-400">RUT: {clientInfo.rutEmpresa}</span>
                  <span className="block text-slate-400 mt-0.5">Giro: {clientInfo.giro}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Modalidad y Despacho:
                  </span>
                  <span className="text-slate-200 block font-medium">
                    {clientInfo.despachoDefault}
                  </span>
                  <span className="text-slate-400 block mt-0.5">
                    Condición de Pago: Factura Crédito Mayorista 30 Días / Contado ZOFRI
                  </span>
                  <span className="text-emerald-400 text-[11px] font-semibold block mt-0.5">
                    Línea de Crédito Aprobada: {formatCLP(clientInfo.creditoDisponible)}
                  </span>
                </div>
              </div>

              {/* Table of Items */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-slate-800 rounded-lg overflow-hidden">
                  <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-semibold">
                    <tr>
                      <th className="py-2.5 px-3">SKU</th>
                      <th className="py-2.5 px-3">Código OEM</th>
                      <th className="py-2.5 px-3">Descripción de Pieza</th>
                      <th className="py-2.5 px-3 text-center">Cant.</th>
                      <th className="py-2.5 px-3 text-right">P. Unitario</th>
                      <th className="py-2.5 px-3 text-center">Estado Stock</th>
                      <th className="py-2.5 px-3 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {cart.map((item) => (
                      <tr key={item.product.id}>
                        <td className="py-2.5 px-3 font-mono font-bold text-white">
                          {item.product.sku}
                        </td>
                        <td className="py-2.5 px-3 font-mono text-cyan-400">
                          {item.product.oem}
                        </td>
                        <td className="py-2.5 px-3">
                          <div className="text-white font-medium">{item.product.title}</div>
                          <div className="text-[10px] text-slate-500">
                            {item.product.vehicleCompatibility[0]}
                          </div>
                        </td>
                        <td className="py-2.5 px-3 text-center font-bold">
                          {item.quantity}
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          {formatCLP(item.product.priceNeto)}
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          {item.product.stock > 0 ? (
                            <span className="text-[10px] text-emerald-400 font-semibold">
                              Inmediato ZOFRI
                            </span>
                          ) : (
                            <span className="text-[10px] text-amber-400 font-semibold">
                              Backorder Condicionado
                            </span>
                          )}
                        </td>
                        <td className="py-2.5 px-3 text-right font-bold text-white">
                          {formatCLP(item.product.priceNeto * item.quantity)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Proforma Totals */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pt-4 border-t border-slate-700">
                <div className="max-w-md text-[11px] text-slate-400 space-y-1">
                  <div className="font-semibold text-slate-300">
                    Cláusula de Backordering & Proforma Condicionada:
                  </div>
                  <p>
                    Las líneas marcadas como &apos;Backorder Condicionado&apos; corresponden a piezas con reserva prioritaria desde el próximo arribo de contenedores marítimos o verificación física en Galpones 7 y 8. No generan cargo financiero hasta la reconfirmación de despacho por parte de la jefatura de bodega de Daisekai Ltda.
                  </p>
                </div>

                <div className="w-full sm:w-72 space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Subtotal Neto:</span>
                    <span className="font-semibold">{formatCLP(orderSummary.subtotalNeto)}</span>
                  </div>
                  {orderSummary.qualifiesForVolumeDiscount && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Descuento Volumen (12%):</span>
                      <span>- {formatCLP(orderSummary.volumeDiscountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-400">
                    <span>Flete Estimado Starken:</span>
                    <span>{formatCLP(orderSummary.estimatedFreightCLP)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>IVA (19%):</span>
                    <span>{formatCLP(orderSummary.ivaCLP)}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-800 flex justify-between font-bold text-white text-base">
                    <span>Total Proforma:</span>
                    <span>{formatCLP(orderSummary.totalFinalCLP)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL 2: ENVIAR POR CORREO ================= */}
      {isEmailModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg text-white shadow-2xl p-6 space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-cyan-400" />
                <h3 className="font-bold text-sm">Enviar Proforma por Correo</h3>
              </div>
              <button
                onClick={() => setIsEmailModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {emailSentNotice ? (
              <div className="p-6 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-center space-y-2 animate-fade-in">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="font-bold text-white text-sm">¡Proforma Enviada con Éxito!</h4>
                <p className="text-xs text-slate-300">
                  Se ha remitido la cotización N° PRF-2026-0891 a tu correo corporativo y a la casilla de ventas de Daisekai ZOFRI.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendEmailSimulation} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Correo Electrónico Destinatario (Cliente):
                  </label>
                  <input
                    type="email"
                    required
                    defaultValue="adquisiciones@flotasnorte.cl"
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Copia a Ejecutivo Daisekai ZOFRI:
                  </label>
                  <input
                    type="email"
                    readOnly
                    value="ventas@daisekai.cl / galpones7y8@zofri.cl"
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-400 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Observaciones o Instrucciones de Despacho:
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Ej. Favor coordinar despacho consolidado con camión de carga pesada a Antofagasta."
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEmailModalOpen(false)}
                    className="px-4 py-2 text-slate-400 hover:text-white"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Enviar Proforma</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ================= MODAL 3: SIMULACIÓN PASARELA DE PAGO WEBPAY PLUS ================= */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md text-white shadow-2xl p-6 space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-sm">Pasarela de Pago Electrónico</h3>
              </div>
              <button
                onClick={() => {
                  setIsPaymentModalOpen(false);
                  setPaymentSuccessNotice(false);
                }}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {paymentSuccessNotice ? (
              <div className="text-center space-y-4 py-4 animate-fade-in">
                <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">¡Transacción Aprobada!</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Código de Autorización Transbank: <strong className="text-white font-mono">TBK-884219</strong>
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-left space-y-1.5 font-mono">
                  <div className="flex justify-between text-slate-400">
                    <span>Monto Cobrado:</span>
                    <span className="text-white font-bold">{formatCLP(orderSummary.totalFinalCLP)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Comercio:</span>
                    <span className="text-slate-200">Daisekai Ltda. ZOFRI</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>DTE Automático:</span>
                    <span className="text-emerald-400">Factura N° 10.428 Emitida</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    clearCart();
                    setIsPaymentModalOpen(false);
                    setPaymentSuccessNotice(false);
                  }}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow"
                >
                  Finalizar & Volver al Catálogo
                </button>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                {/* Brand Selector */}
                <div className="p-3 bg-red-950/40 border border-red-700/50 rounded-xl flex items-center justify-between">
                  <span className="font-bold text-red-300">Webpay Plus (Transbank)</span>
                  <span className="text-[10px] text-slate-400">Ambiente Simulación</span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-slate-300">
                    <span>Total a Pagar:</span>
                    <span className="font-black text-white text-base">
                      {formatCLP(orderSummary.totalFinalCLP)}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>Cliente:</span>
                    <span>{clientInfo.razonSocial}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <label className="block text-slate-300 font-semibold">
                    Medio de Pago:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("webpay")}
                      className={`p-2.5 rounded-xl border text-center transition font-semibold ${
                        paymentMethod === "webpay"
                          ? "bg-blue-600 text-white border-blue-500 shadow"
                          : "bg-slate-950 text-slate-400 border-slate-800"
                      }`}
                    >
                      Tarjetas de Débito / Crédito
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("transferencia")}
                      className={`p-2.5 rounded-xl border text-center transition font-semibold ${
                        paymentMethod === "transferencia"
                          ? "bg-blue-600 text-white border-blue-500 shadow"
                          : "bg-slate-950 text-slate-400 border-slate-800"
                      }`}
                    >
                      Transferencia B2B ZOFRI
                    </button>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
                  Al hacer clic en &apos;Pagar Ahora&apos;, se simulará una llamada de autorización en línea ante la pasarela de pagos, generando la Factura Electrónica y la orden de retiro en Galpones 7 y 8.
                </div>

                <button
                  type="button"
                  onClick={handleSimulatePayment}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Pagar Ahora ({formatCLP(orderSummary.totalFinalCLP)})</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
