import type { Metadata } from "next";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Managed IT Services | Audcomp — Hamilton & Ancaster",
  description:
    "Audcomp's Managed IT Services deliver proactive support, 24/7 monitoring, and 100% Canadian engineers to keep your business running at peak performance.",
};

const subServices = [
  {
    icon: "🖥️",
    title: "Managed IT Support",
    description: "End-user support, network management, and infrastructure monitoring with 24/7 coverage and 100% Canadian engineers.",
    href: "/managed-it-support",
  },
  {
    icon: "🎧",
    title: "Help Desk",
    description: "24/7 technical support via phone, email, and on-site. Hardware/software issues, malware removal, and more.",
    href: "/help-desk",
  },
  {
    icon: "💾",
    title: "Backup & Disaster Recovery",
    description: "Military-grade cloud backup with up to 5x faster recovery and up to 7-year retention. Never lose critical data.",
    href: "/backup-disaster-recovery",
  },
  {
    icon: "📱",
    title: "Device as a Service (DaaS)",
    description: "A subscription per-user model for fully managed hardware and software — scalable as your team grows.",
    href: "/daas",
  },
  {
    icon: "🛒",
    title: "IT Procurement",
    description: "Tier 1 and Tier 2 manufacturer partnerships, competitive pricing, and our exclusive Try & Buy demo program.",
    href: "/it-procurement",
  },
];

export default function ManagedITServicesPage() {
  return (
    <>
      <Hero
        title="Managed IT Services"
        subtitle="Proactive, comprehensive IT management so your team can focus on what matters most — growing your business."
        ctaText="Get a Free Assessment"
        ctaHref="/contact"
        secondaryCtaText="Call 905-304-1775"
        secondaryCtaHref="tel:9053041775"
      />

      {/* Overview */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-6">Your IT. Fully Managed. Fully Canadian.</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Audcomp's Managed IT Services are built for businesses that need reliable, proactive IT support without the overhead of a full internal IT department. Our team of 100% Canadian engineers monitors your environment around the clock, resolving issues before they become outages.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            From end-user support and network management to disaster recovery and hardware procurement, Audcomp provides a complete managed IT program tailored to your size, industry, and budget. We serve SMBs, enterprise organizations, municipalities, universities, healthcare providers, and school boards across the Hamilton and Ancaster region.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
            {[
              { value: "24/7", label: "Monitoring & Alerts" },
              { value: "100%", label: "Canadian Engineers" },
              { value: "39+", label: "Years of Experience" },
              { value: "Top 25", label: "CDN Solutions Provider" },
            ].map((s) => (
              <div key={s.label} className="bg-[#e8f0fe] rounded-xl p-5 text-center">
                <p className="text-2xl font-bold text-[#0056a8]">{s.value}</p>
                <p className="text-xs text-gray-600 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sub-services */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-4 text-center">Our Managed IT Solutions</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Every Audcomp managed IT client gets a tailored combination of the services below.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {subServices.map((s) => (
              <ServiceCard key={s.href} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Managed IT */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-12 text-center">Why Choose Managed IT?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: "💰", title: "Predictable Costs", desc: "Fixed monthly billing replaces unpredictable break-fix expenses." },
              { icon: "⚡", title: "Faster Response", desc: "24/7 monitoring means issues are caught and fixed before they impact your team." },
              { icon: "🔒", title: "Better Security", desc: "Proactive patching, monitoring, and threat detection reduce your attack surface." },
              { icon: "📈", title: "Scalability", desc: "Your IT scales with your business — up or down — without re-hiring." },
              { icon: "🎯", title: "Strategic Focus", desc: "Your team focuses on core work; we handle the IT." },
              { icon: "🇨🇦", title: "Local Expertise", desc: "Engineers who know your environment, your industry, and your community." },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="text-3xl">{item.icon}</div>
                <div>
                  <h3 className="font-semibold text-[#1a1a2e] mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
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
