# SteriMax Agent Portal Demo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a live-pitch demo at `/admin/sales-training/sterimax` showing the seven SteriMax agents from the recommendations deck as a running system — a roster where each agent visibly works, plus per-agent detail pages mirroring the deck spreads.

**Architecture:** A separate dataset (`data/sterimax-agents.ts`) feeds a server-rendered roster and dynamic detail pages. All motion derives from a single client-side tick counter in a React context; every live value is a pure function of that tick, so there is no randomness, no clock reads, and no network calls. The `/admin` segment renders without public site chrome by extending the bypass that `SiteShell` already implements for `/claire`.

**Tech Stack:** Next.js 16.2.6 (App Router), React 19.2.4, TypeScript 5, Tailwind CSS 4, Vitest (added in Task 1).

## Global Constraints

- **Spec:** `docs/superpowers/specs/2026-07-28-sterimax-demo-design.md`. Read it before Task 1.
- **Next.js 16 is not the Next.js you know.** Read the relevant file in `node_modules/next/dist/docs/` before using an unfamiliar API. Notably: `params` is a `Promise` and must be awaited.
- **Design system is binding.** Read `design-system/README.md`. Never introduce a hex value that is not in `design-system/tokens.json`. Permitted: `#071e3d` navy, `#0d2d55` navy-mid, `#0a2540` foreground, `#0071e3` primary, `#06b6d4` teal, `#38bdf8` sky, `#f0f7ff` muted, `#4a6785` muted-foreground, `#dde8f5` border.
- **Eyebrow labels:** teal `#06b6d4`, uppercase, `font-black`, `tracking-[0.3em]`, `text-[10px]`.
- **Cards:** `rounded-2xl`. On dark: `bg-white/[0.06] border border-white/[0.1] backdrop-blur-sm`. On light: `bg-white border border-[#dde8f5] shadow-sm`.
- **Buttons:** `rounded-2xl uppercase font-black tracking-widest` (Agent Studio convention).
- **Icons:** Font Awesome 6.5 classes (`fas fa-*`), already loaded globally in `app/layout.tsx`.
- **No new runtime dependencies.** Vitest is a devDependency only.
- **Determinism:** no `Math.random()`, no `Date.now()`, no `new Date()` anywhere in `lib/sterimax-live.ts`, `components/sterimax/`, or the admin pages. The demo must render identically on every run.
- **Agent copy is transcribed from the deck verbatim.** Do not paraphrase, "improve", or expand it. The exact strings are given in Task 2.
- **Commit after every task.** Use the `feat:` / `test:` / `chore:` prefixes shown.

---

## File Structure

| File | Responsibility |
|------|----------------|
| `lib/sterimax-live.ts` | Pure tick math. No React, no JSX. |
| `lib/sterimax-live.test.ts` | Unit tests for the above. |
| `data/sterimax-agents.ts` | The dataset + `getSteriMaxAgent` lookup. |
| `data/sterimax-agents.test.ts` | Shape invariants (counts, uniqueness, required fields). |
| `components/SiteShell.tsx` | **Modify** — bypass chrome for `/admin`. |
| `app/admin/layout.tsx` | Admin shell + `noindex` metadata. |
| `app/admin/sales-training/page.tsx` | Demo launcher. |
| `components/sterimax/LiveClock.tsx` | Tick provider + `useTick` hook. |
| `components/sterimax/AgentLive.tsx` | Status dot, rotating task line, run counter. |
| `components/sterimax/RosterCard.tsx` | One agent card on the roster. |
| `components/sterimax/ActivityStream.tsx` | Per-agent activity list on detail pages. |
| `app/admin/sales-training/sterimax/page.tsx` | The roster. |
| `app/admin/sales-training/sterimax/[agentId]/page.tsx` | Agent detail. |

---

### Task 1: Tick math + test runner

The only genuinely testable logic in this feature is the arithmetic that turns a tick counter into what the user sees. Isolating it in a plain TypeScript module means it can be tested without rendering anything.

**Files:**
- Modify: `package.json`
- Create: `lib/sterimax-live.ts`
- Test: `lib/sterimax-live.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `TICK_MS: 3000`
  - `TICKS_PER_TASK: 4`
  - `taskIndexFor(tick: number, agentIndex: number, scriptLength: number): number`
  - `secondsSinceLastAction(tick: number): number`
  - `runCountFor(tick: number, baseRuns: number, cadenceTicks: number): number`

- [ ] **Step 1: Install Vitest**

```bash
npm install --save-dev vitest@^3
```

- [ ] **Step 2: Add the test script**

In `package.json`, add to `"scripts"` (keep the existing entries):

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 3: Write the failing test**

Create `lib/sterimax-live.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import {
  TICK_MS,
  TICKS_PER_TASK,
  taskIndexFor,
  secondsSinceLastAction,
  runCountFor,
} from "./sterimax-live";

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
```

- [ ] **Step 4: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL — cannot resolve `./sterimax-live`.

- [ ] **Step 5: Write the implementation**

Create `lib/sterimax-live.ts`:

```ts
// Deterministic tick math for the SteriMax demo. Every visible "live" value is a
// pure function of a tick counter, so the demo replays identically every time —
// no clock reads, no randomness, nothing that can differ between server and client.

/** Milliseconds between ticks. */
export const TICK_MS = 3000;

/** How many ticks an agent holds one task line before moving to the next. */
export const TICKS_PER_TASK = 4;

/**
 * Which line of an agent's liveScript to show.
 * `agentIndex` staggers agents so they don't all change line on the same tick.
 */
export function taskIndexFor(tick: number, agentIndex: number, scriptLength: number): number {
  if (scriptLength <= 0) return 0;
  return (Math.floor(tick / TICKS_PER_TASK) + agentIndex) % scriptLength;
}

/** Seconds elapsed since the current task line appeared. */
export function secondsSinceLastAction(tick: number): number {
  return (tick % TICKS_PER_TASK) * (TICK_MS / 1000);
}

