import type { Metadata } from "next";
import CTABanner from "@/components/CTABanner";
import MeetTheMomentHero from "@/components/events/MeetTheMomentHero";
import CardFanCarousel, { type CardItem } from "@/components/ui/card-fan-carousel";
import { SectionAngle } from "@/components/SectionAngle";

export const metadata: Metadata = {
  title: "Meet the Moment 2024 | Audcomp",
  description:
    "A look back at Meet the Moment 2024, Audcomp's annual event bringing clients, technology partners, and the Audcomp team together for a day of sessions and exhibits.",
};

// Converted from the camera originals in public/images/MTM2024 (HEIC), which are
// gitignored; only these web JPEGs are committed. The hero video was HEVC in a
// .mov container, transcoded to H.264 as public/mtm2024.mp4.
const GALLERY: CardItem[] = [
  { imgUrl: "/images/events/mtm2024/session-1.jpg", alt: "A session underway at Meet the Moment 2024" },
  { imgUrl: "/images/events/mtm2024/session-2.jpg", alt: "Presentation at Meet the Moment 2024" },
  { imgUrl: "/images/events/mtm2024/session-3.jpg", alt: "On stage at Meet the Moment 2024" },
  { imgUrl: "/images/events/mtm2024/session-4.jpg", alt: "Meet the Moment 2024" },
  { imgUrl: "/images/events/mtm2024/room-1.jpg", alt: "Guests at Meet the Moment 2024" },
  { imgUrl: "/images/events/mtm2024/room-2.jpg", alt: "A full room at Meet the Moment 2024" },
  { imgUrl: "/images/events/mtm2024/room-3.jpg", alt: "Attendees at Meet the Moment 2024" },
  { imgUrl: "/images/events/mtm2024/room-4.jpg", alt: "Conversations at Meet the Moment 2024" },
  { imgUrl: "/images/events/mtm2024/room-5.jpg", alt: "The room at Meet the Moment 2024" },
];

export default function MeetTheMoment2024Page() {
  return (
    <>
      <MeetTheMomentHero
        year="2024"
        eyebrow="Past Event"
        blurb="Our 2024 gathering brought clients, technology partners, and the Audcomp team together for a day of sessions, exhibits, and conversations about where IT infrastructure and cyber security go next."
        date="October 2024"
        location="Hamilton Golf and Country Club"
        ctaLabel="Get Invited Next Year"
        media={{ kind: "video", src: "/mtm2024.mp4" }}
      />

      <SectionAngle from="#071e3d" to="#ffffff" flip={false} height={64} />

      <section className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center mb-4">
          <p className="text-xs font-semibold text-[#06b6d4] uppercase tracking-widest mb-4">
            From the Room
          </p>
          <h2 className="text-3xl font-bold text-foreground mb-5">
            Moments from 2024
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Sessions, exhibits, and a room that stayed full from the first talk to
            the last conversation.
          </p>
        </div>

        <CardFanCarousel cards={GALLERY} />
      </section>

      <SectionAngle from="#ffffff" to="#071e3d" flip={true} height={64} />

      <CTABanner
        title="Never Miss an Update"
        subtitle="Subscribe to our newsletter to receive invitations to our exclusive events, webinars, and technical workshops."
      />
    </>
  );
}
