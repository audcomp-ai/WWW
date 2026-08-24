import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CTABanner from "@/components/CTABanner";
import { SectionAngle } from "@/components/SectionAngle";

export const metadata: Metadata = {
  title: "IT Procurement | Audcomp, Certified Technology Partners",
  description:
    "Audcomp is a certified partner of technology manufacturers. Competitive pricing, Try & Buy demo program, and full lifecycle support.",
};

export default function ITProcurementPage() {
  return (
    <>
      <Hero
        title="IT Procurement"
        subtitle="The right technology at the best value, sourced through certified manufacturer partnerships built over 40 years."
        ctaText="Request a Quote"
        ctaHref="/contact"
        backgroundImage="/images/managed_it_hero.png"
      />

      <SectionAngle from="#071e3d" to="#ffffff" flip={false} height={64} />

      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-6">Strategic Procurement. Trusted Partners.</h2>
          <p className="text-gray-600 text-lg leading-relaxed text-justify hyphens-auto mb-6">
            Pay less, wait less, and reach support that actually answers. Audcomp&apos;s direct partnerships with the world&apos;s leading technology manufacturers, built over 40 years, give clients enterprise pricing, expedited shipping, and manufacturer support channels unavailable through retail purchasing.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed text-justify hyphens-auto">
            Our procurement team works closely with your team to identify the right solutions for your environment, budget, and growth plans. We don't upsell. We recommend what fits.
          </p>
        </div>
      </section>

      <SectionAngle from="#ffffff" to="#f9fafb" flip={true} height={64} />

      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-12 text-center">What We Procure</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Servers & Storage", desc: "Rack-mount, tower, and blade servers from leading manufacturers, plus SAN/NAS storage solutions." },
              { title: "Client Systems", desc: "Desktops, laptops, workstations, and thin clients for every user type and budget." },
              { title: "Networking", desc: "Switches, routers, firewalls, and wireless access points from Cisco, Fortinet, and others." },
              { title: "Peripherals", desc: "Monitors, printers, scanners, docking stations, and accessories." },
              { title: "Mobile Devices", desc: "Smartphones, tablets, and mobile accessories for field and remote teams." },
              { title: "Software Licensing", desc: "Microsoft, Adobe, and hundreds of other titles with volume licensing options." },
            ].map((f) => (
              <div key={f.title} className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-semibold text-[#1a1a2e] mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionAngle from="#f9fafb" to="#e8f0fe" flip={false} height={64} />

      {/* Try & Buy */}
      <section className="bg-[#e8f0fe] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-[#1a1a2e] mb-4">Our &quot;Try and Buy&quot; Demo Program</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Evaluate hardware in your own environment before you commit. Our exclusive Try and Buy program lets you test servers, networking equipment, and workstations with your actual workloads, eliminating guesswork from every procurement decision.
          </p>
        </div>
      </section>

      <SectionAngle from="#e8f0fe" to="#071e3d" flip={true} height={64} />

      <CTABanner
        title="Need to Source Technology for Your Business?"
        subtitle="Contact Audcomp's procurement team for a needs assessment and competitive quote."
      />
    </>
  );
}
