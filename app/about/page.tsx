import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CTABanner from "@/components/CTABanner";
import Link from "next/link";
import { SectionAngle } from "@/components/SectionAngle";
import { AnimatedSection, StaggeredSection, StaggeredItem } from "@/components/AnimatedSection";

export const metadata: Metadata = {
  title: "About Audcomp | IT Leaders in Hamilton & Ancaster Since 1986",
  description:
    "Learn about Audcomp, Canada's trusted IT consulting partner. Founded in 1986, ranked top 25 CDN Solutions Provider, 100% Canadian engineers.",
};

const stats = [
  { value: "1986", label: "Year Founded" },
  { value: "40+", label: "Years of Excellence" },
  { value: "Top 25", label: "CDN Solutions Provider" },
  { value: "100%", label: "Canadian Engineers" },
];

const verticals = [
  {
    label: "Healthcare",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop&q=80",
    desc: "Hospitals, clinics, and public health agencies depend on Audcomp for PHIPA-compliant IT and rapid incident response.",
  },
  {
    label: "Municipalities",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&h=400&fit=crop&q=80",
    desc: "City and regional governments trust us to keep essential civic infrastructure running securely around the clock.",
  },
  {
    label: "Universities",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop&q=80",
    desc: "Academic institutions rely on Audcomp for scalable infrastructure, student-facing support, and research data security.",
  },
  {
    label: "Manufacturing",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&h=400&fit=crop&q=80",
    desc: "Production floor uptime is everything. We deliver OT/IT integration and zero-downtime IT strategies for manufacturers.",
  },
  {
    label: "Enterprise",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop&q=80",
    desc: "Large organizations trust Audcomp for enterprise-grade managed IT, cloud migration, and virtual CIO advisory.",
  },
  {
    label: "Small & Medium Business",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=400&fit=crop&q=80",
    desc: "SMBs gain enterprise-quality IT without the overhead — tailored support that grows with your business.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Hero
        title="About Audcomp"
        subtitle="Canada's most trusted IT consulting partner — built on 40 years of relationships, results, and reliability."
        ctaText="Contact Our Team"
        ctaHref="/contact"
        backgroundImage="/images/professional_services_hero.png"
      />

      {/* Stats — navy */}
      <section className="relative bg-[#071e3d] py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[200px] rounded-full opacity-10" style={{ background: "radial-gradient(ellipse, #06b6d4 0%, transparent 70%)" }} />
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-bold text-white tracking-tight">{s.value}</p>
              <p className="text-xs text-white/40 mt-1.5 uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <SectionAngle from="#071e3d" to="#ffffff" flip={false} height={64} />

      {/* Mission — WHITE */}
      <section className="bg-white py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <p className="text-xs font-semibold text-[#0071e3] uppercase tracking-widest mb-5">Our Mission</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#0a2540] mb-8 tracking-tight leading-tight">
              More Than IT Support.<br />A True Business Partner.
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-6">
              Our mission is to empower businesses to operate confidently and more efficiently by providing tailored IT solutions. Our team of dedicated professionals is committed to developing and implementing reliable, cost-effective solutions for businesses of all sizes — no matter the scope of the need.
            </p>
            <p className="text-slate-500 text-lg leading-relaxed">
              We are more than a service provider. We are your partner. That philosophy has guided every client relationship since Gary Sohal founded Audcomp at McMaster University in 1986.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <SectionAngle from="#ffffff" to="#071e3d" flip={true} height={64} />

      {/* Our Story — navy */}
      <section className="relative bg-[#071e3d] py-24 px-4 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[400px] rounded-full opacity-10 pointer-events-none" style={{ background: "radial-gradient(ellipse, #06b6d4 0%, transparent 70%)" }} />
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection delay={0}>
            <p className="text-xs font-semibold text-[#06b6d4] uppercase tracking-widest mb-5">Our Story</p>
            <h2 className="text-4xl font-bold text-white mb-6 tracking-tight leading-tight">
              From McMaster to the Region&apos;s Largest MSP
            </h2>
            <p className="text-white/55 leading-relaxed mb-4 text-base">
              Founded in 1986 by Gary Sohal at McMaster University, Audcomp started with a simple belief: businesses deserve technology that works and a partner they can trust. Over nearly four decades, that belief has driven us to become the largest MSP in Hamilton and Ancaster.
            </p>
            <p className="text-white/40 leading-relaxed mb-8 text-base">
              Today, Audcomp proudly ranks in the top 25 of CDN&apos;s Top 100 Solutions Providers — a distinction we&apos;ve earned for more than 10 consecutive years. Our team of 100% Canadian engineers operates out of 100% Canadian data centers, delivering enterprise-grade IT with local accountability.
            </p>
            <Link
              href="/our-story"
              className="inline-flex items-center gap-1.5 text-sm text-[#38bdf8] font-medium hover:underline"
            >
              Read Our Full Story
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="relative bg-white/[0.06] border border-white/[0.1] rounded-2xl p-10 backdrop-blur-sm">
              <p className="text-5xl text-[#06b6d4] leading-none mb-5 font-serif">&ldquo;</p>
              <p className="text-white/85 text-xl italic leading-relaxed font-light">
                We are more than a service provider. We are your partner.
              </p>
              <div className="mt-8 pt-6 border-t border-white/[0.1]">
                <p className="font-semibold text-white text-sm">Gary Sohal</p>
                <p className="text-xs text-white/40 mt-0.5">Founder, Audcomp</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <SectionAngle from="#071e3d" to="#ffffff" flip={false} height={64} />

      {/* Industries — WHITE with real images */}
      <section className="bg-white py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="text-xs font-semibold text-[#0071e3] uppercase tracking-widest mb-4">Industries We Serve</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#0a2540] mb-5 tracking-tight">
              Built for Your Sector
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
              Audcomp delivers IT solutions tailored to the unique compliance, security, and operational needs of each industry.
            </p>
          </AnimatedSection>

          <StaggeredSection className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {verticals.map((v) => (
              <StaggeredItem key={v.label}>
                <div className="group rounded-2xl overflow-hidden border border-slate-200 hover:border-blue-200 transition-all duration-300 hover:shadow-lg">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={v.image}
                      alt={v.label}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071e3d]/70 to-transparent" />
                    <p className="absolute bottom-3 left-4 text-white font-semibold text-base tracking-tight">
                      {v.label}
                    </p>
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-slate-500 leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              </StaggeredItem>
            ))}
          </StaggeredSection>
        </div>
      </section>

      <SectionAngle from="#ffffff" to="#071e3d" flip={true} height={64} />

      <CTABanner
        title="Let's Talk About Your IT Needs"
        subtitle="Whether you're an SMB or a large enterprise, Audcomp has the expertise and scale to support you."
      />
    </>
  );
}
