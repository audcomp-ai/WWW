import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CTABanner from "@/components/CTABanner";
import { SectionAngle } from "@/components/SectionAngle";

export const metadata: Metadata = {
  title: "SOC & MDR | Audcomp Security Operations Centre",
  description:
    "Audcomp's 24/7 Security Operations Centre (SOC) provides managed detection and response, threat hunting, and incident response for Canadian organizations.",
};

export default function SOCMDRPage() {
  return (
    <>
      <Hero
        title="Threats Detected and Shut Down, 24/7"
        subtitle="When an attack hits at 3 a.m., Audcomp&apos;s Security Operations Centre is already watching, detecting, investigating, and containing threats before they disrupt your business. Backed by Audcomp&apos;s Canadian security team."
        ctaText="Talk to Our Security Team"
        ctaHref="/contact"
        bgColor="dark"
        backgroundImage="/images/cyber_security_hero.png"
      />

      <SectionAngle from="#071e3d" to="#ffffff" flip={false} height={64} />

      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-6">
            A Full Security Team, Without the Overhead
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Building and staffing an internal Security Operations Centre requires specialized talent, expensive tooling, and 24/7 coverage, resources most Canadian organizations simply don't have. Audcomp's SOC gives you all of that on a managed basis.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Our Managed Detection and Response (MDR) service continuously monitors your environment for threats, across endpoints, networks, cloud, and email. When a threat is detected, our analysts investigate, contain, and remediate, around the clock, every day of the year.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            This isn&apos;t theory. In 2024, Audcomp recovered a public-sector healthcare organization from an active cyberattack, restoring critical services within two business days and returning it to full operation within two weeks. That real-world incident response experience informs how we monitor, what we look for, and how fast we act.
          </p>
        </div>
      </section>

      <SectionAngle from="#ffffff" to="#f9fafb" flip={true} height={64} />

      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-12 text-center">SOC & MDR Capabilities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "24/7 Threat Monitoring", desc: "Continuous visibility across your endpoints, network, and cloud environment, day and night." },
              { title: "Threat Hunting", desc: "Proactive search for hidden threats that evade automated detection, conducted by experienced analysts." },
              { title: "Incident Response", desc: "Rapid containment and remediation when a threat is confirmed, with documented playbooks and forensic analysis." },
              { title: "SIEM & Log Management", desc: "Centralized log collection and correlation across all systems for comprehensive security visibility." },
              { title: "Alert Triage & Analysis", desc: "Every alert is reviewed by a human analyst, eliminating false positive fatigue for your team." },
              { title: "Security Reporting", desc: "Monthly SOC reports with threat summaries, KPIs, and remediation recommendations." },
            ].map((f) => (
              <div key={f.title} className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-semibold text-[#1a1a2e] mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionAngle from="#f9fafb" to="#071e3d" flip={false} height={64} />

      <CTABanner
        title="Get 24/7 Security Coverage for Your Organization"
        subtitle="Book a security assessment with Audcomp&apos;s team to see how our SOC & MDR service keeps your business running through an attack."
      />
    </>
  );
}
