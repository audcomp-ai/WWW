import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CTABanner from "@/components/CTABanner";
import { SectionAngle } from "@/components/SectionAngle";

export const metadata: Metadata = {
  title: "Microsoft Teams | Audcomp, Teams Deployment & Configuration",
  description:
    "Audcomp deploys, configures, and trains your team on Microsoft Teams, integrated with SharePoint, OneDrive, and your phone system.",
};

export default function MicrosoftTeamsPage() {
  return (
    <>
      <Hero
        title="Microsoft Teams"
        subtitle="Fewer scattered chats and lost files, a Teams deployment configured, integrated, and managed by Audcomp so your team actually adopts it."
        ctaText="Get Started with Teams"
        ctaHref="/contact"
        backgroundImage="/images/cloud_solutions_hero.png"
      />

      <SectionAngle from="#071e3d" to="#ffffff" flip={false} height={64} />

      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-6">Teams, Done Right</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Microsoft Teams has become the hub for modern workplace collaboration, but a poorly configured Teams environment leads to chaos, not clarity. Audcomp's Teams specialists deploy and configure Teams with your organization structure, governance policies, and workflow in mind.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            From initial tenant configuration and channel architecture through SharePoint integration, meeting room systems, and Teams Phone, Audcomp handles every layer of your Teams environment.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            We also provide end-user training to ensure your team actually adopts Teams effectively, because technology only delivers value when people use it.
          </p>
        </div>
      </section>

      <SectionAngle from="#ffffff" to="#f9fafb" flip={true} height={64} />

      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-12 text-center">Teams Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: "Teams Deployment", desc: "Tenant configuration, team and channel creation, and governance policy setup." },
              { title: "SharePoint Integration", desc: "Connect Teams channels to SharePoint document libraries for seamless file management." },
              { title: "OneDrive Configuration", desc: "Personal file storage integrated with Teams for easy sharing and collaboration." },
              { title: "Teams Phone", desc: "Replace your traditional phone system with Microsoft Teams Phone, fully configured and managed." },
              { title: "Meeting Rooms", desc: "Teams Rooms hardware and software configuration for productive in-person and hybrid meetings." },
              { title: "End-User Training", desc: "Practical, role-specific training that drives adoption and reduces shadow IT." },
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
        title="Ready to Unlock Teams for Your Organization?"
        subtitle="Audcomp's Teams specialists will configure your environment and train your team for maximum adoption."
      />
    </>
  );
}