/** A monotonically climbing count of completed runs. */
export function runCountFor(tick: number, baseRuns: number, cadenceTicks: number): number {
  return baseRuns + Math.floor(tick / cadenceTicks);
}
```

- [ ] **Step 6: Run the test to verify it passes**

Run: `npm test`
Expected: PASS — 11 tests.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json lib/sterimax-live.ts lib/sterimax-live.test.ts
git commit -m "feat: add deterministic tick math for SteriMax demo"
```

---

### Task 2: The SteriMax dataset

**Files:**
- Create: `data/sterimax-agents.ts`
- Test: `data/sterimax-agents.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `type Capability = { title: string; desc: string }`
  - `type SteriMaxAgent` — fields exactly as written in Step 3 below
  - `orchestrator: SteriMaxAgent` (Wilfred)
  - `sterimaxAgents: SteriMaxAgent[]` (David, Sam, Olivia, Maya, Quinn, Claire — in deck order)
  - `allSteriMaxAgents: SteriMaxAgent[]` (`[orchestrator, ...sterimaxAgents]`)
  - `getSteriMaxAgent(id: string): SteriMaxAgent | undefined`

Note: `baseRuns` and `runCadence` are additions beyond the spec's field list — they feed `runCountFor` from Task 1 and give each agent a plausible, distinct run volume.

- [ ] **Step 1: Write the failing test**

Create `data/sterimax-agents.test.ts`:

```ts
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
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL — cannot resolve `./sterimax-agents`.

- [ ] **Step 3: Write the dataset**

Create `data/sterimax-agents.ts`. All copy below is transcribed from the SteriMax
recommendations deck — do not alter it.

