"use client";

import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

// SVGs auténticos y limpios para las 9 marcas asiáticas
export const BrandLogos = {
  Toyota: () => (
    <svg viewBox="0 0 100 70" className="w-14 h-9 fill-current" aria-label="Toyota">
      <path d="M50 0C22.4 0 0 11.2 0 25c0 13.8 22.4 25 50 25s50-11.2 50-25C100 11.2 77.6 0 50 0zm0 44C25.7 44 6 34.6 6 25S25.7 6 50 6s44 9.4 44 19-19.7 19-44 19z"/>
      <path d="M50 8c-12.7 0-23 7.6-23 17 0 9.4 10.3 17 23 17s23-7.6 23-17c0-9.4-10.3-17-23-17zm0 28.5c-9.4 0-17-5.2-17-11.5S40.6 13.5 50 13.5s17 5.2 17 11.5-7.6 11.5-17 11.5z"/>
      <path d="M50 8c-3.3 0-6 13.4-6 30 0 16.6 2.7 30 6 30s6-13.4 6-30c0-16.6-2.7-30-6-30z"/>
    </svg>
  ),
  Hyundai: () => (
    <svg viewBox="0 0 100 60" className="w-14 h-9 fill-current" aria-label="Hyundai">
      <path d="M50 0C22.4 0 0 13.4 0 30s22.4 30 50 30 50-13.4 50-30S77.6 0 50 0zm0 54C25.1 54 5 43.3 5 30S25.1 6 50 6s45 10.7 45 24-19.9 24-45 24z"/>
      <path d="M34 16h8l-3 28h-8zm24 0h8l-3 28h-8z"/>
      <path d="M35 27h30v6H35z"/>
    </svg>
  ),
  Nissan: () => (
    <svg viewBox="0 0 100 70" className="w-14 h-9 fill-current" aria-label="Nissan">
      <circle cx="50" cy="35" r="30" fill="none" stroke="currentColor" strokeWidth="6"/>
      <rect x="10" y="27" width="80" height="16" rx="2" fill="currentColor"/>
      <text x="50" y="39" textAnchor="middle" fill="#ffffff" fontSize="11" fontFamily="sans-serif" fontWeight="900" letterSpacing="1.5">NISSAN</text>
    </svg>
  ),
  Mitsubishi: () => (
    <svg viewBox="0 0 100 85" className="w-12 h-9 fill-current" aria-label="Mitsubishi">
      <polygon points="50,0 35,26 65,26"/>
      <polygon points="35,26 20,52 50,52"/>
      <polygon points="65,26 50,52 80,52"/>
    </svg>
  ),
  Kia: () => (
    <svg viewBox="0 0 100 45" className="w-14 h-7 fill-current" aria-label="Kia">
      <ellipse cx="50" cy="22.5" rx="48" ry="20" fill="none" stroke="currentColor" strokeWidth="4"/>
      <text x="50" y="29" textAnchor="middle" fill="currentColor" fontSize="18" fontFamily="sans-serif" fontWeight="900" letterSpacing="2">KIA</text>
    </svg>
  ),
  Mazda: () => (
    <svg viewBox="0 0 100 65" className="w-14 h-9 fill-current" aria-label="Mazda">
      <ellipse cx="50" cy="32" rx="45" ry="28" fill="none" stroke="currentColor" strokeWidth="5"/>
      <path d="M22 25 Q50 48 78 25 Q50 36 22 25 Z" fill="currentColor"/>
    </svg>
  ),
  Suzuki: () => (
    <svg viewBox="0 0 80 80" className="w-10 h-9 fill-current" aria-label="Suzuki">
      <path d="M70 12L25 40h45l-15 14L10 68l45-28H10l15-14z"/>
    </svg>
  ),
  Isuzu: () => (
    <svg viewBox="0 0 110 35" className="w-16 h-6 fill-current" aria-label="Isuzu">
      <text x="55" y="26" textAnchor="middle" fill="currentColor" fontSize="22" fontFamily="sans-serif" fontWeight="900" letterSpacing="3">ISUZU</text>
    </svg>
  ),
  Subaru: () => (
    <svg viewBox="0 0 100 60" className="w-14 h-8 fill-current" aria-label="Subaru">
      <ellipse cx="50" cy="30" rx="46" ry="26" fill="none" stroke="currentColor" strokeWidth="4"/>
      {/* Estrellas constelación pléyades */}
      <circle cx="38" cy="26" r="6" fill="currentColor"/>
      <circle cx="56" cy="22" r="4.5" fill="currentColor"/>
      <circle cx="64" cy="34" r="4.5" fill="currentColor"/>
      <circle cx="48" cy="38" r="4" fill="currentColor"/>
      <circle cx="68" cy="20" r="3" fill="currentColor"/>
      <circle cx="34" cy="38" r="3" fill="currentColor"/>
    </svg>
  ),
};

