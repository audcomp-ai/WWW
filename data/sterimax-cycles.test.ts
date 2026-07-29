import { describe, it, expect } from "vitest";
import { agentCycles } from "./sterimax-cycles";
import { getSteriMaxAgent } from "./sterimax-agents";
import { liveAgentLoads } from "./sterimax-impact";
import { cycleDuration, inFlightFor } from "@/lib/sterimax-inflight";

describe("agent cycles", () => {
  it("covers every live agent", () => {
    expect(agentCycles).toHaveLength(liveAgentLoads.length);
    for (const load of liveAgentLoads) {
      expect(agentCycles.some((c) => c.agentId === load.agentId)).toBe(true);
    }
  });

  it("references only real agents", () => {
    for (const cycle of agentCycles) {
      expect(getSteriMaxAgent(cycle.agentId)).toBeDefined();
    }
  });

  it("gives every agent several tasks with positive durations", () => {
    for (const cycle of agentCycles) {
      expect(cycle.tasks.length).toBeGreaterThanOrEqual(4);
      for (const task of cycle.tasks) {
        expect(task.durationSeconds).toBeGreaterThan(0);
        expect(task.label.length).toBeGreaterThan(0);
      }
    }
  });

  it("keeps every cycle short enough to complete during a pitch", () => {
    for (const cycle of agentCycles) {
      expect(cycleDuration(cycle.tasks)).toBeLessThanOrEqual(60);
    }
  });

  it("staggers the agents so they do not all start together", () => {
    const offsets = agentCycles.map((c) => c.startOffset);
    expect(new Set(offsets).size).toBe(offsets.length);
  });

  it("has agents on different tasks at the start", () => {
    const labels = agentCycles.map((c) => inFlightFor(c, 0).taskLabel);
    expect(new Set(labels).size).toBe(labels.length);
  });

  it("completes at least one task for some agent within 20 seconds", () => {
    const anyComplete = agentCycles.some((c) => inFlightFor(c, 20).completed > 0);
    expect(anyComplete).toBe(true);
  });
});
