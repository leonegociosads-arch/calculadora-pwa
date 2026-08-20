"use client";

import { useEffect, useState } from "react";
import { UnitScreen } from "./UnitScreen";
import { DeviceShell } from "@/components/ui/DeviceShell";
import { currencyUnits } from "@/lib/converters/currency";
import { sanitizeNumericInput } from "@/lib/sanitizeNumericInput";

interface RatesApiResponse {
  base?: string;
  rates?: Record<string, number>;
  error?: string;
}

export function CurrencyConverter() {
  const [inputValue, setInputValue] = useState("0");
  const [fromCurrency, setFromCurrency] = useState(currencyUnits[0].value);
  const [toCurrency, setToCurrency] = useState(currencyUnits[1].value);
  const [rates, setRates] = useState<Record<string, number> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/exchange-rate")
      .then((response) => response.json())
      .then((data: RatesApiResponse) => {
        if (data.error || !data.rates) {
          setError(data.error ?? "Não foi possível carregar as cotações.");
          return;
        }
        setRates(data.rates);
      })
      .catch(() => setError("Não foi possível carregar as cotações."));
  }, []);

  const numericValue = Number(inputValue);
  let result = NaN;
  if (rates && !Number.isNaN(numericValue)) {
    result = (numericValue / rates[fromCurrency]) * rates[toCurrency];
  }

  return (
    <DeviceShell label="UTIL · CONV" sublabel="MULTI">
      <div className="flex flex-col gap-2">
        <label className="text-sm text-neutral-400" htmlFor="currency-value">
          Valor
        </label>
        <input
          id="currency-value"
          type="text"
          inputMode="decimal"
          value={inputValue}
          onChange={(event) => setInputValue(sanitizeNumericInput(event.target.value))}
          className="rounded-2xl border border-neutral-800 bg-neutral-900 px-4 py-3 text-lg text-neutral-100"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex min-w-0 flex-col gap-2">
          <select
            value={fromCurrency}
            onChange={(event) => setFromCurrency(event.target.value)}
            className="min-w-0 rounded-2xl border border-neutral-800 bg-neutral-900 px-3 py-3 text-sm text-neutral-100"
          >
            {currencyUnits.map((unit) => (
              <option key={unit.value} value={unit.value}>
                {unit.label}
              </option>
            ))}
          </select>
          <UnitScreen code={fromCurrency} value={inputValue} />
        </div>

        <div className="flex min-w-0 flex-col gap-2">
          <select
            value={toCurrency}
            onChange={(event) => setToCurrency(event.target.value)}
            className="min-w-0 rounded-2xl border border-neutral-800 bg-neutral-900 px-3 py-3 text-sm text-neutral-100"
          >
            {currencyUnits.map((unit) => (
              <option key={unit.value} value={unit.value}>
                {unit.label}
              </option>
            ))}
          </select>
          {error ? (
            <p className="text-xs text-red-400">{error}</p>
          ) : !rates ? (
            <p className="text-xs text-neutral-400">Carregando...</p>
          ) : (
            <UnitScreen code={toCurrency} value={result.toFixed(2)} />
          )}
        </div>
      </div>
    </DeviceShell>
  );
}
