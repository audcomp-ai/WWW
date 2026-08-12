import type { Metadata } from "next";
import CTABanner from "@/components/CTABanner";
import MeetTheMomentHero from "@/components/events/MeetTheMomentHero";

export const metadata: Metadata = {
  title: "Meet the Moment 2026 | Audcomp",
  description:
    "Audcomp's flagship annual event, April 28, 2026 at Hamilton Golf and Country Club. Industry leaders, technology partners, and the Audcomp engineering team on the future of IT infrastructure and cyber security.",
};

export default function MeetTheMoment2026Page() {
  return (
    <>
      <MeetTheMomentHero />

      <CTABanner
        title="Never Miss an Update"
        subtitle="Subscribe to our newsletter to receive invitations to our exclusive events, webinars, and technical workshops."
      />
    </>
  );
}
