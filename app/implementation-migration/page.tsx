import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CTABanner from "@/components/CTABanner";
import { SectionAngle } from "@/components/SectionAngle";

export const metadata: Metadata = {
  title: "Implementation & Migration | Audcomp, Server, Cloud & Data Migration",
  description:
    "Audcomp delivers server and storage deployment, WiFi design, data migration, and complex IT project implementation for Canadian businesses.",
};

export default function ImplementationMigrationPage() {
  return (
    <>
      <Hero
        title="Implementation & Migration"
        subtitle="Complex IT projects delivered on time, on budget, and without downtime, executed by Audcomp's Canadian technicians."
        ctaText="Plan Your Project"
        ctaHref="/contact"
        backgroundImage="/images/professional_services_hero.png"
      />

      <SectionAngle from="#071e3d" to="#ffffff" flip={false} height={64} />

      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-6">Execution You Can Rely On</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            The gap between a great technology plan and a successful deployment is execution, and that&apos;s where most projects stall. Audcomp&apos;s implementation team has delivered complex IT projects across healthcare, government, manufacturing, and enterprise, with a track record of on-time, on-budget delivery and minimal disruption to operations.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            From server and storage deployments to cloud migrations, WiFi redesigns, and full data center transformations, Audcomp brings structured project management, deep technical expertise, and a commitment to minimizing disruption to your operations.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            Every project includes detailed planning, risk assessment, testing protocols, and post-implementation support, ensuring your new environment is stable before Audcomp steps back.
          </p>
        </div>
      </section>

      <SectionAngle from="#ffffff" to="#f9fafb" flip={true} height={64} />

      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-12 text-center">Implementation Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: "Server & Storage Deployment", desc: "Physical and virtual server deployment, storage area network configuration, and hypervisor setup." },
              { title: "Cloud Migration", desc: "Phased cloud migrations to Azure, Microsoft 365, or hybrid environments, with zero data loss." },
              { title: "WiFi Design & Deployment", desc: "Enterprise wireless network design, site surveys, access point deployment, and optimization." },
              { title: "Data Migration", desc: "Structured data migration between platforms, from on-premise to cloud, or system to system." },
              { title: "System Refresh", desc: "Hardware refresh projects replacing aging infrastructure with minimal disruption to operations." },
              { title: "Office Relocations", desc: "Complete IT infrastructure planning and execution for office moves and new site buildouts." },
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
        title="Have a Project in Mind?"
        subtitle="Contact Audcomp's project team for a scoping conversation, we'll turn your goals into a clear delivery plan."
      />
    </>
  );
}
