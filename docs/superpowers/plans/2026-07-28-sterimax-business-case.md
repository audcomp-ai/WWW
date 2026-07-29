# SteriMax Business-Case Overview Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the AI OS Overview tab as a business case in the shape of the Petal & Stem demo — pitch, live impact, worked example, command center, agent load, impact in human hours, operating cost — with every ROI figure derived rather than typed.

**Architecture:** Raw inputs (hours per week, blended rate, copy) live in `data/sterimax-impact.ts`. All arithmetic lives in a pure, tested `lib/sterimax-roi.ts`. The Overview composes seven focused section components. `LiveClock` gains an opt-out `autoStart` so the OS page stays frozen until **Start Demo** is pressed.

**Tech Stack:** Next.js 16.2.6, React 19.2.4, TypeScript 5, Tailwind CSS 4, Vitest.

## Global Constraints

- **Spec:** `docs/superpowers/specs/2026-07-28-sterimax-business-case-design.md`. Read it first.
- **Do not touch** the roster, agent detail pages, or the Agents / Runs / Spend / Audit tabs.
- **Design tokens only:** `#040e1a`, `#071e3d`, `#0d2d55`, `#0a2540`, `#0071e3`, `#06b6d4`, `#38bdf8`, `#4a6785`, `#ef4444`.
- **Never type a figure that can be derived.** FTE, annual hours, annual cost, monthly human cost and percent-saved all come from `lib/sterimax-roi.ts`.
- **Determinism:** no `Math.random()`, no `Date.now()`, no `new Date()`.
- **Tailwind 4 scans source text** — no runtime-assembled class names.
- **The four standing-by agents are invented** — keep them in one array with the comment saying so.
- **Commit after every task.**

---

### Task 1: ROI arithmetic

**Files:**
- Create: `lib/sterimax-roi.ts`
- Test: `lib/sterimax-roi.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `AgentLoad`, `BLENDED_RATE`, `HOURS_PER_FTE_WEEK`, `WORKDAYS_PER_WEEK`, `totalHoursPerWeek`, `fteReplaced`, `annualHoursSaved`, `annualCostSaved`, `monthlyHumanCost`, `percentSavedVsHuman`, `secondsSavedPerWorkday`, `formatHoursMinutesSeconds`.

- [ ] **Step 1: Write the failing test**

Create `lib/sterimax-roi.test.ts`:

```ts
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
] as AgentLoad[];

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
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL — cannot resolve `./sterimax-roi`.

- [ ] **Step 3: Write the implementation**

Create `lib/sterimax-roi.ts`:

```ts
// Every ROI figure on the Overview tab is derived here from two inputs: each agent's
// hoursPerWeek and BLENDED_RATE. Nothing downstream types a number that can be computed,
// so the figures on screen can never drift out of agreement with one another.

export type AgentLoad = { hoursPerWeek: number };

/** CAD per hour, blended across regulatory affairs, QA, and supply chain. */
export const BLENDED_RATE = 85;
export const HOURS_PER_FTE_WEEK = 40;
export const WORKDAYS_PER_WEEK = 5;
export const WEEKS_PER_YEAR = 52;
export const MONTHS_PER_YEAR = 12;

export function totalHoursPerWeek(loads: AgentLoad[]): number {
  return loads.reduce((total, load) => total + load.hoursPerWeek, 0);
}

export function fteReplaced(loads: AgentLoad[]): number {
  return totalHoursPerWeek(loads) / HOURS_PER_FTE_WEEK;
}

export function annualHoursSaved(loads: AgentLoad[]): number {
  return totalHoursPerWeek(loads) * WEEKS_PER_YEAR;
}

export function annualCostSaved(loads: AgentLoad[]): number {
  return annualHoursSaved(loads) * BLENDED_RATE;
}

export function monthlyHumanCost(loads: AgentLoad[]): number {
  return annualCostSaved(loads) / MONTHS_PER_YEAR;
}

/**
 * How much cheaper the agents are than the equivalent human hours, as a percentage.
 * Clamped to 0–100 so an unexpected input can never render a negative or absurd claim.
 */
export function percentSavedVsHuman(loads: AgentLoad[], agentMonthlyCost: number): number {
  const humanCost = monthlyHumanCost(loads);
  if (humanCost <= 0) return 0;
  const saved = (1 - agentMonthlyCost / humanCost) * 100;
  return Math.min(100, Math.max(0, saved));
}

export function secondsSavedPerWorkday(loads: AgentLoad[]): number {
  return (totalHoursPerWeek(loads) / WORKDAYS_PER_WEEK) * 3600;
}

export function formatHoursMinutesSeconds(totalSeconds: number): string {
  const whole = Math.floor(totalSeconds);
  const hours = Math.floor(whole / 3600);
  const minutes = Math.floor((whole % 3600) / 60);
  const seconds = whole % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${hours}h ${pad(minutes)}m ${pad(seconds)}s`;
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add lib/sterimax-roi.ts lib/sterimax-roi.test.ts
git commit -m "feat: add derived ROI arithmetic for the SteriMax business case"
```

---

### Task 2: Business-case content

**Files:**
- Create: `data/sterimax-impact.ts`
- Test: `data/sterimax-impact.test.ts`

**Interfaces:**
- Consumes: `AgentLoad` (Task 1); `getSteriMaxAgent` from `data/sterimax-agents.ts`.
- Produces: `AgentLoadRow`, `ExampleStep`, `ControlButton`, `heroCopy`, `pitchCopy`, `liveAgentLoads`, `standbyAgentLoads`, `allAgentLoads`, `workedExample`, `commandTiles`, `controlButtons`, `operatingCost`.

- [ ] **Step 1: Write the failing test**

Create `data/sterimax-impact.test.ts`:

```ts
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
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL — cannot resolve `./sterimax-impact`.

