import { CalcButton } from "./CalcButton";
import type { UnaryFunction } from "@/lib/scientificCalculator";

interface ScientificKeypadProps {
  onFunction: (fn: UnaryFunction) => void;
  onPower: () => void;
  onPi: () => void;
}

export function ScientificKeypad({ onFunction, onPower, onPi }: ScientificKeypadProps) {
  return (
    <div className="grid grid-cols-4 gap-2">
      <CalcButton size="sm" label="sin" variant="function" onClick={() => onFunction("sin")} />
      <CalcButton size="sm" label="cos" variant="function" onClick={() => onFunction("cos")} />
      <CalcButton size="sm" label="tan" variant="function" onClick={() => onFunction("tan")} />
      <CalcButton size="sm" label="√" variant="function" onClick={() => onFunction("√")} />

      <CalcButton size="sm" label="log" variant="function" onClick={() => onFunction("log")} />
      <CalcButton size="sm" label="ln" variant="function" onClick={() => onFunction("ln")} />
      <CalcButton size="sm" label="xʸ" variant="function" onClick={onPower} />
      <CalcButton size="sm" label="%" variant="function" onClick={() => onFunction("%")} />

      <CalcButton
        size="sm"
        label="π"
        variant="function"
        className="col-span-4"
        onClick={onPi}
      />
    </div>
  );
}
