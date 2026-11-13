"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { formatCLP } from "@/lib/utils";
import { Product } from "@/data/mockProducts";
import { ChicureoModal } from "@/components/ChicureoModal";
import { CartProformaDrawer } from "@/components/CartProformaDrawer";
import { ClientProfileView } from "@/components/ClientProfileView";
import { VendedorCotizador } from "@/components/VendedorCotizador";
import { VendedorCarteraClientes } from "@/components/VendedorCarteraClientes";
import { VendedorInventarioSubido } from "@/components/VendedorInventarioSubido";
import { VehiculoIdentificadorBot } from "@/components/VehiculoIdentificadorBot";
import { AdminGestionPedidos } from "@/components/AdminGestionPedidos";
import { EditProductModal } from "@/components/EditProductModal";
import { SAMPLE_KARDEX_DATA, KardexRow } from "@/data/mockKardexSample";
import { generateManualFlujoPDF } from "@/lib/pdfGenerator";
import * as XLSX from "xlsx";
import {
  Search,
  Filter,
  Lock,
  Unlock,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Building,
  UserCheck,
  FileSpreadsheet,
  Users,
  ShoppingBag,
  RefreshCw,
  ArrowRight,
  ShieldCheck,
  Car,
  Image as ImageIcon,
  SlidersHorizontal,
  LogOut,
  Snowflake,
  ClipboardList,
  History,
  FileText,
  User,
  Layers,
  Wrench,
  Package,
  Clock,
  Send,
  Download,
  Edit3,
  Calendar,
  Sparkles,
  Truck,
  X
} from "lucide-react";

