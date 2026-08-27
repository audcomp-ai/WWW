import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CTABanner from "@/components/CTABanner";
import { SectionAngle } from "@/components/SectionAngle";

export const metadata: Metadata = {
  title: "Our Story | Audcomp, 40 Years of IT Excellence in Canada",
  description:
    "From a university startup in 1986 to the largest MSP in Hamilton and Ancaster. The story of Audcomp and our commitment to Canadian businesses.",
};

const milestones = [
  {
    year: "1986",
    title: "Audcomp Is Founded",
    description:
      "Gary Sohal establishes Audcomp with a vision to bring reliable, affordable IT to Canadian businesses. The company's first clients are local SMBs in the Hamilton area.",
  },
  {
    year: "1990s",
    title: "Growing the Hamilton Region",
    description:
      "Audcomp expands its footprint across Hamilton and Ancaster, building a reputation for responsive service and deep technical expertise. We establish our Canadian technician policy.",
  },
  {
    year: "2000s",
    title: "Enterprise & Managed Services",
    description:
      "Audcomp makes the transition to fully managed IT services, allowing clients to focus on their core business while we handle their entire IT infrastructure proactively.",
  },
  {
    year: "2010s",
    title: "Top 25 CDN Solutions Provider",
    description:
      "Audcomp earns recognition on CDN's Top 100 Solutions Providers list, a ranking we've maintained for over 10 consecutive years. We expand into healthcare, municipalities, and school boards.",
  },
  {
    year: "2020s",
    title: "Cloud, Security & AI",
    description:
      "Audcomp leads clients through cloud adoption, cyber security maturity, and now AI readiness. We open our Security Operations Centre (SOC) offering 24/7 MDR for Canadian organizations.",
  },
];

export default function OurStoryPage() {
  return (
    <>
      <Hero
        title="Our Story"
        subtitle="From a 1986 startup to a top-25 Canadian solutions provider, over 40 years building IT that Canadian businesses rely on every day."
        backgroundImage="/images/professional_services_hero.png"
      />

      <SectionAngle from="#071e3d" to="#ffffff" flip={false} height={64} />

      {/* Founder Section */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            A Partner Born from Principle
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed text-justify hyphens-auto mb-6">
            In 1986, Gary Sohal founded Audcomp with a conviction that would define the company for generations: businesses deserve a technology partner they can genuinely trust. Not a vendor who disappears after the sale. Not a helpdesk that reads from a script. A partner.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed text-justify hyphens-auto mb-6">
            That philosophy turned a small startup into the largest Managed Service Provider in the Hamilton and Ancaster region. Today, Audcomp is recognized as a top-25 CDN Solutions Provider, a designation earned through results, not marketing.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed text-justify hyphens-auto">
            Through every technological shift, from on-premise servers to the cloud, from basic networking to AI, Audcomp's north star has remained the same: help clients operate confidently and efficiently, with technology that works the way their business needs it to. Every technician is based in Canada.
          </p>
        </div>
      </section>

      <SectionAngle from="#ffffff" to="#e8f0fe" flip={true} height={64} />

      {/* Timeline */}
      <section className="bg-[#e8f0fe] py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
            Our Journey
          </h2>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-[#0056a8]/30 hidden sm:block" />
            <div className="flex flex-col gap-10">
              {milestones.map((m) => (
                <div key={m.year} className="flex gap-6 items-start">
                  <div className="shrink-0 w-16 h-16 rounded-full bg-[#0056a8] flex items-center justify-center text-white font-bold text-xs text-center leading-tight z-10">
                    {m.year}
                  </div>
                  <div className="bg-white rounded-xl p-6 border border-blue-100 shadow-sm flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">{m.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{m.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SectionAngle from="#e8f0fe" to="#ffffff" flip={false} height={64} />

      {/* Values */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Partnership",
                desc: "We build long-term relationships, not transactional interactions. Your success is our success.",
              },
              {
                title: "Canadian Roots",
                desc: "Serving businesses across Ontario and across Canada. Technicians and data centres in Canada, so your data stays on Canadian soil.",
              },
              {
                title: "Proactive",
                desc: "We monitor, maintain, and optimize before problems occur, not after.",
              },
              {
                title: "Accountability",
                desc: "We own outcomes, not just deliverables. When something goes wrong, we make it right.",
              },
              {
                title: "Security First",
                desc: "Cyber security isn't a product we sell, it's a principle we build every solution around.",
              },
              {
                title: "Continuous Growth",
                desc: "Technology never stands still, and neither do we. We invest constantly in skills and certifications.",
              },
            ].map((v) => (
              <div key={v.title} className="text-center p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionAngle from="#ffffff" to="#071e3d" flip={true} height={64} />

      <CTABanner />
    </>
  );
}