export const SpecialtySection: React.FC = () => {
  const brands = [
    { name: "Toyota", Logo: BrandLogos.Toyota },
    { name: "Nissan", Logo: BrandLogos.Nissan },
    { name: "Hyundai", Logo: BrandLogos.Hyundai },
    { name: "Mitsubishi", Logo: BrandLogos.Mitsubishi },
    { name: "Kia", Logo: BrandLogos.Kia },
    { name: "Mazda", Logo: BrandLogos.Mazda },
    { name: "Suzuki", Logo: BrandLogos.Suzuki },
    { name: "Isuzu", Logo: BrandLogos.Isuzu },
    { name: "Subaru", Logo: BrandLogos.Subaru },
  ];

  const featuredLines = [
    {
      title: "Cilindros de Freno & Rueda",
      subtitle: "Especialidad Osakansai",
      desc: "Cilindros maestros de doble circuito y cilindros de rueda traseros fundidos en aleación de alta presión, rectificados al micrómetro.",
      specs: ["Pistones anodizados anticorrosión", "Sellos de caucho EPDM grado DOT 4", "Disponibilidad para Toyota, Nissan e Isuzu"],
      tag: "Línea Estrella Osakansai",
      icon: (
        <svg viewBox="0 0 64 64" className="w-14 h-14 stroke-current fill-none stroke-[2.2]">
          <rect x="8" y="22" width="48" height="20" rx="4" />
          <path d="M2 32h6M56 32h6" />
          <circle cx="32" cy="32" r="6" />
          <path d="M24 14h16v8H24z" />
          <path d="M28 10h8v4h-8z" />
          <line x1="20" y1="22" x2="20" y2="42" />
          <line x1="44" y1="22" x2="44" y2="42" />
        </svg>
      ),
    },
    {
      title: "Empaquetaduras de Culata MLS",
      subtitle: "Sellado de Alto Rendimiento",
      desc: "Empaques multi-lámina metálica (Multi-Layer Steel) con recubrimiento de elastómero Viton resistente a temperaturas extremas de motores turbo.",
      specs: ["Resistencia a presiones diésel CRDi", "Calce exacto según tolerancia OEM", "Para motores 1KD, 2KD, YD25, D4HB, 4D56"],
      tag: "Garantía de Sellado Hermético",
      icon: (
        <svg viewBox="0 0 64 64" className="w-14 h-14 stroke-current fill-none stroke-[2.2]">
          <rect x="6" y="14" width="52" height="36" rx="6" />
          <circle cx="18" cy="32" r="7" />
          <circle cx="32" cy="32" r="7" />
          <circle cx="46" cy="32" r="7" />
          <circle cx="10" cy="18" r="2" />
          <circle cx="54" cy="18" r="2" />
          <circle cx="10" cy="46" r="2" />
          <circle cx="54" cy="46" r="2" />
        </svg>
      ),
    },
    {
      title: "Discos & Kits de Embrague HD",
      subtitle: "Transmisión y Faenas Severas",
      desc: "Conjuntos de prensa diafragmática reforzada y discos de fricción cerámico-metálica diseñados para camionetas de faenas mineras y carga pesada.",
      specs: ["Resortes de amortiguación reforzados", "Mayor torque de desacople sin patinado", "Aplicación Hilux Revo, NP300, D-Max, Katana"],
      tag: "Resistencia Heavy Duty",
      icon: (
        <svg viewBox="0 0 64 64" className="w-14 h-14 stroke-current fill-none stroke-[2.2]">
          <circle cx="32" cy="32" r="24" />
          <circle cx="32" cy="32" r="14" />
          <circle cx="32" cy="32" r="6" />
          <line x1="32" y1="8" x2="32" y2="18" />
          <line x1="32" y1="46" x2="32" y2="56" />
          <line x1="8" y1="32" x2="18" y2="32" />
          <line x1="46" y1="32" x2="56" y2="32" />
        </svg>
      ),
    },
    {
      title: "Amortiguadores a Gas Nitrógeno",
      subtitle: "Suspensión Hidráulica Presurizada",
      desc: "Amortiguadores monotubo y bitubo presurizados a gas nitrógeno con vástago de cromo templado y sellos japoneses multi-labio contra polvo ZOFRI.",
      specs: ["Cero cavitación en caminos de ripio", "Válvulas progresivas autoajustables", "Para Hilux, Fortuner, D23, Terrano, Sorento"],
      tag: "Confort y Estabilidad de Carga",
      icon: (
        <svg viewBox="0 0 64 64" className="w-14 h-14 stroke-current fill-none stroke-[2.2]">
          <circle cx="32" cy="10" r="5" />
          <line x1="32" y1="15" x2="32" y2="24" />
          <rect x="25" y="24" width="14" height="24" rx="2" />
          <line x1="32" y1="48" x2="32" y2="53" />
          <circle cx="32" cy="58" r="5" />
          <line x1="25" y1="32" x2="39" y2="32" />
          <line x1="25" y1="40" x2="39" y2="40" />
        </svg>
      ),
    },
    {
      title: "Cremalleras de Dirección Asistida",
      subtitle: "Mecanismos de Precisión",
      desc: "Cajas de dirección y cremalleras hidráulicas completas con axiales y fuelles de neopreno integrados, testeadas a 150 bares de presión.",
      specs: ["Barra cremallera rectificada sin juego", "Válvulas rotativas de respuesta inmediata", "Compatibilidad KUN26, GUN125, Navara, Grand Vitara"],
      tag: "Seguridad en Ruta Garantizada",
      icon: (
        <svg viewBox="0 0 64 64" className="w-14 h-14 stroke-current fill-none stroke-[2.2]">
          <line x1="6" y1="32" x2="58" y2="32" strokeWidth="4" />
          <circle cx="10" cy="32" r="4" />
          <circle cx="54" cy="32" r="4" />
          <rect x="22" y="24" width="20" height="16" rx="3" />
          <line x1="32" y1="12" x2="32" y2="24" />
          <line x1="28" y1="12" x2="36" y2="12" />
          <line x1="26" y1="28" x2="26" y2="36" />
          <line x1="38" y1="28" x2="38" y2="36" />
        </svg>
      ),
    },
    {
      title: "Cables de Bujía & Encendido",
      subtitle: "Silicona 8mm & Alta Conductividad",
      desc: "Juegos de cables para bujía con núcleo de ferrita y revestimiento de silicona pura de 8mm que elimina fugas de chispa en arranques en frío.",
      specs: ["Terminales de acero inoxidable con seguro", "Supresión de radiofrecuencia (RFI)", "Para motores Toyota 3RZ/2TR, Hyundai G4EE, Suzuki"],
      tag: "Ignición Instantánea",
      icon: (
        <svg viewBox="0 0 64 64" className="w-14 h-14 stroke-current fill-none stroke-[2.2]">
          <path d="M14 10c0 14 12 18 12 32v12" />
          <path d="M26 10c0 10 12 14 12 28v22" />
          <path d="M38 10c0 8 12 10 12 24v26" />
          <rect x="10" y="6" width="8" height="6" rx="1" />
          <rect x="22" y="6" width="8" height="6" rx="1" />
          <rect x="34" y="6" width="8" height="6" rx="1" />
          <circle cx="26" cy="56" r="3" />
          <circle cx="38" cy="60" r="3" />
          <circle cx="50" cy="60" r="3" />
        </svg>
      ),
    },
  ];

  return (
    <section id="especialidad" className="py-24 sm:py-32 bg-white border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Encabezado Editorial Limpio */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F6F4EE] text-stone-700 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-stone-600" />
            Catálogo de Especialidad
          </div>
          <h2 className="text-3xl sm:text-5xl font-normal text-stone-900 tracking-tight font-serif">
            Especialistas en Marcas Asiáticas & Líneas Propias
          </h2>
          <p className="text-stone-600 text-base font-light leading-relaxed">
            Distribuimos componentes mecánicos y repuestos de alta rotación para las flotas más exigentes del cono sur, con homologación estricta y control de calidad en origen.
          </p>
        </div>

        {/* ================= CARRUSEL CONTINUO DE LOGOS ================= */}
        <div className="space-y-4">
          <div className="text-xs font-bold uppercase tracking-widest text-stone-400">
            Fabricantes y Marcas Homologadas:
          </div>

          <div className="relative overflow-hidden py-8 border-y border-stone-200/80 bg-[#FBF9F5] rounded-3xl">
            {/* Sombras difuminadas en bordes para efecto continuo */}
            <div className="absolute left-0 inset-y-0 w-20 bg-gradient-to-r from-[#FBF9F5] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 inset-y-0 w-20 bg-gradient-to-l from-[#FBF9F5] to-transparent z-10 pointer-events-none" />

            {/* Fila animada con duplicación para carrusel infinito */}
            <div className="flex items-center gap-14 sm:gap-20 w-max animate-marquee">
              {[...brands, ...brands].map((brand, idx) => {
                const LogoComponent = brand.Logo;
                return (
                  <div
                    key={idx}
                    className="flex flex-col items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 text-stone-700 hover:text-stone-900 group cursor-default"
                  >
                    <div className="h-10 flex items-center justify-center transform group-hover:scale-110 transition duration-300">
                      <LogoComponent />
                    </div>
                    <span className="text-[10px] font-bold tracking-wider text-stone-400 group-hover:text-stone-900 mt-1 uppercase">
                      {brand.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ================= TARJETAS DESTACADAS CON ICONOGRAFÍA GRANDE ================= */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-stone-400">
                Componentes de Bodega:
              </div>
              <h3 className="text-2xl sm:text-3xl font-normal text-stone-900 tracking-tight font-serif mt-1">
                Líneas de Repuestos en Rotación Activa
              </h3>
            </div>
            <Link
              href="/portal"
              className="text-xs font-bold text-stone-900 hover:text-stone-600 flex items-center gap-1.5 transition group uppercase tracking-wider"
            >
              <span>Acceder al portal para consultar stock</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredLines.map((line, idx) => (
              <div
                key={idx}
                className="group relative bg-[#FBF9F5] rounded-3xl border border-stone-200 hover:border-stone-400 p-8 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-6">
                  {/* Iconografía grande destacada */}
                  <div className="flex items-start justify-between">
                    <div className="w-16 h-16 rounded-2xl bg-white text-stone-800 group-hover:text-stone-900 flex items-center justify-center border border-stone-200 transition-all duration-300 transform group-hover:scale-105 shadow-xs">
                      {line.icon}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white text-stone-600 border border-stone-200 group-hover:bg-stone-900 group-hover:text-white transition">
                      {line.tag}
                    </span>
                  </div>

                  {/* Título y subtítulo */}
                  <div>
                    <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
                      {line.subtitle}
                    </span>
                    <h4 className="text-xl font-bold text-stone-900 font-serif mt-1">
                      {line.title}
                    </h4>
                    <p className="text-xs text-stone-600 font-light leading-relaxed mt-2.5">
                      {line.desc}
                    </p>
                  </div>

                  {/* Puntos técnicos clave */}
                  <ul className="space-y-1.5 text-xs text-stone-500 font-light border-t border-stone-200/80 pt-4">
                    {line.specs.map((spec, sidx) => (
                      <li key={sidx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-stone-400 shrink-0" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pie de tarjeta con llamado sutil */}
                <div className="pt-6 mt-6 border-t border-stone-200/80 flex items-center justify-between text-xs font-bold text-stone-400 group-hover:text-stone-900 transition uppercase tracking-wider">
                  <span>Consultar códigos OEM</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition text-stone-700" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
