import { CalcButton } from "./CalcButton";
import type { Operator } from "@/lib/calculator";

interface KeypadProps {
  onDigit: (digit: string) => void;
  onDecimal: () => void;
  onOperator: (operator: Operator) => void;
  onEquals: () => void;
  onClear: () => void;
}

export function Keypad({
  onDigit,
  onDecimal,
  onOperator,
  onEquals,
  onClear,
}: KeypadProps) {
  return (
    <div className="grid grid-cols-4 gap-3">
      <CalcButton label="C" variant="action" className="col-span-3" onClick={onClear} />
      <CalcButton label="÷" variant="operator" onClick={() => onOperator("÷")} />

      <CalcButton label="7" onClick={() => onDigit("7")} />
      <CalcButton label="8" onClick={() => onDigit("8")} />
      <CalcButton label="9" onClick={() => onDigit("9")} />
      <CalcButton label="×" variant="operator" onClick={() => onOperator("×")} />

      <CalcButton label="4" onClick={() => onDigit("4")} />
      <CalcButton label="5" onClick={() => onDigit("5")} />
      <CalcButton label="6" onClick={() => onDigit("6")} />
      <CalcButton label="-" variant="operator" onClick={() => onOperator("-")} />

      <CalcButton label="1" onClick={() => onDigit("1")} />
      <CalcButton label="2" onClick={() => onDigit("2")} />
      <CalcButton label="3" onClick={() => onDigit("3")} />
      <CalcButton label="+" variant="operator" onClick={() => onOperator("+")} />

      <CalcButton label="0" className="col-span-2" onClick={() => onDigit("0")} />
      <CalcButton label="." onClick={onDecimal} />
      <CalcButton label="=" variant="equals" onClick={onEquals} />
    </div>
  );
}
