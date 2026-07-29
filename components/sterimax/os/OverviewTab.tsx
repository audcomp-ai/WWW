"use client";

import { osSpend, osActivity } from "@/data/sterimax-os";
import { liveAgentLoads, standbyAgentLoads } from "@/data/sterimax-impact";
import { useTick } from "../LiveClock";
import { StatusDot } from "../AgentLive";
import { PitchSection } from "./overview/PitchSection";
import { ImpactTiles } from "./overview/ImpactTiles";
import { WorkedExample } from "./overview/WorkedExample";
import { CommandCenter } from "./overview/CommandCenter";
import { AgentLoadList } from "./overview/AgentLoadList";
import { ImpactHours } from "./overview/ImpactHours";
import { OperatingCost } from "./overview/OperatingCost";

function SpendAndActivity() {
  const tick = useTick();
  const barPct = Math.min(100, (osSpend.monthToDate / osSpend.cap) * 100);
  const overCap = osSpend.monthToDate > osSpend.cap;
  const maxAgentSpend = Math.max(...osSpend.byAgent.map((r) => r.amount));

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 rounded-2xl bg-white/[0.04] border border-white/[0.1] p-6">
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

        <div className="mt-6 pt-6 border-t border-white/[0.08]">
          <div className="flex items-baseline justify-between gap-3 mb-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#4a6785]">
              Month to date against cap
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/[0.08] border border-white/[0.12] text-white text-[9px] font-black uppercase tracking-widest">
              Cap enforced
            </span>
          </div>
          <div className="h-2 rounded-full bg-white/[0.08] overflow-hidden mb-3">
            <div
              className={`h-full rounded-full ${overCap ? "bg-[#ef4444]" : "bg-[#06b6d4]"}`}
              style={{ width: `${barPct}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-[#4a6785]">
            <span>
              ${osSpend.monthToDate.toLocaleString("en-CA")} of $
              {osSpend.cap.toLocaleString("en-CA")} · {osSpend.percentUsed}% used · day{" "}
              {osSpend.dayOfMonth}
            </span>
            <span>Projected ${osSpend.projected.toLocaleString("en-CA")}</span>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white/[0.04] border border-white/[0.1] p-6">
        <div className="flex items-center gap-2.5 mb-5">
          <StatusDot />
          <h3 className="text-white text-sm font-bold">Live activity feed</h3>
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
        <p className="text-[11px] font-medium text-[#4a6785] mt-5 pt-5 border-t border-white/[0.08]">
          {tick > 0
            ? "Streaming — every action the agents take."
            : "Press Start Demo in the header to watch the feed update in real time."}
        </p>
      </div>
    </div>
  );
}

export function OverviewTab() {
  return (
    <div className="flex flex-col gap-10">
      <PitchSection />
      <ImpactTiles />
      <WorkedExample />
      <CommandCenter />
      <AgentLoadList rows={liveAgentLoads} title="Active agents" note="6 live" />
      <AgentLoadList
        rows={standbyAgentLoads}
        title="Standing by · idle & queued"
        note="spin up on trigger — no idle cost"
      />
      <ImpactHours />
      <OperatingCost />
      <SpendAndActivity />
    </div>
  );
}