- [ ] **Step 3: Write the content**

Create `data/sterimax-impact.ts`:

```ts
// Business-case inputs for the AI OS Overview. Only raw figures and copy live here —
// every derived number (FTE, annual hours, annual cost, percent saved) is computed in
// lib/sterimax-roi.ts from `hoursPerWeek` and BLENDED_RATE.

import type { AgentLoad } from "@/lib/sterimax-roi";

export type AgentLoadRow = AgentLoad & {
  agentId: string;
  name: string;
  role: string;
  status: "Live" | "Idle" | "Queued";
  workload: string;
};

export type ExampleStep = {
  label: string;
  note: string;
  withoutHours: number;
  withSeconds: number;
};

export type ControlButton = {
  id: string;
  label: string;
  description: string;
  confirmation: string;
  icon: string;
};

export const heroCopy = {
  client: "SteriMax Inc.",
  descriptor: "Sterile Injectables · Oakville, Ontario",
  tag: "Pharmaceutical Manufacturing · Live Demo",
  // Set by hand. The deck says "2026–2027" without naming an in-force date, so this is a
  // placeholder to be updated with the real date before the meeting — it is not derived,
  // and it deliberately does not read the clock.
  daysUntilInForce: 157,
  countdownLabel: "FDR shortage-reporting provisions in force in",
};

export const pitchCopy = {
  headline: "Six agents carry the regulatory load — your 200 people stay on judgement, not paperwork.",
  sub: "SteriMax goes from FDR compliance that depends on someone remembering, to compliance that is simply handled.",
  today: [
    "One person remembers the reporting window — and they're on vacation next week.",
    "Shortage reports get drafted from scratch, on deadline, by the people least able to spare the time.",
    "100+ SKUs are watched by exception, which means by whoever happens to notice.",
    "Submission prep eats days that speed to market cannot afford.",
  ],
  afterDeploy: [
    "Every SKU is watched continuously; the 250% trigger fires the day it appears.",
    "Filings arrive pre-populated and queued on deadline, needing review rather than authorship.",
    "RA and QA spend their hours on judgement calls, not document assembly.",
    "Every action is audit-logged and human-signed before anything is submitted.",
  ],
};

export const liveAgentLoads: AgentLoadRow[] = [
  { agentId: "david", name: "David", role: "Shortage & Compliance", status: "Live", workload: "104 SKUs monitored / wk", hoursPerWeek: 11 },
  { agentId: "sam", name: "Sam", role: "Demand Forecasting", status: "Live", workload: "104 SKUs forecast / wk", hoursPerWeek: 9 },
  { agentId: "olivia", name: "Olivia", role: "Regulatory Submissions", status: "Live", workload: "3 submissions prepped / wk", hoursPerWeek: 14 },
  { agentId: "maya", name: "Maya", role: "Med Info & PV", status: "Live", workload: "62 queries & AEs / wk", hoursPerWeek: 12 },
  { agentId: "quinn", name: "Quinn", role: "Tenders & GPO", status: "Live", workload: "4 tenders tracked / wk", hoursPerWeek: 8 },
  { agentId: "claire", name: "Claire", role: "Knowledge & Integration", status: "Live", workload: "180 questions answered / wk", hoursPerWeek: 6 },
];

// INVENTED — these four are not in the SteriMax recommendations deck. They are credible
// functions for a sterile injectables manufacturer, included to show the "spin up on
// trigger, no idle cost" story. Delete this array to remove them entirely.
export const standbyAgentLoads: AgentLoadRow[] = [
  { agentId: "lot-release", name: "Lot Release & CoA Review", role: "Quality", status: "Idle", workload: "22 lots reviewed / wk", hoursPerWeek: 5 },
  { agentId: "complaint-intake", name: "Complaint Intake & Triage", role: "Quality", status: "Idle", workload: "31 complaints / wk", hoursPerWeek: 4 },
  { agentId: "hc-correspondence", name: "Health Canada Correspondence", role: "Regulatory", status: "Idle", workload: "9 letters / mo", hoursPerWeek: 3 },
  { agentId: "cold-chain", name: "Cold-Chain Excursion Review", role: "Distribution", status: "Queued", workload: "14 excursions / mo", hoursPerWeek: 2.5 },
];

export const allAgentLoads: AgentLoadRow[] = [...liveAgentLoads, ...standbyAgentLoads];

export const workedExample = {
  title: "A 250% demand surge lands on SKU 40118",
  subtitle: "The regulatory clock starts the moment the surge appears. Here is the same event, twice.",
  totalWithoutHours: 30,
  totalWithSeconds: 231,
  steps: [
    { label: "Detect the surge", note: "Someone notices the order pattern on a weekly review — or doesn't.", withoutHours: 8, withSeconds: 2 },
    { label: "Confirm against inventory", note: "Cross-check ERP positions and days of cover for the SKU.", withoutHours: 4, withSeconds: 6 },
    { label: "Locate the prevention plan", note: "Find the current shortage-prevention plan and safety-stock target.", withoutHours: 2, withSeconds: 3 },
    { label: "Draft the filing", note: "Populate every mandatory field and queue it for RA sign-off.", withoutHours: 16, withSeconds: 220 },
  ] satisfies ExampleStep[],
  presenterCue:
    "This is what happens between the surge appearing in your order book and the report being ready for your RA lead to sign.",
};

export const commandTiles = [
  { label: "Active agents", value: "6", detail: "of 10 · 163 runs today" },
  { label: "SKUs monitored", value: "104", detail: "3 above escalation threshold" },
  { label: "Filings this quarter", value: "14", detail: "4 awaiting sign-off" },
  { label: "Deadlines tracked", value: "28", detail: "next in 4 days" },
];

export const controlButtons: ControlButton[] = [
  { id: "pause", label: "Pause All Agents", description: "Halt every agent immediately", confirmation: "All agents paused", icon: "fa-circle-pause" },
  { id: "push", label: "Push New Task", description: "Run a one-off across all agents", confirmation: "Task pushed to 10 agents", icon: "fa-bolt" },
  { id: "add", label: "Add Agent", description: "Spin up a new specialist", confirmation: "Specialist queued for setup", icon: "fa-plus" },
  { id: "escalate", label: "Escalate to Human", description: "Route the next decision to a person", confirmation: "Next decision routed to RA", icon: "fa-user-check" },
];

export const operatingCost = {
  tokensPerMonth: 18412640,
  activeRuntimeHours: 54.2,
  tasksToday: 163,
};
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add data/sterimax-impact.ts data/sterimax-impact.test.ts
git commit -m "feat: add SteriMax business-case content and agent load figures"
```

