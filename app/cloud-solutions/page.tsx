import type { Metadata } from "next";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import CTABanner from "@/components/CTABanner";
import { SectionAngle } from "@/components/SectionAngle";

export const metadata: Metadata = {
  title: "Cloud Solutions | Audcomp — Microsoft Cloud Partner in Canada",
  description:
    "Audcomp delivers Microsoft 365, Azure, hybrid cloud, and Teams solutions for Canadian businesses. 100% Canadian data centers.",
};

const subServices = [
  {
    title: "Microsoft Office 365",
    description: "Full deployment, management, and migration to Microsoft 365 — email, Teams, SharePoint, and beyond.",
    href: "/microsoft-office-365",
    category: "Cloud",
  },
  {
    title: "Microsoft Azure",
    description: "Cloud migration, custom configuration, and ongoing Azure infrastructure management for Canadian organizations.",
    href: "/microsoft-azure",
    category: "Cloud",
  },
  {
    title: "Hybrid Cloud",
    description: "Private and public cloud strategy and implementation tailored to your data sovereignty and performance needs.",
    href: "/hybrid-cloud",
    category: "Cloud",
  },
  {
    title: "Office 365 Backup",
    description: "Military-grade backup for your Microsoft 365 data with up to 5x faster recovery and flexible retention.",
    href: "/office-365-backup",
    category: "Cloud",
  },
  {
    title: "Microsoft Teams",
    description: "Teams deployment, configuration, training, and integration with SharePoint and OneDrive for seamless collaboration.",
    href: "/microsoft-teams",
    category: "Cloud",
  },
];

export default function CloudSolutionsPage() {
  return (
    <>
      <Hero
        title="Cloud Solutions"
        subtitle="Empower your business with scalable, secure, and modern cloud infrastructure. Move faster and work from anywhere."
        ctaText="Explore Cloud Options"
        ctaHref="/contact"
        secondaryCtaText="Call 905-304-1775"
        secondaryCtaHref="tel:9053041775"
        backgroundImage="/images/cloud_solutions_hero.png"
      />

      <SectionAngle from="#071e3d" to="#ffffff" flip={false} height={64} />

      <section className="bg-background py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-6">Cloud Without Compromise</h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            Moving to the cloud is one of the most impactful decisions a business can make — but only when done right. Audcomp's cloud team combines deep Microsoft partnership expertise with nearly four decades of infrastructure knowledge to plan, migrate, and manage cloud environments that actually perform.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Whether you're adopting Microsoft 365 for the first time, migrating workloads to Azure, or architecting a hybrid cloud strategy, Audcomp provides the strategy, execution, and ongoing management you need — with all data remaining in Canadian data centers.
          </p>
        </div>
      </section>

      <SectionAngle from="#ffffff" to="#f0f7ff" flip={true} height={64} />

      <section className="bg-muted py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-4 text-center">Our Cloud Services</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            From productivity to infrastructure, Audcomp covers the full spectrum of cloud solutions for Canadian businesses.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {subServices.map((s) => (
              <ServiceCard key={s.href} {...s} />
            ))}
          </div>
        </div>
      </section>

      <SectionAngle from="#f0f7ff" to="#ffffff" flip={false} height={64} />

      <section className="bg-background py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Why Choose Audcomp for Cloud?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: "Microsoft Certified", desc: "Our engineers hold Microsoft certifications across 365, Azure, Teams, and more." },
              { title: "Canadian Data Sovereignty", desc: "All Audcomp-managed cloud data is stored in Canadian data centers — always." },
              { title: "Security Integrated", desc: "Every cloud deployment includes security best practices, MFA, and access controls." },
              { title: "Seamless Migration", desc: "Zero-downtime migration strategies protect your data and your operations during transition." },
              { title: "Ongoing Management", desc: "Post-migration, Audcomp monitors and manages your cloud environment continuously." },
              { title: "Cost Optimization", desc: "We right-size cloud resources and licensing so you only pay for what you need." },
            ].map((f) => (
              <div key={f.title} className="bg-card border border-border rounded-xl p-5">
                <h3 className="font-semibold text-foreground mb-1">{f.title}</h3>
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
