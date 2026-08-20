export function sanitizeNumericInput(value: string): string {
  const withDot = value.replace(",", ".");
  const cleaned = withDot.replace(/[^0-9.-]/g, "");

  const isNegative = cleaned.startsWith("-");
  const withoutSign = cleaned.slice(isNegative ? 1 : 0).replace(/-/g, "");

  const firstDotIndex = withoutSign.indexOf(".");
  const withSingleDot =
    firstDotIndex === -1
      ? withoutSign
      : withoutSign.slice(0, firstDotIndex + 1) +
        withoutSign.slice(firstDotIndex + 1).replace(/\./g, "");

  return (isNegative ? "-" : "") + withSingleDot;
}
