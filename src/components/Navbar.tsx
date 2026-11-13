"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight, Lock, ShoppingBag, Phone } from "lucide-react";
import { useApp } from "@/context/AppContext";

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cart } = useApp();
  const cartCount = cart.reduce((a, b) => a + b.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-md border-b border-stone-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Tipográfico Minimalista Estilo MOD JOURNEY */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-stone-900 text-white flex items-center justify-center font-bold text-base shadow-xs group-hover:scale-105 transition">
              D
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-bold tracking-tight text-stone-900 font-serif">
                  DAISEKAI
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 mb-0.5" />
              </div>
              <p className="text-[10px] text-stone-400 font-mono tracking-widest uppercase">
                OSAKANSAI GROUP &bull; ZOFRI
              </p>
            </div>
          </Link>

          {/* Menú Central Limpio y Espacioso */}
          <nav className="hidden lg:flex items-center gap-10 text-xs font-semibold tracking-wider uppercase text-stone-600">
            <Link href="/#inicio" className="hover:text-stone-900 transition">
              Inicio
            </Link>
            <Link href="/#nosotros" className="hover:text-stone-900 transition">
              Nosotros & ZOFRI
            </Link>
            <Link href="/#especialidad" className="hover:text-stone-900 transition">
              Especialidad & Marcas
            </Link>
            <Link href="/#contacto" className="hover:text-stone-900 transition">
              Contacto
            </Link>
          </nav>

          {/* Botón Pill Estilo MOD JOURNEY */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/portal"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold shadow-md transition group"
            >
              <Lock className="w-3.5 h-3.5 text-stone-300" />
              <span>Portal Privado B2B</span>
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition">
                <ArrowRight className="w-3 h-3 text-white" />
              </div>
            </Link>
          </div>

          {/* Menú móvil toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-stone-700 hover:text-stone-900"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-stone-200 py-4 space-y-2 text-xs font-bold uppercase tracking-wider text-stone-700">
            <Link
              href="/#inicio"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-stone-100"
            >
              Inicio (Acceso)
            </Link>
            <Link
              href="/#nosotros"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-stone-100"
            >
              Nosotros & ZOFRI
            </Link>
            <Link
              href="/#especialidad"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-stone-100"
            >
              Especialidad & Marcas
            </Link>
            <Link
              href="/#contacto"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-stone-100"
            >
              Contacto
            </Link>
            <Link
              href="/portal"
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 rounded-full text-white font-bold bg-stone-900 text-center text-xs tracking-wider"
            >
              Ingresar al Portal Privado B2B &rarr;
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
