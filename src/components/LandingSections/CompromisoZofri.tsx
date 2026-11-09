"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  HeartHandshake,
  Building,
  CheckCircle2,
  Clock,
  Send,
  MessageCircle
} from "lucide-react";

export const CompromisoZofri: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    empresa: "",
    rut: "",
    contacto: "",
    telefono: "",
    ciudad: "Iquique",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <section id="contacto" className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Corporate, Hub & Philanthropy */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/80 text-blue-400 text-xs font-semibold border border-blue-800/60">
                <Building className="w-3.5 h-3.5" />
                Presencia Regional & Sudamericana
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Centro Operativo ZOFRI & Compromiso con Tarapacá
              </h2>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                Nuestra base física en el extremo norte de Chile nos permite articular importaciones directas de Asia y asegurar conectividad comercial con todo el país y las naciones vecinas.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase">
                  <MapPin className="w-4 h-4" />
                  Galpones Mayoristas Zofri
                </div>
                <div className="text-sm font-semibold text-white">
                  Manzana 11, Galpones 7 y 8
                </div>
                <div className="text-xs text-slate-400">
                  Recinto Amurallado ZOFRI, Iquique, Chile.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase">
                  <Building className="w-4 h-4" />
                  Sede Administrativa
                </div>
                <div className="text-sm font-semibold text-white">
                  Huantajaya 3036
                </div>
                <div className="text-xs text-slate-400">
                  Casa Matriz &bull; Iquique, Región de Tarapacá.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase">
                  <Phone className="w-4 h-4" />
                  Canal Telefónico y WhatsApp
                </div>
                <div className="text-sm font-semibold text-white">
                  +56 9 7523 6397
                </div>
                <div className="text-xs text-slate-400">
                  Fijo ZOFRI: +56 57 2 544220 &bull; Lun - Vie: 08:30 a 18:30
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase">
                  <Clock className="w-4 h-4" />
                  Ventas al Por Mayor
                </div>
                <div className="text-sm font-semibold text-white">
                  Atención In Situ & Remota
                </div>
                <div className="text-xs text-slate-400">
                  Despachos diarios a flotas mineras y talleres.
                </div>
              </div>
            </div>

            {/* Social Responsibility Box */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-950/20 via-slate-900 to-slate-900 border border-amber-900/30 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                <HeartHandshake className="w-4 h-4" />
                Vínculo Social y Comunitario con Tarapacá
              </div>
              <h4 className="text-base font-bold text-white">
                Alianza Filantrópica BLIA Chile & Templo Fo Guang Shan
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Daisekai Ltda. mantiene un estrecho lazo con la comunidad local y asiática en Tarapacá. Entre sus acciones filantrópicas destaca la <strong>donación de 200 sillas de ruedas</strong> canalizadas a través de la Delegación Presidencial Regional para apoyar a los sectores más vulnerables de la región.
              </p>
            </div>
          </div>

          {/* Right Column: B2B Onboarding Form (Demo) */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6">
              <div>
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block mb-1">
                  Sección 6 &bull; Captación B2B
                </span>
                <h3 className="text-xl font-black text-white">
                  Solicitar Apertura de Cuenta Mayorista
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Registra los datos de tu empresa o taller mecánico para habilitar precios netos y cupo comercial.
                </p>
              </div>

              {formSubmitted ? (
                <div className="p-6 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-center space-y-3 animate-fade-in">
                  <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-white text-sm">
                    ¡Solicitud de Validación Recibida!
                  </h4>
                  <p className="text-xs text-slate-300">
                    Tu ejecutivo comercial asignado en Galpones 7 y 8 verificará el RUT Empresa y activará tu cuenta en menos de 2 horas hábiles.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Razón Social / Taller o Flota
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Taller Mecánico San Cristóbal SpA"
                      className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">
                        RUT Empresa (Con guion)
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="77.123.456-7"
                        className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">
                        Ciudad / Región
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Iquique, Antofagasta, Stgo..."
                        className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">
                        Nombre Contacto
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Jefe de Adquisiciones"
                        className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">
                        Teléfono / WhatsApp
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+56 9 1234 5678"
                        className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg transition flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Enviar Solicitud de Apertura B2B</span>
                    </button>
                  </div>

                  <div className="pt-2 text-[11px] text-slate-500 text-center">
                    Los datos son verificados contra la base de contribuyentes del SII y validados por el Administrador en la consola ETL.
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
