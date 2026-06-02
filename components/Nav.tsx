"use client";

import { useState } from "react";
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
  const [activeCat, setActiveCat] = useState(0);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  return (
    <header className="bg-[#181E2C] sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img src="/audcomp-logo.png" alt="Audcomp" className="h-8 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-gray-300 hover:text-primary transition-colors py-2">
                Services
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {servicesOpen && (
                <div className="absolute left-0 top-full w-[600px] bg-card border border-border shadow-xl rounded-2xl overflow-hidden mt-1">
                  <div className="flex">
                    {/* Category tabs */}
                    <div className="w-44 bg-muted p-2 flex flex-col gap-1">
                      {serviceCategories.map((cat, i) => (
                        <button
                          key={cat.label}
                          onMouseEnter={() => setActiveCat(i)}
                          className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            activeCat === i
                              ? "bg-primary text-white"
                              : "text-foreground hover:bg-gray-200"
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                    {/* Sub-items */}
                    <div className="flex-1 p-4">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                        {serviceCategories[activeCat].label}
                      </p>
                      <div className="flex flex-col gap-1">
                        {serviceCategories[activeCat].items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="text-sm text-foreground hover:text-primary hover:bg-muted px-3 py-2 rounded-lg transition-colors"
                            onClick={() => setServicesOpen(false)}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link href="/ai-services" className="text-sm font-medium text-gray-300 hover:text-primary transition-colors">
              AI Services
            </Link>
            <Link href="/about" className="text-sm font-medium text-gray-300 hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/partners" className="text-sm font-medium text-gray-300 hover:text-primary transition-colors">
              Partners
            </Link>
            <Link href="/careers" className="text-sm font-medium text-gray-300 hover:text-primary transition-colors">
              Careers
            </Link>

            <a
              href="tel:9053041775"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              905-304-1775
            </a>

            <Link
              href="/contact"
              className="bg-primary text-white text-sm font-semibold px-6 py-2 rounded-full hover:brightness-110 transition-all shadow-sm"
            >
              Contact Us
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-primary"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#181E2C] border-t border-white/10 px-4 py-4 flex flex-col gap-3">
          {/* Services accordion */}
          <button
            className="flex items-center justify-between text-sm font-semibold text-gray-300 py-1"
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
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">{cat.label}</p>
                  {cat.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block text-sm text-gray-500 py-1 pl-2 hover:text-primary"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          )}

          <div className="border-t border-white/10 pt-3 flex flex-col gap-2">
            {[
              { label: "AI Services", href: "/ai-services" },
              { label: "About", href: "/about" },
              { label: "Partners", href: "/partners" },
              { label: "Careers", href: "/careers" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-300 hover:text-primary transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a href="tel:9053041775" className="text-sm text-gray-500">
              905-304-1775
            </a>
            <Link
              href="/contact"
              className="bg-primary text-white text-sm font-semibold px-6 py-3 rounded-full text-center hover:brightness-110 transition-all"
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
