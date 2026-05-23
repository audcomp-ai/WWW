import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Security Awareness Training | Audcomp — Phishing Resistance Training",
  description:
    "Audcomp's Security Awareness Training builds phishing-resistant employees through professional-led training, simulated attacks, and continuous education.",
};

export default function SecurityAwarenessTrainingPage() {
  return (
    <>
      <Hero
        title="Security Awareness Training"
        subtitle="Your employees are your last line of defense — and your biggest vulnerability. Audcomp's training program turns them into an asset."
        ctaText="Train Your Team"
        ctaHref="/contact"
        bgColor="dark"
      />

      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-6">The Human Firewall</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Over 90% of successful cyberattacks begin with a phishing email. No amount of technical security controls can fully compensate for an employee who clicks a malicious link or provides credentials to a spoofed website. Security awareness training is the single most effective control against social engineering attacks.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Audcomp's Security Awareness Training program is led by experienced cybersecurity professionals — not a software platform with automated videos. Our training is relevant, engaging, and tailored to the threats your organization actually faces.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            We combine instructor-led sessions with simulated phishing campaigns, micro-learning content, and regular testing to build lasting security habits across your organization.
          </p>
        </div>
      </section>

      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-12 text-center">Program Components</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: "🎓", title: "Instructor-Led Training", desc: "Live training sessions led by Audcomp's cybersecurity professionals — practical, relevant, and engaging." },
              { icon: "🎣", title: "Phishing Simulations", desc: "Simulated phishing campaigns that test employee awareness and identify who needs additional coaching." },
              { icon: "📱", title: "Micro-Learning Modules", desc: "Short, targeted modules on specific threats — delivered regularly to maintain awareness over time." },
              { icon: "📊", title: "Progress Reporting", desc: "Track improvement in click rates, reporting rates, and overall security culture across your organization." },
              { icon: "🎯", title: "Role-Based Training", desc: "Tailored content for executives, finance teams, IT staff, and general employees — focused on their specific risks." },
              { icon: "🔒", title: "Policy & Compliance", desc: "Training aligned to your security policies and regulatory requirements (PIPEDA, HIPAA, etc.)." },
            ].map((f) => (
              <div key={f.title} className="bg-white rounded-xl border border-gray-200 p-6 flex gap-4">
                <div className="text-3xl">{f.icon}</div>
                <div>
                  <h3 className="font-semibold text-[#1a1a2e] mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Build a Security-Aware Culture"
        subtitle="Contact Audcomp to design a security awareness training program for your organization."
      />
    </>
  );
}
