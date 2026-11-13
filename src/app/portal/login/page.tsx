"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirige al inicio donde está integrado el módulo de login
    router.replace("/#inicio");
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="text-center space-y-2">
        <div className="w-8 h-8 border-2 border-aerys-900 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-500 font-medium">
          Cargando portal de acceso...
        </p>
      </div>
    </div>
  );
}
