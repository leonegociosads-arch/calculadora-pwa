"use client";

import { useCallback, useRef, useState } from "react";

const MAX_TAPS = 8;
const RESET_TIMEOUT_MS = 2000;

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
      const avgInterval = intervals.reduce((sum, value) => sum + value, 0) / intervals.length;
      setBpm(Math.round(60000 / avgInterval));
    }

    resetTimer.current = setTimeout(reset, RESET_TIMEOUT_MS);
  }, [reset]);

  return { bpm, tapCount, tap, reset };
}
