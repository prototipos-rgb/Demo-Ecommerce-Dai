"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { SpecialtySection } from "@/components/SpecialtySection";
import {
  MapPin,
  Phone,
  Mail,
  Building,
  Container,
  Lock,
  CheckCircle2,
  Send,
  ArrowRight,
  ShieldCheck,
  HeartHandshake,
  Truck,
  Wrench,
  Sparkles
} from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const { setRole, setClientApprovalStatus, addToast } = useApp();

  const [loginRut, setLoginRut] = useState("76.842.190-K");
  const [loginPass, setLoginPass] = useState("••••••••");
  const [activeTab, setActiveTab] = useState<"login" | "registro">("login");
  const [registroExitoso, setRegistroExitoso] = useState(false);
  const [registroForm, setRegistroForm] = useState({
    razonSocial: "",
    rut: "",
    giro: "",
    contacto: "",
    telefono: "",
    correo: "",
    ciudad: "Iquique",
  });

  const handleDirectLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setRole("b2b_client");
    setClientApprovalStatus("aprobado");
    addToast(
      "Sesión Mayorista Iniciada",
      "Bienvenido a la plataforma privada de Daisekai ZOFRI.",
      "success"
    );
    router.push("/portal");
  };

  const handleRegistroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegistroExitoso(true);
    addToast(
      "Solicitud de Cuenta Enviada",
      "Los datos de su empresa han sido remitidos a la administración para su evaluación.",
      "info"
    );
    setTimeout(() => {
      setRegistroForm({
        razonSocial: "",
        rut: "",
        giro: "",
        contacto: "",
        telefono: "",
        correo: "",
        ciudad: "Iquique",
      });
    }, 4500);
  };

  return (
    <div className="bg-[#FBF9F5] min-h-screen text-stone-900 selection:bg-stone-900 selection:text-white">
      {/* ================= SECCIÓN 1: INICIO & ACCESO AL PORTAL (HERO + LOGIN) ================= */}
      <section id="inicio" className="relative py-20 sm:py-28 border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Columna Izquierda: Identidad Editorial y Presentación */}
            <div className="lg:col-span-6 space-y-8">
              {/* Marca Tipográfica Limpia y Refinada */}
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-200 text-stone-600 text-xs font-semibold uppercase tracking-wider shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-900" />
                  <span>Zona Franca de Iquique &bull; ZOFRI</span>
                </div>

                <div className="flex items-baseline gap-2 pt-2">
                  <span className="text-4xl sm:text-6xl font-normal tracking-tight text-stone-900 font-serif">
                    Daisekai
                  </span>
                  <span className="text-xl sm:text-2xl font-bold text-red-600 font-sans tracking-tight">
                    Automotive
                  </span>
                </div>
                <div className="text-xs font-mono tracking-widest uppercase text-stone-600">
                  Importación &bull; Exportación &bull; Firma Hermana Osakansai
                </div>
              </div>

              {/* Titular y Párrafo Oficial */}
              <div className="space-y-4">
                <h1 className="text-2xl sm:text-4xl font-normal text-stone-900 tracking-tight leading-snug font-serif">
                  Infraestructura mayorista de abastecimiento y repuestos para flotas y talleres
                </h1>
                <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">
                  Somos una organización especializada en la <strong>fabricación, importación y exportación de repuestos</strong> para todo tipo de vehículo presente en el mercado, tanto nacional como extranjero.
                </p>
              </div>

              {/* Datos de contacto rápidos */}
              <div className="pt-4 border-t border-stone-200/80 flex flex-wrap items-center gap-6 text-xs text-stone-500 font-light">
                <span className="flex items-center gap-1.5">
                  <Container className="w-4 h-4 text-stone-700" />
                  Galpones 7 y 8, Manzana 11 ZOFRI
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-stone-700" />
                  Móvil: <strong>9 7523 6397</strong>
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-stone-700" />
                  Garantía de Origen
                </span>
              </div>
            </div>

            {/* Columna Derecha: EL PORTAL DE LOGIN (Primero que se muestra) */}
            <div className="lg:col-span-6">
              <div className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-10 shadow-xl space-y-6">
                {/* Pestañas de Login vs Registro */}
                <div className="flex border-b border-stone-100 pb-3 gap-8">
                  <button
                    onClick={() => setActiveTab("login")}
                    className={`pb-2 text-xs font-bold uppercase tracking-wider transition ${
                      activeTab === "login"
                        ? "text-stone-900 border-b-2 border-stone-900"
                        : "text-stone-400 hover:text-stone-700"
                    }`}
                  >
                    1. Iniciar Sesión Mayorista
                  </button>
                  <button
                    onClick={() => setActiveTab("registro")}
                    className={`pb-2 text-xs font-bold uppercase tracking-wider transition ${
                      activeTab === "registro"
                        ? "text-stone-900 border-b-2 border-stone-900"
                        : "text-stone-400 hover:text-stone-700"
                    }`}
                  >
                    2. Solicitar Cuenta
                  </button>
                </div>

                {activeTab === "login" ? (
                  <form onSubmit={handleDirectLogin} className="space-y-4 text-xs">
                    <div>
                      <label className="block text-stone-600 font-bold mb-1.5 uppercase tracking-wider text-[11px]">
                        RUT Empresa / Taller Mecánico
                      </label>
                      <input
                        type="text"
                        value={loginRut}
                        onChange={(e) => setLoginRut(e.target.value)}
                        placeholder="76.xxx.xxx-x"
                        className="w-full px-4 py-3 bg-[#F6F4EE] border border-stone-200 rounded-xl text-stone-900 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-stone-900 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-stone-600 font-bold mb-1.5 uppercase tracking-wider text-[11px]">
                        Contraseña de Acceso
                      </label>
                      <input
                        type="password"
                        value={loginPass}
                        onChange={(e) => setLoginPass(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-4 py-3 bg-[#F6F4EE] border border-stone-200 rounded-xl text-stone-900 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-stone-900 transition"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-4 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs tracking-wider uppercase transition shadow-md flex items-center justify-center gap-2 group"
                      >
                        <Lock className="w-3.5 h-3.5 text-stone-300" />
                        <span>Ingresar al Portal Privado</span>
                        <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition">
                          <ArrowRight className="w-3 h-3 text-white" />
                        </div>
                      </button>
                    </div>
                  </form>
                ) : (
                  <div>
                    {registroExitoso ? (
                      <div className="p-8 rounded-2xl bg-[#F6F4EE] border border-stone-200 text-center space-y-3">
                        <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto" />
                        <h4 className="text-base font-bold text-stone-900 font-serif">
                          Solicitud de Registro Enviada
                        </h4>
                        <p className="text-xs text-stone-600 font-light leading-relaxed">
                          Los antecedentes de su empresa han sido derivados al departamento de Administración para su evaluación y validación de contribuyente en el SII.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleRegistroSubmit} className="space-y-3.5 text-xs">
                        <div>
                          <label className="block text-stone-600 font-bold mb-1 text-[11px]">
                            Razón Social de la Empresa o Taller
                          </label>
                          <input
                            type="text"
                            required
                            value={registroForm.razonSocial}
                            onChange={(e) =>
                              setRegistroForm({ ...registroForm, razonSocial: e.target.value })
                            }
                            placeholder="Ej. Taller Mecánico San Cristóbal SpA"
                            className="w-full px-3.5 py-2.5 bg-[#F6F4EE] border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-stone-600 font-bold mb-1 text-[11px]">
                              RUT Empresa
                            </label>
                            <input
                              type="text"
                              required
                              value={registroForm.rut}
                              onChange={(e) =>
                                setRegistroForm({ ...registroForm, rut: e.target.value })
                              }
                              placeholder="76.xxx.xxx-x"
                              className="w-full px-3.5 py-2.5 bg-[#F6F4EE] border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900 font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-stone-600 font-bold mb-1 text-[11px]">
                              Ciudad / Región
                            </label>
                            <input
                              type="text"
                              required
                              value={registroForm.ciudad}
                              onChange={(e) =>
                                setRegistroForm({ ...registroForm, ciudad: e.target.value })
                              }
                              placeholder="Iquique, Pozo Almonte..."
                              className="w-full px-3.5 py-2.5 bg-[#F6F4EE] border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-stone-600 font-bold mb-1 text-[11px]">
                            Giro Comercial
                          </label>
                          <input
                            type="text"
                            required
                            value={registroForm.giro}
                            onChange={(e) =>
                              setRegistroForm({ ...registroForm, giro: e.target.value })
                            }
                            placeholder="Mantenimiento de flotas, venta de repuestos..."
                            className="w-full px-3.5 py-2.5 bg-[#F6F4EE] border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-stone-600 font-bold mb-1 text-[11px]">
                              Nombre Contacto
                            </label>
                            <input
                              type="text"
                              required
                              value={registroForm.contacto}
                              onChange={(e) =>
                                setRegistroForm({ ...registroForm, contacto: e.target.value })
                              }
                              placeholder="Jefe de adquisiciones"
                              className="w-full px-3.5 py-2.5 bg-[#F6F4EE] border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900"
                            />
                          </div>
                          <div>
                            <label className="block text-stone-600 font-bold mb-1 text-[11px]">
                              Teléfono / WhatsApp
                            </label>
                            <input
                              type="tel"
                              required
                              value={registroForm.telefono}
                              onChange={(e) =>
                                setRegistroForm({ ...registroForm, telefono: e.target.value })
                              }
                              placeholder="+56 9 xxxx xxxx"
                              className="w-full px-3.5 py-2.5 bg-[#F6F4EE] border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-stone-600 font-bold mb-1 text-[11px]">
                            Correo Electrónico de Contacto
                          </label>
                          <input
                            type="email"
                            required
                            value={registroForm.correo}
                            onChange={(e) =>
                              setRegistroForm({ ...registroForm, correo: e.target.value })
                            }
                            placeholder="contacto@empresa.cl"
                            className="w-full px-3.5 py-2.5 bg-[#F6F4EE] border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900"
                          />
                        </div>

                        <div className="pt-1">
                          <button
                            type="submit"
                            className="w-full py-3.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-wider transition shadow-md flex items-center justify-center gap-2"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Enviar Solicitud a Administración</span>
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECCIÓN 2: NOSOTROS & CENTRO OPERATIVO ZOFRI (SEPARADA) ================= */}
      <section id="nosotros" className="py-24 sm:py-32 bg-white border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-stone-400">
              Centro Operativo & Abastecimiento
            </span>
            <h2 className="text-3xl sm:text-5xl font-normal text-stone-900 tracking-tight font-serif">
              Infraestructura en el Recinto Amurallado de ZOFRI
            </h2>
            <p className="text-stone-600 text-base font-light leading-relaxed">
              <strong>Importadora y Exportadora Daisekai Limitada</strong> (también conocida comercialmente como <strong>Osakansai</strong>) es una empresa chilena activa en la Zona Franca de Iquique, perteneciente al mismo grupo empresarial internacional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#FBF9F5] p-8 rounded-3xl border border-stone-200 space-y-4 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-2xl bg-white text-stone-800 flex items-center justify-center border border-stone-200 shadow-xs">
                <Container className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 font-serif">
                Recepción Directa en Contenedores
              </h3>
              <p className="text-xs text-stone-600 font-light leading-relaxed">
                Operamos directamente desde contenedores marítimos que recibimos de forma constante en el <strong>Recinto Amurallado de la ZOFRI</strong>, descargando en <strong>Manzana 11, Galpones 7 y 8</strong>.
              </p>
            </div>

            <div className="bg-[#FBF9F5] p-8 rounded-3xl border border-stone-200 space-y-4 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-2xl bg-white text-stone-800 flex items-center justify-center border border-stone-200 shadow-xs">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 font-serif">
                Despachos a Chile y Sudamérica
              </h3>
              <p className="text-xs text-stone-600 font-light leading-relaxed">
                Realizamos despachos mayoristas tanto a nivel local e interregional a todo Chile como exportaciones hacia diversos países del cono sur, atendiendo flotas mineras y talleres especializados.
              </p>
            </div>

            <div className="bg-[#FBF9F5] p-8 rounded-3xl border border-stone-200 space-y-4 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-2xl bg-white text-stone-800 flex items-center justify-center border border-stone-200 shadow-xs">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 font-serif">
                Firma Registrada Osakansai
              </h3>
              <p className="text-xs text-stone-600 font-light leading-relaxed">
                Comercializamos repuestos garantizados bajo nuestra propia marca registrada <strong>Osakansai</strong>, con especial prestigio en empaquetaduras de culata y cilindros de freno.
              </p>
            </div>
          </div>

          {/* Bloque Comunitario y Social */}
          <div className="bg-[#FBF9F5] p-8 rounded-3xl border border-stone-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white text-stone-700 flex items-center justify-center shrink-0 border border-stone-200 shadow-xs">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-stone-900 font-serif">
                  Compromiso Social con la Región de Tarapacá
                </h4>
                <p className="text-xs text-stone-600 mt-1 font-light leading-relaxed">
                  A través de la Asociación Internacional de la Luz de Buda (BLIA Chile-Iquique) y el Templo Budista Fo Guang Shan, Daisekai Ltda. gestiona donaciones filantrópicas de ayudas técnicas, destacando la <strong>donación de 200 sillas de ruedas</strong> entregadas directamente a la Delegación Presidencial Regional de Tarapacá.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECCIÓN 3: ESPECIALIDAD & MARCAS (CARRUSEL + TARJETAS GRANDES) ================= */}
      <SpecialtySection />

      {/* ================= SECCIÓN 4: CONTACTO & UBICACIÓN ZOFRI (SEPARADA) ================= */}
      <section id="contacto" className="py-24 sm:py-32 bg-white border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-stone-400">
              Ubicación y Atención
            </span>
            <h2 className="text-3xl sm:text-5xl font-normal text-stone-900 tracking-tight font-serif">
              Canales de Contacto Directo
            </h2>
            <p className="text-stone-600 text-sm font-light">
              Visítenos en la Zona Franca o contáctenos por nuestros canales oficiales.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#FBF9F5] p-6 rounded-3xl border border-stone-200 space-y-2">
              <div className="text-xs font-bold text-stone-700 uppercase flex items-center gap-1.5">
                <MapPin className="w-4 h-4" /> Centro Operativo ZOFRI
              </div>
              <div className="text-sm font-bold text-stone-900 font-serif">
                Manzana 11, Galpones 7 y 8
              </div>
              <div className="text-xs text-stone-500 font-light">
                Recinto Amurallado ZOFRI, Iquique, Chile.
              </div>
            </div>

            <div className="bg-[#FBF9F5] p-6 rounded-3xl border border-stone-200 space-y-2">
              <div className="text-xs font-bold text-stone-700 uppercase flex items-center gap-1.5">
                <Building className="w-4 h-4" /> Sede Administrativa
              </div>
              <div className="text-sm font-bold text-stone-900 font-serif">
                Huantajaya 3036
              </div>
              <div className="text-xs text-stone-500 font-light">
                Iquique, Región de Tarapacá.
              </div>
            </div>

            <div className="bg-[#FBF9F5] p-6 rounded-3xl border border-stone-200 space-y-2">
              <div className="text-xs font-bold text-stone-700 uppercase flex items-center gap-1.5">
                <Phone className="w-4 h-4" /> Teléfono Celular
              </div>
              <div className="text-sm font-bold text-stone-900 font-mono">
                9 7523 6397
              </div>
              <div className="text-xs text-stone-500 font-light">
                WhatsApp: +56 9 7523 6397
              </div>
            </div>

            <div className="bg-[#FBF9F5] p-6 rounded-3xl border border-stone-200 space-y-2">
              <div className="text-xs font-bold text-stone-700 uppercase flex items-center gap-1.5">
                <Phone className="w-4 h-4" /> Teléfono Fijo ZOFRI
              </div>
              <div className="text-sm font-bold text-stone-900 font-mono">
                +56 57 2 544220
              </div>
              <div className="text-xs text-stone-500 font-light">
                Oficina comercial en galpones.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
