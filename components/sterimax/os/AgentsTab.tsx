"use client";

import { useState } from "react";
import { sterimaxAgents } from "@/data/sterimax-agents";
import { getTaskRun } from "@/data/sterimax-runs";
import { RunPanel } from "../RunPanel";
import { LiveTaskLine } from "../AgentLive";

export function AgentsTab() {
  // Only one agent runs at a time, so the screen never shows two agents mid-work.
  const [selected, setSelected] = useState<string>(sterimaxAgents[0].id);
  const agent = sterimaxAgents.find((a) => a.id === selected) ?? sterimaxAgents[0];
  const run = getTaskRun(agent.id);

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="flex flex-col gap-3">
        {sterimaxAgents.map((a, i) => {
          const active = a.id === selected;
          return (
            <button
              key={a.id}
              onClick={() => setSelected(a.id)}
              className={`text-left rounded-2xl p-4 border transition-colors ${
                active
                  ? "bg-white/[0.08] border-[#06b6d4]/50"
                  : "bg-white/[0.04] border-white/[0.1] hover:border-[#0071e3]/40"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={a.image}
                  alt={a.name}
                  className="w-9 h-9 rounded-xl object-cover object-top shrink-0"
                />
                <span className="min-w-0">
                  <span className="block text-white text-sm font-black tracking-tight">{a.name}</span>
                  <span className="block text-[#06b6d4] text-[9px] font-black uppercase tracking-widest truncate">
                    {a.domain}
                  </span>
                </span>
              </div>
              <LiveTaskLine agent={a} agentIndex={i + 1} tone="dark" />
            </button>
          );
        })}
      </div>

      <div className="lg:col-span-2">
        {run ? (
          <RunPanel key={agent.id} agent={agent} run={run} />
        ) : (
          <div className="rounded-2xl bg-white/[0.04] border border-white/[0.1] p-6">
            <p className="text-[#4a6785] text-sm font-medium">
              {agent.name} has no runnable task in this demo.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
