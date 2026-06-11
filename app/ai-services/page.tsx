import type { Metadata } from "next";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import CTABanner from "@/components/CTABanner";
import { SectionAngle } from "@/components/SectionAngle";
import { AnimatedSection, StaggeredSection, StaggeredItem } from "@/components/AnimatedSection";

export const metadata: Metadata = {
  title: "AI Services | Audcomp — Microsoft Copilot & AI Agent Consulting in Canada",
  description:
    "Audcomp helps Canadian businesses adopt AI safely and strategically — Microsoft Copilot enablement, custom AI agents, AI readiness assessments, and data governance.",
};

const subServices = [
  {
    title: "Microsoft Copilot Enablement",
    description: "Readiness assessment, integration, training, and ongoing support for Microsoft Copilot across your Microsoft 365 environment.",
    href: "/microsoft-copilot-enablement",
    category: "AI",
  },
  {
    title: "Custom AI Agents",
    description: "Purpose-built AI agents that automate workflows, answer staff questions, and handle routine tasks — deployed securely in your environment.",
    href: "/ai-services#agents",
    category: "AI",
  },
  {
    title: "AI Consulting & Roadmap",
    description: "Identify high-value AI use cases, assess organizational readiness, and build a tailored AI roadmap sequenced by ROI.",
    href: "/ai-services#consulting",
    category: "AI",
  },
  {
    title: "AI Business Readiness",
    description: "Data quality, privacy, compliance, and ethical AI frameworks to ensure your AI initiatives are built on solid foundations.",
    href: "/ai-services#governance",
    category: "AI",
  },
];

const agentUseCases = [
  {
    title: "IT Help Desk Agent",
    desc: "Automatically resolve common IT tickets — password resets, software installs, VPN troubleshooting — reducing level-1 support volume by up to 60%.",
    icon: "🖥",
  },
  {
    title: "Procurement Assistant",
    desc: "An agent that tracks hardware inventory, raises purchase orders, and surfaces vendor quotes — keeping procurement moving without manual overhead.",
    icon: "📦",
  },
  {
    title: "Security Alert Triage",
    desc: "Correlate and prioritize security alerts in real time, escalating only the threats that require human attention and reducing analyst fatigue.",
    icon: "🛡",
  },
  {
    title: "Onboarding Coordinator",
    desc: "Walk new employees through account setup, access provisioning, and policy acknowledgment — cutting IT onboarding time from days to hours.",
    icon: "✅",
  },
  {
    title: "Reporting & Analytics Agent",
    desc: "Automatically generate weekly IT health reports, license utilization summaries, and cost optimization recommendations delivered to stakeholders.",
    icon: "📊",
  },
  {
    title: "Compliance Monitor",
    desc: "Continuously scan your environment for policy drift, missing patches, and regulatory gaps — and generate audit-ready reports on demand.",
    icon: "📋",
  },
];

const deploymentSteps = [
  { step: "01", title: "Discovery", desc: "Map your existing workflows and identify which tasks are best suited for AI automation." },
  { step: "02", title: "Agent Design", desc: "Configure agent scope, data sources, permissions, and escalation rules aligned with your security policies." },
  { step: "03", title: "Pilot Deployment", desc: "Run a controlled pilot with a small team to validate performance and gather feedback." },
  { step: "04", title: "Full Rollout", desc: "Scale across your organization with training, documentation, and ongoing monitoring by Audcomp engineers." },
];

