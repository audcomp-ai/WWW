import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CTABanner from "@/components/CTABanner";
import { SectionAngle } from "@/components/SectionAngle";

export const metadata: Metadata = {
  title: "Backup & Disaster Recovery | Audcomp ABS, Military-Grade Cloud Backup",
  description:
    "Audcomp's ABS (Audcomp Backup Services) delivers military-grade cloud backup with up to 5x faster recovery, automated continuous backups, and up to 7-year retention.",
};

export default function BackupDisasterRecoveryPage() {
  return (
    <>
      <Hero
        title="Backup & Disaster Recovery"
        subtitle="Recover from ransomware, hardware failure, or accidental deletion up to 5x faster, with automated cloud backup stored in Canada."
        ctaText="Protect Your Data"
        ctaHref="/contact"
        backgroundImage="/images/managed_it_hero.png"
      />

      <SectionAngle from="#071e3d" to="#ffffff" flip={false} height={64} />

      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-6">
            ABS, Audcomp Backup Services
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Audcomp Backup Services (ABS) provides enterprise-grade, cloud-based backup and disaster recovery for businesses of all sizes. Whether you need to recover from a ransomware attack, hardware failure, or accidental deletion, ABS restores your data up to 5x faster than traditional solutions.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Our military-grade encryption protects your data both in transit and at rest. Continuous automated backups run in the background without impacting performance, and our flexible retention policies keep your data for up to 7 years to meet compliance requirements.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            All ABS data is stored in Canadian data centers. Your data never crosses the border.
          </p>
        </div>
      </section>

      <SectionAngle from="#ffffff" to="#f9fafb" flip={true} height={64} />

      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-16 text-center">
            {[
              { value: "5x", label: "Faster Recovery" },
              { value: "7yr", label: "Max Data Retention" },
              { value: "24/7", label: "Automated Backups" },
              { value: "100%", label: "Canadian Data Centers" },
            ].map((s) => (
              <div key={s.label} className="bg-[#0056a8] text-white rounded-xl p-6">
                <p className="text-3xl font-bold">{s.value}</p>
                <p className="text-sm text-blue-200 mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-10 text-center">Key Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: "Military-Grade Encryption", desc: "AES-256 encryption protects your data both in transit and at rest." },
              { title: "5x Faster Recovery", desc: "Our recovery technology gets you back online faster than traditional backup solutions." },
              { title: "Continuous Automated Backups", desc: "Backups run automatically and continuously, no manual intervention required." },
              { title: "Up to 7-Year Retention", desc: "Flexible retention policies from 30 days to 7 years to meet your compliance needs." },
              { title: "Cloud-Based Infrastructure", desc: "Redundant Canadian cloud infrastructure eliminates the risk of local hardware failure." },
              { title: "Recovery Testing & Reporting", desc: "Regular recovery tests and detailed reports verify your backup integrity." },
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
        title="Don't Wait for Disaster to Test Your Backup"
        subtitle="Contact Audcomp today for a free backup assessment and see how ABS protects your critical business data."
      />
    </>
  );
}
