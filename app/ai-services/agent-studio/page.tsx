import type { Metadata } from "next";
import Link from "next/link";
import { workforce, juniors, type Agent } from "@/data/agents";
import { SectionAngle } from "@/components/SectionAngle";

export const metadata: Metadata = {
  title: "Agent Studio | Audcomp — AI Agent Workforce for Canadian Businesses",
  description:
    "Deploy a full team of production-ready AI agents for your organization. Bookkeeper, SDR, Executive Assistant, Paralegal, Receptionist, and more — Canadian-hosted, ready in 48 hours.",
};

const agentFAQs = [
  { q: "What is an AI agent and how does it work?", a: "An AI agent is an autonomous software system that can reason, plan, and take actions to achieve specific goals. Unlike chatbots that only respond to queries, agents can use tools, access databases, browse the web, send messages, and execute multi-step workflows independently — all within guardrails you define." },
  { q: "What types of AI agents can Audcomp deploy?", a: "We deploy bookkeepers, SDRs, executive assistants, paralegals, receptionists, support managers, content marketers, and more. We also build multi-agent systems where these specialists collaborate on complex tasks." },
  { q: "How much does a custom AI agent cost?", a: "Agent engagements start at $497/mo for junior specialists and scale based on role complexity and integrations. Every engagement begins with a free assessment session." },
  { q: "What systems can AI agents integrate with?", a: "Our agents integrate with Slack, Microsoft Teams, Salesforce, Zendesk, email (SMTP), custom webhooks, SQL/NoSQL databases, Google Workspace, QuickBooks, and virtually any API-accessible system." },
  { q: "How do you ensure AI agent security?", a: "Every agent includes security guardrails: defined decision boundaries, tool access permissions, failure handling protocols, data access controls, and human-in-the-loop escalation paths. We follow SOC 2, PIPEDA, and enterprise governance standards." },
  { q: "Can I try an agent before a full engagement?", a: "Yes. Start with our free AI Readiness Assessment — we'll map the right specialists to your workflows and confirm your infrastructure is agent-ready before any production deployment." },
];

function AgentCard({ a, keySuffix }: { a: Agent; keySuffix: string }) {
  return (
    <Link
      href={`/ai-services/agent-studio/${a.id}`}
      key={`${a.id}-${keySuffix}`}
      className="group relative w-72 shrink-0 rounded-[2rem] overflow-hidden border border-white/10 bg-white/5 hover:border-[#0071e3]/40 transition-colors duration-500 block"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={a.image}
          alt={`${a.name} — ${a.role}`}
          loading="lazy"
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071e3d] via-[#071e3d]/40 to-transparent" />
        <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0071e3]/90 backdrop-blur text-white text-[10px] font-black uppercase tracking-widest">
          {a.domain}
        </span>
        <span className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-white/10 border border-white/20 backdrop-blur flex items-center justify-center">
          <i className={`fas ${a.icon} text-[#06b6d4] text-sm`} />
        </span>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl font-black text-white tracking-tight">{a.name}</h3>
          <p className="text-[#06b6d4] text-sm font-bold">{a.role}</p>
        </div>
      </div>
      <div className="p-6">
        <p className="text-slate-400 text-sm font-medium leading-relaxed line-clamp-3 mb-4">{a.desc}</p>
        <span className="inline-flex items-center gap-2 text-white text-xs font-black uppercase tracking-widest group-hover:text-[#06b6d4] transition-colors">
          View profile <i className="fas fa-arrow-right text-[10px] group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </Link>
  );
}

