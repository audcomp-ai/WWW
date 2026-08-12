import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CTABanner from "@/components/CTABanner";
import { SectionAngle } from "@/components/SectionAngle";

export const metadata: Metadata = {
  title: "Managed Firewall | Audcomp — 24/7 Firewall Monitoring & Maintenance",
  description:
    "Audcomp's Managed Firewall service provides 24/7 monitoring, maintenance, rule management, and threat intelligence for your network perimeter.",
};

export default function ManagedFirewallPage() {
  return (
    <>
      <Hero
        title="A Firewall That Keeps Blocking Threats Long After Install Day"
        subtitle="An unpatched or misconfigured firewall is an open door. Audcomp&apos;s 100% engineers in Canada monitor, patch, and tune your network perimeter 24/7 — so it keeps doing its job as threats evolve."
        ctaText="Secure Your Perimeter"
        ctaHref="/contact"
        bgColor="dark"
        backgroundImage="/images/cyber_security_hero.png"
      />

      <SectionAngle from="#071e3d" to="#ffffff" flip={false} height={64} />

      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-6">Your Firewall Needs More Than Configuration</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            A firewall that was configured three years ago and hasn't been reviewed since is not a security control — it's a false sense of security. Firewall rules accumulate, threat landscapes evolve, and firmware vulnerabilities emerge. Active management is essential.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Audcomp's Managed Firewall service takes complete ownership of your network perimeter security. Our engineers monitor your firewall continuously, respond to alerts, update rules, apply firmware patches, and integrate real-time threat intelligence to keep your perimeter defenses current.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            We work with leading firewall platforms including Fortinet FortiGate, Cisco, SonicWall, and others — keeping your protection strong and current regardless of your existing investment.
          </p>
        </div>
      </section>

      <SectionAngle from="#ffffff" to="#f9fafb" flip={true} height={64} />

      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-12 text-center">Managed Firewall Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "24/7 Monitoring", desc: "Continuous monitoring of firewall logs, alerts, and traffic anomalies with immediate escalation." },
              { title: "Rule Management", desc: "Regular review and cleanup of firewall rules to ensure they remain appropriate and effective." },
              { title: "Firmware & Patch Management", desc: "Timely application of firmware updates and security patches to address known vulnerabilities." },
              { title: "Threat Intelligence Integration", desc: "Real-time threat feeds keep your firewall rules updated against emerging threat actors and IPs." },
              { title: "Traffic Analysis", desc: "Analysis of network traffic patterns to identify anomalies and potential threats." },
              { title: "Monthly Reporting", desc: "Regular reports on firewall activity, blocked threats, and rule changes." },
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
        title="Don't Let Your Firewall Go Unmanaged"
        subtitle="Contact Audcomp to take over management of your network perimeter security."
      />
    </>
  );
}
