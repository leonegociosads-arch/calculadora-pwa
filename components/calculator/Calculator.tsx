"use client";

import { Display } from "./Display";
import { Keypad } from "./Keypad";
import { HistoryPanel } from "./HistoryPanel";
import { DeviceShell } from "@/components/ui/DeviceShell";
import { useCalculator } from "@/hooks/useCalculator";

export function Calculator() {
  const {
    displayValue,
    inputDigit,
    inputDecimal,
    chooseOperator,
    handleEquals,
    clear,
    history,
    clearHistory,
  } = useCalculator();

  return (
    <div className="flex flex-col gap-4">
      <DeviceShell label="UTIL · CALC" sublabel="12 DÍGITOS" showSolarStrip>
        <Display value={displayValue} />
        <Keypad
          onDigit={inputDigit}
          onDecimal={inputDecimal}
          onOperator={chooseOperator}
          onEquals={handleEquals}
          onClear={clear}
          operatorVariants={{ "×": "op-green", "-": "op-pink", "+": "op-red" }}
          clearVariant="equals"
        />
      </DeviceShell>
      <HistoryPanel history={history} onClear={clearHistory} />
    </div>
  );
}