```ts
// SteriMax demo dataset. Deliberately separate from `data/agents.ts`: three names
// (Sam, Quinn, Claire) exist in both rosters with entirely different roles, so one
// shared shape would make one of the two stories wrong.

export type Capability = { title: string; desc: string };

export type SteriMaxAgent = {
  id: string;
  name: string;
  role: string;
  domain: string;
  agentNo?: string;
  image: string;
  icon: string;
  headline: string;
  headlineAccent: string;
  blurb: string;
  rosterDesc: string;
  capabilities: Capability[];
  wiresInto: string[];
  guardrail: string;
  surface: "dark" | "light";
  badge?: string;
  liveScript: string[];
  baseRuns: number;
  runCadence: number;
};

export const orchestrator: SteriMaxAgent = {
  id: "wilfred",
  name: "Wilfred",
  role: "AI Operations Manager",
  domain: "Orchestrator",
  image: "/images/agents/wilfred.png",
  icon: "fa-sitemap",
  headline: "One manager for your whole AI team.",
  headlineAccent: "whole AI team.",
  blurb:
    "You don't manage prompts or platforms. Wilfred hires the right agent for each workflow, wires it into your ERP, quality, and regulatory systems, monitors it 24/7, and reports results back to SteriMax every day.",
  rosterDesc: "Hires, manages & reports on the whole team",
  capabilities: [
    { title: "Hires", desc: "The right agent for each workflow, matched to the job rather than forced to fit." },
    { title: "Wires", desc: "Into your stack — ERP, quality, and regulatory systems, not a parallel tool." },
    { title: "24/7", desc: "Monitors agent health continuously and rebalances model routing to control spend." },
    { title: "Reports", desc: "ROI reported monthly, with every agent's output and cost attributed." },
  ],
  wiresInto: ["ERP", "quality systems", "regulatory systems", "the Audcomp AI OS"],
  guardrail: "Wilfred governs the roster. SteriMax owns every decision the roster surfaces.",
  surface: "dark",
  liveScript: [
    "Rebalancing model routing · projected spend −14%",
    "Health check across 6 agents · all green",
    "Compiling daily results digest for SteriMax",
    "Reviewing escalation queue · 3 items awaiting sign-off",
  ],
  baseRuns: 2184,
  runCadence: 2,
};

export const sterimaxAgents: SteriMaxAgent[] = [
  {
    id: "david",
    name: "David",
    role: "Drug Shortage Monitoring & Regulatory Compliance",
    domain: "Shortage & Compliance",
    agentNo: "007406",
    image: "/images/agents/david.png",
    icon: "fa-triangle-exclamation",
    headline: "Never miss a reporting window.",
    headlineAccent: "a reporting window.",
    blurb:
      "David watches the shortage landscape and your inventory continuously, and drafts the mandatory filings before the clock runs out — so FDR compliance stops depending on someone remembering.",
    rosterDesc: "Monitors shortages, auto-drafts FDR reports",
    capabilities: [
      { title: "Monitors continuously", desc: "Drug Shortages Canada, Health Canada notices, and your inventory positions across 100+ SKUs." },
      { title: "Catches the 250% trigger", desc: "Flags demand surges past the regulatory threshold the day they appear, per SKU." },
      { title: "Drafts the filings", desc: "Shortage and discontinuation reports pre-populated and queued on deadline for sign-off." },
      { title: "Keeps plans current", desc: "Prevention and mitigation plans, and safety-stock levels, maintained as products change." },
    ],
    wiresInto: ["Drug Shortages Canada", "Health Canada notices", "ERP inventory", "Quality document system"],
    guardrail: "Every filing is human-reviewed before submission, and every action is audit-logged.",
    surface: "dark",
    badge: "HIGHEST-VALUE FIT",
    liveScript: [
      "Scanning Drug Shortages Canada · 104 SKUs checked",
      "SKU 40118 · demand surge 250% · drafting shortage report",
      "Shortage report queued for RA sign-off · deadline in 4 days",
      "Refreshing mitigation plans · 7 products updated",
    ],
    baseRuns: 1284,
    runCadence: 2,
  },
  {
    id: "sam",
    name: "Sam",
    role: "Demand Forecasting & Supply Chain Risk",
    domain: "Demand Forecasting",
    agentNo: "007402",
    image: "/images/agents/sam.png",
    icon: "fa-chart-line",
    headline: "See the shortage before it happens.",
    headlineAccent: "before it happens.",
    blurb:
      "Sam turns shortage response into shortage prevention — modelling demand and supply risk across every SKU so planning decisions are made weeks earlier.",
    rosterDesc: "Predicts shortages across 100+ SKUs",
    capabilities: [
      { title: "Forecasts demand", desc: "Sales history, seasonality, and channel mix modelled per SKU across the full portfolio." },
      { title: "Reads the market", desc: "Competitor shortage signals and supplier lead times folded into the risk picture." },
      { title: "Optimizes safety stock", desc: "Recommends target levels by SKU rather than a single blanket rule." },
      { title: "Cues importation", desc: "Surfaces candidates for exceptional-importation planning before supply is critical." },
    ],
    wiresInto: ["ERP & sales history", "supplier lead times", "Drug Shortages Canada", "S&OP reporting"],
    guardrail: "Proactive, not reactive — the forecast refreshes daily and escalates only what changed.",
    surface: "light",
    liveScript: [
      "Refreshing 30-day supply risk · 104 SKUs scored",
      "3 SKUs escalated to planning · lead time drift detected",
      "Recomputing safety-stock targets · 22 SKUs adjusted",
      "Competitor shortage signal ingested · risk model updated",
    ],
    baseRuns: 968,
    runCadence: 3,
  },
  {
    id: "olivia",
    name: "Olivia",
    role: "Regulatory Submission & Documentation",
    domain: "Regulatory Submissions",
    agentNo: "007404",
    image: "/images/agents/olivia.png",
    icon: "fa-file-lines",
    headline: "Cut submission cycle time.",
    headlineAccent: "cycle time.",
    blurb:
      "Speed to market is your edge. Olivia does the assembly and pre-checking so your regulatory team spends its time on judgement, not document wrangling.",
    rosterDesc: "Preps eCTD, DIN/NOC & GMP documentation",
    capabilities: [
      { title: "Pre-populates filings", desc: "eCTD sections, DIN and NOC applications, and exceptional-importation dossiers." },
      { title: "Assembles GMP docs", desc: "Pulls the current, correct versions from your document system every time." },
      { title: "Checks the guidance", desc: "Validates against Health Canada guidance including GUI-0146 and GUI-0148." },
      { title: "Flags the gaps", desc: "Missing sections, stale references, and inconsistencies surfaced before review." },
    ],
    wiresInto: ["eCTD publishing", "document management", "Health Canada guidance library", "product master data"],
    guardrail: "RA reviews and signs off. Olivia removes the days of preparation in front of that review.",
    surface: "dark",
    liveScript: [
      "Assembling submission package · awaiting RA sign-off",
      "Validating against GUI-0148 · 2 stale references flagged",
      "Pulling current GMP document versions · 31 files",
      "DIN application pre-populated · Module 1 complete",
    ],
    baseRuns: 412,
    runCadence: 4,
  },
  {
    id: "maya",
    name: "Maya",
    role: "Medical Information & Pharmacovigilance",
    domain: "Med Info & PV",
    agentNo: "007403",
    image: "/images/agents/maya.png",
    icon: "fa-notes-medical",
    headline: "Scale med info without scaling headcount.",
    headlineAccent: "scaling headcount.",
    blurb:
      "Inbound query and adverse-event volume grows with every product launch. Maya absorbs the intake and structuring so timelines stay compliant without proportional hiring.",
    rosterDesc: "Triages queries, codes adverse events",
    capabilities: [
      { title: "Triages inbound", desc: "Medical-information queries from HCPs and patients routed, categorized, and prioritized." },
      { title: "Structures AE intake", desc: "Adverse-event reports captured into a consistent, reportable structure." },
      { title: "Codes to MedDRA", desc: "Consistent terminology applied for downstream safety reporting." },
      { title: "Drafts responses", desc: "Reference-backed replies prepared for HCP review, never sent unreviewed." },
    ],
    wiresInto: ["Medical-information inbox & phone intake", "safety database", "MedDRA", "SOP library"],
    guardrail: "Every adverse event routes to a qualified human reviewer, with reporting clocks tracked.",
    surface: "light",
    liveScript: [
      "Triaging inbound queue · 14 HCP queries routed",
      "Adverse event structured · escalated to qualified reviewer",
      "MedDRA coding applied · 9 terms mapped",
      "Drafting reference-backed reply · held for review",
    ],
    baseRuns: 1806,
    runCadence: 2,
  },
  {
    id: "quinn",
    name: "Quinn",
    role: "Tender & GPO Bid Management",
    domain: "Tenders & GPO",
    agentNo: "007405",
    image: "/images/agents/quinn.png",
    icon: "fa-gavel",
    headline: "Never miss a tender deadline.",
    headlineAccent: "a tender deadline.",
    blurb:
      "Your revenue runs on GPO and provincial relationships. Quinn watches every posting and assembles the response so no opportunity is lost to a calendar.",
    rosterDesc: "Assembles bids, tracks every deadline",
    capabilities: [
      { title: "Monitors postings", desc: "GPO and provincial tender portals watched for anything matching your portfolio." },
      { title: "Extracts requirements", desc: "Every posting turned into a structured requirement and document checklist." },
      { title: "Assembles the bid", desc: "Drafted from prior winning submissions, product data, and current pricing inputs." },
      { title: "Tracks every date", desc: "Submission windows, clarification deadlines, and award dates on one calendar." },
    ],
    wiresInto: ["GPO portals", "provincial tender sites", "prior bid library", "product & pricing data"],
    guardrail: "Commercial owns the pricing call. Quinn does everything around it.",
    surface: "dark",
    liveScript: [
      "Scanning GPO and provincial portals · 2 new postings matched",
      "Requirements extracted · 41-item document checklist built",
      "Bid drafted from prior winning submission · pricing pending",
      "Clarification deadline in 6 days · calendar updated",
    ],
    baseRuns: 634,
    runCadence: 3,
  },
  {
    id: "claire",
    name: "Claire",
    role: "Knowledge & Integration",
    domain: "Knowledge & Integration",
    image: "/images/agents/claire.png",
    icon: "fa-brain",
    headline: "Turn M&A friction into institutional memory.",
    headlineAccent: "institutional memory.",
    blurb:
      "The Andone integration doubled the systems and the questions. Claire unifies product, regulatory, and customer data across the combined pharma, device, and veterinary verticals so answers stop depending on who you ask.",
    rosterDesc: "Unifies data & SOPs post-Andone",
    capabilities: [
      { title: "Unifies the data", desc: "Product, regulatory, and customer records reconciled across the pharma, device, and veterinary verticals." },
      { title: "Answers employees", desc: "Staff questions resolved from source documents, with citations back to the original SOP." },
      { title: "Surfaces SOPs", desc: "The current, approved procedure served in context — not the copy on someone's desktop." },
      { title: "Retains the integration", desc: "Post-Andone decisions, mappings, and exceptions captured as institutional memory." },
    ],
    wiresInto: ["SharePoint & document stores", "ERP master data", "SOP library", "Andone systems"],
    guardrail: "Answers cite their source document. Claire never invents a procedure.",
    surface: "dark",
    badge: "POST-ANDONE",
    liveScript: [
      "Reconciling product master data · pharma + device verticals",
      "Answered 12 employee questions · every answer cited",
      "Indexing updated SOP library · 87 documents current",
      "Mapping Andone exceptions · 4 conflicts surfaced",
    ],
    baseRuns: 2412,
    runCadence: 2,
  },
];

export const allSteriMaxAgents: SteriMaxAgent[] = [orchestrator, ...sterimaxAgents];

export function getSteriMaxAgent(id: string): SteriMaxAgent | undefined {
  return allSteriMaxAgents.find((a) => a.id === id);
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test`
Expected: PASS — all dataset tests green, plus the 11 from Task 1.

