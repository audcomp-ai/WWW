"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";

const slides = [
  {
    id: 1,
    type: "image" as const,
    badge: null,
    headline: "Enterprise-grade IT, run by technicians in Canada",
    subheadline:
      "Managed IT, cybersecurity, and cloud for Ontario businesses, proactively monitored 24/7, hosted in Canadian data centres, and delivered by the same team that's kept clients running since 1986.",
    cta1Text: "Get a Free Assessment",
    cta1Href: "/contact",
    cta2Text: "View Our Services",
    cta2Href: "/managed-it-services",
    bg: "image",
  },
  {
    id: 2,
    type: "video" as const,
    badge: "AI Workforce",
    headline: "The Modern Workforce Is Already Here",
    subheadline:
      "Custom AI agents that work alongside your team, scored to your readiness, sequenced by ROI, deployed in weeks.",
    cta1Text: "Start Your AI Assessment",
    cta1Href: "/ai-services",
    cta2Text: "Learn More",
    cta2Href: "/ai-services",
    bg: "video",
  },
  {
    id: 3,
    type: "image" as const,
    badge: "Cyber Security",
    headline: "Protect What Matters Most",
    subheadline:
      "Multi-layered security, endpoint protection, SOC & MDR, penetration testing, and 24/7 monitoring, so your business stays resilient.",
    cta1Text: "Get a Security Assessment",
    cta1Href: "/security-services",
    cta2Text: "View Security Services",
    cta2Href: "/security-services",
    bg: "cyber",
  },
];

const textVariants: Variants = {
  enter: { opacity: 0, y: 20 },
  center: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.4, ease: "easeIn" },
  },
};

const badgeVariants: Variants = {
  enter: { opacity: 0, scale: 0.92 },
  center: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut", delay: 0.1 },
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
};

export default function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 5000);
  };

  const clearCurrentInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (!paused) startInterval();
    return () => clearCurrentInterval();
  }, [paused]);

  const goToSlide = (index: number) => {
    setActive(index);
    clearCurrentInterval();
    if (!paused) startInterval();
  };

  const slide = slides[active];

  return (
    <div
      className="relative overflow-hidden"
      style={{ height: "92vh", minHeight: "600px" }}
      onMouseEnter={() => { setPaused(true); clearCurrentInterval(); }}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Slide 1 background: datacenter image ── */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${active === 0 ? "opacity-100" : "opacity-0"}`}
      >
        <img
          src="/hero-datacenter.jpeg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/80" />
      </div>

      {/* ── Slide 2 background: video ── */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${active === 1 ? "opacity-100" : "opacity-0"}`}
      >
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay muted loop playsInline preload="auto"
        >
          <source src="https://aiaudit.audcomp.ai/Videos/Agent_intro-web.webm" type="video/webm" />
          <source src="https://aiaudit.audcomp.ai/Videos/Agent_intro-web.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-black/85" />
      </div>

      {/* ── Slide 3 background: cyber ── */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${active === 2 ? "opacity-100" : "opacity-0"}`}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/cyber_security_hero.png')" }}
        />
        <div className="absolute inset-0 bg-[#080c14]/85 backdrop-blur-[1px]" />
        {/* Scan line effect */}
        {active === 2 && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent shadow-[0_0_12px_2px_rgba(34,211,238,0.3)]"
              initial={{ top: "-5%" }}
              animate={{ top: "105%" }}
              transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#22d3ee08_1px,transparent_1px),linear-gradient(to_bottom,#22d3ee08_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_20%,transparent_100%)]" />
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-cyan-400/80 shadow-[0_0_8px_2px_rgba(34,211,238,0.6)]"
                style={{ left: `${10 + i * 9}%` }}
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "-10%", opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 12 + i * 1.5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.8,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Centered text content (animated per slide) ── */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <div className="max-w-4xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div key={`content-${active}`}>
              {/* Badge */}
              {slide.badge && (
                <motion.div
                  variants={badgeVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="inline-flex items-center gap-1.5 bg-white/[0.08] border border-white/[0.15] backdrop-blur-sm text-white/80 text-[11px] font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2997ff] inline-block" />
                  {slide.badge}
                </motion.div>
              )}

              {/* Headline */}
              <motion.h1
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6"
              >
                {slide.headline}
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ delay: 0.08 }}
                className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed mb-10"
              >
                {slide.subheadline}
              </motion.p>

              {/* CTAs */}
              <motion.div
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ delay: 0.15 }}
                className="flex flex-col sm:flex-row gap-3 justify-center"
              >
                <Link
                  href={slide.cta1Href}
                  className="bg-[#0071e3] hover:bg-[#0077ed] text-white px-8 py-3.5 rounded-full font-medium transition-colors duration-200 text-sm"
                >
                  {slide.cta1Text}
                </Link>
                <Link
                  href={slide.cta2Href}
                  className="border border-white/25 hover:border-white/50 text-white/80 hover:text-white px-8 py-3.5 rounded-full font-medium backdrop-blur-sm transition-all duration-200 text-sm"
                >
                  {slide.cta2Text}
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Progress bar indicators (Apple-style) ── */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className="relative h-[3px] rounded-full overflow-hidden transition-all duration-300"
            style={{ width: active === index ? "32px" : "20px" }}
          >
            <span className="absolute inset-0 bg-white/20 rounded-full" />
            {active === index && (
              <motion.span
                className="absolute inset-0 bg-white rounded-full"
                layoutId="indicator"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </div>
  );
}
