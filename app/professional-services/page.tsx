import type { Metadata } from "next";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import CTABanner from "@/components/CTABanner";
import { SectionAngle } from "@/components/SectionAngle";

export const metadata: Metadata = {
  title: "Professional Services | Audcomp — IT Strategy & Implementation",
  description:
    "Audcomp's Professional Services include Virtual CIO, IT consulting, implementation, migration, and structured cabling for Canadian businesses.",
};

const subServices = [
  {
    title: "Virtual CIO (vCIO)",
    description: "A strategic IT partner who provides executive-level technology guidance, quarterly reviews, and IT roadmap planning.",
    href: "/virtual-cio",
    category: "Professional",
  },
  {
    title: "IT Consulting & Design",
    description: "Technical assessments, risk identification, architecture design, and training tailored to your business needs.",
    href: "/consulting-design",
    category: "Professional",
  },
  {
    title: "Implementation & Migration",
    description: "Server and storage deployment, WiFi design, data migration, and complex IT project delivery.",
    href: "/implementation-migration",
    category: "Professional",
  },
  {
    title: "Structured Cabling",
    description: "Network infrastructure design and installation — the physical foundation of a reliable, high-performance network.",
    href: "/structured-cabling",
    category: "Professional",
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
        backgroundImage="/images/professional_services_hero.png"
      />

      <SectionAngle from="#071e3d" to="#ffffff" flip={false} height={64} />

      <section className="bg-background py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-6">IT Expertise When You Need It Most</h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            Not every IT challenge fits neatly into a managed services contract. Sometimes you need a strategic advisor to help set your IT direction. Sometimes you need a skilled team to execute a complex migration. Sometimes you need physical infrastructure built right.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            Audcomp's Professional Services practice addresses all of these needs — with senior engineers and consultants who bring nearly four decades of experience to every engagement. Whether it's a discrete project or an ongoing strategic relationship, we deliver with the same professionalism and accountability that defines everything we do.
          </p>
        </div>
      </section>

      <SectionAngle from="#ffffff" to="#f0f7ff" flip={true} height={64} />

      <section className="bg-muted py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-4 text-center">Professional Services</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            From strategy to execution — Audcomp's professional services span the full IT lifecycle.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {subServices.map((s) => (
              <ServiceCard key={s.href} {...s} />
            ))}
          </div>
        </div>
      </section>

      <SectionAngle from="#f0f7ff" to="#ffffff" flip={false} height={64} />

      <section className="bg-background py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Why Audcomp Professional Services?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Senior Expertise", desc: "Our professional services team includes senior architects and consultants with decades of experience." },
              { title: "Proven Methodology", desc: "Structured project delivery with clear milestones, documentation, and accountability." },
              { title: "Integrated Approach", desc: "Professional services connect seamlessly with our managed services for ongoing support post-delivery." },
              { title: "Industry Knowledge", desc: "Deep experience across healthcare, municipalities, manufacturing, and enterprise environments." },
              { title: "Local Delivery", desc: "On-site presence in Hamilton, Ancaster, and across southern Ontario when you need it." },
              { title: "Outcome Focused", desc: "We're measured on results — successful projects delivered on time and on budget." },
            ].map((f) => (
              <div key={f.title} className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionAngle from="#ffffff" to="#071e3d" flip={true} height={64} />

      <CTABanner />
    </>
  );
}
