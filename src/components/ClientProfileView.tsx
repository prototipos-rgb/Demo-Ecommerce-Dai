"use client";

import React, { useState } from "react";
import { useApp, InvoiceAccount, PurchaseOrder } from "@/context/AppContext";
import { formatCLP } from "@/lib/utils";
import { generateFacturaDTEPDF } from "@/lib/pdfGenerator";
import {
  Building2,
  User,
  Phone,
  Mail,
  MapPin,
  FileText,
  CreditCard,
  Truck,
  CheckCircle2,
  Clock,
  Package,
  Calendar,
  ExternalLink,
  ShieldCheck,
  Edit2,
  Save,
  ShoppingBag,
  ArrowRight,
  TrendingUp,
  Receipt,
  DollarSign,
  Download,
  X
} from "lucide-react";

interface ClientProfileViewProps {
  onBackToCatalog: () => void;
  onOpenCart: () => void;
}

export const ClientProfileView: React.FC<ClientProfileViewProps> = ({
  onBackToCatalog,
  onOpenCart,
}) => {
  const {
    clientProfile,
    updateClientProfile,
    purchaseHistory,
    clientApprovalStatus,
    payInvoiceBalance,
    addToast
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<"ficha" | "cuenta_corriente" | "pedidos">("ficha");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...clientProfile });

  // Modal de abono/pago de factura
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceAccount | null>(null);
  const [paymentAmount, setPaymentAmount] = useState<number>(0);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateClientProfile(formData);
    setIsEditing(false);
  };

  const handleOpenPaymentModal = (inv: InvoiceAccount) => {
    setSelectedInvoice(inv);
    setPaymentAmount(inv.balanceDue);
  };

  const handleConfirmInvoicePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInvoice) return;
    payInvoiceBalance(selectedInvoice.id, paymentAmount);
    setSelectedInvoice(null);
  };

  const latestOrder = purchaseHistory.length > 0 ? purchaseHistory[0] : null;

  const handleDownloadInvoicePDF = (inv: InvoiceAccount) => {
    generateFacturaDTEPDF({
      invoiceNumber: inv.id,
      fechaEmision: inv.date,
      fechaVencimiento: inv.dueDate,
      tipoDocumento: "Factura Electrónica Afecta (DTE 19% IVA)",
      cliente: {
        razonSocial: clientProfile.razonSocial,
        rut: clientProfile.rutEmpresa,
        giro: clientProfile.giro,
        direccion: "Galpones y Taller Central",
        ciudad: clientProfile.ciudad,
        contacto: clientProfile.contacto,
        telefono: clientProfile.telefono,
      },
      items: [
        {
          sku: `SKU-${inv.id}`,
          oem: "OEM-REF-DTE",
          title: inv.concept,
          quantity: 1,
          unitPrice: Math.round(inv.totalAmount / 1.19),
          totalPrice: Math.round(inv.totalAmount / 1.19),
        },
      ],
      subtotalNeto: Math.round(inv.totalAmount / 1.19),
      iva: inv.totalAmount - Math.round(inv.totalAmount / 1.19),
      flete: 0,
      totalFinal: inv.totalAmount,
      condicionPago: "Línea de Crédito 30 Días",
    });
    addToast(
      "Factura DTE Descargada",
      `Documento ${inv.id} generado en PDF vectorizado de alta resolución.`,
      "success"
    );
  };

  const handleDownloadOrderPDF = (order: PurchaseOrder) => {
    generateFacturaDTEPDF({
      invoiceNumber: `FAC-${order.id.replace("ORD-", "")}`,
      fechaEmision: order.date,
      fechaVencimiento: "30 Días (Factura a Plazo)",
      tipoDocumento:
        order.taxRegime === "zofri_reexpedicion"
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
      items: order.items.map((it) => ({
        sku: it.sku,
        oem: it.oem,
        title: it.title,
        quantity: it.quantity,
        unitPrice: it.unitPrice,
        totalPrice: it.totalPrice,
      })),
      subtotalNeto: order.subtotalNeto,
      iva: order.iva,
      flete: order.shippingCost,
      totalFinal: order.totalFinal,
      condicionPago:
        order.paymentMethod === "credito_30d"
          ? "Línea de Crédito a 30 Días B2B"
          : "Transferencia Bancaria ZOFRI",
      trackingNumber: order.trackingNumber,
    });
    addToast(
      "Factura DTE de Compra Descargada",
      `Factura tributaria para la orden ${order.id} descargada en PDF.`,
      "success"
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Barra superior de navegación de Mi Perfil */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-semibold uppercase tracking-wider">
            <User className="w-3.5 h-3.5 text-stone-800" />
            <span>Portal Privado del Cliente Mayorista</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-normal text-stone-900 font-serif">
            Mi Perfil & Gestión Comercial
          </h2>
          <p className="text-xs text-stone-500 font-light">
            Ficha tributaria, cuenta corriente mayorista a 30 días, seguimiento logístico e historial contable.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onBackToCatalog}
            className="px-4 py-2.5 rounded-full border border-stone-300 text-stone-700 hover:bg-stone-50 text-xs font-bold transition flex items-center gap-1.5"
          >
            &larr; Volver al Catálogo
          </button>
          <button
            onClick={onOpenCart}
            className="px-4 py-2.5 rounded-full bg-stone-900 text-white hover:bg-stone-800 text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Mi Carrito</span>
          </button>
        </div>
      </div>

      {/* Selector de Sub-Pestañas en Mi Perfil */}
      <div className="flex flex-wrap items-center gap-2 bg-[#F6F4EE] p-1.5 rounded-2xl border border-stone-200 w-fit">
        <button
          onClick={() => setActiveSubTab("ficha")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeSubTab === "ficha"
              ? "bg-stone-900 text-white shadow-xs"
              : "text-stone-700 hover:bg-white/60"
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>1. Ficha Comercial & Datos</span>
        </button>

        <button
          onClick={() => setActiveSubTab("cuenta_corriente")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeSubTab === "cuenta_corriente"
              ? "bg-stone-900 text-white shadow-xs"
              : "text-stone-700 hover:bg-white/60"
          }`}
        >
          <CreditCard className="w-3.5 h-3.5" />
          <span>2. Cuenta Corriente & Saldos (Crédito B2B)</span>
        </button>

        <button
          onClick={() => setActiveSubTab("pedidos")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeSubTab === "pedidos"
              ? "bg-stone-900 text-white shadow-xs"
              : "text-stone-700 hover:bg-white/60"
          }`}
        >
          <Truck className="w-3.5 h-3.5" />
          <span>3. Seguimiento en Vivo & Historial ({purchaseHistory.length})</span>
        </button>
      </div>

      {/* ================= PESTAÑA 1: FICHA COMERCIAL ================= */}
      {activeSubTab === "ficha" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div className="flex items-center gap-2.5">
                <Building2 className="w-5 h-5 text-stone-700" />
                <div>
                  <h3 className="text-base font-bold text-stone-900 font-serif">
                    Ficha Comercial de la Empresa
                  </h3>
                  <p className="text-[11px] text-stone-400">
                    Antecedentes tributarios registrados para facturación ZOFRI
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-xs font-bold text-stone-700 hover:text-stone-900 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-stone-200 hover:bg-stone-50 transition"
              >
                {isEditing ? (
                  <span>Cancelar</span>
                ) : (
                  <>
                    <Edit2 className="w-3.5 h-3.5 text-stone-500" />
                    <span>Modificar Datos</span>
                  </>
                )}
              </button>
            </div>

            {isEditing ? (
              <form onSubmit={handleSave} className="space-y-4 text-xs">
                <div>
                  <label className="block text-stone-600 font-bold mb-1 text-[11px]">
                    Razón Social / Taller Mecánico
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.razonSocial}
                    onChange={(e) => setFormData({ ...formData, razonSocial: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F6F4EE] border border-stone-200 rounded-xl text-stone-900 font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-600 font-bold mb-1 text-[11px]">
                      RUT Empresa
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.rutEmpresa}
                      onChange={(e) => setFormData({ ...formData, rutEmpresa: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#F6F4EE] border border-stone-200 rounded-xl text-stone-900 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-600 font-bold mb-1 text-[11px]">
                      Ciudad / Región
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.ciudad}
                      onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#F6F4EE] border border-stone-200 rounded-xl text-stone-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-600 font-bold mb-1 text-[11px]">
                    Giro Comercial
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.giro}
                    onChange={(e) => setFormData({ ...formData, giro: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F6F4EE] border border-stone-200 rounded-xl text-stone-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-600 font-bold mb-1 text-[11px]">
                      Nombre de Contacto
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.contacto}
                      onChange={(e) => setFormData({ ...formData, contacto: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#F6F4EE] border border-stone-200 rounded-xl text-stone-900"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-600 font-bold mb-1 text-[11px]">
                      Teléfono / WhatsApp
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#F6F4EE] border border-stone-200 rounded-xl text-stone-900 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-600 font-bold mb-1 text-[11px]">
                    Correo Electrónico de Contacto
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.correo}
                    onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F6F4EE] border border-stone-200 rounded-xl text-stone-900 font-mono"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm flex items-center justify-center gap-2"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Guardar Modificaciones</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-2xl bg-[#F6F4EE] border border-stone-200 space-y-3">
                  <div>
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                      Razón Social
                    </span>
                    <span className="text-sm font-bold text-stone-900">{clientProfile.razonSocial}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-stone-200/60">
                    <div>
                      <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                        RUT Empresa
                      </span>
                      <span className="font-mono font-bold text-stone-800">{clientProfile.rutEmpresa}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                        Ciudad
                      </span>
                      <span className="text-stone-800 font-medium">{clientProfile.ciudad}</span>
                    </div>
                  </div>

                  <div className="pt-1 border-t border-stone-200/60">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                      Giro Comercial
                    </span>
                    <span className="text-stone-700">{clientProfile.giro}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-stone-200/60">
                    <div>
                      <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                        Contacto
                      </span>
                      <span className="text-stone-800 font-medium">{clientProfile.contacto}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                        Teléfono
                      </span>
                      <span className="font-mono text-stone-800">{clientProfile.telefono}</span>
                    </div>
                  </div>

                  <div className="pt-1 border-t border-stone-200/60">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                      Correo Notificaciones
                    </span>
                    <span className="font-mono font-bold text-stone-900">{clientProfile.correo}</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-2">
                  <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                    Tarifa y Descuento Asignado por Vendedor:
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
                      {clientProfile.tarifaActiva}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-5 bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-stone-900 font-serif">
              Resumen de Crédito & Estado Comercial
            </h3>
            <div className="p-4 rounded-2xl bg-[#F6F4EE] border border-stone-200 space-y-3 text-xs">
              <div>
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                  Línea de Crédito Autorizada
                </span>
                <span className="text-xl font-black font-mono text-stone-900">
                  {formatCLP(clientProfile.creditoTotal)}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-200">
                <div>
                  <span className="text-[10px] text-stone-500 block">Saldo Utilizado:</span>
                  <strong className="text-amber-800 font-mono">{formatCLP(clientProfile.creditoUtilizado)}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-stone-500 block">Cupo Disponible:</span>
                  <strong className="text-emerald-800 font-mono">{formatCLP(clientProfile.creditoDisponible)}</strong>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveSubTab("cuenta_corriente")}
              className="w-full py-3 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span>Ver Estado de Cuenta Corriente Completo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================= PESTAÑA 2: PORTAL DE SALDOS & CUENTA CORRIENTE MAYORISTA ================= */}
      {activeSubTab === "cuenta_corriente" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                Línea de Crédito Total
              </span>
              <div className="text-2xl font-black font-mono text-stone-900">
                {formatCLP(clientProfile.creditoTotal)}
              </div>
              <span className="text-[10px] text-stone-500 block pt-1">
                Plazo de pago: 30 días factura electrónica
              </span>
            </div>

            <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
                Crédito Utilizado / Adeudado
              </span>
              <div className="text-2xl font-black font-mono text-amber-800">
                {formatCLP(clientProfile.creditoUtilizado)}
              </div>
              <span className="text-[10px] text-stone-500 block pt-1">
                {clientProfile.invoices.filter((i) => i.status !== "pagada").length} facturas con saldo pendiente
              </span>
            </div>

            <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                Cupo Disponible para Compras
              </span>
              <div className="text-2xl font-black font-mono text-emerald-800">
                {formatCLP(clientProfile.creditoDisponible)}
              </div>
              <span className="text-[10px] text-emerald-700 font-semibold block pt-1">
                ✓ Habilitado para pago a crédito en checkout
              </span>
            </div>
          </div>

          {/* Tabla de Facturas Pendientes y Pagos Parciales */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-stone-900 font-serif">
                  Facturas Emitidas & Vencimientos a Plazo
                </h3>
                <p className="text-xs text-stone-500 font-light">
                  Consulte sus documentos tributarios y realice abonos parciales o liquidaciones totales
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-stone-400">
                {clientProfile.invoices.length} Facturas Registradas
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs font-sans">
                <thead>
                  <tr className="border-b border-stone-200 text-[11px] font-bold uppercase tracking-wider text-stone-400 font-mono">
                    <th className="pb-3 pl-2">N° Factura</th>
                    <th className="pb-3">Emisión & Vencimiento</th>
                    <th className="pb-3">Detalle / Concepto</th>
                    <th className="pb-3">Total Facturado</th>
                    <th className="pb-3">Saldo Pendiente</th>
                    <th className="pb-3">Estado</th>
                    <th className="pb-3 text-right pr-2">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {clientProfile.invoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-stone-50 transition">
                      <td className="py-4 pl-2 font-mono font-bold text-stone-900">
                        {inv.id}
                      </td>
                      <td className="py-4 text-stone-600 font-mono text-[11px]">
                        <div>Emisión: {inv.date}</div>
                        <div className="text-amber-800 font-bold">Vence: {inv.dueDate}</div>
                      </td>
                      <td className="py-4 text-stone-800 font-medium">
                        {inv.concept}
                      </td>
                      <td className="py-4 font-mono font-bold text-stone-900">
                        {formatCLP(inv.totalAmount)}
                      </td>
                      <td className="py-4 font-mono font-bold text-amber-900">
                        {formatCLP(inv.balanceDue)}
                      </td>
                      <td className="py-4">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            inv.status === "pagada"
                              ? "bg-emerald-100 text-emerald-800"
                              : inv.status === "abono_parcial"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {inv.status === "pagada" && "PAGADA (TOTAL)"}
                          {inv.status === "abono_parcial" && "ABONO PARCIAL"}
                          {inv.status === "pendiente" && "PENDIENTE"}
                        </span>
                      </td>
                      <td className="py-4 text-right pr-2">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleDownloadInvoicePDF(inv)}
                            className="p-1.5 rounded-lg border border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-white transition"
                            title="Descargar Factura Electrónica DTE (PDF)"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                          {inv.balanceDue > 0 ? (
                            <button
                              onClick={() => handleOpenPaymentModal(inv)}
                              className="px-3 py-1.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-[11px] font-bold transition shadow-2xs"
                            >
                              Abonar / Pagar
                            </button>
                          ) : (
                            <span className="text-[11px] text-emerald-700 font-bold font-mono">
                              Saldada ✓
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================= PESTAÑA 3: SEGUIMIENTO EN VIVO & HISTORIAL ================= */}
      {activeSubTab === "pedidos" && (
        <div className="space-y-8">
          {/* TRACKING EN VIVO */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="border-b border-stone-100 pb-4">
              <h3 className="text-base font-bold text-stone-900 font-serif flex items-center gap-2">
                <Truck className="w-5 h-5 text-stone-700" />
                <span>Seguimiento de Mis Ítems (Tracking en Tiempo Real)</span>
              </h3>
              <p className="text-[11px] text-stone-400">
                Rastreo del último pedido emitido desde Galpones ZOFRI
              </p>
            </div>

            {!latestOrder ? (
              <div className="py-12 text-center space-y-3 bg-[#F6F4EE]/60 rounded-2xl border border-dashed border-stone-200 p-6">
                <Package className="w-10 h-10 text-stone-300 mx-auto" />
                <h4 className="text-sm font-bold text-stone-700">
                  No hay envíos activos en este momento
                </h4>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  Al completar una compra desde el carrito, su orden se registrará aquí automáticamente.
                </p>
              </div>
            ) : (
              <div className="space-y-6 text-xs">
                <div className="p-4 rounded-2xl bg-stone-900 text-white space-y-3 shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono tracking-widest text-stone-400 uppercase">
                      GUÍA DE DESPACHO INTERNACIONAL
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold font-mono text-[10px] border border-emerald-400/30">
                      {latestOrder.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <span className="text-lg font-mono font-black text-white">
                      {latestOrder.trackingNumber}
                    </span>
                    <span className="text-xs text-stone-300">
                      Orden: <strong>{latestOrder.id}</strong>
                    </span>
                  </div>

                  <div className="pt-2 border-t border-stone-700/80 grid grid-cols-2 gap-2 text-[11px] text-stone-300">
                    <div>
                      <span className="text-stone-400 block text-[10px]">OPERADOR:</span>
                      <strong className="text-white">{latestOrder.shippingCompany}</strong>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px]">DOCUMENTO TRIBUTARIO:</span>
                      <strong className="text-emerald-400">{latestOrder.documentType}</strong>
                    </div>
                  </div>
                </div>

                {/* 4 Etapas de Tracking */}
                <div className="space-y-3 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-stone-200">
                  <div className="flex items-start gap-3.5 relative">
                    <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 z-10 shadow-xs">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-stone-900 text-xs">
                        1. Orden Confirmada y Facturada ({latestOrder.date})
                      </div>
                      <div className="text-[11px] text-stone-500">
                        Método: {latestOrder.paymentMethod === "credito_30d" ? "Línea de Crédito a 30 Días" : "Webpay Plus"} &bull; Total: {formatCLP(latestOrder.totalFinal)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 relative">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 shadow-xs ${
                      latestOrder.status === "preparacion" || latestOrder.status === "en_camino" || latestOrder.status === "entregado"
                        ? "bg-emerald-600 text-white"
                        : "bg-stone-200 text-stone-400"
                    }`}>
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-stone-900 text-xs">
                        2. Embalaje y Zunchado en Naves 7 y 8 ZOFRI
                      </div>
                      <div className="text-[11px] text-stone-500">
                        Preparación física de bultos y validación de aduanas.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 relative">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 shadow-xs ${
                      latestOrder.status === "en_camino" || latestOrder.status === "entregado"
                        ? "bg-stone-900 text-white animate-pulse"
                        : "bg-stone-200 text-stone-400"
                    }`}>
                      <Truck className="w-3.5 h-3.5 text-cyan-300" />
                    </div>
                    <div>
                      <div className="font-bold text-stone-900 text-xs">
                        3. Despacho en Convoy Internacional de Carga
                      </div>
                      <div className="text-[11px] text-stone-600">
                        Operador: {latestOrder.shippingCompany}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 relative">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 ${
                      latestOrder.status === "entregado" ? "bg-emerald-600 text-white" : "bg-stone-200 text-stone-400"
                    }`}>
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-stone-400 text-xs">
                        4. Entrega en Destino Final
                      </div>
                      <div className="text-[11px] text-stone-400">
                        Plazo comprometido: {latestOrder.deliveryDays}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* HISTORIAL DE COMPRAS */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-stone-900 font-serif">
              Historial de Compras & Facturas Mayoristas
            </h3>
            {purchaseHistory.length === 0 ? (
              <div className="py-8 text-center text-xs text-stone-400">
                Historial de compras limpio. No se inventan transacciones.
              </div>
            ) : (
              <div className="space-y-3">
                {purchaseHistory.map((order) => (
                  <div
                    key={order.id}
                    className="p-4 rounded-2xl border border-stone-200 bg-[#F6F4EE]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-stone-900">{order.id}</span>
                        <span className="text-stone-400">&bull;</span>
                        <span className="text-stone-600">{order.date}</span>
                        <span className="text-stone-400">&bull;</span>
                        <span className="text-emerald-800 font-bold">{order.documentType}</span>
                      </div>
                      <div className="text-[11px] text-stone-500 mt-1">
                        {order.items.length} repuestos &bull; Guía: {order.trackingNumber} ({order.shippingCompany})
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="font-mono font-black text-stone-900 text-sm">
                        {formatCLP(order.totalFinal)}
                      </div>
                      <button
                        onClick={() => handleDownloadOrderPDF(order)}
                        className="px-3 py-1.5 rounded-full bg-white border border-stone-200 hover:bg-stone-100 text-stone-800 text-xs font-bold transition flex items-center gap-1.5 shadow-2xs"
                        title="Descargar Factura Electrónica en PDF"
                      >
                        <Download className="w-3.5 h-3.5 text-stone-600" />
                        <span>PDF</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal de Abono / Pago Parcial de Factura */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-stone-200 max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-5 text-xs text-stone-800">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <h4 className="text-base font-bold text-stone-900 font-serif">
                  Abono a Factura {selectedInvoice.id}
                </h4>
                <p className="text-[11px] text-stone-500">
                  Concepto: {selectedInvoice.concept}
                </p>
              </div>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="w-8 h-8 rounded-full hover:bg-stone-100 flex items-center justify-center text-stone-400 hover:text-stone-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[#F6F4EE] border border-stone-200 space-y-2">
              <div className="flex justify-between text-stone-600">
                <span>Total Facturado:</span>
                <span className="font-mono font-bold">{formatCLP(selectedInvoice.totalAmount)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Saldo Pendiente Actual:</span>
                <span className="font-mono font-bold text-amber-900">{formatCLP(selectedInvoice.balanceDue)}</span>
              </div>
            </div>

            <form onSubmit={handleConfirmInvoicePayment} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                  Monto a Abonar (CLP):
                </label>
                <input
                  type="number"
                  min={1000}
                  max={selectedInvoice.balanceDue}
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(Number(e.target.value))}
                  className="w-full px-3.5 py-3 bg-[#F6F4EE] border border-stone-200 rounded-xl font-mono text-sm font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900"
                />
                <span className="text-[10px] text-stone-400 block mt-1">
                  Puede ingresar un pago parcial o el saldo total pendiente.
                </span>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedInvoice(null)}
                  className="flex-1 py-3 rounded-full border border-stone-300 hover:bg-stone-50 font-bold text-stone-700 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-bold transition shadow-sm"
                >
                  Confirmar Abono
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
