import React from "react";
import { Container, Truck, Warehouse, ShieldAlert, Globe, Compass, Wrench } from "lucide-react";

export const InfraestructuraLogistica: React.FC = () => {
  const asianBrands = [
    { name: "Toyota", models: "Hilux, Fortuner, Yaris, Land Cruiser Prado" },
    { name: "Nissan", models: "NP300, Navara D23, Terrano, Pathfinder" },
    { name: "Hyundai", models: "Santa Fe, Tucson, Accent, Porter, H-1" },
    { name: "Kia", models: "Sorento, Sportage, Frontier, Rio" },
    { name: "Mitsubishi", models: "L200 Katana, Montero Sport, Canter" },
    { name: "Isuzu", models: "D-Max, Serie N, Forward" },
    { name: "Suzuki", models: "Grand Vitara, Swift, Jimny, Carry" },
    { name: "Subaru", models: "Forester, Outback, XV, Impreza" },
  ];

  return (
    <section id="infraestructura" className="py-20 bg-slate-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 text-cyan-400 text-xs font-semibold border border-cyan-800/50">
            <Warehouse className="w-3.5 h-3.5" />
            Capacidad Logística ZOFRI
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Infraestructura Portuaria & Distribución Continental
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Operamos directamente en los <strong>Galpones 7 y 8 de la Manzana 11</strong> en el Recinto Amurallado de ZOFRI, recibiendo contenedores marítimos y despachando a todo Chile y el cono sur.
          </p>
        </div>

        {/* 3 Main Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-slate-950/80 rounded-2xl p-6 border border-slate-800 hover:border-blue-500/50 transition duration-300 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <Container className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">
              Contenedores Marítimos Directos
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Descarga constante en Recinto Amurallado ZOFRI. Eliminamos intermediarios para garantizar stock de alta rotación (8.500 SKUs activos diarios) a los mejores márgenes del mercado mayorista.
            </p>
            <div className="text-xs text-blue-400 font-semibold flex items-center gap-1 pt-2">
              <span>Manzana 11, Galpones 7 y 8</span>
            </div>
          </div>

          <div className="bg-slate-950/80 rounded-2xl p-6 border border-slate-800 hover:border-cyan-500/50 transition duration-300 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
              <Wrench className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">
              Línea Propia Osakansai
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Marca registrada del grupo empresarial con especificaciones de equipo original (OEM). Reconocida nacionalmente en <strong>empaquetaduras MLS, cilindros de freno, cremalleras y embragues HD</strong>.
            </p>
            <div className="text-xs text-cyan-400 font-semibold flex items-center gap-1 pt-2">
              <span>Garantía de Durabilidad Certificada</span>
            </div>
          </div>

          <div className="bg-slate-950/80 rounded-2xl p-6 border border-slate-800 hover:border-emerald-500/50 transition duration-300 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">
              Despachos de Carga Pesada
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Convenios logísticos con <strong>Starken Carga Pesada</strong> y <strong>BlueExpress</strong>. Cotización automática según peso y volumen para tambores de freno, transmisiones y amortiguación.
            </p>
            <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1 pt-2">
              <span>Seguimiento y Guía de Despacho DTE</span>
            </div>
          </div>
        </div>

        {/* Asian Brands Coverage Grid */}
        <div className="bg-slate-950 rounded-2xl p-8 border border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white">
                Cobertura Integral de Vehículos Asiáticos
              </h3>
              <p className="text-xs text-slate-400">
                Piezas originales y alternativas homologadas para las flotas más vendidas de Chile
              </p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 bg-slate-900 text-blue-400 rounded-full border border-slate-700">
              Catálogo Multi-Cruce OEM
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
            {asianBrands.map((brand, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition"
              >
                <div className="text-sm font-bold text-white">{brand.name}</div>
                <div className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                  {brand.models}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
