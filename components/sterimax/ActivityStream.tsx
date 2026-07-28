"use client";

import type { SteriMaxAgent } from "@/data/sterimax-agents";
import { taskIndexFor, TICKS_PER_TASK, TICK_MS } from "@/lib/sterimax-live";
import { useTick } from "./LiveClock";
import { StatusDot } from "./AgentLive";

const MAX_ENTRIES = 8;

/**
 * Renders the agent's recent actions, newest first. Derived entirely from the tick —
 * we walk backwards from the current task rather than accumulating state, so the list
 * is identical on every render for a given tick.
 */
export function ActivityStream({
  agent,
  agentIndex,
  tone,
}: {
  agent: SteriMaxAgent;
  agentIndex: number;
  tone: "dark" | "light";
}) {
  const tick = useTick();
  const completed = Math.floor(tick / TICKS_PER_TASK);
  const secondsPerTask = (TICKS_PER_TASK * TICK_MS) / 1000;

  const entries = Array.from({ length: MAX_ENTRIES }, (_, back) => {
    const step = completed - back;
    if (step < 0) return null;
    return {
      key: step,
      line: agent.liveScript[taskIndexFor(step * TICKS_PER_TASK, agentIndex, agent.liveScript.length)],
      ago: back === 0 ? "now" : `${back * secondsPerTask}s ago`,
      current: back === 0,
    };
  }).filter((e): e is NonNullable<typeof e> => e !== null);

  const isDark = tone === "dark";

  return (
    <div
      className={`rounded-2xl p-6 ${
        isDark
          ? "bg-white/[0.06] border border-white/[0.1] backdrop-blur-sm"
          : "bg-white border border-[#dde8f5] shadow-sm"
      }`}
    >
      <div className="flex items-center gap-2.5 mb-5">
        <StatusDot />
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#06b6d4]">
          Live activity
        </span>
      </div>
      <ul className="flex flex-col gap-3">
        {entries.map((e) => (
          <li key={e.key} className="flex items-start justify-between gap-4">
            <span
              className={`text-[13px] font-medium leading-snug ${
                e.current
                  ? isDark
                    ? "text-white"
                    : "text-[#0a2540]"
                  : isDark
                    ? "text-slate-400"
                    : "text-[#4a6785]"
              }`}
            >
              {e.line}
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#4a6785] shrink-0 pt-0.5">
              {e.ago}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
