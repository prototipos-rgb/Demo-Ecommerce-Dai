import React from "react";
import {
  TrendingDown,
  Clock,
  ShieldCheck,
  FileCheck,
  Calculator,
  Truck,
  FileSpreadsheet,
  Check
} from "lucide-react";

export const BeneficiosB2B: React.FC = () => {
  const benefits = [
    {
      icon: TrendingDown,
      title: "Descuentos Dinámicos por Volumen",
      description:
        "Motor de reglas comerciales que aplica reducciones porcentuales automáticas en pedidos superiores a $20.000.000 CLP. Elimina la fricción de negociación y acelera el cierre comercial.",
      badge: "Regla > 20M CLP",
      color: "blue",
    },
    {
      icon: FileCheck,
      title: "Backordering & Proforma Condicionada",
      description:
        "Si el inventario físico tiene desfase temporal, el taller puede agregar ítems sin stock. El sistema genera una Proforma Condicionada y no cobra hasta reconfirmar existencias en bodega.",
      badge: "Cero Ventas Perdidas",
      color: "amber",
    },
    {
      icon: ShieldCheck,
      title: "Validación Exclusiva RUT Empresa",
      description:
        "Acceso cerrado para talleres mecánicos, flotas y casas de repuestos con giro comercial acreditado. Protege los márgenes de reventa de nuestros clientes frente al consumidor final.",
      badge: "Protección de Margen",
      color: "emerald",
    },
    {
      icon: Truck,
      title: "Cotización de Flete Volumétrico",
      description:
        "Algoritmo que calcula el peso cúbico y volumétrico de piezas pesadas (discos, tambores, cremalleras) con integración de tarifas mayoristas de Starken y BlueExpress.",
      badge: "Logística Pesada",
      color: "cyan",
    },
  ];

  return (
    <section id="beneficios" className="py-20 bg-slate-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/80 text-blue-400 text-xs font-semibold border border-blue-800/60">
            <Calculator className="w-3.5 h-3.5" />
            Modelo Comercial Mayorista
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Diseñado para la Realidad Operativa del Taller
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Una plataforma que actúa como un empleado comercial de alto rendimiento: automatiza presupuestos, respeta las jerarquías de precios y agiliza compras de gran escala.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="bg-slate-950/80 rounded-2xl p-7 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-400">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-blue-950 text-cyan-300 border border-blue-800/60">
                      {b.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white">{b.title}</h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {b.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-900 flex items-center gap-2 text-xs text-slate-500">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Incorporado en la arquitectura Headless Daisekai</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlight quote banner */}
        <div className="mt-12 bg-gradient-to-r from-blue-950/80 via-slate-950 to-blue-950/80 border border-blue-800/40 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="text-lg font-bold text-white">
              ¿Gestionas una flota o taller mecánico con consumo recurrente?
            </h4>
            <p className="text-xs text-slate-400">
              Solicita tu apertura de cuenta B2B para acceder a condiciones de crédito, proformas en 1 clic y precios preferenciales de ZOFRI.
            </p>
          </div>
          <a
            href="https://wa.me/56975236397?text=Hola,%20deseo%20solicitar%20apertura%20de%20cuenta%20mayorista%20B2B%20en%20Daisekai%20Limitada"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg transition whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <span>Contactar Ejecutivo WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
