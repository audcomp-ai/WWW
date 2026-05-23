import type { Metadata } from "next";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Cloud Solutions | Audcomp — Microsoft Cloud Partner in Canada",
  description:
    "Audcomp delivers Microsoft 365, Azure, hybrid cloud, and Teams solutions for Canadian businesses. 100% Canadian data centers.",
};

const subServices = [
  {
    icon: "📧",
    title: "Microsoft Office 365",
    description: "Full deployment, management, and migration to Microsoft 365 — email, Teams, SharePoint, and beyond.",
    href: "/microsoft-office-365",
  },
  {
    icon: "🔷",
    title: "Microsoft Azure",
    description: "Cloud migration, custom configuration, and ongoing Azure infrastructure management for Canadian organizations.",
    href: "/microsoft-azure",
  },
  {
    icon: "☁️",
    title: "Hybrid Cloud",
    description: "Private and public cloud strategy and implementation tailored to your data sovereignty and performance needs.",
    href: "/hybrid-cloud",
  },
  {
    icon: "💾",
    title: "Office 365 Backup",
    description: "Military-grade backup for your Microsoft 365 data with up to 5x faster recovery and flexible retention.",
    href: "/office-365-backup",
  },
  {
    icon: "💬",
    title: "Microsoft Teams",
    description: "Teams deployment, configuration, training, and integration with SharePoint and OneDrive for seamless collaboration.",
    href: "/microsoft-teams",
  },
];

export default function CloudSolutionsPage() {
  return (
    <>
      <Hero
        title="Cloud Solutions"
        subtitle="Enterprise-grade cloud infrastructure for Canadian businesses — deployed, managed, and secured by Audcomp."
        ctaText="Get a Cloud Assessment"
        ctaHref="/contact"
      />

      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-6">Cloud Without Compromise</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Moving to the cloud is one of the most impactful decisions a business can make — but only when done right. Audcomp's cloud team combines deep Microsoft partnership expertise with nearly four decades of infrastructure knowledge to plan, migrate, and manage cloud environments that actually perform.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            Whether you're adopting Microsoft 365 for the first time, migrating workloads to Azure, or architecting a hybrid cloud strategy, Audcomp provides the strategy, execution, and ongoing management you need — with all data remaining in Canadian data centers.
          </p>
        </div>
      </section>

      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-4 text-center">Our Cloud Services</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            From productivity to infrastructure, Audcomp covers the full spectrum of cloud solutions for Canadian businesses.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {subServices.map((s) => (
              <ServiceCard key={s.href} {...s} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-12 text-center">Why Choose Audcomp for Cloud?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: "🎓", title: "Microsoft Certified", desc: "Our engineers hold Microsoft certifications across 365, Azure, Teams, and more." },
              { icon: "🇨🇦", title: "Canadian Data Sovereignty", desc: "All Audcomp-managed cloud data is stored in Canadian data centers — always." },
              { icon: "🔒", title: "Security Integrated", desc: "Every cloud deployment includes security best practices, MFA, and access controls." },
              { icon: "🔄", title: "Seamless Migration", desc: "Zero-downtime migration strategies protect your data and your operations during transition." },
              { icon: "📊", title: "Ongoing Management", desc: "Post-migration, Audcomp monitors and manages your cloud environment continuously." },
              { icon: "💰", title: "Cost Optimization", desc: "We right-size cloud resources and licensing so you only pay for what you need." },
            ].map((f) => (
              <div key={f.title} className="flex gap-4 bg-[#e8f0fe] rounded-xl p-5">
                <div className="text-3xl">{f.icon}</div>
                <div>
                  <h3 className="font-semibold text-[#1a1a2e] mb-1">{f.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
