import { CalcButton } from "./CalcButton";
import type { UnaryFunction } from "@/lib/scientificCalculator";

interface ScientificKeypadProps {
  onFunction: (fn: UnaryFunction) => void;
  onPower: () => void;
  onPi: () => void;
}

export function ScientificKeypad({ onFunction, onPower, onPi }: ScientificKeypadProps) {
  return (
    <div className="grid grid-cols-4 gap-3">
      <CalcButton label="sin" variant="function" onClick={() => onFunction("sin")} />
      <CalcButton label="cos" variant="function" onClick={() => onFunction("cos")} />
      <CalcButton label="tan" variant="function" onClick={() => onFunction("tan")} />
      <CalcButton label="√" variant="function" onClick={() => onFunction("√")} />

      <CalcButton label="log" variant="function" onClick={() => onFunction("log")} />
      <CalcButton label="ln" variant="function" onClick={() => onFunction("ln")} />
      <CalcButton label="xʸ" variant="function" onClick={onPower} />
      <CalcButton label="%" variant="function" onClick={() => onFunction("%")} />

      <CalcButton label="π" variant="function" className="col-span-4" onClick={onPi} />
    </div>
  );
}
