"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SHOW_BRAND_SLIDE } from "@/lib/hero-events";

type MenuItem = { label: string; href: string; desc?: string };

const serviceCategories: {
  label: string;
  href: string;
  desc: string;
  items: MenuItem[];
}[] = [
  {
    label: "Managed IT",
    href: "/managed-it-services",
    desc: "Day-to-day IT operations, support, and hardware, run by our team.",
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
    desc: "Microsoft 365, Azure, and hybrid cloud, migrated and managed.",
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
    desc: "Layered defence from endpoint to perimeter, monitored around the clock.",
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
    desc: "Strategy, design, and implementation for projects that have to land.",
    items: [
      { label: "Professional Services", href: "/professional-services" },
      { label: "Virtual CIO", href: "/virtual-cio" },
      { label: "Consulting & Design", href: "/consulting-design" },
      { label: "Implementation & Migration", href: "/implementation-migration" },
      { label: "Structured Cabling", href: "/structured-cabling" },
    ],
  },
  {
    label: "AI Services",
    href: "/ai-services",
    desc: "Copilot enablement, custom agents, AI roadmap, and data governance.",
    items: [
      { label: "AI Services", href: "/ai-services" },
      { label: "Agent Studio", href: "/ai-services/agent-studio" },
      { label: "Embedded AI Engineers", href: "/forward-deployed-engineers" },
      { label: "Microsoft Copilot Enablement", href: "/microsoft-copilot-enablement" },
    ],
  },
];

// Kept out of simpleLinks so it can lead the bar, ahead of the dropdown.
const aboutLink = { label: "About", href: "/about" };

const simpleLinks = [
  { label: "Partners", href: "/partners" },
  { label: "Events", href: "/events" },
  { label: "Blog", href: "/blog" },
];

function BarLink({
  href,
  label,
  onMouseEnter,
}: {
  href: string;
  label: string;
  onMouseEnter?: () => void;
}) {
  return (
    <Link
      href={href}
      className="group relative text-sm font-semibold text-white/75 hover:text-white transition-colors duration-200"
      onMouseEnter={onMouseEnter}
    >
      {label}
      {/* Grows from the centre on hover, the same teal rule the Services
          trigger raises when its panel is open. */}
      <span className="absolute -bottom-1.5 inset-x-0 h-0.5 origin-center scale-x-0 rounded-full bg-[#06b6d4] transition-transform duration-200 group-hover:scale-x-100" />
    </Link>
  );
}

