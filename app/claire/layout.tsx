import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Claire Command Center | Audcomp",
  description: "Content Marketing AI Agent — manage blog posts, SEO audits, newsletters, and publishing",
  robots: "noindex, nofollow",
};

export default function ClaireLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
