"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { TICK_MS } from "@/lib/sterimax-live";

type ClockValue = { tick: number; running: boolean; start: () => void };

const ClockContext = createContext<ClockValue>({ tick: 0, running: false, start: () => {} });

/**
 * One interval drives every live element on a surface. Seven independent timers would
 * visibly drift apart over the length of a meeting.
 *
 * The tick starts at 0 and the interval starts in an effect, so the server render and the
 * first client render are identical — motion begins only after mount.
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
  const [tick, setTick] = useState(0);
  // Seeded directly rather than set from an effect — the interval below is what actually
  // starts motion, and it is already client-only, so the first render still matches the server.
  const [running, setRunning] = useState(autoStart);

  const start = useCallback(() => setRunning(true), []);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setTick((t) => t + 1), TICK_MS);
    return () => clearInterval(id);
  }, [running]);

  return <ClockContext.Provider value={{ tick, running, start }}>{children}</ClockContext.Provider>;
}

export function useClock(): ClockValue {
  return useContext(ClockContext);
}

export function useTick(): number {
  return useContext(ClockContext).tick;
}
