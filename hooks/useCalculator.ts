"use client";

import { useEffect, useState } from "react";
import { calculate, type Operator } from "@/lib/calculator";
import { applyUnary, type UnaryFunction } from "@/lib/scientificCalculator";

interface CalculatorState {
  displayValue: string;
  previousValue: number | null;
  operator: Operator | null;
  overwrite: boolean;
}

export interface HistoryEntry {
  id: string;
  expression: string;
  result: string;
}

const initialState: CalculatorState = {
  displayValue: "0",
  previousValue: null,
  operator: null,
  overwrite: true,
};

const HISTORY_KEY = "calculator-history";
const HISTORY_LIMIT = 20;

function parseDisplay(value: string): number {
  return Number(value);
}

function formatResult(value: number): string {
  if (Number.isNaN(value) || !Number.isFinite(value)) {
    return "Erro";
  }
  return String(value);
}

function createId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function useCalculator() {
  const [state, setState] = useState<CalculatorState>(initialState);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(HISTORY_KEY);
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch {
      // localStorage indisponível (ex: navegação privada) — segue sem histórico salvo
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch {
      // localStorage indisponível (ex: navegação privada) — ignora
    }
  }, [history]);

  function pushHistory(expression: string, result: string) {
    setHistory((prev) =>
      [{ id: createId(), expression, result }, ...prev].slice(0, HISTORY_LIMIT),
    );
  }

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
    if (state.operator === null || state.previousValue === null) {
      return;
    }
    const currentValue = parseDisplay(state.displayValue);
    const result = calculate(state.previousValue, currentValue, state.operator);
    const formatted = formatResult(result);
    pushHistory(`${state.previousValue} ${state.operator} ${currentValue}`, formatted);
    setState({
      displayValue: formatted,
      previousValue: null,
      operator: null,
      overwrite: true,
    });
  }

  function clear() {
    setState(initialState);
  }

  function applyFunction(fn: UnaryFunction) {
    const currentValue = parseDisplay(state.displayValue);
    const result = applyUnary(currentValue, fn);
    const formatted = formatResult(result);
    pushHistory(`${fn}(${currentValue})`, formatted);
    setState({ ...state, displayValue: formatted, overwrite: true });
  }

  function insertPi() {
    setState((prev) => ({ ...prev, displayValue: formatResult(Math.PI), overwrite: true }));
  }

  function clearHistory() {
    setHistory([]);
  }

  return {
    displayValue: state.displayValue,
    history,
    inputDigit,
    inputDecimal,
    chooseOperator,
    handleEquals,
    clear,
    applyFunction,
    insertPi,
    clearHistory,
  };
}
