import type { Metadata } from "next";
import Link from "next/link";
import HeroCarousel from "@/components/HeroCarousel";
import ServiceCard from "@/components/ServiceCard";
import CTABanner from "@/components/CTABanner";
import CountUp from "@/components/CountUp";

export const metadata: Metadata = {
  title: "Audcomp | Trusted IT Consulting Services in Canada",
  description:
    "Audcomp has been empowering businesses across Hamilton, Ancaster, and beyond since 1986. Top 25 CDN Solutions Provider with 100% Canadian engineers and 24/7 support.",
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
    name: "Jeff",
    title: "COO",
  },
  {
    quote:
      "I am very impressed with the service I receive from Audcomp. Their commitment to excellence is evident in every product we've purchased, and their knowledgeable and friendly team ensures a seamless experience.",
    name: "Jen",
    title: "VP of Information Technology",
  },
  {
    quote:
      "We chose Audcomp as our partner for IT Managed Service back in 2018 and would recommend Audcomp to any business looking for a reliable and effective Managed Service Provider.",
    name: "Kellie",
    title: "President and CEO",
  },
];

const verticals = [
  "Healthcare",
  "Municipalities",
  "Universities",
  "Manufacturing",
  "Enterprise",
  "SMB",
];

export default function Home() {
  return (
    <>
      <HeroCarousel />

      {/* Stats Bar */}
      <section className="bg-card border-b border-border py-14 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold text-foreground">
              <CountUp end={40} suffix="+" />
            </p>
            <p className="text-sm text-muted-foreground mt-2">Years in Business</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-foreground">Top 25</p>
            <p className="text-sm text-muted-foreground mt-2">CDN Solutions Provider</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-foreground">
              <CountUp end={100} suffix="%" />
            </p>
            <p className="text-sm text-muted-foreground mt-2">Canadian Engineers &amp; Data Centers</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-foreground">24/7</p>
            <p className="text-sm text-muted-foreground mt-2">Monitoring &amp; Support</p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-muted py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 tracking-tight">
              Comprehensive IT Solutions
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              From day-to-day support to strategic planning, Audcomp delivers tailored IT solutions for businesses of all sizes.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.href} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-card py-24 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 tracking-tight leading-tight">
              More Than a Service Provider. Your Partner.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6 text-lg">
              Our mission is to empower businesses to operate confidently and more efficiently by providing tailored IT solutions. Our team of dedicated professionals is committed to developing and implementing reliable, cost-effective solutions for businesses of all sizes — no matter the scope of the need.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-10 text-lg">
              Founded in 1986 at McMaster University by Gary Sohal, Audcomp has grown to become the largest MSP in the Hamilton/Ancaster region and has ranked in the top 25 of CDN&apos;s Top 100 Solutions Providers for over a decade.
            </p>
            <Link
              href="/our-story"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
            >
              Our Story
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {verticals.map((label) => (
              <div
                key={label}
                className="bg-muted border border-border rounded-xl p-4 text-center hover:shadow-md transition-all"
              >
                <p className="font-medium text-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-muted py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 tracking-tight">
              What Our Clients Say
            </h2>
            <p className="text-muted-foreground text-lg">
              Trusted by businesses across the Hamilton region and beyond.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-card rounded-2xl p-8 border border-border shadow-sm hover:shadow-lg transition-all duration-200"
              >
                <div className="text-primary text-5xl leading-none font-serif mb-4">&ldquo;</div>
                <p className="text-muted-foreground leading-relaxed mb-6">{t.quote}</p>
                <div>
                  <p className="font-bold text-foreground">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Callout */}
      <section className="bg-[#181E2C] py-24 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <span className="inline-block bg-primary text-white text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full mb-4">
              Case Study
            </span>
            <h3 className="text-3xl font-bold text-white mb-3">
              Healthcare Cybersecurity Recovery
            </h3>
            <p className="text-gray-400 leading-relaxed text-lg">
              A public-sector healthcare organization hit by a cyberattack in 2024 was fully operational within two weeks — critical services restored within two business days — thanks to Audcomp&apos;s rapid incident response.
            </p>
          </div>
          <Link
            href="/case-study"
            className="shrink-0 bg-primary text-white font-semibold px-8 py-4 rounded-full hover:brightness-110 transition-all shadow-md"
          >
            Read the Case Study
          </Link>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
