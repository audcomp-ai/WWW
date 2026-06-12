import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CTABanner from "@/components/CTABanner";
import { SectionAngle } from "@/components/SectionAngle";

export const metadata: Metadata = {
  title: "Microsoft Office 365 | Audcomp — M365 Deployment & Management",
  description:
    "Audcomp manages Microsoft 365 deployment, migration, and administration for Canadian businesses. Email, Teams, SharePoint, and more.",
};

export default function Office365Page() {
  return (
    <>
      <Hero
        title="Microsoft Office 365"
        subtitle="From deployment to daily management — Audcomp ensures your Microsoft 365 environment runs securely and at full potential."
        ctaText="Get Started with M365"
        ctaHref="/contact"
        backgroundImage="/images/cloud_solutions_hero.png"
      />

      <SectionAngle from="#071e3d" to="#ffffff" flip={false} height={64} />

      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-6">More Than Just Email</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Microsoft 365 is the backbone of modern business productivity. Audcomp helps you unlock its full value — from Exchange Online and SharePoint to Teams, OneDrive, and the full suite of Microsoft apps — with proper configuration, security hardening, and ongoing management.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            Whether you're migrating from an on-premise Exchange server, moving from Google Workspace, or deploying Microsoft 365 for the first time, Audcomp's migration team ensures zero-downtime transitions with no data loss.
          </p>
        </div>
      </section>

      <SectionAngle from="#ffffff" to="#f9fafb" flip={true} height={64} />

      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-12 text-center">Microsoft 365 Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: "Deployment & Setup", desc: "Tenant creation, licensing, user provisioning, and configuration tailored to your organization." },
              { title: "Email Migration", desc: "Migrate from on-premise Exchange, Google, or other platforms with zero downtime." },
              { title: "Security Hardening", desc: "MFA, conditional access, spam filtering, and advanced threat protection enabled from day one." },
              { title: "SharePoint & OneDrive", desc: "Document management, team sites, and cloud storage configured for your workflow." },
              { title: "User Management", desc: "Ongoing user provisioning, license management, and access control." },
              { title: "End-User Training", desc: "Help your team get the most out of Microsoft 365 with practical, role-specific training." },
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
        title="Ready to Get More from Microsoft 365?"
        subtitle="Talk to Audcomp about a Microsoft 365 assessment or migration today."
      />
    </>
  );
}
