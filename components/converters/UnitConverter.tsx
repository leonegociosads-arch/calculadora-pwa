"use client";

import { useState } from "react";
import { Display } from "@/components/calculator/Display";
import { getConverter } from "@/lib/converters/registry";
import type { UnitOption } from "@/lib/converters/types";

interface UnitConverterProps {
  slug: string;
}

export function UnitConverter({ slug }: UnitConverterProps) {
  const converter = getConverter(slug);

  if (!converter) {
    return null;
  }

  return <UnitConverterFields units={converter.units} convert={converter.convert} />;
}

interface UnitConverterFieldsProps {
  units: UnitOption[];
  convert: (value: number, from: string, to: string) => number;
}

function UnitConverterFields({ units, convert }: UnitConverterFieldsProps) {
  const [inputValue, setInputValue] = useState("0");
  const [fromUnit, setFromUnit] = useState(units[0].value);
  const [toUnit, setToUnit] = useState(units[1]?.value ?? units[0].value);

  const numericValue = Number(inputValue);
  const result = Number.isNaN(numericValue)
    ? NaN
    : convert(numericValue, fromUnit, toUnit);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm text-neutral-500" htmlFor="converter-value">
          Valor
        </label>
        <input
          id="converter-value"
          type="number"
          inputMode="decimal"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          className="rounded-2xl border border-neutral-200 px-4 py-3 text-lg"
        />
      </div>

      <div className="flex items-center gap-3">
        <select
          value={fromUnit}
          onChange={(event) => setFromUnit(event.target.value)}
          className="flex-1 rounded-2xl border border-neutral-200 px-3 py-3 text-sm"
        >
          {units.map((unit) => (
            <option key={unit.value} value={unit.value}>
              {unit.label}
            </option>
          ))}
        </select>
        <span className="text-neutral-400">→</span>
        <select
          value={toUnit}
          onChange={(event) => setToUnit(event.target.value)}
          className="flex-1 rounded-2xl border border-neutral-200 px-3 py-3 text-sm"
        >
          {units.map((unit) => (
            <option key={unit.value} value={unit.value}>
              {unit.label}
            </option>
          ))}
        </select>
      </div>

      <Display value={Number.isNaN(result) ? "Erro" : String(result)} />
    </div>
  );
}
