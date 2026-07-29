"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { commandTiles, controlButtons } from "@/data/sterimax-impact";
import { useClock } from "../../LiveClock";

const CONFIRMATION_MS = 2600;

/** Runs completed per elapsed second while the demo is running. */
const RUNS_PER_SECOND = 0.4;

/**
 * The four controls are presentation affordances, not wired actions. Each acknowledges the
 * click with its confirmation label so it never looks broken — and never claims to have done
 * something it did not.
 */
export function CommandCenter() {
  const { elapsedSeconds } = useClock();
  const [confirmed, setConfirmed] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // The runs-today figure on the first tile climbs while the demo runs; the rest are stable
  // facts about the deployment and correctly stay put.
  const extraRuns = Math.floor(elapsedSeconds * RUNS_PER_SECOND);
  const tiles = commandTiles.map((tile, i) =>
    i === 0
      ? { ...tile, detail: tile.detail.replace("163 runs today", `${163 + extraRuns} runs today`) }
      : tile,
  );

  const acknowledge = useCallback((id: string) => {
    if (timer.current !== null) clearTimeout(timer.current);
    setConfirmed(id);
    timer.current = setTimeout(() => setConfirmed(null), CONFIRMATION_MS);
  }, []);

  useEffect(
    () => () => {
      if (timer.current !== null) clearTimeout(timer.current);
    },
    [],
  );

  return (
    <section>
      <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#06b6d4] mb-4">
        Command center
      </span>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {tiles.map((tile) => (
          <div key={tile.label} className="rounded-2xl bg-white/[0.04] border border-white/[0.1] p-6">
            <div className="text-[10px] font-black uppercase tracking-widest text-[#4a6785] mb-2">
              {tile.label}
            </div>
            <div className="text-3xl font-black text-white tracking-tight">{tile.value}</div>
            <p className="text-[11px] font-medium text-[#4a6785] mt-2">{tile.detail}</p>
          </div>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {controlButtons.map((button) => {
          const isConfirmed = confirmed === button.id;
          return (
            <button
              key={button.id}
              onClick={() => acknowledge(button.id)}
              className={`text-left rounded-2xl p-5 border transition-colors ${
                isConfirmed
                  ? "bg-[#06b6d4]/[0.1] border-[#06b6d4]/50"
                  : "bg-white/[0.04] border-white/[0.1] hover:border-[#0071e3]/40"
              }`}
            >
              <span className="flex items-center gap-2.5 mb-1.5">
                <i
                  className={`fas ${isConfirmed ? "fa-circle-check" : button.icon} text-[#06b6d4] text-sm`}
                />
                <span className="text-white text-[13px] font-bold">{button.label}</span>
              </span>
              <span className="block text-[11px] font-medium text-[#4a6785] leading-snug">
                {isConfirmed ? button.confirmation : button.description}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
