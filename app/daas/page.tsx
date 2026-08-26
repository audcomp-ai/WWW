import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CTABanner from "@/components/CTABanner";
import { SectionAngle } from "@/components/SectionAngle";

export const metadata: Metadata = {
  title: "Device as a Service (DaaS) | Audcomp, Subscription Hardware Management",
  description:
    "Audcomp's Device as a Service (DaaS) provides fully managed hardware and software on a per-user subscription model. Scalable, predictable, and hassle-free.",
};

export default function DaaSPage() {
  return (
    <>
      <Hero
        title="Device as a Service (DaaS)"
        subtitle="Predictable per-user pricing and fully managed devices, so you can add or offboard staff in minutes instead of managing hardware yourself."
        ctaText="Get a DaaS Quote"
        ctaHref="/contact"
        backgroundImage="/images/managed_it_hero.png"
      />

      <SectionAngle from="#071e3d" to="#ffffff" flip={false} height={64} />

      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-6">Eliminate Hardware Complexity</h2>
          <p className="text-gray-600 text-lg leading-relaxed text-justify hyphens-auto mb-6">
            Device as a Service (DaaS) from Audcomp replaces the traditional hardware procurement and management model with a simple, scalable subscription. Instead of capital expenditure on hardware followed by years of internal management, DaaS puts Audcomp in charge of the full device lifecycle on your behalf.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed text-justify hyphens-auto mb-6">
            Every device arrives configured, secured, and ready to deploy. When a team member leaves, their device is recovered, wiped, and redeployed. When a device fails, it's replaced, with minimal disruption and no surprise costs.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed text-justify hyphens-auto">
            DaaS works for organizations of all sizes. Whether you're onboarding five new employees or standing up a new office, Audcomp's DaaS program scales with you.
          </p>
        </div>
      </section>

      <SectionAngle from="#ffffff" to="#f9fafb" flip={true} height={64} />

      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">What DaaS Includes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Hardware Procurement", desc: "We source and procure the right devices for each role at competitive manufacturer pricing." },
              { title: "Configuration & Imaging", desc: "Every device arrives pre-configured with your software, policies, and security settings." },
              { title: "Security Management", desc: "Endpoint protection, encryption, and MDM enrollment included on every device." },
              { title: "Lifecycle Management", desc: "Refresh cycles, trade-ins, and end-of-life disposal handled entirely by Audcomp." },
              { title: "Break-Fix Support", desc: "Hardware failures are addressed rapidly, with loaner devices available to minimize disruption." },
              { title: "Asset Tracking & Reporting", desc: "Complete visibility into your device fleet with real-time asset inventory and reporting." },
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
        title="Ready to Simplify Your Device Management?"
        subtitle="Talk to Audcomp about a DaaS subscription tailored to your team size and requirements."
      />
    </>
  );
}
