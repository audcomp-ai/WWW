import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Managed Firewall | Audcomp — 24/7 Firewall Monitoring & Maintenance",
  description:
    "Audcomp's Managed Firewall service provides 24/7 monitoring, maintenance, rule management, and threat intelligence for your network perimeter.",
};

export default function ManagedFirewallPage() {
  return (
    <>
      <Hero
        title="Managed Firewall"
        subtitle="Your network perimeter, continuously monitored and maintained by Audcomp's security engineers — 24/7."
        ctaText="Secure Your Perimeter"
        ctaHref="/contact"
        bgColor="dark"
      />

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
            We work with leading firewall platforms including Fortinet FortiGate, Cisco, SonicWall, and others — ensuring best-in-class protection regardless of your existing investment.
          </p>
        </div>
      </section>

      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-12 text-center">Managed Firewall Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "👁️", title: "24/7 Monitoring", desc: "Continuous monitoring of firewall logs, alerts, and traffic anomalies with immediate escalation." },
              { icon: "📋", title: "Rule Management", desc: "Regular review and cleanup of firewall rules to ensure they remain appropriate and effective." },
              { icon: "🔄", title: "Firmware & Patch Management", desc: "Timely application of firmware updates and security patches to address known vulnerabilities." },
              { icon: "🌐", title: "Threat Intelligence Integration", desc: "Real-time threat feeds keep your firewall rules updated against emerging threat actors and IPs." },
              { icon: "🔍", title: "Traffic Analysis", desc: "Analysis of network traffic patterns to identify anomalies and potential threats." },
              { icon: "📊", title: "Monthly Reporting", desc: "Regular reports on firewall activity, blocked threats, and rule changes." },
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
        title="Don't Let Your Firewall Go Unmanaged"
        subtitle="Contact Audcomp to take over management of your network perimeter security."
      />
    </>
  );
}