- [ ] **Step 5: Commit**

```bash
git add data/sterimax-agents.ts data/sterimax-agents.test.ts
git commit -m "feat: add SteriMax agent dataset from recommendations deck"
```

---

### Task 3: Admin shell

The root layout wraps every route in `SiteShell`, which renders `Nav` and `Footer`. `SiteShell`
already implements exactly the bypass needed — it returns bare children for `/claire`. Extend
that rather than introducing a second root layout.

**Files:**
- Modify: `components/SiteShell.tsx`
- Create: `app/admin/layout.tsx`
- Create: `app/admin/sales-training/page.tsx`

**Interfaces:**
- Consumes: `sterimaxAgents` from Task 2 (for the demo card's agent count).
- Produces: the `/admin` route segment, rendering without public chrome and carrying `noindex`.

- [ ] **Step 1: Extend the SiteShell bypass**

In `components/SiteShell.tsx`, replace the `isClaire` block:

```tsx
  const pathname = usePathname();
  // Surfaces that render their own chrome instead of the public nav and footer.
  const isBareSurface = pathname.startsWith("/claire") || pathname.startsWith("/admin");

  if (isBareSurface) {
    return <>{children}</>;
  }
```

- [ ] **Step 2: Create the admin layout**

Create `app/admin/layout.tsx`:

```tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin | Audcomp",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#071e3d]">
      <header className="shrink-0 border-b border-white/10 bg-[#071e3d]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/admin/sales-training"
            className="text-white text-[11px] font-black uppercase tracking-[0.3em]"
          >
            Audcomp <span className="text-[#06b6d4]">Admin</span>
          </Link>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#4a6785]">
            Internal · not indexed
          </span>
        </div>
      </header>
      <div className="flex-1">{children}</div>
    </div>
  );
}
```

- [ ] **Step 3: Create the launcher page**

Create `app/admin/sales-training/page.tsx`:

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { sterimaxAgents } from "@/data/sterimax-agents";

export const metadata: Metadata = {
  title: "Sales Training | Audcomp Admin",
  robots: { index: false, follow: false },
};

export default function SalesTrainingPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-16">
      <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#06b6d4] mb-5">
        <i className="fas fa-chalkboard-user" /> Sales Training
      </span>
      <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight mb-3">
        Prospect demos.
      </h1>
      <p className="text-[#4a6785] text-base font-medium mb-12 max-w-2xl">
        Live agent portals built from a prospect&apos;s recommendation deck. Open one full-screen
        to present it.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          href="/admin/sales-training/sterimax"
          className="group rounded-2xl bg-white/[0.06] border border-white/[0.1] backdrop-blur-sm p-8 hover:border-[#0071e3]/40 transition-colors"
        >
          <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#06b6d4] mb-4">
            Pharmaceutical
          </span>
          <h2 className="text-2xl font-black text-white tracking-tight mb-2">SteriMax Inc.</h2>
          <p className="text-[#4a6785] text-sm font-medium leading-relaxed mb-6">
            Sterile injectables, Oakville. {sterimaxAgents.length} specialists plus Wilfred,
            mapped to the 2026&ndash;2027 FDR changes.
          </p>
          <span className="inline-flex items-center gap-2 text-white text-[10px] font-black uppercase tracking-widest group-hover:text-[#06b6d4] transition-colors">
            Open demo <i className="fas fa-arrow-right text-[10px] group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>
      </div>
    </main>
  );
}
```

- [ ] **Step 4: Verify the shell renders bare**

Run: `npm run dev`
Visit `http://localhost:3000/admin/sales-training`.
Expected: the admin bar and the SteriMax card render on navy. The public `Nav` and `Footer` are
**absent**. View source and confirm `<meta name="robots" content="noindex,nofollow">` is present.
Stop the dev server.

- [ ] **Step 5: Verify nothing else regressed**

Visit `http://localhost:3000/` and confirm the public nav and footer still render.

- [ ] **Step 6: Commit**

```bash
git add components/SiteShell.tsx app/admin/layout.tsx app/admin/sales-training/page.tsx
git commit -m "feat: add noindexed admin shell and sales-training launcher"
```

---

### Task 4: Live clock and live UI primitives

**Files:**
- Create: `components/sterimax/LiveClock.tsx`
- Create: `components/sterimax/AgentLive.tsx`

**Interfaces:**
- Consumes: `TICK_MS`, `taskIndexFor`, `secondsSinceLastAction`, `runCountFor` (Task 1); `SteriMaxAgent` (Task 2).
- Produces:
  - `<LiveClock>{children}</LiveClock>` — client provider
  - `useTick(): number`
  - `<StatusDot />`
  - `<LiveTaskLine agent={agent} agentIndex={n} tone="dark" | "light" />`
  - `<LiveMeta agent={agent} tone="dark" | "light" />`

- [ ] **Step 1: Create the clock provider**

Create `components/sterimax/LiveClock.tsx`:

```tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { TICK_MS } from "@/lib/sterimax-live";

const TickContext = createContext(0);

/**
 * One interval drives every live element in the demo. Seven independent timers
 * would visibly drift apart over the length of a meeting.
 *
 * The tick starts at 0 and the interval starts in an effect, so the server render
 * and the first client render are identical — motion begins only after mount.
 */
export function LiveClock({ children }: { children: React.ReactNode }) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), TICK_MS);
    return () => clearInterval(id);
  }, []);

  return <TickContext.Provider value={tick}>{children}</TickContext.Provider>;
}

export function useTick(): number {
  return useContext(TickContext);
}
```

- [ ] **Step 2: Create the live primitives**

Create `components/sterimax/AgentLive.tsx`:

```tsx
"use client";

import type { SteriMaxAgent } from "@/data/sterimax-agents";
import { taskIndexFor, secondsSinceLastAction, runCountFor } from "@/lib/sterimax-live";
import { useTick } from "./LiveClock";

type Tone = "dark" | "light";

export function StatusDot() {
  return (
    <span className="relative flex w-2 h-2 shrink-0">
      <span className="absolute inline-flex w-full h-full rounded-full bg-[#06b6d4] opacity-60 animate-ping" />
      <span className="relative inline-flex w-2 h-2 rounded-full bg-[#06b6d4]" />
    </span>
  );
}

export function LiveTaskLine({
  agent,
  agentIndex,
  tone,
}: {
  agent: SteriMaxAgent;
  agentIndex: number;
  tone: Tone;
}) {
  const tick = useTick();
  const line = agent.liveScript[taskIndexFor(tick, agentIndex, agent.liveScript.length)];

  return (
    <div className="flex items-center gap-2.5 min-h-[1.25rem]">
      <StatusDot />
      <span
        className={`text-[11px] font-semibold leading-tight truncate ${
          tone === "dark" ? "text-slate-300" : "text-[#4a6785]"
        }`}
      >
        {line}
      </span>
    </div>
  );
}

export function LiveMeta({ agent, tone }: { agent: SteriMaxAgent; tone: Tone }) {
  const tick = useTick();
  const seconds = secondsSinceLastAction(tick);
  const runs = runCountFor(tick, agent.baseRuns, agent.runCadence);
  const muted = tone === "dark" ? "text-[#4a6785]" : "text-[#4a6785]";
  const strong = tone === "dark" ? "text-white" : "text-[#0a2540]";

  return (
    <div className={`flex items-center gap-4 text-[10px] font-black uppercase tracking-widest ${muted}`}>
      <span>
        <span className={strong}>{runs.toLocaleString("en-CA")}</span> runs
      </span>
      <span>
        <span className={strong}>{seconds}s</span> ago
      </span>
    </div>
  );
}
```

- [ ] **Step 3: Verify it compiles**

Run: `npm run lint`
Expected: no errors in `components/sterimax/`.

- [ ] **Step 4: Commit**

```bash
git add components/sterimax/LiveClock.tsx components/sterimax/AgentLive.tsx
git commit -m "feat: add shared live clock and agent liveness primitives"
```

---

### Task 5: The roster

**Files:**
- Create: `components/sterimax/RosterCard.tsx`
- Create: `app/admin/sales-training/sterimax/page.tsx`

**Interfaces:**
- Consumes: `orchestrator`, `sterimaxAgents`, `SteriMaxAgent` (Task 2); `LiveClock`, `LiveTaskLine`, `LiveMeta`, `StatusDot` (Task 4).
- Produces: `<RosterCard agent={agent} agentIndex={n} />`, and the route `/admin/sales-training/sterimax`.

- [ ] **Step 1: Create the roster card**

Create `components/sterimax/RosterCard.tsx`:

```tsx
import Link from "next/link";
import type { SteriMaxAgent } from "@/data/sterimax-agents";
import { LiveTaskLine, LiveMeta } from "./AgentLive";

export function RosterCard({ agent, agentIndex }: { agent: SteriMaxAgent; agentIndex: number }) {
  return (
    <Link
      href={`/admin/sales-training/sterimax/${agent.id}`}
      className="group relative rounded-2xl overflow-hidden bg-white/[0.06] border border-white/[0.1] backdrop-blur-sm hover:border-[#0071e3]/40 transition-colors duration-500 flex flex-col"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={agent.image}
          alt={`${agent.name} — ${agent.role}`}
          loading="lazy"
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071e3d] via-[#071e3d]/40 to-transparent" />

        <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0071e3]/90 backdrop-blur text-white text-[10px] font-black uppercase tracking-widest">
          {agent.domain}
        </span>

        {agent.badge ? (
          <span className="absolute top-4 right-4 inline-flex items-center px-3 py-1 rounded-full bg-[#06b6d4] text-[#071e3d] text-[9px] font-black uppercase tracking-widest">
            {agent.badge}
          </span>
        ) : null}

        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-2xl font-black text-white tracking-tight">{agent.name}</h3>
            {agent.agentNo ? (
              <span className="text-[10px] font-black tracking-[0.2em] text-white/40">{agent.agentNo}</span>
            ) : null}
          </div>
          <p className="text-[#06b6d4] text-[10px] font-black uppercase tracking-widest mt-1 leading-tight">
            {agent.role}
          </p>
        </div>
      </div>

      <div className="p-5 flex flex-col gap-4 flex-1">
        <p className="text-slate-400 text-sm font-medium leading-relaxed flex-1">{agent.rosterDesc}</p>
        <div className="pt-4 border-t border-white/[0.08] flex flex-col gap-2.5">
          <LiveTaskLine agent={agent} agentIndex={agentIndex} tone="dark" />
          <LiveMeta agent={agent} tone="dark" />
        </div>
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: Create the roster page**

Create `app/admin/sales-training/sterimax/page.tsx`:

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { orchestrator, sterimaxAgents } from "@/data/sterimax-agents";
import { LiveClock } from "@/components/sterimax/LiveClock";
import { LiveTaskLine, LiveMeta } from "@/components/sterimax/AgentLive";
import { RosterCard } from "@/components/sterimax/RosterCard";

export const metadata: Metadata = {
  title: "SteriMax Agent Team | Audcomp Admin",
  robots: { index: false, follow: false },
};

export default function SteriMaxRosterPage() {
  return (
    <LiveClock>
      <main
        className="min-h-screen"
        style={{ background: "linear-gradient(135deg,#071e3d,#0d2d55,#071e3d)" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#06b6d4] mb-5">
              The SteriMax Agent Team
            </span>
            <h1 className="text-4xl lg:text-6xl font-black text-white tracking-tight mb-4">
              You hire a team, <span className="text-[#06b6d4] italic">not a product.</span>
            </h1>
            <p className="text-[#4a6785] text-base lg:text-lg font-medium">
              Six named specialists. One managed roster, governed by Wilfred.
            </p>
          </div>

          {/* Wilfred — the orchestrator, above the six rather than beside them */}
          <div className="rounded-2xl overflow-hidden bg-white/[0.06] border border-white/[0.1] backdrop-blur-sm grid lg:grid-cols-2 mb-12">
            <div className="relative min-h-[20rem] lg:min-h-[26rem] overflow-hidden">
              <img
                src={orchestrator.image}
                alt={`${orchestrator.name} — ${orchestrator.role}`}
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071e3d] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-[#071e3d]/20 lg:to-[#071e3d]" />
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#06b6d4] mb-5">
                The Orchestrator · Always On
              </span>
              <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tight mb-4">
                One manager for your{" "}
                <span className="text-[#06b6d4] italic">{orchestrator.headlineAccent}</span>
              </h2>
              <p className="text-[#4a6785] text-base font-medium leading-relaxed mb-8">
                {orchestrator.blurb}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                {orchestrator.capabilities.map((c) => (
                  <div key={c.title} className="rounded-2xl bg-white/[0.06] border border-white/[0.1] p-4">
                    <div className="text-lg font-black text-white tracking-tight">{c.title}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2.5 pt-5 border-t border-white/[0.08]">
                <LiveTaskLine agent={orchestrator} agentIndex={0} tone="dark" />
                <LiveMeta agent={orchestrator} tone="dark" />
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sterimaxAgents.map((agent, i) => (
              <RosterCard key={agent.id} agent={agent} agentIndex={i + 1} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/admin/sales-training"
              className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#4a6785] hover:text-[#06b6d4] transition-colors"
            >
              <i className="fas fa-arrow-left text-[10px]" /> All demos
            </Link>
          </div>
        </div>
      </main>
    </LiveClock>
  );
}
```

