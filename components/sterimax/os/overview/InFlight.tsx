"use client";

import { agentCycles } from "@/data/sterimax-cycles";
import { inFlightFor, totalCompleted } from "@/lib/sterimax-inflight";
import { useClock } from "../../LiveClock";

export function InFlight() {
  const { elapsedSeconds, running } = useClock();
  const completed = totalCompleted(agentCycles, elapsedSeconds);

  return (
    <section>
      <div className="flex items-baseline justify-between gap-4 flex-wrap mb-4">
        <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#06b6d4]">
          In flight · all six agents working
        </span>
        <span className="text-[10px] font-black uppercase tracking-widest text-[#4a6785]">
          {running
            ? `${completed} task${completed === 1 ? "" : "s"} completed this session`
            : "press Start Demo to put the team to work"}
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {agentCycles.map((cycle) => {
          const state = inFlightFor(cycle, elapsedSeconds);
          return (
            <div
              key={cycle.agentId}
              className="rounded-2xl bg-white/[0.04] border border-white/[0.1] p-5"
            >
              <div className="flex items-center justify-between gap-3 mb-3">
                <span className="flex items-center gap-2.5 min-w-0">
                  {running ? (
                    <span className="relative flex w-2 h-2 shrink-0">
                      <span className="absolute inline-flex w-full h-full rounded-full bg-[#06b6d4] opacity-60 animate-ping" />
                      <span className="relative inline-flex w-2 h-2 rounded-full bg-[#06b6d4]" />
                    </span>
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-white/20 shrink-0" />
                  )}
                  <span className="text-white text-[13px] font-black tracking-tight">
                    {cycle.name}
                  </span>
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#4a6785] shrink-0">
                  {state.completed} done
                </span>
              </div>

              <p className="text-[12px] font-medium text-slate-300 leading-snug mb-3 min-h-[2rem]">
                {state.taskLabel}
              </p>

              <div className="flex items-center gap-3">
                <span className="flex-1 h-1.5 rounded-full bg-white/[0.08] overflow-hidden">
                  <span
                    className="block h-full rounded-full bg-[#06b6d4]"
                    style={{ width: `${state.progressPct}%` }}
                  />
                </span>
                <span className="text-[10px] font-black text-white tabular-nums w-9 text-right">
                  {Math.round(state.progressPct)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
