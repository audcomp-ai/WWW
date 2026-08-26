import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CTABanner from "@/components/CTABanner";
import { SectionAngle } from "@/components/SectionAngle";

export const metadata: Metadata = {
  title: "Dark Web Monitoring | Audcomp, Stolen Credential Detection from $99/mo",
  description:
    "Audcomp's Dark Web Monitoring proactively detects stolen credentials and sensitive data on the dark web before attackers can exploit them. Starting at $99/month.",
};

export default function DarkWebMonitoringPage() {
  return (
    <>
      <Hero
        title="Catch Stolen Credentials Before Attackers Use Them"
        subtitle="Your employees&apos; passwords are likely already for sale on the dark web. Audcomp finds them first, so you can reset access before a leaked login turns into a breach."
        ctaText="Start Monitoring Now"
        ctaHref="/contact"
        bgColor="dark"
        backgroundImage="/images/cyber_security_hero.png"
      />

      <SectionAngle from="#071e3d" to="#ffffff" flip={false} height={64} />

      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#e8f0fe] border border-blue-200 rounded-xl p-6 mb-10">
            <div>
              <p className="font-semibold text-foreground mb-1">Starting at just $99/month</p>
              <p className="text-gray-600 text-sm">Dark web monitoring for your organization's domains, emails, and credentials, one of the highest-ROI security controls available.</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-foreground mb-6">The Dark Web Threat Is Real</h2>
          <p className="text-gray-600 text-lg leading-relaxed text-justify hyphens-auto mb-6">
            Billions of stolen credentials circulate on dark web forums and marketplaces, harvested from data breaches at third-party services your employees use. A password reused from a personal account can grant an attacker access to your corporate systems without triggering a single alert.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed text-justify hyphens-auto mb-6">
            Audcomp's Dark Web Monitoring service continuously scans dark web sources, forums, marketplaces, paste sites, and criminal databases, for credentials and sensitive data associated with your organization's domains and email addresses.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed text-justify hyphens-auto">
            When we find a match, you're immediately notified so the affected credentials can be changed before an attacker attempts to use them. Prevention instead of reaction.
          </p>
        </div>
      </section>

      <SectionAngle from="#ffffff" to="#f9fafb" flip={true} height={64} />

      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">What We Monitor</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Email Credentials", desc: "Stolen email and password combinations associated with your corporate domains." },
              { title: "Corporate Passwords", desc: "Hashed and plaintext passwords linked to your organization's accounts." },
              { title: "Financial Data", desc: "Credit card and banking credentials associated with your employees or organization." },
              { title: "Employee PII", desc: "Personal information including names, addresses, and ID numbers that could enable targeted attacks." },
              { title: "API Keys & Tokens", desc: "Exposed API keys and access tokens that could provide direct system access." },
              { title: "Domain Mentions", desc: "Mentions of your domain on criminal forums that may indicate targeted threat activity." },
            ].map((f) => (
              <div key={f.title} className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionAngle from="#f9fafb" to="#1a1a2e" flip={false} height={64} />

      <section className="bg-[#1a1a2e] py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">Starting at $99/month</h2>
          <p className="text-gray-400 mb-8">
            Continuous dark web intelligence for your organization, one of the most cost-effective security investments you can make.
          </p>
          <a
            href="/contact"
            className="inline-block bg-[#0056a8] text-white font-semibold px-8 py-3 rounded-md hover:bg-[#003d7a] transition-colors"
          >
            Get Started for $99/mo
          </a>
        </div>
      </section>

      <SectionAngle from="#1a1a2e" to="#071e3d" flip={true} height={64} />

      <CTABanner
        title="Find Out What's Already Out There"
        subtitle="Contact Audcomp for a free dark web scan of your domain, you may be surprised what we find."
      />
    </>
  );
}
