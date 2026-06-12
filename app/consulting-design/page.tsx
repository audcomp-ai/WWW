import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CTABanner from "@/components/CTABanner";
import { SectionAngle } from "@/components/SectionAngle";

export const metadata: Metadata = {
  title: "IT Consulting & Design | Audcomp — Technical Assessments & Architecture",
  description:
    "Audcomp's IT Consulting and Design team conducts technical assessments, identifies risk, designs solutions, and delivers training for Canadian businesses.",
};

export default function ConsultingDesignPage() {
  return (
    <>
      <Hero
        title="IT Consulting & Design"
        subtitle="Expert assessments, solution architecture, and risk management — Audcomp's consulting team helps you make confident IT decisions."
        ctaText="Schedule a Consultation"
        ctaHref="/contact"
        backgroundImage="/images/professional_services_hero.png"
      />

      <SectionAngle from="#071e3d" to="#ffffff" flip={false} height={64} />

      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-6">Clarity Before Commitment</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Technology decisions made without proper assessment often lead to costly mistakes — wrong platforms, misaligned architectures, and security gaps that take years to remediate. Audcomp's IT Consulting and Design service provides the clarity you need before you commit budget and resources.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Our consultants conduct comprehensive technical assessments of your existing environment, identify risks and inefficiencies, and design solutions that align with your business objectives, budget, and growth trajectory.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            Whether you're planning a network refresh, evaluating a cloud migration, or simply trying to understand the state of your IT environment, Audcomp's consulting team delivers the answers you need.
          </p>
        </div>
      </section>

      <SectionAngle from="#ffffff" to="#f9fafb" flip={true} height={64} />

      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-12 text-center">Consulting & Design Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Technical Assessment", desc: "Comprehensive review of your current IT environment — infrastructure, security, processes, and costs." },
              { title: "Risk Identification", desc: "Identify technical, security, and operational risks before they become incidents." },
              { title: "Solution Architecture", desc: "Custom technology architectures designed for your specific requirements and constraints." },
              { title: "IT Roadmap Development", desc: "A prioritized, budgeted IT roadmap that aligns technology investment with business goals." },
              { title: "Technical Training", desc: "Staff training on new technologies, processes, and best practices." },
              { title: "Vendor Assessment", desc: "Evaluate vendor proposals and technology options independently — without the sales bias." },
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
        title="Get an Expert Assessment of Your IT Environment"
        subtitle="Contact Audcomp to schedule a technical assessment — know where you stand before your next investment."
      />
    </>
  );
}
