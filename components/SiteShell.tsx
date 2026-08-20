"use client";

import { usePathname } from "next/navigation";
import Nav from "./Nav";
import Footer from "./Footer";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Surfaces that render their own chrome instead of the public nav and footer.
  const isBareSurface = pathname.startsWith("/claire") || pathname.startsWith("/admin");

  if (isBareSurface) {
    return <>{children}</>;
  }

  // Only the homepage opens on a full-bleed hero tall enough to sit behind the
  // bar. Pulling content up by the bar's height lets the hero run underneath
  // it, which is what allows the bar to go transparent at scroll top. The other
  // pages keep a solid bar: six of them open on a section whose heading sits
  // near the top, and 56px of that would end up under the bar.
  const heroRunsUnderNav = pathname === "/";

  return (
    <>
      <Nav />
      {/* The bar is h-14 plus a 1px bottom border, so pulling up by 3.5rem left
          one row of white body background showing above the hero. The calc
          keeps the two in step if either value changes. */}
      <main className={`flex-1 ${heroRunsUnderNav ? "-mt-[calc(3.5rem+1px)]" : ""}`}>{children}</main>
      <Footer />
    </>
  );
}
