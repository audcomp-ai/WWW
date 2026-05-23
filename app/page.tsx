import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Audcomp | Trusted IT Consulting Services in Canada",
  description:
    "Audcomp has been empowering businesses across Hamilton, Ancaster, and beyond since 1986. Top 25 CDN Solutions Provider with 100% Canadian engineers and 24/7 support.",
};

const services = [
  {
    icon: "🖥️",
    title: "Managed IT Services",
    description:
      "End-user support, network monitoring, and infrastructure management with 100% Canadian engineers and 24/7 coverage.",
    href: "/managed-it-services",
  },
  {
    icon: "☁️",
    title: "Cloud Solutions",
    description:
      "Microsoft 365, Azure, hybrid cloud, and Teams deployment — fully managed and tailored to your business needs.",
    href: "/cloud-solutions",
  },
  {
    icon: "🔒",
    title: "Cyber Security",
    description:
      "Endpoint protection, SOC & MDR, penetration testing, dark web monitoring, and security awareness training.",
    href: "/security-services",
  },
  {
    icon: "💼",
    title: "Professional Services",
    description:
      "Virtual CIO, IT consulting and design, implementation, migration, and structured cabling expertise.",
    href: "/professional-services",
  },
  {
    icon: "🤖",
    title: "AI Services",
    description:
      "Microsoft Copilot enablement, AI readiness assessments, data governance, and tailored AI roadmaps.",
    href: "/ai-services",
  },
  {
    icon: "🛒",
    title: "IT Procurement",
    description:
      "Tier 1 and Tier 2 manufacturer partnerships, \"Try and Buy\" demo program, and full hardware lifecycle support.",
    href: "/it-procurement",
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

const stats = [
  { value: "39+", label: "Years in Business" },
  { value: "Top 25", label: "CDN Solutions Provider" },
  { value: "100%", label: "Canadian Engineers & Data Centers" },
  { value: "24/7", label: "Monitoring & Support" },
];

export default function Home() {
  return (
    <>
      <Hero
        title="Trusted IT Consulting Services in Canada"
        subtitle="39+ years empowering businesses across Hamilton, Ancaster, and beyond. Your IT partner — not just your provider."
        ctaText="Get a Free Assessment"
        ctaHref="/contact"
        secondaryCtaText="View Our Services"
        secondaryCtaHref="/managed-it-services"
      />

      {/* Stats Bar */}
      <section className="bg-[#003d7a] py-8">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
              <p className="text-sm text-blue-200 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1a1a2e] mb-4">
              Comprehensive IT Solutions
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
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
      <section className="bg-white py-20 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-[#1a1a2e] mb-6">
              More Than a Service Provider. Your Partner.
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Our mission is to empower businesses to operate confidently and more efficiently by providing tailored IT solutions. Our team of dedicated professionals is committed to developing and implementing reliable, cost-effective solutions for businesses of all sizes — no matter the scope of the need.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Founded in 1986 at McMaster University by Gary Sohal, Audcomp has grown to become the largest MSP in the Hamilton/Ancaster region and has ranked in the top 25 of CDN&apos;s Top 100 Solutions Providers for over a decade.
            </p>
            <Link
              href="/our-story"
              className="inline-flex items-center gap-2 text-[#0056a8] font-semibold hover:underline"
            >
              Our Story
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: "🏥", label: "Healthcare" },
              { icon: "🏛️", label: "Municipalities" },
              { icon: "🎓", label: "Universities" },
              { icon: "🏭", label: "Manufacturing" },
              { icon: "🏢", label: "Enterprise" },
              { icon: "💼", label: "SMB" },
            ].map((v) => (
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

      {/* Testimonials */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1a1a2e] mb-4">
              What Our Clients Say
            </h2>
            <p className="text-gray-600 text-lg">
              Trusted by businesses across the Hamilton region and beyond.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm"
              >
                <div className="text-[#0056a8] text-4xl leading-none mb-4">&ldquo;</div>
                <p className="text-gray-700 leading-relaxed mb-6 text-sm">{t.quote}</p>
                <div>
                  <p className="font-semibold text-[#1a1a2e]">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Teaser */}
      <section className="bg-[#1a1a2e] py-16 px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="text-5xl">📋</div>
          <div className="flex-1">
            <p className="text-blue-300 text-sm font-semibold uppercase tracking-wider mb-2">
              Case Study
            </p>
            <h3 className="text-2xl font-bold text-white mb-3">
              Healthcare Cybersecurity Recovery
            </h3>
            <p className="text-gray-400 leading-relaxed">
              A public-sector healthcare organization hit by a cyberattack in 2024 was fully operational within two weeks — critical services restored within two business days — thanks to Audcomp&apos;s rapid incident response.
            </p>
          </div>
          <Link
            href="/case-study"
            className="shrink-0 bg-[#0056a8] text-white font-semibold px-6 py-3 rounded-md hover:bg-[#003d7a] transition-colors"
          >
            Read the Case Study
          </Link>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
