import { lengthUnits, convertLength } from "./length";
import { weightUnits, convertWeight } from "./weight";
import { temperatureUnits, convertTemperature } from "./temperature";
import type { UnitOption } from "./types";

export interface ConverterConfig {
  slug: string;
  title: string;
  units: UnitOption[];
  convert: (value: number, from: string, to: string) => number;
}

export const converters: ConverterConfig[] = [
  { slug: "comprimento", title: "Comprimento", units: lengthUnits, convert: convertLength },
  { slug: "peso", title: "Peso", units: weightUnits, convert: convertWeight },
  {
    slug: "temperatura",
    title: "Temperatura",
    units: temperatureUnits,
    convert: convertTemperature,
  },
];

export function getConverter(slug: string): ConverterConfig | undefined {
  return converters.find((converter) => converter.slug === slug);
}
