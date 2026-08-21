"use client";

import { useState } from "react";
import { Check, Share2 } from "lucide-react";

export function ShareButton() {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = window.location.origin;

    if (navigator.share) {
      try {
        await navigator.share({ title: "Calculex", url });
      } catch {
        // usuário cancelou o compartilhamento — não é um erro
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard indisponível nesse navegador — sem alternativa a oferecer
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      aria-label="Copiar ou compartilhar o link do Calculex"
      className="fixed bottom-4 right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900/90 text-neutral-300 shadow-lg backdrop-blur transition hover:border-blue-500/50 hover:text-blue-400"
    >
      {copied ? <Check size={18} className="text-emerald-400" /> : <Share2 size={18} />}
    </button>
  );
}
