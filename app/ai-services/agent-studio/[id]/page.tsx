import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAgent, allAgents } from "@/data/agents";

export async function generateStaticParams() {
  return allAgents.map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const agent = getAgent(id);
  if (!agent) return { title: "Agent Not Found | Audcomp Agent Studio" };
  const tagline = agent.tagline || agent.desc;
  return {
    title: `${agent.name} — ${agent.title || agent.role} | Audcomp Agent Studio`,
    description: tagline,
  };
}

const CAP_ICONS = [
  "fa-bolt", "fa-wand-magic-sparkles", "fa-gauge-high", "fa-layer-group",
  "fa-shield-halved", "fa-arrows-rotate", "fa-list-check", "fa-chart-line",
  "fa-plug", "fa-clock", "fa-lock",
];

export default async function AgentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const agent = getAgent(id);
  if (!agent) notFound();

  const badge =
    agent.tier === "junior" ? `Junior Series · ${agent.domain}` :
    agent.tier === "realtor" ? `Realtor Pack · ${agent.domain}` :
    agent.domain;

  const tagline = agent.tagline || agent.desc;
  const about = agent.about && agent.about.length ? agent.about : [agent.desc];
  const stats = agent.stats && agent.stats.length ? agent.stats : [
    { value: "48 hrs", label: "to deploy" },
    { value: "24/7", label: "always on" },
    { value: "🇨🇦", label: "Canadian-hosted" },
  ];

  const others = allAgents.filter((a) => a.id !== agent.id).slice(0, 8);

  const heroContent = (
    <>
      <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#06b6d4] mb-5">
        <span className="w-2 h-2 rounded-full bg-[#06b6d4] animate-pulse" /> {badge}
      </span>
      <h1 className="text-5xl lg:text-6xl font-black text-white tracking-tighter mb-2">
        Meet <span className="text-[#06b6d4] italic">{agent.name}.</span>
      </h1>
      <p className="text-[#06b6d4] text-sm font-black uppercase tracking-widest mb-6">{agent.title || agent.role}</p>
      <p className="text-slate-300 text-lg font-medium leading-relaxed mb-8">{tagline}</p>
      <div className="grid grid-cols-3 gap-4 mb-10 max-w-md">
        {stats.map((s) => (
          <div key={s.label} className="bg-white/5 rounded-2xl border border-white/10 backdrop-blur p-4">
            <div className="text-xl lg:text-2xl font-black text-white tracking-tight">{s.value}</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1 leading-tight">{s.label}</div>
          </div>
        ))}
      </div>
      <Link
        href="/contact"
        className="self-start inline-flex items-center gap-3 bg-[#0071e3] text-white px-8 py-4 rounded-2xl text-sm font-black uppercase tracking-widest hover:shadow-2xl hover:shadow-[#0071e3]/30 transition-all"
      >
        Deploy {agent.name} <i className="fas fa-arrow-right text-xs" />
      </Link>
    </>
  );

  return (
    <div className="min-h-screen bg-[#071e3d] overflow-x-hidden pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <Link
          href="/ai-services/agent-studio"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-xs font-black uppercase tracking-widest mb-12 transition-colors"
        >
          <i className="fas fa-arrow-left" /> All agents
        </Link>

        {/* HERO */}
        {agent.video ? (
          <header className="relative rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl mb-20 min-h-[32rem] lg:min-h-[40rem] flex items-end">
            <video autoPlay muted loop playsInline preload="auto" poster={agent.image} aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={agent.video} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-[#071e3d] via-[#071e3d]/55 to-[#071e3d]/10" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#071e3d]/85 via-[#071e3d]/20 to-transparent" />
            <span className="absolute top-6 left-6 w-12 h-12 rounded-2xl bg-white/10 border border-white/20 backdrop-blur flex items-center justify-center z-10">
              <i className={`fas ${agent.icon} text-[#06b6d4] text-lg`} />
            </span>
            <div className="relative z-10 p-8 lg:p-14 flex flex-col max-w-2xl">
              {heroContent}
            </div>
          </header>
        ) : (
          <div className="bg-white/[0.06] border border-white/10 backdrop-blur-sm rounded-[3rem] overflow-hidden shadow-2xl grid lg:grid-cols-2 mb-20">
            <div className="relative min-h-[24rem] lg:min-h-[34rem] order-1">
              <img src={agent.image} alt={agent.name} className="absolute inset-0 w-full h-full object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071e3d] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#071e3d]/60" />
              <span className="absolute top-6 left-6 w-12 h-12 rounded-2xl bg-white/10 border border-white/20 backdrop-blur flex items-center justify-center">
                <i className={`fas ${agent.icon} text-[#06b6d4] text-lg`} />
              </span>
            </div>
            <div className="p-8 lg:p-14 flex flex-col justify-center order-2">
              {heroContent}
            </div>
          </div>
        )}

        {/* ABOUT */}
        <section className="max-w-3xl mx-auto mb-24 text-center">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#06b6d4] mb-6 block">About {agent.name}</span>
          {about.map((p, i) => (
            <p key={i} className="text-slate-300 text-lg lg:text-xl font-medium leading-relaxed mb-6">{p}</p>
          ))}
        </section>

        {/* CAPABILITIES */}
        {agent.capabilities && agent.capabilities.length > 0 && (
          <section className="mb-24">
            <div className="text-center mb-14">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#06b6d4] mb-6 block">Capabilities</span>
              <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-white leading-tight">
                What <span className="text-[#06b6d4] italic">{agent.name}</span> can do.
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {agent.capabilities.map((c, i) => (
                <div key={c.title} className="bg-white/5 p-8 rounded-3xl border border-white/5 hover:border-[#0071e3]/30 transition-all group">
                  <div className="w-12 h-12 rounded-2xl bg-[#0071e3]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <i className={`fas ${CAP_ICONS[i % CAP_ICONS.length]} text-[#06b6d4]`} />
                  </div>
                  <h3 className="text-lg font-black text-white mb-2 tracking-tight">{c.title}</h3>
                  <p className="text-slate-400 text-sm font-medium leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* TIME SAVINGS TABLE */}
        {agent.timeTable && agent.timeTable.length > 0 && (
          <section className="mb-24">
            <div className="text-center mb-14">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#06b6d4] mb-6 block">Time saved</span>
              <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-white leading-tight">
                Hours <span className="text-[#06b6d4] italic">{agent.name} gives back.</span>
              </h2>
            </div>
            <div className="bg-white/[0.06] border border-white/10 backdrop-blur-sm rounded-[2.5rem] overflow-hidden max-w-4xl mx-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="p-5 lg:p-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Task</th>
                    <th className="p-5 lg:p-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Human</th>
                    <th className="p-5 lg:p-6 text-[10px] font-black uppercase tracking-widest text-slate-500">{agent.name}</th>
                    <th className="p-5 lg:p-6 text-[10px] font-black uppercase tracking-widest text-[#06b6d4]">Saved</th>
                  </tr>
                </thead>
                <tbody>
                  {agent.timeTable.map((r) => (
                    <tr key={r.task} className="border-b border-white/5 last:border-0">
                      <td className="p-5 lg:p-6 text-white font-bold text-sm">{r.task}</td>
                      <td className="p-5 lg:p-6 text-slate-400 font-medium text-sm">{r.human}</td>
                      <td className="p-5 lg:p-6 text-slate-400 font-medium text-sm">{r.agent}</td>
                      <td className="p-5 lg:p-6 text-[#06b6d4] font-black text-sm">{r.saved}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* REST OF TEAM */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#06b6d4] block">The rest of the team</span>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {others.map((a) => (
              <Link key={a.id} href={`/ai-services/agent-studio/${a.id}`} title={`${a.name} — ${a.role}`}
                className="group flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-2 pr-5 hover:border-[#0071e3]/40 transition-colors"
              >
                <img src={a.image} alt={a.name} loading="lazy" className="w-11 h-11 rounded-xl object-cover object-top" />
                <div className="leading-tight">
                  <div className="text-sm font-black text-white group-hover:text-[#06b6d4] transition-colors">{a.name}</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{a.role}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white/[0.06] border border-white/10 backdrop-blur-sm rounded-[3rem] overflow-hidden shadow-2xl p-10 lg:p-16 text-center relative">
          <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full opacity-20 pointer-events-none" style={{ background: "radial-gradient(ellipse, #0071e3 0%, transparent 70%)" }} />
          <div className="relative">
            <h2 className="text-3xl lg:text-5xl font-black tracking-tighter text-white mb-6 leading-tight">
              Put {agent.name} to work.
            </h2>
            <p className="text-slate-400 text-lg font-medium max-w-2xl mx-auto mb-10">
              Book a free assessment and we&apos;ll deploy {agent.name} into your stack — Canadian-hosted, ready in 48 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="inline-flex items-center justify-center gap-3 bg-[#0071e3] text-white px-10 py-5 rounded-2xl font-black text-lg hover:shadow-2xl hover:shadow-[#0071e3]/30 transition-all group">
                Book a free assessment <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/ai-services/agent-studio" className="inline-flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white px-10 py-5 rounded-2xl font-black text-lg hover:border-[#0071e3]/40 transition-all">
                Back to all agents
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
