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
  { value: "40+", label: "Years of Excellence" },
  { value: "Top 25", label: "CDN Solutions Provider, 10+ Years" },
  { value: "100%", label: "Canadian Engineers & Data Centers" },
];

const verticals = [
  "Healthcare",
  "Municipalities",
  "Universities & School Boards",
  "Manufacturing",
  "Enterprise",
  "Small & Medium Business",
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
      <section className="bg-[#181E2C] py-10">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-bold text-white">{s.value}</p>
              <p className="text-sm text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="bg-background py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            Our mission is to empower businesses to operate confidently and more efficiently by providing tailored IT solutions. Our team of dedicated professionals is committed to developing and implementing reliable, cost-effective solutions for businesses of all sizes — no matter the scope of the need.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed">
            We are more than a service provider. We are your partner. That philosophy has guided every client relationship since Gary Sohal founded Audcomp at McMaster University in 1986.
          </p>
        </div>
      </section>

      {/* Our Story Teaser */}
      <section className="bg-muted py-20 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              From McMaster to the Region's Largest MSP
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Founded in 1986 by Gary Sohal at McMaster University, Audcomp started with a simple belief: businesses deserve technology that works and a partner they can trust. Over nearly four decades, that belief has driven us to become the largest MSP in Hamilton and Ancaster.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Today, Audcomp proudly ranks in the top 25 of CDN's Top 100 Solutions Providers — a distinction we've earned for more than 10 consecutive years. Our team of 100% Canadian engineers operates out of 100% Canadian data centers, delivering enterprise-grade IT with local accountability.
            </p>
            <Link
              href="/our-story"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
            >
              Read Our Full Story
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
            <p className="text-4xl text-primary leading-none mb-4">&ldquo;</p>
            <p className="text-foreground text-lg italic leading-relaxed">
              We are more than a service provider. We are your partner.
            </p>
            <p className="mt-4 font-semibold text-foreground">Gary Sohal</p>
            <p className="text-sm text-muted-foreground">Founder, Audcomp</p>
          </div>
        </div>
      </section>

      {/* Verticals */}
      <section className="bg-background py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Industries We Serve</h2>
            <p className="text-muted-foreground text-lg">
              Audcomp delivers IT solutions tailored to the unique needs of each sector.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {verticals.map((label) => (
              <div
                key={label}
                className="bg-card border border-border rounded-xl p-5 text-center"
              >
                <p className="text-sm font-semibold text-foreground">{label}</p>
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
