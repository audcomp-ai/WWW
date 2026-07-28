"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { TICK_MS } from "@/lib/sterimax-live";

const TickContext = createContext(0);

/**
 * One interval drives every live element in the demo. Seven independent timers
 * would visibly drift apart over the length of a meeting.
 *
 * The tick starts at 0 and the interval starts in an effect, so the server render
 * and the first client render are identical — motion begins only after mount.
 */
export function LiveClock({ children }: { children: React.ReactNode }) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), TICK_MS);
    return () => clearInterval(id);
  }, []);

  return <TickContext.Provider value={tick}>{children}</TickContext.Provider>;
}

export function useTick(): number {
  return useContext(TickContext);
}