function Marquee({ agents }: { agents: Agent[] }) {
  return (
    <div className="relative max-w-5xl mx-auto overflow-hidden">
      <div className="flex gap-6 w-max animate-marquee" style={{ animationDirection: "reverse" }}>
        {[...agents, ...agents].map((a, i) => (
          <AgentCard key={`${a.id}-m${i}`} a={a} keySuffix={`m${i}`} />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#071e3d] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#071e3d] to-transparent z-10" />
    </div>
  );
}

function FeaturedAgent({
  a,
  tag,
  blurb,
  stats,
  works,
}: {
  a: Agent;
  tag: string;
  blurb: string;
  stats: { v: string; l: string }[];
  works?: React.ReactNode;
}) {
  return (
    <div className="bg-white/[0.06] border border-white/10 backdrop-blur-sm rounded-[3rem] overflow-hidden shadow-2xl grid lg:grid-cols-2 mb-12">
      <div className="p-8 lg:p-12 flex flex-col justify-center order-2 lg:order-1">
        <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#06b6d4] mb-5">
          <i className="fas fa-star" /> {tag}
        </span>
        <h3 className="text-4xl lg:text-5xl font-black text-white tracking-tighter mb-1">{a.name}</h3>
        <p className="text-[#06b6d4] text-sm font-black uppercase tracking-widest mb-5">{a.role}</p>
        <p className="text-slate-400 text-base lg:text-lg font-medium leading-relaxed mb-8">{blurb}</p>
        {works}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {stats.map((s) => (
            <div key={s.l}>
              <div className="text-lg lg:text-2xl font-black text-white tracking-tight">{s.v}</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1 leading-tight">{s.l}</div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-[#0071e3] text-white px-7 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:shadow-2xl hover:shadow-[#0071e3]/30 transition-all"
          >
            Deploy {a.name} <i className="fas fa-arrow-right text-[10px]" />
          </Link>
          <Link
            href={`/ai-services/agent-studio/${a.id}`}
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white px-7 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:border-[#0071e3]/40 transition-all"
          >
            Full profile
          </Link>
        </div>
      </div>
      <div className="relative min-h-[22rem] lg:min-h-[30rem] order-1 lg:order-2 overflow-hidden">
        <img src={a.image} alt={`${a.name} — ${a.role}`} className="absolute inset-0 w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071e3d] via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#071e3d] lg:via-[#071e3d]/10 lg:to-transparent" />
        <span className="absolute top-5 right-5 w-11 h-11 rounded-2xl bg-white/10 border border-white/20 backdrop-blur flex items-center justify-center">
          <i className={`fas ${a.icon} text-[#06b6d4]`} />
        </span>
      </div>
    </div>
  );
}

function WorksBadge({ text }: { text: string }) {
  return (
    <span className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/15 text-white text-sm font-black">{text}</span>
  );
}

export default function AgentStudioPage() {
  const quinn = workforce.find((a) => a.id === "quinn")!;
  const scout = juniors.find((a) => a.id === "scout")!;

  return (
    <div className="min-h-screen bg-[#071e3d] overflow-x-hidden pb-24">

      {/* ── VIDEO HERO ── */}
      <header className="relative w-full h-[90vh] min-h-[620px] overflow-hidden">
        <video
          autoPlay muted loop playsInline preload="auto"
          poster="/agent-hero-poster.png"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/agent-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#071e3d]/70 via-[#071e3d]/30 to-[#071e3d]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071e3d]/85 via-[#071e3d]/20 to-transparent" />
        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col justify-end pb-20 lg:pb-28">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-6 w-fit backdrop-blur">
            <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-[#0071e3] text-white uppercase tracking-widest">Studio Workspace</span>
            <span className="text-xs font-bold text-white uppercase tracking-widest">Architecture Suite</span>
          </div>
          <h1 className="text-6xl lg:text-8xl font-black tracking-tighter text-white mb-6 max-w-4xl leading-[0.95]">
            Agent <span className="italic">Studio.</span>
          </h1>
          <p className="text-slate-300 text-lg lg:text-2xl font-medium max-w-2xl mb-8 leading-relaxed">
            Design, deploy, and orchestrate a full team of production-ready AI agents for your organization.
          </p>
          <a href="#workforce" className="inline-flex items-center gap-3 text-white text-xs font-black uppercase tracking-[0.2em] w-fit group">
            Meet the workforce
            <span className="w-9 h-9 rounded-full bg-[#0071e3] flex items-center justify-center group-hover:translate-y-1 transition-transform">
              <i className="fas fa-arrow-down" />
            </span>
          </a>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 relative z-10 pt-24">

        {/* ── THE DIGITAL WORKFORCE ── */}
        <section id="workforce" className="mb-32">
          <div className="text-center mb-14">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#06b6d4] mb-6 block">Meet the Digital Workforce</span>
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter text-gradient-studio mb-6 leading-tight">
              A full team of agents.<br /><span className="italic">One orchestrator.</span>
            </h2>
            <p className="text-slate-400 text-lg lg:text-xl font-medium max-w-3xl mx-auto leading-relaxed">
              Pre-trained specialists for the work you&apos;d otherwise hire for — each one deployable into your stack, hired and managed by Wilfred, and on duty around the clock.
            </p>
          </div>

          {/* Wilfred Conductor */}
          <div className="bg-white/[0.06] border border-white/10 backdrop-blur-sm rounded-[3rem] overflow-hidden shadow-2xl p-8 lg:p-12 mb-16 relative">
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-20 pointer-events-none" style={{ background: "radial-gradient(ellipse, #0071e3 0%, transparent 70%)" }} />
            <div className="relative grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0071e3]/10 border border-[#0071e3]/20 rounded-full mb-6">
                  <span className="w-2 h-2 rounded-full bg-[#0071e3] animate-pulse" />
                  <span className="text-[10px] font-black text-[#06b6d4] uppercase tracking-widest">The Orchestrator · Always On</span>
                </div>
                <h3 className="text-3xl lg:text-5xl font-black text-white tracking-tighter mb-2">
                  Meet <span className="text-[#06b6d4] italic">Wilfred.</span>
                </h3>
                <p className="text-[#06b6d4] text-sm font-black uppercase tracking-widest mb-5">Your AI Workforce Orchestrator</p>
                <p className="text-slate-400 text-base lg:text-lg font-medium leading-relaxed mb-8">
                  Wilfred is the one who actually hires your AI team. He reads your goal in plain English, picks the right specialist for every job, wires them into your stack, runs the day-to-day, and reports outcomes back to you — so you manage results, not prompts.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { stat: "< 24h", label: "Specialist deployed" },
                    { stat: "24/7", label: "Always on duty" },
                    { stat: "Multi", label: "Agent routing" },
                    { stat: "HITL", label: "Human-in-the-loop" },
                  ].map((s) => (
                    <div key={s.label} className="bg-white/5 rounded-2xl border border-white/5 p-4">
                      <div className="text-xl font-black text-white tracking-tight">{s.stat}</div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1 leading-tight">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Orbital diagram */}
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-md aspect-square mx-auto">
                  <div className="absolute inset-[3%] rounded-full border border-white/5" />
                  <div className="absolute inset-[24%] rounded-full border border-white/5" />
                  {/* Wilfred center */}
                  <div className="absolute inset-0 m-auto w-36 h-36 lg:w-40 lg:h-40 rounded-full overflow-hidden ring-4 ring-[#0071e3] shadow-2xl shadow-[#0071e3]/40 z-20">
                    <img src="/images/agents/wilfred.png" alt="Wilfred — AI Workforce Orchestrator" className="w-full h-full object-cover" style={{ objectPosition: "60% 20%" }} />
                  </div>
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-[2%] z-30 px-3 py-1 rounded-full bg-[#0071e3] text-white text-[10px] font-black uppercase tracking-widest shadow-lg">Wilfred</span>
                  {/* Inner ring — workforce */}
                  {workforce.map((a, i) => {
                    const angle = (i / workforce.length) * 2 * Math.PI - Math.PI / 2;
                    const r = 33;
                    const top = 50 + r * Math.sin(angle);
                    const left = 50 + r * Math.cos(angle);
                    return (
                      <Link key={a.id} href={`/ai-services/agent-studio/${a.id}`} title={`${a.name} — ${a.role}`}
                        className="absolute w-14 h-14 rounded-full overflow-hidden border-2 border-white/20 shadow-lg -translate-x-1/2 -translate-y-1/2 z-10 hover:border-[#0071e3] hover:scale-110 transition-all"
                        style={{ top: `${top}%`, left: `${left}%` }}
                      >
                        <img src={a.image} alt={a.name} loading="lazy" className="w-full h-full object-cover object-top" />
                      </Link>
                    );
                  })}
                  {/* Outer ring — juniors + realtors */}
                  {[...juniors, ...realtorPack].map((a, i) => {
                    const list = [...juniors, ...realtorPack];
                    const angle = (i / list.length) * 2 * Math.PI - Math.PI / 2 + Math.PI / list.length;
                    const r = 46;
                    const top = 50 + r * Math.sin(angle);
                    const left = 50 + r * Math.cos(angle);
                    return (
                      <Link key={a.id} href={`/ai-services/agent-studio/${a.id}`} title={`${a.name} — ${a.role}`}
                        className="absolute w-10 h-10 rounded-full overflow-hidden border-2 border-white/15 shadow-md -translate-x-1/2 -translate-y-1/2 hover:border-[#06b6d4] hover:scale-110 transition-all"
                        style={{ top: `${top}%`, left: `${left}%` }}
                      >
                        <img src={a.image} alt={a.name} loading="lazy" className="w-full h-full object-cover object-top" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Featured — Quinn */}
          <FeaturedAgent
            a={quinn}
            tag="Featured · Finance"
            blurb="QuickBooks-certified. Reconciliations, payroll runs, and tax filings with a clean monthly close — every cycle, without you chasing it."
            works={
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Works with</span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#2CA01C] text-white text-sm font-black">
                  <span className="w-5 h-5 rounded-full bg-white text-[#2CA01C] flex items-center justify-center text-[10px] font-black">qb</span>
                  QuickBooks
                </span>
                <WorksBadge text="Sage" />
                <WorksBadge text="Xero" />
              </div>
            }
            stats={[
              { v: "Certified", l: "QuickBooks expert" },
              { v: "< 48 hrs", l: "To first reconcile" },
              { v: "24/7", l: "Always reconciling" },
            ]}
          />

          <div className="mb-8">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 block text-center mb-8">Our Specialty Agents</span>
          </div>
          <Marquee agents={workforce} />

          {/* Custom specialist CTA */}
          <div className="mt-12 bg-white/[0.04] border border-dashed border-white/15 rounded-3xl p-8 lg:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <h3 className="text-xl font-black text-white mb-2 tracking-tight">Need a role that isn&apos;t here?</h3>
              <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-xl">
                Describe the job and Wilfred spins up a new specialist against your spec — wired into your stack and ready to work.
              </p>
            </div>
            <Link href="/contact" className="shrink-0 inline-flex items-center gap-2 bg-[#0071e3] text-white px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:shadow-2xl hover:shadow-[#0071e3]/30 transition-all">
              Request a custom specialist <i className="fas fa-arrow-right text-[10px]" />
            </Link>
          </div>
        </section>

        {/* ── JUNIOR SERIES ── */}
        <section className="mb-32">
          <div className="text-center mb-14">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-orange-400 mb-6 block">Junior Series</span>
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter text-white mb-6 leading-tight">
              Junior agents for the <span className="text-emerald-400 italic">lighter lifts.</span>
            </h2>
            <p className="text-slate-400 text-lg lg:text-xl font-medium max-w-3xl mx-auto leading-relaxed">
              Focused assistants trained on narrower workflows — ideal for supporting your senior specialists and your team on high-volume, repetitive tasks.
            </p>
          </div>
          <FeaturedAgent
            a={scout}
            tag="Featured · Junior Research"
            blurb="Gathers data and web insights, summarizes competitor activity and industry reports, and feeds fresh topics to the rest of your team — every day."
            works={
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Skilled in</span>
                <WorksBadge text="Web Research" /><WorksBadge text="Summaries" /><WorksBadge text="Competitor Intel" />
              </div>
            }
            stats={[
              { v: "Multi-source", l: "Web + data" },
              { v: "Daily", l: "Briefings" },
              { v: "24/7", l: "Always digging" },
            ]}
          />
          <div className="mb-8">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 block text-center">Our Junior Agents</span>
          </div>
          <Marquee agents={juniors} />
        </section>

        {/* ── WHO HIRES WILFRED ── */}
        <section className="mb-32">
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#06b6d4] mb-6 block">Who hires Wilfred</span>
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter text-white mb-6 leading-tight">
              If you have work that needs doing and a hire you can&apos;t justify yet —{" "}
              <span className="italic">Wilfred fills that gap.</span>
            </h2>
            <p className="text-slate-400 text-lg lg:text-xl font-medium leading-relaxed">
              Four kinds of Canadian SMB owners are quietly running themselves into the ground because they can&apos;t find, afford, or justify the next hire. If any of these sound like your week, we should talk.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {[
              {
                segment: "Trades & Field Services", icon: "fa-helmet-safety",
                headline: "You're losing jobs in the parking lot.",
                pain: "Calls go to voicemail while you're on a roof. By the time you call back, the homeowner already booked your competitor. You can't afford a $48K receptionist and you can't keep losing $3K jobs over a missed call.",
                fix: "Maya answers every call in under 2 rings, qualifies the lead, books the estimate into your calendar, and texts you the summary.",
                price: "From $497/mo", name: "Maya", role: "Receptionist", image: "/images/agents/maya.png",
              },
              {
                segment: "Professional Services", icon: "fa-scale-balanced",
                headline: "Your books are three weeks behind. Again.",
                pain: "You're a 6–15 person firm — law, accounting, consulting, architecture. You bill by the hour, but you spend Sundays catching up on reconciliations and chasing invoices. A full-time bookkeeper is overkill; finding a reliable part-time one is a hiring nightmare.",
                fix: "Quinn closes the books weekly inside your QuickBooks or Xero, chases AR, files GST/HST, and hands your CPA a clean year-end.",
                price: "From $1,200/mo", name: "Quinn", role: "Bookkeeper", image: "/images/agents/quinn.png",
              },
              {
                segment: "Retail & E-Commerce", icon: "fa-bag-shopping",
                headline: "Your DMs are open. You aren't.",
                pain: "Instagram DMs, Shopify chat, abandoned-cart emails, return requests, \"is this in stock?\" — and you're a team of three. Customers wait 8 hours for a reply, then buy from Amazon instead.",
                fix: "Theo handles tier-1 support across every channel, answers from your knowledge base, escalates only what matters, and recovers abandoned carts overnight.",
                price: "From $1,497/mo", name: "Theo", role: "Support", image: "/images/agents/theo.png",
              },
              {
                segment: "Early-Stage Startups", icon: "fa-rocket",
                headline: "You're the founder, the SDR, and the demo rep.",
                pain: "Seed to Series A, two founders, no revenue team. You're doing prospecting between investor meetings. Pipeline is lumpy because outreach stops every time a fire breaks out. Hiring an SDR at $75K is six months you don't have.",
                fix: "Sam sources, enriches, sequences, and books inside your HubSpot or Salesforce. You walk into qualified discovery calls.",
                price: "From $1,997/mo", name: "Sam", role: "SDR", image: "/images/agents/sam.png",
              },
            ].map((p) => (
              <div key={p.segment} className="bg-white/[0.06] border border-white/10 backdrop-blur-sm rounded-[2.5rem] p-8 lg:p-10 flex flex-col hover:border-[#0071e3]/30 transition-colors">
                <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#06b6d4] mb-5">
                  <i className={`fas ${p.icon}`} /> {p.segment}
                </span>
                <h3 className="text-2xl lg:text-3xl font-black text-white tracking-tight mb-6 leading-snug">{p.headline}</h3>
                <p className="text-slate-400 text-sm lg:text-base font-medium leading-relaxed mb-4">
                  <span className="text-white font-black">The pain: </span>{p.pain}
                </p>
                <p className="text-slate-300 text-sm lg:text-base font-medium leading-relaxed mb-8">
                  <span className="text-[#06b6d4] font-black">The fix: </span>{p.fix}{" "}
                  <span className="text-white font-black whitespace-nowrap">{p.price}</span>
                </p>
                <Link href="/contact" className="mt-auto group flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-3 pr-5 hover:border-[#0071e3]/40 transition-colors">
                  <img src={p.image} alt={p.name} loading="lazy" className="w-14 h-14 rounded-xl object-cover object-top" />
                  <div className="leading-tight">
                    <div className="text-base font-black text-white">{p.name}</div>
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{p.role} · Ready in 48hr</div>
                  </div>
                  <span className="ml-auto w-9 h-9 rounded-full bg-[#0071e3]/10 border border-[#0071e3]/20 flex items-center justify-center text-[#0071e3] group-hover:bg-[#0071e3] group-hover:text-white transition-all">
                    <i className="fas fa-arrow-up-right-from-square text-xs" />
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* ── CANADIAN WEDGE ── */}
      <SectionAngle from="#071e3d" to="#ffffff" flip={true} height={64} />
      <section className="bg-white py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.5em] text-[#0071e3] mb-6">
              <span className="text-sm">🍁</span> The Canadian Wedge
            </span>
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter text-[#0a2540] mb-6 leading-tight">
              Canadian conductor.<br /><span className="text-[#0071e3] italic">Canadian team. Canadian rules.</span>
            </h2>
            <p className="text-slate-600 text-lg lg:text-xl font-medium leading-relaxed">
              Every other AI staffing platform routes your data through US servers. For regulated Canadian businesses — legal, healthcare, financial, dental, government, education — that&apos;s a non-starter. Wilfred is the only AI workforce conductor built end-to-end on Canadian soil.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                label: "Data residency", value: "100% Canadian",
                desc: "Azure Canada Central + AWS Bedrock ca-central-1. Your data never crosses the border.",
                items: ["No cross-border data flows", "CMK encryption available", "Dedicated tenant on Sovereign tier", "Annual third-party audit"],
              },
              {
                label: "Built-in compliance", value: "PIPEDA + Law 25",
                desc: "DPA, audit logs, 7-year retention — out of the box, every plan.",
                items: ["PIPEDA-compliant by default", "Quebec Law 25 ready", "7-year immutable audit logs", "Optional PHIPA / Law Society guardrails"],
              },
              {
                label: "Billing & support", value: "CAD & Canadian",
                desc: "CAD pricing, CAD invoicing, 24/7 Canadian-staffed support. No FX surprises.",
                items: ["CAD billing, no FX exposure", "Canadian success manager", "Toronto / Montreal / Vancouver support", "Owned & operated in Canada"],
              },
            ].map((c) => (
              <div key={c.label} className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 flex flex-col shadow-sm">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-3">{c.label}</span>
                <div className="text-3xl font-black tracking-tight text-[#0a2540] mb-3">{c.value}</div>
                <p className="text-slate-600 text-sm font-medium leading-relaxed mb-6">{c.desc}</p>
                <ul className="space-y-3 mt-auto">
                  {c.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm font-semibold text-slate-700">
                      <i className="fas fa-check text-[#0071e3] mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Final CTA — white */}
          <div className="rounded-[3rem] bg-[#0a2540] shadow-2xl p-10 lg:p-16 text-center relative overflow-hidden">
            <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full opacity-20 pointer-events-none" style={{ background: "radial-gradient(ellipse, #0071e3 0%, transparent 70%)" }} />
            <div className="relative">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#06b6d4] mb-6 block">Ready when you are</span>
              <h2 className="text-4xl lg:text-6xl font-black tracking-tighter text-white mb-6 leading-tight">
                Tell Wilfred what you need.<br /><span className="italic text-[#06b6d4]">He&apos;ll build the team.</span>
              </h2>
              <p className="text-slate-300 text-lg font-medium max-w-2xl mx-auto mb-10">
                Book a free assessment and we&apos;ll map the right specialists to your work — deployed, supervised, and Canadian-hosted, ready in 48 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="inline-flex items-center justify-center gap-3 bg-[#0071e3] text-white px-10 py-5 rounded-2xl font-black text-lg hover:shadow-2xl hover:shadow-[#0071e3]/30 transition-all group">
                  Book a free assessment <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/ai-services" className="inline-flex items-center justify-center gap-3 bg-white/10 border border-white/20 text-white px-10 py-5 rounded-2xl font-black text-lg hover:border-[#0071e3]/60 transition-all">
                  Back to AI Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <SectionAngle from="#ffffff" to="#071e3d" flip={false} height={64} />

      {/* ── FAQ ── */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#06b6d4] mb-4 block">Agent Questions</span>
            <h2 className="text-5xl lg:text-7xl font-black tracking-tighter text-white">
              Frequently <span className="italic text-[#06b6d4]">Asked.</span>
            </h2>
          </div>
          <div className="space-y-4">
            {agentFAQs.map((faq) => (
              <details key={faq.q} className="group bg-white/[0.06] border border-white/10 rounded-2xl overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer text-white font-bold text-base list-none select-none hover:text-[#06b6d4] transition-colors">
                  {faq.q}
                  <i className="fas fa-plus text-[#06b6d4] text-sm group-open:rotate-45 transition-transform" />
                </summary>
                <div className="px-6 pb-6 text-slate-400 text-sm leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
