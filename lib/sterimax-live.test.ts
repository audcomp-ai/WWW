import { describe, it, expect } from "vitest";
import {
  TICK_MS,
  TICKS_PER_TASK,
  taskIndexFor,
  secondsSinceLastAction,
  runCountFor,
  tickFromElapsed,
  formatRelativeAge,
} from "./sterimax-live";

describe("tickFromElapsed", () => {
  it("advances one tick every three seconds", () => {
    expect(tickFromElapsed(0)).toBe(0);
    expect(tickFromElapsed(2)).toBe(0);
    expect(tickFromElapsed(3)).toBe(1);
    expect(tickFromElapsed(9)).toBe(3);
  });

  it("never goes backwards", () => {
    let previous = 0;
    for (let s = 0; s < 60; s += 1) {
      const current = tickFromElapsed(s);
      expect(current).toBeGreaterThanOrEqual(previous);
      previous = current;
    }
  });
});

describe("formatRelativeAge", () => {
  it("reads as just now for the newest entries", () => {
    expect(formatRelativeAge(0)).toBe("just now");
    expect(formatRelativeAge(4)).toBe("just now");
  });

  it("counts seconds under a minute", () => {
    expect(formatRelativeAge(5)).toBe("5s ago");
    expect(formatRelativeAge(59)).toBe("59s ago");
  });

  it("switches to minutes", () => {
    expect(formatRelativeAge(60)).toBe("1 min ago");
    expect(formatRelativeAge(245)).toBe("4 min ago");
  });

  it("switches to hours and singularises one", () => {
    expect(formatRelativeAge(3600)).toBe("1 hr ago");
    expect(formatRelativeAge(7200)).toBe("2 hrs ago");
  });
});

describe("constants", () => {
  it("ticks every three seconds", () => {
    expect(TICK_MS).toBe(3000);
  });

  it("holds a task line for four ticks", () => {
    expect(TICKS_PER_TASK).toBe(4);
  });
});

describe("taskIndexFor", () => {
  it("starts every agent at its own offset on tick zero", () => {
    expect(taskIndexFor(0, 0, 4)).toBe(0);
    expect(taskIndexFor(0, 1, 4)).toBe(1);
    expect(taskIndexFor(0, 3, 4)).toBe(3);
  });

  it("holds the same line for four ticks, then advances", () => {
    expect(taskIndexFor(0, 0, 4)).toBe(0);
    expect(taskIndexFor(3, 0, 4)).toBe(0);
    expect(taskIndexFor(4, 0, 4)).toBe(1);
    expect(taskIndexFor(8, 0, 4)).toBe(2);
  });

  it("wraps around the end of the script", () => {
    expect(taskIndexFor(16, 0, 4)).toBe(0);
    expect(taskIndexFor(16, 3, 4)).toBe(3);
  });

  it("staggers agents so they never share an index", () => {
    const indices = [0, 1, 2, 3].map((i) => taskIndexFor(5, i, 4));
    expect(new Set(indices).size).toBe(4);
  });

  it("returns zero for an empty script instead of NaN", () => {
    expect(taskIndexFor(7, 2, 0)).toBe(0);
  });
});

describe("secondsSinceLastAction", () => {
  it("is zero at the moment a task line changes", () => {
    expect(secondsSinceLastAction(0)).toBe(0);
    expect(secondsSinceLastAction(4)).toBe(0);
  });

  it("climbs by three seconds per tick within a task", () => {
    expect(secondsSinceLastAction(1)).toBe(3);
    expect(secondsSinceLastAction(2)).toBe(6);
    expect(secondsSinceLastAction(3)).toBe(9);
  });
});

describe("runCountFor", () => {
  it("returns the base count at tick zero", () => {
    expect(runCountFor(0, 1284, 2)).toBe(1284);
  });

  it("increments once per cadence window", () => {
    expect(runCountFor(1, 1284, 2)).toBe(1284);
    expect(runCountFor(2, 1284, 2)).toBe(1285);
    expect(runCountFor(10, 1284, 2)).toBe(1289);
  });

  it("never decreases as the tick grows", () => {
    let previous = 0;
    for (let tick = 0; tick < 50; tick += 1) {
      const current = runCountFor(tick, 100, 3);
      expect(current).toBeGreaterThanOrEqual(previous);
      previous = current;
    }
  });
});
