import Link from "next/link";
import { PremiumLockBadge } from "@/components/ui/PremiumLockBadge";

interface UpgradePromptProps {
  title?: string;
}

export function UpgradePrompt({ title = "Recurso Premium" }: UpgradePromptProps) {
  return (
    <div className="flex flex-col items-start gap-3 rounded-2xl border border-neutral-800 bg-neutral-900 p-5">
      <PremiumLockBadge />
      <div className="flex flex-col gap-1">
        <span className="text-base font-semibold text-neutral-100">{title}</span>
        <span className="text-sm text-neutral-400">
          Esse recurso é exclusivo para contas Premium.
        </span>
      </div>
      <Link
        href="/premium"
        className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
      >
        Ver planos
      </Link>
    </div>
  );
}
