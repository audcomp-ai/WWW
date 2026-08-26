import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTABanner from "@/components/CTABanner";
import { SectionAngle } from "@/components/SectionAngle";
import { posts, postsByNewest, getPost, formatPostDate } from "@/data/blog";

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article Not Found | Audcomp" };
  return {
    title: `${post.title} | Audcomp`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: "article",
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = postsByNewest
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  return (
    <>
      {/* Hero, navy */}
      <section className="relative bg-[#071e3d] pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="w-[600px] h-[300px] rounded-full opacity-15"
            style={{ background: "radial-gradient(ellipse, #06b6d4 0%, transparent 70%)" }}
          />
        </div>
        <div className="relative max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#06b6d4] uppercase tracking-widest mb-6 hover:text-white transition-colors"
          >
            <span aria-hidden="true">&larr;</span> All Articles
          </Link>
          <p className="text-xs font-semibold text-[#06b6d4] uppercase tracking-widest mb-4">
            {post.category} · {formatPostDate(post.publishedAt)}
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-6 leading-tight">
            {post.title}
          </h1>
          <p className="text-white/55 text-lg leading-relaxed text-justify hyphens-auto">{post.excerpt}</p>
        </div>
      </section>

      <SectionAngle from="#071e3d" to="#ffffff" flip={false} height={64} />

      {/* Body, white */}
      <article className="bg-white py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden mb-12 border border-[#dde8f5] shadow-[0_20px_60px_rgba(7,30,61,0.10)]">
            <img
              src={post.image}
              alt=""
              aria-hidden="true"
              className="w-full aspect-[16/9] object-cover"
            />
          </div>

          <p className="text-slate-600 text-lg leading-relaxed text-justify hyphens-auto mb-10">{post.intro}</p>

          {post.sections.map((section) => (
            <section key={section.heading} className="mb-10">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {section.heading}
              </h2>
              {section.paras.map((para, i) => (
                <p key={i} className="text-slate-500 text-base leading-relaxed mb-4">
                  {para}
                </p>
              ))}
            </section>
          ))}

          <Link
            href={post.cta.href}
            className="inline-flex items-center gap-2 bg-[#0071e3] text-white font-semibold px-7 py-3.5 rounded-full text-sm hover:bg-[#0077ed] transition-colors"
          >
            {post.cta.label}
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </article>

      {related.length > 0 && (
        <>
          <SectionAngle from="#ffffff" to="#f0f7ff" flip={true} height={64} />
          <section className="bg-[#f0f7ff] py-20 px-4">
            <div className="max-w-5xl mx-auto">
              <p className="text-xs font-semibold text-[#06b6d4] uppercase tracking-widest mb-4">
                More in {post.category}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="group bg-white rounded-2xl border border-[#dde8f5] overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(0,113,227,0.15)] transition-all duration-300 hover:-translate-y-1"
                  >
                    <img src={r.image} alt="" aria-hidden="true" className="w-full aspect-[16/9] object-cover" />
                    <div className="p-5">
                      <p className="text-[11px] font-semibold text-[#06b6d4] uppercase tracking-widest mb-2">
                        {formatPostDate(r.publishedAt)}
                      </p>
                      <h3 className="text-base font-semibold text-[#0a2540] leading-snug group-hover:text-[#0071e3] transition-colors">
                        {r.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
          <SectionAngle from="#f0f7ff" to="#071e3d" flip={true} height={64} />
        </>
      )}

      {related.length === 0 && <SectionAngle from="#ffffff" to="#071e3d" flip={true} height={64} />}

      <CTABanner
        title="Have an IT Question?"
        subtitle="Our team is ready to help, whether you need advice on cybersecurity, cloud strategy, or AI readiness."
      />
    </>
  );
}
