import type { UnitOption } from "./types";

export const temperatureUnits: UnitOption[] = [
  { value: "c", label: "Celsius (°C)" },
  { value: "f", label: "Fahrenheit (°F)" },
  { value: "k", label: "Kelvin (K)" },
];

function toCelsius(value: number, unit: string): number {
  switch (unit) {
    case "c":
      return value;
    case "f":
      return (value - 32) * (5 / 9);
    case "k":
      return value - 273.15;
    default:
      return NaN;
  }
}

function fromCelsius(value: number, unit: string): number {
  switch (unit) {
    case "c":
      return value;
    case "f":
      return value * (9 / 5) + 32;
    case "k":
      return value + 273.15;
    default:
      return NaN;
  }
}

export function convertTemperature(value: number, from: string, to: string): number {
  return fromCelsius(toCelsius(value, from), to);
}
