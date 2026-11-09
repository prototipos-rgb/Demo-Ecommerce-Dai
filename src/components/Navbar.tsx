"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import {
  Search,
  ShoppingCart,
  Building,
  Shield,
  LogIn,
  SlidersHorizontal,
  PhoneCall,
  Menu,
  X,
  FileText,
  BadgeAlert
} from "lucide-react";

export const Navbar: React.FC = () => {
  const router = useRouter();
  const { role, setRole, cart, clientInfo, searchQuery, setSearchQuery } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/catalogo");
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-[41px] z-40 transition-colors">
      {/* Top micro-bar: Corporate info */}
      <div className="bg-slate-950/80 border-b border-slate-800/80 text-[11px] text-slate-400 py-1 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <strong className="text-slate-300">ZOFRI Iquique:</strong> Recinto Amurallado, Manzana 11, Galpones 7 y 8
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:inline">
              Firma Matriz: <strong>Osakansai Group</strong>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="tel:+56975236397"
              className="flex items-center gap-1 hover:text-blue-400 transition"
            >
              <PhoneCall className="w-3 h-3 text-blue-400" />
              <span>+56 9 7523 6397 / +56 57 2 544220</span>
            </a>
            <span className="hidden sm:inline bg-blue-950 text-blue-300 px-2 py-0.5 rounded text-[10px] font-semibold border border-blue-800/40">
              Despachos Nacionales Starken & BlueExpress
            </span>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo & Corporate identity */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center text-white font-black text-xl shadow-md shadow-blue-900/30 border border-blue-500/30 group-hover:scale-105 transition">
              D
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-white">DAISEKAI</span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-blue-900/60 text-cyan-400 font-bold border border-blue-700/50">
                  OSAKANSAI
                </span>
              </div>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400">
                Importadora &bull; Exportadora B2B ZOFRI
              </span>
            </div>
          </Link>

          {/* Search Box - Optimized for OEM / VIN / Model */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex-1 max-w-xl mx-2 hidden lg:flex relative"
          >
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por código OEM (ej. 04465-0K260), Chasis (VIN) o modelo..."
                className="w-full pl-11 pr-24 py-2.5 bg-slate-800/90 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition shadow-inner"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-md transition shadow"
              >
                Buscar
              </button>
            </div>
          </form>

          {/* Right Navigation & Auth State */}
          <div className="flex items-center gap-3">
            <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-slate-300">
              <Link href="/#inicio" className="hover:text-blue-400 transition">
                Inicio
              </Link>
              <Link href="/catalogo" className="hover:text-blue-400 transition">
                Catálogo (26k SKUs)
              </Link>
              <Link href="/#infraestructura" className="hover:text-blue-400 transition">
                ZOFRI & Infraestructura
              </Link>
              <Link href="/#beneficios" className="hover:text-blue-400 transition">
                Beneficios B2B
              </Link>
              <Link href="/#contacto" className="hover:text-blue-400 transition">
                Contacto
              </Link>
            </nav>

            {/* Role Profile Badge or Login */}
            {role === "blind_guest" ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/portal/login"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
                >
                  <LogIn className="w-3.5 h-3.5 text-blue-400" />
                  <span>Portal Clientes (RUT)</span>
                </Link>
                <button
                  onClick={() => setRole("b2b_client")}
                  className="px-3 py-2 text-xs font-bold rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow transition"
                >
                  Validar Taller
                </button>
              </div>
            ) : role === "b2b_client" ? (
              <div className="flex items-center gap-2 bg-slate-800/90 border border-blue-500/30 px-3 py-1.5 rounded-lg">
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                  FM
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-bold text-white leading-tight">
                    Flotas del Norte SpA
                  </span>
                  <span className="text-[10px] text-cyan-400">
                    RUT: 76.842.190-K &bull; VIP
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 bg-emerald-950/60 border border-emerald-500/40 px-3 py-1.5 rounded-lg">
                <Shield className="w-4 h-4 text-emerald-400" />
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-bold text-emerald-300 leading-tight">
                    Admin / Vendedor
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Consola Multiem ETL
                  </span>
                </div>
              </div>
            )}

            {/* Cart Link with Badge */}
            <Link
              href="/checkout"
              className="relative p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition border border-slate-700"
              title="Ver cotización y proforma"
            >
              <ShoppingCart className="w-5 h-5 text-blue-400" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white font-bold text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-scale">
                  {totalCartCount}
                </span>
              )}
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white xl:hidden"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search & Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden pb-4 pt-2 border-t border-slate-800 space-y-3">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar OEM, VIN o pieza..."
                className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-400"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </form>
            <div className="flex flex-col space-y-2 text-sm font-medium text-slate-300">
              <Link
                href="/#inicio"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:bg-slate-800 rounded"
              >
                1. Inicio
              </Link>
              <Link
                href="/catalogo"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:bg-slate-800 rounded"
              >
                Catálogo Completo (26k SKUs)
              </Link>
              <Link
                href="/#infraestructura"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:bg-slate-800 rounded"
              >
                2. Infraestructura & Zofri
              </Link>
              <Link
                href="/#vitrina"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:bg-slate-800 rounded"
              >
                3. Vitrina Mayorista
              </Link>
              <Link
                href="/#beneficios"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:bg-slate-800 rounded"
              >
                4. Beneficios B2B
              </Link>
              <Link
                href="/#contacto"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:bg-slate-800 rounded"
              >
                5. Contacto & Galpones
              </Link>
              <Link
                href="/portal/login"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-blue-400 font-semibold hover:bg-slate-800 rounded flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" /> 6. Portal de Acceso Mayorista
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
