import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CTABanner from "@/components/CTABanner";
import { SectionAngle } from "@/components/SectionAngle";

export const metadata: Metadata = {
  title: "Virtual CIO (vCIO) | Audcomp — Strategic IT Leadership for Canadian Businesses",
  description:
    "Audcomp's Virtual CIO service provides executive-level IT strategy, quarterly business reviews, IT roadmap planning, and technology governance.",
};

export default function VirtualCIOPage() {
  return (
    <>
      <Hero
        title="Virtual CIO (vCIO)"
        subtitle="Get executive-level IT strategy and a documented technology roadmap — without the cost of a full-time C-suite hire. Delivered by Audcomp's 100% Canadian engineers."
        ctaText="Meet Your vCIO"
        ctaHref="/contact"
        backgroundImage="/images/professional_services_hero.png"
      />

      <SectionAngle from="#071e3d" to="#ffffff" flip={false} height={64} />

      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-6">Strategic IT Partnership</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Stop guessing on technology spend. A Virtual CIO keeps every IT investment aligned to your business goals — so you avoid costly missteps and always have a clear roadmap for growth. Most SMBs and mid-market organizations can&apos;t justify a full-time CIO, but they still need that strategic guidance. Audcomp&apos;s Virtual CIO service fills the gap.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Your Audcomp vCIO becomes a trusted member of your leadership team — attending quarterly or semi-annual business reviews, understanding your goals, and translating them into an IT strategy and roadmap that supports growth, resilience, and efficiency.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            Unlike a standard account manager, your vCIO has genuine technical depth and business acumen. They bridge the gap between your business leadership and your IT environment — ensuring technology investments deliver real value.
          </p>
        </div>
      </section>

      <SectionAngle from="#ffffff" to="#f9fafb" flip={true} height={64} />

      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-12 text-center">What Your vCIO Does</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: "IT Roadmap Planning", desc: "A documented, prioritized IT roadmap aligned to your business goals — reviewed and updated regularly." },
              { title: "Quarterly Business Reviews", desc: "Regular strategic reviews to assess performance, plan for growth, and align IT with business direction." },
              { title: "Budget Planning", desc: "Forecast technology spend accurately and prioritize investments that deliver measurable ROI." },
              { title: "Security Governance", desc: "Ensure your security posture meets regulatory requirements and protects the organization from liability." },
              { title: "Vendor Management", desc: "Evaluate and manage technology vendor relationships on your behalf — cutting through sales noise." },
              { title: "Technology Evaluation", desc: "Assess emerging technologies and their applicability to your business — before your competitors do." },
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
        title="Ready for Executive-Level IT Strategy?"
        subtitle="Book a vCIO strategy session and put your technology spend to work against your business goals."
      />
    </>
  );
}
