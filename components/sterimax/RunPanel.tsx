"use client";

import type { SteriMaxAgent } from "@/data/sterimax-agents";
import type { TaskRun } from "@/data/sterimax-runs";
import { useTaskRun } from "@/lib/use-task-run";
import { ArtifactView } from "./RunArtifact";

export function RunPanel({ agent, run }: { agent: SteriMaxAgent; run: TaskRun }) {
  const { phase, currentStep, start, reset } = useTaskRun(run);

  return (
    <div className="rounded-2xl bg-white/[0.04] border border-white/[0.1] p-6">
      <div className="flex items-start justify-between gap-4 flex-wrap mb-6">
        <div>
          <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-[#06b6d4] mb-2">
            {agent.name} · task run
          </span>
          <h3 className="text-white text-xl font-black tracking-tight">{run.taskName}</h3>
        </div>

        {phase === "idle" ? (
          <button
            onClick={start}
            className="inline-flex items-center gap-2 bg-[#0071e3] text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:shadow-2xl hover:shadow-[#0071e3]/30 transition-all shrink-0"
          >
            <i className="fas fa-play text-[10px]" /> Run task
          </button>
        ) : (
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/[0.1] text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-[#0071e3]/40 transition-all shrink-0"
          >
            <i className="fas fa-rotate-left text-[10px]" /> Reset
          </button>
        )}
      </div>

      <ol className="flex flex-col gap-3 mb-6">
        {run.steps.map((step, i) => {
          const done = i < currentStep;
          const active = phase === "running" && i === currentStep;
          return (
            <li key={step.label} className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                {done ? (
                  <i className="fas fa-circle-check text-[#06b6d4] text-sm" />
                ) : active ? (
                  <i className="fas fa-spinner fa-spin text-[#06b6d4] text-xs" />
                ) : (
                  <span className="w-2.5 h-2.5 rounded-full border border-white/20" />
                )}
              </span>
              <span className="min-w-0">
                <span
                  className={`block text-[13px] font-bold leading-snug ${
                    done || active ? "text-white" : "text-white/25"
                  }`}
                >
                  {step.label}
                </span>
                <span
                  className={`block text-[11px] font-medium leading-snug mt-0.5 ${
                    done || active ? "text-[#4a6785]" : "text-white/15"
                  }`}
                >
                  {step.detail}
                </span>
              </span>
            </li>
          );
        })}
      </ol>

      {phase === "complete" ? (
        <ArtifactView artifact={run.artifact} />
      ) : (
        <p className="text-[11px] font-medium text-[#4a6785] border-t border-white/[0.08] pt-4">
          {phase === "idle"
            ? "The finished artifact appears here when the run completes."
            : "Working…"}
        </p>
      )}
    </div>
  );
}