---

### Task 3: Start Demo control on the clock

**Files:**
- Modify: `components/sterimax/LiveClock.tsx`

**Interfaces:**
- Produces: `LiveClock` accepting `autoStart?: boolean` (default `true`); `useClock(): { tick: number; running: boolean; start: () => void }`; `useTick(): number` retained unchanged so the roster, agent detail pages and existing tabs keep working.

- [ ] **Step 1: Rewrite the clock**

Replace the whole of `components/sterimax/LiveClock.tsx`:

```tsx
"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { TICK_MS } from "@/lib/sterimax-live";

type ClockValue = { tick: number; running: boolean; start: () => void };

const ClockContext = createContext<ClockValue>({ tick: 0, running: false, start: () => {} });

/**
 * One interval drives every live element on a surface. Seven independent timers would
 * visibly drift apart over the length of a meeting.
 *
 * The tick starts at 0 and the interval starts in an effect, so the server render and the
 * first client render are identical — motion begins only after mount.
 *
 * `autoStart` defaults to true so the roster and agent pages behave as before. The AI OS
 * passes false: it stays frozen at its base figures until the presenter hits Start Demo.
 */
export function LiveClock({
  children,
  autoStart = true,
}: {
  children: React.ReactNode;
  autoStart?: boolean;
}) {
  const [tick, setTick] = useState(0);
  const [running, setRunning] = useState(false);

  const start = useCallback(() => setRunning(true), []);

  useEffect(() => {
    if (autoStart) setRunning(true);
  }, [autoStart]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setTick((t) => t + 1), TICK_MS);
    return () => clearInterval(id);
  }, [running]);

  return <ClockContext.Provider value={{ tick, running, start }}>{children}</ClockContext.Provider>;
}

export function useClock(): ClockValue {
  return useContext(ClockContext);
}

export function useTick(): number {
  return useContext(ClockContext).tick;
}
```

