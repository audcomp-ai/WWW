import type { Metadata } from "next";
import CTABanner from "@/components/CTABanner";
import MeetTheMomentHero from "@/components/events/MeetTheMomentHero";
import CardFanCarousel, { type CardItem } from "@/components/ui/card-fan-carousel";
import { SectionAngle } from "@/components/SectionAngle";

export const metadata: Metadata = {
  title: "Meet the Moment 2026 | Audcomp",
  description:
    "Audcomp's flagship annual event, April 28, 2026 at Hamilton Golf and Country Club. Industry leaders, technology partners, and the Audcomp engineering team on the future of IT infrastructure and cyber security.",
};

// Real event photography, converted from the camera originals (HEIC/ARW) and
// cropped to portrait for the fan. Originals live in public/images/MTM2026/
// and are gitignored; only these web JPEGs are committed.
const GALLERY: CardItem[] = [
  { imgUrl: "/images/events/mtm2026/gary-speech-40th.jpg", alt: "Gary's speech at the Audcomp 40th anniversary" },
  { imgUrl: "/images/events/mtm2026/40-years-presentation.jpg", alt: "Audcomp 40 years presentation" },
  { imgUrl: "/images/events/mtm2026/jons-presentation.jpg", alt: "Jon presenting to the room" },
  { imgUrl: "/images/events/mtm2026/hpe.jpg", alt: "HPE at Meet the Moment" },
  { imgUrl: "/images/events/mtm2026/intel.jpg", alt: "Intel at Meet the Moment" },
  { imgUrl: "/images/events/mtm2026/intel-cameron-allen.jpg", alt: "Cameron Allen of Intel presenting" },
  { imgUrl: "/images/events/mtm2026/td-synnex.jpg", alt: "TD Synnex at Meet the Moment" },
  { imgUrl: "/images/events/mtm2026/dsc06701.jpg", alt: "Guests at Meet the Moment" },
];

export default function MeetTheMoment2026Page() {
  return (
    <>
      <MeetTheMomentHero />

      <SectionAngle from="#071e3d" to="#ffffff" flip={false} height={64} />

      <section className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center mb-4">
          <p className="text-xs font-semibold text-[#06b6d4] uppercase tracking-widest mb-4">
            From the Room
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#0a2540] mb-5 tracking-tight">
            Moments from Last Year
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Industry leaders, technology partners, and the Audcomp team, together for a
            day of talks, demos, and conversations that carried on long after.
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
