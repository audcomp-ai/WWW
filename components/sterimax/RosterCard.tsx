import Link from "next/link";
import type { SteriMaxAgent } from "@/data/sterimax-agents";
import { LiveTaskLine, LiveMeta } from "./AgentLive";

export function RosterCard({ agent, agentIndex }: { agent: SteriMaxAgent; agentIndex: number }) {
  return (
    <Link
      href={`/admin/sales-training/sterimax/${agent.id}`}
      className="group relative rounded-2xl overflow-hidden bg-white/[0.06] border border-white/[0.1] backdrop-blur-sm hover:border-[#0071e3]/40 transition-colors duration-500 flex flex-col"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={agent.image}
          alt={`${agent.name} — ${agent.role}`}
          loading="lazy"
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071e3d] via-[#071e3d]/40 to-transparent" />

        <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0071e3]/90 backdrop-blur text-white text-[10px] font-black uppercase tracking-widest">
          {agent.domain}
        </span>

        {agent.badge ? (
          <span className="absolute top-4 right-4 inline-flex items-center px-3 py-1 rounded-full bg-[#06b6d4] text-[#071e3d] text-[9px] font-black uppercase tracking-widest">
            {agent.badge}
          </span>
        ) : null}

        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-2xl font-black text-white tracking-tight">{agent.name}</h3>
            {agent.agentNo ? (
              <span className="text-[10px] font-black tracking-[0.2em] text-white/40">{agent.agentNo}</span>
            ) : null}
          </div>
          <p className="text-[#06b6d4] text-[10px] font-black uppercase tracking-widest mt-1 leading-tight">
            {agent.role}
          </p>
        </div>
      </div>

      <div className="p-5 flex flex-col gap-4 flex-1">
        <p className="text-slate-400 text-sm font-medium leading-relaxed flex-1">{agent.rosterDesc}</p>
        <div className="pt-4 border-t border-white/[0.08] flex flex-col gap-2.5">
          <LiveTaskLine agent={agent} agentIndex={agentIndex} tone="dark" />
          <LiveMeta agent={agent} tone="dark" />
        </div>
      </div>
    </Link>
  );
}
