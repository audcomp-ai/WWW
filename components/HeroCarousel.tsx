"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface Slide {
  id: number;
  type: "image" | "video";
  badge?: string;
  headline: string;
  subheadline: string;
  cta1Text: string;
  cta1Href: string;
  cta2Text: string;
  cta2Href: string;
}

const slides: Slide[] = [
  {
    id: 1,
    type: "image",
    headline: "Trusted IT Consulting Services in Canada",
    subheadline:
      "40+ years empowering businesses across Hamilton, Ancaster, and beyond. Your IT partner — not just your provider.",
    cta1Text: "Get a Free Assessment",
    cta1Href: "/contact",
    cta2Text: "View Our Services",
    cta2Href: "/managed-it-services",
  },
  {
    id: 2,
    type: "video",
    badge: "AI WORKFORCE",
    headline: "The Modern Workforce Is Already Here",
    subheadline:
      "Custom AI agents that work alongside your team — scored to your readiness, sequenced by ROI, deployed in weeks.",
    cta1Text: "Start Your AI Assessment",
    cta1Href: "/ai-services",
    cta2Text: "Learn More",
    cta2Href: "/ai-services",
  },
  {
    id: 3,
    type: "image",
    badge: "CYBER SECURITY",
    headline: "Protect What Matters Most",
    subheadline:
      "Multi-layered security — endpoint protection, SOC & MDR, penetration testing, and 24/7 monitoring — so your business stays resilient.",
    cta1Text: "Get a Security Assessment",
    cta1Href: "/security-services",
    cta2Text: "View Security Services",
    cta2Href: "/security-services",
  },
];

export default function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 2000);
  };

  const clearCurrentInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (!paused) {
      startInterval();
    }
    return () => clearCurrentInterval();
  }, [paused]);

  const handleMouseEnter = () => {
    setPaused(true);
    clearCurrentInterval();
  };

  const handleMouseLeave = () => {
    setPaused(false);
  };

  const goToSlide = (index: number) => {
    setActive(index);
    clearCurrentInterval();
    if (!paused) {
      startInterval();
    }
  };

  return (
    <div
      className="relative overflow-hidden flex items-center"
      style={{ height: "85vh", minHeight: "560px" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Slide 1 — IT Consulting */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          active === 0 ? "opacity-100 z-10" : "opacity-0 z-0"
        }`}
      >
        {/* Background image */}
        <img
          src="/hero-datacenter.jpeg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
          aria-hidden="true"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
        <div className="relative z-10 min-h-[85vh] flex items-center px-6 md:px-12">
          <div className="max-w-6xl mx-auto w-full">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
              Trusted IT Consulting Services in Canada
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed mt-4 mb-8">
              40+ years empowering businesses across Hamilton, Ancaster, and
              beyond. Your IT partner — not just your provider.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="bg-primary text-white px-8 py-4 rounded-full font-semibold hover:brightness-110 transition-all shadow-lg inline-block text-center"
              >
                Get a Free Assessment
              </Link>
              <Link
                href="/managed-it-services"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all inline-block text-center"
              >
                View Our Services
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Slide 2 — AI Workforce (video background) */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          active === 1 ? "opacity-100 z-10" : "opacity-0 z-0"
        }`}
      >
        {/* Video background */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source
            src="https://aiaudit.audcomp.ai/Videos/Agent_intro-web.webm"
            type="video/webm"
          />
          <source
            src="https://aiaudit.audcomp.ai/Videos/Agent_intro-web.mp4"
            type="video/mp4"
          />
        </video>
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
        <div className="relative z-10 min-h-[85vh] flex items-center px-6 md:px-12">
          <div className="max-w-6xl mx-auto w-full">
            <span className="text-xs font-bold tracking-widest uppercase bg-primary/20 text-primary border border-primary/30 px-3 py-1 rounded-full inline-block mb-4">
              AI WORKFORCE
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
              The Modern Workforce Is Already Here
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed mt-4 mb-8">
              Custom AI agents that work alongside your team — scored to your
              readiness, sequenced by ROI, deployed in weeks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/ai-services"
                className="bg-primary text-white px-8 py-4 rounded-full font-semibold hover:brightness-110 transition-all shadow-lg inline-block text-center"
              >
                Start Your AI Assessment
              </Link>
              <Link
                href="/ai-services"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all inline-block text-center"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Slide 3 — Cyber Security */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          active === 2 ? "opacity-100 z-10" : "opacity-0 z-0"
        }`}
      >
        <div className="absolute inset-0 bg-[#181E2C]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#e05d3820_0%,_transparent_60%)]" />
        <div className="relative z-10 min-h-[85vh] flex items-center px-6 md:px-12">
          <div className="max-w-6xl mx-auto w-full">
            <span className="text-xs font-bold tracking-widest uppercase bg-primary/20 text-primary border border-primary/30 px-3 py-1 rounded-full inline-block mb-4">
              CYBER SECURITY
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
              Protect What Matters Most
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed mt-4 mb-8">
              Multi-layered security — endpoint protection, SOC &amp; MDR,
              penetration testing, and 24/7 monitoring — so your business stays
              resilient.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/security-services"
                className="bg-primary text-white px-8 py-4 rounded-full font-semibold hover:brightness-110 transition-all shadow-lg inline-block text-center"
              >
                Get a Security Assessment
              </Link>
              <Link
                href="/security-services"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all inline-block text-center"
              >
                View Security Services
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-2 h-2 rounded-full transition-all ${
              active === index
                ? "bg-white scale-125"
                : "bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
