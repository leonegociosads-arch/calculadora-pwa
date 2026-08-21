"use client";

import { Calculator as CalculatorIcon } from "lucide-react";
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
      <DeviceShell icon={CalculatorIcon} label="UTIL · CALC" sublabel="12 DÍGITOS">
        <Display value={displayValue} />
        <Keypad
          onDigit={inputDigit}
          onDecimal={inputDecimal}
          onOperator={chooseOperator}
          onEquals={handleEquals}
          onClear={clear}
          operatorVariants={{ "×": "op-teal", "-": "op-purple", "+": "op-red" }}
          clearVariant="action"
        />
      </DeviceShell>
      <HistoryPanel history={history} onClear={clearHistory} />
    </div>
  );
}
