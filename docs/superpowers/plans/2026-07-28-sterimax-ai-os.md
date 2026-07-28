# SteriMax AI OS — Dashboard & Task Runs — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the deck p.14 AI OS dashboard at `/admin/sales-training/sterimax/os`, where the presenter clicks *Run task* on any of the six specialists and watches that agent work through visible steps to a reviewable artifact.

**Architecture:** A tabbed client shell modelled on `app/claire/page.tsx`. Dashboard figures and run scripts are static data with tested invariants. Ambient motion reuses the existing `LiveClock`; a task run is separate — presenter-triggered, finite, owned by a `useTaskRun` hook over a 1100ms interval.

**Tech Stack:** Next.js 16.2.6 (App Router), React 19.2.4, TypeScript 5, Tailwind CSS 4, Vitest.

## Global Constraints

- **Spec:** `docs/superpowers/specs/2026-07-28-sterimax-ai-os-design.md`. Read it before Task 1.
- **Prior work:** `data/sterimax-agents.ts`, `lib/sterimax-live.ts`, `components/sterimax/LiveClock.tsx` and `AgentLive.tsx` already exist and are shipped. Reuse, do not duplicate.
- **Design system binding.** Only tokens from `design-system/tokens.json`: `#071e3d`, `#0d2d55`, `#0a2540`, `#0071e3`, `#06b6d4`, `#38bdf8`, `#f0f7ff`, `#4a6785`, `#dde8f5`, `#ef4444`. Plus `#040e1a`, the command-centre background already used by `app/claire/page.tsx`.
- **Deck figures are verbatim.** `$1,306` of `$2,000`, projected `$1,865`, 65% used, day 21, `6 / 6` agents live, `4,812` tasks in 30 days, `311` hours saved. Per-agent spend: David `412`, Sam `318`, Quinn `226`, Maya `164`, Olivia `112`, Claire `74`.
- **Determinism:** no `Math.random()`, no `Date.now()`, no `new Date()` in any file this plan creates.
- **Tailwind 4 scans source text** — never assemble a class name at runtime (`hover:${x}`). Write both branches in full.
- **Commit after every task.**

---

## File Structure

| File | Responsibility |
|------|----------------|
| `data/sterimax-os.ts` | Dashboard stats, spend, activity feed, audit log. |
| `data/sterimax-os.test.ts` | Invariants: spend sums, cap, agent id resolution. |
| `data/sterimax-runs.ts` | One `TaskRun` per specialist: steps + artifact. |
| `data/sterimax-runs.test.ts` | Invariants: coverage, step counts, artifact shape. |
| `lib/use-task-run.ts` | The run state machine. React state over one interval. |
| `components/sterimax/RunArtifact.tsx` | Renders a `RunArtifact` in its three kinds. |
| `components/sterimax/RunPanel.tsx` | Step list + Run/Reset button + artifact reveal. |
| `components/sterimax/os/OverviewTab.tsx` | Stat tiles, spend panel, activity feed. |
| `components/sterimax/os/AgentsTab.tsx` | Agent rows and the active run panel. |
| `components/sterimax/os/SpendTab.tsx` | Spend detail and cap explanation. |
| `components/sterimax/os/AuditTab.tsx` | Audit log table. |
| `components/sterimax/os/RunsTab.tsx` | Session runs plus scripted history. |
| `app/admin/sales-training/sterimax/os/page.tsx` | Route + tab shell. |
| `app/admin/sales-training/sterimax/page.tsx` | **Modify** — link to the dashboard. |
| `app/admin/sales-training/page.tsx` | **Modify** — list both entry points. |

---

### Task 1: Dashboard data

**Files:**
- Create: `data/sterimax-os.ts`
- Test: `data/sterimax-os.test.ts`

**Interfaces:**
- Consumes: `getSteriMaxAgent` from `data/sterimax-agents.ts`.
- Produces: `SpendRow`, `ActivityEntry`, `AuditEntry`, `osStats`, `osSpend`, `osActivity`, `osAuditLog`.

- [ ] **Step 1: Write the failing test**

Create `data/sterimax-os.test.ts`:

```ts
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
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL — cannot resolve `./sterimax-os`.

- [ ] **Step 3: Write the data**

Create `data/sterimax-os.ts`:

```ts
// AI OS dashboard figures, transcribed from page 14 of the SteriMax recommendations deck.
// `byAgent` must sum to `monthToDate` — a test enforces it, so the panel can never
// contradict itself on screen.

export type SpendRow = { agentId: string; label: string; amount: number };
export type ActivityEntry = { agentId: string; title: string; detail: string; ago: string };
export type AuditEntry = {
  time: string;
  agentId: string;
  action: string;
  detail: string;
  review: string;
};

export const osStats = {
  agentsLive: "6 / 6",
  tasks30d: 4812,
  hoursSaved: 311,
};

export const osSpend = {
  monthToDate: 1306,
  cap: 2000,
  projected: 1865,
  percentUsed: 65,
  dayOfMonth: 21,
  currency: "CAD" as const,
  byAgent: [
    { agentId: "david", label: "David · Compliance", amount: 412 },
    { agentId: "sam", label: "Sam · Forecasting", amount: 318 },
    { agentId: "quinn", label: "Quinn · Tenders & GPO", amount: 226 },
    { agentId: "maya", label: "Maya · Med Info & PV", amount: 164 },
    { agentId: "olivia", label: "Olivia · Submissions", amount: 112 },
    { agentId: "claire", label: "Claire · Knowledge", amount: 74 },
  ] satisfies SpendRow[],
};

