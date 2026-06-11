"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const serviceCategories = [
  {
    label: "Managed IT",
    href: "/managed-it-services",
    items: [
      { label: "Managed IT Services", href: "/managed-it-services" },
      { label: "Managed IT Support", href: "/managed-it-support" },
      { label: "Help Desk", href: "/help-desk" },
      { label: "Backup & Disaster Recovery", href: "/backup-disaster-recovery" },
      { label: "Device as a Service (DaaS)", href: "/daas" },
      { label: "IT Procurement", href: "/it-procurement" },
    ],
  },
  {
    label: "Cloud Solutions",
    href: "/cloud-solutions",
    items: [
      { label: "Cloud Solutions", href: "/cloud-solutions" },
      { label: "Microsoft Office 365", href: "/microsoft-office-365" },
      { label: "Microsoft Azure", href: "/microsoft-azure" },
      { label: "Hybrid Cloud", href: "/hybrid-cloud" },
      { label: "Office 365 Backup", href: "/office-365-backup" },
      { label: "Microsoft Teams", href: "/microsoft-teams" },
    ],
  },
  {
    label: "Cyber Security",
    href: "/security-services",
    items: [
      { label: "Security Services", href: "/security-services" },
      { label: "Endpoint Protection", href: "/end-point-protection" },
      { label: "SOC & MDR", href: "/security-operations-centre-and-mdr" },
      { label: "Penetration Testing", href: "/penetration-testing-and-security-audits" },
      { label: "Managed Firewall", href: "/managed-firewall" },
      { label: "Security Awareness Training", href: "/security-awareness-training" },
      { label: "Dark Web Monitoring", href: "/dark-web-monitoring" },
    ],
  },
  {
    label: "Professional Services",
    href: "/professional-services",
    items: [
      { label: "Professional Services", href: "/professional-services" },
      { label: "Virtual CIO", href: "/virtual-cio" },
      { label: "Consulting & Design", href: "/consulting-design" },
      { label: "Implementation & Migration", href: "/implementation-migration" },
      { label: "Structured Cabling", href: "/structured-cabling" },
    ],
  },
];

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [activeCat, setActiveCat] = useState(0);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const aiTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#071e3d]/95 backdrop-blur-2xl border-b border-white/[0.1]"
          : "bg-[#071e3d]/85 backdrop-blur-xl border-b border-white/[0.06]"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img src="/audcomp-logo.png" alt="Audcomp" className="h-10 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className="flex items-center gap-1 text-sm text-white/70 hover:text-white transition-colors duration-200 py-2">
                Services
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {servicesOpen && (
                <div className="absolute left-0 top-full pt-3">
                  <div className="w-[580px] bg-[#071e3d]/98 backdrop-blur-2xl border border-white/[0.12] shadow-2xl rounded-2xl overflow-hidden">
                    <div className="flex">
                      {/* Category tabs */}
                      <div className="w-44 border-r border-white/[0.06] p-2 flex flex-col gap-0.5">
                        {serviceCategories.map((cat, i) => (
                          <button
                            key={cat.label}
                            onMouseEnter={() => setActiveCat(i)}
                            className={`text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-150 ${
                              activeCat === i
                                ? "bg-white/10 text-white font-medium"
                                : "text-white/50 hover:text-white/80 hover:bg-white/[0.05]"
                            }`}
                          >
                            {cat.label}
                          </button>
                        ))}
                      </div>
                      {/* Sub-items */}
                      <div className="flex-1 p-4">
                        <p className="text-[11px] font-semibold text-white/30 uppercase tracking-widest mb-3">
                          {serviceCategories[activeCat].label}
                        </p>
                        <div className="flex flex-col gap-0.5">
                          {serviceCategories[activeCat].items.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="text-sm text-white/60 hover:text-white hover:bg-white/[0.06] px-3 py-2 rounded-lg transition-all duration-150"
                              onClick={() => setServicesOpen(false)}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* AI Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => {
                if (aiTimeout.current) clearTimeout(aiTimeout.current);
                setAiOpen(true);
              }}
              onMouseLeave={() => {
                aiTimeout.current = setTimeout(() => setAiOpen(false), 120);
              }}
            >
              <button className="flex items-center gap-1 text-sm text-white/70 hover:text-white transition-colors duration-200 py-2">
                AI Services
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${aiOpen ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {aiOpen && (
                <div className="absolute left-0 top-full pt-3">
                  <div className="w-52 bg-[#071e3d]/98 backdrop-blur-2xl border border-white/[0.12] shadow-2xl rounded-2xl overflow-hidden p-2 flex flex-col gap-0.5">
                    <Link
                      href="/ai-services"
                      className="text-sm text-white/60 hover:text-white hover:bg-white/[0.06] px-3 py-2.5 rounded-lg transition-all duration-150 flex items-center gap-2"
                      onClick={() => setAiOpen(false)}
                    >
                      <i className="fas fa-microchip w-4 text-center text-[#06b6d4]" />
                      AI Services
                    </Link>
                    <Link
                      href="/ai-services/agent-studio"
                      className="text-sm text-white/60 hover:text-white hover:bg-white/[0.06] px-3 py-2.5 rounded-lg transition-all duration-150 flex items-center gap-2"
                      onClick={() => setAiOpen(false)}
                    >
                      <i className="fas fa-robot w-4 text-center text-[#06b6d4]" />
                      Agent Studio
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <Link href="/about" className="text-sm text-white/70 hover:text-white transition-colors duration-200">
              About
            </Link>
            <Link href="/partners" className="text-sm text-white/70 hover:text-white transition-colors duration-200">
              Partners
            </Link>
            <Link href="/careers" className="text-sm text-white/70 hover:text-white transition-colors duration-200">
              Careers
            </Link>
            <Link href="/blog" className="text-sm text-white/70 hover:text-white transition-colors duration-200">
              Blog
            </Link>

            <a
              href="tel:9053041775"
              className="text-sm text-white/40 hover:text-white/70 transition-colors duration-200"
            >
              905-304-1775
            </a>

            <Link
              href="/contact"
              className="bg-[#0071e3] hover:bg-[#0077ed] text-white text-sm font-medium px-5 py-2 rounded-full transition-colors duration-200"
            >
              Contact Us
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-white/60 hover:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#071e3d]/98 backdrop-blur-2xl border-t border-white/[0.1] px-4 py-5 flex flex-col gap-3">
          <button
            className="flex items-center justify-between text-sm font-medium text-white/80 py-1"
            onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
          >
            Services
            <svg
              className={`w-4 h-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {mobileServicesOpen && (
            <div className="pl-3 flex flex-col gap-3">
              {serviceCategories.map((cat) => (
                <div key={cat.label}>
                  <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-1">{cat.label}</p>
                  {cat.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block text-sm text-white/50 py-1 pl-2 hover:text-white transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          )}

          <div className="border-t border-white/[0.08] pt-3 flex flex-col gap-2">
            {[
              { label: "AI Services", href: "/ai-services" },
              { label: "Agent Studio", href: "/ai-services/agent-studio" },
              { label: "About", href: "/about" },
              { label: "Partners", href: "/partners" },
              { label: "Careers", href: "/careers" },
              { label: "Blog", href: "/blog" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/70 hover:text-white transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a href="tel:9053041775" className="text-sm text-white/40">
              905-304-1775
            </a>
            <Link
              href="/contact"
              className="bg-[#0071e3] hover:bg-[#0077ed] text-white text-sm font-medium px-6 py-3 rounded-full text-center transition-colors mt-1"
              onClick={() => setMobileOpen(false)}
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
