import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CTABanner from "@/components/CTABanner";
import { SectionAngle } from "@/components/SectionAngle";

export const metadata: Metadata = {
  title: "Microsoft Copilot Enablement | Audcomp — Copilot Deployment & Training",
  description:
    "Audcomp delivers Microsoft Copilot readiness assessments, integration, training, and ongoing support to help Canadian businesses unlock AI productivity.",
};

export default function MicrosoftCopilotPage() {
  return (
    <>
      <Hero
        title="Microsoft Copilot Enablement"
        subtitle="Turn Microsoft 365 Copilot into real productivity gains — Audcomp's 100% Canadian engineers handle readiness, secure deployment, and adoption."
        ctaText="Start Your Copilot Journey"
        ctaHref="/contact"
        backgroundImage="/images/ai_services_hero.png"
      />

      <SectionAngle from="#071e3d" to="#ffffff" flip={false} height={64} />

      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-6">Microsoft Copilot, Done Right</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Microsoft Copilot brings AI capabilities directly into the tools your team already uses — Word, Excel, PowerPoint, Teams, Outlook, and more. But unlocking its value requires more than just purchasing a license. Proper configuration, security settings, and user adoption are essential.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Audcomp's Microsoft Copilot Enablement program guides your organization through every stage — from readiness assessment through deployment, training, and ongoing optimization. We ensure Copilot is configured securely, your data is protected, and your team knows how to use it effectively.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            As a Microsoft partner with deep Microsoft 365 and Azure expertise — and a team of 100% Canadian engineers — Audcomp integrates Copilot into your existing environment with minimal disruption and measurable results.
          </p>
        </div>
      </section>

      <SectionAngle from="#ffffff" to="#f9fafb" flip={true} height={64} />

      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-12 text-center">The Audcomp Copilot Journey</h2>
          <div className="flex flex-col gap-6">
            {[
              {
                step: "01",
                title: "Readiness Assessment",
                desc: "Evaluate your Microsoft 365 configuration, data governance posture, and licensing to identify what's needed before Copilot deployment.",
              },
              {
                step: "02",
                title: "Data Governance & Security",
                desc: "Review and configure SharePoint permissions, sensitivity labels, and data loss prevention policies — ensuring Copilot doesn't surface data inappropriately.",
              },
              {
                step: "03",
                title: "Copilot Deployment",
                desc: "License provisioning, tenant configuration, and integration across Word, Excel, PowerPoint, Teams, Outlook, and other Microsoft 365 apps.",
              },
              {
                step: "04",
                title: "End-User Training",
                desc: "Role-specific Copilot training that teaches your team to write effective prompts and integrate Copilot into their daily workflows.",
              },
              {
                step: "05",
                title: "Adoption Monitoring",
                desc: "Track Copilot usage, identify low-adoption areas, and provide additional coaching to maximize ROI from your Copilot investment.",
              },
              {
                step: "06",
                title: "Ongoing Support",
                desc: "As Microsoft continues to update Copilot capabilities, Audcomp keeps you informed and your configuration optimized.",
              },
            ].map((s) => (
              <div key={s.step} className="flex gap-6 items-start bg-white rounded-xl border border-gray-200 p-6">
                <div className="shrink-0 w-12 h-12 rounded-full bg-[#0056a8] flex items-center justify-center text-white font-bold text-sm">
                  {s.step}
                </div>
                <div>
                  <h3 className="font-semibold text-[#1a1a2e] mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionAngle from="#f9fafb" to="#e8f0fe" flip={false} height={64} />

      <section className="bg-[#e8f0fe] py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-[#1a1a2e] mb-8 text-center">What Copilot Can Do for Your Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { app: "Word", desc: "Draft, summarize, and rewrite documents in seconds." },
              { app: "Excel", desc: "Analyze data, generate formulas, and create visualizations." },
              { app: "Outlook", desc: "Summarize email threads and draft responses." },
              { app: "Teams", desc: "Recap meetings, extract action items, and catch up instantly." },
              { app: "PowerPoint", desc: "Generate presentations from documents or prompts." },
              { app: "Microsoft 365", desc: "Find information across all your Microsoft 365 content." },
            ].map((f) => (
              <div key={f.app} className="bg-white rounded-xl p-4 border border-blue-100">
                <p className="font-semibold text-[#0056a8] text-sm mb-2">{f.app}</p>
                <p className="text-xs text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionAngle from="#e8f0fe" to="#071e3d" flip={true} height={64} />

      <CTABanner
        title="Ready to Bring AI into Your Microsoft 365 Environment?"
        subtitle="Contact Audcomp to start with a Copilot readiness assessment — we'll tell you exactly what it takes to get started."
      />
    </>
  );
}
