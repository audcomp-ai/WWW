# SteriMax AI OS — Dashboard & Task Runs — Design

**Date:** 2026-07-28
**Repo:** `aud_new_website`
**Status:** Approved for planning
**Builds on:** `2026-07-28-sterimax-demo-design.md` (the roster and agent detail pages, already shipped)

## Purpose

The shipped roster shows *who* the agents are. This adds the dashboard that shows the roster
*running*, and lets the presenter click a single button to watch one agent work a task end to
end and produce a reviewable artifact.

Two things happen on this surface:

1. **The AI OS dashboard** — deck p.14 rebuilt: agents live, tasks, hours saved, token spend
   against a hard cap, and a live activity feed.
2. **Task runs** — presenter clicks *Run task* on any agent; that agent's work plays out as a
   sequence of completing steps, ending in the artifact it produced, marked awaiting human
   review.

## Non-goals

- No changes to the shipped roster or agent detail pages beyond adding a link to the dashboard.
- No authentication, no API calls, no model invocation. Everything is scripted.
- No pause/scrub/speed controls. A run starts, plays, and can be reset. Nothing more.

## Route and shell

```
app/admin/sales-training/sterimax/os/page.tsx
```

The shell follows `app/claire/page.tsx` — the established command-centre pattern in this repo:
a header band, a horizontal tab strip with an active underline, and a content area. Tabs are
client state (`useState`), not routes, so switching is instant during a pitch.

Tabs, matching the deck's nav exactly:

| Tab | Contents |
|-----|----------|
| Overview | Stat tiles, spend panel, spend-by-agent bars, live activity feed |
| Agents | Agent rows with status and the *Run task* button; the run panel opens here |
| Runs | Completed runs this session, plus the scripted run history |
| Spend | Spend-by-agent detail and the cap explanation |
| Audit Log | Every action timestamped, actor, human-review state |

The header carries `AUDCOMP AI OS`, a `CANADA CENTRAL` region pill, and `SteriMax Inc.` — as
on the deck.

The roster page gains a link to the dashboard, and the dashboard links back. The launcher at
`/admin/sales-training` lists both entry points for the SteriMax demo.

## Dashboard data

New file `data/sterimax-os.ts`. Figures are transcribed from deck p.14 so the demo matches
what SteriMax received.

```ts
export type SpendRow = { agentId: string; label: string; amount: number };
export type ActivityEntry = { agentId: string; title: string; detail: string; ago: string };

export const osStats: { agentsLive: string; tasks30d: number; hoursSaved: number };
// { agentsLive: "6 / 6", tasks30d: 4812, hoursSaved: 311 }

export const osSpend: {
  monthToDate: number;   // 1306
  cap: number;           // 2000
  projected: number;     // 1865
  percentUsed: number;   // 65
  dayOfMonth: number;    // 21
  currency: "CAD";
  byAgent: SpendRow[];
};
```

`byAgent`, in deck order: David · Compliance `412`, Sam · Forecasting `318`, Quinn · Tenders &
GPO `226`, Maya · Med Info & PV `164`, Olivia · Submissions `112`, Claire · Knowledge `74`.
These sum to `1,306`, matching `monthToDate` — a test asserts this so the panel can never
contradict itself.

The activity feed reuses the deck's four entries (David's 250% surge on SKU 40118, Sam's
30-day supply-risk refresh, Olivia's submission package awaiting RA sign-off, Wilfred's routing
rebalance) and is driven by the existing `LiveClock` so it ticks rather than sits.

## Task runs

New file `data/sterimax-runs.ts`, keyed to the agent ids already in `data/sterimax-agents.ts`.

```ts
export type RunStep = { label: string; detail: string };

export type ArtifactField = { label: string; value: string };

export type RunArtifact = {
  kind: "document" | "table" | "record";
  title: string;
  subtitle: string;
  fields: ArtifactField[];        // used by "document" and "record"
  columns?: string[];             // used by "table"
  rows?: string[][];              // used by "table"
  reviewState: string;            // e.g. "Awaiting RA sign-off"
  auditNote: string;
};

export type TaskRun = {
  agentId: string;
  taskName: string;
  steps: RunStep[];               // 5–7 steps
  artifact: RunArtifact;
};

export const taskRuns: TaskRun[];              // one per agent, all six specialists
export function getTaskRun(agentId: string): TaskRun | undefined;
```

One run per specialist. Wilfred has no run — he orchestrates rather than produces:

| Agent | Task | Artifact |
|---|---|---|
| David | Shortage detection & FDR filing | `document` — drafted shortage report |
| Sam | 30-day supply risk refresh | `table` — ranked SKU risk |
| Olivia | Submission package assembly | `document` — package checklist with gaps flagged |
| Maya | Adverse event intake | `record` — structured AE record with MedDRA coding |
| Quinn | Tender response assembly | `document` — bid checklist with dates |
| Claire | Employee knowledge query | `record` — cited answer with source SOP |

Every artifact carries a `reviewState` and an `auditNote`. The governance claim — human in the
loop, everything logged — is visible on the artifact itself rather than asserted in a footnote.

## Run mechanics

A `useTaskRun(run: TaskRun | undefined)` hook in `lib/use-task-run.ts` owns one run:

```ts
type RunPhase = "idle" | "running" | "complete";

function useTaskRun(run: TaskRun | undefined): {
  phase: RunPhase;
  currentStep: number;     // count of completed steps
  start: () => void;
  reset: () => void;
};
```

`start()` advances `currentStep` on a 1100ms interval until every step is done, then sets
`phase` to `"complete"`, revealing the artifact. `reset()` returns to `idle`. The interval is
cleared on unmount and on reset.

This is deliberately separate from `LiveClock`. The clock is ambient and always moving; a run
is presenter-triggered, has a beginning and an end, and must not start until clicked.

Steps render in three states: pending (dim, hollow marker), active (teal, spinner), complete
(check, full contrast). Only one run is active at a time — starting a second resets the first,
so the screen never shows two agents mid-work.

## Testing

`lib/use-task-run.ts` has no test — it is React state over a timer, and testing it would need a
DOM environment this repo does not have. The pure, checkable logic lives in the data, and that
is tested:

- `data/sterimax-os.test.ts` — `byAgent` sums to `monthToDate`; `monthToDate` is below `cap`;
  `percentUsed` matches `monthToDate / cap` to the nearest point; every `agentId` in `byAgent`
  resolves against `data/sterimax-agents.ts`.
- `data/sterimax-runs.test.ts` — one run per specialist and none for Wilfred; every `agentId`
  resolves; every run has between five and seven steps; `table` artifacts have `columns` and
  `rows` with matching widths; `document` and `record` artifacts have at least three fields;
  every artifact has a non-empty `reviewState` and `auditNote`.

Beyond that: `npm run build` succeeds with `/os` prerendered, `npm run lint` clean on new
files, and a manual pass running all six agents in the browser.

## Styling

Unchanged rules from the roster spec — `design-system/tokens.json` only. The dashboard sits on
the darker command-centre background `#040e1a` used by `app/claire/page.tsx`, with `#071e3d`
panels, teal `#06b6d4` accents and active tab underline, and `#0071e3` for the primary action.
Spend bars use `#0071e3` for the leaders and `#06b6d4` for the tail, as the deck does. The cap
bar turns `#ef4444` only if spend exceeds cap — a state the demo data never reaches, but the
component handles it rather than rendering a broken bar.
