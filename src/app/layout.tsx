import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { DemoControlBar } from "@/components/DemoControlBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AiSearchBotWidget } from "@/components/AiSearchBotWidget";

export const metadata: Metadata = {
  title: "Daisekai Automotriz & Osakansai | E-Commerce B2B ZOFRI",
  description: "Importadora y Exportadora Daisekai Limitada - Catálogo Mayorista de Repuestos Automotrices en Zona Franca de Iquique. Desarrollado por Aerys IT.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark scroll-smooth">
      <body className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased selection:bg-blue-600 selection:text-white">
        <AppProvider>
          {/* Top Demo Controller Bar for client meetings */}
          <DemoControlBar />

          {/* Sticky Corporate Navbar */}
          <Navbar />

          {/* Main Page Content */}
          <main className="flex-1">{children}</main>

          {/* Corporate Footer with Zofri details and Aerys credit */}
          <Footer />

          {/* Floating AI Search Bot preview */}
          <AiSearchBotWidget />
        </AppProvider>
      </body>
    </html>
  );
}
