"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { TaskRun } from "@/data/sterimax-runs";

export type RunPhase = "idle" | "running" | "complete";

/** How long each step is held before the next completes. */
export const STEP_MS = 1100;

/**
 * Owns one presenter-triggered task run. Kept separate from LiveClock: the clock is
 * ambient and always moving, whereas a run must not start until it is clicked, and
 * it ends.
 */
export function useTaskRun(run: TaskRun | undefined) {
  const [phase, setPhase] = useState<RunPhase>("idle");
  const [currentStep, setCurrentStep] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = useCallback(() => {
    if (timer.current !== null) {
      clearInterval(timer.current);
      timer.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    stop();
    setPhase("idle");
    setCurrentStep(0);
  }, [stop]);

  const start = useCallback(() => {
    if (!run) return;
    stop();
    setCurrentStep(0);
    setPhase("running");

    timer.current = setInterval(() => {
      setCurrentStep((step) => {
        const nextStep = step + 1;
        if (nextStep >= run.steps.length) {
          stop();
          setPhase("complete");
          return run.steps.length;
        }
        return nextStep;
      });
    }, STEP_MS);
  }, [run, stop]);

  // Clear the interval if the panel unmounts mid-run. Switching agents is handled by
  // the consumer remounting this panel with a per-agent key, which resets state for us —
  // resetting from an effect here would only add a cascading render.
  useEffect(() => stop, [stop]);

  return { phase, currentStep, start, reset };
}
