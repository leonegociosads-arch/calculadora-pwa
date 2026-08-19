"use client";

import { Display } from "./Display";
import { Keypad } from "./Keypad";
import { ScientificKeypad } from "./ScientificKeypad";
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
  } = useCalculator();

  return (
    <div className="flex flex-col gap-4">
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
      />
    </div>
  );
}
