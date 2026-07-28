import { describe, it, expect } from "vitest";
import { taskRuns, getTaskRun } from "./sterimax-runs";
import { sterimaxAgents, getSteriMaxAgent } from "./sterimax-agents";

describe("coverage", () => {
  it("gives every specialist exactly one run", () => {
    expect(taskRuns).toHaveLength(sterimaxAgents.length);
    for (const agent of sterimaxAgents) {
      expect(getTaskRun(agent.id)).toBeDefined();
    }
  });

  it("gives Wilfred no run — he orchestrates rather than produces", () => {
    expect(getTaskRun("wilfred")).toBeUndefined();
  });

  it("references only real agents", () => {
    for (const run of taskRuns) {
      expect(getSteriMaxAgent(run.agentId)).toBeDefined();
    }
  });

  it("returns undefined for an unknown agent", () => {
    expect(getTaskRun("nobody")).toBeUndefined();
  });
});

describe("every run", () => {
  it.each(taskRuns)("$agentId has a named task", (run) => {
    expect(run.taskName.length).toBeGreaterThan(0);
  });

  it.each(taskRuns)("$agentId has five to seven steps", (run) => {
    expect(run.steps.length).toBeGreaterThanOrEqual(5);
    expect(run.steps.length).toBeLessThanOrEqual(7);
  });

  it.each(taskRuns)("$agentId gives every step a label and detail", (run) => {
    for (const step of run.steps) {
      expect(step.label.length).toBeGreaterThan(0);
      expect(step.detail.length).toBeGreaterThan(0);
    }
  });
});

describe("every artifact", () => {
  it.each(taskRuns)("$agentId states a review state and audit note", (run) => {
    expect(run.artifact.reviewState.length).toBeGreaterThan(0);
    expect(run.artifact.auditNote.length).toBeGreaterThan(0);
  });

  it.each(taskRuns)("$agentId has a title and subtitle", (run) => {
    expect(run.artifact.title.length).toBeGreaterThan(0);
    expect(run.artifact.subtitle.length).toBeGreaterThan(0);
  });

  it.each(taskRuns)("$agentId has a well-formed body for its kind", (run) => {
    const a = run.artifact;
    if (a.kind === "table") {
      expect(a.columns?.length).toBeGreaterThan(0);
      expect(a.rows?.length).toBeGreaterThan(0);
      for (const row of a.rows ?? []) {
        expect(row).toHaveLength(a.columns?.length ?? 0);
      }
    } else {
      expect(a.fields.length).toBeGreaterThanOrEqual(3);
      for (const f of a.fields) {
        expect(f.label.length).toBeGreaterThan(0);
        expect(f.value.length).toBeGreaterThan(0);
      }
    }
  });
});
