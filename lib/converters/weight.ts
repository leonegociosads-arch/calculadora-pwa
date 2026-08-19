import type { UnitOption } from "./types";

export const weightUnits: UnitOption[] = [
  { value: "mg", label: "Miligrama (mg)" },
  { value: "g", label: "Grama (g)" },
  { value: "kg", label: "Quilograma (kg)" },
  { value: "lb", label: "Libra (lb)" },
  { value: "oz", label: "Onça (oz)" },
];

const toKilograms: Record<string, number> = {
  mg: 0.000001,
  g: 0.001,
  kg: 1,
  lb: 0.45359237,
  oz: 0.028349523125,
};

export function convertWeight(value: number, from: string, to: string): number {
  const kg = value * toKilograms[from];
  return kg / toKilograms[to];
}
