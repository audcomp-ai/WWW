import Link from "next/link";

const managedItLinks = [
  { label: "Managed IT Support", href: "/managed-it-support" },
  { label: "Help Desk", href: "/help-desk" },
  { label: "Backup & Disaster Recovery", href: "/backup-disaster-recovery" },
  { label: "Device as a Service", href: "/daas" },
  { label: "IT Procurement", href: "/it-procurement" },
];

const cloudLinks = [
  { label: "Microsoft Office 365", href: "/microsoft-office-365" },
  { label: "Microsoft Azure", href: "/microsoft-azure" },
  { label: "Hybrid Cloud", href: "/hybrid-cloud" },
  { label: "Office 365 Backup", href: "/office-365-backup" },
  { label: "Microsoft Teams", href: "/microsoft-teams" },
];

const securityLinks = [
  { label: "Endpoint Protection", href: "/end-point-protection" },
  { label: "SOC & MDR", href: "/security-operations-centre-and-mdr" },
  { label: "Penetration Testing", href: "/penetration-testing-and-security-audits" },
  { label: "Managed Firewall", href: "/managed-firewall" },
  { label: "Security Awareness Training", href: "/security-awareness-training" },
  { label: "Dark Web Monitoring", href: "/dark-web-monitoring" },
];

const professionalLinks = [
  { label: "Virtual CIO", href: "/virtual-cio" },
  { label: "Consulting & Design", href: "/consulting-design" },
  { label: "Implementation & Migration", href: "/implementation-migration" },
  { label: "Structured Cabling", href: "/structured-cabling" },
  { label: "AI Services", href: "/ai-services" },
  { label: "Microsoft Copilot", href: "/microsoft-copilot-enablement" },
];

export default function Footer() {
  return (
    <footer className="bg-[#000000] border-t border-white/[0.08]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/">
              <img src="/audcomp-logo.png" alt="Audcomp" className="h-8 w-auto" />
            </Link>
            <p className="mt-4 text-sm text-white/35 leading-relaxed">
              Trusted IT Consulting Services in Canada. Serving businesses across Hamilton, Ancaster, and beyond since 1986.
            </p>
            <div className="mt-5 text-sm text-white/35">
              <p>611 Tradewind Drive, Suite 100</p>
              <p>Ancaster, Ontario</p>
              <a href="tel:9053041775" className="block mt-2 text-white/50 hover:text-white transition-colors duration-200">
                905-304-1775
              </a>
            </div>
          </div>

          {/* Managed IT */}
          <div>
            <h3 className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-4">
              Managed IT
            </h3>
            <ul className="flex flex-col gap-2.5">
              {managedItLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/40 hover:text-white/80 transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cloud */}
          <div>
            <h3 className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-4">
              Cloud Solutions
            </h3>
            <ul className="flex flex-col gap-2.5">
              {cloudLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/40 hover:text-white/80 transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Security */}
          <div>
            <h3 className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-4">
              Cyber Security
            </h3>
            <ul className="flex flex-col gap-2.5">
              {securityLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/40 hover:text-white/80 transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Professional + AI */}
          <div>
            <h3 className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-4">
              Professional Services
            </h3>
            <ul className="flex flex-col gap-2.5">
              {professionalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/40 hover:text-white/80 transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25">
            &copy; 2024 Audcomp. All rights reserved.
          </p>
          <div className="flex gap-6">
            {[
              { label: "About", href: "/about" },
              { label: "Partners", href: "/partners" },
              { label: "Careers", href: "/careers" },
              { label: "Contact", href: "/contact" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="text-xs text-white/25 hover:text-white/60 transition-colors duration-200">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
