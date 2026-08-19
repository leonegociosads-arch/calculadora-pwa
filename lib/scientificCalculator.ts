export type UnaryFunction = "sin" | "cos" | "tan" | "log" | "ln" | "√" | "%";

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

export function applyUnary(value: number, fn: UnaryFunction): number {
  switch (fn) {
    case "sin":
      return Math.sin(toRadians(value));
    case "cos":
      return Math.cos(toRadians(value));
    case "tan":
      return Math.tan(toRadians(value));
    case "log":
      return value > 0 ? Math.log10(value) : NaN;
    case "ln":
      return value > 0 ? Math.log(value) : NaN;
    case "√":
      return value >= 0 ? Math.sqrt(value) : NaN;
    case "%":
      return value / 100;
    default:
      return NaN;
  }
}
