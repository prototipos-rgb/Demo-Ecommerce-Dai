"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import {
  Users,
  Search,
  Building2,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  FileText,
  UserPlus,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";

export interface ClienteCartera {
  id: string;
  codigo: string;
  razonSocial: string;
  rut: string;
  direccion: string;
  ciudad: string;
  telefono: string;
  correo: string;
  vendedor: string;
  creditoDisponibleCLP: number;
  estado: "Activo" | "Con Línea" | "En Revisión";
}

export const VendedorCarteraClientes: React.FC = () => {
  const { addToast } = useApp();

  const [searchFilter, setSearchFilter] = useState("");
  const [clientes, setClientes] = useState<ClienteCartera[]>([
    {
      id: "cli-1",
      codigo: "C 020-539",
      razonSocial: "HIPER PARTS CLAUDIA ALTAMIRANO HURTADO",
      rut: "9329596",
      direccion: "FATSURI ENTRE SANTIVAÑES",
      ciudad: "CBBA (Cochabamba - Bolivia)",
      telefono: "(+591) 67561046",
      correo: "adquisiciones@hiperparts.bo",
      vendedor: "EVANGELYN / V",
      creditoDisponibleCLP: 65000000,
      estado: "Con Línea",
    },
    {
      id: "cli-2",
      codigo: "C 014-220",
      razonSocial: "Servicios Mecánicos y Flotas del Norte SpA",
      rut: "76.842.190-K",
      direccion: "Av. Las Américas 1240",
      ciudad: "Iquique, Chile",
      telefono: "+56 9 8412 9931",
      correo: "adquisiciones@flotasnorte.cl",
      vendedor: "EVANGELYN / V",
      creditoDisponibleCLP: 45000000,
      estado: "Con Línea",
    },
    {
      id: "cli-3",
      codigo: "C 018-401",
      razonSocial: "Distribuidora de Repuestos El Faro Ltda.",
      rut: "78.912.003-4",
      direccion: "Terminal Agropecuario Galpón 4",
      ciudad: "Arica, Chile",
      telefono: "+56 9 6554 1290",
      correo: "contacto@repuestoselfaro.cl",
      vendedor: "EVANGELYN / V",
      creditoDisponibleCLP: 30000000,
      estado: "Activo",
    },
    {
      id: "cli-4",
      codigo: "C 022-819",
      razonSocial: "Maestranza y Repuestos Tamarugal S.A.",
      rut: "79.231.400-2",
      direccion: "Parque Industrial Manzana C",
      ciudad: "Pozo Almonte, Tarapacá",
      telefono: "+56 9 7712 9901",
      correo: "adquisiciones@tamarugal.cl",
      vendedor: "EVANGELYN / V",
      creditoDisponibleCLP: 50000000,
      estado: "Con Línea",
    },
    {
      id: "cli-5",
      codigo: "C 025-118",
      razonSocial: "Transportes TransAtacama Ltda.",
      rut: "76.332.110-5",
      direccion: "Ruta 5 Norte Km 1820",
      ciudad: "Alto Hospicio, Chile",
      telefono: "+56 9 8122 3441",
      correo: "operaciones@transatacama.cl",
      vendedor: "EVANGELYN / V",
      creditoDisponibleCLP: 20000000,
      estado: "Activo",
    },
  ]);

  const filtered = clientes.filter(
    (c) =>
      c.razonSocial.toLowerCase().includes(searchFilter.toLowerCase()) ||
      c.codigo.toLowerCase().includes(searchFilter.toLowerCase()) ||
      c.rut.toLowerCase().includes(searchFilter.toLowerCase()) ||
      c.ciudad.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Cabecera del módulo */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl border border-stone-200 p-6 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-semibold uppercase tracking-wider mb-2">
            <Users className="w-3.5 h-3.5 text-stone-800" />
            <span>Gestión Comercial de Venta</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif">
            Cartera de Clientes Mayoristas (Con todos sus datos)
          </h3>
          <p className="text-xs text-stone-500 font-light">
            Directorio maestro de talleres, distribuidoras y flotas mineras asignadas a su gestión comercial.
          </p>
        </div>

        <button
          onClick={() =>
            addToast(
              "Nuevo Cliente Mayorista",
              "Formulario de apertura rápida de cliente disponible en el sistema.",
              "info"
            )
          }
          className="px-4 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>+ Registrar Nuevo Cliente</span>
        </button>
      </div>

      {/* Buscador de Cartera */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-2xs">
        <div className="relative">
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Buscar en cartera por código cliente (C 020-539), razón social, RUT o ciudad..."
            className="w-full pl-10 pr-4 py-3 bg-[#F6F4EE] border border-stone-200 rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 font-medium"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
        </div>
      </div>

      {/* Tabla de Clientes con todos sus datos */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm overflow-x-auto">
        <table className="w-full border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-stone-200 text-[11px] font-bold uppercase tracking-wider text-stone-400 font-mono">
              <th className="pb-3 pl-2">Cód. Cliente</th>
              <th className="pb-3">Razón Social / Taller</th>
              <th className="pb-3">RUT / ID</th>
              <th className="pb-3">Ciudad / Región</th>
              <th className="pb-3">Contacto & Teléfono</th>
              <th className="pb-3">Correo</th>
              <th className="pb-3">Línea Crédito</th>
              <th className="pb-3">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 font-sans">
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-stone-50 transition">
                <td className="py-4 pl-2 font-mono font-bold text-stone-900">
                  {c.codigo}
                </td>
                <td className="py-4 font-bold text-stone-900">
                  {c.razonSocial}
                  <span className="block text-[11px] text-stone-500 font-normal">
                    {c.direccion}
                  </span>
                </td>
                <td className="py-4 font-mono text-stone-600">
                  {c.rut}
                </td>
                <td className="py-4 text-stone-700 font-medium">
                  {c.ciudad}
                </td>
                <td className="py-4 text-stone-700">
                  <span className="font-mono text-[11px] block">{c.telefono}</span>
                  <span className="text-[10px] text-stone-400">Vendedor: {c.vendedor}</span>
                </td>
                <td className="py-4 font-mono text-[11px] text-stone-600">
                  {c.correo}
                </td>
                <td className="py-4 font-mono font-bold text-stone-900">
                  ${(c.creditoDisponibleCLP / 1000000).toFixed(0)}M CLP
                </td>
                <td className="py-4">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      c.estado === "Con Línea"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {c.estado}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
