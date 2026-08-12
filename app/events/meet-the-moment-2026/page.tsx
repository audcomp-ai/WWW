import type { Metadata } from "next";
import CTABanner from "@/components/CTABanner";
import MeetTheMomentHero from "@/components/events/MeetTheMomentHero";
import CardFanCarousel, { type CardItem } from "@/components/ui/card-fan-carousel";
import { SectionAngle } from "@/components/SectionAngle";

export const metadata: Metadata = {
  title: "Meet the Moment 2026 | Audcomp",
  description:
    "Audcomp's flagship annual event — April 28, 2026 at Hamilton Golf and Country Club. Industry leaders, technology partners, and the Audcomp engineering team on the future of IT infrastructure and cyber security.",
};

// Placeholder imagery: no Meet the Moment photography exists in the repo yet.
// Swap these for real event photos (portrait crops read best in the fan) and
// the section works as-is.
const GALLERY: CardItem[] = [
  { imgUrl: "/images/gary-sohal-35-years.jpeg", alt: "Gary Sohal marking 35 years with Audcomp" },
  { imgUrl: "/images/ind_enterprise_1781220840854.png", alt: "Enterprise leaders in session" },
  { imgUrl: "/images/ind_healthcare_1781220794136.png", alt: "Healthcare IT roundtable" },
  { imgUrl: "/images/ind_municipalities_1781220804489.png", alt: "Municipal technology discussion" },
  { imgUrl: "/images/ind_universities_1781220814872.png", alt: "Education sector attendees" },
  { imgUrl: "/images/ind_manufacturing_1781220830507.png", alt: "Manufacturing technology showcase" },
  { imgUrl: "/images/ind_smb_1781220849628.png", alt: "Small business owners networking" },
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
