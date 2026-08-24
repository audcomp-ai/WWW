import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Clock, Mic, Check, ArrowRight } from "lucide-react";
import CountUp from "@/components/CountUp";
import PartnerLogo from "@/components/PartnerLogo";
import { SectionAngle } from "@/components/SectionAngle";
import RsvpLink from "./RsvpLink";
import { AnimatedSection, StaggeredSection, StaggeredItem } from "@/components/AnimatedSection";
import {
  summit,
  agenda,
  threatStats,
  reasonsToAttend,
  summitVendors,
  cooQuote,
} from "@/data/security-summit";

export const metadata: Metadata = {
  title: "Modern Cyber Security Summit, September 22, 2026 | Audcomp",
  description:
    "Audcomp's Security Summit on defending business in the age of AI. September 22, 2026, keynotes, an interactive panel, and security specialists from Field Effect, Hornetsecurity and more.",
};

export default function SecuritySummitPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#071e3d] pt-32 pb-24 md:pt-40 md:pb-28 px-4">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/images/cyber_security_hero.png)" }}
        />
        <div className="absolute inset-0 z-0 bg-[#071e3d]/85" />
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-[#06b6d4]/20 to-transparent rounded-full blur-3xl opacity-50 transform translate-x-1/3 -translate-y-1/4" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0071e3]/20 border border-[#0071e3]/30 text-[#38bdf8] text-xs font-semibold tracking-widest uppercase mb-6">
            <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse" />
            Save the Date · {summit.dateShort}
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.05] mb-6">
            {summit.title}
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#06b6d4] to-[#0071e3]">
              {summit.tagline}
            </span>
          </h1>

          <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Learn how to protect your business with modern, layered cyber
            security built for an AI threat landscape.
          </p>

          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 mb-10 text-white/80 text-sm">
            <span className="inline-flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#06b6d4]" /> {summit.date}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#06b6d4]" /> {summit.schedule}
            </span>
            <span className="inline-flex items-center gap-2">
              <Mic className="w-4 h-4 text-[#06b6d4]" /> {summit.speakerCount} speakers
            </span>
          </div>

          {/* Both actions sit in the hero. The calendar file was only offered
              in the RSVP section 84% of the way down a 4,700px page, so anyone
              deciding at the top never saw it. */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <RsvpLink
              href={summit.rsvpHref}
              calendarHref={summit.calendarHref}
              className="inline-flex items-center gap-2 bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(0,113,227,0.3)] hover:shadow-[0_0_30px_rgba(0,113,227,0.5)] hover:-translate-y-1"
            >
              RSVP Today
              <ArrowRight className="w-4 h-4" />
            </RsvpLink>
            <a
              href={summit.calendarHref}
              download
              className="inline-flex items-center gap-2 border border-white/30 bg-white/[0.06] backdrop-blur-sm text-white/85 hover:text-white hover:border-white/60 hover:bg-white/[0.14] font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:-translate-y-1"
            >
              <Calendar className="w-4 h-4" />
              Add to Calendar
            </a>
          </div>
        </div>
      </section>

      {/* Threat landscape */}
      <section className="bg-white py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="max-w-3xl mb-16">
            <p className="text-xs font-semibold text-[#06b6d4] uppercase tracking-widest mb-4">
              The Threat Landscape
            </p>
            <h2 className="text-4xl font-bold text-[#0a2540] tracking-tight mb-6">
              Cybercrime has entered a new era
            </h2>
            <p className="text-slate-500 leading-relaxed mb-4">
              Criminals now use AI to write malware, automate entire attack
              campaigns and craft convincing phishing in minutes. AI-related risk
              was named the fastest-growing cyber threat by 87% of security
              leaders.
            </p>
            <p className="text-slate-500 leading-relaxed">
              Phishing remains the #1 way attackers get in. Roughly 3.4 billion
              phishing emails are sent every day, 82.6% now AI-generated, driving over $25 billion in annual losses. For small and mid-sized
              businesses the danger is no longer just big-enterprise headlines:
              AI lets even low-skill attackers move through a network faster than
              most IT teams can respond.
            </p>
          </AnimatedSection>

          <StaggeredSection className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {threatStats.map((stat) => (
              <StaggeredItem key={stat.label}>
                <div className="h-full bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <p className="text-5xl font-bold text-[#0071e3] tracking-tight mb-4">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-sm text-slate-500 leading-relaxed">{stat.label}</p>
                </div>
              </StaggeredItem>
            ))}
          </StaggeredSection>

          <AnimatedSection className="mt-10">
            <p className="text-sm text-slate-400">
              With the fastest recorded breakout time down to just 27 seconds,
              the window to catch an intrusion has never been smaller.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <SectionAngle from="#ffffff" to="#f8fafc" flip={false} height={64} />

      {/* Reasons to attend */}
      <section className="bg-slate-50 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="mb-14">
            <p className="text-xs font-semibold text-[#06b6d4] uppercase tracking-widest mb-4">
              Reasons to Attend
            </p>
            <h2 className="text-4xl font-bold text-[#0a2540] tracking-tight">
              What you&apos;ll take away
            </h2>
          </AnimatedSection>

          <StaggeredSection className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">
            {reasonsToAttend.map((reason) => (
              <StaggeredItem key={reason}>
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-[#0071e3]" />
                  </div>
                  <p className="text-slate-600 leading-relaxed">{reason}</p>
                </div>
              </StaggeredItem>
            ))}
          </StaggeredSection>
        </div>
      </section>

      <SectionAngle from="#f8fafc" to="#071e3d" flip={false} height={64} />

      {/* Agenda + quote */}
      <section
        className="relative py-24 px-4 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #071e3d 0%, #0d2d55 50%, #071e3d 100%)" }}
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="w-[700px] h-[400px] rounded-full opacity-20"
            style={{ background: "radial-gradient(ellipse, #06b6d4 0%, transparent 70%)" }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="rounded-2xl border border-white/[0.1] bg-white/[0.06] backdrop-blur-sm p-8 md:p-10">
            <p className="text-xs font-semibold text-[#06b6d4] uppercase tracking-widest mb-6">
              Agenda
            </p>
            <ul className="space-y-5">
              {agenda.map((item) => (
                <li key={item.time} className="flex items-baseline gap-4">
                  <span className="text-sm font-bold text-white w-24 shrink-0 tabular-nums">
                    {item.time}
                  </span>
                  <span className="text-white/60">{item.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/[0.1] bg-white/[0.06] backdrop-blur-sm p-8 md:p-10 flex flex-col justify-between">
            <blockquote className="text-white/65 text-base leading-relaxed">
              &ldquo;{cooQuote.quote}&rdquo;
            </blockquote>
            <footer className="mt-8 pt-5 border-t border-white/[0.08]">
              <p className="font-semibold text-white text-sm">{cooQuote.author}</p>
              <p className="text-xs text-white/40 mt-0.5">{cooQuote.title}</p>
            </footer>
          </div>
        </div>
      </section>

      <SectionAngle from="#071e3d" to="#ffffff" flip={false} height={64} />

      {/* Vendor lineup */}
      <section className="bg-white py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <p className="text-xs font-semibold text-[#06b6d4] uppercase tracking-widest mb-4">
              Featuring Security Specialists From
            </p>
            <h2 className="text-4xl font-bold text-[#0a2540] tracking-tight">
              Who you&apos;ll hear from
            </h2>
          </AnimatedSection>

          <StaggeredSection className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {summitVendors.map((vendor) => (
              <StaggeredItem key={vendor.name}>
                <PartnerLogo {...vendor} />
              </StaggeredItem>
            ))}
          </StaggeredSection>

          <AnimatedSection className="text-center mt-8">
            <p className="text-sm text-slate-400 italic">&amp; more security vendors</p>
          </AnimatedSection>
        </div>
      </section>

      <SectionAngle from="#ffffff" to="#071e3d" flip={false} height={64} />

      {/* RSVP */}
      <section
        className="relative py-32 px-4 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #071e3d 0%, #0d2d55 50%, #071e3d 100%)" }}
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="w-[700px] h-[400px] rounded-full opacity-20"
            style={{ background: "radial-gradient(ellipse, #06b6d4 0%, transparent 70%)" }}
          />
        </div>

        <div className="relative max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold text-[#06b6d4] uppercase tracking-widest mb-5">
            Save the Date
          </p>
          <h2 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6 text-gradient-dark">
            RSVP Today
          </h2>
          <p className="text-white/55 text-lg mb-4 leading-relaxed max-w-xl mx-auto">
            {summit.date} · {summit.schedule}
          </p>
          <p className="text-white/55 text-lg mb-12 leading-relaxed max-w-xl mx-auto">
            Contact your dedicated Account Manager today to reserve your seat.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <RsvpLink
              href={summit.rsvpHref}
              calendarHref={summit.calendarHref}
              className="bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium px-8 py-3.5 rounded-full transition-colors duration-200 text-sm"
            >
              sales@audcomp.com
            </RsvpLink>
            {/* download forces a save rather than the browser trying to render
                the calendar file inline. */}
            <a
              href={summit.calendarHref}
              download
              className="inline-flex items-center justify-center gap-2 border border-white/25 text-white/75 hover:text-white hover:border-white/50 font-medium px-8 py-3.5 rounded-full transition-all duration-200 text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3M3 11h18M5 5h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
              </svg>
              Add to Calendar
            </a>
            <a
              href="tel:9053041775"
              className="border border-white/25 text-white/75 hover:text-white hover:border-white/50 font-medium px-8 py-3.5 rounded-full transition-all duration-200 text-sm"
            >
              905-304-1775
            </a>
            <Link
              href="/events"
              className="border border-white/25 text-white/75 hover:text-white hover:border-white/50 font-medium px-8 py-3.5 rounded-full transition-all duration-200 text-sm"
            >
              All Events
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
