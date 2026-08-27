import type { Metadata } from "next";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import CTABanner from "@/components/CTABanner";
import { SectionAngle } from "@/components/SectionAngle";

export const metadata: Metadata = {
  title: "Professional Services | Audcomp, IT Strategy & Implementation",
  description:
    "Audcomp's Professional Services include Virtual CIO, IT consulting, implementation, migration, and structured cabling for Canadian businesses.",
};

const subServices = [
  {
    title: "Virtual CIO (vCIO)",
    description: "Your strategic IT partner, expert guidance and tailored IT strategies to optimize technology investments, enhance cybersecurity, and stay competitive.",
    href: "/virtual-cio",
    category: "IT Leadership",
  },
  {
    title: "IT Consulting & Design",
    description: "Specialized insights and customized strategies to optimize your investments in technology and strengthen your cybersecurity.",
    href: "/consulting-design",
    category: "Architecture",
  },
  {
    title: "Implementation & Migration",
    description: "Your bridge to an efficient IT transformation, handling the complex process of implementing and migrating your IT systems with minimal disruption.",
    href: "/implementation-migration",
    category: "Delivery",
  },
  {
    title: "Structured Cabling",
    description: "The backbone of your network infrastructure, we design and implement structured cabling systems that support your evolving technology needs.",
    href: "/structured-cabling",
    category: "Network",
  },
];

export default function ProfessionalServicesPage() {
  return (
    <>
      <Hero
        title="Professional Services"
        subtitle="Strategic IT guidance, expert implementation, and physical infrastructure, Audcomp's professional services team delivers results that last."
        ctaText="Discuss Your Project"
        ctaHref="/contact"
        backgroundImage="/images/professional_services_hero.png"
      />

      <SectionAngle from="#071e3d" to="#ffffff" flip={false} height={64} />

      <section className="bg-background py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-6">Consider Audcomp an Extension of Your Team</h2>
          <p className="text-muted-foreground text-lg leading-relaxed text-justify hyphens-auto mb-6">
            With nearly 40 years of experience supporting Canadian businesses, Audcomp provides access to a team of skilled IT professionals without the cost of building and maintaining an in-house department. We work alongside your team to understand your challenges, then design, implement, and support technology solutions that align with your business goals and budget.
          </p>
        </div>
      </section>

      <SectionAngle from="#ffffff" to="#f0f7ff" flip={true} height={64} />

      <section className="bg-muted py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-4 text-center">Professional Services</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            From strategy to execution, Audcomp's professional services span the full IT lifecycle.
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
              { title: "Experienced Team", desc: "Our professional services team includes architects and consultants with years of hands-on experience." },
              { title: "Proven Methodology", desc: "Structured project delivery with clear milestones, documentation, and accountability." },
              { title: "Integrated Approach", desc: "Professional services connect directly with our managed services for ongoing support post-delivery." },
              { title: "Industry Knowledge", desc: "Proven experience across municipalities, manufacturing, and enterprise environments." },
              { title: "Service Delivery", desc: "On-site presence in Hamilton, Ancaster, and southern Ontario, with service delivery across Canada." },
              { title: "Outcome Focused", desc: "We're measured on results, successful projects delivered on time and on budget." },
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
