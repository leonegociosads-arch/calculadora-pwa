"use client";

import { Display } from "./Display";
import { Keypad } from "./Keypad";
import { ScientificKeypad } from "./ScientificKeypad";
import { HistoryPanel } from "./HistoryPanel";
import { DeviceShell } from "@/components/ui/DeviceShell";
import { useCalculator } from "@/hooks/useCalculator";

export function ScientificCalculator() {
  const {
    displayValue,
    inputDigit,
    inputDecimal,
    chooseOperator,
    handleEquals,
    clear,
    applyFunction,
    insertPi,
    history,
    clearHistory,
  } = useCalculator();

  return (
    <div className="flex flex-col gap-4">
      <DeviceShell label="UTIL · CALC SCI" sublabel="AVANÇADA">
        <Display value={displayValue} />
        <ScientificKeypad
          onFunction={applyFunction}
          onPower={() => chooseOperator("xʸ")}
          onPi={insertPi}
        />
        <Keypad
          onDigit={inputDigit}
          onDecimal={inputDecimal}
          onOperator={chooseOperator}
          onEquals={handleEquals}
          onClear={clear}
          operatorVariants={{ "×": "op-pink", "÷": "op-red", "+": "op-green" }}
          clearVariant="op-red"
        />
      </DeviceShell>
      <HistoryPanel history={history} onClear={clearHistory} />
    </div>
  );
}
