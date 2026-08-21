export type CalcButtonVariant =
  | "number"
  | "operator"
  | "action"
  | "equals"
  | "function"
  | "op-teal"
  | "op-purple"
  | "op-red";

interface CalcButtonProps {
  label: string;
  onClick: () => void;
  variant?: CalcButtonVariant;
  size?: "md" | "sm";
  className?: string;
}

const variantStyles: Record<CalcButtonVariant, string> = {
  number: "border border-neutral-700/50 bg-neutral-800/80 text-neutral-100 hover:bg-neutral-700",
  operator: "border border-blue-900/40 bg-neutral-800/80 text-blue-400 hover:bg-neutral-700",
  action:
    "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:from-blue-500 hover:to-blue-400",
  equals:
    "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:from-blue-500 hover:to-blue-400",
  function: "border border-blue-900/40 bg-neutral-800/80 text-blue-300 hover:bg-neutral-700",
  "op-teal":
    "bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-[0_0_15px_rgba(20,184,166,0.35)] hover:from-teal-400 hover:to-cyan-500",
  "op-purple":
    "bg-gradient-to-br from-purple-600 to-violet-700 text-white shadow-[0_0_15px_rgba(147,51,234,0.35)] hover:from-purple-500 hover:to-violet-600",
  "op-red":
    "bg-gradient-to-br from-red-600 to-rose-700 text-white shadow-[0_0_15px_rgba(220,38,38,0.35)] hover:from-red-500 hover:to-rose-600",
};

const sizeStyles: Record<NonNullable<CalcButtonProps["size"]>, string> = {
  md: "h-16 text-xl",
  sm: "h-12 text-base",
};

export function CalcButton({
  label,
  onClick,
  variant = "number",
  size = "md",
  className = "",
}: CalcButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl font-medium transition active:scale-95 ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {label}
    </button>
  );
}
