import type { Metadata } from "next";
import CTABanner from "@/components/CTABanner";
import MeetTheMomentHero from "@/components/events/MeetTheMomentHero";
import CardFanCarousel, { type CardItem } from "@/components/ui/card-fan-carousel";
import { SectionAngle } from "@/components/SectionAngle";

export const metadata: Metadata = {
  title: "Meet the Moment 2025 | Audcomp",
  description:
    "A look back at Meet the Moment 2025, Audcomp's annual event at Hamilton Golf and Country Club, with sessions and exhibits from Fortinet, HP, Eaton, Logitech, WatchGuard, Field Effect, and Hornetsecurity.",
};

// Converted from the camera originals in public/images/MTM2025 (HEIC), which are
// gitignored; only these web JPEGs are committed.
const GALLERY: CardItem[] = [
  { imgUrl: "/images/events/mtm2025/field-effect.jpg", alt: "Field Effect session at Meet the Moment 2025" },
  { imgUrl: "/images/events/mtm2025/fortinet.jpg", alt: "Fortinet at Meet the Moment 2025" },
  { imgUrl: "/images/events/mtm2025/hp.jpg", alt: "HP at Meet the Moment 2025" },
  { imgUrl: "/images/events/mtm2025/eaton.jpg", alt: "Eaton at Meet the Moment 2025" },
  { imgUrl: "/images/events/mtm2025/logitech.jpg", alt: "Logitech at Meet the Moment 2025" },
  { imgUrl: "/images/events/mtm2025/watchguard.jpg", alt: "WatchGuard at Meet the Moment 2025" },
  { imgUrl: "/images/events/mtm2025/hornet-security.jpg", alt: "Hornetsecurity at Meet the Moment 2025" },
  { imgUrl: "/images/events/mtm2025/exhibitor-floor.jpg", alt: "The exhibitor floor at Meet the Moment 2025" },
  { imgUrl: "/images/events/mtm2025/room-1.jpg", alt: "Guests during a session at Meet the Moment 2025" },
  { imgUrl: "/images/events/mtm2025/room-2.jpg", alt: "A full room at Meet the Moment 2025" },
  { imgUrl: "/images/events/mtm2025/room-3.jpg", alt: "Attendees at Meet the Moment 2025" },
];

export default function MeetTheMoment2025Page() {
  return (
    <>
      <MeetTheMomentHero
        year="2025"
        eyebrow="Past Event"
        blurb="Our 2025 gathering brought industry leaders, technology partners, and the Audcomp team together for a day of sessions, exhibits, and conversations about where IT infrastructure and cyber security go next."
        date="May 2025"
        location="Hamilton Golf and Country Club"
        ctaLabel="Get Invited Next Year"
        media={{
          kind: "image",
          src: "/images/events/mtm2025/card.jpg",
          alt: "A session underway in a full room at Meet the Moment 2025",
        }}
      />

      <SectionAngle from="#071e3d" to="#ffffff" flip={false} height={64} />

      <section className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center mb-4">
          <p className="text-xs font-semibold text-[#06b6d4] uppercase tracking-widest mb-4">
            From the Room
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#0a2540] mb-5 tracking-tight">
            Moments from 2025
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Sessions and exhibits from Fortinet, HP, Eaton, Logitech, WatchGuard,
            Field Effect, and Hornetsecurity, alongside a room that stayed full all day.
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
