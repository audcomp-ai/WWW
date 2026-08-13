import type { Metadata } from "next";
import CTABanner from "@/components/CTABanner";
import MeetTheMomentHero from "@/components/events/MeetTheMomentHero";
import CardFanCarousel, { type CardItem } from "@/components/ui/card-fan-carousel";
import { SectionAngle } from "@/components/SectionAngle";

export const metadata: Metadata = {
  title: "RBC Canadian Open 2024 | Audcomp",
  description:
    "Audcomp at the RBC Canadian Open 2024 in Hamilton, a week of tournament golf, client hospitality, and time with the partners and people behind our work.",
};

// Converted from the originals in public/images/RBC2024, which are gitignored;
// only these web JPEGs are committed.
const GALLERY: CardItem[] = [
  { imgUrl: "/images/events/rbc2024/tournament-1.jpg", alt: "A player and caddie walking the fairway at the RBC Canadian Open 2024" },
  { imgUrl: "/images/events/rbc2024/tournament-2.jpg", alt: "Tournament play at the RBC Canadian Open 2024" },
  { imgUrl: "/images/events/rbc2024/course-1.jpg", alt: "The course at the RBC Canadian Open 2024" },
  { imgUrl: "/images/events/rbc2024/course-2.jpg", alt: "Spectators around the course at the RBC Canadian Open 2024" },
  { imgUrl: "/images/events/rbc2024/guests-1.jpg", alt: "The Rink hospitality structure at the RBC Canadian Open 2024" },
  { imgUrl: "/images/events/rbc2024/guests-2.jpg", alt: "On the grounds at the RBC Canadian Open 2024" },
  { imgUrl: "/images/events/rbc2024/guests-3.jpg", alt: "Crowds at the RBC Canadian Open 2024" },
  { imgUrl: "/images/events/rbc2024/guests-4.jpg", alt: "Tournament grounds at the RBC Canadian Open 2024" },
  { imgUrl: "/images/events/rbc2024/guests-5.jpg", alt: "A view across the course at the RBC Canadian Open 2024" },
];

export default function RBCCanadianOpen2024Page() {
  return (
    <>
      <MeetTheMomentHero
        title="RBC Canadian Open"
        year="2024"
        eyebrow="Past Event"
        blurb="Audcomp joined clients and technology partners at the RBC Canadian Open, a week of tournament golf in Hamilton and time away from the day-to-day with the people we work alongside all year."
        date="June 2024"
        location="Hamilton Golf and Country Club"
        ctaLabel="Join Us Next Time"
        media={{
          kind: "image",
          src: "/images/events/rbc2024/card.jpg",
          alt: "Galleries packed around the tee at the RBC Canadian Open 2024",
        }}
      />

      <SectionAngle from="#071e3d" to="#ffffff" flip={false} height={64} />

      <section className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center mb-4">
          <p className="text-xs font-semibold text-[#06b6d4] uppercase tracking-widest mb-4">
            From the Course
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#0a2540] mb-5 tracking-tight">
            Moments from the Open
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Tournament golf, packed galleries, and a week of conversations that had
            nothing to do with tickets or uptime.
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
