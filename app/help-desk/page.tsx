import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CTABanner from "@/components/CTABanner";
import { SectionAngle } from "@/components/SectionAngle";

export const metadata: Metadata = {
  title: "Help Desk Support | Audcomp, IT Help Desk in Canada",
  description:
    "Audcomp's Help Desk provides phone, email, and on-site support for hardware, software, and security issues. Canadian technicians.",
};

export default function HelpDeskPage() {
  return (
    <>
      <Hero
        title="Help Desk Support"
        subtitle="When your team hits a tech wall, Audcomp's Help Desk is there, by phone, email, or on-site."
        ctaText="Get Support"
        ctaHref="/contact"
        backgroundImage="/images/managed_it_hero.png"
      />

      <SectionAngle from="#071e3d" to="#ffffff" flip={false} height={64} />

      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-6">Support When You Need It Most</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Audcomp&apos;s Help Desk is staffed by certified Canadian IT professionals. Whether your team is stuck on a software issue or a network problem, we&apos;re one call away.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            Our Help Desk doesn't read from scripts. Our technicians diagnose, solve, and document, efficiently and thoroughly. From routine password resets to complex malware removal, every request is treated with urgency and expertise.
          </p>
        </div>
      </section>

      <SectionAngle from="#ffffff" to="#f9fafb" flip={true} height={64} />

      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-12 text-center">Help Desk Capabilities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: "Multi-Channel Support", desc: "Reach us by phone, email, or our support portal, whichever works best for your team." },
              { title: "Hardware Diagnostics", desc: "Remote and on-site diagnosis of workstations, laptops, printers, and peripheral devices." },
              { title: "Software Troubleshooting", desc: "Application errors, OS issues, driver conflicts, and configuration problems resolved quickly." },
              { title: "Malware & Ransomware Removal", desc: "Spyware, ransomware, and malware removal with full post-incident remediation." },
              { title: "User Account Management", desc: "Password resets, account provisioning, access rights, and Active Directory management." },
              { title: "On-Site Dispatch", desc: "When remote support isn't enough, our technicians come to you, across the Hamilton and Ancaster region." },
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
        title="Never Leave Your Team Without Support"
        subtitle="Audcomp's Help Desk keeps your people productive, with certified Canadian technicians a call away."
      />
    </>
  );
}
