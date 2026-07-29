import { describe, it, expect } from "vitest";
import {
  cycleDuration,
  inFlightFor,
  totalCompleted,
  type AgentCycle,
} from "./sterimax-inflight";

const cycle: AgentCycle = {
  agentId: "test",
  name: "Test",
  startOffset: 0,
  tasks: [
    { label: "First", durationSeconds: 10 },
    { label: "Second", durationSeconds: 20 },
    { label: "Third", durationSeconds: 30 },
  ],
};

describe("cycleDuration", () => {
  it("sums every task", () => {
    expect(cycleDuration(cycle.tasks)).toBe(60);
  });

  it("is zero for no tasks", () => {
    expect(cycleDuration([])).toBe(0);
  });
});

describe("inFlightFor", () => {
  it("starts on the first task at zero progress", () => {
    const state = inFlightFor(cycle, 0);
    expect(state.taskLabel).toBe("First");
    expect(state.progressPct).toBe(0);
    expect(state.completed).toBe(0);
  });

  it("advances progress within a task", () => {
    expect(inFlightFor(cycle, 5).progressPct).toBe(50);
    expect(inFlightFor(cycle, 9).progressPct).toBe(90);
  });

  it("moves to the next task and counts the finished one", () => {
    const state = inFlightFor(cycle, 10);
    expect(state.taskLabel).toBe("Second");
    expect(state.progressPct).toBe(0);
    expect(state.completed).toBe(1);
  });

  it("reaches the third task", () => {
    const state = inFlightFor(cycle, 30);
    expect(state.taskLabel).toBe("Third");
    expect(state.completed).toBe(2);
  });

  it("wraps to the start of the cycle and keeps counting", () => {
    const state = inFlightFor(cycle, 60);
    expect(state.taskLabel).toBe("First");
    expect(state.progressPct).toBe(0);
    expect(state.completed).toBe(3);
  });

  it("staggers agents by their offset", () => {
    const offset: AgentCycle = { ...cycle, startOffset: 10 };
    expect(inFlightFor(offset, 0).taskLabel).toBe("Second");
  });

  it("keeps progress within bounds at every second of two full cycles", () => {
    for (let t = 0; t < 120; t += 1) {
      const state = inFlightFor(cycle, t);
      expect(state.progressPct).toBeGreaterThanOrEqual(0);
      expect(state.progressPct).toBeLessThan(100);
      expect(state.taskLabel.length).toBeGreaterThan(0);
    }
  });

  it("never lets the completed count go backwards", () => {
    let previous = 0;
    for (let t = 0; t < 200; t += 1) {
      const { completed } = inFlightFor(cycle, t);
      expect(completed).toBeGreaterThanOrEqual(previous);
      previous = completed;
    }
  });

  it("survives an empty task list instead of dividing by zero", () => {
    const empty: AgentCycle = { ...cycle, tasks: [] };
    const state = inFlightFor(empty, 42);
    expect(state.progressPct).toBe(0);
    expect(state.completed).toBe(0);
    expect(state.taskLabel).toBe("");
  });
});

describe("totalCompleted", () => {
  it("adds up every agent's finished tasks", () => {
    const a: AgentCycle = { ...cycle, agentId: "a", startOffset: 0 };
    const b: AgentCycle = { ...cycle, agentId: "b", startOffset: 30 };
    expect(totalCompleted([a, b], 60)).toBe(
      inFlightFor(a, 60).completed + inFlightFor(b, 60).completed,
    );
  });

  it("is zero for no agents", () => {
    expect(totalCompleted([], 100)).toBe(0);
  });
});
