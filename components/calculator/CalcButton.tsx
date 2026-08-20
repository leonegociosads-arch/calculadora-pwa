export type CalcButtonVariant =
  | "number"
  | "operator"
  | "action"
  | "equals"
  | "function"
  | "op-green"
  | "op-pink"
  | "op-red";

interface CalcButtonProps {
  label: string;
  onClick: () => void;
  variant?: CalcButtonVariant;
  size?: "md" | "sm";
  className?: string;
}

const variantStyles: Record<CalcButtonVariant, string> = {
  number: "bg-neutral-800 text-neutral-100 hover:bg-neutral-700",
  operator: "bg-neutral-700 text-neutral-100 hover:bg-neutral-600",
  action: "bg-neutral-600 text-neutral-100 hover:bg-neutral-500",
  equals: "bg-blue-600 text-white hover:bg-blue-500",
  function: "bg-neutral-800 text-blue-300 hover:bg-neutral-700",
  "op-green": "bg-emerald-600 text-white hover:bg-emerald-500",
  "op-pink": "bg-fuchsia-600 text-white hover:bg-fuchsia-500",
  "op-red": "bg-red-600 text-white hover:bg-red-500",
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
      className={`rounded-2xl font-medium shadow-sm transition active:scale-95 ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {label}
    </button>
  );
}
