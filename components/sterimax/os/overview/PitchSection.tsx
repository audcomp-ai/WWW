"use client";

import { pitchCopy } from "@/data/sterimax-impact";

export function PitchSection() {
  return (
    <section>
      <h2 className="text-2xl lg:text-4xl font-black text-white tracking-tight mb-3 max-w-4xl">
        {pitchCopy.headline}
      </h2>
      <p className="text-[#4a6785] text-sm lg:text-base font-medium mb-8 max-w-3xl">
        {pitchCopy.sub}
      </p>

      <div className="grid md:grid-cols-2 gap-5">
        <div className="rounded-2xl bg-[#ef4444]/[0.06] border border-[#ef4444]/25 p-6">
          <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#ef4444] mb-5">
            Today · without agents
          </span>
          <ul className="flex flex-col gap-3">
            {pitchCopy.today.map((line) => (
              <li key={line} className="flex items-start gap-3">
                <i className="fas fa-xmark text-[#ef4444] text-xs mt-1 shrink-0" />
                <span className="text-[13px] font-medium text-slate-300 leading-snug">{line}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-[#06b6d4]/[0.06] border border-[#06b6d4]/30 p-6">
          <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#06b6d4] mb-5">
            After deploy · with agents
          </span>
          <ul className="flex flex-col gap-3">
            {pitchCopy.afterDeploy.map((line) => (
              <li key={line} className="flex items-start gap-3">
                <i className="fas fa-check text-[#06b6d4] text-xs mt-1 shrink-0" />
                <span className="text-[13px] font-medium text-white leading-snug">{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
