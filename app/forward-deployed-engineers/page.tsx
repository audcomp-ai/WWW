import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";
import CTABanner from "@/components/CTABanner";
import { SectionAngle } from "@/components/SectionAngle";
import { AnimatedSection, StaggeredSection, StaggeredItem } from "@/components/AnimatedSection";

export const metadata: Metadata = {
  title: "Embedded AI Engineers | Audcomp",
  description:
    "An Audcomp engineer embedded in your business, learning your workflows, then building and shipping the automations, integrations, and AI agents your team actually needs.",
};

const howItWorks = [
  {
    step: "01",
    title: "Embed",
    desc: "Your engineer joins the way your team already works, your standups, your channels, your tools. No separate intake queue.",
  },
  {
    step: "02",
    title: "Map",
    desc: "They shadow the actual work to find where time is lost: the manual re-keying, the spreadsheet nobody owns, the handoff that always stalls.",
  },
  {
    step: "03",
    title: "Build",
    desc: "Working software shipped into your environment in small increments, so you see something running in weeks, not a slide deck at the end of a quarter.",
  },
  {
    step: "04",
    title: "Operate & hand over",
    desc: "Everything is documented, monitored, and handed to your team, with Audcomp's managed services behind it if you'd rather we keep running it.",
  },
];

const whatTheyBuild = [
  {
    title: "Workflow Automation",
    desc: "Replace the manual steps between systems, approvals, data entry, routing, notifications, with something that runs on its own.",
  },
  {
    title: "System Integrations",
    desc: "Make the tools you already pay for talk to each other: Microsoft 365, line-of-business apps, CRMs, finance systems, and custom APIs.",
  },
  {
    title: "Custom AI Agents",
    desc: "Purpose-built agents scoped to your data and governed by your security policies, built on the same foundation as Agent Studio.",
  },
  {
    title: "Internal Tools & Dashboards",
    desc: "The small applications nobody has time to build: intake forms, status boards, and reporting views your team will actually use.",
  },
  {
    title: "Data & Reporting Pipelines",
    desc: "Get numbers out of the systems holding them, into one place, on a schedule, instead of someone rebuilding the same report every month.",
  },
  {
    title: "Migration & Modernization",
    desc: "Move workloads off aging infrastructure and retire the brittle scripts and spreadsheets holding critical processes together.",
  },
];

const whoItsFor = [
  {
    title: "You have a backlog nobody owns",
    desc: "A list of \"we should automate that\" items that never reaches the top of anyone's week, because everyone is busy keeping the lights on.",
  },
  {
    title: "Your systems don't talk to each other",
    desc: "Staff move data between applications by hand, and every integration quote you've received prices it like a six-month project.",
  },
  {
    title: "You want AI, but not a science project",
    desc: "You've seen what agents can do and need someone to build the practical version against your real data, not another pilot that stalls.",
  },
  {
    title: "A full-time engineer is hard to justify",
    desc: "You need senior engineering capacity for a few days a week, not a permanent salary, a hiring cycle, and a retention problem.",
  },
];

const differentiators = [
  {
    title: "Senior engineers only",
    desc: "The person embedded with you is the person writing the code, not a coordinator relaying requirements to someone else.",
  },
  {
    title: "Security-first by default",
    desc: "Every engagement inherits Audcomp's security posture: scoped access, defined data boundaries, and auditable change control.",
  },
  {
    title: "Canadian, end to end",
    desc: "engineers in Canada and Canadian-hosted infrastructure, built for PIPEDA and provincial privacy obligations from the start.",
  },
  {
    title: "Backed by a full MSP",
    desc: "What your engineer builds doesn't become an orphan. Audcomp's managed services, SOC, and help desk can run it long-term.",
  },
  {
    title: "Flexible commitment",
    desc: "Scale the engagement up for a push and back down once it lands. No permanent headcount to carry through a quiet quarter.",
  },
  {
    title: "Outcome focused",
    desc: "Measured on what ships and what it saves, hours returned, errors removed, processes that no longer need a person watching them.",
  },
];

