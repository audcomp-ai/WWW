import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CTABanner from "@/components/CTABanner";
import { SectionAngle } from "@/components/SectionAngle";

export const metadata: Metadata = {
  title: "Office 365 Backup | Audcomp — Microsoft 365 Data Protection",
  description:
    "Audcomp's Office 365 Backup protects your Microsoft 365 data with military-grade encryption, up to 5x faster recovery, and flexible retention policies.",
};

export default function Office365BackupPage() {
  return (
    <>
      <Hero
        title="Office 365 Backup"
        subtitle="Microsoft doesn't back up your Microsoft 365 data. Audcomp does — with military-grade protection and up to 5x faster recovery."
        ctaText="Protect Your M365 Data"
        ctaHref="/contact"
        backgroundImage="/images/cloud_solutions_hero.png"
      />

      <SectionAngle from="#071e3d" to="#ffffff" flip={false} height={64} />

      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-6">Your Microsoft 365 Data Is Not Backed Up</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Many organizations assume Microsoft backs up their Microsoft 365 data. They don't — not in the way most businesses need. Microsoft's shared responsibility model places data protection squarely in your court. Accidental deletion, ransomware, or a departed employee can result in permanent data loss if you don't have independent backup in place.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Audcomp's Office 365 Backup solution protects your Exchange Online, SharePoint, OneDrive, and Teams data with military-grade encryption, continuous automated backups, and recovery that's up to 5x faster than standard restore methods.
          </p>
        </div>
      </section>

      <SectionAngle from="#ffffff" to="#f9fafb" flip={true} height={64} />

      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-12 text-center">What's Protected</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Exchange Online", desc: "Mailboxes, calendars, contacts, and tasks — protected and recoverable at the item level." },
              { title: "SharePoint Online", desc: "Team sites, document libraries, and list data protected with full version history." },
              { title: "OneDrive for Business", desc: "Personal cloud storage protected against accidental deletion and ransomware." },
              { title: "Microsoft Teams", desc: "Teams channel conversations, files, and meeting data preserved and recoverable." },
              { title: "Military-Grade Encryption", desc: "AES-256 encryption in transit and at rest — stored in Canadian data centers." },
              { title: "Flexible Retention", desc: "Configurable retention periods from 30 days to the lifetime of your account." },
            ].map((f) => (
              <div key={f.title} className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-semibold text-[#1a1a2e] mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionAngle from="#f9fafb" to="#071e3d" flip={false} height={64} />

      <CTABanner
        title="Don't Rely on Microsoft Alone for Your Data"
        subtitle="Add independent backup to your Microsoft 365 environment today — it takes less than an hour to get started."
      />
    </>
  );
}
