import React from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, ShieldCheck, HeartHandshake, Container, Sparkles } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Identity & Group */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-sm">
                D
              </div>
              <span className="text-lg font-black text-white tracking-wide">
                DAISEKAI <span className="text-cyan-400 font-semibold text-xs">OSAKANSAI</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Importadora y Exportadora Daisekai Limitada. Líderes en fabricación, importación y exportación de componentes y repuestos automotrices de alta rotación para Chile y Sudamérica.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Container className="w-4 h-4 text-blue-400" />
              <span>Operaciones directas desde Recinto Amurallado ZOFRI</span>
            </div>
          </div>

          {/* Col 2: Hub Operativo y Contacto */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">
              Centro Operativo ZOFRI
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Manzana 11, Galpones 7 y 8, Zona Franca (ZOFRI), Iquique, Chile.</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span>Dirección Administrativa: Huantajaya 3036, Iquique.</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+56 9 7523 6397 &bull; Fijo: +56 57 2 544220</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>contacto@daisekai.cl / ventas@osakansai.cl</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Marcas y Cobertura */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">
              Especialistas Asiáticos
            </h4>
            <p className="text-xs text-slate-400">
              Distribución masiva para Toyota, Hyundai, Nissan, Mitsubishi, Kia, Mazda, Suzuki, Isuzu y Subaru.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {["Toyota", "Nissan", "Hyundai", "Kia", "Mitsubishi", "Isuzu", "Suzuki", "Subaru"].map((brand) => (
                <span
                  key={brand}
                  className="px-2 py-0.5 bg-slate-900 border border-slate-800 rounded text-[11px] text-slate-300"
                >
                  {brand}
                </span>
              ))}
            </div>
            <div className="pt-2 flex items-center gap-2 text-xs text-amber-300/90">
              <HeartHandshake className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Vínculo comunitario BLIA Chile & Templo Fo Guang Shan Tarapacá</span>
            </div>
          </div>

          {/* Col 4: Aerys IT Partnership */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              Ingeniería & Solución B2B
            </h4>
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-blue-900/40 text-xs space-y-2">
              <div className="text-slate-200 font-semibold flex items-center justify-between">
                <span>Aerys IT Consultora</span>
                <span className="text-[10px] text-blue-400 bg-blue-950 px-1.5 py-0.5 rounded border border-blue-800">
                  Headless Commerce
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal">
                Arquitectura de integración continua con ERP Multiem, indexación OEM/VIN de alto rendimiento y proformas B2B automatizadas.
              </p>
              <div className="pt-1 text-[10px] text-slate-500 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>Datos protegidos y catálogo ciego para talleres</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} Importadora y Exportadora Daisekai Limitada &bull; Osakansai Group. Todos los derechos reservados.
          </p>
          <p className="flex items-center gap-1 text-slate-400">
            Diseñado & Implementado por <strong className="text-blue-400">Aerys IT</strong> División de Ingeniería Comercial.
          </p>
        </div>
      </div>
    </footer>
  );
};
