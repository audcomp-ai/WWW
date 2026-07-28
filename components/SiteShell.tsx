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

  return (
    <>
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
