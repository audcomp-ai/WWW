import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin | Audcomp",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#071e3d]">
      <header className="shrink-0 border-b border-white/10 bg-[#071e3d]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/admin/sales-training"
            className="text-white text-[11px] font-black uppercase tracking-[0.3em]"
          >
            Audcomp <span className="text-[#06b6d4]">Admin</span>
          </Link>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#4a6785]">
            Internal · not indexed
          </span>
        </div>
      </header>
      <div className="flex-1">{children}</div>
    </div>
  );
}
