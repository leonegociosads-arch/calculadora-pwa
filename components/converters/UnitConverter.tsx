"use client";

import { useState } from "react";
import { ArrowLeftRight } from "lucide-react";
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

  return (
    <UnitConverterFields
      icon={converter.icon}
      units={converter.units}
      convert={converter.convert}
    />
  );
}

interface UnitConverterFieldsProps {
  icon: NonNullable<ReturnType<typeof getConverter>>["icon"];
  units: UnitOption[];
  convert: (value: number, from: string, to: string) => number;
}

function UnitConverterFields({ icon, units, convert }: UnitConverterFieldsProps) {
  const [inputValue, setInputValue] = useState("0");
  const [fromUnit, setFromUnit] = useState(units[0].value);
  const [toUnit, setToUnit] = useState(units[1]?.value ?? units[0].value);

  const numericValue = Number(inputValue);
  const result = Number.isNaN(numericValue)
    ? NaN
    : convert(numericValue, fromUnit, toUnit);

  function swapUnits() {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  }

  return (
    <DeviceShell icon={icon} label="UTIL · CONV" sublabel="MULTI">
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
          className="rounded-2xl border border-neutral-800 bg-neutral-900/80 px-4 py-3 text-lg text-neutral-100"
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-3 text-xs font-medium uppercase tracking-wide text-neutral-500">
          <span>De</span>
          <span>Para</span>
        </div>
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
          <select
            value={fromUnit}
            onChange={(event) => setFromUnit(event.target.value)}
            className="min-w-0 rounded-2xl border border-neutral-800 bg-neutral-900/80 px-3 py-3 text-sm text-neutral-100"
          >
            {units.map((unit) => (
              <option key={unit.value} value={unit.value}>
                {unit.label}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={swapUnits}
            aria-label="Trocar unidades"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-blue-500/40 bg-blue-500/10 text-blue-400 transition hover:bg-blue-500/20"
          >
            <ArrowLeftRight size={16} />
          </button>
          <select
            value={toUnit}
            onChange={(event) => setToUnit(event.target.value)}
            className="min-w-0 rounded-2xl border border-neutral-800 bg-neutral-900/80 px-3 py-3 text-sm text-neutral-100"
          >
            {units.map((unit) => (
              <option key={unit.value} value={unit.value}>
                {unit.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <UnitScreen code={fromUnit.toUpperCase()} value={inputValue} />
        <UnitScreen
          code={toUnit.toUpperCase()}
          value={Number.isNaN(result) ? "Erro" : String(result)}
        />
      </div>
    </DeviceShell>
  );
}
