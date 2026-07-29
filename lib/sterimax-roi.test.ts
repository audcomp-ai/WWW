import { describe, it, expect } from "vitest";
import {
  BLENDED_RATE,
  HOURS_PER_FTE_WEEK,
  totalHoursPerWeek,
  fteReplaced,
  annualHoursSaved,
  annualCostSaved,
  monthlyHumanCost,
  percentSavedVsHuman,
  secondsSavedPerWorkday,
  formatHoursMinutesSeconds,
  type AgentLoad,
} from "./sterimax-roi";

const loads: AgentLoad[] = [
  { hoursPerWeek: 11 },
  { hoursPerWeek: 9 },
  { hoursPerWeek: 14 },
  { hoursPerWeek: 12 },
  { hoursPerWeek: 8 },
  { hoursPerWeek: 6 },
  { hoursPerWeek: 5 },
  { hoursPerWeek: 4 },
  { hoursPerWeek: 3 },
  { hoursPerWeek: 2.5 },
];

describe("constants", () => {
  it("uses a blended regulatory/QA rate", () => {
    expect(BLENDED_RATE).toBe(85);
    expect(HOURS_PER_FTE_WEEK).toBe(40);
  });
});

describe("totalHoursPerWeek", () => {
  it("sums every agent's saved hours", () => {
    expect(totalHoursPerWeek(loads)).toBe(74.5);
  });

  it("is zero for an empty roster", () => {
    expect(totalHoursPerWeek([])).toBe(0);
  });
});

describe("derived figures", () => {
  it("converts hours to full-time roles", () => {
    expect(fteReplaced(loads)).toBeCloseTo(1.8625, 4);
  });

  it("projects annual hours over 52 weeks", () => {
    expect(annualHoursSaved(loads)).toBe(3874);
  });

  it("costs annual hours at the blended rate", () => {
    expect(annualCostSaved(loads)).toBe(329290);
  });

  it("derives monthly human cost from the annual figure", () => {
    expect(monthlyHumanCost(loads)).toBeCloseTo(27440.83, 2);
  });

  it("keeps annual cost consistent with hours and rate", () => {
    expect(annualCostSaved(loads)).toBe(annualHoursSaved(loads) * BLENDED_RATE);
  });

  it("keeps FTE consistent with hours", () => {
    expect(fteReplaced(loads)).toBe(totalHoursPerWeek(loads) / HOURS_PER_FTE_WEEK);
  });
});

describe("percentSavedVsHuman", () => {
  it("compares agent spend against the human cost", () => {
    expect(Math.round(percentSavedVsHuman(loads, 1306))).toBe(95);
  });

  it("is 100 when the agents cost nothing", () => {
    expect(percentSavedVsHuman(loads, 0)).toBe(100);
  });

  it("never reports a negative saving", () => {
    expect(percentSavedVsHuman(loads, 999999)).toBe(0);
  });

  it("is zero when there is no human cost to compare against", () => {
    expect(percentSavedVsHuman([], 500)).toBe(0);
  });
});

describe("secondsSavedPerWorkday", () => {
  it("spreads the week over five working days", () => {
    expect(secondsSavedPerWorkday(loads)).toBe((74.5 / 5) * 3600);
  });
});

describe("formatHoursMinutesSeconds", () => {
  it("formats a whole number of hours", () => {
    expect(formatHoursMinutesSeconds(3600)).toBe("1h 00m 00s");
  });

  it("zero-pads minutes and seconds", () => {
    expect(formatHoursMinutesSeconds(3661)).toBe("1h 01m 01s");
  });

  it("formats the workday figure", () => {
    expect(formatHoursMinutesSeconds((74.5 / 5) * 3600)).toBe("14h 54m 00s");
  });

  it("handles zero", () => {
    expect(formatHoursMinutesSeconds(0)).toBe("0h 00m 00s");
  });
});
