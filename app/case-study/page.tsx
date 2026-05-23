import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Healthcare Cybersecurity Recovery | Audcomp Case Study",
  description:
    "How Audcomp restored a public-sector healthcare organization to full operations within two weeks after a devastating cyberattack in 2024.",
};

const outcomes = [
  { value: "2 weeks", label: "Full operational recovery" },
  { value: "2 days", label: "Critical services restored" },
  { value: "100%", label: "Compliance regained" },
  { value: "10+", label: "Years as their IT partner" },
];

const steps = [
  {
    step: "01",
    title: "Forensic Investigation",
    desc: "Audcomp's incident response team conducted a thorough forensic investigation to identify the attack vector, scope of breach, and affected systems — establishing a clear picture before remediation began.",
  },
  {
    step: "02",
    title: "Immediate Containment",
    desc: "Compromised systems were isolated and access was revoked to prevent lateral movement. Emergency communications protocols were established to maintain clinical operations during recovery.",
  },
  {
    step: "03",
    title: "Security Stack Deployment",
    desc: "Audcomp deployed MDR (Managed Detection & Response), advanced Endpoint Protection, Multi-Factor Authentication (MFA), and managed firewall services across all systems.",
  },
  {
    step: "04",
    title: "Disaster Recovery Activation",
    desc: "Using the client's Audcomp-managed backup infrastructure, critical patient and operational systems were restored from clean backups — bringing core services back within 48 hours.",
  },
  {
    step: "05",
    title: "Cloud Infrastructure Migration",
    desc: "To improve resilience, Audcomp migrated key workloads to a secure Canadian cloud environment with geographic redundancy, eliminating single points of failure.",
  },
  {
    step: "06",
    title: "Compliance & Hardening",
    desc: "Full regulatory compliance was re-established, security policies were updated, staff received targeted security awareness training, and continuous monitoring was put in place.",
  },
];

export default function CaseStudyPage() {
  return (
    <>
      <Hero
        title="Healthcare Cybersecurity Recovery"
        subtitle="How Audcomp restored a Canadian healthcare organization from a devastating cyberattack to full operations in two weeks."
        bgColor="dark"
        ctaText="Talk to Our Security Team"
        ctaHref="/contact"
      />

      {/* Outcomes bar */}
      <section className="bg-[#0056a8] py-10">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {outcomes.map((o) => (
            <div key={o.label}>
              <p className="text-3xl font-bold text-white">{o.value}</p>
              <p className="text-sm text-blue-200 mt-1">{o.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Background */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
              Cyber Incident Response
            </span>
            <span className="bg-[#e8f0fe] text-[#0056a8] text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
              Healthcare — Public Sector
            </span>
          </div>
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-6">Background</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            In 2024, a public-sector healthcare organization that had partnered with Audcomp for over a decade suffered a sophisticated cyberattack. The attack crippled internal operations, blocked access to critical patient systems, and threatened to paralyze the organization indefinitely.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            With patient care at risk and regulatory obligations looming, the organization turned to Audcomp for immediate incident response. What followed was a rapid, methodical recovery that became a model for cyber resilience in Canadian healthcare.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            Because Audcomp had been the organization's primary IT provider for over a decade, our engineers had deep familiarity with the environment — which proved critical in compressing the recovery timeline from weeks to days.
          </p>
        </div>
      </section>

      {/* Response Steps */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-12 text-center">
            The Audcomp Response
          </h2>
          <div className="flex flex-col gap-6">
            {steps.map((s) => (
              <div key={s.step} className="flex gap-6 items-start bg-white rounded-xl border border-gray-200 p-6">
                <div className="shrink-0 w-12 h-12 rounded-full bg-[#0056a8] flex items-center justify-center text-white font-bold text-sm">
                  {s.step}
                </div>
                <div>
                  <h3 className="font-semibold text-[#1a1a2e] mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="bg-[#e8f0fe] py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-6">Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            {[
              "100% operational recovery achieved within two weeks of the initial incident",
              "Critical patient-facing services restored within two business days",
              "Full regulatory compliance regained post-incident",
              "New security architecture eliminates previous attack vectors",
              "24/7 SOC monitoring now provides continuous threat detection",
              "Staff trained and tested with regular phishing simulations",
            ].map((r) => (
              <div key={r} className="flex gap-3 items-start">
                <span className="text-[#0056a8] text-xl mt-0.5">✓</span>
                <p className="text-gray-700 text-sm leading-relaxed">{r}</p>
              </div>
            ))}
          </div>
          <blockquote className="bg-white rounded-xl border border-blue-100 p-8 shadow-sm">
            <p className="text-4xl text-[#0056a8] leading-none mb-4">&ldquo;</p>
            <p className="text-gray-700 italic text-lg leading-relaxed mb-4">
              Having Audcomp as our IT partner for over a decade made all the difference. They knew our environment, they moved fast, and they got us back. We&apos;re more secure today than we were before the attack.
            </p>
            <p className="font-semibold text-[#1a1a2e]">Healthcare IT Director</p>
            <p className="text-sm text-gray-500">Public Sector Organization, Ontario</p>
          </blockquote>
        </div>
      </section>

      <CTABanner
        title="Is Your Organization Prepared for a Cyberattack?"
        subtitle="Don't wait for an incident. Audcomp's security team can assess your current posture and build a resilient defense."
      />
    </>
  );
}
