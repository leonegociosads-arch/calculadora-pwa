import type { HistoryEntry } from "@/hooks/useCalculator";

interface HistoryPanelProps {
  history: HistoryEntry[];
  onClear: () => void;
}

export function HistoryPanel({ history, onClear }: HistoryPanelProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-neutral-300">Histórico</span>
        {history.length > 0 ? (
          <button
            type="button"
            onClick={onClear}
            className="-m-2 p-2 text-xs text-neutral-500 hover:text-neutral-300 hover:underline"
          >
            Limpar
          </button>
        ) : null}
      </div>

      {history.length === 0 ? (
        <p className="text-sm text-neutral-500">Nenhum cálculo ainda.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {history.map((entry) => (
            <li key={entry.id} className="flex items-baseline justify-between gap-3 text-sm">
              <span className="truncate text-neutral-500">{entry.expression}</span>
              <span className="font-medium text-neutral-100">{entry.result}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