- [ ] **Step 3: Verify the roster runs**

Run: `npm run dev`
Visit `http://localhost:3000/admin/sales-training/sterimax`.
Expected:
- Wilfred's band and six agent cards render.
- Every card shows a pulsing teal dot and a task line.
- After ~12 seconds the task lines rotate; agents change on the same tick but show
  **different** lines from one another.
- The `s ago` counter climbs 0 → 3 → 6 → 9 and resets.
- The browser console shows **no** hydration warning.

Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add components/sterimax/RosterCard.tsx app/admin/sales-training/sterimax/page.tsx
git commit -m "feat: add SteriMax agent roster with live status"
```

---

### Task 6: Agent detail pages

**Files:**
- Create: `components/sterimax/ActivityStream.tsx`
- Create: `app/admin/sales-training/sterimax/[agentId]/page.tsx`

**Interfaces:**
- Consumes: `getSteriMaxAgent`, `allSteriMaxAgents`, `sterimaxAgents`, `SteriMaxAgent` (Task 2); `LiveClock`, `LiveTaskLine` (Task 4); `taskIndexFor` (Task 1).
- Produces: `<ActivityStream agent={agent} agentIndex={n} tone="dark" | "light" />`, and the route `/admin/sales-training/sterimax/[agentId]`.

- [ ] **Step 1: Create the activity stream**

Create `components/sterimax/ActivityStream.tsx`:

```tsx
"use client";

import type { SteriMaxAgent } from "@/data/sterimax-agents";
import { taskIndexFor, TICKS_PER_TASK, TICK_MS } from "@/lib/sterimax-live";
import { useTick } from "./LiveClock";
import { StatusDot } from "./AgentLive";

const MAX_ENTRIES = 8;

/**
 * Renders the agent's recent actions, newest first. Derived entirely from the tick —
 * we walk backwards from the current task rather than accumulating state, so the list
 * is identical on every render for a given tick.
 */
