import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CTABanner from "@/components/CTABanner";
import { SectionAngle } from "@/components/SectionAngle";

export const metadata: Metadata = {
  title: "Microsoft Azure | Audcomp — Azure Cloud Migration & Management",
  description:
    "Audcomp delivers Azure cloud setup, custom configuration, and migration for Canadian businesses. 100% Canadian data sovereignty.",
};

export default function MicrosoftAzurePage() {
  return (
    <>
      <Hero
        title="Microsoft Azure"
        subtitle="Migrate to Azure with confidence — Audcomp's certified engineers plan, deploy, and manage your Azure infrastructure end to end."
        ctaText="Get an Azure Assessment"
        ctaHref="/contact"
        backgroundImage="/images/cloud_solutions_hero.png"
      />

      <SectionAngle from="#071e3d" to="#ffffff" flip={false} height={64} />

      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-6">Enterprise Cloud, Canadian Values</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Microsoft Azure gives Canadian businesses enterprise-grade cloud infrastructure — virtual machines, databases, networking, security, and more — on demand and at scale. Audcomp helps you navigate Azure's breadth of services to build exactly the environment your business needs.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            From initial cloud readiness assessments through architecture design, migration, and ongoing management, Audcomp is your Azure partner at every step. We configure Canadian Azure regions to ensure your data stays in Canada.
          </p>
        </div>
      </section>

      <SectionAngle from="#ffffff" to="#f9fafb" flip={true} height={64} />

      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-12 text-center">Azure Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Cloud Readiness Assessment", desc: "Evaluate your current workloads and infrastructure to plan the optimal Azure migration path." },
              { title: "Architecture Design", desc: "Custom Azure architecture tailored to your performance, security, and compliance requirements." },
              { title: "Server & Workload Migration", desc: "Lift-and-shift or modernize workloads to Azure with minimal disruption to operations." },
              { title: "Azure Security Configuration", desc: "Identity management, network security, Azure Defender, and compliance controls." },
              { title: "Azure Monitor & Management", desc: "Continuous monitoring, cost optimization, and performance tuning of your Azure environment." },
              { title: "Azure Backup & DR", desc: "Azure Site Recovery and backup services for business continuity across your cloud workloads." },
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
        title="Ready to Move to Azure?"
        subtitle="Start with a free Azure readiness assessment from Audcomp's certified cloud engineers."
      />
    </>
  );
}
