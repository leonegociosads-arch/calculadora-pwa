"use client";

import { useCallback, useRef, useState } from "react";

const MAX_TAPS = 20;
const RESET_TIMEOUT_MS = 2000;
const OUTLIER_TOLERANCE = 0.2;

function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}

function averageWithoutOutliers(intervals: number[]): number {
  const med = median(intervals);
  const consistent = intervals.filter((interval) => Math.abs(interval - med) <= med * OUTLIER_TOLERANCE);
  const values = consistent.length > 0 ? consistent : intervals;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

export function useBpmCounter() {
  const [bpm, setBpm] = useState<number | null>(null);
  const [tapCount, setTapCount] = useState(0);
  const tapTimestamps = useRef<number[]>([]);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const reset = useCallback(() => {
    if (resetTimer.current) {
      clearTimeout(resetTimer.current);
    }
    tapTimestamps.current = [];
    setTapCount(0);
    setBpm(null);
  }, []);

  const tap = useCallback(() => {
    const now = performance.now();

    if (resetTimer.current) {
      clearTimeout(resetTimer.current);
    }

    const last = tapTimestamps.current[tapTimestamps.current.length - 1];
    if (last !== undefined && now - last > RESET_TIMEOUT_MS) {
      tapTimestamps.current = [];
    }

    tapTimestamps.current = [...tapTimestamps.current, now].slice(-MAX_TAPS);
    setTapCount(tapTimestamps.current.length);

    if (tapTimestamps.current.length >= 2) {
      const timestamps = tapTimestamps.current;
      const intervals = timestamps.slice(1).map((timestamp, index) => timestamp - timestamps[index]);
      const avgInterval = averageWithoutOutliers(intervals);
      setBpm(Math.round(60000 / avgInterval));
    }

    resetTimer.current = setTimeout(reset, RESET_TIMEOUT_MS);
  }, [reset]);

  return { bpm, tapCount, tap, reset };
}
