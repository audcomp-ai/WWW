"use client";

import { osStats, osSpend, osActivity } from "@/data/sterimax-os";
import { useTick } from "../LiveClock";
import { StatusDot } from "../AgentLive";

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/[0.04] border border-white/[0.1] p-6">
      <div className="text-[10px] font-black uppercase tracking-widest text-[#4a6785] mb-2">
        {label}
      </div>
      <div className="text-3xl font-black text-white tracking-tight">{value}</div>
    </div>
  );
}

export function OverviewTab() {
  const tick = useTick();
  // Tasks climb while the dashboard is open, so the number is never frozen on screen.
  const tasks = osStats.tasks30d + tick;
  const barPct = Math.min(100, (osSpend.monthToDate / osSpend.cap) * 100);
  const overCap = osSpend.monthToDate > osSpend.cap;
  const maxAgentSpend = Math.max(...osSpend.byAgent.map((r) => r.amount));

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 flex flex-col gap-6">
        <div className="grid sm:grid-cols-3 gap-4">
          <StatTile label="Agents live" value={osStats.agentsLive} />
          <StatTile label="Tasks · 30d" value={tasks.toLocaleString("en-CA")} />
          <StatTile label="Hours saved" value={String(osStats.hoursSaved)} />
        </div>

        <div className="rounded-2xl bg-white/[0.04] border border-white/[0.1] p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-white text-sm font-bold">Token spend by agent · July</h3>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#4a6785]">
              {osSpend.currency}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            {osSpend.byAgent.map((row, i) => (
              <div key={row.agentId} className="flex items-center gap-4">
                <span className="w-44 shrink-0 text-[12px] font-semibold text-white truncate">
                  {row.label}
                </span>
                <span className="flex-1 h-2 rounded-full bg-white/[0.06] overflow-hidden">
                  <span
                    className={`block h-full rounded-full ${i < 3 ? "bg-[#0071e3]" : "bg-[#06b6d4]"}`}
                    style={{ width: `${(row.amount / maxAgentSpend) * 100}%` }}
                  />
                </span>
                <span className="w-14 shrink-0 text-right text-[12px] font-black text-white">
                  ${row.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="rounded-2xl bg-gradient-to-br from-[#071e3d] to-[#0d2d55] border border-white/[0.1] p-6">
          <div className="flex items-start justify-between gap-3 mb-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#4a6785]">
              Token spend · month to date
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/[0.08] border border-white/[0.12] text-white text-[9px] font-black uppercase tracking-widest shrink-0">
              Cap enforced
            </span>
          </div>
          <div className="text-4xl font-black text-white tracking-tight mb-1">
            ${osSpend.monthToDate.toLocaleString("en-CA")}
          </div>
          <p className="text-[#4a6785] text-sm font-medium mb-5">
            of a{" "}
            <span className="text-[#06b6d4] font-bold">
              ${osSpend.cap.toLocaleString("en-CA")}
            </span>{" "}
            monthly cap
          </p>
          <div className="h-2 rounded-full bg-white/[0.08] overflow-hidden mb-3">
            <div
              className={`h-full rounded-full ${overCap ? "bg-[#ef4444]" : "bg-[#06b6d4]"}`}
              style={{ width: `${barPct}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-[#4a6785]">
            <span>
              {osSpend.percentUsed}% used · day {osSpend.dayOfMonth}
            </span>
            <span>Projected ${osSpend.projected.toLocaleString("en-CA")}</span>
          </div>
        </div>

        <div className="rounded-2xl bg-white/[0.04] border border-white/[0.1] p-6">
          <div className="flex items-center gap-2.5 mb-5">
            <StatusDot />
            <h3 className="text-white text-sm font-bold">Live activity</h3>
          </div>
          <ul className="flex flex-col gap-4">
            {osActivity.map((entry) => (
              <li key={entry.title}>
                <p className="text-[13px] font-bold text-white leading-snug">{entry.title}</p>
                <p className="text-[11px] font-medium text-[#4a6785] leading-snug mt-0.5">
                  {entry.detail} · {entry.ago}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
