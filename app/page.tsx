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
import { postsByNewest, toCard } from "@/data/blog";

// The three most recent posts, by publishedAt. Publishing a new post updates
// this section on its own.
const latestPosts = postsByNewest.slice(0, 3).map(toCard);

export const metadata: Metadata = {
  title: "Audcomp | Managed IT, Cybersecurity & Cloud in Canada",
  description:
    "Enterprise-grade managed IT, cybersecurity, and cloud for Ontario businesses, 24/7 monitoring, technicians in Canada, and Canadian data centres. Serving Hamilton, Burlington, Oakville, London, and Niagara since 1986. Top 25 CDN Solutions Provider.",
};

const services = [
  {
    title: "Managed IT Services",
    description:
      "End-user support, network monitoring, and infrastructure management with technicians in Canada and 24/7 coverage.",
    href: "/managed-it-services",
    category: "Managed IT",
  },
  {
    title: "Cloud Solutions",
    description:
      "Microsoft 365, Azure, hybrid cloud, and Teams deployment, fully managed and tailored to your business needs.",
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
              <p className="text-4xl font-bold text-white tracking-tight"><CountUp end={100} suffix="+" /></p>
              <p className="text-xs text-white/40 mt-2 uppercase tracking-widest">Industries</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-white tracking-tight"><CountUp end={12000} suffix="+" /></p>
              <p className="text-xs text-white/40 mt-2 uppercase tracking-widest">Endpoints Managed</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-white tracking-tight"><CountUp end={6500} suffix="+" /></p>
              <p className="text-xs text-white/40 mt-2 uppercase tracking-widest">Endpoints Protected</p>
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
            <h2 className="text-3xl font-bold text-foreground mb-5">
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

      <SectionAngle from="#ffffff" to="#071e3d" flip={true} height={64} />

      {/* Testimonials — navy with dark glass cards */}
      <section className="bg-[#071e3d] py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="text-xs font-semibold text-[#06b6d4] uppercase tracking-widest mb-4">Client Stories</p>
            <h2 className="text-3xl font-bold text-white mb-5">
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

      <SectionAngle from="#071e3d" to="#f0f7ff" flip={false} height={64} />

      {/* Latest Insights — light blue */}
      <section className="bg-[#f0f7ff] py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <BlogCards
              title="Latest Insights"
              subtitle="IT expertise and industry updates from the Audcomp team"
              cards={latestPosts}
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
