import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CTABanner from "@/components/CTABanner";
import Link from "next/link";
import { SectionAngle } from "@/components/SectionAngle";

export const metadata: Metadata = {
  title: "Penetration Testing & Security Audits | Audcomp",
  description:
    "Audcomp conducts manual and automated penetration testing with 4 tests per year and 48-hour reporting. Find your vulnerabilities before attackers do.",
};

export default function PenetrationTestingPage() {
  return (
    <>
      <Hero
        title="Penetration Testing & Security Audits"
        subtitle="Find your vulnerabilities before attackers do, Audcomp's pen testing service delivers thorough, actionable results in 48 hours."
        ctaText="Schedule a Pen Test"
        ctaHref="/contact"
        bgColor="dark"
        backgroundImage="/images/cyber_security_hero.png"
      />

      <SectionAngle from="#071e3d" to="#ffffff" flip={false} height={64} />

      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-6">Test Your Defenses Before Attackers Do</h2>
          <p className="text-gray-600 text-lg leading-relaxed text-justify hyphens-auto mb-6">
            The vulnerabilities that cause breaches are the ones no one knew were there. Penetration testing simulates real-world cyberattacks against your environment to surface those weaknesses before an attacker does, turning unknown risk into a prioritized fix list. Unlike vulnerability scans that only flag known issues, Audcomp&apos;s penetration testing combines automated tooling with manual testing by experienced security professionals.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed text-justify hyphens-auto mb-6">
            Our pen testing program includes up to 4 tests per year, ensuring your security posture is validated continuously as your environment evolves. Every test delivers a detailed report within 48 hours, including executive summary, technical findings, risk ratings, and remediation guidance.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed text-justify hyphens-auto">
            Audcomp also offers comprehensive security audits that evaluate your policies, procedures, and technical controls against industry frameworks like NIST, CIS, and SOC 2.
          </p>
          <div className="mt-6">
            <Link href="/penetration-testing-service" className="inline-flex items-center gap-2 text-[#0056a8] font-semibold hover:underline">
              View our dedicated Penetration Testing Service
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <SectionAngle from="#ffffff" to="#f9fafb" flip={true} height={64} />

      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Testing Scope & Approach</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: "External Network Testing", desc: "Simulated attacks against your internet-facing infrastructure, web apps, email, VPN, and exposed services." },
              { title: "Internal Network Testing", desc: "Insider threat simulation and lateral movement testing within your network perimeter." },
              { title: "Web Application Testing", desc: "OWASP Top 10 and beyond, comprehensive testing of your web applications and APIs." },
              { title: "Phishing Simulations", desc: "Targeted phishing campaigns to test your employees' security awareness and response." },
              { title: "Cloud Configuration Review", desc: "Microsoft Azure and M365 configuration audits to identify common cloud security misconfigurations." },
              { title: "48-Hour Reporting", desc: "Every engagement concludes with a detailed report including executive summary and prioritized remediations." },
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
        title="Know Where You Stand Before an Attacker Does"
        subtitle="Schedule a penetration test with Audcomp's security team and get results in 48 hours."
      />
    </>
  );
}
