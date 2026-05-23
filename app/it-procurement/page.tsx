import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "IT Procurement | Audcomp — Tier 1 & Tier 2 Technology Partners",
  description:
    "Audcomp sources hardware and software from Tier 1 and Tier 2 manufacturers. Competitive pricing, Try & Buy demo program, and full lifecycle support.",
};

export default function ITProcurementPage() {
  return (
    <>
      <Hero
        title="IT Procurement"
        subtitle="The right technology at the best value — sourced through Tier 1 and Tier 2 manufacturer partnerships built over 39 years."
        ctaText="Request a Quote"
        ctaHref="/contact"
      />

      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-6">Strategic Procurement. Trusted Partners.</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Audcomp maintains direct partnerships with the world's leading Tier 1 and Tier 2 technology manufacturers. These relationships — built over nearly four decades — give our clients access to enterprise pricing, expedited shipping, and direct manufacturer support channels unavailable through retail purchasing.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Our procurement team works closely with your team to identify the right solutions for your environment, budget, and growth plans. We don't upsell. We recommend what fits.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            Through our exclusive "Try and Buy" demo program, you can evaluate hardware in your own environment before committing — eliminating procurement risk and ensuring the right fit every time.
          </p>
        </div>
      </section>

      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-12 text-center">What We Procure</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🖥️", title: "Servers & Storage", desc: "Rack-mount, tower, and blade servers from leading manufacturers, plus SAN/NAS storage solutions." },
              { icon: "💻", title: "Client Systems", desc: "Desktops, laptops, workstations, and thin clients for every user type and budget." },
              { icon: "🌐", title: "Networking", desc: "Switches, routers, firewalls, and wireless access points from Cisco, Fortinet, and others." },
              { icon: "🖨️", title: "Peripherals", desc: "Monitors, printers, scanners, docking stations, and accessories." },
              { icon: "📱", title: "Mobile Devices", desc: "Smartphones, tablets, and mobile accessories for field and remote teams." },
              { icon: "💾", title: "Software Licensing", desc: "Microsoft, Adobe, and hundreds of other titles with volume licensing options." },
            ].map((f) => (
              <div key={f.title} className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-[#1a1a2e] mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Try & Buy */}
      <section className="bg-[#e8f0fe] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-4xl mb-4">🔬</div>
          <h2 className="text-2xl font-bold text-[#1a1a2e] mb-4">Our "Try and Buy" Demo Program</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Evaluate hardware in your own environment before you commit. Our exclusive Try and Buy program lets you test servers, networking equipment, and workstations with your actual workloads — eliminating guesswork from every procurement decision.
          </p>
        </div>
      </section>

      <CTABanner
        title="Need to Source Technology for Your Business?"
        subtitle="Contact Audcomp's procurement team for a needs assessment and competitive quote."
      />
    </>
  );
}
