import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getSteriMaxAgent,
  allSteriMaxAgents,
  sterimaxAgents,
} from "@/data/sterimax-agents";
import { LiveClock } from "@/components/sterimax/LiveClock";
import { LiveTaskLine } from "@/components/sterimax/AgentLive";
import { ActivityStream } from "@/components/sterimax/ActivityStream";

export async function generateStaticParams() {
  return allSteriMaxAgents.map((a) => ({ agentId: a.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ agentId: string }>;
}): Promise<Metadata> {
  const { agentId } = await params;
  const agent = getSteriMaxAgent(agentId);
  if (!agent) return { title: "Agent Not Found | Audcomp Admin", robots: { index: false, follow: false } };
  return {
    title: `${agent.name} — ${agent.role} | SteriMax Demo`,
    description: agent.blurb,
    robots: { index: false, follow: false },
  };
}

export default async function SteriMaxAgentPage({
  params,
}: {
  params: Promise<{ agentId: string }>;
}) {
  const { agentId } = await params;
  const agent = getSteriMaxAgent(agentId);
  if (!agent) notFound();

  const isDark = agent.surface === "dark";
  const agentIndex = allSteriMaxAgents.findIndex((a) => a.id === agent.id);

  // prev/next walk the six specialists in deck order; Wilfred sits outside that cycle.
  const orderIndex = sterimaxAgents.findIndex((a) => a.id === agent.id);
  const prev = orderIndex > 0 ? sterimaxAgents[orderIndex - 1] : null;
  const next =
    orderIndex >= 0 && orderIndex < sterimaxAgents.length - 1 ? sterimaxAgents[orderIndex + 1] : null;

  const surfaceStyle = isDark
    ? { background: "linear-gradient(135deg,#071e3d,#0d2d55,#071e3d)" }
    : { background: "#f0f7ff" };

  const headingColor = isDark ? "text-white" : "text-[#0a2540]";
  const accentColor = isDark ? "text-[#06b6d4]" : "text-[#0071e3]";
  const bodyColor = "text-[#4a6785]";
  const cardClass = isDark
    ? "bg-white/[0.06] border border-white/[0.1] backdrop-blur-sm"
    : "bg-white border border-[#dde8f5] shadow-sm";
  // Written out in full rather than interpolated — Tailwind 4 scans source text, so a
  // class name assembled at runtime (`hover:${accent}`) is never generated.
  const navLinkClass = isDark
    ? "inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#4a6785] hover:text-[#06b6d4] transition-colors"
    : "inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#4a6785] hover:text-[#0071e3] transition-colors";

  // The deck alternates which side the portrait sits on.
  const portraitFirst = isDark;

  return (
    <LiveClock>
      <main className="min-h-screen" style={surfaceStyle}>
        <div className="grid lg:grid-cols-2 min-h-[36rem]">
          <div
            className={`relative min-h-[24rem] lg:min-h-[36rem] overflow-hidden ${
              portraitFirst ? "lg:order-1" : "lg:order-2"
            }`}
          >
            <img
              src={agent.image}
              alt={`${agent.name} — ${agent.role}`}
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
            <div
              className={`absolute inset-0 ${
                isDark
                  ? "bg-gradient-to-t from-[#071e3d] via-transparent to-transparent lg:bg-gradient-to-l lg:from-[#071e3d] lg:via-[#071e3d]/10 lg:to-transparent"
                  : "bg-gradient-to-t from-[#f0f7ff] via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#f0f7ff] lg:via-transparent lg:to-transparent"
              }`}
            />
          </div>

          <div
            className={`p-8 lg:p-16 flex flex-col justify-center ${
              portraitFirst ? "lg:order-2" : "lg:order-1"
            }`}
          >
            <div className="flex items-center justify-between gap-4 mb-5">
              <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${accentColor}`}>
                {agent.name} · {agent.role}
              </span>
              {agent.agentNo ? (
                <span className={`text-[10px] font-black tracking-[0.2em] ${bodyColor}`}>
                  {agent.agentNo}
                </span>
              ) : null}
            </div>

            {agent.badge ? (
              <span className="self-start inline-flex items-center px-3 py-1 rounded-full bg-[#06b6d4] text-[#071e3d] text-[9px] font-black uppercase tracking-widest mb-5">
                {agent.badge}
              </span>
            ) : null}

            <h1 className={`text-4xl lg:text-5xl font-black tracking-tight mb-6 ${headingColor}`}>
              {agent.headline.slice(0, agent.headline.length - agent.headlineAccent.length)}
              <span className={`${accentColor} italic`}>{agent.headlineAccent}</span>
            </h1>

            <p className={`text-base lg:text-lg font-medium leading-relaxed mb-8 ${bodyColor}`}>
              {agent.blurb}
            </p>

            <div className={`rounded-2xl p-4 ${cardClass}`}>
              <LiveTaskLine agent={agent} agentIndex={agentIndex} tone={agent.surface} />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-16">
          <div className="grid sm:grid-cols-2 gap-5 mb-12">
            {agent.capabilities.map((c) => (
              <div key={c.title} className={`rounded-2xl p-6 ${cardClass}`}>
                <h3 className={`text-base font-bold mb-2 ${headingColor}`}>{c.title}</h3>
                <p className={`text-sm font-medium leading-relaxed ${bodyColor}`}>{c.desc}</p>
              </div>
            ))}
          </div>

          <div className="mb-12">
            <span className={`block text-[10px] font-black uppercase tracking-[0.3em] ${bodyColor} mb-3`}>
              Wires into
            </span>
            <p className={`text-base lg:text-lg font-medium ${headingColor}`}>
              {agent.wiresInto.join(" · ")}
            </p>
            <p className={`text-sm font-medium mt-3 ${bodyColor}`}>{agent.guardrail}</p>
          </div>

          <div className="mb-12">
            <ActivityStream agent={agent} agentIndex={agentIndex} tone={agent.surface} />
          </div>

          <div className="flex items-center justify-between gap-4 flex-wrap">
            {prev ? (
              <Link
                href={`/admin/sales-training/sterimax/${prev.id}`}
                className={navLinkClass}
              >
                <i className="fas fa-arrow-left text-[10px]" /> {prev.name}
              </Link>
            ) : (
              <span />
            )}

            <Link
              href="/admin/sales-training/sterimax"
              className={navLinkClass}
            >
              Full roster
            </Link>

            {next ? (
              <Link
                href={`/admin/sales-training/sterimax/${next.id}`}
                className={navLinkClass}
              >
                {next.name} <i className="fas fa-arrow-right text-[10px]" />
              </Link>
            ) : (
              <span />
            )}
          </div>
        </div>
      </main>
    </LiveClock>
  );
}
