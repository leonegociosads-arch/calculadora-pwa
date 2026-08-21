interface UnitScreenProps {
  code: string;
  value: string;
}

export function UnitScreen({ code, value }: UnitScreenProps) {
  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/80 px-3 py-2">
      <div className="text-[10px] font-semibold uppercase tracking-wide text-blue-400">
        {code}
      </div>
      <div className="truncate font-mono text-lg font-semibold text-neutral-50 sm:text-xl">
        {value}
      </div>
    </div>
  );
}
