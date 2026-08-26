import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CTABanner from "@/components/CTABanner";
import { SectionAngle } from "@/components/SectionAngle";

export const metadata: Metadata = {
  title: "Managed IT Support | Audcomp, 24/7 Technicians in Canada",
  description:
    "Audcomp's Managed IT Support provides end-user support, network management, and infrastructure monitoring with technicians in Canada and 24/7 coverage.",
};

const features = [
  { title: "End-User Support", desc: "Responsive support for every member of your team, from password resets to complex workstation issues." },
  { title: "Network Management", desc: "Proactive monitoring, configuration, and maintenance of your entire network infrastructure." },
  { title: "Infrastructure Management", desc: "Server, storage, and virtualization management to keep your core systems running optimally." },
  { title: "24/7 Monitoring", desc: "Round-the-clock monitoring with automated alerting ensures issues are caught before they cause downtime." },
  { title: "Patch Management", desc: "Automated patch deployment keeps your systems current, secure, and compliant." },
  { title: "Reporting & Reviews", desc: "Regular reporting and strategic reviews keep you informed and ahead of your IT roadmap." },
];

export default function ManagedITSupportPage() {
  return (
    <>
      <Hero
        title="IT Support That Prevents Problems, Not Just Fixes Them"
        subtitle="End-user support, network management, and 24/7 monitoring, delivered by technicians in Canada who know your environment."
        ctaText="Get Started"
        ctaHref="/contact"
        backgroundImage="/images/managed_it_hero.png"
      />

      <SectionAngle from="#071e3d" to="#ffffff" flip={false} height={64} />

      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-6">IT Support That Never Sleeps</h2>
          <p className="text-gray-600 text-lg leading-relaxed text-justify hyphens-auto mb-6">
            Audcomp's Managed IT Support program provides the full spectrum of day-to-day IT management your business needs. Our technicians become an extension of your team, deeply familiar with your environment, your users, and your business goals.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed text-justify hyphens-auto mb-6">
            Unlike break-fix providers that only show up once something is already broken, Audcomp works ahead of problems. We monitor your infrastructure continuously, resolve potential issues before they escalate, and keep your systems patched and optimized.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed text-justify hyphens-auto">
            Every Audcomp technician is based in Canada. Your data, your support calls, and your account management never leave Canadian hands.
          </p>
        </div>
      </section>

      <SectionAngle from="#ffffff" to="#f9fafb" flip={true} height={64} />

      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">What's Included</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionAngle from="#f9fafb" to="#071e3d" flip={false} height={64} />

      <CTABanner />
    </>
  );
}
