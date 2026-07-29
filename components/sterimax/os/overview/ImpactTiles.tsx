"use client";

import { allAgentLoads } from "@/data/sterimax-impact";
import {
  fteReplaced,
  annualCostSaved,
  secondsSavedPerWorkday,
  formatHoursMinutesSeconds,
} from "@/lib/sterimax-roi";
import { useClock } from "../../LiveClock";

/**
 * The headline tiles. The time-saved counter sits at its base figure until the presenter
 * presses Start Demo, then climbs — the tick advances every 3s and each tick adds a minute
 * of saved time, which reads as motion without running away during a long meeting.
 */
const SECONDS_ADDED_PER_TICK = 60;

export function ImpactTiles() {
  const { tick, running } = useClock();

  const baseSeconds = secondsSavedPerWorkday(allAgentLoads);
  const savedToday = baseSeconds + tick * SECONDS_ADDED_PER_TICK;
  const fte = fteReplaced(allAgentLoads);
  const annual = annualCostSaved(allAgentLoads);

  return (
    <div className="grid sm:grid-cols-3 gap-4">
      <div className="rounded-2xl bg-gradient-to-br from-[#071e3d] to-[#0d2d55] border border-[#06b6d4]/25 p-6">
        <div className="text-[10px] font-black uppercase tracking-widest text-[#4a6785] mb-2">
          Time saved today
        </div>
        <div className="text-3xl font-black text-white tracking-tight tabular-nums">
          {formatHoursMinutesSeconds(savedToday)}
        </div>
        <p className="text-[11px] font-medium text-[#4a6785] mt-2">
          {running ? "climbing live" : "press Start Demo to watch this rise"}
        </p>
      </div>

      <div className="rounded-2xl bg-white/[0.04] border border-white/[0.1] p-6">
        <div className="text-[10px] font-black uppercase tracking-widest text-[#4a6785] mb-2">
          FTEs replaced this week
        </div>
        <div className="text-3xl font-black text-white tracking-tight">
          {fte.toFixed(2)} FTE
        </div>
        <p className="text-[11px] font-medium text-[#4a6785] mt-2">at 40 hrs / week each</p>
      </div>

      <div className="rounded-2xl bg-white/[0.04] border border-white/[0.1] p-6">
        <div className="text-[10px] font-black uppercase tracking-widest text-[#4a6785] mb-2">
          Annual cost saved
        </div>
        <div className="text-3xl font-black text-white tracking-tight">
          ${annual.toLocaleString("en-CA", { maximumFractionDigits: 0 })}
        </div>
        <p className="text-[11px] font-medium text-[#4a6785] mt-2">
          vs hiring at $85/hr blended
        </p>
      </div>
    </div>
  );
}
