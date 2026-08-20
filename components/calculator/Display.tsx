interface DisplayProps {
  value: string;
}

export function Display({ value }: DisplayProps) {
  return (
    <div className="flex min-h-20 items-end justify-end rounded-xl border-2 border-neutral-950 bg-[#c9d6c1] px-4 py-3 shadow-inner">
      <span className="truncate font-mono text-3xl font-semibold text-[#1f2a17] sm:text-4xl">
        {value}
      </span>
    </div>
  );
}
