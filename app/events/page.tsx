import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Events | Audcomp IT Workshops & Webinars",
  description:
    "Join Audcomp at upcoming IT workshops, security seminars, and industry events across the Hamilton and Ancaster region.",
};

export default function EventsPage() {
  return (
    <>
      <Hero
        title="Events & Workshops"
        subtitle="Join Audcomp at upcoming IT education events, security seminars, and community programs across Ontario."
        ctaText="Contact Us to Learn More"
        ctaHref="/contact"
      />

      <section className="bg-white py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-6">Upcoming Events</h2>
          <p className="text-gray-600 text-lg mb-12">
            We regularly host and participate in events that help businesses stay ahead of the technology curve. Check back often or contact us to be added to our event mailing list.
          </p>

          {/* Upcoming events placeholder */}
          <div className="flex flex-col gap-6 mb-16">
            {[
              {
                date: "June 2026",
                title: "Cybersecurity Awareness Breakfast Seminar",
                type: "In-Person",
                location: "Ancaster, ON",
                desc: "A practical, jargon-free morning session covering the top cyber threats facing SMBs in 2026 and what you can do about them.",
              },
              {
                date: "July 2026",
                title: "Microsoft Copilot: AI Readiness for Your Business",
                type: "Webinar",
                location: "Online",
                desc: "Learn how Microsoft Copilot can transform your team's productivity — and what it takes to deploy it safely and effectively.",
              },
              {
                date: "September 2026",
                title: "IT Leadership Roundtable",
                type: "In-Person",
                location: "Hamilton, ON",
                desc: "An invite-only roundtable for IT leaders and business owners in the Hamilton region to discuss emerging technology challenges.",
              },
            ].map((event) => (
              <div
                key={event.title}
                className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col sm:flex-row gap-6 hover:border-[#0056a8] hover:shadow-sm transition-all"
              >
                <div className="shrink-0 w-28 h-20 bg-[#e8f0fe] rounded-lg flex flex-col items-center justify-center">
                  <span className="text-xs font-semibold text-[#0056a8] uppercase">{event.date}</span>
                </div>
                <div className="flex-1">
                  <div className="flex gap-2 mb-2">
                    <span className="text-xs bg-[#0056a8] text-white px-2 py-0.5 rounded font-medium">{event.type}</span>
                    <span className="text-xs text-gray-500">{event.location}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#1a1a2e] mb-2">{event.title}</h3>
                  <p className="text-sm text-gray-600">{event.desc}</p>
                </div>
                <div className="shrink-0">
                  <a
                    href="/contact"
                    className="inline-block bg-[#0056a8] text-white text-sm font-medium px-5 py-2.5 rounded-md hover:bg-[#003d7a] transition-colors"
                  >
                    Register
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Past events */}
          <h2 className="text-2xl font-bold text-[#1a1a2e] mb-6">Past Events</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "2025 Annual Cybersecurity Summit — Hamilton",
              "Microsoft Azure Migration Workshop",
              "Dark Web & Identity Threat Briefing",
              "IT Strategy Planning Day for SMBs",
            ].map((e) => (
              <div key={e} className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600 border border-gray-200">
                {e}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Want to Be Notified of Upcoming Events?"
        subtitle="Contact us and we'll add you to our event list — no spam, just relevant IT education."
      />
    </>
  );
}
