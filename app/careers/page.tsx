import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CTABanner from "@/components/CTABanner";
import { SectionAngle } from "@/components/SectionAngle";

export const metadata: Metadata = {
  title: "Careers at Audcomp | IT Jobs in Hamilton & Ancaster",
  description:
    "Build your IT career at a CDN Top 100 Solutions Provider. Audcomp is hiring IT professionals for our team in Ancaster, Ontario.",
};

const benefits = [
  { title: "Career Growth", desc: "Training, certifications, and advancement paths for every role." },
  { title: "Canadian Company", desc: "Work for a proudly Canadian organization with local leadership." },
  { title: "Team Culture", desc: "A collaborative, supportive team that values every member." },
  { title: "Continuous Learning", desc: "Vendor-sponsored training and conference opportunities." },
  { title: "Benefits Package", desc: "Competitive salary, health benefits, and paid time off." },
  { title: "Make an Impact", desc: "Work with clients across healthcare, government, and enterprise." },
];

export default function CareersPage() {
  return (
    <>
      <Hero
        title="Join the Audcomp Team"
        subtitle="We're always looking for talented, passionate IT professionals who want to make a real difference for Canadian businesses."
        ctaText="View Open Positions"
        ctaHref="#openings"
        backgroundImage="/images/professional_services_hero.png"
      />

      <SectionAngle from="#071e3d" to="#ffffff" flip={false} height={64} />

      {/* Why Work Here */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Audcomp?</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              With 40+ years in business and a team that genuinely cares, Audcomp is a place to build a lasting IT career in Ontario.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="bg-[#e8f0fe] rounded-xl p-6">
                <h3 className="font-semibold text-[#1a1a2e] mb-2">{b.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionAngle from="#ffffff" to="#f9fafb" flip={true} height={64} />

      {/* Open Positions */}
      <section id="openings" className="bg-gray-50 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-6 text-center">Open Positions</h2>
          <p className="text-gray-600 text-center mb-12">
            We hire for character and train for skill. If you don&apos;t see your exact role below, we&apos;d still love to hear from you.
          </p>

          {/* Example roles */}
          {[
            {
              title: "Senior Network Engineer",
              type: "Full-time",
              location: "Ancaster, ON",
              desc: "Design, implement, and manage complex network environments for enterprise and SMB clients across the Hamilton region.",
            },
            {
              title: "IT Help Desk Technician",
              type: "Full-time",
              location: "Ancaster, ON",
              desc: "Provide Tier 1 and Tier 2 support via phone, email, and on-site visits. Strong troubleshooting skills and customer-first attitude required.",
            },
            {
              title: "Cyber Security Analyst",
              type: "Full-time",
              location: "Ancaster, ON",
              desc: "Monitor and respond to security incidents, conduct threat analysis, and support our SOC & MDR operations for Canadian clients.",
            },
            {
              title: "AI Solutions Specialist",
              type: "Full-time",
              location: "Ancaster, ON",
              desc: "Design, deploy, and manage AI agent workflows for Canadian SMB clients. Experience with LLMs, automation platforms, and system integrations required. A background in IT support or managed services is a strong asset.",
            },
          ].map((role) => (
            <div
              key={role.title}
              className="bg-white rounded-xl border border-gray-200 p-6 mb-4 hover:border-[#0056a8] hover:shadow-sm transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-[#1a1a2e]">{role.title}</h3>
                  <div className="flex gap-3 mt-1">
                    <span className="text-xs bg-[#e8f0fe] text-[#0056a8] px-2 py-1 rounded font-medium">{role.type}</span>
                    <span className="text-xs text-gray-500">{role.location}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-3">{role.desc}</p>
                </div>
                <a
                  href="mailto:careers@audcomp.ca"
                  className="shrink-0 bg-[#0056a8] text-white text-sm font-medium px-5 py-2.5 rounded-md hover:bg-[#003d7a] transition-colors text-center"
                >
                  Apply Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <SectionAngle from="#f9fafb" to="#1a1a2e" flip={false} height={64} />

      {/* General Application */}
      <section className="bg-[#1a1a2e] py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Don&apos;t See Your Role?</h2>
          <p className="text-gray-400 mb-8">
            Send us your resume anyway. We&apos;re always open to meeting talented IT professionals who share our values.
          </p>
          <a
            href="mailto:careers@audcomp.ca"
            className="bg-[#0056a8] text-white font-semibold px-8 py-3 rounded-md hover:bg-[#003d7a] transition-colors"
          >
            Send Your Resume
          </a>
        </div>
      </section>

      <SectionAngle from="#1a1a2e" to="#071e3d" flip={true} height={64} />

      <CTABanner
        title="Questions About Working at Audcomp?"
        subtitle="Reach out to our team, we'd love to tell you more about life at Audcomp."
      />
    </>
  );
}
