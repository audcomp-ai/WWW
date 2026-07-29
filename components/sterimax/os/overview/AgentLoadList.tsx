"use client";

import type { AgentLoadRow } from "@/data/sterimax-impact";
import { totalHoursPerWeek } from "@/lib/sterimax-roi";

const statusStyle: Record<AgentLoadRow["status"], string> = {
  Live: "bg-[#06b6d4]/15 border-[#06b6d4]/40 text-[#06b6d4]",
  Idle: "bg-white/[0.06] border-white/[0.15] text-[#4a6785]",
  Queued: "bg-[#0071e3]/15 border-[#0071e3]/40 text-[#38bdf8]",
};

export function AgentLoadList({
  rows,
  title,
  note,
}: {
  rows: AgentLoadRow[];
  title: string;
  note: string;
}) {
  const hours = totalHoursPerWeek(rows);

  return (
    <section>
      <div className="flex items-baseline justify-between gap-4 flex-wrap mb-4">
        <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#06b6d4]">
          {title}
        </span>
        <span className="text-[10px] font-black uppercase tracking-widest text-[#4a6785]">
          {note} · {hours}h/wk
        </span>
      </div>

      <div className="rounded-2xl bg-white/[0.04] border border-white/[0.1] overflow-hidden">
        {rows.map((row, i) => (
          <div
            key={row.agentId}
            className={`flex items-center gap-4 flex-wrap px-6 py-4 ${
              i > 0 ? "border-t border-white/[0.06]" : ""
            }`}
          >
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-full border text-[9px] font-black uppercase tracking-widest shrink-0 ${statusStyle[row.status]}`}
            >
              {row.status}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-white text-[13px] font-bold leading-snug">{row.name}</span>
              <span className="block text-[11px] font-medium text-[#4a6785] leading-snug">
                {row.role}
              </span>
            </span>
            <span className="text-[12px] font-medium text-slate-400 shrink-0 w-52">
              {row.workload}
            </span>
            <span className="text-[12px] font-black text-white shrink-0 w-20 text-right">
              {row.hoursPerWeek}h/wk
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
