"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { tickFromElapsed } from "@/lib/sterimax-live";

type ClockValue = {
  /** Whole seconds since the clock started. Drives anything that must visibly move. */
  elapsedSeconds: number;
  /** Coarser 3-second tick, used for agent task rotation and run counters. */
  tick: number;
  running: boolean;
  start: () => void;
  /** Freeze where it is, the figures stay put so the presenter can talk over a still screen. */
  stop: () => void;
  /** Back to base state, ready for the next meeting. */
  reset: () => void;
};

const ClockContext = createContext<ClockValue>({
  elapsedSeconds: 0,
  tick: 0,
  running: false,
  start: () => {},
  stop: () => {},
  reset: () => {},
});

/**
 * One interval drives every live element on a surface. Independent timers would visibly
 * drift apart over the length of a meeting.
 *
 * It runs at 1Hz so counters move every second — motion a presenter can actually point at —
 * and `tick` is derived from it, preserving the original 3-second cadence for agent task
 * lines and run counters.
 *
 * Both values start at 0 and the interval starts in an effect, so the server render and the
 * first client render are identical; motion begins only after mount.
 *
 * `autoStart` defaults to true so the roster and agent pages behave as before. The AI OS
 * passes false: it stays frozen at its base figures until the presenter hits Start Demo.
 */
export function LiveClock({
  children,
  autoStart = true,
}: {
  children: React.ReactNode;
  autoStart?: boolean;
}) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  // Seeded directly rather than set from an effect — the interval below is what actually
  // starts motion, and it is already client-only, so the first render still matches the server.
  const [running, setRunning] = useState(autoStart);

  const start = useCallback(() => setRunning(true), []);
  const stop = useCallback(() => setRunning(false), []);
  const reset = useCallback(() => {
    setRunning(false);
    setElapsedSeconds(0);
  }, []);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setElapsedSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  return (
    <ClockContext.Provider
      value={{ elapsedSeconds, tick: tickFromElapsed(elapsedSeconds), running, start, stop, reset }}
    >
      {children}
    </ClockContext.Provider>
  );
}

export function useClock(): ClockValue {
  return useContext(ClockContext);
}

export function useTick(): number {
  return useContext(ClockContext).tick;
}
