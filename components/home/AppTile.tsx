import Link from "next/link";
import type { LucideIcon } from "lucide-react";

interface AppTileProps {
  title: string;
  href: string;
  icon: LucideIcon;
}

export function AppTile({ title, href, icon: Icon }: AppTileProps) {
  return (
    <Link
      href={href}
      className="flex aspect-square flex-col items-center justify-center gap-3 rounded-2xl border border-neutral-800 bg-neutral-900 p-4 text-center shadow-sm transition hover:border-neutral-700 hover:bg-neutral-800 active:scale-[0.98]"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-neutral-800 text-blue-400">
        <Icon size={28} strokeWidth={1.75} />
      </span>
      <span className="text-sm font-semibold text-neutral-100">{title}</span>
    </Link>
  );
}
