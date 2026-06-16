import type { Metadata } from "next";
import Link from "next/link";
import HeroCarousel from "@/components/HeroCarousel";
import { BlogCards } from "@/components/ui/cards";
import TestimonialCard from "@/components/ui/testimonial-card";
import ServiceCard from "@/components/ServiceCard";
import CTABanner from "@/components/CTABanner";
import CountUp from "@/components/CountUp";
import { SectionAngle } from "@/components/SectionAngle";
import { AnimatedSection, StaggeredSection, StaggeredItem } from "@/components/AnimatedSection";

export const metadata: Metadata = {
  title: "Audcomp | Trusted IT Consulting Services in Canada",
  description:
    "Audcomp has been empowering businesses across Hamilton, Burlington, Oakville, London, Niagara, and surrounding areas since 1986. Top 25 CDN Solutions Provider with 100% Canadian engineers and 24/7 support.",
};

const services = [
  {
    title: "Managed IT Services",
    description:
      "End-user support, network monitoring, and infrastructure management with 100% Canadian engineers and 24/7 coverage.",
    href: "/managed-it-services",
    category: "Managed IT",
  },
  {
    title: "Cloud Solutions",
    description:
      "Microsoft 365, Azure, hybrid cloud, and Teams deployment — fully managed and tailored to your business needs.",
    href: "/cloud-solutions",
    category: "Cloud",
  },
  {
    title: "Cyber Security",
    description:
      "Endpoint protection, SOC & MDR, penetration testing, dark web monitoring, and security awareness training.",
    href: "/security-services",
    category: "Security",
  },
  {
    title: "Professional Services",
    description:
      "Virtual CIO, IT consulting and design, implementation, migration, and structured cabling expertise.",
    href: "/professional-services",
    category: "Professional",
  },
  {
    title: "AI Services",
    description:
      "Microsoft Copilot enablement, AI readiness assessments, data governance, and tailored AI roadmaps.",
    href: "/ai-services",
    category: "AI",
  },
  {
    title: "IT Procurement",
    description:
      "Tier 1 and Tier 2 manufacturer partnerships, \"Try and Buy\" demo program, and full hardware lifecycle support.",
    href: "/it-procurement",
    category: "Managed IT",
  },
];

const testimonials = [
  {
    quote:
      "Audcomp Managed Services has been a wonderful addition to our business operations. With the help of their team, and their proactive maintenance approach, we have seen the reliability, security, and performance of our network increase with each month.",
    authorName: "Jeff",
    authorTitle: "COO",
    avatarUrl: "",
    rating: 5,
  },
  {
    quote:
      "I am very impressed with the service I receive from Audcomp. Their commitment to excellence is evident in every product we've purchased, and their knowledgeable and friendly team ensures a seamless experience.",
    authorName: "Jen",
    authorTitle: "VP of Information Technology",
    avatarUrl: "",
    rating: 5,
  },
  {
    quote:
      "We chose Audcomp as our partner for IT Managed Service back in 2018 and would recommend Audcomp to any business looking for a reliable and effective Managed Service Provider.",
    authorName: "Kellie",
    authorTitle: "President and CEO",
    avatarUrl: "",
    rating: 5,
  },
];

const verticals = [
  { label: "Healthcare", slug: "healthcare", image: "/images/ind_healthcare_1781220794136.png" },
  { label: "Municipalities", slug: "municipalities", image: "/images/ind_municipalities_1781220804489.png" },
  { label: "Universities", slug: "universities", image: "/images/ind_universities_1781220814872.png" },
  { label: "Manufacturing", slug: "manufacturing", image: "/images/ind_manufacturing_1781220830507.png" },
  { label: "Enterprise", slug: "enterprise", image: "/images/ind_enterprise_1781220840854.png" },
  { label: "Small & Medium Business", slug: "smb", image: "/images/ind_smb_1781220849628.png" },
];

