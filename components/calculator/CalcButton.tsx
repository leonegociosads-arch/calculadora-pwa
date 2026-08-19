interface CalcButtonProps {
  label: string;
  onClick: () => void;
  variant?: "number" | "operator" | "action" | "equals" | "function";
  className?: string;
}

const variantStyles: Record<NonNullable<CalcButtonProps["variant"]>, string> = {
  number: "bg-white text-neutral-900 hover:bg-neutral-100",
  operator: "bg-neutral-100 text-neutral-900 hover:bg-neutral-200",
  action: "bg-neutral-200 text-neutral-900 hover:bg-neutral-300",
  equals: "bg-blue-600 text-white hover:bg-blue-700",
  function: "bg-indigo-50 text-indigo-700 hover:bg-indigo-100",
};

export function CalcButton({
  label,
  onClick,
  variant = "number",
  className = "",
}: CalcButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-16 rounded-2xl text-xl font-medium shadow-sm transition active:scale-95 ${variantStyles[variant]} ${className}`}
    >
      {label}
    </button>
  );
}
