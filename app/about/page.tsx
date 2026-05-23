import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CTABanner from "@/components/CTABanner";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Audcomp | IT Leaders in Hamilton & Ancaster Since 1986",
  description:
    "Learn about Audcomp, Canada's trusted IT consulting partner. Founded in 1986, ranked top 25 CDN Solutions Provider, 100% Canadian engineers.",
};

const stats = [
  { value: "1986", label: "Year Founded" },
  { value: "39+", label: "Years of Excellence" },
  { value: "Top 25", label: "CDN Solutions Provider, 10+ Years" },
  { value: "100%", label: "Canadian Engineers & Data Centers" },
];

const verticals = [
  { icon: "🏥", label: "Healthcare" },
  { icon: "🏛️", label: "Municipalities" },
  { icon: "🎓", label: "Universities & School Boards" },
  { icon: "🏭", label: "Manufacturing" },
  { icon: "🏢", label: "Enterprise" },
  { icon: "💼", label: "Small & Medium Business" },
];

export default function AboutPage() {
  return (
    <>
      <Hero
        title="About Audcomp"
        subtitle="Canada's most trusted IT consulting partner — built on 39 years of relationships, results, and reliability."
        ctaText="Contact Our Team"
        ctaHref="/contact"
      />

      {/* Stats */}
      <section className="bg-[#003d7a] py-10">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-bold text-white">{s.value}</p>
              <p className="text-sm text-blue-200 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-6">Our Mission</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Our mission is to empower businesses to operate confidently and more efficiently by providing tailored IT solutions. Our team of dedicated professionals is committed to developing and implementing reliable, cost-effective solutions for businesses of all sizes — no matter the scope of the need.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            We are more than a service provider. We are your partner. That philosophy has guided every client relationship since Gary Sohal founded Audcomp at McMaster University in 1986.
          </p>
        </div>
      </section>

      {/* Our Story Teaser */}
      <section className="bg-[#e8f0fe] py-20 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-[#1a1a2e] mb-6">
              From McMaster to the Region's Largest MSP
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Founded in 1986 by Gary Sohal at McMaster University, Audcomp started with a simple belief: businesses deserve technology that works and a partner they can trust. Over nearly four decades, that belief has driven us to become the largest MSP in Hamilton and Ancaster.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Today, Audcomp proudly ranks in the top 25 of CDN's Top 100 Solutions Providers — a distinction we've earned for more than 10 consecutive years. Our team of 100% Canadian engineers operates out of 100% Canadian data centers, delivering enterprise-grade IT with local accountability.
            </p>
            <Link
              href="/our-story"
              className="inline-flex items-center gap-2 text-[#0056a8] font-semibold hover:underline"
            >
              Read Our Full Story
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="bg-white rounded-xl p-8 border border-blue-100 shadow-sm">
            <p className="text-4xl text-[#0056a8] leading-none mb-4">&ldquo;</p>
            <p className="text-gray-700 text-lg italic leading-relaxed">
              We are more than a service provider. We are your partner.
            </p>
            <p className="mt-4 font-semibold text-[#1a1a2e]">Gary Sohal</p>
            <p className="text-sm text-gray-500">Founder, Audcomp</p>
          </div>
        </div>
      </section>

      {/* Verticals */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1a1a2e] mb-4">Industries We Serve</h2>
            <p className="text-gray-600 text-lg">
              Audcomp delivers IT solutions tailored to the unique needs of each sector.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {verticals.map((v) => (
              <div
                key={v.label}
                className="bg-[#e8f0fe] rounded-xl p-5 text-center"
              >
                <div className="text-3xl mb-2">{v.icon}</div>
                <p className="text-sm font-semibold text-[#1a1a2e]">{v.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Let's Talk About Your IT Needs"
        subtitle="Whether you're an SMB or a large enterprise, Audcomp has the expertise and scale to support you."
      />
    </>
  );
}