type OpenMenu = "services" | null;

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  // Matches the pull-up in SiteShell: only where the hero runs under the bar
  // can the bar be transparent without exposing the white page behind it.
  const canOverlay = pathname === "/";
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close on Escape so the panel is dismissable without a mouse.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const open = (menu: OpenMenu) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(menu);
  };
  // Small grace period so moving the cursor into the panel doesn't close it.
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  };

  const triggerClass = (menu: OpenMenu) =>
    `relative flex items-center gap-1 text-sm font-semibold py-4 transition-colors duration-200 ${
      openMenu === menu ? "text-white" : "text-white/70 hover:text-white"
    }`;

  return (
    <header
      // Opaque at rest. The bar sits in flow above the page, so at scroll top
      // there is nothing behind it but the white page background, and 85% navy
      // over white composites to #2c405a — a band visibly lighter than the navy
      // it sits against. Translucency only earns its keep once content is
      // actually passing underneath, which is the scrolled state.
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled || openMenu
          ? "bg-[#071e3d]/95 backdrop-blur-2xl border-b border-white/[0.1]"
          : canOverlay
            ? "bg-transparent border-b border-transparent"
            : "bg-[#071e3d] border-b border-white/[0.06]"
      }`}
      onMouseLeave={scheduleClose}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center"
            onMouseEnter={scheduleClose}
            onClick={() => {
              setOpenMenu(null);
              setMobileOpen(false);
              // Navigating home from elsewhere mounts the hero on the brand
              // slide already. Clicking it while on the homepage routes to the
              // page you are on, so nothing remounts and the carousel stays
              // wherever it had rotated to — it has to be asked directly.
              if (canOverlay) {
                window.dispatchEvent(new CustomEvent(SHOW_BRAND_SLIDE));
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            <img src="/audcomp-logo.png" alt="Audcomp" className="h-10 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            <BarLink
              href={aboutLink.href}
              label={aboutLink.label}
              onMouseEnter={scheduleClose}
            />

            <button
              className={triggerClass("services")}
              onMouseEnter={() => open("services")}
              onFocus={() => open("services")}
              onClick={() => setOpenMenu(openMenu === "services" ? null : "services")}
              aria-expanded={openMenu === "services"}
            >
              Services
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${openMenu === "services" ? "rotate-180" : ""}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              <span
                className={`absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-[#06b6d4] transition-opacity duration-200 ${
                  openMenu === "services" ? "opacity-100" : "opacity-0"
                }`}
              />
            </button>

            {simpleLinks.map((l) => (
              <BarLink
                key={l.href}
                href={l.href}
                label={l.label}
                onMouseEnter={scheduleClose}
              />
            ))}

            <a
              href="https://audcomp.myportallogin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center border border-white/40 bg-white/[0.1] backdrop-blur-md text-white text-sm font-semibold px-5 py-2 rounded-full shadow-[0_2px_12px_rgba(3,12,26,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.04] hover:border-white/80 hover:bg-white/20 hover:shadow-[0_8px_24px_rgba(3,12,26,0.5)] active:translate-y-0 active:scale-100"
              onMouseEnter={scheduleClose}
            >
              My Audcomp
            </a>

            <Link
              href="/contact"
              className="group inline-flex items-center gap-1.5 bg-[#0071e3] text-white text-sm font-semibold px-5 py-2 rounded-full shadow-[0_4px_18px_rgba(0,113,227,0.5)] transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.04] hover:bg-[#0077ed] hover:shadow-[0_10px_28px_rgba(0,113,227,0.7)] active:translate-y-0 active:scale-100"
              onMouseEnter={scheduleClose}
            >
              Contact Us
              {/* Same nudging arrow the service cards use for Learn more, so the
                  primary action behaves like the rest of the site. */}
              <svg
                className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1"
                fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
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

      {/* ── Full-bleed mega panel ──
          Solid navy rather than translucent: page content showing through the
          panel made the link lists hard to read. */}
      {openMenu && (
        <div
          // Never taller than the screen below the bar. The panel grew when the
          // featured rail went to two cards, and on a short window it ran off
          // the bottom with no way to reach what was cut off. 3.5rem is the h-14
          // bar above it.
          className="hidden lg:block absolute inset-x-0 top-full max-h-[calc(100dvh-3.5rem)] overflow-y-auto overscroll-contain bg-[#071e3d] border-t border-white/[0.08] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.5)]"
          onMouseEnter={() => open(openMenu)}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-12 gap-8">
              {/* Five category columns */}
              {/* Three shared rows (heading, description, links) that each column
                  opts into with subgrid, so the five link lists stay on one
                  baseline however many lines a heading or description wraps to.
                  A fixed min-height cannot do this: at five columns both
                  "Professional Services" and the longer descriptions wrap. */}
              <div className="col-span-9 grid grid-cols-5 grid-rows-[auto_auto_auto] content-start gap-x-6">
                {serviceCategories.map((cat) => (
                  <div key={cat.label} className="row-span-3 grid grid-rows-subgrid">
                    <Link
                      href={cat.href}
                      className="group block mb-1"
                      onClick={() => setOpenMenu(null)}
                    >
                      <span className="text-[11px] font-semibold text-[#06b6d4] uppercase tracking-widest group-hover:text-[#38bdf8] transition-colors">
                        {cat.label}
                      </span>
                    </Link>
                    <p className="text-xs text-white/35 leading-relaxed mb-4">
                      {cat.desc}
                    </p>
                    <ul className="flex flex-col gap-0.5">
                      {cat.items.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className="block text-sm text-white/65 hover:text-white hover:bg-white/[0.06] -mx-2 px-2 py-1.5 rounded-md transition-all duration-150"
                            onClick={() => setOpenMenu(null)}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Featured panel — carries both promos, the summit and the one
                  the AI menu used to hold, so folding that menu in loses
                  nothing. */}
              <div className="col-span-3 border-l border-white/[0.08] pl-8">
                <p className="text-[11px] font-semibold text-white/30 uppercase tracking-widest mb-4">
                  Featured
                </p>
                <div className="flex flex-col gap-4">
                  <div className="rounded-2xl border border-white/[0.1] bg-white/[0.06] p-5">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-[#38bdf8] uppercase tracking-widest mb-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse" />
                      Sept 22, 2026
                    </span>
                    <p className="text-white font-semibold text-sm leading-snug mb-2">
                      Modern Cyber Security Summit
                    </p>
                    <p className="text-xs text-white/45 leading-relaxed mb-4">
                      Defending business in the age of AI, keynotes, an interactive
                      panel, and security specialists.
                    </p>
                    <Link
                      href="/events/security-summit"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#06b6d4] hover:text-[#38bdf8] transition-colors"
                      onClick={() => setOpenMenu(null)}
                    >
                      Event details
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>

                  <div className="rounded-2xl border border-white/[0.1] bg-white/[0.06] p-5">
                    <p className="text-white font-semibold text-sm leading-snug mb-2">
                      Deploy an AI workforce in weeks, not months
                    </p>
                    <p className="text-xs text-white/45 leading-relaxed mb-4">
                      13 pre-built specialists, Canadian-hosted, supervised by
                      Wilfred, ready to work alongside your team.
                    </p>
                    <Link
                      href="/ai-services/agent-studio"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#06b6d4] hover:text-[#38bdf8] transition-colors"
                      onClick={() => setOpenMenu(null)}
                    >
                      Explore Agent Studio
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#071e3d]/98 backdrop-blur-2xl border-t border-white/[0.1] px-4 py-5 flex flex-col gap-3 max-h-[calc(100vh-3.5rem)] overflow-y-auto">
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
                  <p className="text-[11px] font-semibold text-[#06b6d4] uppercase tracking-widest mb-1">
                    {cat.label}
                  </p>
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
            {[aboutLink, ...simpleLinks].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/70 hover:text-white transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://audcomp.myportallogin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/25 hover:border-white/50 text-white/80 hover:text-white text-sm font-medium px-6 py-3 rounded-full text-center transition-colors mt-1"
              onClick={() => setMobileOpen(false)}
            >
              My Audcomp
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
