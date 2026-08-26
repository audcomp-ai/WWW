import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CTABanner from "@/components/CTABanner";
import { SectionAngle } from "@/components/SectionAngle";

export const metadata: Metadata = {
  title: "Hybrid Cloud Solutions | Audcomp, Private & Public Cloud Strategy",
  description:
    "Audcomp designs and implements hybrid cloud strategies that balance on-premise control with cloud flexibility for Canadian businesses.",
};

export default function HybridCloudPage() {
  return (
    <>
      <Hero
        title="Hybrid Cloud Solutions"
        subtitle="Keep regulated workloads on-premise and scale everything else in the cloud, one integrated environment, managed by Audcomp's cloud architects."
        ctaText="Plan Your Hybrid Cloud"
        ctaHref="/contact"
        backgroundImage="/images/cloud_solutions_hero.png"
      />

      <SectionAngle from="#071e3d" to="#ffffff" flip={false} height={64} />

      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-6">Not Everything Belongs in the Cloud</h2>
          <p className="text-gray-600 text-lg leading-relaxed text-justify hyphens-auto mb-6">
            For many Canadian organizations, particularly those in regulated industries like healthcare, finance, and government, a full cloud migration isn't the right answer. Hybrid cloud gives you the flexibility to run sensitive workloads on-premise while leveraging cloud for scalability, backup, and productivity tools.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed text-justify hyphens-auto mb-6">
            Audcomp's hybrid cloud architects work with your team to evaluate each workload, understand your compliance requirements, and build a strategy that makes sense, technically and financially.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed text-justify hyphens-auto">
            The result is a unified environment where on-premise and cloud systems work together, managed by Audcomp as a single, coherent infrastructure.
          </p>
        </div>
      </section>

      <SectionAngle from="#ffffff" to="#f9fafb" flip={true} height={64} />

      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Hybrid Cloud Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: "Hybrid Cloud Strategy", desc: "Workload assessment and strategy design to determine what stays on-premise and what moves to the cloud." },
              { title: "Connectivity & Integration", desc: "VPN, ExpressRoute, and Azure Arc configurations that unify your environments." },
              { title: "Unified Security", desc: "Consistent identity management, access control, and security policies across on-premise and cloud." },
              { title: "Centralized Management", desc: "A single pane of glass for monitoring, managing, and reporting across your entire hybrid environment." },
              { title: "Workload Migration", desc: "Phased, low-risk workload migration strategies that minimize disruption." },
              { title: "Cost Management", desc: "Optimize cloud spend and on-premise investment to achieve the best total cost of ownership." },
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
        title="Not Sure Where to Start with Cloud?"
        subtitle="Audcomp's hybrid cloud assessment identifies the right path for your organization, on-premise, cloud, or somewhere in between."
      />
    </>
  );
}
