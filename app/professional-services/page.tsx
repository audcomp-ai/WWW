import type { Metadata } from "next";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Professional Services | Audcomp — IT Strategy & Implementation",
  description:
    "Audcomp's Professional Services include Virtual CIO, IT consulting, implementation, migration, and structured cabling for Canadian businesses.",
};

const subServices = [
  {
    icon: "👔",
    title: "Virtual CIO (vCIO)",
    description: "A strategic IT partner who provides executive-level technology guidance, quarterly reviews, and IT roadmap planning.",
    href: "/virtual-cio",
  },
  {
    icon: "📐",
    title: "IT Consulting & Design",
    description: "Technical assessments, risk identification, architecture design, and training tailored to your business needs.",
    href: "/consulting-design",
  },
  {
    icon: "🚀",
    title: "Implementation & Migration",
    description: "Server and storage deployment, WiFi design, data migration, and complex IT project delivery.",
    href: "/implementation-migration",
  },
  {
    icon: "🔌",
    title: "Structured Cabling",
    description: "Network infrastructure design and installation — the physical foundation of a reliable, high-performance network.",
    href: "/structured-cabling",
  },
];

export default function ProfessionalServicesPage() {
  return (
    <>
      <Hero
        title="Professional Services"
        subtitle="Strategic IT guidance, expert implementation, and physical infrastructure — Audcomp's professional services team delivers results that last."
        ctaText="Discuss Your Project"
        ctaHref="/contact"
      />

      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-6">IT Expertise When You Need It Most</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Not every IT challenge fits neatly into a managed services contract. Sometimes you need a strategic advisor to help set your IT direction. Sometimes you need a skilled team to execute a complex migration. Sometimes you need physical infrastructure built right.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Audcomp's Professional Services practice addresses all of these needs — with senior engineers and consultants who bring nearly four decades of experience to every engagement. Whether it's a discrete project or an ongoing strategic relationship, we deliver with the same professionalism and accountability that defines everything we do.
          </p>
        </div>
      </section>

      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-4 text-center">Professional Services</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            From strategy to execution — Audcomp's professional services span the full IT lifecycle.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {subServices.map((s) => (
              <ServiceCard key={s.href} {...s} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-12 text-center">Why Audcomp Professional Services?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🎓", title: "Senior Expertise", desc: "Our professional services team includes senior architects and consultants with decades of experience." },
              { icon: "📊", title: "Proven Methodology", desc: "Structured project delivery with clear milestones, documentation, and accountability." },
              { icon: "🔗", title: "Integrated Approach", desc: "Professional services connect seamlessly with our managed services for ongoing support post-delivery." },
              { icon: "🏭", title: "Industry Knowledge", desc: "Deep experience across healthcare, municipalities, manufacturing, and enterprise environments." },
              { icon: "🇨🇦", title: "Local Delivery", desc: "On-site presence in Hamilton, Ancaster, and across southern Ontario when you need it." },
              { icon: "✅", title: "Outcome Focused", desc: "We're measured on results — successful projects delivered on time and on budget." },
            ].map((f) => (
              <div key={f.title} className="bg-[#e8f0fe] rounded-xl p-6">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-[#1a1a2e] mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
