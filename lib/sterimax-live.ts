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

/** The clock advances every second; a tick is every TICK_MS. */
export function tickFromElapsed(elapsedSeconds: number): number {
  return Math.floor(elapsedSeconds / (TICK_MS / 1000));
}

/** "just now" / "38s ago" / "4 min ago" / "2 hrs ago" — for the streaming activity feed. */
export function formatRelativeAge(seconds: number): string {
  if (seconds < 5) return "just now";
  if (seconds < 60) return `${Math.floor(seconds)}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  return hours === 1 ? "1 hr ago" : `${hours} hrs ago`;
}

/** Seconds elapsed since the current task line appeared. */
export function secondsSinceLastAction(tick: number): number {
  return (tick % TICKS_PER_TASK) * (TICK_MS / 1000);
}

/** A monotonically climbing count of completed runs. */
export function runCountFor(tick: number, baseRuns: number, cadenceTicks: number): number {
  return baseRuns + Math.floor(tick / cadenceTicks);
}
