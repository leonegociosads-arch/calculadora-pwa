"use client";

import { Display } from "@/components/calculator/Display";
import { DeviceShell } from "@/components/ui/DeviceShell";
import { useBpmCounter } from "@/hooks/useBpmCounter";

export function BpmCounter() {
  const { bpm, tapCount, tap, reset } = useBpmCounter();

  return (
    <DeviceShell label="UTIL · BPM" sublabel="TAP TEMPO">
      <Display value={bpm === null ? "--" : String(bpm)} />
      <p className="text-center text-sm text-neutral-400">
        {tapCount === 0
          ? "Toque no ritmo da música"
          : `${tapCount} toque${tapCount === 1 ? "" : "s"}`}
      </p>
      <button
        type="button"
        onClick={tap}
        className="h-40 rounded-2xl bg-blue-600 text-2xl font-semibold text-white shadow-sm transition hover:bg-blue-500 active:scale-95"
      >
        TAP
      </button>
      <button
        type="button"
        onClick={reset}
        className="h-12 rounded-2xl bg-neutral-600 text-base font-medium text-neutral-100 transition hover:bg-neutral-500"
      >
        Reiniciar
      </button>
    </DeviceShell>
  );
}
