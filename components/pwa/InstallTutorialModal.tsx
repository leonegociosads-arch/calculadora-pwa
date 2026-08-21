"use client";

import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "calculex-pwa-tutorial-shown";

type Platform = "ios" | "android" | "other";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallTutorialModal() {
  const [visible, setVisible] = useState(false);
  const [showSteps, setShowSteps] = useState(false);
  const [platform, setPlatform] = useState<Platform>("other");
  const [canPromptInstall, setCanPromptInstall] = useState(false);
  const deferredPromptRef = useRef<BeforeInstallPromptEvent | null>(null);

  // No Android, o Chrome avisa quando o app pode ser instalado de verdade
  // com um toque só — capturamos esse evento pra usar em vez de só mostrar
  // instruções manuais (isso não existe no iOS, só funciona no Android).
  useEffect(() => {
    function handleBeforeInstallPrompt(event: Event) {
      event.preventDefault();
      deferredPromptRef.current = event as BeforeInstallPromptEvent;
      setCanPromptInstall(true);
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  useEffect(() => {
    let alreadyShown = true;
    try {
      alreadyShown = Boolean(localStorage.getItem(STORAGE_KEY));
    } catch {
      return;
    }
    if (alreadyShown) {
      return;
    }

    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;

    if (isStandalone) {
      markAsShown();
      return;
    }

    const ua = window.navigator.userAgent;
    const isIOS = /iPhone|iPad|iPod/.test(ua);
    const isAndroid = /Android/.test(ua);

    if (!isIOS && !isAndroid) {
      return;
    }

    setPlatform(isIOS ? "ios" : "android");
    setVisible(true);
  }, []);

  function markAsShown() {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // localStorage indisponível — segue sem lembrar a escolha
    }
  }

  function dismiss() {
    markAsShown();
    setVisible(false);
  }

  async function installNow() {
    const deferredPrompt = deferredPromptRef.current;
    if (!deferredPrompt) {
      setShowSteps(true);
      return;
    }

    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPromptRef.current = null;
    setCanPromptInstall(false);
    dismiss();
  }

  if (!visible) {
    return null;
  }

  const canOneTapInstall = platform === "android" && canPromptInstall;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 px-4 pb-6 sm:items-center">
      <div className="w-full max-w-md rounded-2xl border border-neutral-800 bg-neutral-900 p-5 shadow-lg">
        {!showSteps ? (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-lg font-semibold text-neutral-100">
                Instale o Calculex no seu celular
              </span>
              <span className="text-sm text-neutral-400">
                Adicione à tela inicial para abrir como um app, mais rápido e
                funcionando até sem internet.
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={canOneTapInstall ? installNow : () => setShowSteps(true)}
                className="h-11 rounded-2xl bg-blue-600 text-sm font-semibold text-white transition hover:bg-blue-500"
              >
                {canOneTapInstall ? "Instalar agora" : "Ver como instalar"}
              </button>
              <button
                type="button"
                onClick={dismiss}
                className="h-11 rounded-2xl border border-neutral-800 text-sm text-neutral-400 transition hover:bg-neutral-800"
              >
                Agora não
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <span className="text-lg font-semibold text-neutral-100">Como instalar</span>
            <ol className="flex flex-col gap-2 text-sm text-neutral-300">
              {platform === "ios" ? (
                <>
                  <li>1. Toque no ícone de compartilhar (□↑) na barra do Safari.</li>
                  <li>2. Role para baixo e toque em &quot;Adicionar à Tela de Início&quot;.</li>
                  <li>3. Toque em &quot;Adicionar&quot;, no canto superior direito.</li>
                </>
              ) : (
                <>
                  <li>1. Toque no menu (⋮) no canto superior direito do Chrome.</li>
                  <li>
                    2. Toque em &quot;Instalar aplicativo&quot; (ou &quot;Adicionar à tela
                    inicial&quot;, dependendo da versão).
                  </li>
                  <li>3. Confirme tocando em &quot;Instalar&quot;.</li>
                </>
              )}
            </ol>
            <button
              type="button"
              onClick={dismiss}
              className="h-11 rounded-2xl bg-blue-600 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Entendi
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
