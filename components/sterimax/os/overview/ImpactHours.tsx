"use client";

import { allAgentLoads } from "@/data/sterimax-impact";
import {
  BLENDED_RATE,
  totalHoursPerWeek,
  fteReplaced,
  annualHoursSaved,
  annualCostSaved,
} from "@/lib/sterimax-roi";

export function ImpactHours() {
  const hours = totalHoursPerWeek(allAgentLoads);
  const fte = fteReplaced(allAgentLoads);
  const annualHours = annualHoursSaved(allAgentLoads);
  const annualCost = annualCostSaved(allAgentLoads);

  const tiles = [
    { label: "Hrs / week saved", value: `${hours} hrs`, detail: `across ${allAgentLoads.length} agents` },
    { label: "Full-time roles", value: `${fte.toFixed(2)} FTE`, detail: "at 40 hrs/wk" },
    { label: "Annual hrs saved", value: annualHours.toLocaleString("en-CA"), detail: "52-week projection" },
    {
      label: "Annual cost saved",
      value: `$${(annualCost / 1000).toFixed(1)}k`,
      detail: "vs. hiring",
    },
  ];

  return (
    <section>
      <div className="flex items-baseline justify-between gap-4 flex-wrap mb-4">
        <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#06b6d4]">
          Impact, what this would cost in human hours
        </span>
        <span className="text-[10px] font-black uppercase tracking-widest text-[#4a6785]">
          Estimated against ${BLENDED_RATE}/hr blended rate
        </span>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tiles.map((tile) => (
          <div key={tile.label} className="rounded-2xl bg-white/[0.04] border border-white/[0.1] p-6">
            <div className="text-[10px] font-black uppercase tracking-widest text-[#4a6785] mb-2">
              {tile.label}
            </div>
            <div className="text-2xl font-black text-white tracking-tight">{tile.value}</div>
            <p className="text-[11px] font-medium text-[#4a6785] mt-2">{tile.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
