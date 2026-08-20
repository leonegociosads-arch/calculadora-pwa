import { Lock } from "lucide-react";

interface PremiumLockBadgeProps {
  className?: string;
}

export function PremiumLockBadge({ className = "" }: PremiumLockBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-amber-400/10 px-2 py-1 text-xs font-medium text-amber-400 ${className}`}
    >
      <Lock size={12} strokeWidth={2} />
      Premium
    </span>
  );
}
