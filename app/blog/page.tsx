import type { Metadata } from "next";
import Link from "next/link";
import { BlogCards } from "@/components/ui/cards";
import CTABanner from "@/components/CTABanner";
import { SectionAngle } from "@/components/SectionAngle";
import { postsByNewest, toCard } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog & Insights | Audcomp, IT Expertise for Canadian Businesses",
  description:
    "IT insights, cybersecurity updates, cloud tips, and AI news from Audcomp's team of technicians in Canada.",
};

// Derived from data/blog.ts so the index can never list a post that has no
// page, or a title that differs from the one on it. The first six run as full
// cards; the rest sit in the scrolling strip below them.
const FEATURED_COUNT = 6;

const featuredPosts = postsByNewest.slice(0, FEATURED_COUNT).map(toCard);
const archivePosts = postsByNewest.slice(FEATURED_COUNT);


export default function BlogPage() {
  return (
    <>
      {/* Hero — navy */}
      <section className="relative bg-[#071e3d] pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[300px] rounded-full opacity-15" style={{ background: "radial-gradient(ellipse, #06b6d4 0%, transparent 70%)" }} />
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold text-[#06b6d4] uppercase tracking-widest mb-5">Insights</p>
          <h1 className="text-5xl sm:text-6xl font-bold text-white tracking-tight mb-6">
            IT Expertise for<br />Canadian Businesses
          </h1>
          <p className="text-white/55 text-lg leading-relaxed max-w-xl mx-auto">
            Cybersecurity, cloud, AI, and managed IT, practical insights from Audcomp&apos;s team of technicians in Canada.
          </p>
        </div>
      </section>

      <SectionAngle from="#071e3d" to="#ffffff" flip={false} height={64} />

      {/* Articles — white */}
      <section className="bg-white py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <BlogCards
            title="Latest Articles"
            subtitle="Practical guidance from the team that runs this work every day"
            cards={featuredPosts}
          />
        </div>
      </section>

      {/* Archive strip, small thumbnails that scroll horizontally */}
      {archivePosts.length > 0 && (
        <section className="bg-white pb-24 px-4">
          <div className="max-w-6xl mx-auto">
            <p className="text-xs font-semibold text-[#06b6d4] uppercase tracking-widest mb-6">
              More Reading
            </p>
            {/* snap-x keeps a card aligned to the left edge after a flick on
                touch; overflow-x-auto keeps the page itself from scrolling. */}
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4">
              {archivePosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group snap-start shrink-0 w-[220px] sm:w-[240px] bg-white rounded-2xl border border-[#dde8f5] overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(0,113,227,0.15)] hover:border-[#0071e3]/30 transition-all duration-300 hover:-translate-y-1"
                >
                  <img
                    src={p.image}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="w-full aspect-[16/10] object-cover"
                  />
                  <div className="p-4">
                    <p className="text-[10px] font-semibold text-[#06b6d4] uppercase tracking-widest mb-1.5">
                      {p.category}
                    </p>
                    <h3 className="text-sm font-semibold text-[#0a2540] leading-snug line-clamp-3 group-hover:text-[#0071e3] transition-colors">
                      {p.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <SectionAngle from="#ffffff" to="#071e3d" flip={true} height={64} />

      <CTABanner
        title="Have an IT Question?"
        subtitle="Our team is ready to help, whether you need advice on cybersecurity, cloud strategy, or AI readiness."
      />
    </>
  );
}
