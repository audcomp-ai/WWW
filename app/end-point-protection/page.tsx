import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";
import CTABanner from "@/components/CTABanner";
import { SectionAngle } from "@/components/SectionAngle";

export const metadata: Metadata = {
  title: "Endpoint Protection | Audcomp Cyber Security Services",
  description:
    "Audcomp Cyber Security Services delivers advanced endpoint threat detection, real-time monitoring, Office Protection, and Email Protection for Canadian businesses.",
};

export default function EndpointProtectionPage() {
  return (
    <>
      <Hero
        title="Stop Threats Before They Spread Across Your Devices"
        subtitle="Audcomp Cyber Security Services contains ransomware and zero-day attacks the moment they hit a device, so one infected laptop never becomes a company-wide outage. Deployed and managed by Audcomp&apos;s Canadian security team."
        ctaText="Get Protected"
        ctaHref="/contact"
        bgColor="dark"
        backgroundImage="/images/cyber_security_hero.png"
      />

      <SectionAngle from="#071e3d" to="#ffffff" flip={false} height={64} />

      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Audcomp Cyber Security Services
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed text-justify hyphens-auto mb-6">
            When ransomware or a zero-day attack lands on a device, the real cost is downtime, locked files, halted operations, and days spent rebuilding. Audcomp Cyber Security Services is Audcomp&apos;s branded endpoint security platform, built to stop that at the source. Using next-generation antivirus and behavioral AI, it detects and contains threats that signature-based antivirus tools miss.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed text-justify hyphens-auto mb-6">
            Every device in your organization, laptops, desktops, servers, is continuously monitored for suspicious behavior. When a threat is detected, the platform contains it automatically and alerts Audcomp&apos;s security team for investigation and remediation, 24/7.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed text-justify hyphens-auto">
            It is deployed and managed by Audcomp&apos;s Canadian security team, so you get enterprise-grade endpoint protection without adding headcount or managing it internally.
          </p>
        </div>
      </section>

      <SectionAngle from="#ffffff" to="#f9fafb" flip={true} height={64} />

      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Cyber Security Services</h2>
          {/* The six services from the Cyber Security menu, with the wording
              copied from their cards on /security-services so the two lists
              cannot drift. Each links to its own page, except this one: you
              are already on it. */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: "Endpoint Protection", desc: "Advanced threat detection, real-time monitoring, Office Protection, and Email Protection under Audcomp Cyber Security Services.", href: "/end-point-protection" },
              { title: "SOC & MDR", desc: "24/7 Security Operations Centre with managed detection and response, incident response, and threat hunting.", href: "/security-operations-centre-and-mdr" },
              { title: "Penetration Testing", desc: "Manual and automated penetration testing with 4 tests per year and 48-hour reporting turnaround.", href: "/penetration-testing-and-security-audits" },
              { title: "Managed Firewall", desc: "24/7 firewall monitoring, maintenance, rule management, and threat intelligence integration.", href: "/managed-firewall" },
              { title: "Security Awareness Training", desc: "Phishing resistance training led by cybersecurity professionals, your last line of defense.", href: "/security-awareness-training" },
              { title: "Dark Web Monitoring", desc: "Proactive dark web threat intelligence to detect stolen credentials before attackers can use them. From $99/mo.", href: "/dark-web-monitoring" },
            ].map((f) => {
              const body = (
                <>
                  <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
                </>
              );
              return f.href === "/end-point-protection" ? (
                <div key={f.title} className="bg-white rounded-xl border border-gray-200 p-6">
                  {body}
                </div>
              ) : (
                <Link
                  key={f.title}
                  href={f.href}
                  className="block bg-white rounded-xl border border-gray-200 p-6 transition-colors hover:border-[#0071e3]"
                >
                  {body}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <SectionAngle from="#f9fafb" to="#071e3d" flip={false} height={64} />

      <CTABanner
        title="Protect Every Endpoint in Your Organization"
        subtitle="Get a free endpoint security assessment from Audcomp and deploy it across your environment, typically active within 24 hours."
      />
    </>
  );
}