- [ ] **Step 2: Confirm nothing regressed**

Run: `npx eslint components/sterimax lib`
Expected: 0 errors.

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 3: Commit**

```bash
git add components/sterimax/LiveClock.tsx
git commit -m "feat: let LiveClock be started on demand for the AI OS demo"
```

---

### Task 4: Overview sections

**Files:**
- Create: `components/sterimax/os/overview/PitchSection.tsx`
- Create: `components/sterimax/os/overview/ImpactTiles.tsx`
- Create: `components/sterimax/os/overview/WorkedExample.tsx`
- Create: `components/sterimax/os/overview/CommandCenter.tsx`
- Create: `components/sterimax/os/overview/AgentLoadList.tsx`
- Create: `components/sterimax/os/overview/ImpactHours.tsx`
- Create: `components/sterimax/os/overview/OperatingCost.tsx`

Each is a zero-prop client component reading from `data/sterimax-impact.ts` and `lib/sterimax-roi.ts`, except `AgentLoadList` which takes `{ rows, title, note }`.

Full component code is given in the implementation; each follows the panel conventions
already used in `components/sterimax/os/OverviewTab.tsx` — `rounded-2xl bg-white/[0.04]
border border-white/[0.1] p-6`, teal eyebrows, `text-[10px] font-black uppercase
tracking-widest` labels.

- [ ] **Step 1: Build the seven section components**
- [ ] **Step 2: Lint them** — `npx eslint components/sterimax/os` — 0 errors
- [ ] **Step 3: Commit** — `git commit -m "feat: add business-case Overview sections"`

---

### Task 5: Compose the Overview and wire Start Demo

**Files:**
- Modify: `components/sterimax/os/OverviewTab.tsx`
- Modify: `app/admin/sales-training/sterimax/os/page.tsx`

- [ ] **Step 1:** Rewrite `OverviewTab` to render, in order: `PitchSection`, `ImpactTiles`, `WorkedExample`, `CommandCenter`, `AgentLoadList` (live), `AgentLoadList` (standby), `ImpactHours`, `OperatingCost`, then the existing spend panel and activity feed.
- [ ] **Step 2:** In the OS page, pass `autoStart={false}` to `LiveClock`, add the hero band (client, descriptor, tag, countdown) and the **Start Demo** button wired to `start()` from `useClock()`. The button reads "Demo running" and is disabled once started.
- [ ] **Step 3:** Verify in the browser — Overview shows every section; before Start Demo the counters are static; after it the time-saved counter and task count climb; the four control buttons each show their confirmation for a few seconds; the other four tabs are unchanged and Run task still works.
- [ ] **Step 4:** Commit.

---

### Task 6: Full verification

- [ ] **Step 1:** `npm test` — all suites pass.
- [ ] **Step 2:** `npx eslint lib components/sterimax data app/admin` — 0 errors.
- [ ] **Step 3:** `npm run build` — succeeds.
- [ ] **Step 4:** Confirm the other demos still respond: `/`, `/claire`, `/ai-services/agent-studio`, `/events/security-summit`, and the SteriMax roster and agent pages.
- [ ] **Step 5:** Commit any fixes.

---

## Self-Review

**Spec coverage:** hero and countdown (5); pitch (4); live impact tiles (4); worked example with
summed totals (2, 4); command center tiles and controls (2, 4); active agents (2, 4); standing by
(2, 4); impact in human hours (1, 4); operating cost with derived percent (1, 4); activity feed
retained (5); derive-never-type (1); Start Demo with `autoStart` (3, 5); tests (1, 2). No gaps.

**Placeholder scan:** Tasks 4 and 5 describe components rather than inlining every line of JSX.
This is a deliberate departure: the seven sections are presentational, follow one already-
established panel convention, and their content is fully specified in Task 2's data file and the
spec's content section. Every value they display is named. No behaviour is left undefined.

**Type consistency:** `AgentLoad` is defined in Task 1 and extended by `AgentLoadRow` in Task 2.
`ExampleStep` fields (`withoutHours`, `withSeconds`) are used identically in the Task 2 test and
`WorkedExample`. `useTick()` keeps its existing signature in Task 3, so no existing call site
changes; `useClock()` is additive.

**Risk:** Task 3 changes a component the shipped roster depends on. The default `autoStart = true`
preserves current behaviour exactly, and Task 6 Step 4 re-checks those pages.
