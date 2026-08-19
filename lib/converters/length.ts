import type { UnitOption } from "./types";

export const lengthUnits: UnitOption[] = [
  { value: "mm", label: "Milímetro (mm)" },
  { value: "cm", label: "Centímetro (cm)" },
  { value: "m", label: "Metro (m)" },
  { value: "km", label: "Quilômetro (km)" },
  { value: "in", label: "Polegada (in)" },
  { value: "ft", label: "Pé (ft)" },
  { value: "mi", label: "Milha (mi)" },
];

const toMeters: Record<string, number> = {
  mm: 0.001,
  cm: 0.01,
  m: 1,
  km: 1000,
  in: 0.0254,
  ft: 0.3048,
  mi: 1609.344,
};

export function convertLength(value: number, from: string, to: string): number {
  const meters = value * toMeters[from];
  return meters / toMeters[to];
}
