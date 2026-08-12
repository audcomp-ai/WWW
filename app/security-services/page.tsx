import type { Metadata } from "next";
import AnimatedSecurityHero from "@/components/AnimatedSecurityHero";
import ServiceCard from "@/components/ServiceCard";
import CTABanner from "@/components/CTABanner";
import { SectionAngle } from "@/components/SectionAngle";

export const metadata: Metadata = {
  title: "Cyber Security Services | Audcomp, Canadian Cybersecurity Partner",
  description:
    "Audcomp delivers comprehensive cyber security: endpoint protection, SOC & MDR, penetration testing, dark web monitoring, and security awareness training.",
};

const subServices = [
  {
    title: "Endpoint Protection (AGS)",
    description: "Advanced threat detection, real-time monitoring, Office Protection, and Email Protection under Audcomp Guarded Services.",
    href: "/end-point-protection",
    category: "Security",
  },
  {
    title: "SOC & MDR",
    description: "24/7 Security Operations Centre with managed detection and response, incident response, and threat hunting.",
    href: "/security-operations-centre-and-mdr",
    category: "Security",
  },
  {
    title: "Penetration Testing",
    description: "Manual and automated penetration testing with 4 tests per year and 48-hour reporting turnaround.",
    href: "/penetration-testing-and-security-audits",
    category: "Security",
  },
  {
    title: "Managed Firewall",
    description: "24/7 firewall monitoring, maintenance, rule management, and threat intelligence integration.",
    href: "/managed-firewall",
    category: "Security",
  },
  {
    title: "Security Awareness Training",
    description: "Phishing resistance training led by cybersecurity professionals, your last line of defense.",
    href: "/security-awareness-training",
    category: "Security",
  },
  {
    title: "Dark Web Monitoring",
    description: "Proactive dark web threat intelligence to detect stolen credentials before attackers can use them. From $99/mo.",
    href: "/dark-web-monitoring",
    category: "Security",
  },
];

export default function SecurityServicesPage() {
  return (
    <>
      <AnimatedSecurityHero />

      <SectionAngle from="#071e3d" to="#ffffff" flip={false} height={64} />

      <section className="bg-background py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-6">Security Is Not Optional</h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            Cyberattacks on Canadian businesses have increased dramatically over the past five years. Ransomware, business email compromise, and supply chain attacks are no longer rare, they're inevitable for organizations that aren't prepared. The question isn't whether your organization will be targeted; it's whether you'll be ready.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            Audcomp's cybersecurity practice builds layered defenses around your organization, from the endpoint to the network perimeter, from user behavior to 24/7 threat monitoring. Our Security Operations Centre (SOC) provides round-the-clock visibility and rapid incident response.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed">
            We have firsthand experience recovering organizations from cyberattacks, when a public-sector healthcare provider was hit in 2024, Audcomp restored critical services within two business days and had them fully operational within two weeks. We&apos;d rather help you never need that service.
          </p>
        </div>
      </section>

      <SectionAngle from="#ffffff" to="#f0f7ff" flip={true} height={64} />

      <section className="bg-muted py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-4 text-center">Our Security Services</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            A complete cybersecurity program, built in layers, managed continuously.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {subServices.map((s) => (
              <ServiceCard key={s.href} {...s} />
            ))}
          </div>
        </div>
      </section>

      <SectionAngle from="#f0f7ff" to="#181E2C" flip={false} height={64} />

      {/* Threat landscape */}
      <section className="bg-[#181E2C] py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-12">The Threat Landscape is Real</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { stat: "43%", desc: "of cyberattacks target small and medium-sized businesses" },
              { stat: "$4.5M", desc: "average cost of a data breach in Canada" },
              { stat: "60%", desc: "of SMBs close within 6 months of a major cyberattack" },
            ].map((item) => (
              <div key={item.stat} className="bg-primary/20 rounded-xl p-8 border border-primary/30">
                <p className="text-4xl font-bold text-white mb-3">{item.stat}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionAngle from="#181E2C" to="#071e3d" flip={true} height={64} />

      <CTABanner
        title="Is Your Organization Prepared?"
        subtitle="Start with a free cybersecurity assessment, Audcomp will identify your gaps and build a plan to close them."
      />
    </>
  );
}
