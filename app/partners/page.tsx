import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Technology Partners | Audcomp",
  description:
    "Audcomp partners with the world's leading technology manufacturers to deliver best-in-class IT solutions for Canadian businesses.",
};

const partners = [
  { name: "Microsoft", category: "Cloud & Productivity" },
  { name: "Dell Technologies", category: "Hardware & Infrastructure" },
  { name: "HP", category: "Client Systems & Printing" },
  { name: "Cisco", category: "Networking & Security" },
  { name: "Lenovo", category: "Client Systems" },
  { name: "Fortinet", category: "Cyber Security" },
  { name: "Veeam", category: "Backup & Recovery" },
  { name: "VMware", category: "Virtualization & Cloud" },
];

export default function PartnersPage() {
  return (
    <>
      <Hero
        title="Our Technology Partners"
        subtitle="We partner with the world's leading technology vendors to deliver proven, enterprise-grade solutions for Canadian businesses."
        ctaText="Contact Us"
        ctaHref="/contact"
      />

      {/* Intro */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-6">
            Best-in-Class Technology, Canadian Expertise
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Audcomp maintains partnerships with Tier 1 and Tier 2 technology manufacturers across hardware, software, networking, security, and cloud. These relationships give our clients access to enterprise pricing, expedited support channels, and the latest solutions as they emerge.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            Our procurement team works directly with manufacturer representatives to ensure you get the right technology at the best value — including access to our exclusive "Try and Buy" demo program for pre-purchase evaluation.
          </p>
        </div>
      </section>

      {/* Partner Grid */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-12 text-center">Technology Partners</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {partners.map((p) => (
              <div
                key={p.name}
                className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:border-[#0056a8] hover:shadow-md transition-all"
              >
                <p className="font-semibold text-[#1a1a2e] mb-1">{p.name}</p>
                <p className="text-xs text-gray-500">{p.category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-12 text-center">
            Partnership Benefits for Our Clients
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Competitive Pricing",
                desc: "Direct manufacturer relationships unlock preferential pricing unavailable through retail channels.",
              },
              {
                title: "Try & Buy Program",
                desc: 'Evaluate hardware in your environment before committing — our exclusive "Try and Buy" demo program reduces procurement risk.',
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
            ].map((b) => (
              <div key={b.title} className="bg-[#e8f0fe] rounded-xl p-6">
                <h3 className="font-semibold text-[#1a1a2e] mb-2">{b.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Looking for the Right Technology?"
        subtitle="Let Audcomp's procurement team recommend and source the best solutions for your budget and requirements."
      />
    </>
  );
}
