import { Ruler, Weight, Thermometer } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { lengthUnits, convertLength } from "./length";
import { weightUnits, convertWeight } from "./weight";
import { temperatureUnits, convertTemperature } from "./temperature";
import type { UnitOption } from "./types";

export interface ConverterConfig {
  slug: string;
  title: string;
  icon: LucideIcon;
  units: UnitOption[];
  convert: (value: number, from: string, to: string) => number;
}

export const converters: ConverterConfig[] = [
  {
    slug: "comprimento",
    title: "Comprimento",
    icon: Ruler,
    units: lengthUnits,
    convert: convertLength,
  },
  { slug: "peso", title: "Peso", icon: Weight, units: weightUnits, convert: convertWeight },
  {
    slug: "temperatura",
    title: "Temperatura",
    icon: Thermometer,
    units: temperatureUnits,
    convert: convertTemperature,
  },
];

export function getConverter(slug: string): ConverterConfig | undefined {
  return converters.find((converter) => converter.slug === slug);
}
