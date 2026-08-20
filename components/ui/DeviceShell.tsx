import type { ReactNode } from "react";

interface DeviceShellProps {
  label: string;
  sublabel?: string;
  showSolarStrip?: boolean;
  children: ReactNode;
}

export function DeviceShell({
  label,
  sublabel,
  showSolarStrip = false,
  children,
}: DeviceShellProps) {
  return (
    <div className="rounded-[28px] border-2 border-blue-600/70 bg-neutral-900 p-4 shadow-lg shadow-black/40">
      <div className="mb-3 flex items-center justify-between px-1">
        <span className="text-xs font-semibold tracking-widest text-blue-400">{label}</span>
        {sublabel ? (
          <span className="text-[10px] font-medium text-neutral-500">{sublabel}</span>
        ) : null}
      </div>
      {showSolarStrip ? <div className="mb-3 h-2 w-16 rounded-full bg-neutral-800" /> : null}
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}
