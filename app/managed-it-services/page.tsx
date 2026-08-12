import type { Metadata } from "next";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import CTABanner from "@/components/CTABanner";
import { SectionAngle } from "@/components/SectionAngle";

export const metadata: Metadata = {
  title: "Managed IT Services | Audcomp — Hamilton & Ancaster",
  description:
    "Reduce downtime and control IT costs with Audcomp's Managed IT Services — 24/7 monitoring, 100% engineers in Canada, and 40+ years serving Ontario businesses.",
};

const subServices = [
  {
    title: "Managed IT Support",
    description: "End-user support, network, infrastructure, core application, data protection, and cyber security — with 24/7 coverage and 100% engineers in Canada.",
    href: "/managed-it-support",
    category: "Managed IT",
  },
  {
    title: "Help Desk",
    description: "Audcomp's Help Desk Support is available 24/7, offering expert assistance through our advanced ticketing system, accessible via email, phone, or on-site support.",
    href: "/help-desk",
    category: "Managed IT",
  },
  {
    title: "Backup & Disaster Recovery",
    description: "A fast, secure, and cost-effective cloud solution offering military-grade data protection with backups up to five times faster than other options.",
    href: "/backup-disaster-recovery",
    category: "Managed IT",
  },
  {
    title: "Device as a Service (DaaS)",
    description: "A subscription-based solution that streamlines your IT costs and improves user experience — scalable as your team grows.",
    href: "/daas",
    category: "Managed IT",
  },
  {
    title: "IT Procurement",
    description: "Tier 1 and Tier 2 manufacturer partnerships, competitive pricing, and our exclusive Try & Buy demo program.",
    href: "/it-procurement",
    category: "Managed IT",
  },
];

export default function ManagedITServicesPage() {
  return (
    <>
      <Hero
        title="Fully Managed IT, 100% Canadian"
        subtitle="Less downtime, predictable monthly costs, and a team free to focus on the business — with 24/7 monitoring from engineers in Canada who have done this since 1986."
        ctaText="Get a Free Assessment"
        ctaHref="/contact"
        secondaryCtaText="Call 905-304-1775"
        secondaryCtaHref="tel:9053041775"
        backgroundImage="/images/managed_it_hero.png"
      />

      <SectionAngle from="#071e3d" to="#ffffff" flip={false} height={64} />

      {/* Overview */}
      <section className="bg-background py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-6">Your IT. Fully Managed. Fully Canadian.</h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            Our Managed IT Services allow you to store your data, secure your network, and optimize your IT, while reducing your costs, maximizing your uptime, and increasing your productivity. Our team of 100% engineers in Canada monitors your environment around the clock, resolving issues before they become outages.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            From end-user support and network management to disaster recovery and hardware procurement, Audcomp provides a complete managed IT program tailored to your size, industry, and budget. We serve SMBs, enterprise organizations, municipalities, universities, healthcare providers, and school boards across Hamilton, Burlington, Oakville, London, Niagara, and beyond.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
            {[
              { value: "24/7", label: "Monitoring & Alerts" },
              { value: "100%", label: "Canadian Engineers" },
              { value: "40+", label: "Years of Experience" },
              { value: "Top 25", label: "CDN Solutions Provider" },
            ].map((s) => (
              <div key={s.label} className="bg-card border border-border rounded-xl p-5 text-center">
                <p className="text-2xl font-bold text-primary">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionAngle from="#ffffff" to="#f0f7ff" flip={true} height={64} />

      {/* Sub-services */}
      <section className="bg-muted py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-4 text-center">Our Managed IT Solutions</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Every Audcomp managed IT client gets a tailored combination of the services below.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {subServices.map((s) => (
              <ServiceCard key={s.href} {...s} />
            ))}
          </div>
        </div>
      </section>

      <SectionAngle from="#f0f7ff" to="#ffffff" flip={false} height={64} />

      {/* Why Managed IT */}
      <section className="bg-background py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Why Choose Managed IT?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Predictable Costs", desc: "Fixed monthly billing replaces unpredictable break-fix expenses." },
              { title: "Faster Response", desc: "24/7 monitoring means issues are caught and fixed before they impact your team." },
              { title: "Better Security", desc: "Proactive patching, monitoring, and threat detection reduce your attack surface." },
              { title: "Scalability", desc: "Your IT scales with your business — up or down — without re-hiring." },
              { title: "Strategic Focus", desc: "Your team focuses on core work; we handle the IT." },
              { title: "Local Expertise", desc: "Engineers who know your environment, your industry, and your community." },
            ].map((item) => (
              <div key={item.title} className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
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
