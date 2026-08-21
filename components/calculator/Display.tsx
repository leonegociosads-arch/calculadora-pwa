interface DisplayProps {
  value: string;
  suffix?: string;
}

export function Display({ value, suffix }: DisplayProps) {
  return (
    <div className="flex min-h-20 flex-col items-end justify-end gap-1 rounded-2xl border border-neutral-800 bg-neutral-900/80 px-4 py-3">
      <span className="truncate font-mono text-3xl font-semibold text-neutral-50 sm:text-4xl">
        {value}
      </span>
      {suffix ? (
        <span className="text-xs font-medium uppercase tracking-wide text-neutral-500">
          {suffix}
        </span>
      ) : null}
    </div>
  );
}