export const osActivity: ActivityEntry[] = [
  {
    agentId: "david",
    title: "David flagged a 250% demand surge",
    detail: "SKU 40118 · shortage report drafted for review",
    ago: "4 min ago",
  },
  {
    agentId: "sam",
    title: "Sam refreshed 30-day supply risk",
    detail: "104 SKUs scored · 3 escalated to planning",
    ago: "22 min ago",
  },
  {
    agentId: "olivia",
    title: "Olivia assembled a submission package",
    detail: "Awaiting RA sign-off · human-in-the-loop",
    ago: "1 hr ago",
  },
  {
    agentId: "wilfred",
    title: "Wilfred rebalanced model routing",
    detail: "Cut projected spend 14%",
    ago: "2 hrs ago",
  },
];

export const osAuditLog: AuditEntry[] = [
  {
    time: "17:42",
    agentId: "david",
    action: "Drafted shortage report",
    detail: "SKU 40118 · fields sourced from ERP and product master",
    review: "Awaiting RA sign-off",
  },
  {
    time: "17:20",
    agentId: "sam",
    action: "Scored 30-day supply risk",
    detail: "104 SKUs · 3 above escalation threshold",
    review: "Escalated to planning",
  },
  {
    time: "17:05",
    agentId: "maya",
    action: "Structured adverse event intake",
    detail: "Case 2026-0418 · MedDRA coding applied",
    review: "Awaiting qualified safety reviewer",
  },
  {
    time: "16:51",
    agentId: "olivia",
    action: "Assembled submission package",
    detail: "31 documents at approved revision · 3 gaps flagged",
    review: "Awaiting RA review",
  },
  {
    time: "16:30",
    agentId: "quinn",
    action: "Assembled tender response",
    detail: "Bid 2026-114 · 38 of 41 checklist items complete",
    review: "Awaiting commercial pricing",
  },
  {
    time: "15:58",
    agentId: "claire",
    action: "Answered employee question",
    detail: "Deviation handling, veterinary line · sources cited",
    review: "Answer cited — no review required",
  },
  {
    time: "15:12",
    agentId: "wilfred",
    action: "Rebalanced model routing",
    detail: "Projected monthly spend reduced 14%",
    review: "Automatic — within policy",
  },
  {
    time: "14:35",
    agentId: "david",
    action: "Refreshed mitigation plans",
    detail: "7 products updated following formulation change",
    review: "Awaiting RA sign-off",
  },
];
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add data/sterimax-os.ts data/sterimax-os.test.ts
git commit -m "feat: add SteriMax AI OS dashboard data"
```

---

### Task 2: Task run scripts

**Files:**
- Create: `data/sterimax-runs.ts`
- Test: `data/sterimax-runs.test.ts`

**Interfaces:**
- Consumes: `getSteriMaxAgent`, `sterimaxAgents` from `data/sterimax-agents.ts`.
- Produces: `RunStep`, `ArtifactField`, `RunArtifact`, `TaskRun`, `taskRuns`, `getTaskRun(agentId: string): TaskRun | undefined`.

- [ ] **Step 1: Write the failing test**

Create `data/sterimax-runs.test.ts`:

```ts
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
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL — cannot resolve `./sterimax-runs`.

- [ ] **Step 3: Write the run scripts**

Create `data/sterimax-runs.ts`:

