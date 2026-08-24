import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CTABanner from "@/components/CTABanner";
import { SectionAngle } from "@/components/SectionAngle";

export const metadata: Metadata = {
  title: "Endpoint Protection (AGS) | Audcomp Guarded Services",
  description:
    "Audcomp Guarded Services (AGS) delivers advanced endpoint threat detection, real-time monitoring, Office Protection, and Email Protection for Canadian businesses.",
};

export default function EndpointProtectionPage() {
  return (
    <>
      <Hero
        title="Stop Threats Before They Spread Across Your Devices"
        subtitle="AGS, Audcomp Guarded Services, contains ransomware and zero-day attacks the moment they hit a device, so one infected laptop never becomes a company-wide outage. Deployed and managed by Audcomp&apos;s Canadian security team."
        ctaText="Get Protected"
        ctaHref="/contact"
        bgColor="dark"
        backgroundImage="/images/cyber_security_hero.png"
      />

      <SectionAngle from="#071e3d" to="#ffffff" flip={false} height={64} />

      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-6">
            Audcomp Guarded Services (AGS)
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed text-justify hyphens-auto mb-6">
            When ransomware or a zero-day attack lands on a device, the real cost is downtime, locked files, halted operations, and days spent rebuilding. AGS, Audcomp Guarded Services, is Audcomp&apos;s branded endpoint security platform, built to stop that at the source. Using next-generation antivirus and behavioral AI, it detects and contains threats that signature-based antivirus tools miss.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed text-justify hyphens-auto mb-6">
            Every device in your organization, laptops, desktops, servers, is continuously monitored for suspicious behavior. When a threat is detected, AGS contains it automatically and alerts Audcomp&apos;s security team for investigation and remediation, 24/7.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed text-justify hyphens-auto">
            AGS is deployed and managed by Audcomp&apos;s Canadian security team, so you get enterprise-grade endpoint protection without adding headcount or managing it internally.
          </p>
        </div>
      </section>

      <SectionAngle from="#ffffff" to="#f9fafb" flip={true} height={64} />

      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-12 text-center">AGS Protection Layers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: "Endpoint Threat Detection", desc: "Next-generation AV with behavioral AI detects fileless malware, ransomware, and zero-day threats in real time." },
              { title: "Real-Time Monitoring", desc: "Continuous endpoint visibility with automated alerting and escalation to Audcomp's security team." },
              { title: "Email Protection", desc: "Advanced email filtering, phishing detection, link scanning, and attachment sandboxing integrated with Microsoft 365." },
              { title: "Office Protection", desc: "Macro and script execution controls, document sandboxing, and exploit prevention for Microsoft Office." },
              { title: "Automated Response", desc: "Threats are contained automatically, isolating infected endpoints to prevent lateral movement." },
              { title: "Security Reporting", desc: "Regular security reports and dashboards keep you informed on your organization's threat exposure." },
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
        title="Protect Every Endpoint in Your Organization"
        subtitle="Get a free endpoint security assessment from Audcomp and deploy AGS across your environment, typically active within 24 hours."
      />
    </>
  );
}
