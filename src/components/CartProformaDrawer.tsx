"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useApp, PurchaseOrder } from "@/context/AppContext";
import { formatCLP } from "@/lib/utils";
import { generateProformaPDF, generateFacturaDTEPDF } from "@/lib/pdfGenerator";
import {
  X,
  Trash2,
  Plus,
  Minus,
  FileCheck,
  CreditCard,
  Mail,
  Printer,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingDown,
  Lock,
  Snowflake,
  Send,
  Truck,
  Building2,
  Package,
  Calendar,
  Clock,
  ExternalLink,
  ChevronDown,
  Receipt,
  Download,
  Landmark
} from "lucide-react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToProfile?: () => void;
}

export const CartProformaDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  onGoToProfile,
}) => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    orderSummary,
    clientProfile,
    deliveryOption,
    setDeliveryOption,
    taxRegime,
    setTaxRegime,
    addPurchaseOrder,
    addToast
  } = useApp();

  const [mounted, setMounted] = useState(false);
  const [activeView, setActiveView] = useState<"cart" | "delivery" | "proforma" | "payment" | "success">("cart");
  const [showAllItems, setShowAllItems] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [lastOrder, setLastOrder] = useState<PurchaseOrder | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"credito_30d" | "webpay" | "transferencia">("credito_30d");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  // Filtrado de paginación si hay más de 10 ítems (Requisito explícito)
  const visibleItems = showAllItems ? cart : cart.slice(0, 10);
  const hasMoreThan10 = cart.length > 10;

  const handleProceedToDelivery = () => {
    setActiveView("delivery");
  };

  const handleProceedToPayment = () => {
    setActiveView("payment");
  };

  const handleSimulatePayment = () => {
    const isDelivery = deliveryOption === "envio";
    const shippingCompany = isDelivery
      ? "Trans-Bolivia Heavy Logistics & Cargo S.R.L."
      : "Retiro Directo en ZOFRI (Galpón 7 y 8, Manzana 11, Iquique)";
    const deliveryDays = isDelivery ? "5 a 7 días hábiles" : "Inmediato (Retiro en Bodega)";

    const purchaseItems = cart.map((item) => ({
      id: item.product.id,
      sku: item.product.sku,
      oem: item.product.oem,
      title: item.product.title,
      quantity: item.quantity,
      unitPrice: item.product.priceNeto,
      totalPrice: item.product.priceNeto * item.quantity,
    }));

    const createdOrder = addPurchaseOrder({
      items: purchaseItems,
      subtotalNeto: orderSummary.subtotalDiscounted,
      iva: orderSummary.ivaCLP,
      shippingCost: orderSummary.shippingCostCLP,
      totalFinal: orderSummary.totalFinalCLP,
      deliveryType: deliveryOption,
      shippingCompany,
      deliveryDays,
      status: "en_camino",
      contactEmail: clientProfile.correo || "adquisiciones@flotasnorte.cl",
      taxRegime: orderSummary.taxRegime,
      documentType: orderSummary.documentType,
      paymentMethod,
    });

    setLastOrder(createdOrder);
    setActiveView("success");

    addToast(
      "¡Compra y Facturación Exitosa!",
      `Orden ${createdOrder.id} registrada bajo ${orderSummary.documentType}. Guía: ${createdOrder.trackingNumber}`,
      "success"
    );
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailSent(true);
    addToast(
      "Proforma Remitida por Correo",
      `Se envió copia formal a ${clientProfile.correo} y a ventas ZOFRI.`,
      "success"
    );
    setTimeout(() => {
      setEmailSent(false);
      setActiveView("cart");
    }, 2000);
  };

  const handleFinishAndTrack = () => {
    clearCart();
    onClose();
    if (onGoToProfile) {
      onGoToProfile();
    }
  };

  const handleDownloadProformaPDF = () => {
    generateProformaPDF({
      proformaNumber: "PRF-2026-0891",
      date: new Date().toLocaleDateString("es-CL"),
      validityDays: 15,
      client: {
        razonSocial: clientProfile.razonSocial,
        rut: clientProfile.rutEmpresa,
        giro: clientProfile.giro,
        contacto: clientProfile.contacto,
        telefono: clientProfile.telefono,
        correo: clientProfile.correo,
        ciudad: clientProfile.ciudad,
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
      taxRegime,
      deliveryOption,
      shippingCompany:
        deliveryOption === "envio"
          ? "Trans-Bolivia Heavy Logistics & Cargo S.R.L."
          : "Retiro Directo en Bodega ZOFRI (Galpón 7 y 8)",
      deliveryDays: deliveryOption === "envio" ? "5 a 7 días hábiles" : "Inmediato (En Bodega)",
      subtotalNeto: orderSummary.subtotalNeto,
      discountAmount: orderSummary.volumeDiscountAmount,
      discountPercentage: orderSummary.volumeDiscountPercent,
      iva: orderSummary.ivaCLP,
      shippingCost: orderSummary.shippingCostCLP,
      totalFinal: orderSummary.totalFinalCLP,
    });
    addToast(
      "Proforma Descargada en PDF",
      "Documento oficial PRF-2026-0891 generado con tabla vectorizada y datos ordenados.",
      "success"
    );
  };

  const handleDownloadFacturaPDF = () => {
    if (!lastOrder) return;
    generateFacturaDTEPDF({
      invoiceNumber: `FAC-${lastOrder.id.replace("ORD-", "")}`,
      fechaEmision: lastOrder.date,
      fechaVencimiento: "30 Días (Factura a Plazo)",
      tipoDocumento:
        lastOrder.taxRegime === "zofri_reexpedicion"
          ? "Factura de Reexpedición ZOFRI (0% IVA Exento)"
          : "Factura Electrónica Afecta (DTE 19% IVA)",
      cliente: {
        razonSocial: clientProfile.razonSocial,
        rut: clientProfile.rutEmpresa,
        giro: clientProfile.giro,
        direccion: "Galpones y Taller Central",
        ciudad: clientProfile.ciudad,
        contacto: clientProfile.contacto,
        telefono: clientProfile.telefono,
      },
      items: lastOrder.items.map((it) => ({
        sku: it.sku,
        oem: it.oem,
        title: it.title,
        quantity: it.quantity,
        unitPrice: it.unitPrice,
        totalPrice: it.totalPrice,
      })),
      subtotalNeto: lastOrder.subtotalNeto,
      iva: lastOrder.iva,
      flete: lastOrder.shippingCost,
      totalFinal: lastOrder.totalFinal,
      condicionPago:
        lastOrder.paymentMethod === "credito_30d"
          ? "Línea de Crédito a 30 Días B2B"
          : "Transferencia Bancaria ZOFRI",
      trackingNumber: lastOrder.trackingNumber,
    });
    addToast(
      "Factura DTE Descargada",
      "Documento tributario oficial descargado en formato PDF de alta resolución.",
      "success"
    );
  };

  return createPortal(
    <div className="fixed inset-0 top-0 left-0 right-0 bottom-0 z-[100] bg-black/60 backdrop-blur-xs flex justify-end m-0 p-0 w-screen h-screen overflow-hidden animate-in fade-in duration-200">
      <div className="bg-[#FBF9F5] w-full max-w-2xl h-screen max-h-screen shadow-2xl flex flex-col justify-between border-l border-stone-200 text-stone-800 m-0 p-0 overflow-hidden">
        {/* Cabecera del Drawer */}
        <div className="p-5 bg-white border-b border-stone-200 flex items-center justify-between shrink-0 m-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-stone-900 text-white flex items-center justify-center font-bold text-xs">
              D
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900 font-serif">
                {activeView === "cart" && "Carrito de Compras & Cotización"}
                {activeView === "delivery" && "Selección de Despacho & Régimen ZOFRI"}
                {activeView === "proforma" && "Proforma Oficial B2B"}
                {activeView === "payment" && "Pasarela de Pago Electrónico B2B"}
                {activeView === "success" && "Confirmación de Compra & Facturación"}
              </h3>
              <p className="text-[11px] text-stone-500 font-light">
                {clientProfile.razonSocial} &bull; RUT: {clientProfile.rutEmpresa}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {activeView !== "cart" && activeView !== "success" && (
              <button
                onClick={() => setActiveView("cart")}
                className="text-xs text-stone-500 hover:text-stone-900 font-medium px-2 py-1"
              >
                &larr; Volver
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-stone-100 flex items-center justify-center text-stone-500 hover:text-stone-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ================= VISTA 1: CARRITO DE COMPRA (PAGINACIÓN SI > 10) ================= */}
        {activeView === "cart" && (
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {/* Indicador de Descuento por Volumen */}
            <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-2 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                  <TrendingDown className="w-4 h-4 text-stone-700" />
                  Incentivo al Volumen Mayorista (&gt; $20.000.000 CLP)
                </span>
                {orderSummary.qualifiesForVolumeDiscount ? (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    12% DESCUENTO APLICADO
                  </span>
                ) : (
                  <span className="text-[10px] text-stone-400 font-mono">
                    {Math.min(100, Math.round((orderSummary.subtotalNeto / 20000000) * 100))}% de la meta
                  </span>
                )}
              </div>
              <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    orderSummary.qualifiesForVolumeDiscount
                      ? "bg-emerald-600"
                      : "bg-stone-900"
                  }`}
                  style={{
                    width: `${Math.min(
                      100,
                      Math.round((orderSummary.subtotalNeto / 20000000) * 100)
                    )}%`,
                  }}
                />
              </div>
            </div>

            {/* Listado de Repuestos */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-stone-500 pb-1">
                <span>Líneas en Carrito ({cart.length} repuestos agregados)</span>
                {orderSummary.frozenItemsCount > 0 && (
                  <span className="text-[11px] text-amber-800 font-medium bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    {orderSummary.frozenItemsCount} un. congeladas en espera de stock
                  </span>
                )}
              </div>

              {cart.length === 0 ? (
                <div className="py-16 text-center text-stone-400 text-xs">
                  No hay piezas agregadas a la cotización actual.
                </div>
              ) : (
                <>
                  {visibleItems.map((item) => {
                    const isFrozen = item.isFrozenWait;
                    return (
                      <div
                        key={item.product.id}
                        className={`p-4 rounded-2xl border transition relative ${
                          isFrozen
                            ? "bg-stone-900/[0.04] border-stone-300 opacity-80"
                            : "bg-white border-stone-200 shadow-xs"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-black font-mono text-stone-900">
                                {item.product.sku}
                              </span>
                              <span className="text-[11px] font-mono text-stone-600">
                                OEM: {item.product.oem}
                              </span>
                              {isFrozen && (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-800 text-white shadow-xs">
                                  <Snowflake className="w-3 h-3 text-cyan-300 animate-spin" />
                                  EN ESPERA DE STOCK (CONGELADO)
                                </span>
                              )}
                            </div>

                            <h4 className="text-sm font-bold text-stone-900">
                              {item.product.title}
                            </h4>

                            <p className="text-xs text-stone-500">
                              {item.product.vehicleCompatibility[0]}
                            </p>

                            {isFrozen && (
                              <p className="text-[11px] text-stone-600 font-medium pt-1">
                                * Este ítem queda registrado en la proforma pero <strong>no se cobra en el total inmediato</strong> hasta verificación física en bodega.
                              </p>
                            )}
                          </div>

                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-stone-400 hover:text-rose-600 p-1"
                            title="Eliminar repuesto"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Cantidad y Precios */}
                        <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                          <div className="flex items-center border border-stone-300 rounded-lg bg-white">
                            <button
                              onClick={() =>
                                updateCartQuantity(item.product.id, item.quantity - 1)
                              }
                              className="p-1 text-stone-500 hover:text-stone-900"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-3 font-mono font-bold text-stone-900 text-xs">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateCartQuantity(item.product.id, item.quantity + 1)
                              }
                              className="p-1 text-stone-500 hover:text-stone-900"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="text-right">
                            <span className="text-sm font-black text-stone-900">
                              {formatCLP(item.product.priceNeto * item.quantity)}
                            </span>
                            <span className="block text-[10px] text-stone-400">
                              {formatCLP(item.product.priceNeto)} c/u
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Paginación > 10 ítems */}
                  {hasMoreThan10 && !showAllItems && (
                    <button
                      onClick={() => setShowAllItems(true)}
                      className="w-full py-3 rounded-2xl bg-white border border-stone-300 hover:bg-stone-50 text-stone-800 text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-2xs"
                    >
                      <ChevronDown className="w-4 h-4 text-stone-500" />
                      <span>Ver más repuestos (+{cart.length - 10} líneas restantes del carrito)</span>
                    </button>
                  )}

                  {hasMoreThan10 && showAllItems && (
                    <button
                      onClick={() => setShowAllItems(false)}
                      className="w-full py-2 text-stone-500 hover:text-stone-800 text-xs font-medium text-center"
                    >
                      Mostrar solo los primeros 10 repuestos
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {/* ================= VISTA 2: DESPACHO & RÉGIMEN TRIBUTARIO ZOFRI ================= */}
        {activeView === "delivery" && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* 1. RÉGIMEN TRIBUTARIO ZOFRI */}
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-bold text-stone-900 font-serif">
                  1. Régimen Tributario & Destino ZOFRI
                </h4>
                <p className="text-[11px] text-stone-500">
                  Seleccione el tipo de documento tributario según el destino final de la mercadería:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={() => setTaxRegime("nacional")}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition ${
                    taxRegime === "nacional"
                      ? "bg-white border-stone-900 shadow-xs ring-1 ring-stone-900"
                      : "bg-white/60 border-stone-200 hover:border-stone-300"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-xs text-stone-900">
                      Destino Nacional (Chile)
                    </span>
                    <span className="px-2 py-0.5 rounded bg-stone-100 text-[10px] font-bold font-mono">
                      19% IVA
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1">
                    Factura Electrónica Afecta a IVA (DTE) para talleres y flotas de Chile continental.
                  </p>
                </div>

                <div
                  onClick={() => setTaxRegime("zofri_reexpedicion")}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition ${
                    taxRegime === "zofri_reexpedicion"
                      ? "bg-white border-stone-900 shadow-xs ring-1 ring-stone-900"
                      : "bg-white/60 border-stone-200 hover:border-stone-300"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-xs text-stone-900">
                      Reexpedición Extranjera
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold font-mono">
                      0% IVA EXENTO
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1">
                    Factura de Reexpedición ZOFRI (Régimen Franco a Bolivia / Perú / Sudamérica).
                  </p>
                </div>
              </div>
            </div>

            {/* 2. MODALIDAD DE ENTREGA */}
            <div className="space-y-3 pt-2 border-t border-stone-100">
              <div>
                <h4 className="text-sm font-bold text-stone-900 font-serif">
                  2. Modalidad de Entrega
                </h4>
                <p className="text-[11px] text-stone-500">
                  Despacho físico desde Galpones ZOFRI en Iquique:
                </p>
              </div>

              <div className="space-y-3">
                <div
                  onClick={() => setDeliveryOption("retiro")}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition ${
                    deliveryOption === "retiro"
                      ? "bg-white border-stone-900 shadow-xs ring-1 ring-stone-900"
                      : "bg-white/60 border-stone-200 hover:border-stone-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Building2 className="w-5 h-5 text-stone-700" />
                      <div>
                        <span className="font-bold text-xs text-stone-900 block">
                          Ir a Retirar en Bodega ZOFRI
                        </span>
                        <span className="text-[11px] text-stone-500">
                          Manzana 11, Galpones 7 y 8, Recinto Amurallado, Iquique
                        </span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      GRATIS ($0)
                    </span>
                  </div>
                </div>

                <div
                  onClick={() => setDeliveryOption("envio")}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition ${
                    deliveryOption === "envio"
                      ? "bg-white border-stone-900 shadow-xs ring-1 ring-stone-900"
                      : "bg-white/60 border-stone-200 hover:border-stone-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Truck className="w-5 h-5 text-stone-700" />
                      <div>
                        <span className="font-bold text-xs text-stone-900 block">
                          Envío en Camión de Carga Pesada
                        </span>
                        <span className="text-[11px] text-stone-500">
                          Operador: Trans-Bolivia Heavy Logistics & Cargo S.R.L. (5 a 7 días hábiles)
                        </span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">
                      FLETE: $45.000 CLP
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Resumen */}
            <div className="p-4 rounded-2xl bg-white border border-stone-200 text-xs space-y-2">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal Repuestos Netos:</span>
                <span className="font-mono font-bold text-stone-900">{formatCLP(orderSummary.subtotalDiscounted)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>{taxRegime === "zofri_reexpedicion" ? "IVA ZOFRI (0% Exento):" : "IVA (19% DTE):"}</span>
                <span className="font-mono font-bold text-stone-900">{formatCLP(orderSummary.ivaCLP)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Costo de Entrega:</span>
                <span className="font-mono font-bold text-stone-900">
                  {deliveryOption === "envio" ? formatCLP(orderSummary.shippingCostCLP) : "GRATIS ($0)"}
                </span>
              </div>
              <div className="pt-2 border-t border-stone-100 flex justify-between text-sm font-black text-stone-900">
                <span>Total Facturación Final:</span>
                <span className="font-mono text-base">{formatCLP(orderSummary.totalFinalCLP)}</span>
              </div>
            </div>
          </div>
        )}

        {/* ================= VISTA 3: PROFORMA OFICIAL DESCARGABLE ================= */}
        {activeView === "proforma" && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4 shadow-sm text-xs">
              <div className="flex justify-between items-start pb-4 border-b border-stone-100">
                <div>
                  <div className="text-base font-black text-stone-900 font-serif">
                    DAISEKAI LIMITADA
                  </div>
                  <div className="text-[11px] text-stone-500">
                    Manzana 11, Galpones 7 y 8, Recinto Amurallado ZOFRI, Iquique
                  </div>
                  <div className="text-[11px] text-stone-500">
                    Tel: 9 7523 6397 &bull; Correo: ventas@daisekai.cl
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-bold text-stone-900 uppercase font-mono">
                    PROFORMA N° PRF-2026-0891
                  </div>
                  <div className="text-[11px] text-stone-400">Validez: 7 Días</div>
                </div>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl space-y-1">
                <div className="font-bold text-stone-900">Cliente: {clientProfile.razonSocial}</div>
                <div className="text-stone-500">RUT: {clientProfile.rutEmpresa} &bull; Giro: {clientProfile.giro}</div>
                <div className="text-stone-500">Régimen: {orderSummary.documentType}</div>
              </div>

              {/* Detalle de líneas */}
              <div className="space-y-2 pt-2">
                <span className="font-bold text-stone-700 block text-xs">Líneas Cotizadas:</span>
                <div className="divide-y divide-stone-100 border border-stone-100 rounded-xl overflow-hidden">
                  {cart.map((item) => (
                    <div key={item.product.id} className="p-2.5 flex justify-between items-center text-[11px]">
                      <div>
                        <strong className="text-stone-900">{item.product.title}</strong>
                        <span className="text-stone-400 block font-mono">
                          OEM: {item.product.oem} ({item.quantity} un.)
                        </span>
                      </div>
                      <div className="text-right">
                        {item.isFrozenWait ? (
                          <span className="text-amber-700 font-bold">Condicionada (En espera)</span>
                        ) : (
                          <span className="font-bold text-stone-900">
                            {formatCLP(item.product.priceNeto * item.quantity)}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Botones de acción proforma */}
              <div className="pt-3 flex items-center justify-between gap-3 border-t border-stone-100">
                <button
                  onClick={handleDownloadProformaPDF}
                  className="px-4 py-2.5 rounded-full bg-stone-900 text-white font-bold hover:bg-stone-800 transition flex items-center gap-2 shadow-sm text-xs"
                >
                  <Download className="w-3.5 h-3.5 text-stone-300" />
                  <span>Descargar Proforma Oficial (PDF)</span>
                </button>

                <button
                  onClick={handleSendEmail}
                  className="px-4 py-2 rounded-full bg-stone-900 text-white font-bold hover:bg-stone-800 transition flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Enviar a {clientProfile.correo}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= VISTA 4: PASARELA DE PAGO CON CRÉDITO B2B A 30 DÍAS ================= */}
        {activeView === "payment" && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-sm text-xs">
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <div>
                  <h4 className="text-base font-bold text-stone-900 font-serif">
                    Pasarela de Pago Electrónico B2B
                  </h4>
                  <p className="text-xs text-stone-500">
                    Transacción mayorista asegurada bajo régimen ZOFRI
                  </p>
                </div>
                <span className="text-[10px] text-emerald-800 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  {orderSummary.documentType.split("(")[0]}
                </span>
              </div>

              {/* Resumen a Facturar */}
              <div className="p-4 rounded-2xl bg-[#F6F4EE] border border-stone-200 space-y-2">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal Neto:</span>
                  <span className="font-mono font-bold text-stone-900">{formatCLP(orderSummary.subtotalDiscounted)}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>{taxRegime === "zofri_reexpedicion" ? "IVA ZOFRI (0% Exento):" : "IVA (19% DTE):"}</span>
                  <span className="font-mono font-bold text-stone-900">{formatCLP(orderSummary.ivaCLP)}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Entrega ({deliveryOption === "envio" ? "Trans-Bolivia Cargo" : "Retiro ZOFRI"}):</span>
                  <span className="font-mono font-bold text-stone-900">
                    {deliveryOption === "envio" ? formatCLP(orderSummary.shippingCostCLP) : "GRATIS ($0)"}
                  </span>
                </div>
                <div className="pt-2 border-t border-stone-200 flex justify-between text-sm font-black text-stone-900">
                  <span>Total Facturación:</span>
                  <span className="text-base font-black text-stone-900">{formatCLP(orderSummary.totalFinalCLP)}</span>
                </div>
              </div>

              {/* SELECCIÓN MEDIO DE PAGO */}
              <div className="space-y-3">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-stone-600">
                  Seleccione Medio de Pago Mayorista:
                </span>

                {/* Opción 1: Crédito B2B 30 Días */}
                <div
                  onClick={() => setPaymentMethod("credito_30d")}
                  className={`p-3.5 rounded-xl border-2 cursor-pointer transition ${
                    paymentMethod === "credito_30d"
                      ? "bg-stone-50 border-stone-900 ring-1 ring-stone-900"
                      : "bg-white border-stone-200 hover:border-stone-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-stone-800" />
                      <div>
                        <div className="font-bold text-stone-900 text-xs">
                          Línea de Crédito a 30 Días (Factura Plazo B2B)
                        </div>
                        <div className="text-[10px] text-stone-500">
                          Cupo Disponible: <strong>{formatCLP(clientProfile.creditoDisponible)}</strong>
                        </div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                      Aprobado
                    </span>
                  </div>
                </div>

                {/* Opción 2: Webpay Plus */}
                <div
                  onClick={() => setPaymentMethod("webpay")}
                  className={`p-3.5 rounded-xl border-2 cursor-pointer transition ${
                    paymentMethod === "webpay"
                      ? "bg-stone-50 border-stone-900 ring-1 ring-stone-900"
                      : "bg-white border-stone-200 hover:border-stone-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Receipt className="w-5 h-5 text-stone-800" />
                    <div>
                      <div className="font-bold text-stone-900 text-xs">Webpay Plus / Débito & Crédito</div>
                      <div className="text-[10px] text-stone-500">Transbank tarjeta bancaria al instante</div>
                    </div>
                  </div>
                </div>

                {/* Opción 3: Transferencia Bancaria ZOFRI */}
                <div
                  onClick={() => setPaymentMethod("transferencia")}
                  className={`p-3.5 rounded-xl border-2 cursor-pointer transition ${
                    paymentMethod === "transferencia"
                      ? "bg-stone-50 border-stone-900 ring-1 ring-stone-900"
                      : "bg-white border-stone-200 hover:border-stone-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Landmark className="w-5 h-5 text-stone-800" />
                    <div>
                      <div className="font-bold text-stone-900 text-xs">Transferencia Bancaria ZOFRI</div>
                      <div className="text-[10px] text-stone-500">Banco de Chile Cta Cte: 19-204-921-00 (Daisekai Ltda)</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botón de Pago */}
              <div className="pt-2">
                <button
                  onClick={handleSimulatePayment}
                  className="w-full py-4 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-wider shadow-md transition flex items-center justify-center gap-2 group"
                >
                  <Lock className="w-4 h-4 text-stone-300" />
                  <span>
                    {paymentMethod === "credito_30d" && `Autorizar Cargo a Crédito 30 Días (${formatCLP(orderSummary.totalFinalCLP)})`}
                    {paymentMethod === "webpay" && `Simular Pago Webpay (${formatCLP(orderSummary.totalFinalCLP)})`}
                    {paymentMethod === "transferencia" && `Validar Transferencia Bancaria (${formatCLP(orderSummary.totalFinalCLP)})`}
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= VISTA 5: CONFIRMACIÓN EXITOSA & NOTIFICACIÓN POR CORREO ================= */}
        {activeView === "success" && lastOrder && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-sm text-xs">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-stone-900 font-serif">
                  ¡Transacción Exitosa! Todo está listo
                </h4>
                <p className="text-xs text-stone-500 max-w-md mx-auto">
                  La orden de compra ha sido confirmada por el sistema central de Daisekai ZOFRI y la factura fue emitida bajo <strong>{lastOrder.documentType}</strong>.
                </p>
              </div>

              {/* Notificación Simulada por Correo */}
              <div className="rounded-2xl border-2 border-stone-800 bg-[#F6F4EE] p-5 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-300/80">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-stone-800" />
                    <span className="font-bold text-stone-900 text-xs">
                      Notificación Enviada a: <span className="underline">{lastOrder.contactEmail}</span>
                    </span>
                  </div>
                  <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-stone-300 text-stone-700">
                    Bandeja de Entrada
                  </span>
                </div>

                <div className="space-y-3 text-stone-800">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white p-3.5 rounded-xl border border-stone-200 font-mono text-[11px]">
                    <div>
                      <span className="text-stone-400 block text-[10px]">NÚMERO DE SEGUIMIENTO:</span>
                      <strong className="text-stone-900 text-xs font-black">{lastOrder.trackingNumber}</strong>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px]">FECHA Y HORA DE COMPRA:</span>
                      <strong className="text-stone-900">{lastOrder.date}</strong>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px]">OPERADOR LOGÍSTICO:</span>
                      <strong className="text-stone-900">{lastOrder.shippingCompany}</strong>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px]">TIEMPO ESTIMADO DE ENTREGA:</span>
                      <strong className="text-emerald-800">{lastOrder.deliveryDays}</strong>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-stone-200 space-y-1">
                    <div className="font-bold text-stone-900 text-xs flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-stone-700" />
                      Estado de Envío: Ya va en camino
                    </div>
                    <p className="text-[11px] text-stone-600 leading-relaxed">
                      Estimado cliente, su pedido se encuentra en preparación y embalaje en las naves de ZOFRI y <strong>ya va en camino</strong> hacia el centro de distribución para su despacho en convoy internacional. El seguimiento restante se coordina directamente con la empresa transportista.
                    </p>
                  </div>
                </div>
              </div>

              {/* Botones de acción final */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleDownloadFacturaPDF}
                  className="flex-1 py-3.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs transition flex items-center justify-center gap-2 shadow-sm"
                >
                  <Download className="w-3.5 h-3.5 text-stone-300" />
                  <span>Descargar Factura Electrónica DTE (PDF)</span>
                </button>

                <button
                  onClick={handleFinishAndTrack}
                  className="flex-1 py-3.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-wider transition shadow-md flex items-center justify-center gap-2"
                >
                  <span>Ver en &ldquo;Mi Perfil&rdquo;</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Resumen inferior y botones de navegación de la orden */}
        {activeView === "cart" && cart.length > 0 && (
          <div className="p-6 bg-white border-t border-stone-200 space-y-4">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-stone-500">
                <span>Subtotal Neto Inmediato:</span>
                <span className="font-semibold text-stone-800">
                  {formatCLP(orderSummary.subtotalNeto)}
                </span>
              </div>
              {orderSummary.qualifiesForVolumeDiscount && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Descuento Volumen (12%):</span>
                  <span>- {formatCLP(orderSummary.volumeDiscountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-500">
                <span>{taxRegime === "zofri_reexpedicion" ? "IVA ZOFRI (0% Exento):" : "IVA (19% DTE):"}</span>
                <span className="font-semibold text-stone-800">
                  {formatCLP(orderSummary.ivaCLP)}
                </span>
              </div>
              <div className="pt-2 border-t border-stone-100 flex justify-between text-base font-black text-stone-900">
                <span>Total Facturación:</span>
                <span>{formatCLP(orderSummary.totalFinalCLP)}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setActiveView("proforma")}
                className="py-3.5 rounded-full border border-stone-300 hover:bg-stone-50 text-stone-800 font-bold text-xs transition flex items-center justify-center gap-1.5"
              >
                <FileCheck className="w-4 h-4" />
                <span>Ver Proforma Oficial</span>
              </button>

              <button
                onClick={handleProceedToDelivery}
                className="py-3.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-1.5"
              >
                <Truck className="w-4 h-4" />
                <span>Despacho & Régimen ZOFRI &rarr;</span>
              </button>
            </div>
          </div>
        )}

        {activeView === "delivery" && (
          <div className="p-6 bg-white border-t border-stone-200">
            <button
              onClick={handleProceedToPayment}
              className="w-full py-4 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-wider shadow-md transition flex items-center justify-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              <span>Continuar a Pasarela de Pago ({formatCLP(orderSummary.totalFinalCLP)}) &rarr;</span>
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};