export default function ForwardDeployedEngineersPage() {
  return (
    <>
      <Hero
        title="Embedded AI Engineers"
        subtitle="An Audcomp engineer joins your team, learns how you work, and builds the automations and AI agents you need. You get someone who builds alongside you, not a ticket queue."
        ctaText="Talk to an Engineer"
        ctaHref="/contact"
        secondaryCtaText="Explore AI Services"
        secondaryCtaHref="/ai-services"
        backgroundImage="/images/professional_services_hero.png"
      />

      <SectionAngle from="#071e3d" to="#ffffff" flip={false} height={64} />

      {/* What it is — WHITE */}
      <section className="bg-white py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <p className="text-xs font-semibold text-[#06b6d4] uppercase tracking-widest mb-5">
              Embedded AI Engineers
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#0a2540] mb-8 tracking-tight leading-tight">
              Engineering capacity,<br />embedded in your team
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-6">
              Most technical work stalls for the same reason: the people who
              understand the business problem aren&apos;t the people who can build
              the fix, and the gap between them is filled with requirement
              documents, scoping calls, and change requests.
            </p>
            <p className="text-slate-500 text-lg leading-relaxed mb-6">
              An embedded engineer closes that gap by removing it. An
              Audcomp engineer works inside your business, sitting with the
              people doing the work, seeing the friction first-hand, and building
              against it directly. The person who understands the problem is the
              person shipping the solution.
            </p>
            <p className="text-slate-500 text-lg leading-relaxed">
              It is the model that gets used when a project genuinely has to land:
              short feedback loops, working software early, and an engineer who is
              accountable for the outcome rather than the specification.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <SectionAngle from="#ffffff" to="#071e3d" flip={false} height={64} />

      {/* How it works — NAVY */}
      <section className="relative bg-[#071e3d] py-24 px-4 overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[500px] h-[400px] rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(ellipse, #06b6d4 0%, transparent 70%)" }}
        />
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="text-xs font-semibold text-[#06b6d4] uppercase tracking-widest mb-4">
              How It Works
            </p>
            <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
              The Engagement
            </h2>
            <p className="text-white/45 text-base max-w-xl mx-auto">
              A structured way of working that starts producing before the
              discovery phase would normally have finished.
            </p>
          </AnimatedSection>
          <StaggeredSection className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {howItWorks.map((s) => (
              <StaggeredItem key={s.step}>
                <div className="h-full bg-white/[0.06] border border-white/[0.1] rounded-2xl p-8 backdrop-blur-sm">
                  <p className="text-4xl font-bold text-white/15 mb-4 tracking-tighter">{s.step}</p>
                  <h3 className="font-semibold text-white mb-2 text-base">{s.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{s.desc}</p>
                </div>
              </StaggeredItem>
            ))}
          </StaggeredSection>
        </div>
      </section>

      <SectionAngle from="#071e3d" to="#ffffff" flip={true} height={64} />

      {/* What they build — WHITE */}
      <section className="bg-white py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="mb-14">
            <p className="text-xs font-semibold text-[#0071e3] uppercase tracking-widest mb-4">
              Capabilities
            </p>
            <h2 className="text-4xl font-bold text-[#0a2540] tracking-tight mb-5">
              What Your Engineer Builds
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed max-w-3xl">
              The work is scoped to whatever is costing your team the most time.
              In practice, engagements tend to land in these areas.
            </p>
          </AnimatedSection>
          <StaggeredSection className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whatTheyBuild.map((f) => (
              <StaggeredItem key={f.title}>
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-7 hover:border-blue-200 hover:shadow-md transition-all duration-300">
                  <h3 className="font-semibold text-[#0a2540] mb-2 text-base">{f.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
              </StaggeredItem>
            ))}
          </StaggeredSection>
        </div>
      </section>

      <SectionAngle from="#ffffff" to="#f0f7ff" flip={true} height={64} />

      {/* Who it's for — MUTED */}
      <section className="bg-[#f0f7ff] py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <p className="text-xs font-semibold text-[#0071e3] uppercase tracking-widest mb-4">
              Who It&apos;s For
            </p>
            <h2 className="text-4xl font-bold text-[#0a2540] tracking-tight">
              If any of these sound like your quarter
            </h2>
          </AnimatedSection>
          <StaggeredSection className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {whoItsFor.map((f) => (
              <StaggeredItem key={f.title}>
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                  <h3 className="font-semibold text-[#0a2540] mb-3 text-lg tracking-tight">
                    {f.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
              </StaggeredItem>
            ))}
          </StaggeredSection>
        </div>
      </section>

      <SectionAngle from="#f0f7ff" to="#ffffff" flip={false} height={64} />

      {/* Why Audcomp — WHITE */}
      <section className="bg-white py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="text-xs font-semibold text-[#06b6d4] uppercase tracking-widest mb-4">
              Why Audcomp
            </p>
            <h2 className="text-4xl font-bold text-[#0a2540] tracking-tight">
              Embedded, But Not On Their Own
            </h2>
          </AnimatedSection>
          <StaggeredSection className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {differentiators.map((f) => (
              <StaggeredItem key={f.title}>
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-7 hover:border-blue-200 hover:shadow-sm transition-all duration-300">
                  <h3 className="font-semibold text-[#0a2540] mb-2 text-base">{f.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
              </StaggeredItem>
            ))}
          </StaggeredSection>

          <AnimatedSection className="mt-14 text-center">
            <p className="text-slate-500 text-base mb-5">
              Already looking at AI agents? An embedded engineer is how
              they get built against your real systems.
            </p>
            <Link
              href="/ai-services/agent-studio"
              className="inline-flex items-center gap-2 text-[#0071e3] hover:text-[#0077ed] font-semibold text-sm transition-colors"
            >
              Explore Agent Studio
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <SectionAngle from="#ffffff" to="#071e3d" flip={true} height={64} />

      <CTABanner
        title="Put an Engineer on It"
        subtitle="Tell us where your team is losing time. We'll scope an engagement around the work that matters most, and have someone building on it in weeks."
      />
    </>
  );
}
