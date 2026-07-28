import type { Metadata } from "next";
import Link from "next/link";
import { sterimaxAgents } from "@/data/sterimax-agents";

export const metadata: Metadata = {
  title: "Sales Training | Audcomp Admin",
  robots: { index: false, follow: false },
};

export default function SalesTrainingPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-16">
      <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#06b6d4] mb-5">
        <i className="fas fa-chalkboard-user" /> Sales Training
      </span>
      <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight mb-3">
        Prospect demos.
      </h1>
      <p className="text-[#4a6785] text-base font-medium mb-12 max-w-2xl">
        Live agent portals built from a prospect&apos;s recommendation deck. Open one full-screen
        to present it.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="rounded-2xl bg-white/[0.06] border border-white/[0.1] backdrop-blur-sm p-8">
          <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#06b6d4] mb-4">
            Pharmaceutical
          </span>
          <h2 className="text-2xl font-black text-white tracking-tight mb-2">SteriMax Inc.</h2>
          <p className="text-[#4a6785] text-sm font-medium leading-relaxed mb-6">
            Sterile injectables, Oakville. {sterimaxAgents.length} specialists plus Wilfred,
            mapped to the 2026&ndash;2027 FDR changes.
          </p>
          <div className="flex flex-col gap-2">
            <Link
              href="/admin/sales-training/sterimax/os"
              className="inline-flex items-center gap-2 text-white text-[10px] font-black uppercase tracking-widest hover:text-[#06b6d4] transition-colors"
            >
              <i className="fas fa-gauge-high text-[10px]" /> Open the AI OS dashboard
            </Link>
            <Link
              href="/admin/sales-training/sterimax"
              className="inline-flex items-center gap-2 text-[#4a6785] text-[10px] font-black uppercase tracking-widest hover:text-[#06b6d4] transition-colors"
            >
              <i className="fas fa-users text-[10px]" /> Open the agent roster
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
