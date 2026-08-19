export type Operator = "+" | "-" | "×" | "÷" | "xʸ";

export function calculate(a: number, b: number, operator: Operator): number {
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "×":
      return a * b;
    case "÷":
      return b === 0 ? NaN : a / b;
    case "xʸ":
      return Math.pow(a, b);
    default:
      return NaN;
  }
}
