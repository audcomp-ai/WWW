import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Penetration Testing Service | Audcomp",
  description:
    "Audcomp's dedicated penetration testing service provides manual and automated security testing with 4 tests per year and 48-hour reporting turnaround.",
};

export default function PenetrationTestingServicePage() {
  return (
    <>
      <Hero
        title="Penetration Testing Service"
        subtitle="Our dedicated pen testing program delivers up to 4 comprehensive security tests per year with 48-hour report turnaround."
        ctaText="Book Your First Test"
        ctaHref="/contact"
        bgColor="dark"
        backgroundImage="/images/cyber_security_hero.png"
      />

      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-6">Continuous Security Validation</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            A single annual penetration test doesn't reflect the reality of today's threat landscape — your environment changes constantly, and so do attacker techniques. Audcomp's penetration testing service provides continuous security validation with up to 4 tests per year, ensuring your defenses remain effective as your environment evolves.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Our SaaS-based testing platform combines automated scanning with manual exploitation techniques, delivering depth that automated tools alone cannot achieve. Every test is led by a certified penetration tester who understands both the technical and business context of your environment.
          </p>
        </div>
      </section>

      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-12 text-center">Program Highlights</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { value: "4/yr", label: "Tests per Year" },
              { value: "48hr", label: "Report Turnaround" },
              { value: "Manual+", label: "Automated Testing" },
              { value: "100%", label: "Canadian Security Team" },
            ].map((s) => (
              <div key={s.label} className="bg-[#0056a8] text-white rounded-xl p-6 text-center">
                <p className="text-3xl font-bold">{s.value}</p>
                <p className="text-sm text-blue-200 mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: "Manual Exploitation", desc: "Certified testers attempt real-world exploitation beyond what automated scanners detect." },
              { title: "Automated Scanning", desc: "Comprehensive vulnerability scanning across your entire attack surface." },
              { title: "Executive & Technical Reports", desc: "Dual-layer reporting for leadership and technical teams — both complete within 48 hours." },
              { title: "Remediation Validation", desc: "Re-test critical findings after remediation to confirm vulnerabilities are closed." },
            ].map((f) => (
              <div key={f.title} className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-semibold text-[#1a1a2e] mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Start Your Penetration Testing Program"
        subtitle="Contact Audcomp's security team to scope your first engagement and get a proposal."
      />
    </>
  );
}