```ts
// One scripted task run per specialist. The presenter clicks Run task and the steps
// play out to a finished artifact. Wilfred has no run — he orchestrates the roster
// rather than producing a document of his own.

export type RunStep = { label: string; detail: string };
export type ArtifactField = { label: string; value: string };

export type RunArtifact = {
  kind: "document" | "table" | "record";
  title: string;
  subtitle: string;
  fields: ArtifactField[];
  columns?: string[];
  rows?: string[][];
  reviewState: string;
  auditNote: string;
};

export type TaskRun = {
  agentId: string;
  taskName: string;
  steps: RunStep[];
  artifact: RunArtifact;
};

export const taskRuns: TaskRun[] = [
  {
    agentId: "david",
    taskName: "Shortage detection & FDR filing",
    steps: [
      { label: "Reading Drug Shortages Canada", detail: "Latest notices ingested · 41 new entries" },
      { label: "Matching against ERP inventory", detail: "SKU 40118 · 12 days of cover on hand" },
      { label: "Confirming the surge threshold", detail: "Demand at 250% of rolling baseline · regulatory trigger breached" },
      { label: "Locating the prevention plan", detail: "Shortage-prevention plan on file · last reviewed Mar 2026" },
      { label: "Drafting the shortage report", detail: "Mandatory fields pre-populated from ERP and product master" },
      { label: "Queuing for sign-off", detail: "Routed to Regulatory Affairs · deadline in 4 days" },
    ],
    artifact: {
      kind: "document",
      title: "Drug Shortage Report — SKU 40118",
      subtitle: "Food and Drug Regulations · mandatory shortage report",
      fields: [
        { label: "Product", value: "Ondansetron Injection USP 2 mg/mL · DIN 02345678" },
        { label: "Reporting trigger", value: "Demand at 250% of rolling baseline" },
        { label: "Anticipated shortage start", value: "2026-08-14" },
        { label: "Estimated duration", value: "6–8 weeks" },
        { label: "Reason", value: "Demand increase" },
        { label: "Mitigation", value: "Safety stock released; exceptional-importation candidate identified" },
        { label: "Reporting deadline", value: "2026-08-01" },
      ],
      reviewState: "Awaiting RA sign-off — not submitted",
      auditNote: "Drafted by David · every field traceable to ERP and product master · logged 17:42 EDT",
    },
  },
  {
    agentId: "sam",
    taskName: "30-day supply risk refresh",
    steps: [
      { label: "Loading sales history", detail: "36 months across 104 SKUs · channel mix applied" },
      { label: "Applying seasonality", detail: "Seasonal indices refreshed per SKU" },
      { label: "Folding in supplier lead times", detail: "3 suppliers drifted beyond contracted lead time" },
      { label: "Reading competitor signals", detail: "2 competitor shortages on overlapping molecules" },
      { label: "Scoring supply risk", detail: "104 SKUs scored · 3 above escalation threshold" },
      { label: "Escalating to planning", detail: "3 SKUs routed to S&OP with recommended actions" },
    ],
    artifact: {
      kind: "table",
      title: "30-Day Supply Risk — top exposures",
      subtitle: "104 SKUs scored · 3 escalated to planning",
      fields: [],
      columns: ["SKU", "Product", "Days cover", "Risk", "Recommended action"],
      rows: [
        ["40118", "Ondansetron Inj. 2 mg/mL", "12", "Critical", "Release safety stock; prepare shortage filing"],
        ["40602", "Metoclopramide Inj. 5 mg/mL", "24", "High", "Raise safety-stock target to 45 days"],
        ["41255", "Furosemide Inj. 10 mg/mL", "31", "High", "Confirm supplier lead time; dual-source"],
        ["40877", "Heparin Sodium Inj. 1000 IU", "58", "Moderate", "Monitor · no action"],
      ],
      reviewState: "Escalations awaiting planning review",
      auditNote: "Scored by Sam · inputs: ERP sales history, supplier lead times, Drug Shortages Canada · logged 17:20 EDT",
    },
  },
  {
    agentId: "olivia",
    taskName: "Submission package assembly",
    steps: [
      { label: "Reading the submission plan", detail: "DIN application · Modules 1 through 3" },
      { label: "Pulling current document versions", detail: "31 files retrieved at approved revision" },
      { label: "Pre-populating eCTD sections", detail: "Module 1 administrative sections complete" },
      { label: "Validating against guidance", detail: "Checked against GUI-0146 and GUI-0148" },
      { label: "Flagging gaps", detail: "2 stale references · 1 missing section identified" },
      { label: "Assembling for review", detail: "Package compiled · routed to Regulatory Affairs" },
    ],
    artifact: {
      kind: "document",
      title: "DIN Submission Package — Ondansetron Injection USP",
      subtitle: "eCTD Modules 1–3 · assembled for RA review",
      fields: [
        { label: "Documents assembled", value: "31 files at current approved revision" },
        { label: "Guidance checked", value: "GUI-0146, GUI-0148" },
        { label: "Module 1", value: "Complete" },
        { label: "Module 2", value: "Complete" },
        { label: "Module 3", value: "1 section outstanding — 3.2.P.5.4" },
        { label: "Gaps flagged", value: "2 stale cross-references (§2.3, §3.2.S.4)" },
        { label: "Preparation time", value: "4 min — typical manual preparation: 3 days" },
      ],
      reviewState: "Awaiting RA review — not published",
      auditNote: "Assembled by Olivia · all versions pulled from the document management system · logged 16:51 EDT",
    },
  },
  {
    agentId: "maya",
    taskName: "Adverse event intake",
    steps: [
      { label: "Receiving the report", detail: "Inbound call transcript · HCP reporter" },
      { label: "Extracting case details", detail: "Patient, product, event, and outcome identified" },
      { label: "Structuring the record", detail: "Mapped to the safety database intake schema" },
      { label: "Coding to MedDRA", detail: "9 terms mapped · preferred terms applied" },
      { label: "Assessing seriousness", detail: "Meets seriousness criteria · expedited clock started" },
      { label: "Routing for review", detail: "Escalated to a qualified safety reviewer" },
    ],
    artifact: {
      kind: "record",
      title: "Adverse Event Intake — Case 2026-0418",
      subtitle: "Structured from an HCP telephone report",
      fields: [
        { label: "Reporter", value: "Hospital pharmacist · Ontario" },
        { label: "Product", value: "Ondansetron Injection USP 2 mg/mL" },
        { label: "Event (verbatim)", value: "Patient developed rash and itching shortly after infusion" },
        { label: "MedDRA preferred terms", value: "Rash; Pruritus" },
        { label: "MedDRA SOC", value: "Skin and subcutaneous tissue disorders" },
        { label: "Seriousness", value: "Serious — medically significant" },
        { label: "Outcome", value: "Recovering" },
        { label: "Reporting clock", value: "15-day expedited · day 1 of 15" },
      ],
      reviewState: "Awaiting qualified safety reviewer — not submitted",
      auditNote: "Structured by Maya · verbatim text preserved · no causality assessed by the agent · logged 17:05 EDT",
    },
  },
  {
    agentId: "quinn",
    taskName: "Tender response assembly",
    steps: [
      { label: "Scanning tender portals", detail: "GPO and provincial sites checked · 2 new postings matched" },
      { label: "Reading the posting", detail: "Requirements and evaluation criteria extracted" },
      { label: "Building the checklist", detail: "41 required items identified" },
      { label: "Drafting from prior submissions", detail: "Sections drafted from the last winning bid" },
      { label: "Pulling product data", detail: "12 SKUs matched to lot sizes and pack configurations" },
      { label: "Tracking the dates", detail: "Clarification, submission, and award dates added to the calendar" },
    ],
    artifact: {
      kind: "document",
      title: "Tender Response — Provincial Injectables Bid 2026-114",
      subtitle: "Assembled from prior winning submissions and product master data",
      fields: [
        { label: "Issuing body", value: "Provincial health procurement authority" },
        { label: "Line items", value: "12 SKUs matched to the posting" },
        { label: "Checklist", value: "41 required items · 38 complete" },
        { label: "Outstanding", value: "Pricing schedule (commercial), 2 signed attestations" },
        { label: "Clarification deadline", value: "2026-08-06" },
        { label: "Submission deadline", value: "2026-08-20" },
        { label: "Award date", value: "2026-09-30" },
      ],
      reviewState: "Awaiting commercial pricing input — not submitted",
      auditNote: "Assembled by Quinn · pricing deliberately excluded · logged 16:30 EDT",
    },
  },
  {
    agentId: "claire",
    taskName: "Employee knowledge query",
    steps: [
      { label: "Receiving the question", detail: "From quality assurance · combined-entity scope" },
      { label: "Searching source systems", detail: "SOP library, SharePoint, and ERP master data" },
      { label: "Resolving the conflict", detail: "Two procedures found · one superseded post-Andone" },
      { label: "Selecting the current procedure", detail: "Approved revision identified" },
      { label: "Composing the answer", detail: "Answer written with citations to source" },
      { label: "Returning with citations", detail: "Delivered · source documents linked" },
    ],
    artifact: {
      kind: "record",
      title: "Knowledge Answer — deviation handling, veterinary line",
      subtitle: "Answered from source documents across the combined entity",
      fields: [
        { label: "Question", value: "Which deviation procedure applies to the veterinary line after the Andone integration?" },
        { label: "Answer", value: "SOP-QA-014 rev 6 applies to all veterinary manufacturing deviations. The legacy Andone procedure AD-QA-3 was superseded on 2026-04-01." },
        { label: "Primary source", value: "SOP-QA-014 rev 6 · approved 2026-04-01" },
        { label: "Superseded", value: "AD-QA-3 rev 2 · Andone legacy" },
        { label: "Conflict noted", value: "Yes — surfaced to document control" },
        { label: "Confidence", value: "High — single approved current revision" },
      ],
      reviewState: "Answer cited — source documents linked",
      auditNote: "Answered by Claire · no procedure text generated, only quoted and cited · logged 15:58 EDT",
    },
  },
];

export function getTaskRun(agentId: string): TaskRun | undefined {
  return taskRuns.find((r) => r.agentId === agentId);
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add data/sterimax-runs.ts data/sterimax-runs.test.ts
git commit -m "feat: add scripted task runs for the six SteriMax specialists"
```