export default function Home() {
  return (
    <>
      <HeroCarousel />

      {/* Stats Bar — navy */}
      <section className="relative bg-[#071e3d] py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[800px] h-[200px] rounded-full opacity-10" style={{ background: "radial-gradient(ellipse, #06b6d4 0%, transparent 70%)" }} />
        </div>
        <AnimatedSection>
          <div className="relative max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-white tracking-tight"><CountUp end={40} suffix="+" /></p>
              <p className="text-xs text-white/40 mt-2 uppercase tracking-widest">Years in Business</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-white tracking-tight">Top 25</p>
              <p className="text-xs text-white/40 mt-2 uppercase tracking-widest">CDN Solutions Provider</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-white tracking-tight"><CountUp end={100} suffix="%" /></p>
              <p className="text-xs text-white/40 mt-2 uppercase tracking-widest">Canadian Engineers</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-white tracking-tight">24/7</p>
              <p className="text-xs text-white/40 mt-2 uppercase tracking-widest">Monitoring & Support</p>
            </div>
          </div>
        </AnimatedSection>
      </section>

      <SectionAngle from="#071e3d" to="#ffffff" flip={false} height={64} />

      {/* Services Grid — white with light cards */}
      <section className="bg-white py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="text-xs font-semibold text-[#06b6d4] uppercase tracking-widest mb-4">Our Services</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#0a2540] mb-5 tracking-tight">
              Comprehensive IT Solutions
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
              From day-to-day support to strategic planning, Audcomp delivers tailored IT solutions for businesses of all sizes.
            </p>
          </AnimatedSection>
          <StaggeredSection className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service) => (
              <StaggeredItem key={service.href}>
                <ServiceCard {...service} variant="light" />
              </StaggeredItem>
            ))}
          </StaggeredSection>
        </div>
      </section>

      <SectionAngle from="#ffffff" to="#f0f7ff" flip={true} height={64} />

      {/* Industries We Serve — light blue with real images */}
      <section className="bg-[#f0f7ff] py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="text-xs font-semibold text-[#0071e3] uppercase tracking-widest mb-4">Industries</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#0a2540] mb-5 tracking-tight">
              Built for Your Sector
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
              Deep domain knowledge across six industries — so your IT strategy fits the way your business actually works.
            </p>
          </AnimatedSection>

          <StaggeredSection className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {verticals.map((v) => (
              <StaggeredItem key={v.label}>
                <Link href={`/industries#${v.slug}`} className="group relative rounded-2xl overflow-hidden aspect-[4/3] block">
                  <img
                    src={v.image}
                    alt={v.label}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071e3d]/80 via-[#071e3d]/20 to-transparent" />
                  <p className="absolute bottom-4 left-4 text-white font-semibold text-base tracking-tight">
                    {v.label}
                  </p>
                </Link>
              </StaggeredItem>
            ))}
          </StaggeredSection>

          <AnimatedSection className="text-center mt-12">
            <Link
              href="/industries"
              className="inline-flex items-center gap-1.5 text-sm text-[#0071e3] font-medium hover:underline"
            >
              Explore all sectors
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <SectionAngle from="#f0f7ff" to="#071e3d" flip={false} height={64} />

      {/* Testimonials — navy with dark glass cards */}
      <section className="bg-[#071e3d] py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="text-xs font-semibold text-[#06b6d4] uppercase tracking-widest mb-4">Client Stories</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-5 tracking-tight">
              What Our Clients Say
            </h2>
            <p className="text-white/45 text-base">
              Trusted by businesses across Hamilton, Burlington, Oakville, London, Niagara, and beyond.
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, index) => (
              <TestimonialCard key={t.authorName} {...t} index={index} variant="dark" />
            ))}
          </div>
        </div>
      </section>

      <SectionAngle from="#071e3d" to="#ffffff" flip={true} height={64} />

      {/* Case Study Callout — white, big image feature */}
      <section className="bg-white py-24 px-4">
        <AnimatedSection>
          <div className="max-w-6xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden min-h-[420px] flex items-end" style={{ boxShadow: "0 20px 60px rgba(7,30,61,0.12)" }}>
              {/* Background image */}
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1400&h=700&auto=format&fit=crop&q=80"
                alt="Healthcare Cybersecurity"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#071e3d]/92 via-[#071e3d]/70 to-[#071e3d]/20" />
              {/* Content */}
              <div className="relative z-10 p-10 sm:p-14 max-w-2xl">
                <span className="inline-flex items-center gap-2 bg-[#06b6d4]/20 border border-[#06b6d4]/40 text-[#06b6d4] text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
                  Case Study
                </span>
                <h3 className="text-3xl sm:text-4xl font-bold text-white mb-5 tracking-tight leading-tight">
                  Healthcare Cybersecurity Recovery
                </h3>
                <p className="text-white/65 leading-relaxed text-base mb-8 max-w-md">
                  A public-sector healthcare organization hit by a cyberattack in 2024 was fully operational within two weeks — critical services restored within two business days — thanks to Audcomp&apos;s rapid incident response.
                </p>
                <Link
                  href="/case-study"
                  className="inline-flex items-center gap-2 bg-white text-[#0a2540] font-semibold px-7 py-3 rounded-full transition-all duration-200 text-sm hover:bg-[#f0f7ff] hover:shadow-lg"
                >
                  Read the Case Study
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      <SectionAngle from="#ffffff" to="#f0f7ff" flip={false} height={64} />

      {/* Latest Insights — light blue */}
      <section className="bg-[#f0f7ff] py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <BlogCards
              title="Latest Insights"
              subtitle="IT expertise and industry updates from the Audcomp team"
            />
          </AnimatedSection>
          <AnimatedSection className="text-center mt-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-[#0071e3] font-medium hover:underline"
            >
              View all articles
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <SectionAngle from="#f0f7ff" to="#071e3d" flip={true} height={64} />

      <CTABanner />
    </>
  );
}
