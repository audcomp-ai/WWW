import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CTABanner from "@/components/CTABanner";
import LogoCloudBlock from "@/components/ui/logo-cloud-3";
import { SectionAngle } from "@/components/SectionAngle";
import { AnimatedSection, StaggeredSection, StaggeredItem } from "@/components/AnimatedSection";

export const metadata: Metadata = {
  title: "Technology Partners | Audcomp",
  description:
    "Audcomp partners directly with leading technology manufacturers to source enterprise-grade IT solutions at the right price for Canadian businesses.",
};

const benefits = [
  {
    title: "Competitive Pricing",
    desc: "Direct manufacturer relationships unlock preferential pricing unavailable through retail channels.",
  },
  {
    title: "Try & Buy Program",
    desc: "Evaluate hardware in your environment before committing — our exclusive demo program reduces procurement risk.",
  },
  {
    title: "Priority Support",
    desc: "Certified partnership status gives Audcomp direct escalation paths to manufacturer engineering teams.",
  },
  {
    title: "Certified Expertise",
    desc: "Our engineers hold certifications across all partner platforms, ensuring solutions are implemented correctly.",
  },
  {
    title: "Lifecycle Management",
    desc: "From procurement through end-of-life, Audcomp manages your hardware and software assets throughout their lifecycle.",
  },
  {
    title: "Broadest Selection",
    desc: "Access to servers, client systems, networking, storage, and peripherals from the industry's leading brands.",
  },
];

export default function PartnersPage() {
  return (
    <>
      <Hero
        title="Our Technology Partners"
        subtitle="We partner with the world's leading technology vendors to deliver proven, enterprise-grade solutions for Canadian businesses."
        ctaText="Talk to Our Procurement Team"
        ctaHref="/contact"
        backgroundImage="/images/professional_services_hero.png"
      />

      {/* Trusted-by marquee — rendered statically (no scroll-reveal wrapper) so
          it is visible immediately rather than gated behind a JS opacity fade. */}
      <LogoCloudBlock />

      {/* Intro — WHITE */}
      <section className="bg-white py-32 px-4">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <p className="text-xs font-semibold text-[#0071e3] uppercase tracking-widest mb-5">Our Partners</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#0a2540] mb-8 tracking-tight leading-tight">
              Enterprise Technology,<br />Canadian Expertise
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-6">
              Audcomp maintains partnerships with Tier 1 and Tier 2 technology manufacturers across hardware, software, networking, security, and cloud. These relationships give our clients access to enterprise pricing, expedited support channels, and the latest solutions as they emerge.
            </p>
            <p className="text-slate-500 text-lg leading-relaxed">
              Our procurement team works directly with manufacturer representatives to ensure you get the right technology at the best value — including access to our exclusive &ldquo;Try and Buy&rdquo; demo program for pre-purchase evaluation.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Benefits — WHITE (no divider: the intro above is also white) */}
      <section className="bg-white pb-24 px-4">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="text-xs font-semibold text-[#06b6d4] uppercase tracking-widest mb-4">Partnership Benefits</p>
            <h2 className="text-4xl font-bold text-[#0a2540] tracking-tight">
              What Our Partnerships Mean for You
            </h2>
          </AnimatedSection>
          <StaggeredSection className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b) => (
              <StaggeredItem key={b.title}>
                <div className="rounded-2xl border border-slate-200 bg-white p-7 hover:border-blue-200 hover:shadow-md transition-all duration-300">
                  <h3 className="font-semibold text-[#0a2540] mb-2 text-base">{b.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{b.desc}</p>
                </div>
              </StaggeredItem>
            ))}
          </StaggeredSection>
        </div>
      </section>

      <SectionAngle from="#ffffff" to="#071e3d" flip={true} height={64} />

      <CTABanner
        title="Looking for the Right Technology?"
        subtitle="Let Audcomp's procurement team recommend and source the best solutions for your budget and requirements."
      />
    </>
  );
}
