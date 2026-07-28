import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CTABanner from "@/components/CTABanner";
import PartnerLogo from "@/components/PartnerLogo";
import { LogoCloud } from "@/components/ui/logo-cloud";
import { SectionAngle } from "@/components/SectionAngle";
import { AnimatedSection, StaggeredSection, StaggeredItem } from "@/components/AnimatedSection";

// Same slugs/colors as the PartnerLogo grid below, rendered as flat marks via
// simpleicons — keeps the two logo treatments on this page visually consistent.
// Microsoft isn't in simple-icons (like PartnerLogo.tsx, it needs its own inline SVG).
const MICROSOFT_LOGO =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%234a6785'%3E%3Cpath d='M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z'/%3E%3C/svg%3E";

// Field Effect and Eaton aren't in simple-icons — like the domain-only entries
// in the PartnerLogo grid below, they resolve through the favicon service.
const featuredLogos = [
  { src: MICROSOFT_LOGO, alt: "Microsoft" },
  { src: "https://cdn.simpleicons.org/dell/4a6785", alt: "Dell Technologies" },
  { src: "https://cdn.simpleicons.org/cisco/4a6785", alt: "Cisco" },
  { src: "https://cdn.simpleicons.org/fortinet/4a6785", alt: "Fortinet" },
  { src: "https://cdn.simpleicons.org/lenovo/4a6785", alt: "Lenovo" },
  { src: "https://cdn.simpleicons.org/vmware/4a6785", alt: "VMware" },
  { src: "https://cdn.simpleicons.org/veeam/4a6785", alt: "Veeam" },
  { src: "https://cdn.simpleicons.org/intel/4a6785", alt: "Intel" },
  { src: "https://cdn.simpleicons.org/hp/4a6785", alt: "HP" },
  { src: "https://s2.googleusercontent.com/s2/favicons?domain=sophos.com&sz=128", alt: "Sophos" },
  { src: "https://s2.googleusercontent.com/s2/favicons?domain=fieldeffect.net&sz=128", alt: "Field Effect" },
  { src: "https://s2.googleusercontent.com/s2/favicons?domain=eaton.com&sz=128", alt: "Eaton" },
];

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

      {/* Trusted-by strip — rendered statically (no scroll-reveal wrapper) so it
          is visible immediately rather than gated behind a JS opacity animation. */}
      <section className="bg-white pt-20 pb-8 px-4">
        <div className="mx-auto w-full max-w-3xl space-y-8">
          <h2 className="text-center font-medium text-lg tracking-tight md:font-semibold md:text-2xl">
            <span className="text-muted-foreground">Your business runs on</span>{" "}
            <span className="text-primary">proven technology.</span>
          </h2>
          {/* 12 logos across the component's 4 columns = 3 full rows, no empty cells */}
          <LogoCloud logos={featuredLogos} />
        </div>
      </section>

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
