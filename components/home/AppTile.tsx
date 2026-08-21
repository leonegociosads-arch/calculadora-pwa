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
      className="relative flex flex-col items-center justify-center gap-3 rounded-3xl border border-blue-900/40 bg-gradient-to-b from-slate-900 to-neutral-950 px-4 py-8 text-center shadow-lg transition hover:border-blue-700/60 active:scale-[0.98]"
    >
      {premium ? (
        <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-amber-400/15 text-amber-400 ring-1 ring-amber-400/30">
          <Lock size={13} strokeWidth={2} />
        </span>
      ) : null}

      <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-500/30 bg-blue-500/10 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.25)]">
        <Icon size={30} strokeWidth={1.75} />
      </span>

      <div className="flex flex-col items-center gap-1.5">
        <span className="text-base font-semibold text-neutral-100">{title}</span>
        <span className="h-0.5 w-6 rounded-full bg-blue-500/70" />
      </div>

      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-6 left-1/2 h-16 w-32 -translate-x-1/2 rounded-full bg-blue-500/20 blur-2xl"
      />
    </Link>
  );
}
