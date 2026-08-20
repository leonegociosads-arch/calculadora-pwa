interface UnitScreenProps {
  code: string;
  value: string;
}

export function UnitScreen({ code, value }: UnitScreenProps) {
  return (
    <div className="rounded-xl border-2 border-neutral-950 bg-[#c9d6c1] px-3 py-2 shadow-inner">
      <div className="text-[10px] font-semibold uppercase tracking-wide text-neutral-600">
        {code}
      </div>
      <div className="truncate font-mono text-lg font-semibold text-[#1f2a17] sm:text-xl">
        {value}
      </div>
    </div>
  );
}
