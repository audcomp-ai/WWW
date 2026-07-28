import Link from "next/link";
import { Calendar, Clock, Mic, ArrowRight } from "lucide-react";
import { summit, agenda } from "@/data/security-summit";

// Rendered statically, like components/Hero.tsx. This is above-the-fold content,
// so it must not be gated behind a JS entrance animation — the global
// prefers-reduced-motion rule in globals.css only neutralises CSS animations,
// which would leave a framer-motion `initial={{ opacity: 0 }}` stuck at zero.

export default function SecuritySummitHero() {
  return (
    <section className="relative overflow-hidden bg-[#071e3d] pt-32 pb-24 md:pt-40 md:pb-28 px-4">
      {/* Background image + navy wash */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/cyber_security_hero.png)" }}
      />
      <div className="absolute inset-0 z-0 bg-[#071e3d]/85" />

      {/* Brand glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-[#06b6d4]/20 to-transparent rounded-full blur-3xl opacity-50 transform translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#0071e3]/20 to-transparent rounded-full blur-3xl opacity-50 transform -translate-x-1/4 translate-y-1/4" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-16 items-center">
          <div>
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

            <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-xl">
              Audcomp is hosting a Security Summit with leaders in modern cyber
              defence. Criminals now use AI to write malware, automate entire
              attack campaigns and craft convincing phishing in minutes. Learn
              how to protect your business with modern, layered security built
              for an AI threat landscape.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-6 mb-10">
              <div className="flex items-center gap-3 text-white/80">
                <div className="w-10 h-10 rounded-full bg-white/[0.05] flex items-center justify-center border border-white/[0.1] shrink-0">
                  <Calendar className="w-4 h-4 text-[#06b6d4]" />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wider font-semibold">Date</p>
                  <p className="font-medium">{summit.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <div className="w-10 h-10 rounded-full bg-white/[0.05] flex items-center justify-center border border-white/[0.1] shrink-0">
                  <Clock className="w-4 h-4 text-[#06b6d4]" />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wider font-semibold">Schedule</p>
                  <p className="font-medium">10:30am Reg. · Keynote 11am · Ends 2pm</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <div className="w-10 h-10 rounded-full bg-white/[0.05] flex items-center justify-center border border-white/[0.1] shrink-0">
                  <Mic className="w-4 h-4 text-[#06b6d4]" />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wider font-semibold">Speakers</p>
                  <p className="font-medium">{summit.speakerCount} security experts</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href={summit.rsvpHref}
                className="bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(0,113,227,0.3)] hover:shadow-[0_0_30px_rgba(0,113,227,0.5)] hover:-translate-y-1 flex items-center gap-2"
              >
                RSVP Today
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href={summit.detailHref}
                className="border border-white/20 text-white/80 hover:text-white hover:bg-white/5 font-semibold px-8 py-4 rounded-full transition-all duration-300"
              >
                Event Details
              </Link>
            </div>
          </div>

          {/* Agenda card — mirrors the printed invitation */}
          <div className="rounded-2xl border border-white/[0.1] bg-white/[0.06] backdrop-blur-sm p-8 md:p-10">
            <p className="text-xs font-semibold text-[#06b6d4] uppercase tracking-widest mb-6">
              Agenda
            </p>
            <ul className="space-y-5 mb-8">
              {agenda.map((item) => (
                <li key={item.time} className="flex items-baseline gap-4">
                  <span className="text-sm font-bold text-white w-24 shrink-0 tabular-nums">
                    {item.time}
                  </span>
                  <span className="text-white/60">{item.label}</span>
                </li>
              ))}
            </ul>
            <div className="pt-6 border-t border-white/[0.08]">
              <p className="text-white/60 text-sm">
                <span className="font-bold text-white">{summit.speakerCount} speakers</span>{" "}
                from Audcomp, Field Effect, Hornetsecurity and more.
              </p>
              <p className="text-white/55 text-xs mt-3">
                Contact your dedicated Account Manager to RSVP, or email{" "}
                <a href={summit.rsvpHref} className="text-[#38bdf8] hover:underline">
                  sales@audcomp.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
