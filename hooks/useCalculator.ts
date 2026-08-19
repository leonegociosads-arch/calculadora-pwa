"use client";

import { useState } from "react";
import { calculate, type Operator } from "@/lib/calculator";
import { applyUnary, type UnaryFunction } from "@/lib/scientificCalculator";

interface CalculatorState {
  displayValue: string;
  previousValue: number | null;
  operator: Operator | null;
  overwrite: boolean;
}

const initialState: CalculatorState = {
  displayValue: "0",
  previousValue: null,
  operator: null,
  overwrite: true,
};

function parseDisplay(value: string): number {
  return Number(value);
}

function formatResult(value: number): string {
  if (Number.isNaN(value) || !Number.isFinite(value)) {
    return "Erro";
  }
  return String(value);
}

export function useCalculator() {
  const [state, setState] = useState<CalculatorState>(initialState);

  function inputDigit(digit: string) {
    setState((prev) => {
      if (prev.overwrite) {
        return { ...prev, displayValue: digit, overwrite: false };
      }
      if (prev.displayValue === "0") {
        return { ...prev, displayValue: digit };
      }
      return { ...prev, displayValue: prev.displayValue + digit };
    });
  }

  function inputDecimal() {
    setState((prev) => {
      if (prev.overwrite) {
        return { ...prev, displayValue: "0.", overwrite: false };
      }
      if (prev.displayValue.includes(".")) {
        return prev;
      }
      return { ...prev, displayValue: prev.displayValue + "." };
    });
  }

  function chooseOperator(operator: Operator) {
    setState((prev) => {
      const currentValue = parseDisplay(prev.displayValue);

      if (prev.previousValue === null) {
        return { ...prev, previousValue: currentValue, operator, overwrite: true };
      }

      if (prev.overwrite) {
        return { ...prev, operator };
      }

      const result = calculate(prev.previousValue, currentValue, prev.operator as Operator);
      return {
        displayValue: formatResult(result),
        previousValue: result,
        operator,
        overwrite: true,
      };
    });
  }

  function handleEquals() {
    setState((prev) => {
      if (prev.operator === null || prev.previousValue === null) {
        return prev;
      }
      const currentValue = parseDisplay(prev.displayValue);
      const result = calculate(prev.previousValue, currentValue, prev.operator);
      return {
        displayValue: formatResult(result),
        previousValue: null,
        operator: null,
        overwrite: true,
      };
    });
  }

  function clear() {
    setState(initialState);
  }

  function applyFunction(fn: UnaryFunction) {
    setState((prev) => {
      const currentValue = parseDisplay(prev.displayValue);
      const result = applyUnary(currentValue, fn);
      return { ...prev, displayValue: formatResult(result), overwrite: true };
    });
  }

  function insertPi() {
    setState((prev) => ({ ...prev, displayValue: formatResult(Math.PI), overwrite: true }));
  }

  return {
    displayValue: state.displayValue,
    inputDigit,
    inputDecimal,
    chooseOperator,
    handleEquals,
    clear,
    applyFunction,
    insertPi,
  };
}
