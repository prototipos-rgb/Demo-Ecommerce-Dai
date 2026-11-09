"use client";

import React from "react";
import { HeroSection } from "@/components/LandingSections/HeroSection";
import { InfraestructuraLogistica } from "@/components/LandingSections/InfraestructuraLogistica";
import { CatalogoCiegoSection } from "@/components/LandingSections/CatalogoCiegoSection";
import { BeneficiosB2B } from "@/components/LandingSections/BeneficiosB2B";
import { CompromisoZofri } from "@/components/LandingSections/CompromisoZofri";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Portal Institucional & Hero */}
      <HeroSection />

      {/* 2. Infraestructura & Logística ZOFRI */}
      <InfraestructuraLogistica />

      {/* 3. Catálogo Ciego & Vitrina Mayorista */}
      <CatalogoCiegoSection />

      {/* 4. Modelo B2B, Reglas de Descuento & Backordering */}
      <BeneficiosB2B />

      {/* 5 y 6. Presencia Zofri, Contacto y Formulario de Apertura */}
      <CompromisoZofri />
    </div>
  );
}