export default function PortalPage() {
  const {
    role,
    setRole,
    clientApprovalStatus,
    setClientApprovalStatus,
    products,
    cart,
    addToCart,
    orderSummary,
    clientProfile,
    searchQuery,
    setSearchQuery,
    applyKardexData,
    addToast
  } = useApp();

  // Modales
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sub-vistas para el rol de Cliente
  const [clientSubView, setClientSubView] = useState<"catalogo" | "perfil">("catalogo");

  // Sub-vistas para el rol de Vendedor (4 apartados independientes)
  const [vendedorSubView, setVendedorSubView] = useState<
    "cotizaciones" | "kardex_etl" | "cartera" | "inventario_subido"
  >("cotizaciones");

  // Sub-vistas para el rol de Administrador
  const [adminSubView, setAdminSubView] = useState<"solicitudes" | "pedidos">("solicitudes");

  // Filtros del catálogo
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("Todos");
  const [selectedBrand, setSelectedBrand] = useState<string>("Todos");
  const [selectedOrigin, setSelectedOrigin] = useState<string>("Todos");
  const [selectedYearRange, setSelectedYearRange] = useState<string>("Todos");

  // Autocompletado inteligente
  const [showAutocomplete, setShowAutocomplete] = useState<boolean>(false);

  // Filtro de evaluación de administrador con 3 apartados
  const [adminFilter, setAdminFilter] = useState<
    "cuenta_nueva" | "solicitud_admin" | "registro_cambios"
  >("cuenta_nueva");

  // Estado para el módulo ETL en rol Vendedor
  const [isProcessingEtl, setIsProcessingEtl] = useState(false);

  // Solicitudes administrativas estructuradas
  const [adminRequests, setAdminRequests] = useState([
    {
      id: "req-1",
      tipo: "cuenta_nueva",
      titulo: "Solicitud Apertura Cuenta B2B",
      entidad: "Transportes y Grúas Alto Hospicio SpA",
      rut: "77.492.301-8",
      detalle: "Flota de 34 camiones y camionetas mineras. Solicitan línea comercial.",
      contacto: "Carlos Villalobos (Jefe de Taller) - +56 9 8412 9931",
      correo: "carlos.villalobos@transportes-ah.cl",
      estado: "Pendiente",
      fecha: "Hoy, 10:15 AM",
    },
    {
      id: "req-2",
      tipo: "cuenta_nueva",
      titulo: "Solicitud Registro Taller Mecánico",
      entidad: "Serviteca Automotriz Tarapacá E.I.R.L.",
      rut: "76.104.982-1",
      detalle: "Mantenimiento preventivo multimarca en Iquique. 12 vehículos diarios.",
      contacto: "Marcela Pizarro - +56 9 7721 4452",
      correo: "contacto@servitecatarapaca.cl",
      estado: "Pendiente",
      fecha: "Hoy, 11:40 AM",
    },
    {
      id: "req-3",
      tipo: "solicitud_admin",
      titulo: "Ampliación de Cupo Crédito 30 Días",
      entidad: "Servicios Mecánicos y Flotas del Norte SpA",
      rut: "76.842.190-K",
      detalle: "Solicitan ampliar línea crediticia de $45M a $60M por contrato minero.",
      contacto: "Rodrigo Morales (Gerente de Finanzas)",
      correo: "rmorales@flotasnorte.cl",
      estado: "Pendiente",
      fecha: "Ayer, 16:30 PM",
    },
    {
      id: "req-4",
      tipo: "solicitud_admin",
      titulo: "Convenio Especial Flete Pesado Internacional",
      entidad: "Distribuidora de Repuestos El Faro Ltda.",
      rut: "78.912.003-4",
      detalle: "Despacho consolidado en camiones pesados Trans-Bolivia para tambores y amortiguadores a Arica.",
      contacto: "Jorge Araya - +56 9 6554 1290",
      correo: "jaraya@repuestoselfaro.cl",
      estado: "Pendiente",
      fecha: "08 Nov 2026",
    },
    {
      id: "req-5",
      tipo: "registro_cambios",
      titulo: "Actualización Dirección Tributaria y Despacho",
      entidad: "Maestranza y Repuestos Tamarugal S.A.",
      rut: "79.231.400-2",
      detalle: "Cambio de terminal de recepción a Parque Industrial Pozo Almonte.",
      contacto: "Felipe Saavedra",
      correo: "fsaavedra@tamarugal.cl",
      estado: "Pendiente",
      fecha: "07 Nov 2026",
    },
    {
      id: "req-6",
      tipo: "registro_cambios",
      titulo: "Modificación de Poderes de Compra y Facturación",
      entidad: "Transportes TransAtacama Ltda.",
      rut: "76.332.110-5",
      detalle: "Designación de nuevo Encargado de Adquisiciones y Facturación DTE.",
      contacto: "Andrea Valdés",
      correo: "avaldes@transatacama.cl",
      estado: "Pendiente",
      fecha: "06 Nov 2026",
    },
  ]);

  const categories = [
    "Todos",
    "Cilindros y Frenos",
    "Empaques y Culatas",
    "Embragues y Transmisión",
    "Amortiguadores y Suspensión",
    "Cremalleras y Dirección",
    "Cables de Bujía y Eléctrico",
    "Bombas y Filtros",
  ];

  const subcategories = [
    "Todos",
    "Pastillas Cerámicas HD",
    "Cilindros de Rueda",
    "Cilindros Maestros de Freno",
    "Empaquetaduras de Culata MLS",
    "Discos de Embrague HD",
    "Kits de Embrague Prensa",
    "Amortiguadores a Gas Doble Tubo",
    "Cremalleras Hidráulicas",
    "Alternadores y Motores de Partida",
    "Cables de Bujía Siliconados",
  ];

  const brandOptions = [
    "Todos",
    "Toyota",
    "Nissan",
    "Hyundai",
    "Kia",
    "Mitsubishi",
    "Mazda",
    "Suzuki",
    "Isuzu",
    "Subaru",
  ];

  const origins = ["Todos", "Japón", "Corea del Sur", "Tailandia (OEM)"];

  const yearRanges = [
    "Todos",
    "2016-2024 (Revo / Recientes)",
    "2006-2015 (KUN26 / D40)",
    "1998-2005 (Clásicos)",
  ];

  // Filtrado de productos en catálogo
  const filteredProducts = products.filter((p) => {
    const q = searchQuery.toLowerCase().trim();
    const matchQuery =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.oem.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.subcategory && p.subcategory.toLowerCase().includes(q)) ||
      (p.patenteMarca && p.patenteMarca.toLowerCase().includes(q)) ||
      (p.patenteModelo && p.patenteModelo.toLowerCase().includes(q)) ||
      (p.patenteChasis && p.patenteChasis.toLowerCase().includes(q)) ||
      (p.codigoMarutomo && p.codigoMarutomo.toLowerCase().includes(q)) ||
      p.oemCrossReference.some((c) => c.toLowerCase().includes(q)) ||
      p.vehicleCompatibility.some((v) => v.toLowerCase().includes(q)) ||
      p.vinPrefix.some((v) => v.toLowerCase().includes(q));

    const matchCategory =
      selectedCategory === "Todos" || p.category === selectedCategory;

    const matchSubcategory =
      selectedSubcategory === "Todos" || p.subcategory === selectedSubcategory;

    const matchBrand =
      selectedBrand === "Todos" ||
      p.vehicleCompatibility.some((v) =>
        v.toLowerCase().includes(selectedBrand.toLowerCase())
      ) ||
      (p.patenteMarca && p.patenteMarca.toLowerCase().includes(selectedBrand.toLowerCase()));

    const matchOrigin =
      selectedOrigin === "Todos" ||
      p.origin.toLowerCase().includes(selectedOrigin.toLowerCase());

    const matchYear =
      selectedYearRange === "Todos" ||
      (selectedYearRange.includes("2016-2024") && (p.patenteAnio?.includes("2016") || p.vehicleCompatibility.some((v) => v.includes("2016") || v.includes("2020")))) ||
      (selectedYearRange.includes("2006-2015") && (p.patenteAnio?.includes("2006") || p.vehicleCompatibility.some((v) => v.includes("2006") || v.includes("2012")))) ||
      (selectedYearRange.includes("1998-2005") && (p.patenteAnio?.includes("1998") || p.vehicleCompatibility.some((v) => v.includes("1998") || v.includes("2003"))));

    return matchQuery && matchCategory && matchSubcategory && matchBrand && matchOrigin && matchYear;
  });

  // Sugerencias de autocompletado
  const autocompleteSuggestions = searchQuery.trim().length >= 2
    ? products
        .filter((p) =>
          p.oem.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.patenteChasis && p.patenteChasis.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (p.patenteModelo && p.patenteModelo.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        .slice(0, 5)
    : [];

  // Manejo de archivo Excel 2007 para el Kardex
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessingEtl(true);
    addToast(
      "Ingestión Kardex Multiem Iniciada",
      `Leyendo archivo ${file.name}. Ejecutando normalización de codificación y mapeo de catálogo...`,
      "info"
    );

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json<KardexRow>(ws);

        setTimeout(() => {
          applyKardexData(data, file.name);
          setIsProcessingEtl(false);
        }, 1200);
      } catch (err) {
        setIsProcessingEtl(false);
        addToast(
          "Error en Ingestión",
          "No se pudo normalizar el archivo Excel 2007. Verifique la estructura de columnas.",
          "warning"
        );
      }
    };
    reader.readAsBinaryString(file);
  };

  const handleSimularKardex = () => {
    setIsProcessingEtl(true);
    addToast(
      "Pipeline de Normalización Activo",
      "Procesando lote Kardex diario Excel 2007 con limpieza UTF-8 y estandarización OEM...",
      "info"
    );
    setTimeout(() => {
      applyKardexData(SAMPLE_KARDEX_DATA, "Kardex_Diario_Multiem_09112026.xlsx");
      setIsProcessingEtl(false);
    }, 1100);
  };

  const handleApproveRequest = (id: string) => {
    setAdminRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, estado: "Aprobado" } : r))
    );
    addToast("Solicitud Aprobada", "La solicitud fue aprobada e incorporada a la base comercial.", "success");
  };

  const handleRejectRequest = (id: string) => {
    setAdminRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, estado: "Rechazado" } : r))
    );
    addToast("Solicitud Rechazada", "La solicitud fue desestimada por la administración.", "info");
  };

  const filteredRequests = adminRequests.filter((r) => r.tipo === adminFilter);

  return (
    <div className="bg-[#FBF9F5] min-h-screen py-8 text-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* ================= BARRA SUPERIOR DE CONTROL POR ROL ================= */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-xl font-bold font-serif text-stone-900">
                  DAISEKAI
                </span>
                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest bg-stone-100 px-2.5 py-0.5 rounded-full border border-stone-200">
                  PORTAL B2B OFICIAL
                </span>
              </div>
              <p className="text-xs text-stone-500 font-light mt-0.5">
                Plataforma mayorista de repuestos automotrices &bull; ZOFRI Iquique
              </p>
            </div>

            {/* BOTONES DE VISTA POR ROL */}
            <div className="flex flex-wrap items-center gap-2 bg-[#F6F4EE] p-1.5 rounded-2xl border border-stone-200">
              <button
                onClick={() => setRole("b2b_client")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  role === "b2b_client"
                    ? "bg-stone-900 text-white shadow-xs"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                <Building className="w-3.5 h-3.5 text-stone-300" />
                <span>1. Rol Cliente Mayorista</span>
              </button>

              <button
                onClick={() => setRole("vendedor")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  role === "vendedor"
                    ? "bg-stone-900 text-white shadow-xs"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                <UserCheck className="w-3.5 h-3.5 text-stone-300" />
                <span>2. Rol Vendedor (Cotizaciones & Kardex)</span>
              </button>

              <button
                onClick={() => setRole("admin_vendor")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  role === "admin_vendor"
                    ? "bg-stone-900 text-white shadow-xs"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                <ClipboardList className="w-3.5 h-3.5 text-stone-300" />
                <span>3. Rol Administrador (Evaluación & Pedidos)</span>
              </button>

              <button
                onClick={() => {
                  generateManualFlujoPDF();
                  addToast(
                    "Manual B2B Descargado",
                    "Descargando el Manual Técnico y Operativo del Sistema Daisekai B2B con marca de agua oficial.",
                    "success"
                  );
                }}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 shadow-2xs transition flex items-center gap-1.5"
                title="Descargar Manual Técnico y Operativo de Flujo (PDF)"
              >
                <Download className="w-3.5 h-3.5 text-stone-700" />
                <span>Manual de Flujo (PDF)</span>
              </button>

              <Link
                href="/"
                className="p-2 text-stone-400 hover:text-stone-800 transition"
                title="Volver a la landing pública"
              >
                <LogOut className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* BARRA INTERNA EN ROL CLIENTE */}
          {role === "b2b_client" && (
            <div className="pt-3 border-t border-stone-100 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-[#F6F4EE]/70 p-4 rounded-2xl">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setClientSubView("catalogo")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                    clientSubView === "catalogo"
                      ? "bg-stone-900 text-white shadow-xs"
                      : "bg-white text-stone-700 hover:bg-stone-100 border border-stone-200"
                  }`}
                >
                  <Package className="w-3.5 h-3.5" />
                  <span>Catálogo Mayorista (5 Columnas)</span>
                </button>

                <button
                  onClick={() => setClientSubView("perfil")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                    clientSubView === "perfil"
                      ? "bg-stone-900 text-white shadow-xs"
                      : "bg-white text-stone-700 hover:bg-stone-100 border border-stone-200"
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Mi Perfil & Cuenta Corriente B2B</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${
                    clientApprovalStatus === "aprobado"
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                      : "bg-amber-100 text-amber-800 border border-amber-200"
                  }`}
                >
                  {clientApprovalStatus === "aprobado"
                    ? "✓ Aprobado (Precios Visibles)"
                    : "⏳ Sin Aprobar (Precios Ocultos)"}
                </span>

                <button
                  onClick={() =>
                    setClientApprovalStatus(
                      clientApprovalStatus === "aprobado" ? "sin_aprobar" : "aprobado"
                    )
                  }
                  className="px-3 py-1.5 rounded-full bg-white border border-stone-300 text-stone-700 text-xs font-bold hover:bg-stone-50 transition shadow-2xs"
                  title="Alternar estado para demostración"
                >
                  {clientApprovalStatus === "aprobado"
                    ? "Simular: Sin Aprobar"
                    : "Simular: Aprobado"}
                </button>

                {clientApprovalStatus === "aprobado" && (
                  <button
                    onClick={() => setIsCartOpen(true)}
                    className="ml-2 px-4 py-1.5 rounded-full bg-stone-900 text-white text-xs font-bold flex items-center gap-2 shadow-xs hover:bg-stone-800 transition"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-cyan-300" />
                    <span>Mi Carrito ({cart.reduce((a, b) => a + b.quantity, 0)})</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* BARRA INTERNA EN ROL VENDEDOR */}
          {role === "vendedor" && (
            <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center gap-2 bg-[#F6F4EE]/70 p-3 rounded-2xl">
              <span className="text-xs font-bold text-stone-600 mr-2">
                Apartados del Vendedor:
              </span>

              <button
                onClick={() => setVendedorSubView("cotizaciones")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  vendedorSubView === "cotizaciones"
                    ? "bg-stone-900 text-white shadow-xs"
                    : "bg-white text-stone-700 hover:bg-stone-100 border border-stone-200"
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>1. Cotizaciones & Proformas (Multiem)</span>
              </button>

              <button
                onClick={() => setVendedorSubView("kardex_etl")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  vendedorSubView === "kardex_etl"
                    ? "bg-stone-900 text-white shadow-xs"
                    : "bg-white text-stone-700 hover:bg-stone-100 border border-stone-200"
                }`}
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>2. Ingestión Kardex (Excel 2007)</span>
              </button>

              <button
                onClick={() => setVendedorSubView("cartera")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  vendedorSubView === "cartera"
                    ? "bg-stone-900 text-white shadow-xs"
                    : "bg-white text-stone-700 hover:bg-stone-100 border border-stone-200"
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>3. Cartera de Clientes</span>
              </button>

              <button
                onClick={() => setVendedorSubView("inventario_subido")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  vendedorSubView === "inventario_subido"
                    ? "bg-stone-900 text-white shadow-xs"
                    : "bg-white text-stone-700 hover:bg-stone-100 border border-stone-200"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>4. Inventario Subido Kardex</span>
              </button>
            </div>
          )}

          {/* BARRA INTERNA EN ROL ADMINISTRADOR */}
          {role === "admin_vendor" && (
            <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center gap-2 bg-[#F6F4EE]/70 p-3 rounded-2xl">
              <span className="text-xs font-bold text-stone-600 mr-2">
                Módulos de Administración:
              </span>

              <button
                onClick={() => setAdminSubView("solicitudes")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  adminSubView === "solicitudes"
                    ? "bg-stone-900 text-white shadow-xs"
                    : "bg-white text-stone-700 hover:bg-stone-100 border border-stone-200"
                }`}
              >
                <ClipboardList className="w-3.5 h-3.5" />
                <span>1. Evaluación de Solicitudes (3 Filtros)</span>
              </button>

              <button
                onClick={() => setAdminSubView("pedidos")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  adminSubView === "pedidos"
                    ? "bg-stone-900 text-white shadow-xs"
                    : "bg-white text-stone-700 hover:bg-stone-100 border border-stone-200"
                }`}
              >
                <Truck className="w-3.5 h-3.5" />
                <span>2. Gestión Central de Pedidos & Despachos ZOFRI</span>
              </button>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* ======================= ROL 1: CLIENTE MAYORISTA ======================== */}
        {/* ========================================================================= */}
        {role === "b2b_client" && (
          <div>
            {clientSubView === "perfil" ? (
              <ClientProfileView
                onBackToCatalog={() => setClientSubView("catalogo")}
                onOpenCart={() => setIsCartOpen(true)}
              />
            ) : (
              <div className="space-y-8 animate-in fade-in duration-300">
                {/* 1. BOT IDENTIFICADOR CLAVE DE VEHÍCULO (PATENTE, MODELO, CHASIS, MOTOR) */}
                <VehiculoIdentificadorBot onVehicleSelected={(k) => setSearchQuery(k)} />

                {clientApprovalStatus === "sin_aprobar" && (
                  <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
                      <div>
                        <strong className="block text-sm font-bold text-amber-950 font-serif">
                          Cuenta en proceso de evaluación por Administración
                        </strong>
                        Su cuenta se encuentra registrada. Los precios netos y la emisión de pedidos se activarán tras la verificación de antecedentes tributarios.
                      </div>
                    </div>
                    <button
                      onClick={() => setClientApprovalStatus("aprobado")}
                      className="px-4 py-2 bg-amber-700 text-white font-bold rounded-full shrink-0 text-xs shadow-xs"
                    >
                      Aprobar Cuenta (Simulación)
                    </button>
                  </div>
                )}

                {/* 2. CUADRO DE BÚSQUEDA TÉCNICA CON AUTOCOMPLETADO Y FILTROS POR CATEGORÍA Y AÑO */}
                <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-5 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-4">
                    <div>
                      <h3 className="text-base font-bold text-stone-900 font-serif">
                        Consola de Búsqueda Técnica Multiem
                      </h3>
                      <p className="text-xs text-stone-500 font-light">
                        Filtre por código OEM, Chasis (VIN), Código Marutomo, Motor, Año o Subcategoría
                      </p>
                    </div>
                    <span className="text-xs font-bold text-stone-400 font-mono">
                      {filteredProducts.length} Repuestos Coincidentes
                    </span>
                  </div>

                  {/* Input de Búsqueda con Menú Flotante de Autocompletado */}
                  <div className="relative">
                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setShowAutocomplete(true);
                        }}
                        onFocus={() => setShowAutocomplete(true)}
                        placeholder="Buscar por OEM (04465-0K260), Chasis VIN (MR0HA3CD), Marutomo, Hilux, Navara, D4HB..."
                        className="w-full pl-11 pr-10 py-3.5 bg-[#F6F4EE] border border-stone-200 rounded-2xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 transition font-medium"
                      />
                      <Search className="w-5 h-5 text-stone-400 absolute left-4 top-3.5" />
                      {searchQuery && (
                        <button
                          onClick={() => {
                            setSearchQuery("");
                            setShowAutocomplete(false);
                          }}
                          className="absolute right-3.5 top-3.5 text-stone-400 hover:text-stone-700 p-0.5"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* Menú de Autocompletado Instantáneo */}
                    {showAutocomplete && autocompleteSuggestions.length > 0 && (
                      <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl border border-stone-200 shadow-xl z-30 p-2 space-y-1 animate-in fade-in duration-150">
                        <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-400 font-mono">
                          Sugerencias de Catálogo en Vivo:
                        </div>
                        {autocompleteSuggestions.map((sug) => (
                          <div
                            key={sug.id}
                            onClick={() => {
                              setSearchQuery(sug.oem);
                              setShowAutocomplete(false);
                            }}
                            className="p-2.5 rounded-xl hover:bg-[#F6F4EE] cursor-pointer flex items-center justify-between text-xs transition"
                          >
                            <div className="space-y-0.5">
                              <div className="font-bold text-stone-900">
                                {sug.title}
                              </div>
                              <div className="text-[11px] text-stone-500 font-mono">
                                OEM: <strong className="text-stone-800">{sug.oem}</strong> &bull; Chasis: {sug.patenteChasis} &bull; Modelo: {sug.patenteModelo}
                              </div>
                            </div>
                            <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-stone-100 text-stone-700 shrink-0">
                              {sug.sku}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Desplegables de filtros: Categoría, Subcategoría, Marca, Año, Procedencia */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-1">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1">
                        Línea / Rubro:
                      </label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none"
                      >
                        {categories.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1">
                        Subcategoría:
                      </label>
                      <select
                        value={selectedSubcategory}
                        onChange={(e) => setSelectedSubcategory(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none"
                      >
                        {subcategories.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1">
                        Fabricante Vehicular:
                      </label>
                      <select
                        value={selectedBrand}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none"
                      >
                        {brandOptions.map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1">
                        Año Compatibilidad:
                      </label>
                      <select
                        value={selectedYearRange}
                        onChange={(e) => setSelectedYearRange(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none"
                      >
                        {yearRanges.map((y) => (
                          <option key={y} value={y}>{y}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1">
                        Origen de Fábrica:
                      </label>
                      <select
                        value={selectedOrigin}
                        onChange={(e) => setSelectedOrigin(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none"
                      >
                        {origins.map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* 3. GRILLA EN FILA DE 5 COLUMNAS */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-stone-400 font-mono">
                      Catálogo Mayorista (Fila de 5 ítems &bull; Haga clic en cualquier repuesto para ver ficha Chicureo 200)
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    {filteredProducts.map((item) => {
                      const isOutOfStock = item.stock <= 0;
                      return (
                        <div
                          key={item.id}
                          onClick={() => setSelectedProduct(item)}
                          className="group cursor-pointer bg-white rounded-2xl border border-stone-200 hover:border-stone-400 p-4 shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                        >
                          <div className="aspect-square rounded-xl bg-[#F6F4EE] border border-stone-200/80 mb-3 flex flex-col items-center justify-center p-3 text-center overflow-hidden relative">
                            <ImageIcon className="w-8 h-8 text-stone-400 mb-1 group-hover:scale-110 transition duration-300" />
                            <span className="text-[9px] font-bold uppercase tracking-wider text-stone-600 font-mono">
                              ESPACIO PARA FOTO OEM
                            </span>
                            <span className="text-[8px] text-stone-400 font-mono mt-0.5">
                              {item.codigoMarutomo}
                            </span>

                            <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-white/95 text-[9px] font-bold font-mono text-stone-700 border border-stone-200 shadow-2xs">
                              {item.sku}
                            </span>

                            {item.isOsakansaiBrand && (
                              <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-blue-50 text-[8px] font-bold text-blue-800 border border-blue-200">
                                Osakansai
                              </span>
                            )}
                          </div>

                          <div className="space-y-1.5 flex-1 flex flex-col justify-between">
                            <div>
                              <div className="text-[10px] font-mono text-stone-500 font-medium">
                                OEM: {item.oem}
                              </div>
                              <h4 className="text-xs font-bold text-stone-900 line-clamp-2 leading-snug group-hover:text-stone-700 transition">
                                {item.title}
                              </h4>
                              <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                                {item.vehicleCompatibility[0]}
                              </p>
                            </div>

                            <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                              {clientApprovalStatus === "aprobado" ? (
                                <div>
                                  <span className="text-xs font-bold text-stone-900 block font-mono">
                                    {formatCLP(item.priceNeto)}
                                  </span>
                                  <span className="text-[9px] text-stone-400">Neto Mayorista</span>
                                </div>
                              ) : (
                                <span className="text-[10px] text-amber-800 font-medium italic">
                                  Precio reservado
                                </span>
                              )}

                              {isOutOfStock ? (
                                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-stone-100 text-stone-600">
                                  En Espera
                                </span>
                              ) : (
                                <span className="text-[9px] font-bold text-emerald-700">
                                  {item.stock} un.
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* =================== ROL 2: VENDEDOR (4 APARTADOS) ======================= */}
        {/* ========================================================================= */}
        {role === "vendedor" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {vendedorSubView === "cotizaciones" && <VendedorCotizador />}

            {vendedorSubView === "kardex_etl" && (
              <div className="space-y-6">
                <div className="bg-white rounded-3xl border border-stone-200 p-8 shadow-sm space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
                    <div>
                      <h3 className="text-lg font-bold text-stone-900 font-serif flex items-center gap-2">
                        <FileSpreadsheet className="w-5 h-5 text-stone-800" />
                        Módulo de Gestión Kardex Multiem (Excel 2007)
                      </h3>
                      <p className="text-xs text-stone-500 font-light mt-0.5">
                        Proceso de normalización automatizada para archivos Excel 2007: sanitización de caracteres y mapeo de existencias
                      </p>
                    </div>
                    <span className="text-xs font-bold text-stone-400 font-mono">
                      Normalización ETL Activa
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#F6F4EE] border border-stone-200 text-xs space-y-2 text-stone-700">
                    <span className="font-bold text-stone-900 flex items-center gap-1.5">
                      <Wrench className="w-4 h-4 text-stone-700" />
                      Pipeline Técnico de Normalización:
                    </span>
                    <p className="leading-relaxed text-[11px] text-stone-600">
                      El módulo lee las 26 columnas de la base de datos de bodega (Patente Marca, Modelo, Chasis, Año, Código Marutomo, Contenedor, Folio) y actualiza el inventario físico en tiempo real.
                    </p>
                  </div>

                  <div className="border-2 border-dashed border-stone-300 hover:border-stone-800 rounded-2xl p-10 text-center bg-[#F6F4EE]/60 cursor-pointer relative transition">
                    <input
                      type="file"
                      accept=".xlsx, .xls, .csv"
                      onChange={handleFileUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-stone-200 flex items-center justify-center mx-auto text-stone-700 shadow-xs">
                        <FileSpreadsheet className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-stone-900">
                          {isProcessingEtl
                            ? "Procesando y normalizando archivo Kardex Excel 2007..."
                            : "Arrastre aquí su archivo Excel 2007 de Multiem (.xlsx / .xls)"}
                        </h4>
                        <p className="text-xs text-stone-500 font-light mt-1">
                          Depuración de codificaciones y actualización de precios sin digitación manual
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={handleSimularKardex}
                      disabled={isProcessingEtl}
                      className="px-6 py-3 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs shadow-sm transition flex items-center gap-2"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isProcessingEtl ? "animate-spin" : ""}`} />
                      <span>Ejecutar Simulación de Normalización Kardex 2007</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {vendedorSubView === "cartera" && <VendedorCarteraClientes />}
            {vendedorSubView === "inventario_subido" && <VendedorInventarioSubido />}
          </div>
        )}

        {/* ========================================================================= */}
        {/* ================= ROL 3: ADMINISTRADOR (2 SUB-MÓDULOS) ================== */}
        {/* ========================================================================= */}
        {role === "admin_vendor" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {adminSubView === "pedidos" ? (
              <AdminGestionPedidos />
            ) : (
              <div className="bg-white rounded-3xl border border-stone-200 p-8 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-stone-900 font-serif flex items-center gap-2">
                      <ClipboardList className="w-5 h-5 text-stone-800" />
                      Evaluación y Gestión de Solicitudes
                    </h3>
                    <p className="text-xs text-stone-500 font-light mt-0.5">
                      Bandeja administrativa para validación de clientes, control de cupos y registro de modificaciones
                    </p>
                  </div>
                  <span className="text-xs font-bold text-stone-400 font-mono">
                    {filteredRequests.length} Registros
                  </span>
                </div>

                {/* 3 FILTROS ADMINISTRATIVOS */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setAdminFilter("cuenta_nueva")}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition ${
                      adminFilter === "cuenta_nueva"
                        ? "bg-stone-900 text-white shadow-xs"
                        : "bg-[#F6F4EE] text-stone-600 hover:bg-stone-200"
                    }`}
                  >
                    1. Aprobación de Cuenta Nueva ({adminRequests.filter((r) => r.tipo === "cuenta_nueva").length})
                  </button>

                  <button
                    onClick={() => setAdminFilter("solicitud_admin")}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition ${
                      adminFilter === "solicitud_admin"
                        ? "bg-stone-900 text-white shadow-xs"
                        : "bg-[#F6F4EE] text-stone-600 hover:bg-stone-200"
                    }`}
                  >
                    2. Solicitudes Administrativas ({adminRequests.filter((r) => r.tipo === "solicitud_admin").length})
                  </button>

                  <button
                    onClick={() => setAdminFilter("registro_cambios")}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition ${
                      adminFilter === "registro_cambios"
                        ? "bg-stone-900 text-white shadow-xs"
                        : "bg-[#F6F4EE] text-stone-600 hover:bg-stone-200"
                    }`}
                  >
                    3. Registro de Cambios ({adminRequests.filter((r) => r.tipo === "registro_cambios").length})
                  </button>
                </div>

                {/* Lista de Solicitudes */}
                <div className="divide-y divide-stone-100 border border-stone-100 rounded-2xl overflow-hidden">
                  {filteredRequests.map((req) => (
                    <div
                      key={req.id}
                      className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#FBF9F5] transition"
                    >
                      <div className="space-y-1.5 flex-1 text-xs">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-bold text-sm text-stone-900 font-serif">
                            {req.entidad}
                          </span>
                          <span className="font-mono text-stone-500 bg-stone-100 px-2 py-0.5 rounded text-[11px]">
                            RUT: {req.rut}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              req.estado === "Aprobado"
                                ? "bg-emerald-100 text-emerald-800"
                                : req.estado === "Rechazado"
                                ? "bg-rose-100 text-rose-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {req.estado}
                          </span>
                          <span className="text-[10px] text-stone-400 font-mono">
                            {req.fecha}
                          </span>
                        </div>

                        <div className="text-stone-700 font-medium">
                          {req.titulo}: <span className="text-stone-600 font-normal">{req.detalle}</span>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-[11px] text-stone-500 font-light">
                          <span>Contacto: <strong>{req.contacto}</strong></span>
                          <span>Correo: <strong>{req.correo}</strong></span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {req.estado === "Pendiente" ? (
                          <>
                            <button
                              onClick={() => handleApproveRequest(req.id)}
                              className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-full text-xs shadow-2xs transition"
                            >
                              Aprobar
                            </button>
                            <button
                              onClick={() => handleRejectRequest(req.id)}
                              className="px-3.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium rounded-full text-xs transition"
                            >
                              Rechazar
                            </button>
                          </>
                        ) : (
                          <span className="text-xs font-mono font-bold text-stone-400 px-3 py-1">
                            Procesado
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* MODAL CHICUREO 200 */}
        <ChicureoModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(p, qty) => addToCart(p, qty)}
        />

        {/* MODAL EDICIÓN RÁPIDA DE SKU */}
        <EditProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
        />

        {/* DRAWER CARRITO Y PROFORMA */}
        <CartProformaDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          onGoToProfile={() => setClientSubView("perfil")}
        />
      </div>
    </div>
  );
}
