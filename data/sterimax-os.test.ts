import { describe, it, expect } from "vitest";
import { osStats, osSpend, osActivity, osAuditLog } from "./sterimax-os";
import { getSteriMaxAgent } from "./sterimax-agents";

describe("osStats", () => {
  it("matches the deck", () => {
    expect(osStats.agentsLive).toBe("6 / 6");
    expect(osStats.tasks30d).toBe(4812);
    expect(osStats.hoursSaved).toBe(311);
  });
});

describe("osSpend", () => {
  it("matches the deck headline figures", () => {
    expect(osSpend.monthToDate).toBe(1306);
    expect(osSpend.cap).toBe(2000);
    expect(osSpend.projected).toBe(1865);
    expect(osSpend.percentUsed).toBe(65);
    expect(osSpend.dayOfMonth).toBe(21);
  });

  it("has per-agent spend summing to the month-to-date total", () => {
    const sum = osSpend.byAgent.reduce((t, r) => t + r.amount, 0);
    expect(sum).toBe(osSpend.monthToDate);
  });

  it("stays under the cap", () => {
    expect(osSpend.monthToDate).toBeLessThan(osSpend.cap);
    expect(osSpend.projected).toBeLessThan(osSpend.cap);
  });

  it("reports a percentage consistent with the amounts", () => {
    const actual = Math.round((osSpend.monthToDate / osSpend.cap) * 100);
    expect(Math.abs(actual - osSpend.percentUsed)).toBeLessThanOrEqual(1);
  });

  it("lists agents highest spend first", () => {
    const amounts = osSpend.byAgent.map((r) => r.amount);
    expect([...amounts].sort((a, b) => b - a)).toEqual(amounts);
  });

  it("references only real agents", () => {
    for (const row of osSpend.byAgent) {
      expect(getSteriMaxAgent(row.agentId)).toBeDefined();
    }
  });
});

describe("osActivity", () => {
  it("references only real agents", () => {
    for (const entry of osActivity) {
      expect(getSteriMaxAgent(entry.agentId)).toBeDefined();
    }
  });

  it("has entries", () => {
    expect(osActivity.length).toBeGreaterThan(0);
  });
});

describe("osAuditLog", () => {
  it("references only real agents", () => {
    for (const entry of osAuditLog) {
      expect(getSteriMaxAgent(entry.agentId)).toBeDefined();
    }
  });

  it("records a review state for every action", () => {
    for (const entry of osAuditLog) {
      expect(entry.review.length).toBeGreaterThan(0);
    }
  });
});
