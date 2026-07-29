"use client";

import { workedExample } from "@/data/sterimax-impact";
import { formatHoursMinutesSeconds } from "@/lib/sterimax-roi";

function withoutLabel(hours: number): string {
  return hours >= 1 ? `${hours} hrs` : `${Math.round(hours * 60)} min`;
}

function withLabel(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return rest === 0 ? `${minutes}m` : `${minutes}m ${rest}s`;
}

export function WorkedExample() {
  return (
    <section className="rounded-2xl bg-white/[0.04] border border-white/[0.1] p-6 lg:p-8">
      <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#06b6d4] mb-4">
        One event, costed both ways
      </span>
      <h3 className="text-xl lg:text-2xl font-black text-white tracking-tight mb-2">
        {workedExample.title}
      </h3>
      <p className="text-[#4a6785] text-sm font-medium mb-7 max-w-3xl">{workedExample.subtitle}</p>

      <div className="grid sm:grid-cols-2 gap-4 mb-7">
        <div className="rounded-2xl bg-[#ef4444]/[0.06] border border-[#ef4444]/25 p-5">
          <div className="text-[10px] font-black uppercase tracking-widest text-[#ef4444] mb-2">
            Without agents
          </div>
          <div className="text-3xl font-black text-white tracking-tight">
            {workedExample.totalWithoutHours} hrs
          </div>
        </div>
        <div className="rounded-2xl bg-[#06b6d4]/[0.06] border border-[#06b6d4]/30 p-5">
          <div className="text-[10px] font-black uppercase tracking-widest text-[#06b6d4] mb-2">
            With agents
          </div>
          <div className="text-3xl font-black text-white tracking-tight">
            {formatHoursMinutesSeconds(workedExample.totalWithSeconds).replace("0h ", "")}
          </div>
        </div>
      </div>

      <ol className="flex flex-col gap-3 mb-7">
        {workedExample.steps.map((step, i) => (
          <li
            key={step.label}
            className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-4 flex items-start gap-4 flex-wrap"
          >
            <span className="w-6 h-6 rounded-lg bg-white/[0.06] border border-white/[0.12] flex items-center justify-center text-[10px] font-black text-[#06b6d4] shrink-0">
              {i + 1}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[13px] font-bold text-white leading-snug">
                {step.label}
              </span>
              <span className="block text-[11px] font-medium text-[#4a6785] leading-snug mt-0.5">
                {step.note}
              </span>
            </span>
            <span className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest shrink-0">
              <span className="text-[#ef4444]">{withoutLabel(step.withoutHours)}</span>
              <i className="fas fa-arrow-right text-[9px] text-[#4a6785]" />
              <span className="text-[#06b6d4]">{withLabel(step.withSeconds)}</span>
            </span>
          </li>
        ))}
      </ol>

      <div className="rounded-2xl bg-[#0071e3]/[0.08] border border-[#0071e3]/30 p-5">
        <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-[#38bdf8] mb-2">
          Show the prospect
        </span>
        <p className="text-[13px] font-medium text-white leading-snug italic">
          &ldquo;{workedExample.presenterCue}&rdquo;
        </p>
      </div>
    </section>
  );
}
