import type { Metadata } from "next";
import { BlogCards } from "@/components/ui/cards";
import CTABanner from "@/components/CTABanner";
import { SectionAngle } from "@/components/SectionAngle";

export const metadata: Metadata = {
  title: "Blog & Insights | Audcomp — IT Expertise for Canadian Businesses",
  description:
    "IT insights, cybersecurity updates, cloud tips, and AI news from Audcomp's team of engineers in Canada.",
};

const allPosts = [
  {
    title: "How Microsoft Copilot is Changing the Modern Workspace",
    category: "AI Services",
    image: "/images/blog_copilot.png",
  },
  {
    title: "Zero Trust Architecture: No Longer Just for Enterprise",
    category: "Cyber Security",
    image: "/images/cyber_security_hero.png",
  },
  {
    title: "Optimizing Your Cloud Spend with Azure Hybrid Benefits",
    category: "Cloud Solutions",
    image: "/images/cloud_solutions_hero.png",
  },
  {
    title: "The Case for Managed IT: Why In-House IT Falls Short",
    category: "Managed IT",
    image: "/images/managed_it_hero.png",
  },
  {
    title: "Ransomware in 2024: What Every Canadian Business Needs to Know",
    category: "Cyber Security",
    image: "/images/cyber_security_hero.png",
  },
  {
    title: "What is a Virtual CIO — and Does Your Business Need One?",
    category: "Professional Services",
    image: "/images/professional_services_hero.png",
  },
];

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
            Cybersecurity, cloud, AI, and managed IT — practical insights from Audcomp&apos;s team of 100% engineers in Canada.
          </p>
        </div>
      </section>

      <SectionAngle from="#071e3d" to="#ffffff" flip={false} height={64} />

      {/* Articles — white */}
      <section className="bg-white py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <BlogCards
            title="Latest Articles"
            subtitle="Stay ahead of the curve with insights from our IT experts"
            cards={allPosts}
          />
        </div>
      </section>

      <SectionAngle from="#ffffff" to="#071e3d" flip={true} height={64} />

      <CTABanner
        title="Have an IT Question?"
        subtitle="Our team is ready to help — whether you need advice on cybersecurity, cloud strategy, or AI readiness."
      />
    </>
  );
}
