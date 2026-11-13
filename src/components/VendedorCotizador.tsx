"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Product } from "@/data/mockProducts";
import { generateCotizacionPDF } from "@/lib/pdfGenerator";
import {
  FileText,
  Printer,
  Mail,
  Plus,
  Trash2,
  Building,
  UserCheck,
  CheckCircle2,
  Send,
  Calendar,
  Sparkles,
  Download
} from "lucide-react";

export interface CotizacionLine {
  id: string;
  codigoProducto: string;
  codFact: string;
  descripcion: string;
  cantidad: number;
  um: string;
  unitUsd: number;
  totalUsd: number;
}

export const VendedorCotizador: React.FC = () => {
  const { products, addToast } = useApp();

  // Tipo de solicitante: Cartera vs NO Cliente
  const [clientType, setClientType] = useState<"cartera" | "no_cliente">("cartera");

  // Datos de cabecera
  const [numCotizacion, setNumCotizacion] = useState("6,781");
  const [vendedorNombre, setVendedorNombre] = useState("EVANGELYN / V");
  const [fechaEmision, setFechaEmision] = useState("11 de Noviembre del 2026 10:45:00");
  const [reservaNum, setReservaNum] = useState("6781");

  // Datos del Cliente (Pre-cargados o libres para NO Cliente)
  const [clienteNombre, setClienteNombre] = useState("9329596 HIPER PARTS CLAUDIA ALTAMIRANO HURTADO");
  const [codCliente, setCodCliente] = useState("C 020-539");
  const [direccion, setDireccion] = useState("FATSURI ENTRE SANTIVAÑES");
  const [ciudad, setCiudad] = useState("CBBA (Cochabamba - Bolivia)");
  const [fono, setFono] = useState("(+591) 67561046");
  const [correoDestino, setCorreoDestino] = useState("adquisiciones@hiperparts.bo");
  const [glosaDoc, setGlosaDoc] = useState("Repuestos y empaquetaduras para despacho internacional ZOFRI");

  // Líneas de la cotización conectadas al catálogo
  const [lineas, setLineas] = useState<CotizacionLine[]>([
    {
      id: "line-1",
      codigoProducto: "2727-O",
      codFact: "1004033TY0080",
      descripcion: "AMORTIGUADOR OSAKANSAI KYB: 343039=553041 TRASERO GAS HILUX REVO",
      cantidad: 10,
      um: "UN",
      unitUsd: 7.80,
      totalUsd: 78.00,
    },
    {
      id: "line-2",
      codigoProducto: "11115-37030-KJ-SL",
      codFact: "009B0033TY239",
      descripcion: "EMP CULATA OSAKANSAI NK TY 2ZRFE 2009 COROLLA MATRIX . MOTOR",
      cantidad: 20,
      um: "UN",
      unitUsd: 4.50,
      totalUsd: 90.00,
    },
    {
      id: "line-3",
      codigoProducto: "13101-74100-I",
      codFact: "218CJ047TY279",
      descripcion: "PISTON NEW IZUMI II STD NO ALFIN TY 3S-FE MOTOR",
      cantidad: 1,
      um: "SET",
      unitUsd: 38.33,
      totalUsd: 38.33,
    },
  ]);

  // Selector para agregar repuestos desde el catálogo actual
  const [selectedCatalogSku, setSelectedCatalogSku] = useState<string>(products[0]?.sku || "");
  const [addQty, setAddQty] = useState<number>(5);

  const handleSelectClientType = (type: "cartera" | "no_cliente") => {
    setClientType(type);
    if (type === "no_cliente") {
      setClienteNombre("PROSPECTO NO CLIENTE: TALLER MULTIMARCA LAS AMÉRICAS");
      setCodCliente("SIN CODIGO (NO CLIENTE)");
      setDireccion("AV. LIBERTADORES 450");
      setCiudad("Iquique, Chile");
      setFono("+56 9 6612 3490");
      setCorreoDestino("ventas@tallerlasamericas.cl");
    } else {
      setClienteNombre("9329596 HIPER PARTS CLAUDIA ALTAMIRANO HURTADO");
      setCodCliente("C 020-539");
      setDireccion("FATSURI ENTRE SANTIVAÑES");
      setCiudad("CBBA (Cochabamba - Bolivia)");
      setFono("(+591) 67561046");
      setCorreoDestino("adquisiciones@hiperparts.bo");
    }
  };

  const handleAddProductFromCatalog = () => {
    const prod = products.find((p) => p.sku === selectedCatalogSku);
    if (!prod) return;

    // Conversión de precio neto a USD para formato oficial ZOFRI (tipo cambio aprox 960)
    const priceUsd = Math.round((prod.priceNeto / 960) * 100) / 100;
    const newLine: CotizacionLine = {
      id: `line-${Date.now()}`,
      codigoProducto: prod.sku,
      codFact: `100${prod.oem.replace(/-/g, "").slice(0, 8)}TY`,
      descripcion: `${prod.title.toUpperCase()} ${prod.brand.toUpperCase()} - OEM: ${prod.oem}`,
      cantidad: addQty,
      um: "UN",
      unitUsd: priceUsd,
      totalUsd: Math.round(priceUsd * addQty * 100) / 100,
    };

    setLineas((prev) => [...prev, newLine]);
    addToast(
      "Ítem Agregado a la Cotización",
      `Se agregó ${addQty} un. de "${prod.title}" (${prod.sku}) al documento oficial.`,
      "success"
    );
  };

  const handleRemoveLine = (id: string) => {
    setLineas((prev) => prev.filter((l) => l.id !== id));
  };

  const totalUsd = lineas.reduce((acc, l) => acc + l.totalUsd, 0);
  const totalCantidad = lineas.reduce((acc, l) => acc + l.cantidad, 0);

  const handlePrintPdf = () => {
    generateCotizacionPDF({
      numCotizacion,
      reservaNum,
      vendedor: vendedorNombre,
      fechaEmision,
      clienteNombre,
      codCliente,
      direccion,
      ciudad,
      fono,
      glosaDoc,
      lineas,
      totalUsd,
      totalCantidad,
    });
    addToast(
      "Cotización Multiem Descargada",
      `Documento COT-${numCotizacion} generado en PDF de alta resolución con formato oficial ZOFRI.`,
      "success"
    );
  };

  const handleSendEmail = () => {
    addToast(
      "Cotización Oficial Enviada",
      `Documento COT-${numCotizacion} remitido en formato PDF a ${correoDestino}.`,
      "success"
    );
  };

  return (
    <div className="space-y-6">
      {/* Barra de cabecera del módulo */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl border border-stone-200 p-6 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-semibold uppercase tracking-wider mb-2">
            <FileText className="w-3.5 h-3.5 text-stone-800" />
            <span>Módulo de Emisión Oficial Multiem &bull; Daisekai ZOFRI</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif">
            Generador de Cotizaciones & Proformas (Clientes & NO Clientes)
          </h3>
          <p className="text-xs text-stone-500 font-light">
            Emita y descargue en PDF cotizaciones formales conectadas en tiempo real al inventario y catálogo actual.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrintPdf}
            className="px-4 py-2.5 rounded-full border border-stone-300 bg-white hover:bg-stone-50 text-stone-800 text-xs font-bold transition flex items-center gap-1.5 shadow-2xs"
          >
            <Download className="w-4 h-4 text-stone-600" />
            <span>Descargar en PDF (Multiem Oficial)</span>
          </button>
          <button
            onClick={handleSendEmail}
            className="px-4 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Enviar Cotización por Correo</span>
          </button>
        </div>
      </div>

      {/* Grid Side-by-Side: Formulario a la izquierda, Previsualización a la derecha */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* COLUMNA IZQUIERDA: FORMULARIO DE EDICIÓN */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-stone-200 p-6 sm:p-7 shadow-sm space-y-5 text-xs">
          <div className="border-b border-stone-100 pb-3">
            <h4 className="text-sm font-bold text-stone-900 font-serif">
              1. Configuración de la Cotización
            </h4>
            <p className="text-[11px] text-stone-400">
              Rellene los datos del destinatario o seleccione de su cartera
            </p>
          </div>

          {/* Selector de Tipo de Cliente */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500">
              Tipo de Destinatario:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleSelectClientType("cartera")}
                className={`p-2.5 rounded-xl border text-center font-bold text-xs transition ${
                  clientType === "cartera"
                    ? "bg-stone-900 text-white border-stone-900"
                    : "bg-white text-stone-700 border-stone-200 hover:bg-stone-50"
                }`}
              >
                Cliente en Cartera
              </button>
              <button
                type="button"
                onClick={() => handleSelectClientType("no_cliente")}
                className={`p-2.5 rounded-xl border text-center font-bold text-xs transition ${
                  clientType === "no_cliente"
                    ? "bg-stone-900 text-white border-stone-900"
                    : "bg-white text-stone-700 border-stone-200 hover:bg-stone-50"
                }`}
              >
                NO Cliente (Prospecto)
              </button>
            </div>
          </div>

          {/* Campos de Cabecera */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-stone-500 mb-1">
                N° Cotización:
              </label>
              <input
                type="text"
                value={numCotizacion}
                onChange={(e) => setNumCotizacion(e.target.value)}
                className="w-full px-3 py-2 bg-[#F6F4EE] border border-stone-200 rounded-xl font-mono font-bold text-stone-900"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-stone-500 mb-1">
                Vendedor Asignado:
              </label>
              <input
                type="text"
                value={vendedorNombre}
                onChange={(e) => setVendedorNombre(e.target.value)}
                className="w-full px-3 py-2 bg-[#F6F4EE] border border-stone-200 rounded-xl font-mono text-stone-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-stone-500 mb-1">
              Nombre / Razón Social del Solicitante:
            </label>
            <input
              type="text"
              value={clienteNombre}
              onChange={(e) => setClienteNombre(e.target.value)}
              className="w-full px-3 py-2 bg-[#F6F4EE] border border-stone-200 rounded-xl text-stone-900 font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-stone-500 mb-1">
                Código Cliente:
              </label>
              <input
                type="text"
                value={codCliente}
                onChange={(e) => setCodCliente(e.target.value)}
                className="w-full px-3 py-2 bg-[#F6F4EE] border border-stone-200 rounded-xl font-mono text-stone-900"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-stone-500 mb-1">
                Ciudad / Destino:
              </label>
              <input
                type="text"
                value={ciudad}
                onChange={(e) => setCiudad(e.target.value)}
                className="w-full px-3 py-2 bg-[#F6F4EE] border border-stone-200 rounded-xl text-stone-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-stone-500 mb-1">
                Dirección:
              </label>
              <input
                type="text"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                className="w-full px-3 py-2 bg-[#F6F4EE] border border-stone-200 rounded-xl text-stone-900"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-stone-500 mb-1">
                Teléfono:
              </label>
              <input
                type="text"
                value={fono}
                onChange={(e) => setFono(e.target.value)}
                className="w-full px-3 py-2 bg-[#F6F4EE] border border-stone-200 rounded-xl font-mono text-stone-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-stone-500 mb-1">
              Correo Electrónico para Enviar PDF:
            </label>
            <input
              type="email"
              value={correoDestino}
              onChange={(e) => setCorreoDestino(e.target.value)}
              className="w-full px-3 py-2 bg-[#F6F4EE] border border-stone-200 rounded-xl font-mono text-stone-900"
            />
          </div>

          {/* AGREGAR REPUESTOS DESDE EL CATÁLOGO ACTUAL */}
          <div className="pt-4 border-t border-stone-100 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-stone-900 font-serif">
                2. Agregar Piezas desde el Catálogo
              </h4>
              <span className="text-[10px] text-stone-400 font-mono">
                {products.length} SKUs Disponibles
              </span>
            </div>

            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-stone-500">
                Seleccione Repuesto del Catálogo:
              </label>
              <select
                value={selectedCatalogSku}
                onChange={(e) => setSelectedCatalogSku(e.target.value)}
                className="w-full px-3 py-2 bg-[#F6F4EE] border border-stone-200 rounded-xl text-xs text-stone-900 font-medium"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.sku}>
                    [{p.sku}] {p.title} - OEM: {p.oem} (Stock: {p.stock} un.)
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end gap-3">
              <div className="w-28">
                <label className="block text-[11px] font-bold text-stone-500 mb-1">
                  Cantidad (N° Prod.):
                </label>
                <input
                  type="number"
                  min={1}
                  value={addQty}
                  onChange={(e) => setAddQty(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-[#F6F4EE] border border-stone-200 rounded-xl font-mono font-bold text-stone-900"
                />
              </div>

              <button
                type="button"
                onClick={handleAddProductFromCatalog}
                className="flex-1 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Agregar Línea a Cotización</span>
              </button>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: PREVISUALIZACIÓN OFICIAL EN VIVO (FORMATO EDITORIAL DAISEKAI B2B) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6 print:m-0 print:p-0 print:border-none print:shadow-none">
          <div className="flex items-center justify-between border-b border-stone-200 pb-4">
            <div>
              <h3 className="text-base font-bold text-stone-900 font-serif">
                Previsualización Oficial de Cotización
              </h3>
              <p className="text-xs text-stone-500">
                Documento en tiempo real con estética institucional Daisekai & Osakansai
              </p>
            </div>
            <div className="px-3 py-1 bg-stone-100 text-stone-700 rounded-full text-[10px] font-bold uppercase tracking-wider">
              En Vivo (Sincronizado)
            </div>
          </div>

          {/* Documento Físico Simulado en Formato Editorial A4 */}
          <div className="border border-stone-200 p-6 sm:p-8 rounded-2xl bg-white space-y-5 text-xs font-sans text-stone-800 shadow-xs relative overflow-hidden">
            {/* Barra Superior de Acento Slate */}
            <div className="h-1.5 bg-stone-900 rounded-full -mt-2 -mx-2 mb-4" />

            {/* Cabecera Oficial */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-stone-200">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center font-bold text-xs font-serif">
                    D
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-stone-900 leading-tight">
                      IMPORTADORA Y EXPORTADORA DAISEKAI LTDA.
                    </h4>
                    <span className="text-[10px] font-bold text-red-600 tracking-wider">
                      DAISEKAI AUTOMOTIVE
                    </span>
                  </div>
                </div>
                <p className="text-[10px] text-stone-500 leading-relaxed pt-1">
                  Firma Hermana: Osakansai Group &bull; RUT: 76.549.821-3<br />
                  ZOFRI &bull; Recinto Amurallado &bull; Manzana 11, Galpones 7 y 8, Iquique<br />
                  Tel: +56 9 7523 6397 / +56 57 2 544220 &bull; Iquique, Chile
                </p>
              </div>

              {/* Recuadro Identificador de Cotización */}
              <div className="bg-[#FBF9F5] border border-stone-200/90 rounded-2xl p-3.5 text-center sm:text-right shrink-0 min-w-[200px] shadow-2xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
                  Cotización Mayorista B2B
                </span>
                <span className="text-lg font-bold font-serif text-stone-900 block my-0.5">
                  N° {numCotizacion}
                </span>
                <div className="text-[10px] text-stone-500 space-y-0.5">
                  <p>Fecha: <strong className="text-stone-800">{fechaEmision}</strong></p>
                  <p>Vendedor: <strong className="text-stone-800">{vendedorNombre}</strong></p>
                </div>
              </div>
            </div>

            {/* Metadatos del Cliente y Condiciones */}
            <div className="bg-[#FBF9F5] p-4 rounded-2xl border border-stone-200/80 text-[11px] grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                  Datos del Solicitante / Cliente
                </span>
                <p className="font-bold text-stone-900 text-xs">
                  {clienteNombre}
                </p>
                <p className="text-stone-600">
                  <strong className="text-stone-800">Cód. Cliente:</strong> {codCliente}
                </p>
                <p className="text-stone-600">
                  <strong className="text-stone-800">Dirección:</strong> {direccion}
                </p>
                <p className="text-stone-600">
                  <strong className="text-stone-800">Ciudad:</strong> {ciudad} &bull; <strong className="text-stone-800">Fono:</strong> {fono}
                </p>
              </div>

              <div className="space-y-1 sm:border-l sm:border-stone-200 sm:pl-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                  Régimen Fiscal & Despacho
                </span>
                <p className="text-stone-700">
                  <strong className="text-stone-800">Régimen:</strong> Venta Mayorista ZOFRI
                </p>
                <p className="text-stone-700">
                  <strong className="text-stone-800">Glosa:</strong> {glosaDoc}
                </p>
                <p className="text-stone-700">
                  <strong className="text-stone-800">Tipo:</strong> {clientType === "no_cliente" ? "Lead No Cliente (Cotización Directa)" : "Cliente con Cartera Activa"}
                </p>
                <p className="text-stone-700">
                  <strong className="text-stone-800">Validez:</strong> 7 días corridos desde emisión
                </p>
              </div>
            </div>

            {/* TABLA DE ÍTEMS CON ESTILO MOD JOURNEY SLATE */}
            <div className="overflow-x-auto rounded-xl border border-stone-200">
              <table className="w-full border-collapse text-left text-[11px]">
                <thead>
                  <tr className="bg-stone-900 text-white font-medium">
                    <th className="py-2.5 px-3 text-center w-8">#</th>
                    <th className="py-2.5 px-3">Código</th>
                    <th className="py-2.5 px-3">Cód. Fact.</th>
                    <th className="py-2.5 px-3">Descripción Técnica</th>
                    <th className="py-2.5 px-3 text-center">Cant.</th>
                    <th className="py-2.5 px-3 text-center">U/M</th>
                    <th className="py-2.5 px-3 text-right">Unit. US$</th>
                    <th className="py-2.5 px-3 text-right">Total US$</th>
                    <th className="py-2.5 px-3 text-center w-6 print:hidden"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 bg-white">
                  {lineas.map((line, idx) => (
                    <tr key={line.id} className="hover:bg-stone-50/80 transition-colors">
                      <td className="py-2.5 px-3 text-center font-medium text-stone-500">
                        {idx + 1}
                      </td>
                      <td className="py-2.5 px-3 font-semibold text-stone-900">
                        {line.codigoProducto}
                      </td>
                      <td className="py-2.5 px-3 text-stone-500 font-mono text-[10px]">
                        {line.codFact}
                      </td>
                      <td className="py-2.5 px-3 text-stone-700 max-w-[220px] truncate" title={line.descripcion}>
                        {line.descripcion}
                      </td>
                      <td className="py-2.5 px-3 text-center font-bold text-stone-900">
                        {line.cantidad.toFixed(0)}
                      </td>
                      <td className="py-2.5 px-3 text-center text-stone-500">
                        {line.um}
                      </td>
                      <td className="py-2.5 px-3 text-right text-stone-600">
                        ${line.unitUsd.toFixed(2)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-bold text-stone-900">
                        ${line.totalUsd.toFixed(2)}
                      </td>
                      <td className="py-2.5 px-3 text-center print:hidden">
                        <button
                          onClick={() => handleRemoveLine(line.id)}
                          className="text-stone-300 hover:text-red-600 p-1 transition"
                          title="Quitar línea"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totales y Caja Resaltada con Estilo Elegante */}
            <div className="pt-2 flex flex-col sm:flex-row items-end sm:items-center justify-between gap-4">
              <div className="text-xs text-stone-600 space-y-0.5">
                <p>
                  <strong>Cantidad Total N° Productos:</strong> {totalCantidad.toFixed(0)} un.
                </p>
                <p className="text-[10px] text-stone-500">
                  Precios cotizados en dólares estadounidenses (USD) bajo régimen franco ZOFRI.
                </p>
              </div>

              {/* Caja de Total Elegante (Diseño Stone 900 Mod Journey) */}
              <div className="flex items-center bg-stone-900 text-white px-6 py-3.5 rounded-2xl shadow-md border border-stone-800">
                <span className="text-xs font-bold text-stone-300 uppercase tracking-wider mr-4">
                  Total a Pagar (USD)
                </span>
                <span className="text-xl font-bold font-serif text-white">
                  ${totalUsd.toFixed(2)} US$
                </span>
              </div>
            </div>

            {/* Pie de Firma y Validez */}
            <div className="pt-4 border-t border-stone-200 grid grid-cols-2 text-[10px] text-stone-500 leading-relaxed">
              <div>
                * Cotización formal emitida bajo régimen franco ZOFRI Iquique.<br />
                * Sujeto a verificación física de existencias en Galpón 7 y 8.
              </div>
              <div className="text-right">
                Validez de la oferta: 7 días corridos desde su emisión.<br />
                Firma Autorizada: <strong className="text-stone-800">{vendedorNombre} / VENTAS ZOFRI</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
