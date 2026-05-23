import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Structured Cabling | Audcomp — Network Infrastructure Installation",
  description:
    "Audcomp designs and installs structured cabling systems for offices, data centers, and enterprise environments across the Hamilton and Ancaster region.",
};

export default function StructuredCablingPage() {
  return (
    <>
      <Hero
        title="Structured Cabling"
        subtitle="A reliable network starts with solid physical infrastructure. Audcomp designs and installs structured cabling systems built to last."
        ctaText="Get a Cabling Assessment"
        ctaHref="/contact"
      />

      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-6">The Foundation of Your Network</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Even the most sophisticated network equipment performs poorly on a poorly designed cabling infrastructure. Structured cabling done right means consistent performance, easy troubleshooting, room for growth, and a clean, documented installation that any technician can understand.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Audcomp's cabling team designs and installs structured cabling systems for offices, multi-floor facilities, data centers, and industrial environments. Every installation follows industry standards (TIA-568) and is fully documented and tested before handover.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            Whether you're cabling a new office, upgrading an aging Cat5e plant to Cat6A, or designing a data center patch room, Audcomp delivers a clean, reliable, documented result.
          </p>
        </div>
      </section>

      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-12 text-center">Cabling Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "📐", title: "Network Design", desc: "Structured cabling system design including cable runs, patch panel layouts, and IDF/MDF locations." },
              { icon: "🔌", title: "Cat6 / Cat6A Installation", desc: "High-performance copper cabling supporting 10Gbps and beyond for future-ready networks." },
              { icon: "💡", title: "Fiber Optic Installation", desc: "Single-mode and multi-mode fiber for backbone runs, inter-building connections, and high-density environments." },
              { icon: "🗄️", title: "Patch Panel & Rack Setup", desc: "Clean, labeled patch panels and structured rack builds that are easy to manage and expand." },
              { icon: "✅", title: "Cable Testing & Certification", desc: "Every run is tested and certified — complete test documentation provided at project completion." },
              { icon: "📋", title: "As-Built Documentation", desc: "Detailed as-built drawings and cable schedules so your network is fully documented for the future." },
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

      <CTABanner
        title="Build Your Network on a Solid Foundation"
        subtitle="Contact Audcomp for a cabling assessment and design proposal for your facility."
      />
    </>
  );
}
