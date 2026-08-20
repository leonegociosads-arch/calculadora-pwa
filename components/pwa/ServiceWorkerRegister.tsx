"use client";

import { useEffect } from "react";

export function ServiceWorkerRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Registro falhou (ex: contexto não seguro, navegador sem suporte) — app segue funcionando normalmente
      });
    }
  }, []);

  return null;
}
