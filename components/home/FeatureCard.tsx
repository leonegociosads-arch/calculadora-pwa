import Link from "next/link";
import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  href: string;
  icon?: LucideIcon;
}

export function FeatureCard({ title, description, href, icon: Icon }: FeatureCardProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-4 rounded-2xl border border-neutral-800 bg-neutral-900 p-5 shadow-sm transition hover:border-neutral-700 hover:bg-neutral-800 active:scale-[0.98]"
    >
      {Icon ? (
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-neutral-800 text-blue-400">
          <Icon size={28} strokeWidth={1.75} />
        </span>
      ) : null}
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="text-lg font-semibold text-neutral-100">{title}</span>
        <span className="text-sm text-neutral-400">{description}</span>
      </span>
    </Link>
  );
}
