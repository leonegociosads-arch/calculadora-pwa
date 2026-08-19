interface DisplayProps {
  value: string;
}

export function Display({ value }: DisplayProps) {
  return (
    <div className="flex min-h-20 items-end justify-end rounded-2xl bg-neutral-900 px-4 py-3">
      <span className="truncate text-4xl font-semibold text-white">{value}</span>
    </div>
  );
}
