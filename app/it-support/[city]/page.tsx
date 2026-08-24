import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CTABanner from "@/components/CTABanner";
import { SectionAngle } from "@/components/SectionAngle";
import { AnimatedSection, StaggeredSection, StaggeredItem } from "@/components/AnimatedSection";
import ServiceCard from "@/components/ServiceCard";

const cities = ["hamilton", "burlington", "oakville", "london", "niagara"];

export function generateStaticParams() {
  return cities.map((city) => ({
    city: city,
  }));
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

type Props = {
  params: Promise<{ city: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const cityName = capitalize(city);

  return {
    title: `IT Support & Consulting in ${cityName} | Audcomp`,
    description: `Audcomp delivers managed IT, cloud, and cyber security to ${cityName} businesses with technicians in Canada and 24/7 support. Top 25 CDN Solutions Provider.`,
  };
}

export default async function LocalItSupportPage({ params }: Props) {
  const { city } = await params;
  const cityName = capitalize(city);

  const services = [
    {
      title: "Managed IT Services",
      description: `Comprehensive end-user support and infrastructure management tailored for ${cityName} businesses.`,
      href: "/managed-it-services",
      category: "Managed IT",
    },
    {
      title: "Cyber Security",
      description: "Endpoint protection, SOC & MDR, and penetration testing to keep your operations secure.",
      href: "/security-services",
      category: "Security",
    },
    {
      title: "Cloud Solutions",
      description: "Microsoft 365, Azure, and hybrid cloud deployment fully managed by our technicians in Canada.",
      href: "/cloud-solutions",
      category: "Cloud",
    },
  ];

  return (
    <>
      <Hero
        title={`IT Support in ${cityName}, From Technicians in Canada`}
        subtitle={`Keeping ${cityName} businesses running with less downtime and predictable IT since 1986, technicians in Canada, Canadian data centres, and 24/7 support.`}
        ctaText="Get a Free Assessment"
        ctaHref="/contact"
        backgroundImage="/images/managed_it_hero.png"
      />

      <section className="bg-white py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="text-xs font-semibold text-[#06b6d4] uppercase tracking-widest mb-4">Our Services</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#0a2540] mb-5 tracking-tight">
              Enterprise IT for {cityName}
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
              From day-to-day help desk support to complex cloud migrations, we deliver scalable solutions tailored to the local market.
            </p>
          </AnimatedSection>
          <StaggeredSection className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {services.map((service) => (
              <StaggeredItem key={service.href}>
                <ServiceCard {...service} variant="light" />
              </StaggeredItem>
            ))}
          </StaggeredSection>
        </div>
      </section>

      <SectionAngle from="#ffffff" to="#f0f7ff" flip={true} height={64} />

      <section className="bg-[#f0f7ff] py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <p className="text-xs font-semibold text-[#0071e3] uppercase tracking-widest mb-5">Why Choose Audcomp</p>
            <h2 className="text-4xl font-bold text-[#0a2540] mb-8 tracking-tight leading-tight">
              Local Accountability.<br />National Scale.
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-6">
              Unlike global providers that route your support tickets overseas, Audcomp gives {cityName} businesses the best of both worlds: the resources of a Top 25 CDN Solutions Provider, powered by technicians in Canada.
            </p>
            <p className="text-slate-500 text-lg leading-relaxed">
              When your network goes down, you need a partner who understands your business environment and can respond immediately. Our local presence ensures you get the rapid, accountable support your operations demand.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <SectionAngle from="#f0f7ff" to="#071e3d" flip={false} height={64} />

      <CTABanner
        title={`Ready to upgrade your IT in ${cityName}?`}
        subtitle="Contact our team today to discuss how we can secure and optimize your infrastructure."
      />
    </>
  );
}