export function ActivityStream({
  agent,
  agentIndex,
  tone,
}: {
  agent: SteriMaxAgent;
  agentIndex: number;
  tone: "dark" | "light";
}) {
  const tick = useTick();
  const completed = Math.floor(tick / TICKS_PER_TASK);
  const secondsPerTask = (TICKS_PER_TASK * TICK_MS) / 1000;

  const entries = Array.from({ length: MAX_ENTRIES }, (_, back) => {
    const step = completed - back;
    if (step < 0) return null;
    return {
      key: step,
      line: agent.liveScript[taskIndexFor(step * TICKS_PER_TASK, agentIndex, agent.liveScript.length)],
      ago: back === 0 ? "now" : `${back * secondsPerTask}s ago`,
      current: back === 0,
    };
  }).filter((e): e is NonNullable<typeof e> => e !== null);

  const isDark = tone === "dark";

  return (
    <div
      className={`rounded-2xl p-6 ${
        isDark
          ? "bg-white/[0.06] border border-white/[0.1] backdrop-blur-sm"
          : "bg-white border border-[#dde8f5] shadow-sm"
      }`}
    >
      <div className="flex items-center gap-2.5 mb-5">
        <StatusDot />
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#06b6d4]">
          Live activity
        </span>
      </div>
      <ul className="flex flex-col gap-3">
        {entries.map((e) => (
          <li key={e.key} className="flex items-start justify-between gap-4">
            <span
              className={`text-[13px] font-medium leading-snug ${
                e.current
                  ? isDark
                    ? "text-white"
                    : "text-[#0a2540]"
                  : isDark
                    ? "text-slate-400"
                    : "text-[#4a6785]"
              }`}
            >
              {e.line}
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#4a6785] shrink-0 pt-0.5">
              {e.ago}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

- [ ] **Step 2: Create the detail page**

Create `app/admin/sales-training/sterimax/[agentId]/page.tsx`. Note `params` is a Promise in
Next 16 and must be awaited.

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getSteriMaxAgent,
  allSteriMaxAgents,
  sterimaxAgents,
} from "@/data/sterimax-agents";
import { LiveClock } from "@/components/sterimax/LiveClock";
import { LiveTaskLine } from "@/components/sterimax/AgentLive";
import { ActivityStream } from "@/components/sterimax/ActivityStream";

export async function generateStaticParams() {
  return allSteriMaxAgents.map((a) => ({ agentId: a.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ agentId: string }>;
}): Promise<Metadata> {
  const { agentId } = await params;
  const agent = getSteriMaxAgent(agentId);
  if (!agent) return { title: "Agent Not Found | Audcomp Admin", robots: { index: false, follow: false } };
  return {
    title: `${agent.name} — ${agent.role} | SteriMax Demo`,
    description: agent.blurb,
    robots: { index: false, follow: false },
  };
}

export default async function SteriMaxAgentPage({
  params,
}: {
  params: Promise<{ agentId: string }>;
}) {
  const { agentId } = await params;
  const agent = getSteriMaxAgent(agentId);
  if (!agent) notFound();

  const isDark = agent.surface === "dark";
  const agentIndex = allSteriMaxAgents.findIndex((a) => a.id === agent.id);

  // prev/next walk the six specialists in deck order; Wilfred sits outside that cycle.
  const orderIndex = sterimaxAgents.findIndex((a) => a.id === agent.id);
  const prev = orderIndex > 0 ? sterimaxAgents[orderIndex - 1] : null;
  const next =
    orderIndex >= 0 && orderIndex < sterimaxAgents.length - 1 ? sterimaxAgents[orderIndex + 1] : null;

  const surfaceStyle = isDark
    ? { background: "linear-gradient(135deg,#071e3d,#0d2d55,#071e3d)" }
    : { background: "#f0f7ff" };

  const headingColor = isDark ? "text-white" : "text-[#0a2540]";
  const accentColor = isDark ? "text-[#06b6d4]" : "text-[#0071e3]";
  const bodyColor = "text-[#4a6785]";
  const cardClass = isDark
    ? "bg-white/[0.06] border border-white/[0.1] backdrop-blur-sm"
    : "bg-white border border-[#dde8f5] shadow-sm";
  // Written out in full rather than interpolated — Tailwind 4 scans source text, so a
  // class name assembled at runtime (`hover:${accent}`) is never generated.
  const navLinkClass = isDark
    ? "inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#4a6785] hover:text-[#06b6d4] transition-colors"
    : "inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#4a6785] hover:text-[#0071e3] transition-colors";

  // The deck alternates which side the portrait sits on.
  const portraitFirst = isDark;

  return (
    <LiveClock>
      <main className="min-h-screen" style={surfaceStyle}>
        <div className="grid lg:grid-cols-2 min-h-[36rem]">
          <div
            className={`relative min-h-[24rem] lg:min-h-[36rem] overflow-hidden ${
              portraitFirst ? "lg:order-1" : "lg:order-2"
            }`}
          >
            <img
              src={agent.image}
              alt={`${agent.name} — ${agent.role}`}
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
            <div
              className={`absolute inset-0 ${
                isDark
                  ? "bg-gradient-to-t from-[#071e3d] via-transparent to-transparent lg:bg-gradient-to-l lg:from-[#071e3d] lg:via-[#071e3d]/10 lg:to-transparent"
                  : "bg-gradient-to-t from-[#f0f7ff] via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#f0f7ff] lg:via-transparent lg:to-transparent"
              }`}
            />
          </div>

          <div
            className={`p-8 lg:p-16 flex flex-col justify-center ${
              portraitFirst ? "lg:order-2" : "lg:order-1"
            }`}
          >
            <div className="flex items-center justify-between gap-4 mb-5">
              <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${accentColor}`}>
                {agent.name} · {agent.role}
              </span>
              {agent.agentNo ? (
                <span className={`text-[10px] font-black tracking-[0.2em] ${bodyColor}`}>
                  {agent.agentNo}
                </span>
              ) : null}
            </div>

            {agent.badge ? (
              <span className="self-start inline-flex items-center px-3 py-1 rounded-full bg-[#06b6d4] text-[#071e3d] text-[9px] font-black uppercase tracking-widest mb-5">
                {agent.badge}
              </span>
            ) : null}

            <h1 className={`text-4xl lg:text-5xl font-black tracking-tight mb-6 ${headingColor}`}>
              {agent.headline.slice(0, agent.headline.length - agent.headlineAccent.length)}
              <span className={`${accentColor} italic`}>{agent.headlineAccent}</span>
            </h1>

            <p className={`text-base lg:text-lg font-medium leading-relaxed mb-8 ${bodyColor}`}>
              {agent.blurb}
            </p>

            <div className={`rounded-2xl p-4 ${cardClass}`}>
              <LiveTaskLine agent={agent} agentIndex={agentIndex} tone={agent.surface} />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-16">
          <div className="grid sm:grid-cols-2 gap-5 mb-12">
            {agent.capabilities.map((c) => (
              <div key={c.title} className={`rounded-2xl p-6 ${cardClass}`}>
                <h3 className={`text-base font-bold mb-2 ${headingColor}`}>{c.title}</h3>
                <p className={`text-sm font-medium leading-relaxed ${bodyColor}`}>{c.desc}</p>
              </div>
            ))}
          </div>

          <div className="mb-12">
            <span className={`block text-[10px] font-black uppercase tracking-[0.3em] ${bodyColor} mb-3`}>
              Wires into
            </span>
            <p className={`text-base lg:text-lg font-medium ${headingColor}`}>
              {agent.wiresInto.join(" · ")}
            </p>
            <p className={`text-sm font-medium mt-3 ${bodyColor}`}>{agent.guardrail}</p>
          </div>

          <div className="mb-12">
            <ActivityStream agent={agent} agentIndex={agentIndex} tone={agent.surface} />
          </div>

          <div className="flex items-center justify-between gap-4 flex-wrap">
            {prev ? (
              <Link
                href={`/admin/sales-training/sterimax/${prev.id}`}
                className={navLinkClass}
              >
                <i className="fas fa-arrow-left text-[10px]" /> {prev.name}
              </Link>
            ) : (
              <span />
            )}

            <Link
              href="/admin/sales-training/sterimax"
              className={navLinkClass}
            >
              Full roster
            </Link>

            {next ? (
              <Link
                href={`/admin/sales-training/sterimax/${next.id}`}
                className={navLinkClass}
              >
                {next.name} <i className="fas fa-arrow-right text-[10px]" />
              </Link>
            ) : (
              <span />
            )}
          </div>
        </div>
      </main>
    </LiveClock>
  );
}
```

- [ ] **Step 3: Verify every detail page**

Run: `npm run dev`
Visit each of these and confirm the page matches its deck spread — headline with an italic
accent tail, four capability cards, the wires-into line, the guardrail footnote, and a ticking
activity stream:

- `/admin/sales-training/sterimax/wilfred`
- `/admin/sales-training/sterimax/david` (dark, HIGHEST-VALUE FIT badge, `007406`)
- `/admin/sales-training/sterimax/sam` (light, `007402`)
- `/admin/sales-training/sterimax/olivia` (dark, `007404`)
- `/admin/sales-training/sterimax/maya` (light, `007403`)
- `/admin/sales-training/sterimax/quinn` (dark, `007405`)
- `/admin/sales-training/sterimax/claire` (dark, POST-ANDONE badge, no number)

- [ ] **Step 4: Verify the 404 path**

Visit `http://localhost:3000/admin/sales-training/sterimax/nobody`.
Expected: the Next.js 404 page, not a crash.
Stop the dev server.

- [ ] **Step 5: Commit**

```bash
git add components/sterimax/ActivityStream.tsx "app/admin/sales-training/sterimax/[agentId]/page.tsx"
git commit -m "feat: add SteriMax agent detail pages with live activity stream"
```

---

### Task 7: Full verification and spec reconciliation

The spec states the admin layout "does not use `SiteShell`". That is not achievable under a
single root layout; the implemented mechanism is `SiteShell`'s own bypass, extended from
`/claire` to `/admin`. Correct the spec so it matches what was built.

**Files:**
- Modify: `docs/superpowers/specs/2026-07-28-sterimax-demo-design.md`

- [ ] **Step 1: Run the full test suite**

Run: `npm test`
Expected: PASS, all suites.

- [ ] **Step 2: Run the linter**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 3: Run a production build**

Run: `npm run build`
Expected: build succeeds. In the route table, confirm seven prerendered routes under
`/admin/sales-training/sterimax/[agentId]`.

- [ ] **Step 4: Correct the spec**

In `docs/superpowers/specs/2026-07-28-sterimax-demo-design.md`, replace the paragraph beginning
"`app/admin/layout.tsx` renders its own slim shell" with:

```markdown
`app/admin/layout.tsx` renders its own slim shell. The public `Nav` and `Footer` are suppressed
by extending the bypass already present in `components/SiteShell.tsx` — it returns bare children
for `/claire`, and now also for `/admin`. A second root layout is not possible under the app's
single root layout. `app/admin/layout.tsx` exports `metadata.robots = { index: false, follow:
false }`, which Next applies to all nested routes.
```

Also add `baseRuns: number` and `runCadence: number` to the `SteriMaxAgent` type listing in the
spec's Data model section, with the comment `// feed the run counter in lib/sterimax-live.ts`.

- [ ] **Step 5: Final manual pass**

Run: `npm run dev`. Walk the demo exactly as it would be presented:
`/admin/sales-training` → SteriMax card → roster → David → next through to Claire → back to
roster. Confirm no console errors or hydration warnings at any step, and that the public home
page at `/` still renders its nav and footer.

- [ ] **Step 6: Commit**

```bash
git add docs/superpowers/specs/2026-07-28-sterimax-demo-design.md
git commit -m "docs: reconcile SteriMax spec with implemented admin shell mechanism"
```

---

## Self-Review

**Spec coverage:**

| Spec requirement | Task |
|---|---|
| Routes: admin layout, launcher, roster, detail | 3, 5, 6 |
| `SiteShell` bypass / no public chrome | 3 |
| `noindex` on `/admin` | 3 (layout), verified 3 Step 4 |
| Separate dataset, name-collision rationale | 2 |
| All fields incl. `surface`, `badge`, `agentNo` optional | 2 |
| Deck copy verbatim, Claire's capabilities derived | 2 |
| Wilfred exported separately, featured above the six | 2, 5 |
| Single shared clock, `TICK_MS` 3000 | 1, 4 |
| Status dot, rotating task, seconds-since, run counter | 1, 4, 5 |
| Stagger via `agentIndex` | 1 (`taskIndexFor`), 5, 6 |
| Hydration-safe: tick starts at 0, interval in effect | 4 |
| No `Date.now()` / `Math.random()` | Global Constraints; 1 |
| Detail page composition matching deck spreads | 6 |
| Activity stream, capped at eight | 6 |
| prev/next through the roster in deck order | 6 |
| `generateStaticParams`, `notFound()` on unknown id | 6 |
| Design tokens only | Global Constraints |
| Verification: build, lint, dev inspection, 404, noindex | 3, 5, 6, 7 |

No gaps.

**Deviation from spec, resolved in Task 7:** the spec's claim that the admin layout bypasses
`SiteShell` directly is corrected to describe the actual mechanism.

**Additions beyond spec, documented in Task 7:** `baseRuns` and `runCadence` on `SteriMaxAgent`;
`icon` on `SteriMaxAgent` (used for future surfaces, set for every agent); Vitest as a
devDependency.

**Type consistency:** `SteriMaxAgent` is defined once in Task 2 and imported everywhere after.
`taskIndexFor` / `secondsSinceLastAction` / `runCountFor` keep the signatures declared in Task 1
at every call site in Tasks 4 and 6. `agentIndex` means "index within `allSteriMaxAgents`" on
detail pages and "roster position" on the roster — both are only used as a stagger offset, so
the values differ harmlessly, but the roster passes `i + 1` deliberately so Wilfred (index 0)
and the six specialists never collide.

**Placeholder scan:** none present. Every code step contains complete, runnable content.
