"use client";

import { allAgentLoads, operatingCost } from "@/data/sterimax-impact";
import { osSpend } from "@/data/sterimax-os";
import { monthlyHumanCost, percentSavedVsHuman } from "@/lib/sterimax-roi";

export function OperatingCost() {
  // The agents' monthly cost is the deck's month-to-date spend, so the savings claim is
  // tied to the same $1,306 shown on the Spend tab rather than a separate invented figure.
  const humanCost = monthlyHumanCost(allAgentLoads);
  const saved = percentSavedVsHuman(allAgentLoads, osSpend.monthToDate);

  const tiles = [
    {
      label: "Tokens / mo",
      value: `${(operatingCost.tokensPerMonth / 1_000_000).toFixed(2)} M`,
      detail: `${operatingCost.tokensPerMonth.toLocaleString("en-CA")} total`,
    },
    {
      label: "Active runtime",
      value: `${operatingCost.activeRuntimeHours} hrs`,
      detail: "this month",
    },
    {
      label: "Cost / month",
      value: `$${osSpend.monthToDate.toLocaleString("en-CA")}`,
      detail: `${operatingCost.tasksToday} tasks today`,
    },
    {
      label: "Vs human team",
      value: `${Math.round(saved)}% saved`,
      detail: `$${humanCost.toLocaleString("en-CA", { maximumFractionDigits: 0 })}/mo human cost`,
    },
  ];

  return (
    <section>
      <div className="flex items-baseline justify-between gap-4 flex-wrap mb-4">
        <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#06b6d4]">
          Live operating cost
        </span>
        <span className="text-[10px] font-black uppercase tracking-widest text-[#4a6785]">
          Billed on use · no salary, no benefits
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
