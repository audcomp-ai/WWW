// Deterministic tick math for the SteriMax demo. Every visible "live" value is a
// pure function of a tick counter, so the demo replays identically every time —
// no clock reads, no randomness, nothing that can differ between server and client.

/** Milliseconds between ticks. */
export const TICK_MS = 3000;

/** How many ticks an agent holds one task line before moving to the next. */
export const TICKS_PER_TASK = 4;

/**
 * Which line of an agent's liveScript to show.
 * `agentIndex` staggers agents so they don't all change line on the same tick.
 */
export function taskIndexFor(tick: number, agentIndex: number, scriptLength: number): number {
  if (scriptLength <= 0) return 0;
  return (Math.floor(tick / TICKS_PER_TASK) + agentIndex) % scriptLength;
}

/** Seconds elapsed since the current task line appeared. */
export function secondsSinceLastAction(tick: number): number {
  return (tick % TICKS_PER_TASK) * (TICK_MS / 1000);
}

/** A monotonically climbing count of completed runs. */
export function runCountFor(tick: number, baseRuns: number, cadenceTicks: number): number {
  return baseRuns + Math.floor(tick / cadenceTicks);
}
