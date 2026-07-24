import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CTABanner from "@/components/CTABanner";
import PartnerLogo from "@/components/PartnerLogo";
import { SectionAngle } from "@/components/SectionAngle";
import { AnimatedSection, StaggeredSection, StaggeredItem } from "@/components/AnimatedSection";

export const metadata: Metadata = {
  title: "Technology Partners | Audcomp",
  description:
    "Audcomp partners directly with leading technology manufacturers to source enterprise-grade IT solutions at the right price for Canadian businesses.",
};

const partners = [
  { name: "Microsoft", slug: "microsoft", category: "Cloud & Productivity" },
  { name: "Dell Technologies", slug: "dell", category: "Hardware & Infrastructure" },
  { name: "HP", slug: "hp", category: "Client Systems & Printing" },
  { name: "Cisco", slug: "cisco", category: "Networking & Security" },
  { name: "Lenovo", slug: "lenovo", category: "Client Systems" },
  { name: "Fortinet", slug: "fortinet", category: "Cyber Security" },
  { name: "Veeam", slug: "veeam", category: "Backup & Recovery" },
  { name: "VMware", slug: "vmware", category: "Virtualization & Cloud" },
  { name: "Intel", slug: "intel", category: "Processors & Compute" },
  { name: "Scale Computing", domain: "scalecomputing.com", category: "Edge Computing & HCI" },
  { name: "Sophos", domain: "sophos.com", category: "Cyber Security" },
  { name: "Eaton", domain: "eaton.com", category: "Power Management" },
  { name: "Brother", domain: "brother.ca", category: "Printing & Imaging" },
  { name: "WatchGuard", domain: "watchguard.com", category: "Cyber Security" },
  { name: "Arctic Wolf", domain: "arcticwolf.com", category: "Cyber Security" },
];

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

      <SectionAngle from="#ffffff" to="#f0f7ff" flip={true} height={64} />

      {/* Partner Logo Grid — light blue background, white cards */}
      <section className="bg-[#f0f7ff] py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="text-xs font-semibold text-[#0071e3] uppercase tracking-widest mb-4">Technology Partners</p>
            <h2 className="text-4xl font-bold text-[#0a2540] tracking-tight">
              Leading Brands. Proven Platforms.
            </h2>
          </AnimatedSection>

          <StaggeredSection className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {partners.map((p) => (
              <StaggeredItem key={p.name}>
                <PartnerLogo {...p} />
              </StaggeredItem>
            ))}
          </StaggeredSection>
        </div>
      </section>

      <SectionAngle from="#f0f7ff" to="#ffffff" flip={false} height={64} />

      {/* Benefits — WHITE */}
      <section className="bg-white py-24 px-4">
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
