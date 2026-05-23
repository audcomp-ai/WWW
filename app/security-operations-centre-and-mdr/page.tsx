import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "SOC & MDR | Audcomp Security Operations Centre",
  description:
    "Audcomp's 24/7 Security Operations Centre (SOC) provides managed detection and response, threat hunting, and incident response for Canadian organizations.",
};

export default function SOCMDRPage() {
  return (
    <>
      <Hero
        title="Security Operations Centre & MDR"
        subtitle="24/7 threat monitoring, hunting, and response — Audcomp's SOC is your always-on defense team."
        ctaText="Talk to Our Security Team"
        ctaHref="/contact"
        bgColor="dark"
      />

      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-6">
            A Full Security Team, Without the Overhead
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Building and staffing an internal Security Operations Centre requires specialized talent, expensive tooling, and 24/7 coverage — resources most Canadian organizations simply don't have. Audcomp's SOC gives you all of that on a managed basis.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Our Managed Detection and Response (MDR) service continuously monitors your environment for threats — across endpoints, networks, cloud, and email. When a threat is detected, our analysts investigate, contain, and remediate — around the clock, every day of the year.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            Audcomp's SOC has firsthand experience recovering organizations from active cyberattacks. That real-world incident response experience informs how we monitor, what we look for, and how fast we act.
          </p>
        </div>
      </section>

      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-12 text-center">SOC & MDR Capabilities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "👁️", title: "24/7 Threat Monitoring", desc: "Continuous visibility across your endpoints, network, and cloud environment — day and night." },
              { icon: "🔍", title: "Threat Hunting", desc: "Proactive search for hidden threats that evade automated detection — conducted by experienced analysts." },
              { icon: "⚡", title: "Incident Response", desc: "Rapid containment and remediation when a threat is confirmed — with documented playbooks and forensic analysis." },
              { icon: "📊", title: "SIEM & Log Management", desc: "Centralized log collection and correlation across all systems for comprehensive security visibility." },
              { icon: "🚨", title: "Alert Triage & Analysis", desc: "Every alert is reviewed by a human analyst — eliminating false positive fatigue for your team." },
              { icon: "📋", title: "Security Reporting", desc: "Monthly SOC reports with threat summaries, KPIs, and remediation recommendations." },
            ].map((f) => (
              <div key={f.title} className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-[#1a1a2e] mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Get 24/7 Security Coverage for Your Organization"
        subtitle="Contact Audcomp's security team to discuss how our SOC & MDR service can protect your business."
      />
    </>
  );
}
