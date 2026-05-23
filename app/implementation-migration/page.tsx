import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Implementation & Migration | Audcomp — Server, Cloud & Data Migration",
  description:
    "Audcomp delivers server and storage deployment, WiFi design, data migration, and complex IT project implementation for Canadian businesses.",
};

export default function ImplementationMigrationPage() {
  return (
    <>
      <Hero
        title="Implementation & Migration"
        subtitle="Complex IT projects, delivered on time and on budget — Audcomp's implementation team has the experience to execute without disruption."
        ctaText="Plan Your Project"
        ctaHref="/contact"
      />

      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-6">Execution You Can Rely On</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            The gap between a great technology plan and a successful deployment is execution. Audcomp's implementation team has delivered hundreds of complex IT projects for organizations across healthcare, government, manufacturing, and enterprise — with a track record of on-time, on-budget delivery.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            From server and storage deployments to cloud migrations, WiFi redesigns, and full data center transformations, Audcomp brings structured project management, deep technical expertise, and a commitment to minimizing disruption to your operations.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            Every project includes detailed planning, risk assessment, testing protocols, and post-implementation support — ensuring your new environment is stable before Audcomp steps back.
          </p>
        </div>
      </section>

      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-12 text-center">Implementation Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: "🖥️", title: "Server & Storage Deployment", desc: "Physical and virtual server deployment, storage area network configuration, and hypervisor setup." },
              { icon: "☁️", title: "Cloud Migration", desc: "Phased cloud migrations to Azure, Microsoft 365, or hybrid environments — with zero data loss." },
              { icon: "📡", title: "WiFi Design & Deployment", desc: "Enterprise wireless network design, site surveys, access point deployment, and optimization." },
              { icon: "💾", title: "Data Migration", desc: "Structured data migration between platforms — from on-premise to cloud, or system to system." },
              { icon: "🔄", title: "System Refresh", desc: "Hardware refresh projects replacing aging infrastructure with minimal disruption to operations." },
              { icon: "🏢", title: "Office Relocations", desc: "Complete IT infrastructure planning and execution for office moves and new site buildouts." },
            ].map((f) => (
              <div key={f.title} className="bg-white rounded-xl border border-gray-200 p-6 flex gap-4">
                <div className="text-3xl">{f.icon}</div>
                <div>
                  <h3 className="font-semibold text-[#1a1a2e] mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Have a Project in Mind?"
        subtitle="Contact Audcomp's project team for a scoping conversation — we'll turn your goals into a clear delivery plan."
      />
    </>
  );
}
