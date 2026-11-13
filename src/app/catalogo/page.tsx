"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CatalogoRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirección directa al portal privado según requerimiento de aislamiento de catálogo
    router.replace("/portal");
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="text-center space-y-2">
        <div className="w-8 h-8 border-2 border-aerys-900 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-500 font-medium">
          Accediendo al catálogo privado dentro del portal...
        </p>
      </div>
    </div>
  );
}
