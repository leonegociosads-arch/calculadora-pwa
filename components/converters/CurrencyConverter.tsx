"use client";

import { useEffect, useState } from "react";
import { Display } from "@/components/calculator/Display";
import { currencyUnits } from "@/lib/converters/currency";

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
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm text-neutral-500" htmlFor="currency-value">
          Valor
        </label>
        <input
          id="currency-value"
          type="number"
          inputMode="decimal"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          className="rounded-2xl border border-neutral-200 px-4 py-3 text-lg"
        />
      </div>

      <div className="flex items-center gap-3">
        <select
          value={fromCurrency}
          onChange={(event) => setFromCurrency(event.target.value)}
          className="flex-1 rounded-2xl border border-neutral-200 px-3 py-3 text-sm"
        >
          {currencyUnits.map((unit) => (
            <option key={unit.value} value={unit.value}>
              {unit.label}
            </option>
          ))}
        </select>
        <span className="text-neutral-400">→</span>
        <select
          value={toCurrency}
          onChange={(event) => setToCurrency(event.target.value)}
          className="flex-1 rounded-2xl border border-neutral-200 px-3 py-3 text-sm"
        >
          {currencyUnits.map((unit) => (
            <option key={unit.value} value={unit.value}>
              {unit.label}
            </option>
          ))}
        </select>
      </div>

      {error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : !rates ? (
        <p className="text-sm text-neutral-500">Carregando cotações...</p>
      ) : (
        <Display value={Number.isNaN(result) ? "Erro" : result.toFixed(2)} />
      )}
    </div>
  );
}
