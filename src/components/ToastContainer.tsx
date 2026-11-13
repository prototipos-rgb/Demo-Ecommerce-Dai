"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { CheckCircle2, AlertTriangle, Info, X } from "lucide-react";

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-slate-900 text-white rounded-2xl p-4 shadow-2xl border border-slate-700/80 backdrop-blur-md flex items-start gap-3 transform transition-all duration-300 animate-in fade-in slide-in-from-top-4"
        >
          <div className="shrink-0 mt-0.5">
            {toast.type === "success" && (
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            )}
            {toast.type === "warning" && (
              <AlertTriangle className="w-5 h-5 text-amber-400" />
            )}
            {toast.type === "info" && (
              <Info className="w-5 h-5 text-celeste-400" />
            )}
          </div>

          <div className="flex-1 space-y-0.5">
            <div className="flex items-center justify-between">
              <h5 className="text-xs font-bold text-white tracking-tight">
                {toast.title}
              </h5>
              <span className="text-[10px] text-slate-400 font-mono">
                {toast.timestamp}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-snug">
              {toast.message}
            </p>
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
