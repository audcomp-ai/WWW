import type { Metadata } from "next";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "AI Services | Audcomp — Microsoft Copilot & AI Consulting in Canada",
  description:
    "Audcomp helps Canadian businesses adopt AI safely and strategically — Microsoft Copilot enablement, AI readiness assessments, data governance, and tailored AI roadmaps.",
};

const subServices = [
  {
    icon: "🤖",
    title: "Microsoft Copilot Enablement",
    description: "Readiness assessment, integration, training, and ongoing support for Microsoft Copilot across your Microsoft 365 environment.",
    href: "/microsoft-copilot-enablement",
  },
  {
    icon: "🧭",
    title: "AI Consulting",
    description: "Identify high-value AI use cases, assess organizational readiness, and build a tailored AI roadmap for your business.",
    href: "/ai-services#consulting",
  },
  {
    icon: "🛡️",
    title: "AI Business Readiness & Data Governance",
    description: "Data quality, privacy, compliance, and ethical AI frameworks to ensure your AI initiatives are built on solid foundations.",
    href: "/ai-services#governance",
  },
];

export default function AIServicesPage() {
  return (
    <>
      <Hero
        title="AI Services"
        subtitle="Practical AI for Canadian businesses — Audcomp helps you identify, adopt, and govern AI tools that deliver real business value."
        ctaText="Explore AI for Your Business"
        ctaHref="/contact"
      />

      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-6">AI That Actually Works for Your Business</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Artificial intelligence is reshaping how businesses operate — but the hype often outpaces the practical reality. Audcomp helps Canadian organizations cut through the noise to identify AI applications that genuinely improve efficiency, reduce cost, or create competitive advantage.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Whether you're beginning with Microsoft Copilot in your existing Microsoft 365 environment, exploring custom AI workflows, or building the data governance foundation for responsible AI adoption, Audcomp provides the strategy, implementation, and ongoing support to make it work.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            We take a security-first approach to every AI engagement — ensuring your data, your privacy, and your compliance obligations are protected as you embrace new technologies.
          </p>
        </div>
      </section>

      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-4 text-center">AI Services</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            From readiness through deployment and governance — a complete AI journey with Audcomp.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {subServices.map((s) => (
              <ServiceCard key={s.href} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* AI Consulting Section */}
      <section id="consulting" className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-6">AI Consulting</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Before deploying AI tools, organizations need to understand where AI can genuinely add value — and where it introduces risk. Audcomp's AI Consulting service helps you answer both questions.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            {[
              { icon: "🔍", title: "Use Case Identification", desc: "Identify the highest-value AI use cases specific to your industry, workflows, and data." },
              { icon: "📋", title: "Readiness Assessment", desc: "Evaluate your data quality, infrastructure, and organizational readiness for AI adoption." },
              { icon: "🗺️", title: "AI Roadmap", desc: "A phased, prioritized AI adoption roadmap tailored to your business and risk tolerance." },
              { icon: "🤝", title: "Vendor Evaluation", desc: "Assess AI tools and platforms independently — without the vendor sales pitch." },
            ].map((f) => (
              <div key={f.title} className="bg-[#e8f0fe] rounded-xl p-5 flex gap-4">
                <div className="text-2xl">{f.icon}</div>
                <div>
                  <h3 className="font-semibold text-[#1a1a2e] mb-1 text-sm">{f.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Governance Section */}
      <section id="governance" className="bg-gray-50 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-6">AI Business Readiness & Data Governance</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            AI is only as good as the data it's built on. Before your organization can benefit from AI, you need confidence in your data quality, privacy practices, and compliance posture. Audcomp's data governance framework for AI addresses all of these dimensions.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            {[
              { icon: "📊", title: "Data Quality", desc: "Assess and improve the quality, completeness, and consistency of your organizational data." },
              { icon: "🔒", title: "Privacy & Compliance", desc: "Ensure AI usage complies with PIPEDA, PHIPA, and applicable AI regulations." },
              { icon: "⚖️", title: "Ethical AI", desc: "Frameworks for responsible, transparent, and auditable AI use in your organization." },
            ].map((f) => (
              <div key={f.title} className="bg-white rounded-xl border border-gray-200 p-6 text-center">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-[#1a1a2e] mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Ready to Explore AI for Your Business?"
        subtitle="Contact Audcomp for an AI readiness assessment — we'll identify the best starting point for your organization."
      />
    </>
  );
}
