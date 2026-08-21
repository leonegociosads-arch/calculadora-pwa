import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

interface DeviceShellProps {
  icon: LucideIcon;
  label: string;
  sublabel?: string;
  children: ReactNode;
}

export function DeviceShell({ icon: Icon, label, sublabel, children }: DeviceShellProps) {
  return (
    <div className="relative rounded-[28px] border border-blue-700/50 bg-gradient-to-b from-slate-900 to-neutral-950 p-4 shadow-[0_0_30px_rgba(37,99,235,0.15)]">
      <div className="mb-4 flex items-center gap-3 rounded-2xl bg-neutral-900/60 p-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-500/40 bg-blue-500/10 text-blue-400">
          <Icon size={18} strokeWidth={2} />
        </span>
        <div className="flex flex-1 flex-col gap-1">
          <span className="text-xs font-bold tracking-widest text-blue-400">{label}</span>
          <span className="h-0.5 w-8 rounded-full bg-gradient-to-r from-blue-500 to-transparent" />
        </div>
        {sublabel ? (
          <span className="shrink-0 text-[10px] font-medium text-neutral-500">{sublabel}</span>
        ) : null}
      </div>
      <div className="flex flex-col gap-4">{children}</div>
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-4 left-1/2 h-8 w-40 -translate-x-1/2 rounded-full bg-blue-500/25 blur-xl"
      />
    </div>
  );
}
