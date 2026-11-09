"use client";

import React, { useState } from "react";
import * as XLSX from "xlsx";
import { useApp } from "@/context/AppContext";
import { SAMPLE_KARDEX_DATA, generateSampleExcelBlob, KardexRow } from "@/data/mockKardexSample";
import { formatCLP } from "@/lib/utils";
import {
  FileSpreadsheet,
  UploadCloud,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Download,
  Users,
  ShieldCheck,
  Bot,
  Layers,
  ArrowRight,
  Database,
  Sparkles,
  Search,
  ExternalLink
} from "lucide-react";

export default function AdminPage() {
  const { role, setRole, applyKardexData, etlLogs, products } = useApp();
  const [isProcessing, setIsProcessing] = useState(false);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"etl" | "leads" | "scraper">("etl");

  // Mock pending leads for wholesale accounts
  const [pendingLeads, setPendingLeads] = useState([
    {
      id: "lead-1",
      razonSocial: "Transportes y Grúas Alto Hospicio SpA",
      rut: "77.492.301-8",
      ciudad: "Iquique / Alto Hospicio",
      giro: "Transporte de carga pesada y faenas mineras",
      flota: "34 camiones y camionetas",
      contacto: "Carlos Villalobos (Jefe de Taller)",
      telefono: "+56 9 8412 9931",
      estado: "Pendiente",
    },
    {
      id: "lead-2",
      razonSocial: "Serviteca Automotriz Tarapacá E.I.R.L.",
      rut: "76.104.982-1",
      ciudad: "Iquique",
      giro: "Mantenimiento preventivo multimarca",
      flota: "Atención 12 vehículos diarios",
      contacto: "Marcela Pizarro",
      telefono: "+56 9 7721 4452",
      estado: "Pendiente",
    },
    {
      id: "lead-3",
      razonSocial: "Distribuidora de Repuestos El Faro Ltda.",
      rut: "78.912.003-4",
      ciudad: "Arica",
      giro: "Venta mayorista repuestos",
      flota: "Local comercial y taller",
      contacto: "Jorge Araya",
      telefono: "+56 9 6554 1290",
      estado: "Pendiente",
    },
  ]);

  const handleApproveLead = (id: string) => {
    setPendingLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, estado: "Aprobado (RUT Validado)" } : l))
    );
  };

  const handleRejectLead = (id: string) => {
    setPendingLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, estado: "Rechazado (Pasa a Catálogo Ciego)" } : l))
    );
  };

  // Drag & drop file ingestion
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processExcelFile(file);
  };

  const processExcelFile = (file: File) => {
    setIsProcessing(true);
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json<any>(ws);

        // Normalize rows to KardexRow format
        const normalizedRows: KardexRow[] = data.map((r, i) => ({
          COD_ARTICULO: r.COD_ARTICULO || r.CODIGO || r.SKU || `SKU-AUTO-${i}`,
          COD_OEM: r.COD_OEM || r.OEM || "OEM-GENERIC",
          DESCRIPCION_MULTIEDICION: r.DESCRIPCION_MULTIEDICION || r.DESCRIPCION || "Repuesto Automotriz",
          MARCA_REPUESTO: r.MARCA_REPUESTO || r.MARCA || "Osakansai",
          APLICACION_VEHICULAR: r.APLICACION_VEHICULAR || r.APLICACION || "Multimarca",
          PRECIO_VENTA_NETO: Number(r.PRECIO_VENTA_NETO || r.PRECIO || 19900),
          STOCK_BODEGA_ZOFRI: Number(r.STOCK_BODEGA_ZOFRI || r.STOCK || 10),
          ESTADO: "ACTIVO",
          ORIGEN: r.ORIGEN || "Japón",
        }));

        setTimeout(() => {
          const res = applyKardexData(normalizedRows, file.name);
          setIsProcessing(false);
          setSuccessNotice(
            `¡Pipeline ETL Exitoso! Se sincronizaron ${res.updated} SKUs existentes y se incorporaron ${res.newItems} nuevos repuestos desde "${file.name}".`
          );
        }, 1200);
      } catch (err) {
        setIsProcessing(false);
        alert("Error procesando archivo Excel. Formato no compatible.");
      }
    };
    reader.readAsBinaryString(file);
  };

  // Run mock sample Kardex
  const handleRunSampleKardex = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const res = applyKardexData(SAMPLE_KARDEX_DATA, "Kardex_Diario_Multiem_Simulado.xlsx");
      setIsProcessing(false);
      setSuccessNotice(
        `¡Simulación ETL Completada! Se actualizaron precios y existencias de ${res.updated} SKUs en ZOFRI (incluyendo reabastecimiento de piezas en backorder).`
      );
    }, 1200);
  };

  // Download Sample Excel
  const handleDownloadSampleExcel = () => {
    const blob = generateSampleExcelBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Plantilla_Kardex_Multiem_Daisekai.xlsx";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-slate-950 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-400 text-xs font-semibold border border-emerald-800/60 mb-2">
              <Database className="w-3.5 h-3.5" />
              Consola Administrativa &bull; Módulo ERP / ETL
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">
              Ingeniería de Automatización Daisekai
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Conexión directa con ERP Multiem mediante ingestión Drag & Drop, normalización de datos y scoring de leads B2B.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("etl")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                activeTab === "etl"
                  ? "bg-blue-600 text-white shadow"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Pipeline ETL Multiem</span>
            </button>

            <button
              onClick={() => setActiveTab("leads")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                activeTab === "leads"
                  ? "bg-blue-600 text-white shadow"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Aprobación Leads ({pendingLeads.filter((l) => l.estado === "Pendiente").length})</span>
            </button>

            <button
              onClick={() => setActiveTab("scraper")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                activeTab === "scraper"
                  ? "bg-blue-600 text-white shadow"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              <Bot className="w-4 h-4" />
              <span>Scraper de Imágenes</span>
            </button>
          </div>
        </div>

        {/* TAB 1: ETL MULTIEM */}
        {activeTab === "etl" && (
          <div className="space-y-8 animate-fade-in">
            {/* Success notification */}
            {successNotice && (
              <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-200 text-xs flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>{successNotice}</span>
                </div>
                <button
                  onClick={() => setSuccessNotice(null)}
                  className="text-emerald-400 hover:text-white font-bold"
                >
                  &times;
                </button>
              </div>
            )}

            {/* Ingestion Dropzone & Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Dropzone */}
              <div className="lg:col-span-7 bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <UploadCloud className="w-5 h-5 text-blue-400" />
                      Carga Masiva Kardex Multiem (.xlsx / .xls)
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Arrastra la exportación diaria de Multiem para actualizar stock y precios de los 26.000 SKUs.
                    </p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800 font-mono">
                    Parser Excel 2007
                  </span>
                </div>

                <div className="border-2 border-dashed border-slate-700 hover:border-blue-500 rounded-2xl p-8 text-center bg-slate-950/50 transition cursor-pointer relative group">
                  <input
                    type="file"
                    accept=".xlsx, .xls, .csv"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={isProcessing}
                  />
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="w-14 h-14 rounded-2xl bg-blue-600/10 text-blue-400 flex items-center justify-center group-hover:scale-110 transition border border-blue-500/20">
                      {isProcessing ? (
                        <RefreshCw className="w-7 h-7 animate-spin" />
                      ) : (
                        <FileSpreadsheet className="w-7 h-7" />
                      )}
                    </div>
                    <div>
                      <span className="text-sm font-bold text-white block">
                        {isProcessing
                          ? "Procesando y normalizando catálogo..."
                          : "Haz clic para seleccionar o arrastra el archivo Excel aquí"}
                      </span>
                      <span className="text-xs text-slate-400">
                        Compatible con exportaciones de Multiem, Softland o Kardex estándar
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Action Simulation Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <button
                    onClick={handleRunSampleKardex}
                    disabled={isProcessing}
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-2"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isProcessing ? "animate-spin" : ""}`} />
                    <span>Ejecutar Simulación Kardex Diario</span>
                  </button>

                  <button
                    onClick={handleDownloadSampleExcel}
                    className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700 transition flex items-center gap-2"
                  >
                    <Download className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Descargar Plantilla Excel Multiem</span>
                  </button>
                </div>
              </div>

              {/* Real-time Technical Specs of ETL */}
              <div className="lg:col-span-5 bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h4 className="font-bold text-sm text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    Reglas del Motor ETL (Aerys IT)
                  </h4>
                  <span className="text-[10px] text-emerald-400 font-mono">Activo</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="font-semibold text-slate-200 flex items-center justify-between">
                      <span>Corrección de Caracteres Corruptos</span>
                      <span className="text-emerald-400 font-mono">UTF-8 / ISO</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Limpia automáticamente tildes rotas, comillas y caracteres extraños generados por versiones antiguas de Excel 2007.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="font-semibold text-slate-200 flex items-center justify-between">
                      <span>Mapeo Cruzado OEM</span>
                      <span className="text-blue-400 font-mono">Normalizado</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Elimina guiones y espacios espurios (ej. transforma &apos;04465 - 0K260&apos; a &apos;04465-0K260&apos; para búsqueda exacta).
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="font-semibold text-slate-200 flex items-center justify-between">
                      <span>Upsert Reactivo en Memoria</span>
                      <span className="text-cyan-400 font-mono">&lt; 150ms</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Actualiza el inventario visible para clientes mayoristas de forma inmediata sin caída de servicio.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ETL Logs Table */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <Database className="w-4 h-4 text-blue-400" />
                  Registro de Ingestiones & Sincronizaciones Multiem
                </h3>
                <span className="text-xs text-slate-400">
                  Total de ejecuciones: {etlLogs.length}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-2.5 px-3">Fecha y Hora</th>
                      <th className="py-2.5 px-3">Archivo Origen</th>
                      <th className="py-2.5 px-3 text-center">Registros Procesados</th>
                      <th className="py-2.5 px-3 text-center">SKUs Actualizados</th>
                      <th className="py-2.5 px-3 text-center">Errores Corregidos</th>
                      <th className="py-2.5 px-3 text-right">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono text-[11px]">
                    {etlLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-800/40">
                        <td className="py-3 px-3 text-slate-300">{log.timestamp}</td>
                        <td className="py-3 px-3 text-blue-400 font-semibold font-sans">
                          {log.filename}
                        </td>
                        <td className="py-3 px-3 text-center text-slate-300">
                          {log.recordsCount.toLocaleString("es-CL")}
                        </td>
                        <td className="py-3 px-3 text-center text-emerald-400 font-bold">
                          {log.updatedSkus.toLocaleString("es-CL")}
                        </td>
                        <td className="py-3 px-3 text-center text-amber-400">
                          {log.characterFixes} chars
                        </td>
                        <td className="py-3 px-3 text-right font-sans">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800">
                            <CheckCircle2 className="w-3 h-3" /> Exitoso
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LEADS MAYORISTAS */}
        {activeTab === "leads" && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-base text-white flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-400" />
                    Solicitudes de Validación Mayorista B2B (Lead Scoring)
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    El Administrador aprueba o rechaza empresas. Los clientes rechazados navegan los 26.000 SKUs a modo de vitrina ciega.
                  </p>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-950 text-blue-400 border border-blue-800">
                  {pendingLeads.filter((l) => l.estado === "Pendiente").length} Pendientes
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 pt-2">
                {pendingLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="p-5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-bold text-white">
                          {lead.razonSocial}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px] font-mono border border-slate-700">
                          RUT: {lead.rut}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            lead.estado.includes("Aprobado")
                              ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                              : lead.estado.includes("Rechazado")
                              ? "bg-rose-950 text-rose-400 border border-rose-800"
                              : "bg-amber-950 text-amber-400 border border-amber-800"
                          }`}
                        >
                          {lead.estado}
                        </span>
                      </div>

                      <div className="text-xs text-slate-400 flex flex-wrap gap-x-4 gap-y-1">
                        <span>
                          <strong>Giro:</strong> {lead.giro}
                        </span>
                        <span>
                          <strong>Ciudad:</strong> {lead.ciudad}
                        </span>
                        <span>
                          <strong>Flota:</strong> {lead.flota}
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-500">
                        Contacto: {lead.contacto} &bull; Teléfono: {lead.telefono}
                      </div>
                    </div>

                    {lead.estado === "Pendiente" && (
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleApproveLead(lead.id)}
                          className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow transition flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Aprobar Mayorista</span>
                        </button>
                        <button
                          onClick={() => handleRejectLead(lead.id)}
                          className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 hover:text-rose-300 text-slate-400 font-semibold text-xs border border-slate-700 transition"
                        >
                          <span>Rechazar (Ciego)</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SCRAPER INTELIGENTE */}
        {activeTab === "scraper" && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h3 className="font-bold text-base text-white flex items-center gap-2">
                    <Bot className="w-5 h-5 text-cyan-400" />
                    Robot Autónomo de Asociación Visual (Scraper OEM)
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Resuelve el desafío de los 26.000 SKUs sin fotografías: rastrea bases internacionales y asigna imágenes de alta definición.
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 text-xs font-semibold border border-cyan-800">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Bot en Ejecución
                </span>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-xs text-slate-400">Total SKUs Indexados</div>
                  <div className="text-2xl font-black text-white mt-1">26.140</div>
                  <div className="text-[10px] text-emerald-400 mt-0.5">100% de la base</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-xs text-slate-400">Fotografías Vinculadas</div>
                  <div className="text-2xl font-black text-cyan-400 mt-1">24.620</div>
                  <div className="text-[10px] text-cyan-300 mt-0.5">94.2% de cobertura</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-xs text-slate-400">Ahorro Horas Hombre (HH)</div>
                  <div className="text-2xl font-black text-amber-400 mt-1">1.300 HH</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Equivalente a 7 meses</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-xs text-slate-400">Almacenamiento Cloud</div>
                  <div className="text-2xl font-black text-purple-400 mt-1">CDN Optimizado</div>
                  <div className="text-[10px] text-purple-300 mt-0.5">WebP / Web Ready</div>
                </div>
              </div>

              {/* Scraper Log Activity */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Actividad Reciente del Crawler
                </h4>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] space-y-1.5 text-slate-400">
                  <div className="text-emerald-400">
                    [08:32:10] Match exacto OEM 04465-0K260 -&gt; Descargado asset y vinculado a SKU OSK-BP-7701
                  </div>
                  <div className="text-emerald-400">
                    [08:32:14] Match exacto OEM 30100-4KH0A -&gt; Descargado asset y vinculado a SKU OSK-CL-3310
                  </div>
                  <div className="text-cyan-400">
                    [08:32:19] Redimensión a 800x800 WebP y subida a bucket almacenamiento Aerys Cloud
                  </div>
                  <div className="text-slate-500">
                    [08:32:25] Escaneo en pausa preventiva para evitar rate limits externos
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
