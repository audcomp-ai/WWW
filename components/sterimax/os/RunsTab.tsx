"use client";

import { taskRuns } from "@/data/sterimax-runs";
import { getSteriMaxAgent } from "@/data/sterimax-agents";

export function RunsTab() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {taskRuns.map((run) => {
        const agent = getSteriMaxAgent(run.agentId);
        return (
          <div
            key={run.agentId}
            className="rounded-2xl bg-white/[0.04] border border-white/[0.1] p-6 flex flex-col"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#06b6d4] mb-3">
              {agent?.name ?? run.agentId}
            </span>
            <h3 className="text-white text-base font-black tracking-tight mb-2">{run.taskName}</h3>
            <p className="text-[#4a6785] text-[12px] font-medium leading-relaxed flex-1">
              {run.steps.length} steps · produces {run.artifact.title}
            </p>
            <span className="inline-flex items-center gap-2 mt-4 pt-4 border-t border-white/[0.08] text-[10px] font-black uppercase tracking-widest text-[#4a6785]">
              <i className="fas fa-user-check text-[9px] text-[#06b6d4]" />
              {run.artifact.reviewState}
            </span>
          </div>
        );
      })}
    </div>
  );
}
