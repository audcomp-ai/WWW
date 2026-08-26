import type { Metadata } from "next";
import CTABanner from "@/components/CTABanner";
import { SectionAngle } from "@/components/SectionAngle";
import { AnimatedSection, StaggeredSection, StaggeredItem } from "@/components/AnimatedSection";
import SecuritySummitHero from "@/components/events/SecuritySummitHero";
import HorizontalScrollGallery from "@/components/events/HorizontalScrollGallery";
import { CalendarDays, Video, ArrowRight } from "lucide-react";
import Link from "next/link";
import { summit } from "@/data/security-summit";

export const metadata: Metadata = {
  title: "Events & Webinars | Audcomp",
  description:
    "Join Audcomp at our Modern Cyber Security Summit on September 22, 2026, and explore our library of technical webinars and cyber security roundtables.",
};

const upcomingWebinars = [
  {
    // Pulled from data/security-summit.ts rather than retyped, so the card can
    // never drift from the hero and the detail page.
    id: "summit",
    title: summit.title,
    date: `Save the Date · ${summit.dateShort}`,
    time: summit.schedule,
    type: "Flagship Summit",
    desc: `${summit.tagline}. Keynotes, technology partners, and a working session on what AI changes about attacks and defence, and what it doesn't.`,
    href: summit.detailHref,
    limited: true,
  },
  {
    id: "w2",
    title: "Data Governance in the AI Era",
    date: "September 10, 2026",
    time: "2:00 PM EST",
    type: "Virtual Workshop",
    desc: "AI is only as trustworthy as the data it runs on. This workshop covers data residency, PIPEDA compliance, access controls, and building a governance framework your organization can stand behind.",
    href: "/contact",
    limited: true,
  },
  {
    id: "w3",
    title: "Security & Breach Response in the Age of AI",
    date: "November 5, 2026",
    time: "11:00 AM EST",
    type: "Panel Discussion",
    desc: "AI is changing how attacks happen, and how you respond. Our SOC experts walk through real breach scenarios, AI-assisted threat detection, and the new playbook every Canadian business needs.",
    href: "/contact",
    limited: true,
  },
];

export default function EventsPage() {
  return (
    <>
      <SecuritySummitHero />

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
            <h2 className="text-3xl font-bold text-foreground">
              Virtual Events & Webinars
            </h2>
          </AnimatedSection>

          <StaggeredSection className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingWebinars.map((webinar) => (
              <StaggeredItem key={webinar.id}>
                <div className="group relative bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-[0_20px_40px_-15px_rgba(0,113,227,0.15)] hover:border-blue-200 transition-all duration-500 hover:-translate-y-2 h-full flex flex-col">

                  <div className="flex justify-between items-start mb-6">
                    <div className="flex flex-col gap-1.5">
                      <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium w-fit">
                        {webinar.type}
                      </span>
                      {webinar.limited && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-semibold w-fit">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                          Seats Limited
                        </span>
                      )}
                    </div>
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
                    Book Your Seat
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
