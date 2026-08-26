import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CTABanner from "@/components/CTABanner";
import Link from "next/link";
import { SectionAngle } from "@/components/SectionAngle";
import { AnimatedSection, StaggeredSection, StaggeredItem } from "@/components/AnimatedSection";

export const metadata: Metadata = {
  title: "About Audcomp | IT Partner in Hamilton, Burlington & Beyond",
  description:
    "Learn about Audcomp, Canada's trusted IT consulting partner serving Hamilton, Burlington, Oakville, London, and Niagara. Ranked top 25 CDN provider.",
};

const stats = [
  { value: "1986", label: "Year Founded" },
  { value: "40+", label: "Years of Excellence" },
  { value: "Top 25", label: "CDN Solutions Provider" },
  { value: "In Canada", label: "Technicians & Data Centres" },
];


const leadership = [
  { name: "Gary Sohal", role: "Founder", photo: "/images/gary-sohal.jpg" },
];

export default function AboutPage() {
  return (
    <>
      <Hero
        title="About Audcomp"
        subtitle="40 years keeping Canadian businesses running. Technicians and data centres in Canada, and a partner who answers when it matters most."
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
            <h2 className="text-3xl font-bold text-foreground mb-8 leading-tight">
              More Than IT Support.<br />A True Business Partner.
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed text-justify hyphens-auto mb-6">
              Our mission is to help businesses operate confidently and more efficiently by providing tailored IT services. Our team of dedicated professionals is committed to developing and implementing reliable, cost-effective services for businesses of all sizes, no matter the scope of the need.
            </p>
            <p className="text-slate-500 text-lg leading-relaxed text-justify hyphens-auto">
              We are more than a service provider. We are your partner. That philosophy has guided every client relationship since Gary Sohal founded Audcomp in 1986.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <SectionAngle from="#ffffff" to="#071e3d" flip={true} height={64} />

      {/* Our Story — navy */}
      <section className="relative bg-[#071e3d] py-24 px-4 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[400px] rounded-full opacity-10 pointer-events-none" style={{ background: "radial-gradient(ellipse, #06b6d4 0%, transparent 70%)" }} />
        <div className="max-w-3xl mx-auto">
          <AnimatedSection delay={0}>
            <p className="text-xs font-semibold text-[#06b6d4] uppercase tracking-widest mb-5">Our Story</p>
            <h2 className="text-3xl font-bold text-white mb-6 leading-tight">
              From Startup to the Region&apos;s Largest MSP
            </h2>
            <p className="text-white/55 leading-relaxed mb-4 text-base">
              Founded in 1986 by Gary Sohal, Audcomp started with a simple belief: businesses deserve technology that works and a partner they can trust. Over nearly four decades, that belief has driven us to become a leading MSP serving Hamilton, Burlington, Oakville, London, Niagara, and beyond.
            </p>
            <p className="text-white/40 leading-relaxed mb-8 text-base">
              Today, Audcomp proudly ranks in the top 25 of CDN&apos;s Top 100 Solutions Providers, a distinction we&apos;ve earned for more than 10 consecutive years. Our team of technicians in Canada operates out of Canadian data centers, delivering enterprise-grade IT with local accountability.
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
        </div>

        {/* Leadership — portraits in a row with the name beneath, rather than a
            single founder card beside the copy. */}
        <AnimatedSection delay={0.1}>
          <div
            className={`mx-auto mt-20 grid grid-cols-1 gap-10 ${
              leadership.length > 1 ? "max-w-3xl sm:grid-cols-2" : "max-w-[280px]"
            }`}
          >
            {leadership.map((person) => (
              <div key={person.name} className="text-center">
                {/* Circular rather than a rectangle: the source headshots are
                    framed differently from one another, and a circle crops to
                    the face without inventing background to fill corners. */}
                <div className="mx-auto aspect-square w-full max-w-[260px] overflow-hidden rounded-full border border-white/[0.12] bg-white/[0.06] backdrop-blur-sm">
                  {person.photo ? (
                    <img
                      src={person.photo}
                      alt={`${person.name}, ${person.role} of Audcomp`}
                      className="h-full w-full object-cover object-top"
                    />
                  ) : null}
                </div>
                <p className="mt-6 text-lg font-semibold text-white">{person.name}</p>
                <p className="mt-1 text-sm text-white/45">{person.role}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      <SectionAngle from="#071e3d" to="#ffffff" flip={false} height={64} />

      {/* Philosophy & Promise — WHITE */}
      <section className="bg-white py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <AnimatedSection delay={0}>
              <p className="text-xs font-semibold text-[#0071e3] uppercase tracking-widest mb-5">Our Philosophy</p>
              <h2 className="text-3xl font-bold text-foreground mb-6 leading-tight">
                Guided by Our Roots
              </h2>
              <p className="text-slate-500 text-base leading-relaxed mb-4">
                Our beliefs and values are the heart of how we operate. The Audcomp philosophy guides how we approach every client relationship and project. Though we are one of the largest IT providers in Ontario, we have not forgotten our small business roots.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <p className="text-xs font-semibold text-[#0071e3] uppercase tracking-widest mb-5">The Audcomp Promise</p>
              <h2 className="text-3xl font-bold text-foreground mb-6 leading-tight">
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
            <h2 className="text-3xl font-bold text-foreground mb-5">
              What We Stand For
            </h2>
          </AnimatedSection>

          <StaggeredSection className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <StaggeredItem>
              <div className="bg-white rounded-2xl border border-slate-200 p-8 h-full">
                <h3 className="text-lg font-semibold text-[#0a2540] mb-3">Bespoke Solutions</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Audcomp recognizes that no two clients or projects are alike. All of our IT services and solutions are created, executed, and maintained with your unique challenges in mind. We even customize the Audcomp team of specialists and technicians that you work with.
                </p>
              </div>
            </StaggeredItem>

            <StaggeredItem>
              <div className="bg-white rounded-2xl border border-slate-200 p-8 h-full">
                <h3 className="text-lg font-semibold text-[#0a2540] mb-3">People First</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  We invest heavily into our staff because our people are our power. We continuously connect our team to resources and opportunities that deepen their expertise. When our people are supported they are more nimble, satisfied, and able to deliver the highest level of service.
                </p>
              </div>
            </StaggeredItem>

            <StaggeredItem>
              <div className="bg-white rounded-2xl border border-slate-200 p-8 h-full">
                <h3 className="text-lg font-semibold text-[#0a2540] mb-3">Collaboration</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Navigating the complex and ever-evolving landscape of information technology can be challenging, even if you are an expert. Whether you require a professional staffing solution, complementary services to support your existing team, or IT consulting, Audcomp has you covered.
                </p>
              </div>
            </StaggeredItem>

            <StaggeredItem>
              <div className="bg-white rounded-2xl border border-slate-200 p-8 h-full">
                <h3 className="text-lg font-semibold text-[#0a2540] mb-3">Partner Agnostic</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Our extensive roster of top-tier IT partners lets your business tap a broad range of proven technologies through a single point of contact. We are equally committed to all of our partners and strategically match their strong capabilities and competencies to your business needs.
                </p>
              </div>
            </StaggeredItem>
          </StaggeredSection>
        </div>
      </section>

      <SectionAngle from="#f0f7ff" to="#071e3d" flip={false} height={64} />

      <CTABanner
        title="Let's Talk About Your IT Needs"
        subtitle="Whether you're an SMB or a large enterprise, Audcomp has the expertise and scale to support you."
      />
    </>
  );
}
