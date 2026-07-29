import { describe, it, expect } from "vitest";
import {
  heroCopy,
  pitchCopy,
  liveAgentLoads,
  standbyAgentLoads,
  allAgentLoads,
  workedExample,
  commandTiles,
  controlButtons,
  operatingCost,
} from "./sterimax-impact";
import { getSteriMaxAgent } from "./sterimax-agents";

describe("hero", () => {
  it("names the client and sets a hand-maintained countdown", () => {
    expect(heroCopy.client).toBe("SteriMax Inc.");
    expect(heroCopy.daysUntilInForce).toBeGreaterThan(0);
  });
});

describe("pitch", () => {
  it("balances the before and after columns", () => {
    expect(pitchCopy.today.length).toBe(pitchCopy.afterDeploy.length);
    expect(pitchCopy.today.length).toBeGreaterThanOrEqual(4);
  });
});

describe("agent loads", () => {
  it("covers the six real specialists", () => {
    expect(liveAgentLoads).toHaveLength(6);
    for (const row of liveAgentLoads) {
      expect(getSteriMaxAgent(row.agentId)).toBeDefined();
    }
  });

  it("keeps the invented standby agents out of the real roster", () => {
    expect(standbyAgentLoads).toHaveLength(4);
    for (const row of standbyAgentLoads) {
      expect(getSteriMaxAgent(row.agentId)).toBeUndefined();
    }
  });

  it("combines to ten agents", () => {
    expect(allAgentLoads).toHaveLength(10);
  });

  it("gives every agent positive saved hours and a workload line", () => {
    for (const row of allAgentLoads) {
      expect(row.hoursPerWeek).toBeGreaterThan(0);
      expect(row.workload.length).toBeGreaterThan(0);
      expect(row.name.length).toBeGreaterThan(0);
    }
  });

  it("uses unique ids across the whole ten", () => {
    expect(new Set(allAgentLoads.map((r) => r.agentId)).size).toBe(10);
  });
});

describe("worked example", () => {
  it("states headline totals that equal the sum of its steps", () => {
    const withoutHours = workedExample.steps.reduce((t, s) => t + s.withoutHours, 0);
    const withSeconds = workedExample.steps.reduce((t, s) => t + s.withSeconds, 0);
    expect(workedExample.totalWithoutHours).toBe(withoutHours);
    expect(workedExample.totalWithSeconds).toBe(withSeconds);
  });

  it("is dramatically faster with agents", () => {
    expect(workedExample.totalWithSeconds).toBeLessThan(workedExample.totalWithoutHours * 3600);
  });

  it("gives the presenter a cue", () => {
    expect(workedExample.presenterCue.length).toBeGreaterThan(0);
  });
});

describe("command center", () => {
  it("has four status tiles and four controls", () => {
    expect(commandTiles).toHaveLength(4);
    expect(controlButtons).toHaveLength(4);
  });

  it("labels and describes every control", () => {
    for (const button of controlButtons) {
      expect(button.label.length).toBeGreaterThan(0);
      expect(button.description.length).toBeGreaterThan(0);
      expect(button.confirmation.length).toBeGreaterThan(0);
    }
  });
});

describe("operating cost", () => {
  it("reports token and runtime figures", () => {
    expect(operatingCost.tokensPerMonth).toBeGreaterThan(0);
    expect(operatingCost.activeRuntimeHours).toBeGreaterThan(0);
    expect(operatingCost.tasksToday).toBeGreaterThan(0);
  });
});
