"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SHOW_BRAND_SLIDE } from "@/lib/hero-events";
import { motion, AnimatePresence, type Variants } from "framer-motion";

// How long each slide holds before the carousel moves on. The 0.7s crossfade
// runs inside this, so the still time is shorter than the number reads.
const SLIDE_MS = 3000;

// Agent_intro-web runs 5.042s. At the shared 3s hold you saw three seconds of
// it and, because it loops on its own clock, a different three seconds each
// time round. This slide holds for the whole thing instead, with a little over
// the end so the last frame is not clipped by the crossfade out.
const VIDEO_SLIDE_MS = 5200;

// The brand slide carries a logo and five links rather than a headline and a
// paragraph, so it is read in less time than the two that follow it.
const BRAND_SLIDE_MS = 2200;

const slides = [
  {
    id: 1,
    type: "brand" as const,
    badge: null,
    headline: "Audcomp Information Technology Solutions",
    subheadline: "",
    cta1Text: "",
    cta1Href: "",
    cta2Text: "",
    cta2Href: "",
    bg: "brand",
    hold: BRAND_SLIDE_MS,
  },
  {
    id: 2,
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
    id: 3,
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
    hold: VIDEO_SLIDE_MS,
  },
  {
    id: 4,
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

// Slides 2-4 lay their photo or video under navy rather than the 55-85% flat
// black they used to carry, which is what made them read as grey mud next to
// the brand slide. Two layers do the work: a bed dense enough to carry the
// copy, and a vignette so the edges meet the section below.
//
// The bed is wide and shallow on phones, where the copy runs nearly edge to
// edge over whatever the image happens to be doing, and tightens to an ellipse
// on larger screens where the text column is narrow and centred.
const TEXT_BED =
  "absolute inset-0 " +
  "bg-[radial-gradient(ellipse_150%_46%_at_50%_47%,rgba(7,30,61,0.93)_0%,rgba(7,30,61,0.74)_54%,transparent_88%)] " +
  "sm:bg-[radial-gradient(ellipse_60%_52%_at_50%_46%,rgba(7,30,61,0.74)_0%,rgba(7,30,61,0.44)_56%,transparent_82%)]";

const EDGE_VIGNETTE =
  "absolute inset-0 " +
  "bg-[radial-gradient(ellipse_88%_82%_at_50%_50%,transparent_48%,rgba(7,30,61,0.88)_100%)]";

// Category links per row on the brand slide; the rest centre on line two.
const BRAND_ROW_BREAK = 4;

// Seconds for one copy of the brand plate to travel from 1x to full push.
const PLATE_TRAVEL = 16;

// The brand slide routes into the same five categories the Services menu now
// carries, so the two never drift apart.
const brandLinks = [
  { label: "Managed IT", href: "/managed-it-services" },
  { label: "Cloud Solutions", href: "/cloud-solutions" },
  { label: "Cyber Security", href: "/security-services" },
  { label: "Professional Services", href: "/professional-services" },
  { label: "AI Services", href: "/ai-services" },
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
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (paused) return;
    const wait = slides[active].hold ?? SLIDE_MS;
    const id = setTimeout(
      () => setActive((prev) => (prev + 1) % slides.length),
      wait,
    );
    return () => clearTimeout(id);
  }, [active, paused]);

  // The video keeps its own clock whether or not its slide is showing, so
  // without this you join it wherever it happens to be rather than at the
  // start. play() can be refused, and there is nothing useful to do about it.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || slides[active].bg !== "video") return;
    video.currentTime = 0;
    video.play().catch(() => {});
  }, [active]);

  // Left and right arrows move between slides once the hero has focus.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      setActive((prev) => {
        const delta = e.key === "ArrowLeft" ? -1 : 1;
        return (prev + delta + slides.length) % slides.length;
      });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paused]);

  // The logo in the bar asks for the brand slide when it is clicked from the
  // homepage, where routing to "/" changes nothing on its own.
  useEffect(() => {
    const toBrandSlide = () => {
      const index = slides.findIndex((s) => s.type === "brand");
      if (index < 0) return;
      setActive(index);
    };
    window.addEventListener(SHOW_BRAND_SLIDE, toBrandSlide);
    return () => window.removeEventListener(SHOW_BRAND_SLIDE, toBrandSlide);
  }, [paused]);

  const goToSlide = (index: number) => setActive(index);

  // Wraps both ways, so back from the first slide lands on the last.
  const step = (delta: number) =>
    goToSlide((active + delta + slides.length) % slides.length);

  const slide = slides[active];

  return (
    <div
      className="relative overflow-hidden"
      style={{ height: "92vh", minHeight: "600px" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Background: datacenter photo ── */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${slide.bg === "image" ? "opacity-100" : "opacity-0"}`}
      >
        <img
          src="/hero-datacenter.jpeg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#071e3d]/24" />
        <div className={TEXT_BED} />
        <div className={EDGE_VIGNETTE} />
      </div>

      {/* ── Background: AI workforce video ── */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${slide.bg === "video" ? "opacity-100" : "opacity-0"}`}
      >
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay muted loop playsInline preload="auto"
        >
          <source src="https://aiaudit.audcomp.ai/Videos/Agent_intro-web.webm" type="video/webm" />
          <source src="https://aiaudit.audcomp.ai/Videos/Agent_intro-web.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#071e3d]/28" />
        <div className={TEXT_BED} />
        <div className={EDGE_VIGNETTE} />
      </div>

      {/* ── Background: cyber ── */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${slide.bg === "cyber" ? "opacity-100" : "opacity-0"}`}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/cyber_security_hero.png')" }}
        />
        <div className="absolute inset-0 bg-[#071e3d]/16" />
        <div className={TEXT_BED} />
        <div className={EDGE_VIGNETTE} />
        {slide.bg === "cyber" && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
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

      {/* ── Background: brand ──
          Each background is selected by slide.bg, not by a slide index, so the
          order above can change without silently pairing a slide with the
          wrong one. */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${slide.bg === "brand" ? "opacity-100" : "opacity-0"}`}
      >
        <div className="absolute inset-0 bg-[#071e3d]" />
        {/* A data centre aisle rather than an abstract field: it carries the
            same one-point perspective as the reference, and it is a picture of
            the work.

            Two copies of the plate run the same push half a cycle apart, each
            fading in as it starts and out as it ends. A single looping zoom has
            to snap back to 1x, and a reversing one pulls backwards down the
            corridor — it reads as breathing rather than travelling. Handing off
            between two copies keeps the camera moving forward without end. */}
        {[0, 1].map((layer) => (
          <motion.img
            key={layer}
            src="/images/hero-brand-datacenter.webp"
            alt=""
            aria-hidden="true"
            // First slide, so this plate is the LCP element.
            fetchPriority={layer === 0 ? "high" : "low"}
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: [1, 1.34], opacity: [0, 1, 1, 0] }}
            transition={{
              scale: {
                duration: PLATE_TRAVEL,
                ease: "linear",
                repeat: Infinity,
                delay: (layer * PLATE_TRAVEL) / 2,
              },
              opacity: {
                duration: PLATE_TRAVEL,
                ease: "linear",
                times: [0, 0.18, 0.7, 1],
                repeat: Infinity,
                delay: (layer * PLATE_TRAVEL) / 2,
              },
            }}
          />
        ))}
        {/* The aisle's vanishing point is a near-white blowout sitting exactly
            behind a white wordmark, so the centre is knocked well down before
            the navy tint and the edge vignette. */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_42%_40%_at_50%_50%,rgba(7,30,61,0.88)_8%,rgba(7,30,61,0.5)_46%,transparent_78%)]" />
        <div className="absolute inset-0 bg-[#071e3d]/28" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_82%_76%_at_50%_50%,transparent_46%,#071e3d_100%)]" />
      </div>

      {/* ── Centered text content (animated per slide) ── */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <div className="max-w-4xl mx-auto w-full">
          <AnimatePresence mode="wait">
            {slide.type === "brand" ? (
              <motion.div
                key={`content-${active}`}
                className="flex flex-col items-center"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 1.035, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12, transition: { duration: 0.4 } }}
                  transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="relative w-[min(78vw,700px)]"
                >
                  {/* The mark is a transparent grayscale PNG, so it needs no
                      recolouring to sit on navy. */}
                  <img
                    src="/audcomp-logo.png"
                    alt="Audcomp Information Technology Solutions"
                    className="relative w-full h-auto drop-shadow-[0_8px_32px_rgba(0,0,0,0.45)]"
                  />

                  {/* Specular sweep. The layer is masked by the logo itself, so
                      the light only ever appears on the letterforms and never
                      as a band crossing the background. */}
                  <motion.div
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      WebkitMaskImage: "url(/audcomp-logo.png)",
                      maskImage: "url(/audcomp-logo.png)",
                      WebkitMaskSize: "100% 100%",
                      maskSize: "100% 100%",
                      WebkitMaskRepeat: "no-repeat",
                      maskRepeat: "no-repeat",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {/* Once per slide entry, not looped. The content block is
                        keyed on the active index, so it replays each time the
                        slide comes back around. */}
                    <motion.div
                      className="absolute inset-y-0 w-1/3 bg-[linear-gradient(100deg,transparent,rgba(56,189,248,0.9),rgba(255,255,255,0.95),transparent)]"
                      initial={{ left: "-40%" }}
                      animate={{ left: "115%" }}
                      transition={{ duration: 1.4, delay: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    />
                  </motion.div>
                </motion.div>

                <div className="mt-12 flex flex-wrap items-center justify-center gap-x-9 gap-y-4">
                  {brandLinks.map((link, i) => (
                    <Fragment key={link.href}>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, transition: { duration: 0.25 } }}
                      transition={{ duration: 0.4, delay: 0.25 + i * 0.05, ease: "easeOut" }}
                    >
                      <Link
                        href={link.href}
                        // White rather than the teal eyebrow colour: over a lit
                        // server aisle the teal sat at roughly the luminance of
                        // the racks behind it and disappeared. The shadow keeps
                        // it off the brighter patches.
                        className="group inline-flex items-center gap-2 text-xs md:text-sm font-semibold uppercase tracking-widest text-white hover:text-[#38bdf8] transition-colors duration-200 [text-shadow:0_2px_14px_rgba(3,12,26,0.95)]"
                      >
                        {link.label}
                        <svg
                          className="w-3 h-3 text-[#38bdf8] transition-transform duration-200 group-hover:translate-x-1"
                          fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </motion.div>
                    {/* Hard break after the fourth, so AI Services always drops
                        to its own centred line instead of wrapping at whatever
                        width the row happens to run out of room. */}
                    {i === BRAND_ROW_BREAK - 1 && (
                      <div className="basis-full" aria-hidden="true" />
                    )}
                    </Fragment>
                  ))}
                </div>
              </motion.div>
            ) : (
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
                className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed mb-10"
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
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Previous / next ──
          The indicators below only jump to a specific slide; there was no way
          to step back one. */}
      {[
        { dir: -1, label: "Previous slide", side: "left-4 sm:left-8", d: "M15 19l-7-7 7-7" },
        { dir: 1, label: "Next slide", side: "right-4 sm:right-8", d: "M9 5l7 7-7 7" },
      ].map((btn) => (
        <button
          key={btn.label}
          onClick={() => step(btn.dir)}
          aria-label={btn.label}
          className={`group absolute ${btn.side} top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/25 p-3 text-white/70 backdrop-blur-md transition-all duration-200 hover:border-white/60 hover:bg-black/40 hover:text-white active:scale-95 sm:flex`}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={btn.d} />
          </svg>
        </button>
      ))}

      {/* ── Progress bar indicators (Apple-style) ── */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-0 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={active === index}
            // The bar stays 3px, but the button around it is padded out to a
            // real target. Hit areas were 20x3, which is not something a hand
            // can land on, so jumping straight to a slide only worked by luck.
            className="group flex cursor-pointer items-center px-1 py-3"
          >
            <span
              className="relative block h-[3px] overflow-hidden rounded-full transition-all duration-300 group-hover:h-[5px]"
              style={{ width: active === index ? "32px" : "20px" }}
            >
              <span className="absolute inset-0 rounded-full bg-white/25 group-hover:bg-white/45" />
              {active === index && (
                <motion.span
                  className="absolute inset-0 bg-white rounded-full"
                  layoutId="indicator"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </span>
          </button>
        ))}
      </div>

      {/* Bottom fade into the next section, which is the navy stats bar. It
          used to fade to black, so the hero ended in a black band and then
          jumped to navy instead of blending into it. */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#071e3d] to-transparent pointer-events-none" />
    </div>
  );
}
