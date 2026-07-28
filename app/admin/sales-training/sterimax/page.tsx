import type { Metadata } from "next";
import Link from "next/link";
import { orchestrator, sterimaxAgents } from "@/data/sterimax-agents";
import { LiveClock } from "@/components/sterimax/LiveClock";
import { LiveTaskLine, LiveMeta } from "@/components/sterimax/AgentLive";
import { RosterCard } from "@/components/sterimax/RosterCard";

export const metadata: Metadata = {
  title: "SteriMax Agent Team | Audcomp Admin",
  robots: { index: false, follow: false },
};

export default function SteriMaxRosterPage() {
  return (
    <LiveClock>
      <main
        className="min-h-screen"
        style={{ background: "linear-gradient(135deg,#071e3d,#0d2d55,#071e3d)" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#06b6d4] mb-5">
              The SteriMax Agent Team
            </span>
            <h1 className="text-4xl lg:text-6xl font-black text-white tracking-tight mb-4">
              You hire a team, <span className="text-[#06b6d4] italic">not a product.</span>
            </h1>
            <p className="text-[#4a6785] text-base lg:text-lg font-medium">
              Six named specialists. One managed roster, governed by Wilfred.
            </p>
          </div>

          {/* Wilfred — the orchestrator, above the six rather than beside them */}
          <div className="rounded-2xl overflow-hidden bg-white/[0.06] border border-white/[0.1] backdrop-blur-sm grid lg:grid-cols-2 mb-12">
            <div className="relative min-h-[20rem] lg:min-h-[26rem] overflow-hidden">
              <img
                src={orchestrator.image}
                alt={`${orchestrator.name} — ${orchestrator.role}`}
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071e3d] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-[#071e3d]/20 lg:to-[#071e3d]" />
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#06b6d4] mb-5">
                The Orchestrator · Always On
              </span>
              <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tight mb-4">
                One manager for your{" "}
                <span className="text-[#06b6d4] italic">{orchestrator.headlineAccent}</span>
              </h2>
              <p className="text-[#4a6785] text-base font-medium leading-relaxed mb-8">
                {orchestrator.blurb}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                {orchestrator.capabilities.map((c) => (
                  <div key={c.title} className="rounded-2xl bg-white/[0.06] border border-white/[0.1] p-4">
                    <div className="text-lg font-black text-white tracking-tight">{c.title}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2.5 pt-5 border-t border-white/[0.08]">
                <LiveTaskLine agent={orchestrator} agentIndex={0} tone="dark" />
                <LiveMeta agent={orchestrator} tone="dark" />
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sterimaxAgents.map((agent, i) => (
              <RosterCard key={agent.id} agent={agent} agentIndex={i + 1} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/admin/sales-training"
              className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#4a6785] hover:text-[#06b6d4] transition-colors"
            >
              <i className="fas fa-arrow-left text-[10px]" /> All demos
            </Link>
          </div>
        </div>
      </main>
    </LiveClock>
  );
}
