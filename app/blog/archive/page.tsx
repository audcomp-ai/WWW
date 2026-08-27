import type { Metadata } from "next";
import Link from "next/link";
import CTABanner from "@/components/CTABanner";
import { SectionAngle } from "@/components/SectionAngle";
import { postsByNewest, formatPostDate } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog Archive | Audcomp",
  description:
    "Every article from Audcomp's team, newest first. IT insights, cyber security, cloud, and AI for Canadian businesses.",
};

// A text index rather than a wall of cards. The blog index carries the images;
// this exists so that every post stays reachable and crawlable however many
// there are, and a list of a few hundred rows costs nothing to render. Grouped
// by month so a long list still has landmarks.
const byMonth = postsByNewest.reduce<Record<string, typeof postsByNewest>>((acc, post) => {
  const month = formatPostDate(post.publishedAt);
  (acc[month] ??= []).push(post);
  return acc;
}, {});

export default function BlogArchivePage() {
  return (
    <>
      <section className="relative bg-[#071e3d] pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="w-[600px] h-[300px] rounded-full opacity-15"
            style={{ background: "radial-gradient(ellipse, #06b6d4 0%, transparent 70%)" }}
          />
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold text-[#06b6d4] uppercase tracking-widest mb-5">
            Archive
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-5">
            Every article
          </h1>
          <p className="text-white/60 text-lg leading-relaxed">
            {postsByNewest.length} posts, newest first.{" "}
            <Link href="/blog" className="text-[#38bdf8] hover:underline">
              Back to the blog
            </Link>
          </p>
        </div>
      </section>

      <SectionAngle from="#071e3d" to="#ffffff" flip={false} height={64} />

      <section className="bg-white py-20 px-4">
        <div className="max-w-3xl mx-auto">
          {Object.entries(byMonth).map(([month, monthPosts]) => (
            <div key={month} className="mb-10">
              <h2 className="text-xs font-semibold text-[#06b6d4] uppercase tracking-widest mb-4">
                {month}
              </h2>
              <ul className="flex flex-col">
                {monthPosts.map((post) => (
                  <li key={post.slug} className="border-b border-slate-100 last:border-0">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group flex flex-col sm:flex-row sm:items-baseline sm:gap-4 py-3"
                    >
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest sm:w-36 shrink-0">
                        {post.category}
                      </span>
                      <span className="text-slate-700 group-hover:text-[#0071e3] transition-colors">
                        {post.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <SectionAngle from="#ffffff" to="#071e3d" flip={true} height={64} />

      <CTABanner />
    </>
  );
}
