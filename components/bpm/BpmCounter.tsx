"use client";

import { Activity, RotateCcw } from "lucide-react";
import { Display } from "@/components/calculator/Display";
import { DeviceShell } from "@/components/ui/DeviceShell";
import { useBpmCounter } from "@/hooks/useBpmCounter";

export function BpmCounter() {
  const { bpm, tapCount, tap, reset } = useBpmCounter();

  return (
    <DeviceShell icon={Activity} label="UTIL · BPM" sublabel="TAP TEMPO">
      <Display value={bpm === null ? "--" : String(bpm)} suffix="BPM" />

      <div className="flex items-center justify-center gap-2 text-sm text-neutral-400">
        <span className="h-px w-6 bg-neutral-700" />
        <span>
          {tapCount === 0
            ? "Toque no ritmo da música"
            : `${tapCount} toque${tapCount === 1 ? "" : "s"}`}
        </span>
        <span className="h-px w-6 bg-neutral-700" />
      </div>

      <button
        type="button"
        onClick={tap}
        className="relative flex h-40 flex-col items-center justify-center gap-2 overflow-hidden rounded-3xl border border-blue-400/40 bg-gradient-to-b from-blue-600 to-blue-800 text-2xl font-semibold text-white shadow-[0_0_40px_rgba(37,99,235,0.5)] transition active:scale-95"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute h-24 w-24 rounded-full border border-white/20"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute h-16 w-16 rounded-full border border-white/20"
        />
        <span className="relative">TAP</span>
        <Activity size={20} className="relative text-blue-200" />
      </button>

      <button
        type="button"
        onClick={reset}
        className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-neutral-800 bg-neutral-900/60 text-base font-medium text-neutral-200 transition hover:bg-neutral-800"
      >
        <RotateCcw size={16} className="text-blue-400" />
        Reiniciar
      </button>
    </DeviceShell>
  );
}
