"use client";

import { useState } from "react";
import Link from "next/link";
import { LiveClock, useClock } from "@/components/sterimax/LiveClock";
import { heroCopy } from "@/data/sterimax-impact";
import { OverviewTab } from "@/components/sterimax/os/OverviewTab";
import { AgentsTab } from "@/components/sterimax/os/AgentsTab";
import { RunsTab } from "@/components/sterimax/os/RunsTab";
import { SpendTab } from "@/components/sterimax/os/SpendTab";
import { AuditTab } from "@/components/sterimax/os/AuditTab";

type Tab = "overview" | "agents" | "runs" | "spend" | "audit";

const tabs: { id: Tab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "agents", label: "Agents" },
  { id: "runs", label: "Runs" },
  { id: "spend", label: "Spend" },
  { id: "audit", label: "Audit Log" },
];

function StartDemoButton() {
  const { running, start } = useClock();

  return (
    <button
      onClick={start}
      disabled={running}
      className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
        running
          ? "bg-white/[0.06] border border-[#06b6d4]/40 text-[#06b6d4] cursor-default"
          : "bg-[#0071e3] text-white hover:shadow-2xl hover:shadow-[#0071e3]/30"
      }`}
    >
      {running ? (
        <>
          <span className="w-1.5 h-1.5 rounded-full bg-[#06b6d4] animate-pulse" /> Demo running
        </>
      ) : (
        <>
          <i className="fas fa-play text-[10px]" /> Start Demo
        </>
      )}
    </button>
  );
}

/** Inside the provider so it can read the clock; the page shell wraps it. */
function OsShell() {
  const [active, setActive] = useState<Tab>("overview");

  return (
    <div className="min-h-screen bg-[#040e1a]">
      <div className="border-b border-white/[0.08] bg-[#071e3d]/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#06b6d4] to-[#0071e3] flex items-center justify-center">
              <i className="fas fa-microchip text-white text-lg" />
            </div>
            <div>
              <h1 className="text-white font-black text-lg tracking-tight">
                Audcomp <span className="text-[#06b6d4]">AI OS</span>
              </h1>
              <p className="text-white/40 text-xs">
                {heroCopy.client} · {heroCopy.descriptor}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.12] text-white text-[10px] font-black uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#06b6d4] animate-pulse" /> Canada Central
            </span>
            <StartDemoButton />
            <Link
              href="/admin/sales-training/sterimax"
              className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#4a6785] hover:text-[#06b6d4] transition-colors"
            >
              <i className="fas fa-users text-[10px]" /> Roster
            </Link>
          </div>
        </div>
      </div>

      <div className="border-b border-white/[0.06] bg-[#071e3d]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-all duration-200 whitespace-nowrap ${
                  active === tab.id
                    ? "border-[#06b6d4] text-[#06b6d4]"
                    : "border-transparent text-white/40 hover:text-white/70"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 py-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#4a6785]">
              {heroCopy.tag}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ef4444]/10 border border-[#ef4444]/30 text-[#ef4444] text-[9px] font-black uppercase tracking-widest">
              <i className="fas fa-clock text-[9px]" />
              {heroCopy.countdownLabel} {heroCopy.daysUntilInForce} days
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {active === "overview" && <OverviewTab />}
        {active === "agents" && <AgentsTab />}
        {active === "runs" && <RunsTab />}
        {active === "spend" && <SpendTab />}
        {active === "audit" && <AuditTab />}
      </div>
    </div>
  );
}

export default function SteriMaxOsPage() {
  // autoStart={false} — the dashboard sits at its base figures until Start Demo is pressed.
  return (
    <LiveClock autoStart={false}>
      <OsShell />
    </LiveClock>
  );
}