export default function AIServicesPage() {
  return (
    <>
      <Hero
        title="AI Services"
        subtitle="Practical AI for Canadian businesses — from Microsoft Copilot to custom AI agents that automate the work your team does every day."
        ctaText="Start Your AI Assessment"
        ctaHref="/contact"
        backgroundImage="/images/ai_services_hero.png"
      />

      {/* Intro — WHITE */}
      <section className="bg-white py-32 px-4">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <p className="text-xs font-semibold text-[#0071e3] uppercase tracking-widest mb-5">Why Audcomp for AI</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#0a2540] mb-8 tracking-tight leading-tight">
              AI That Actually Works<br />for Your Business
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-6">
              Artificial intelligence is reshaping how businesses operate — but the hype often outpaces the practical reality. Audcomp helps Canadian organizations cut through the noise to identify AI applications that genuinely improve efficiency, reduce cost, or create competitive advantage.
            </p>
            <p className="text-slate-500 text-lg leading-relaxed mb-6">
              Whether you&apos;re beginning with Microsoft Copilot in your existing Microsoft 365 environment, deploying custom AI agents for workflow automation, or building the data governance foundation for responsible AI adoption, Audcomp provides the strategy, implementation, and ongoing support to make it work.
            </p>
            <p className="text-slate-500 text-lg leading-relaxed">
              We take a security-first approach to every AI engagement — ensuring your data, your privacy, and your compliance obligations are protected as you embrace new technologies.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <SectionAngle from="#ffffff" to="#071e3d" flip={false} height={64} />

      {/* Services Grid — navy */}
      <section className="bg-[#071e3d] py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <p className="text-xs font-semibold text-[#06b6d4] uppercase tracking-widest mb-4">Services</p>
            <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">A Complete AI Journey</h2>
            <p className="text-white/50 text-base max-w-2xl mx-auto">
              From readiness through deployment and governance — Audcomp covers the full AI lifecycle.
            </p>
          </AnimatedSection>
          <StaggeredSection className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {subServices.map((s) => (
              <StaggeredItem key={s.href}>
                <ServiceCard {...s} variant="dark" />
              </StaggeredItem>
            ))}
          </StaggeredSection>
        </div>
      </section>

      <SectionAngle from="#071e3d" to="#ffffff" flip={true} height={64} />

      {/* AI Agents — WHITE with use cases */}
      <section id="agents" className="bg-white py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="mb-16">
            <p className="text-xs font-semibold text-[#06b6d4] uppercase tracking-widest mb-4">AI Agents</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
              <div>
                <h2 className="text-4xl sm:text-5xl font-bold text-[#0a2540] mb-5 tracking-tight leading-tight">
                  Agents That Work<br />Alongside Your Team
                </h2>
                <p className="text-slate-500 text-lg leading-relaxed">
                  AI agents are purpose-built software that can reason, take action, and complete multi-step tasks autonomously — without constant human input. Audcomp designs, deploys, and manages custom AI agents that plug into your existing Microsoft 365 environment and workflows.
                </p>
              </div>
              <div>
                <p className="text-slate-500 text-base leading-relaxed mb-4">
                  Unlike generic chatbots, Audcomp agents are scoped to your specific business processes, connected to your data sources, and governed by the security policies your organization already has in place.
                </p>
                <p className="text-slate-500 text-base leading-relaxed">
                  Each agent deployment includes an AI readiness assessment, security review, pilot rollout, and ongoing managed monitoring — so your team can trust what it&apos;s working with.
                </p>
              </div>
            </div>
          </AnimatedSection>

          <StaggeredSection className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {agentUseCases.map((uc) => (
              <StaggeredItem key={uc.title}>
                <div className="rounded-2xl border border-slate-200 bg-white p-7 hover:border-blue-200 hover:shadow-md transition-all duration-300">
                  <div className="text-2xl mb-4">{uc.icon}</div>
                  <h3 className="font-semibold text-[#0a2540] mb-2 text-base tracking-tight">{uc.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{uc.desc}</p>
                </div>
              </StaggeredItem>
            ))}
          </StaggeredSection>
        </div>
      </section>

      <SectionAngle from="#ffffff" to="#071e3d" flip={false} height={64} />

      {/* Deployment Process — navy */}
      <section className="relative bg-[#071e3d] py-24 px-4 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[400px] rounded-full opacity-10 pointer-events-none" style={{ background: "radial-gradient(ellipse, #06b6d4 0%, transparent 70%)" }} />
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="text-xs font-semibold text-[#06b6d4] uppercase tracking-widest mb-4">How It Works</p>
            <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">Agent Deployment Process</h2>
            <p className="text-white/45 text-base max-w-xl mx-auto">
              A structured, security-first process from discovery to full rollout.
            </p>
          </AnimatedSection>
          <StaggeredSection className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {deploymentSteps.map((s) => (
              <StaggeredItem key={s.step}>
                <div className="bg-white/[0.06] border border-white/[0.1] rounded-2xl p-8 backdrop-blur-sm">
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

      {/* AI Consulting — WHITE */}
      <section id="consulting" className="bg-white py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="mb-12">
            <p className="text-xs font-semibold text-[#0071e3] uppercase tracking-widest mb-4">AI Consulting</p>
            <h2 className="text-4xl font-bold text-[#0a2540] mb-6 tracking-tight">
              Start with Strategy
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed max-w-3xl">
              Before deploying AI tools, organizations need to understand where AI can genuinely add value — and where it introduces risk. Audcomp&apos;s AI Consulting service helps you answer both questions.
            </p>
          </AnimatedSection>
          <StaggeredSection className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: "Use Case Identification", desc: "Identify the highest-value AI use cases specific to your industry, workflows, and data." },
              { title: "Readiness Assessment", desc: "Evaluate your data quality, infrastructure, and organizational readiness for AI adoption." },
              { title: "AI Roadmap", desc: "A phased, prioritized AI adoption roadmap tailored to your business and risk tolerance." },
              { title: "Vendor Evaluation", desc: "Assess AI tools and platforms independently — without the vendor sales pitch." },
            ].map((f) => (
              <StaggeredItem key={f.title}>
                <div className="rounded-2xl border border-slate-200 bg-white p-7 hover:border-blue-200 hover:shadow-sm transition-all duration-300">
                  <h3 className="font-semibold text-[#0a2540] mb-2 text-base">{f.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
              </StaggeredItem>
            ))}
          </StaggeredSection>
        </div>
      </section>

      <SectionAngle from="#ffffff" to="#071e3d" flip={false} height={64} />

      {/* Governance — navy */}
      <section id="governance" className="bg-[#071e3d] py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="mb-12">
            <p className="text-xs font-semibold text-[#06b6d4] uppercase tracking-widest mb-4">Data Governance</p>
            <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">AI Business Readiness &amp; Data Governance</h2>
            <p className="text-white/50 text-lg leading-relaxed max-w-3xl">
              AI is only as good as the data it&apos;s built on. Audcomp&apos;s data governance framework ensures your AI initiatives are compliant, auditable, and built on a trustworthy data foundation.
            </p>
          </AnimatedSection>
          <StaggeredSection className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { title: "Data Quality", desc: "Assess and improve the quality, completeness, and consistency of your organizational data." },
              { title: "Privacy & Compliance", desc: "Ensure AI usage complies with PIPEDA, PHIPA, and applicable AI regulations." },
              { title: "Ethical AI", desc: "Frameworks for responsible, transparent, and auditable AI use in your organization." },
            ].map((f) => (
              <StaggeredItem key={f.title}>
                <div className="bg-white/[0.06] border border-white/[0.1] rounded-2xl p-8 text-center backdrop-blur-sm">
                  <h3 className="font-semibold text-white mb-3 text-base">{f.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{f.desc}</p>
                </div>
              </StaggeredItem>
            ))}
          </StaggeredSection>
        </div>
      </section>

      <CTABanner
        title="Ready to Explore AI for Your Business?"
        subtitle="Contact Audcomp for an AI readiness assessment — we'll identify the best starting point for your organization."
      />
    </>
  );
}
