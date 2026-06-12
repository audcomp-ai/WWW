import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CTABanner from "@/components/CTABanner";
import { SectionAngle } from "@/components/SectionAngle";
import { AnimatedSection, StaggeredSection, StaggeredItem } from "@/components/AnimatedSection";
import FeaturedEvent from "@/components/events/FeaturedEvent";
import HorizontalScrollGallery from "@/components/events/HorizontalScrollGallery";
import { CalendarDays, Video, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Events & Webinars | Audcomp",
  description:
    "Join Audcomp at our upcoming events, including Meet the Moment, and explore our library of technical webinars and cyber security roundtables.",
};

const upcomingWebinars = [
  {
    id: "w1",
    title: "Navigating Copilot for Microsoft 365",
    date: "November 12, 2024",
    time: "1:00 PM EST",
    type: "Live Webinar",
    desc: "Discover how to prepare your data environment and securely deploy Microsoft Copilot across your organization.",
    href: "#",
  },
  {
    id: "w2",
    title: "The Zero Trust Journey",
    date: "December 05, 2024",
    time: "2:00 PM EST",
    type: "Virtual Workshop",
    desc: "A technical deep dive into implementing Zero Trust architecture using Fortinet and Microsoft Defender.",
    href: "#",
  },
  {
    id: "w3",
    title: "State of Canadian Cyber Security 2025",
    date: "January 18, 2025",
    time: "11:00 AM EST",
    type: "Panel Discussion",
    desc: "Join our SOC experts as they discuss the emerging threat landscape and compliance requirements for Canadian businesses.",
    href: "#",
  },
];

export default function EventsPage() {
  return (
    <>
      <Hero
        title="Audcomp Events"
        subtitle="Connect with our engineers, partner vendors, and industry peers to discover the technology shaping the future of business."
        variant="dark"
        backgroundImage="/images/managed_it_hero.png"
      />

      <FeaturedEvent />

      <SectionAngle from="#071e3d" to="#f8fafc" flip={false} height={64} />

      {/* Upcoming Webinars */}
      <section className="bg-slate-50 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Video className="w-5 h-5 text-[#0071e3]" />
              </div>
              <p className="text-xs font-semibold text-[#0071e3] uppercase tracking-widest">Upcoming</p>
            </div>
            <h2 className="text-4xl font-bold text-[#0a2540] tracking-tight">
              Virtual Events & Webinars
            </h2>
          </AnimatedSection>

          <StaggeredSection className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingWebinars.map((webinar) => (
              <StaggeredItem key={webinar.id}>
                <div className="group relative bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-[0_20px_40px_-15px_rgba(0,113,227,0.15)] hover:border-blue-200 transition-all duration-500 hover:-translate-y-2 h-full flex flex-col">
                  
                  <div className="flex justify-between items-start mb-6">
                    <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                      {webinar.type}
                    </span>
                    <div className="text-right">
                      <p className="text-sm font-bold text-[#0071e3]">{webinar.date}</p>
                      <p className="text-xs text-slate-500 mt-0.5 flex items-center justify-end gap-1">
                        <CalendarDays className="w-3 h-3" /> {webinar.time}
                      </p>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-[#0a2540] mb-4 group-hover:text-[#0071e3] transition-colors line-clamp-2">
                    {webinar.title}
                  </h3>
                  
                  <p className="text-sm text-slate-500 leading-relaxed mb-8 flex-grow">
                    {webinar.desc}
                  </p>
                  
                  <Link 
                    href={webinar.href}
                    className="inline-flex items-center justify-center w-full py-3 rounded-xl bg-slate-50 text-[#0071e3] font-semibold border border-slate-200 group-hover:bg-[#0071e3] group-hover:text-white group-hover:border-[#0071e3] transition-all duration-300 gap-2"
                  >
                    Register Now
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </StaggeredItem>
            ))}
          </StaggeredSection>
        </div>
      </section>

      <HorizontalScrollGallery />

      <SectionAngle from="#ffffff" to="#071e3d" flip={false} height={64} />

      <CTABanner
        title="Never Miss an Update"
        subtitle="Subscribe to our newsletter to receive invitations to our exclusive events, webinars, and technical workshops."
      />
    </>
  );
}
