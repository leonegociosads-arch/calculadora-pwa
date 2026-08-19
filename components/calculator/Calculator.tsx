"use client";

import { Display } from "./Display";
import { Keypad } from "./Keypad";
import { useCalculator } from "@/hooks/useCalculator";

export function Calculator() {
  const { displayValue, inputDigit, inputDecimal, chooseOperator, handleEquals, clear } =
    useCalculator();

  return (
    <div className="flex flex-col gap-4">
      <Display value={displayValue} />
      <Keypad
        onDigit={inputDigit}
        onDecimal={inputDecimal}
        onOperator={chooseOperator}
        onEquals={handleEquals}
        onClear={clear}
      />
    </div>
  );
}