---

### Task 3: The run state machine and run UI

**Files:**
- Create: `lib/use-task-run.ts`
- Create: `components/sterimax/RunArtifact.tsx`
- Create: `components/sterimax/RunPanel.tsx`

**Interfaces:**
- Consumes: `TaskRun`, `RunArtifact` (Task 2); `SteriMaxAgent` from `data/sterimax-agents.ts`.
- Produces:
  - `type RunPhase = "idle" | "running" | "complete"`
  - `useTaskRun(run: TaskRun | undefined): { phase: RunPhase; currentStep: number; start: () => void; reset: () => void }`
  - `<ArtifactView artifact={artifact} />`
  - `<RunPanel agent={agent} run={run} />`

- [ ] **Step 1: Write the hook**

Create `lib/use-task-run.ts`:

```ts
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

  // Clear the interval if the panel unmounts mid-run.
  useEffect(() => stop, [stop]);

  // Switching to a different agent abandons the previous run.
  useEffect(() => {
    reset();
  }, [run, reset]);

  return { phase, currentStep, start, reset };
}
```

- [ ] **Step 2: Write the artifact renderer**

Create `components/sterimax/RunArtifact.tsx`:

```tsx
"use client";

import type { RunArtifact } from "@/data/sterimax-runs";

export function ArtifactView({ artifact }: { artifact: RunArtifact }) {
  return (
    <div className="rounded-2xl bg-[#071e3d] border border-white/[0.1] overflow-hidden">
      <div className="px-6 py-5 border-b border-white/[0.08]">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h4 className="text-white text-lg font-black tracking-tight">{artifact.title}</h4>
            <p className="text-[#4a6785] text-xs font-medium mt-1">{artifact.subtitle}</p>
          </div>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#06b6d4]/15 border border-[#06b6d4]/30 text-[#06b6d4] text-[10px] font-black uppercase tracking-widest shrink-0">
            <i className="fas fa-user-check text-[9px]" /> {artifact.reviewState}
          </span>
        </div>
      </div>

      <div className="p-6">
        {artifact.kind === "table" ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  {(artifact.columns ?? []).map((c) => (
                    <th
                      key={c}
                      className="text-[10px] font-black uppercase tracking-widest text-[#4a6785] pb-3 pr-4 whitespace-nowrap"
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(artifact.rows ?? []).map((row) => (
                  <tr key={row[0]} className="border-t border-white/[0.06]">
                    {row.map((cell, i) => (
                      <td
                        key={i}
                        className={`py-3 pr-4 text-[13px] font-medium align-top ${
                          i === 0 ? "text-white" : "text-slate-400"
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
            {artifact.fields.map((f) => (
              <div key={f.label}>
                <dt className="text-[10px] font-black uppercase tracking-widest text-[#4a6785] mb-1">
                  {f.label}
                </dt>
                <dd className="text-[13px] font-medium text-white leading-snug">{f.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>

      <div className="px-6 py-4 border-t border-white/[0.08] bg-white/[0.02]">
        <p className="text-[11px] font-medium text-[#4a6785] flex items-start gap-2">
          <i className="fas fa-shield-halved text-[10px] mt-0.5 text-[#06b6d4]" />
          {artifact.auditNote}
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Write the run panel**

Create `components/sterimax/RunPanel.tsx`:

```tsx
"use client";

import type { SteriMaxAgent } from "@/data/sterimax-agents";
import type { TaskRun } from "@/data/sterimax-runs";
import { useTaskRun } from "@/lib/use-task-run";
import { ArtifactView } from "./RunArtifact";

export function RunPanel({ agent, run }: { agent: SteriMaxAgent; run: TaskRun }) {
  const { phase, currentStep, start, reset } = useTaskRun(run);

  return (
    <div className="rounded-2xl bg-white/[0.04] border border-white/[0.1] p-6">
      <div className="flex items-start justify-between gap-4 flex-wrap mb-6">
        <div>
          <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-[#06b6d4] mb-2">
            {agent.name} · task run
          </span>
          <h3 className="text-white text-xl font-black tracking-tight">{run.taskName}</h3>
        </div>

        {phase === "idle" ? (
          <button
            onClick={start}
            className="inline-flex items-center gap-2 bg-[#0071e3] text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:shadow-2xl hover:shadow-[#0071e3]/30 transition-all shrink-0"
          >
            <i className="fas fa-play text-[10px]" /> Run task
          </button>
        ) : (
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/[0.1] text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-[#0071e3]/40 transition-all shrink-0"
          >
            <i className="fas fa-rotate-left text-[10px]" /> Reset
          </button>
        )}
      </div>

      <ol className="flex flex-col gap-3 mb-6">
        {run.steps.map((step, i) => {
          const done = i < currentStep;
          const active = phase === "running" && i === currentStep;
          return (
            <li key={step.label} className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                {done ? (
                  <i className="fas fa-circle-check text-[#06b6d4] text-sm" />
                ) : active ? (
                  <i className="fas fa-spinner fa-spin text-[#06b6d4] text-xs" />
                ) : (
                  <span className="w-2.5 h-2.5 rounded-full border border-white/20" />
                )}
              </span>
              <span className="min-w-0">
                <span
                  className={`block text-[13px] font-bold leading-snug ${
                    done || active ? "text-white" : "text-white/25"
                  }`}
                >
                  {step.label}
                </span>
                <span
                  className={`block text-[11px] font-medium leading-snug mt-0.5 ${
                    done || active ? "text-[#4a6785]" : "text-white/15"
                  }`}
                >
                  {step.detail}
                </span>
              </span>
            </li>
          );
        })}
      </ol>

      {phase === "complete" ? (
        <ArtifactView artifact={run.artifact} />
      ) : (
        <p className="text-[11px] font-medium text-[#4a6785] border-t border-white/[0.08] pt-4">
          {phase === "idle"
            ? "The finished artifact appears here when the run completes."
            : "Working…"}
        </p>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Verify it compiles**

Run: `npx eslint lib/use-task-run.ts components/sterimax/RunPanel.tsx components/sterimax/RunArtifact.tsx`
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add lib/use-task-run.ts components/sterimax/RunArtifact.tsx components/sterimax/RunPanel.tsx
git commit -m "feat: add task run state machine and run panel"
```

---

### Task 4: Dashboard tabs

**Files:**
- Create: `components/sterimax/os/OverviewTab.tsx`
- Create: `components/sterimax/os/AgentsTab.tsx`
- Create: `components/sterimax/os/SpendTab.tsx`
- Create: `components/sterimax/os/AuditTab.tsx`
- Create: `components/sterimax/os/RunsTab.tsx`

**Interfaces:**
- Consumes: `osStats`, `osSpend`, `osActivity`, `osAuditLog` (Task 1); `taskRuns`, `getTaskRun` (Task 2); `RunPanel` (Task 3); `sterimaxAgents`, `getSteriMaxAgent` from `data/sterimax-agents.ts`; `useTick` from `components/sterimax/LiveClock.tsx`.
- Produces: `<OverviewTab />`, `<AgentsTab />`, `<SpendTab />`, `<AuditTab />`, `<RunsTab />` — all zero-prop.

- [ ] **Step 1: Create the Overview tab**

Create `components/sterimax/os/OverviewTab.tsx`:

```tsx
"use client";

import { osStats, osSpend, osActivity } from "@/data/sterimax-os";
import { useTick } from "../LiveClock";
import { StatusDot } from "../AgentLive";

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/[0.04] border border-white/[0.1] p-6">
      <div className="text-[10px] font-black uppercase tracking-widest text-[#4a6785] mb-2">
        {label}
      </div>
      <div className="text-3xl font-black text-white tracking-tight">{value}</div>
    </div>
  );
}

export function OverviewTab() {
  const tick = useTick();
  // Tasks climb while the dashboard is open, so the number is never frozen on screen.
  const tasks = osStats.tasks30d + tick;
  const barPct = Math.min(100, (osSpend.monthToDate / osSpend.cap) * 100);
  const overCap = osSpend.monthToDate > osSpend.cap;
  const maxAgentSpend = Math.max(...osSpend.byAgent.map((r) => r.amount));

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 flex flex-col gap-6">
        <div className="grid sm:grid-cols-3 gap-4">
          <StatTile label="Agents live" value={osStats.agentsLive} />
          <StatTile label="Tasks · 30d" value={tasks.toLocaleString("en-CA")} />
          <StatTile label="Hours saved" value={String(osStats.hoursSaved)} />
        </div>

        <div className="rounded-2xl bg-white/[0.04] border border-white/[0.1] p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-white text-sm font-bold">Token spend by agent · July</h3>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#4a6785]">
              {osSpend.currency}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            {osSpend.byAgent.map((row, i) => (
              <div key={row.agentId} className="flex items-center gap-4">
                <span className="w-44 shrink-0 text-[12px] font-semibold text-white truncate">
                  {row.label}
                </span>
                <span className="flex-1 h-2 rounded-full bg-white/[0.06] overflow-hidden">
                  <span
                    className={`block h-full rounded-full ${i < 3 ? "bg-[#0071e3]" : "bg-[#06b6d4]"}`}
                    style={{ width: `${(row.amount / maxAgentSpend) * 100}%` }}
                  />
                </span>
                <span className="w-14 shrink-0 text-right text-[12px] font-black text-white">
                  ${row.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="rounded-2xl bg-gradient-to-br from-[#071e3d] to-[#0d2d55] border border-white/[0.1] p-6">
          <div className="flex items-start justify-between gap-3 mb-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#4a6785]">
              Token spend · month to date
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/[0.08] border border-white/[0.12] text-white text-[9px] font-black uppercase tracking-widest shrink-0">
              Cap enforced
            </span>
          </div>
          <div className="text-4xl font-black text-white tracking-tight mb-1">
            ${osSpend.monthToDate.toLocaleString("en-CA")}
          </div>
          <p className="text-[#4a6785] text-sm font-medium mb-5">
            of a{" "}
            <span className="text-[#06b6d4] font-bold">
              ${osSpend.cap.toLocaleString("en-CA")}
            </span>{" "}
            monthly cap
          </p>
          <div className="h-2 rounded-full bg-white/[0.08] overflow-hidden mb-3">
            <div
              className={`h-full rounded-full ${overCap ? "bg-[#ef4444]" : "bg-[#06b6d4]"}`}
              style={{ width: `${barPct}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-[#4a6785]">
            <span>
              {osSpend.percentUsed}% used · day {osSpend.dayOfMonth}
            </span>
            <span>Projected ${osSpend.projected.toLocaleString("en-CA")}</span>
          </div>
        </div>

        <div className="rounded-2xl bg-white/[0.04] border border-white/[0.1] p-6">
          <div className="flex items-center gap-2.5 mb-5">
            <StatusDot />
            <h3 className="text-white text-sm font-bold">Live activity</h3>
          </div>
          <ul className="flex flex-col gap-4">
            {osActivity.map((entry) => (
              <li key={entry.title}>
                <p className="text-[13px] font-bold text-white leading-snug">{entry.title}</p>
                <p className="text-[11px] font-medium text-[#4a6785] leading-snug mt-0.5">
                  {entry.detail} · {entry.ago}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create the Agents tab**

Create `components/sterimax/os/AgentsTab.tsx`:

```tsx
"use client";

import { useState } from "react";
import { sterimaxAgents } from "@/data/sterimax-agents";
import { getTaskRun } from "@/data/sterimax-runs";
import { RunPanel } from "../RunPanel";
import { LiveTaskLine } from "../AgentLive";

export function AgentsTab() {
  // Only one agent runs at a time, so the screen never shows two agents mid-work.
  const [selected, setSelected] = useState<string>(sterimaxAgents[0].id);
  const agent = sterimaxAgents.find((a) => a.id === selected) ?? sterimaxAgents[0];
  const run = getTaskRun(agent.id);

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="flex flex-col gap-3">
        {sterimaxAgents.map((a, i) => {
          const active = a.id === selected;
          return (
            <button
              key={a.id}
              onClick={() => setSelected(a.id)}
              className={`text-left rounded-2xl p-4 border transition-colors ${
                active
                  ? "bg-white/[0.08] border-[#06b6d4]/50"
                  : "bg-white/[0.04] border-white/[0.1] hover:border-[#0071e3]/40"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={a.image}
                  alt={a.name}
                  className="w-9 h-9 rounded-xl object-cover object-top shrink-0"
                />
                <span className="min-w-0">
                  <span className="block text-white text-sm font-black tracking-tight">{a.name}</span>
                  <span className="block text-[#06b6d4] text-[9px] font-black uppercase tracking-widest truncate">
                    {a.domain}
                  </span>
                </span>
              </div>
              <LiveTaskLine agent={a} agentIndex={i + 1} tone="dark" />
            </button>
          );
        })}
      </div>

      <div className="lg:col-span-2">
        {run ? (
          <RunPanel key={agent.id} agent={agent} run={run} />
        ) : (
          <div className="rounded-2xl bg-white/[0.04] border border-white/[0.1] p-6">
            <p className="text-[#4a6785] text-sm font-medium">
              {agent.name} has no runnable task in this demo.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create the Spend tab**

Create `components/sterimax/os/SpendTab.tsx`:

```tsx
"use client";

import { osSpend } from "@/data/sterimax-os";

export function SpendTab() {
  const remaining = osSpend.cap - osSpend.monthToDate;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid sm:grid-cols-4 gap-4">
        {[
          { label: "Month to date", value: `$${osSpend.monthToDate.toLocaleString("en-CA")}` },
          { label: "Monthly cap", value: `$${osSpend.cap.toLocaleString("en-CA")}` },
          { label: "Projected", value: `$${osSpend.projected.toLocaleString("en-CA")}` },
          { label: "Remaining", value: `$${remaining.toLocaleString("en-CA")}` },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl bg-white/[0.04] border border-white/[0.1] p-6">
            <div className="text-[10px] font-black uppercase tracking-widest text-[#4a6785] mb-2">
              {s.label}
            </div>
            <div className="text-2xl font-black text-white tracking-tight">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-white/[0.04] border border-white/[0.1] overflow-hidden">
        <div className="px-6 py-5 border-b border-white/[0.08]">
          <h3 className="text-white text-sm font-bold">Spend by agent · July ({osSpend.currency})</h3>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr>
              {["Agent", "Spend", "Share of total"].map((c) => (
                <th
                  key={c}
                  className="text-[10px] font-black uppercase tracking-widest text-[#4a6785] px-6 py-3"
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {osSpend.byAgent.map((row) => (
              <tr key={row.agentId} className="border-t border-white/[0.06]">
                <td className="px-6 py-3 text-[13px] font-semibold text-white">{row.label}</td>
                <td className="px-6 py-3 text-[13px] font-black text-white">${row.amount}</td>
                <td className="px-6 py-3 text-[13px] font-medium text-slate-400">
                  {Math.round((row.amount / osSpend.monthToDate) * 100)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-[12px] font-medium text-[#4a6785] leading-relaxed max-w-3xl">
        The cap is enforced, not advisory. When projected spend approaches ${osSpend.cap.toLocaleString("en-CA")},
        Wilfred rebalances model routing to cheaper models for low-stakes work before any
        agent is throttled. All processing runs on Canadian infrastructure.
      </p>
    </div>
  );
}
```

- [ ] **Step 4: Create the Audit tab**

Create `components/sterimax/os/AuditTab.tsx`:

```tsx
"use client";

import { osAuditLog } from "@/data/sterimax-os";
import { getSteriMaxAgent } from "@/data/sterimax-agents";

export function AuditTab() {
  return (
    <div className="rounded-2xl bg-white/[0.04] border border-white/[0.1] overflow-hidden">
      <div className="px-6 py-5 border-b border-white/[0.08] flex items-center justify-between gap-4 flex-wrap">
        <h3 className="text-white text-sm font-bold">Audit log · today</h3>
        <span className="text-[10px] font-black uppercase tracking-widest text-[#4a6785]">
          Every agent action · immutable · exportable
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr>
              {["Time", "Agent", "Action", "Detail", "Review state"].map((c) => (
                <th
                  key={c}
                  className="text-[10px] font-black uppercase tracking-widest text-[#4a6785] px-6 py-3 whitespace-nowrap"
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {osAuditLog.map((e) => (
              <tr key={`${e.time}-${e.agentId}`} className="border-t border-white/[0.06]">
                <td className="px-6 py-3 text-[12px] font-black text-[#4a6785] whitespace-nowrap">
                  {e.time}
                </td>
                <td className="px-6 py-3 text-[13px] font-semibold text-white whitespace-nowrap">
                  {getSteriMaxAgent(e.agentId)?.name ?? e.agentId}
                </td>
                <td className="px-6 py-3 text-[13px] font-medium text-white">{e.action}</td>
                <td className="px-6 py-3 text-[12px] font-medium text-slate-400">{e.detail}</td>
                <td className="px-6 py-3 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#06b6d4]/15 border border-[#06b6d4]/30 text-[#06b6d4] text-[9px] font-black uppercase tracking-widest">
                    {e.review}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Create the Runs tab**

Create `components/sterimax/os/RunsTab.tsx`:

```tsx
"use client";

import { taskRuns } from "@/data/sterimax-runs";
import { getSteriMaxAgent } from "@/data/sterimax-agents";

export function RunsTab() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {taskRuns.map((run) => {
        const agent = getSteriMaxAgent(run.agentId);
        return (
          <div
            key={run.agentId}
            className="rounded-2xl bg-white/[0.04] border border-white/[0.1] p-6 flex flex-col"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#06b6d4] mb-3">
              {agent?.name ?? run.agentId}
            </span>
            <h3 className="text-white text-base font-black tracking-tight mb-2">{run.taskName}</h3>
            <p className="text-[#4a6785] text-[12px] font-medium leading-relaxed flex-1">
              {run.steps.length} steps · produces {run.artifact.title}
            </p>
            <span className="inline-flex items-center gap-2 mt-4 pt-4 border-t border-white/[0.08] text-[10px] font-black uppercase tracking-widest text-[#4a6785]">
              <i className="fas fa-user-check text-[9px] text-[#06b6d4]" />
              {run.artifact.reviewState}
            </span>
          </div>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 6: Verify they compile**

Run: `npx eslint components/sterimax/os`
Expected: no errors (the `<img>` warning in `AgentsTab.tsx` is expected and acceptable — it matches the rest of the codebase).

- [ ] **Step 7: Commit**

```bash
git add components/sterimax/os
git commit -m "feat: add AI OS dashboard tabs"
```

---

### Task 5: The dashboard route and cross-links

**Files:**
- Create: `app/admin/sales-training/sterimax/os/page.tsx`
- Modify: `app/admin/sales-training/sterimax/page.tsx`
- Modify: `app/admin/sales-training/page.tsx`

**Interfaces:**
- Consumes: all five tabs (Task 4); `LiveClock` from `components/sterimax/LiveClock.tsx`.
- Produces: the route `/admin/sales-training/sterimax/os`.

- [ ] **Step 1: Create the dashboard page**

Create `app/admin/sales-training/sterimax/os/page.tsx`. It is a client component, so the
`metadata` export is not available — the title is set by the parent admin layout.

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { LiveClock } from "@/components/sterimax/LiveClock";
import { OverviewTab } from "@/components/sterimax/os/OverviewTab";
import { AgentsTab } from "@/components/sterimax/os/AgentsTab";
import { RunsTab } from "@/components/sterimax/os/RunsTab";
import { SpendTab } from "@/components/sterimax/os/SpendTab";
import { AuditTab } from "@/components/sterimax/os/AuditTab";

type Tab = "overview" | "agents" | "runs" | "spend" | "audit";

const tabs: { id: Tab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "agents", label: "Agents" },
  { id: "runs", label: "Runs" },
  { id: "spend", label: "Spend" },
  { id: "audit", label: "Audit Log" },
];

export default function SteriMaxOsPage() {
  const [active, setActive] = useState<Tab>("overview");

  return (
    <LiveClock>
      <div className="min-h-screen bg-[#040e1a]">
        <div className="border-b border-white/[0.08] bg-[#071e3d]/60 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#06b6d4] to-[#0071e3] flex items-center justify-center">
                <i className="fas fa-microchip text-white text-lg" />
              </div>
              <div>
                <h1 className="text-white font-black text-lg tracking-tight">
                  Audcomp <span className="text-[#06b6d4]">AI OS</span>
                </h1>
                <p className="text-white/40 text-xs">SteriMax Inc.</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.12] text-white text-[10px] font-black uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-[#06b6d4] animate-pulse" /> Canada Central
              </span>
              <Link
                href="/admin/sales-training/sterimax"
                className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#4a6785] hover:text-[#06b6d4] transition-colors"
              >
                <i className="fas fa-users text-[10px]" /> Roster
              </Link>
            </div>
          </div>
        </div>

        <div className="border-b border-white/[0.06] bg-[#071e3d]/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-all duration-200 whitespace-nowrap ${
                  active === tab.id
                    ? "border-[#06b6d4] text-[#06b6d4]"
                    : "border-transparent text-white/40 hover:text-white/70"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {active === "overview" && <OverviewTab />}
          {active === "agents" && <AgentsTab />}
          {active === "runs" && <RunsTab />}
          {active === "spend" && <SpendTab />}
          {active === "audit" && <AuditTab />}
        </div>
      </div>
    </LiveClock>
  );
}
```

- [ ] **Step 2: Link the roster to the dashboard**

In `app/admin/sales-training/sterimax/page.tsx`, replace the closing "All demos" block:

```tsx
          <div className="mt-12 flex items-center justify-center gap-6 flex-wrap">
            <Link
              href="/admin/sales-training/sterimax/os"
              className="inline-flex items-center gap-2 bg-[#0071e3] text-white px-7 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:shadow-2xl hover:shadow-[#0071e3]/30 transition-all"
            >
              <i className="fas fa-gauge-high text-[10px]" /> Open the AI OS
            </Link>
            <Link
              href="/admin/sales-training"
              className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#4a6785] hover:text-[#06b6d4] transition-colors"
            >
              <i className="fas fa-arrow-left text-[10px]" /> All demos
            </Link>
          </div>
```

- [ ] **Step 3: Add the dashboard to the launcher**

In `app/admin/sales-training/page.tsx`, replace the single "Open demo" span inside the SteriMax
card with two links. Because a `<Link>` cannot be nested inside another `<Link>`, change the
card's outer element from `<Link href=...>` to `<div>` and keep the same classes minus the
`group` hover behaviour:

```tsx
        <div className="rounded-2xl bg-white/[0.06] border border-white/[0.1] backdrop-blur-sm p-8">
          <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#06b6d4] mb-4">
            Pharmaceutical
          </span>
          <h2 className="text-2xl font-black text-white tracking-tight mb-2">SteriMax Inc.</h2>
          <p className="text-[#4a6785] text-sm font-medium leading-relaxed mb-6">
            Sterile injectables, Oakville. {sterimaxAgents.length} specialists plus Wilfred,
            mapped to the 2026&ndash;2027 FDR changes.
          </p>
          <div className="flex flex-col gap-2">
            <Link
              href="/admin/sales-training/sterimax/os"
              className="inline-flex items-center gap-2 text-white text-[10px] font-black uppercase tracking-widest hover:text-[#06b6d4] transition-colors"
            >
              <i className="fas fa-gauge-high text-[10px]" /> Open the AI OS dashboard
            </Link>
            <Link
              href="/admin/sales-training/sterimax"
              className="inline-flex items-center gap-2 text-[#4a6785] text-[10px] font-black uppercase tracking-widest hover:text-[#06b6d4] transition-colors"
            >
              <i className="fas fa-users text-[10px]" /> Open the agent roster
            </Link>
          </div>
        </div>
```

- [ ] **Step 4: Verify in the browser**

Run: `npm run dev` (a server may already be running — check the port it reports).
Visit `/admin/sales-training/sterimax/os` and confirm:
- Overview shows `6 / 6`, a climbing task count, `311` hours, and `$1,306` of `$2,000` with a
  65% bar.
- Agents tab: click **Run task** on David. Six steps complete one at a time, each turning teal
  with a check, then the drafted shortage report appears with `Awaiting RA sign-off`.
- **Reset** returns it to idle; **Run task** replays it.
- Selecting a different agent while David's run is complete clears the panel and shows that
  agent's idle run.
- Runs, Spend and Audit Log tabs render.
- No console errors, no hydration warning.

- [ ] **Step 5: Commit**

```bash
git add app/admin/sales-training
git commit -m "feat: add AI OS dashboard route and cross-links"
```

---

### Task 6: Full verification

- [ ] **Step 1: Run the test suite**

Run: `npm test`
Expected: PASS, all suites.

- [ ] **Step 2: Lint the new files**

Run: `npx eslint lib components/sterimax data app/admin`
Expected: 0 errors. `<img>` warnings are acceptable.

- [ ] **Step 3: Production build**

Run: `npm run build`
Expected: succeeds, with `/admin/sales-training/sterimax/os` in the route table.

- [ ] **Step 4: Present-the-demo pass**

Walk the full path a presenter would: `/admin/sales-training` → AI OS → Overview → Agents →
run David → Reset → run Claire → Runs → Spend → Audit Log → Roster → David's detail page.
Confirm no errors at any step and that the public home page at `/` still renders normally.

- [ ] **Step 5: Commit any fixes**

```bash
git add -A
git commit -m "fix: address issues found in AI OS verification"
```

(Skip this commit if nothing needed fixing.)

---

## Self-Review

**Spec coverage:**

| Spec requirement | Task |
|---|---|
| Route `/os`, Claire-style tabbed shell | 5 |
| Five tabs: Overview, Agents, Runs, Spend, Audit Log | 4, 5 |
| Header: AI OS, Canada Central, SteriMax Inc. | 5 |
| Deck stat tiles and spend panel with cap | 1, 4 |
| Spend sums to month-to-date, tested | 1 |
| Activity feed on `LiveClock` | 4 |
| `data/sterimax-runs.ts` types and `getTaskRun` | 2 |
| One run per specialist, none for Wilfred | 2 |
| Six artifacts across document/table/record | 2 |
| `reviewState` and `auditNote` on every artifact | 2 |
| `useTaskRun` with phase/currentStep/start/reset, 1100ms | 3 |
| Three step states: pending, active, complete | 3 |
| One run at a time | 4 (`AgentsTab` selection + `key={agent.id}`) |
| Cap bar turns red above cap | 4 (`overCap`) |
| Cross-links roster ↔ dashboard, launcher lists both | 5 |
| Tests for os data and run data | 1, 2 |
| No test for the timer hook (stated in spec) | — intentional |
| Build, lint, manual pass | 6 |

No gaps.

**Placeholder scan:** none. Every code step is complete and runnable.

**Type consistency:** `RunStep`, `ArtifactField`, `RunArtifact`, `TaskRun` are defined once in
Task 2 and imported thereafter. `useTaskRun` returns exactly `{ phase, currentStep, start, reset }`
as declared in Task 3 and destructured identically in `RunPanel`. `SpendRow`, `ActivityEntry`
and `AuditEntry` are defined in Task 1 and consumed unchanged in Task 4. The artifact component
is named `ArtifactView` (the type is `RunArtifact`, so the component cannot share that name) —
Task 3 defines it and Task 3's `RunPanel` is its only consumer.

**One risk flagged:** `RunPanel` is remounted via `key={agent.id}` when the selected agent
changes, and `useTaskRun` also resets when `run` changes. Both are deliberate — the key handles
the remount cleanly and the effect covers the case where a run object is swapped without a
remount.
