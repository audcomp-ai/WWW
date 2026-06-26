import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CTABanner from "@/components/CTABanner";
import Link from "next/link";
import { SectionAngle } from "@/components/SectionAngle";
import { AnimatedSection, StaggeredSection, StaggeredItem } from "@/components/AnimatedSection";

export const metadata: Metadata = {
  title: "About Audcomp | IT Leaders in Hamilton, Burlington & Beyond",
  description:
    "Learn about Audcomp, Canada's trusted IT consulting partner serving Hamilton, Burlington, Oakville, London, and Niagara. Ranked top 25 CDN Solutions Provider.",
};

const stats = [
  { value: "1986", label: "Year Founded" },
  { value: "40+", label: "Years of Excellence" },
  { value: "Top 25", label: "CDN Solutions Provider" },
  { value: "100%", label: "Canadian Engineers" },
];

const verticals = [
  { label: "Healthcare", slug: "healthcare", image: "/images/ind_healthcare_1781220794136.png", desc: "Hospitals, clinics, and public health agencies depend on Audcomp for PHIPA-compliant IT and rapid incident response." },
  { label: "Municipalities", slug: "municipalities", image: "/images/ind_municipalities_1781220804489.png", desc: "City and regional governments trust us to keep essential civic infrastructure running securely around the clock." },
  { label: "Universities", slug: "universities", image: "/images/ind_universities_1781220814872.png", desc: "Academic institutions rely on Audcomp for scalable infrastructure, student-facing support, and research data security." },
  { label: "Manufacturing", slug: "manufacturing", image: "/images/ind_manufacturing_1781220830507.png", desc: "Production floor uptime is everything. We deliver OT/IT integration and zero-downtime IT strategies for manufacturers." },
  { label: "Enterprise", slug: "enterprise", image: "/images/ind_enterprise_1781220840854.png", desc: "Large organizations trust Audcomp for enterprise-grade managed IT, cloud migration, and virtual CIO advisory." },
  { label: "Small & Medium Business", slug: "smb", image: "/images/ind_smb_1781220849628.png", desc: "SMBs gain enterprise-quality IT without the overhead — tailored support that grows with your business." },
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
              Founded in 1986 by Gary Sohal at McMaster University, Audcomp started with a simple belief: businesses deserve technology that works and a partner they can trust. Over nearly four decades, that belief has driven us to become a leading MSP serving Hamilton, Burlington, Oakville, London, Niagara, and beyond.
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
                We are more than a service provider. We are your partner.&rdquo;
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

      {/* Philosophy & Promise — WHITE */}
      <section className="bg-white py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <AnimatedSection delay={0}>
              <p className="text-xs font-semibold text-[#0071e3] uppercase tracking-widest mb-5">Our Philosophy</p>
              <h2 className="text-3xl font-bold text-[#0a2540] mb-6 tracking-tight leading-tight">
                Guided by Our Roots
              </h2>
              <p className="text-slate-500 text-base leading-relaxed mb-4">
                Our beliefs and values are the heart of how we operate. The Audcomp philosophy guides how we approach every client relationship and project. Though we are one of the largest IT services providers in Ontario, we have not forgotten our small business roots.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <p className="text-xs font-semibold text-[#0071e3] uppercase tracking-widest mb-5">The Audcomp Promise</p>
              <h2 className="text-3xl font-bold text-[#0a2540] mb-6 tracking-tight leading-tight">
                Your Goals Are Our Goals
              </h2>
              <p className="text-slate-500 text-base leading-relaxed">
                Partnering with Audcomp means partnering with professionals who share your goals. We care about your outcomes. Your needs and bottom line drive our services. When Audcomp thinks of the IT industry, we think of opportunities to meaningfully collaborate with people and businesses in ways that positively support their success.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <SectionAngle from="#ffffff" to="#f0f7ff" flip={true} height={64} />

      {/* Core Values — light blue */}
      <section className="bg-[#f0f7ff] py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="text-xs font-semibold text-[#0071e3] uppercase tracking-widest mb-4">Our Values</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#0a2540] mb-5 tracking-tight">
              What We Stand For
            </h2>
          </AnimatedSection>

          <StaggeredSection className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <StaggeredItem>
              <div className="bg-white rounded-2xl border border-slate-200 p-8 h-full">
                <div className="w-10 h-10 bg-[#0071e3]/10 rounded-xl flex items-center justify-center mb-5">
                  <svg className="w-5 h-5 text-[#0071e3]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.42 15.17l-5.04-3a1 1 0 01-.42-.81V5a1 1 0 011-1h10.08a1 1 0 011 1v6.36a1 1 0 01-.42.81l-5.04 3a1 1 0 01-1.16 0z" /></svg>
                </div>
                <h3 className="text-lg font-bold text-[#0a2540] mb-3">Bespoke Solutions</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Audcomp recognizes that no two clients or projects are alike. All of our IT services and solutions are created, executed, and maintained with your unique challenges in mind. We even customize the Audcomp team of specialists and technicians that you work with.
                </p>
              </div>
            </StaggeredItem>

            <StaggeredItem>
              <div className="bg-white rounded-2xl border border-slate-200 p-8 h-full">
                <div className="w-10 h-10 bg-[#0071e3]/10 rounded-xl flex items-center justify-center mb-5">
                  <svg className="w-5 h-5 text-[#0071e3]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <h3 className="text-lg font-bold text-[#0a2540] mb-3">People First</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  We invest heavily into our staff because our people are our power. We continuously connect our team to resources and opportunities that deepen their expertise. When our people are empowered they are more nimble, satisfied, and able to deliver the highest level of service.
                </p>
              </div>
            </StaggeredItem>

            <StaggeredItem>
              <div className="bg-white rounded-2xl border border-slate-200 p-8 h-full">
                <div className="w-10 h-10 bg-[#0071e3]/10 rounded-xl flex items-center justify-center mb-5">
                  <svg className="w-5 h-5 text-[#0071e3]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                </div>
                <h3 className="text-lg font-bold text-[#0a2540] mb-3">Collaboration</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Navigating the complex and ever-evolving landscape of information technology can be challenging, even if you are an expert. Whether you require a professional staffing solution, complementary services to support your existing team, or IT consulting, Audcomp has you covered.
                </p>
              </div>
            </StaggeredItem>

            <StaggeredItem>
              <div className="bg-white rounded-2xl border border-slate-200 p-8 h-full">
                <div className="w-10 h-10 bg-[#0071e3]/10 rounded-xl flex items-center justify-center mb-5">
                  <svg className="w-5 h-5 text-[#0071e3]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                <h3 className="text-lg font-bold text-[#0a2540] mb-3">Partner Agnostic</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Our extensive roster of top tier IT partners enables your business to benefit from a range of cutting-edge technologies through a single point of contact. We are equally committed to all of our partners and strategically match their robust capabilities and competencies to your business needs.
                </p>
              </div>
            </StaggeredItem>
          </StaggeredSection>
        </div>
      </section>

      <SectionAngle from="#f0f7ff" to="#ffffff" flip={false} height={64} />

      {/* Industries — WHITE with real images */}
      <section className="bg-white py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="text-xs font-semibold text-[#0071e3] uppercase tracking-widest mb-4">Industries We Serve</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#0a2540] mb-5 tracking-tight">
              Your Industry. Our Expertise.
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
              From hospitals to factory floors, we&apos;ve spent 40 years learning the compliance, security, and operational demands that make each sector unique. That depth is why over 200 organizations across Southern Ontario trust us with their IT.
            </p>
          </AnimatedSection>

          <StaggeredSection className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {verticals.map((v) => (
              <StaggeredItem key={v.label}>
                <Link href={`/industries#${v.slug}`} className="group rounded-2xl overflow-hidden border border-slate-200 hover:border-blue-200 transition-all duration-300 hover:shadow-lg block">
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
                </Link>
              </StaggeredItem>
            ))}
          </StaggeredSection>

          <AnimatedSection className="text-center mt-10">
            <p className="text-slate-400 text-sm mb-4">Don&apos;t see your industry? We work with organizations of every size and sector.</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 bg-[#0071e3] hover:bg-[#0077ed] text-white text-sm font-medium px-6 py-2.5 rounded-full transition-colors duration-200"
            >
              Tell Us About Your Business
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </AnimatedSection>
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
