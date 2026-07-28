import { describe, it, expect } from "vitest";
import {
  orchestrator,
  sterimaxAgents,
  allSteriMaxAgents,
  getSteriMaxAgent,
} from "./sterimax-agents";

describe("roster shape", () => {
  it("has Wilfred as the orchestrator, separate from the six", () => {
    expect(orchestrator.id).toBe("wilfred");
    expect(sterimaxAgents.map((a) => a.id)).not.toContain("wilfred");
  });

  it("carries the six deck agents in deck order", () => {
    expect(sterimaxAgents.map((a) => a.id)).toEqual([
      "david",
      "sam",
      "olivia",
      "maya",
      "quinn",
      "claire",
    ]);
  });

  it("combines to seven agents with unique ids", () => {
    expect(allSteriMaxAgents).toHaveLength(7);
    expect(new Set(allSteriMaxAgents.map((a) => a.id)).size).toBe(7);
  });
});

describe("every agent", () => {
  it.each(allSteriMaxAgents)("$id has exactly four capabilities", (agent) => {
    expect(agent.capabilities).toHaveLength(4);
  });

  it.each(allSteriMaxAgents)("$id has a non-empty live script", (agent) => {
    expect(agent.liveScript.length).toBeGreaterThan(0);
  });

  it.each(allSteriMaxAgents)("$id wires into at least one system", (agent) => {
    expect(agent.wiresInto.length).toBeGreaterThan(0);
  });

  it.each(allSteriMaxAgents)("$id points at an existing portrait", (agent) => {
    expect(agent.image).toBe(`/images/agents/${agent.id}.png`);
  });

  it.each(allSteriMaxAgents)("$id has a positive run cadence", (agent) => {
    expect(agent.runCadence).toBeGreaterThan(0);
  });

  it.each(allSteriMaxAgents)("$id headline ends with its accent tail", (agent) => {
    expect(agent.headline.endsWith(agent.headlineAccent)).toBe(true);
  });
});

describe("deck fidelity", () => {
  it("marks David as the highest-value fit", () => {
    expect(getSteriMaxAgent("david")?.badge).toBe("HIGHEST-VALUE FIT");
  });

  it("marks Claire as post-Andone", () => {
    expect(getSteriMaxAgent("claire")?.badge).toBe("POST-ANDONE");
  });

  it("alternates surfaces the way the deck does", () => {
    expect(sterimaxAgents.map((a) => a.surface)).toEqual([
      "dark",
      "light",
      "dark",
      "light",
      "dark",
      "dark",
    ]);
  });

  it("prints the deck agent numbers", () => {
    expect(getSteriMaxAgent("david")?.agentNo).toBe("007406");
    expect(getSteriMaxAgent("sam")?.agentNo).toBe("007402");
    expect(getSteriMaxAgent("maya")?.agentNo).toBe("007403");
    expect(getSteriMaxAgent("olivia")?.agentNo).toBe("007404");
    expect(getSteriMaxAgent("quinn")?.agentNo).toBe("007405");
  });

  it("omits agent numbers for Wilfred and Claire", () => {
    expect(orchestrator.agentNo).toBeUndefined();
    expect(getSteriMaxAgent("claire")?.agentNo).toBeUndefined();
  });
});

describe("getSteriMaxAgent", () => {
  it("finds an agent by id", () => {
    expect(getSteriMaxAgent("olivia")?.name).toBe("Olivia");
  });

  it("returns undefined for an unknown id", () => {
    expect(getSteriMaxAgent("nobody")).toBeUndefined();
  });
});
