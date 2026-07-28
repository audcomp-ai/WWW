"use client";

import type { SteriMaxAgent } from "@/data/sterimax-agents";
import { taskIndexFor, secondsSinceLastAction, runCountFor } from "@/lib/sterimax-live";
import { useTick } from "./LiveClock";

type Tone = "dark" | "light";

export function StatusDot() {
  return (
    <span className="relative flex w-2 h-2 shrink-0">
      <span className="absolute inline-flex w-full h-full rounded-full bg-[#06b6d4] opacity-60 animate-ping" />
      <span className="relative inline-flex w-2 h-2 rounded-full bg-[#06b6d4]" />
    </span>
  );
}

export function LiveTaskLine({
  agent,
  agentIndex,
  tone,
}: {
  agent: SteriMaxAgent;
  agentIndex: number;
  tone: Tone;
}) {
  const tick = useTick();
  const line = agent.liveScript[taskIndexFor(tick, agentIndex, agent.liveScript.length)];

  return (
    <div className="flex items-center gap-2.5 min-h-[1.25rem]">
      <StatusDot />
      <span
        className={`text-[11px] font-semibold leading-tight truncate ${
          tone === "dark" ? "text-slate-300" : "text-[#4a6785]"
        }`}
      >
        {line}
      </span>
    </div>
  );
}

export function LiveMeta({ agent, tone }: { agent: SteriMaxAgent; tone: Tone }) {
  const tick = useTick();
  const seconds = secondsSinceLastAction(tick);
  const runs = runCountFor(tick, agent.baseRuns, agent.runCadence);
  const strong = tone === "dark" ? "text-white" : "text-[#0a2540]";

  return (
    <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-[#4a6785]">
      <span>
        <span className={strong}>{runs.toLocaleString("en-CA")}</span> runs
      </span>
      <span>
        <span className={strong}>{seconds}s</span> ago
      </span>
    </div>
  );
}
