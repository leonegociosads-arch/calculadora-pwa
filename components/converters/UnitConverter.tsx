"use client";

import { useState } from "react";
import { UnitScreen } from "./UnitScreen";
import { DeviceShell } from "@/components/ui/DeviceShell";
import { getConverter } from "@/lib/converters/registry";
import { sanitizeNumericInput } from "@/lib/sanitizeNumericInput";
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
    <DeviceShell label="UTIL · CONV" sublabel="MULTI">
      <div className="flex flex-col gap-2">
        <label className="text-sm text-neutral-400" htmlFor="converter-value">
          Valor
        </label>
        <input
          id="converter-value"
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
            value={fromUnit}
            onChange={(event) => setFromUnit(event.target.value)}
            className="min-w-0 rounded-2xl border border-neutral-800 bg-neutral-900 px-3 py-3 text-sm text-neutral-100"
          >
            {units.map((unit) => (
              <option key={unit.value} value={unit.value}>
                {unit.label}
              </option>
            ))}
          </select>
          <UnitScreen code={fromUnit.toUpperCase()} value={inputValue} />
        </div>

        <div className="flex min-w-0 flex-col gap-2">
          <select
            value={toUnit}
            onChange={(event) => setToUnit(event.target.value)}
            className="min-w-0 rounded-2xl border border-neutral-800 bg-neutral-900 px-3 py-3 text-sm text-neutral-100"
          >
            {units.map((unit) => (
              <option key={unit.value} value={unit.value}>
                {unit.label}
              </option>
            ))}
          </select>
          <UnitScreen
            code={toUnit.toUpperCase()}
            value={Number.isNaN(result) ? "Erro" : String(result)}
          />
        </div>
      </div>
    </DeviceShell>
  );
}
