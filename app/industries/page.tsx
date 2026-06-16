import type { Metadata } from "next";
import Link from "next/link";
import CTABanner from "@/components/CTABanner";
import { SectionAngle } from "@/components/SectionAngle";
import { AnimatedSection, StaggeredSection, StaggeredItem } from "@/components/AnimatedSection";

export const metadata: Metadata = {
  title: "Industries We Serve | Audcomp — IT Solutions Built for Your Sector",
  description:
    "Audcomp delivers IT solutions tailored to healthcare, municipalities, universities, manufacturing, enterprise, and SMB sectors across Hamilton, Burlington, and beyond.",
};

const industries = [
  {
    label: "Healthcare",
    slug: "healthcare",
    image: "/images/ind_healthcare_1781220794136.png",
    tagline: "Compliant, reliable IT for patient-first organizations",
    challenges: [
      "PHIPA / HIPAA compliance and audit readiness",
      "EMR/EHR system uptime and performance",
      "Ransomware targeting medical facilities",
      "Medical device and endpoint security",
    ],
    solution:
      "Audcomp combines 24/7 SOC monitoring, compliant cloud backup, and endpoint protection to keep patient data secure and clinical systems running — so your staff can focus on care, not IT.",
    services: [
      { label: "Managed IT Support", href: "/managed-it-support" },
      { label: "Cyber Security", href: "/security-services" },
      { label: "Backup & Disaster Recovery", href: "/backup-disaster-recovery" },
      { label: "SOC & MDR", href: "/security-operations-centre-and-mdr" },
    ],
  },
  {
    label: "Municipalities",
    slug: "municipalities",
    image: "/images/ind_municipalities_1781220804489.png",
    tagline: "Budget-conscious IT that keeps public services running",
    challenges: [
      "Tight budgets and public accountability",
      "100% Canadian data sovereignty requirements",
      "Legacy systems and modernization pressure",
      "Citizen-facing service continuity",
    ],
    solution:
      "We help municipalities modernize their IT infrastructure cost-effectively — with 100% Canadian engineers, compliant data handling, and a Virtual CIO to guide long-term technology planning.",
    services: [
      { label: "Managed IT Services", href: "/managed-it-services" },
      { label: "Virtual CIO", href: "/virtual-cio" },
      { label: "Cloud Solutions", href: "/cloud-solutions" },
      { label: "Structured Cabling", href: "/structured-cabling" },
    ],
  },
  {
    label: "Universities & Education",
    slug: "universities",
    image: "/images/ind_universities_1781220814872.png",
    tagline: "Scalable networks and secure environments for campus life",
    challenges: [
      "Campus-wide network complexity and scale",
      "Diverse student and faculty device environments",
      "Research data protection and compliance",
      "Remote and hybrid learning infrastructure",
    ],
    solution:
      "From campus networking and Microsoft 365 deployment to secure research data environments, Audcomp manages the complexity so faculty and students experience seamless, secure connectivity.",
    services: [
      { label: "Microsoft Office 365", href: "/microsoft-office-365" },
      { label: "Microsoft Teams", href: "/microsoft-teams" },
      { label: "Help Desk", href: "/help-desk" },
      { label: "Endpoint Protection", href: "/end-point-protection" },
    ],
  },
  {
    label: "Manufacturing",
    slug: "manufacturing",
    image: "/images/ind_manufacturing_1781220830507.png",
    tagline: "Uptime-critical IT for the production floor and beyond",
    challenges: [
      "OT/IT convergence and industrial network security",
      "Production floor uptime and reliability",
      "Supply chain connectivity and vendor integration",
      "IoT device security and patch management",
    ],
    solution:
      "Audcomp bridges operational technology and IT — delivering hardened networks, industrial cybersecurity, and reliable infrastructure so your production lines never stop due to IT failures.",
    services: [
      { label: "Managed IT Support", href: "/managed-it-support" },
      { label: "Managed Firewall", href: "/managed-firewall" },
      { label: "Structured Cabling", href: "/structured-cabling" },
      { label: "IT Procurement", href: "/it-procurement" },
    ],
  },
  {
    label: "Enterprise",
    slug: "enterprise",
    image: "/images/ind_enterprise_1781220840854.png",
    tagline: "Unified IT management across every location and team",
    challenges: [
      "Multi-location and remote workforce management",
      "Digital transformation and cloud migration",
      "Data governance and compliance at scale",
      "Technology vendor sprawl and cost control",
    ],
    solution:
      "Our Virtual CIO and professional services team align your IT strategy with business goals — consolidating vendors, enabling cloud-first infrastructure, and managing transformation with zero disruption.",
    services: [
      { label: "Virtual CIO", href: "/virtual-cio" },
      { label: "Microsoft Azure", href: "/microsoft-azure" },
      { label: "Consulting & Design", href: "/consulting-design" },
      { label: "Implementation & Migration", href: "/implementation-migration" },
    ],
  },
  {
    label: "Small & Medium Business",
    slug: "smb",
    image: "/images/ind_smb_1781220849628.png",
    tagline: "Enterprise-grade IT at an SMB price point",
    challenges: [
      "No dedicated in-house IT team",
      "Growing faster than current infrastructure",
      "Ransomware and phishing targeting SMBs",
      "Managing hardware, software, and vendors",
    ],
    solution:
      "Audcomp becomes your full IT department — proactive monitoring, a responsive help desk, Device as a Service, and security awareness training — so you get enterprise-grade IT without the overhead.",
    services: [
      { label: "Managed IT Support", href: "/managed-it-support" },
      { label: "Help Desk", href: "/help-desk" },
      { label: "Device as a Service", href: "/daas" },
      { label: "Security Awareness Training", href: "/security-awareness-training" },
    ],
  },
];

