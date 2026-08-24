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
    category: "Prevention",
  },
  {
    title: "SOC & MDR",
    description: "24/7 Security Operations Centre with managed detection and response, incident response, and threat hunting.",
    href: "/security-operations-centre-and-mdr",
    category: "Monitoring",
  },
  {
    title: "Penetration Testing",
    description: "Manual and automated penetration testing with 4 tests per year and 48-hour reporting turnaround.",
    href: "/penetration-testing-and-security-audits",
    category: "Validation",
  },
  {
    title: "Managed Firewall",
    description: "24/7 firewall monitoring, maintenance, rule management, and threat intelligence integration.",
    href: "/managed-firewall",
    category: "Perimeter",
  },
  {
    title: "Security Awareness Training",
    description: "Phishing resistance training led by cybersecurity professionals, your last line of defense.",
    href: "/security-awareness-training",
    category: "Human Risk",
  },
  {
    title: "Dark Web Monitoring",
    description: "Proactive dark web threat intelligence to detect stolen credentials before attackers can use them. From $99/mo.",
    href: "/dark-web-monitoring",
    category: "Threat Intelligence",
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
            Cyberattacks on Canadian businesses have increased dramatically over the past five years. Ransomware, business email compromise, and supply chain attacks are no longer rare. They&apos;re inevitable for organizations that aren&apos;t prepared. The question isn't whether your organization will be targeted; it's whether you'll be ready.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            Audcomp's cybersecurity practice builds layered defenses around your organization, from the endpoint to the network perimeter, from user behavior to 24/7 threat monitoring. Our SOC &amp; MDR team provides round-the-clock visibility and rapid incident response.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed">
            We have expertise in cybersecurity recovery, restoring critical services and getting organizations fully operational under pressure. We&apos;d rather help you never need that service.
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
              // Every figure here is quoted from a named annual report, with the citation
              // shown on the page. Refresh when the new editions land — DBIR each April,
              // IBM each July — and replace the number rather than letting it age.
              // DBIR 2025 SMB Snapshot p6 and p13 (Fig 6, n=645); its SMB cut is <1,000 employees.
              {
                stat: "88%",
                desc: "of breaches at organizations under 1,000 employees involve ransomware, versus 39% at large ones",
              },
              // IBM/Ponemon 2026, Canada cut. Reported in CAD, so labelled as such.
              {
                stat: "CA$7.11M",
                desc: "average cost of a data breach in Canada, the highest since the study began",
              },
              // IBM/Ponemon 2026, Canada cut. Breach lifecycle = time to identify plus contain.
              {
                stat: "205 days",
                desc: "average time for a Canadian organization to identify and contain a breach",
              },
            ].map((item) => (
              <div key={item.stat} className="bg-primary/20 rounded-xl p-8 border border-primary/30">
                <p className="text-4xl font-bold text-white mb-3">{item.stat}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-500 text-xs mt-8 leading-relaxed">
            Sources:{" "}
            <a
              href="https://www.verizon.com/business/resources/reports/dbir/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-[#06b6d4] transition-colors"
            >
              Verizon 2025 Data Breach Investigations Report, SMB Snapshot
            </a>
            {"; "}
            <a
              href="https://www.ibm.com/reports/data-breach"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-[#06b6d4] transition-colors"
            >
              IBM Cost of a Data Breach Report 2026
            </a>
            , Canada, research by Ponemon Institute.
          </p>
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
