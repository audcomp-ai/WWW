import type { Metadata } from "next";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Cyber Security Services | Audcomp — Canadian Cybersecurity Partner",
  description:
    "Audcomp delivers comprehensive cyber security: endpoint protection, SOC & MDR, penetration testing, dark web monitoring, and security awareness training.",
};

const subServices = [
  {
    icon: "🛡️",
    title: "Endpoint Protection (AGS)",
    description: "Advanced threat detection, real-time monitoring, Office Protection, and Email Protection under Audcomp Guarded Services.",
    href: "/end-point-protection",
  },
  {
    icon: "🔍",
    title: "SOC & MDR",
    description: "24/7 Security Operations Centre with managed detection and response, incident response, and threat hunting.",
    href: "/security-operations-centre-and-mdr",
  },
  {
    icon: "🔓",
    title: "Penetration Testing",
    description: "Manual and automated penetration testing with 4 tests per year and 48-hour reporting turnaround.",
    href: "/penetration-testing-and-security-audits",
  },
  {
    icon: "🔥",
    title: "Managed Firewall",
    description: "24/7 firewall monitoring, maintenance, rule management, and threat intelligence integration.",
    href: "/managed-firewall",
  },
  {
    icon: "🎓",
    title: "Security Awareness Training",
    description: "Phishing resistance training led by cybersecurity professionals — your last line of defense.",
    href: "/security-awareness-training",
  },
  {
    icon: "🌐",
    title: "Dark Web Monitoring",
    description: "Proactive dark web threat intelligence to detect stolen credentials before attackers can use them. From $99/mo.",
    href: "/dark-web-monitoring",
  },
];

export default function SecurityServicesPage() {
  return (
    <>
      <Hero
        title="Cyber Security Services"
        subtitle="Comprehensive, layered cyber security for Canadian businesses — from endpoint to SOC, from awareness to response."
        ctaText="Get a Security Assessment"
        ctaHref="/contact"
        bgColor="dark"
      />

      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-6">Security Is Not Optional</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Cyberattacks on Canadian businesses have increased dramatically over the past five years. Ransomware, business email compromise, and supply chain attacks are no longer rare — they're inevitable for organizations that aren't prepared. The question isn't whether your organization will be targeted; it's whether you'll be ready.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Audcomp's cybersecurity practice builds layered defenses around your organization — from the endpoint to the network perimeter, from user behavior to 24/7 threat monitoring. Our Security Operations Centre (SOC) provides round-the-clock visibility and rapid incident response.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            We have firsthand experience recovering organizations from cyberattacks. We'd rather help you never need that service.
          </p>
        </div>
      </section>

      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-4 text-center">Our Security Services</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            A complete cybersecurity program — built in layers, managed continuously.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {subServices.map((s) => (
              <ServiceCard key={s.href} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* Threat landscape */}
      <section className="bg-[#1a1a2e] py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-12">The Threat Landscape is Real</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { stat: "43%", desc: "of cyberattacks target small and medium-sized businesses" },
              { stat: "$4.5M", desc: "average cost of a data breach in Canada" },
              { stat: "60%", desc: "of SMBs close within 6 months of a major cyberattack" },
            ].map((item) => (
              <div key={item.stat} className="bg-[#0056a8]/20 rounded-xl p-8 border border-[#0056a8]/30">
                <p className="text-4xl font-bold text-white mb-3">{item.stat}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Is Your Organization Prepared?"
        subtitle="Start with a free cybersecurity assessment — Audcomp will identify your gaps and build a plan to close them."
      />
    </>
  );
}
