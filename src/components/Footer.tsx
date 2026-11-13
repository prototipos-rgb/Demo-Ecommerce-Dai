import React from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, HeartHandshake, ArrowRight } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B132B] text-stone-300 text-sm relative overflow-hidden border-t border-stone-800">
      {/* Patrón sutil topográfico de fondo estilo MOD JOURNEY */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10 space-y-16">
        {/* Fila Superior: Boletín + Columnas */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Columna Izquierda: Identidad y Newsletter */}
          <div className="md:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white text-stone-900 flex items-center justify-center font-bold text-base shadow-sm">
                D
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-wider block font-serif">
                  DAISEKAI
                </span>
                <span className="text-[10px] text-stone-400 font-mono tracking-widest uppercase">
                  OSAKANSAI GROUP
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed font-light">
              Importadora y Exportadora Daisekai Limitada. Fabricación, importación y exportación de repuestos para vehículos automotores hacia todo Chile y Sudamérica.
            </p>

            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-white block">
                Novedades de Embarques ZOFRI:
              </span>
              <div className="flex items-center gap-2 max-w-sm">
                <input
                  type="email"
                  placeholder="Tu correo corporativo..."
                  className="w-full px-3.5 py-2.5 bg-stone-900/80 border border-stone-700 rounded-xl text-xs text-white placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-stone-400 font-light"
                />
                <button
                  type="button"
                  className="p-2.5 bg-white text-stone-900 rounded-xl hover:bg-stone-200 transition shrink-0"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Columna Central: Navegación */}
          <div className="md:col-span-4 grid grid-cols-2 gap-6 text-xs">
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white">
                Navegación
              </h4>
              <ul className="space-y-2 font-light text-stone-400">
                <li>
                  <Link href="/#inicio" className="hover:text-white transition">
                    Inicio (Acceso)
                  </Link>
                </li>
                <li>
                  <Link href="/#nosotros" className="hover:text-white transition">
                    Nosotros & ZOFRI
                  </Link>
                </li>
                <li>
                  <Link href="/#especialidad" className="hover:text-white transition">
                    Especialidad & Marcas
                  </Link>
                </li>
                <li>
                  <Link href="/#contacto" className="hover:text-white transition">
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link href="/portal" className="text-stone-300 font-medium hover:text-white transition">
                    Portal Privado B2B
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white">
                Operaciones
              </h4>
              <ul className="space-y-2 font-light text-stone-400">
                <li>Manzana 11, Galpones 7 y 8</li>
                <li>Recinto Amurallado ZOFRI</li>
                <li>Huantajaya 3036, Iquique</li>
                <li>Fijo: +56 57 2 544220</li>
                <li>Móvil: +56 9 7523 6397</li>
              </ul>
            </div>
          </div>

          {/* Columna Derecha: Compromiso Social Exacto (Requisito estricto) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Compromiso Social
            </h4>
            <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-2">
              <p className="text-xs text-stone-300 font-light">
                Vínculo activo con la comunidad de Tarapacá
              </p>
              <div className="flex items-center gap-2 text-xs font-medium text-white pt-1">
                <HeartHandshake className="w-4 h-4 text-stone-300 shrink-0" />
                <span>Aporte filantrópico permanente en la región.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Fila Gigante Tipográfica Estilo MOD JOURNEY */}
        <div className="pt-10 border-t border-stone-800/80 space-y-4">
          <div className="text-center">
            <div className="text-4xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white/90 select-none font-sans uppercase">
              DAISEKAI AUTOMOTIVE
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-light pt-4 border-t border-stone-800/50">
            <p>
              &copy; {new Date().getFullYear()} Importadora y Exportadora Daisekai Limitada &bull; Osakansai Group. Todos los derechos reservados.
            </p>
            <p className="text-stone-400">
              Zona Franca de Iquique, Región de Tarapacá, Chile.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
