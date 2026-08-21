import Link from "next/link";
import { Lock } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface AppTileProps {
  title: string;
  href: string;
  icon: LucideIcon;
  premium?: boolean;
}

export function AppTile({ title, href, icon: Icon, premium = false }: AppTileProps) {
  return (
    <Link
      href={href}
      className="relative flex aspect-square flex-col items-center justify-center gap-3 rounded-2xl border border-neutral-800 bg-neutral-900 p-4 text-center shadow-sm transition hover:border-neutral-700 hover:bg-neutral-800 active:scale-[0.98]"
    >
      {premium ? (
        <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-amber-400/10 text-amber-400">
          <Lock size={12} strokeWidth={2} />
        </span>
      ) : null}
      <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-neutral-800 text-blue-400">
        <Icon size={28} strokeWidth={1.75} />
      </span>
      <span className="text-sm font-semibold text-neutral-100">{title}</span>
    </Link>
  );
}
