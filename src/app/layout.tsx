import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingButtons } from "@/components/FloatingButtons";
import { ToastContainer } from "@/components/ToastContainer";

export const metadata: Metadata = {
  title: "Daisekai Limitada & Osakansai | Importadora de Repuestos Automotrices ZOFRI",
  description: "Fabricación, importación y exportación de repuestos para todo tipo de vehículos. Operaciones en Zona Franca de Iquique (ZOFRI).",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="min-h-screen bg-[#FBF9F5] text-stone-900 flex flex-col antialiased">
        <AppProvider>
          {/* Barra de navegación corporativa estilo MOD JOURNEY */}
          <Navbar />

          {/* Notificaciones push interactivas */}
          <ToastContainer />

          {/* Contenido principal */}
          <main className="flex-1">{children}</main>

          {/* Pie de página elegante estilo MOD JOURNEY */}
          <Footer />

          {/* Botones flotantes (WhatsApp y Bot IA) */}
          <FloatingButtons />
        </AppProvider>
      </body>
    </html>
  );
}