export default function IndustriesPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-[#071e3d] pt-24 pb-32 px-4 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="w-[900px] h-[400px] rounded-full opacity-[0.12]"
            style={{ background: "radial-gradient(ellipse, #06b6d4 0%, transparent 70%)" }}
          />
        </div>
        <AnimatedSection>
          <div className="relative max-w-4xl mx-auto text-center">
            <p className="text-xs font-semibold text-[#06b6d4] uppercase tracking-widest mb-5">
              Industries
            </p>
            <h1 className="text-5xl sm:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
              Built for Your Sector
            </h1>
            <p className="text-lg text-white/55 max-w-2xl mx-auto leading-relaxed">
              Audcomp brings 40+ years of IT expertise and deep domain knowledge across six sectors —
              so your technology strategy fits the way your business actually works.
            </p>
          </div>
        </AnimatedSection>
      </section>

      <SectionAngle from="#071e3d" to="#f0f7ff" flip={false} height={80} />

      {/* ── Industry Cards Grid ── */}
      <section className="bg-[#f0f7ff] py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0a2540] tracking-tight">
              Six Sectors. One Trusted Partner.
            </h2>
            <p className="text-slate-500 mt-4 max-w-xl mx-auto">
              Click any sector below to explore the IT challenges we solve and the solutions we deliver.
            </p>
          </AnimatedSection>

          <StaggeredSection className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {industries.map((ind) => (
              <StaggeredItem key={ind.slug}>
                <a
                  href={`#${ind.slug}`}
                  className="group relative rounded-2xl overflow-hidden aspect-[4/3] block"
                >
                  <img
                    src={ind.image}
                    alt={ind.label}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071e3d]/85 via-[#071e3d]/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white font-bold text-base tracking-tight">{ind.label}</p>
                    <p className="text-white/60 text-xs mt-0.5 leading-snug">{ind.tagline}</p>
                  </div>
                </a>
              </StaggeredItem>
            ))}
          </StaggeredSection>
        </div>
      </section>

      <SectionAngle from="#f0f7ff" to="#f8faff" flip={true} height={80} />

      {/* ── Per-Industry Deep Dives ── */}
      <section className="bg-[#f8faff] py-16 px-4">
        <div className="max-w-6xl mx-auto flex flex-col gap-8">
          {industries.map((ind, i) => {
            const isEven = i % 2 === 0;
            return (
              <div
                key={ind.slug}
                id={ind.slug}
                className={isEven
                  ? "flex flex-col md:flex-row rounded-3xl overflow-hidden border border-[#dde8f5] shadow-sm"
                  : "flex flex-col md:flex-row-reverse rounded-3xl overflow-hidden border border-[#dde8f5] shadow-sm"
                }
              >
                {/* Image */}
                <div className="md:w-1/2 relative min-h-[280px]">
                  <img
                    src={ind.image}
                    alt={ind.label}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071e3d]/70 via-[#071e3d]/10 to-transparent" />
                  <div className="absolute bottom-5 left-5">
                    <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/25 backdrop-blur-sm text-white text-[11px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full">
                      {ind.label}
                    </span>
                  </div>
                </div>

                {/* Text box */}
                <div className="md:w-1/2 bg-white p-8 md:p-10 flex flex-col justify-center">
                  <p className="text-xs font-semibold text-[#06b6d4] uppercase tracking-widest mb-3">
                    {ind.label}
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#0a2540] tracking-tight leading-tight mb-4">
                    {ind.tagline}
                  </h2>
                  <p className="text-slate-500 leading-relaxed mb-6 text-[15px]">
                    {ind.solution}
                  </p>

                  {/* Challenges */}
                  <div className="mb-6">
                    <p className="text-xs font-semibold text-[#0a2540]/40 uppercase tracking-widest mb-3">
                      Common Challenges
                    </p>
                    <ul className="flex flex-col gap-2">
                      {ind.challenges.map((c) => (
                        <li key={c} className="flex items-start gap-2.5 text-sm text-slate-600">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#0071e3] flex-shrink-0" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Relevant services */}
                  <div className="mb-7">
                    <p className="text-xs font-semibold text-[#0a2540]/40 uppercase tracking-widest mb-3">
                      Relevant Services
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {ind.services.map((svc) => (
                        <Link
                          key={svc.href}
                          href={svc.href}
                          className="inline-flex items-center gap-1 bg-[#f0f7ff] hover:bg-[#dde8f5] border border-[#dde8f5] text-[#0a2540] text-xs font-medium px-3 py-1.5 rounded-full transition-colors duration-200"
                        >
                          {svc.label}
                          <svg className="w-3 h-3 text-[#0071e3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <Link
                    href="/contact"
                    className="self-start bg-[#0071e3] hover:bg-[#0077ed] text-white text-sm font-medium px-6 py-2.5 rounded-full transition-colors duration-200"
                  >
                    Talk to a Specialist
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <SectionAngle from="#f8faff" to="#ffffff" flip={false} height={80} />

      <CTABanner />
    </>
  );
}
