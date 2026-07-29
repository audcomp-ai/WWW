# SteriMax AI OS — Business-Case Overview — Design

**Date:** 2026-07-28
**Repo:** `aud_new_website`
**Status:** Approved for planning
**Builds on:** `2026-07-28-sterimax-ai-os-design.md` (dashboard shell and task runs, already shipped)
**Reference:** `https://aiaudit.audcomp.ai/demo/florist` — the Petal & Stem demo, whose structure this mirrors

## Purpose

The shipped Overview tab is an operations console. The florist demo is a **business case**: it
answers "what does this save me, and what would it cost me to do it with people?" before it
shows any machinery. This rebuilds the Overview tab to that shape for SteriMax.

The Agents, Runs, Spend and Audit Log tabs — including *Run task* — are unchanged.

## Non-goals

- No change to the roster, agent detail pages, or the four other tabs.
- No new routes.
- No API calls. Everything stays scripted and offline.

## Section order

Mirroring the reference, top to bottom:

1. **Hero** — client identity, `Pharmaceutical Manufacturing · Live Demo`, countdown, **Start Demo**.
2. **The pitch** — headline, then Today / After-deploy columns.
3. **Live impact tiles** — time saved today (climbs once the demo starts), FTEs replaced, annual cost saved.
4. **Worked example** — one regulatory event costed before and after, with a presenter cue.
5. **Command center** — status tiles and four control buttons.
6. **Active agents** — the six specialists with weekly workload and hours saved.
7. **Standing by** — four idle/queued specialists.
8. **Impact in human hours** — hours/week, FTE, annual hours, annual cost.
9. **Live operating cost** — tokens, runtime, monthly cost, percentage saved versus a human team.
10. **Live activity feed** — the existing feed, retained.

## The central design decision: derive, never type

The reference page states figures that must agree with one another — hours, FTE, annual hours,
annual cost, percentage saved. Typing them independently invites drift, and an executive will
check the arithmetic in their head.

Therefore **two inputs only**:

- each agent's `hoursPerWeek` saved, in `data/sterimax-impact.ts`
- `BLENDED_RATE`, a single exported constant

Everything else is computed in `lib/sterimax-roi.ts` and tested. Changing the rate re-derives
the entire page.

```ts
export const BLENDED_RATE = 85;        // CAD per hour, blended RA / QA / supply chain
export const HOURS_PER_FTE_WEEK = 40;
export const WORKDAYS_PER_WEEK = 5;

export function totalHoursPerWeek(loads: AgentLoad[]): number;
export function fteReplaced(loads: AgentLoad[]): number;          // hours / 40
export function annualHoursSaved(loads: AgentLoad[]): number;     // hours * 52
export function annualCostSaved(loads: AgentLoad[]): number;      // annual hours * rate
export function monthlyHumanCost(loads: AgentLoad[]): number;     // annual cost / 12
export function percentSavedVsHuman(loads: AgentLoad[], agentMonthlyCost: number): number;
export function secondsSavedPerWorkday(loads: AgentLoad[]): number;
export function formatHoursMinutesSeconds(totalSeconds: number): string;  // "14h 54m 00s"
```

`percentSavedVsHuman` takes the agent's monthly cost as an argument rather than importing it,
so the ROI module stays pure and the Overview passes `osSpend.monthToDate`. This deliberately
ties the deck's `$1,306` to the savings claim.

### Resulting figures

Live agents (`hoursPerWeek`): David 11, Sam 9, Olivia 14, Maya 12, Quinn 8, Claire 6 — 60.
Standing by: Lot Release & CoA 5, Complaint Intake 4, Health Canada Correspondence 3,
Cold-Chain Excursion 2.5 — 14.5.

| Figure | Value | Derivation |
|---|---|---|
| Hours per week saved | 74.5 | sum of all ten |
| Full-time roles | 1.86 FTE | 74.5 / 40 |
| Annual hours saved | 3,874 | 74.5 × 52 |
| Annual cost saved | $329,290 | 3,874 × 85 |
| Monthly human cost | $27,441 | 329,290 / 12 |
| Agent monthly cost | $1,306 | `osSpend.monthToDate` |
| Saved vs human team | 95% | 1 − 1,306 / 27,441 |
| Time saved per workday | 14h 54m 00s | (74.5 / 5) × 3600 s |

## Content

### Hero

`SteriMax Inc.` · `Sterile Injectables · Oakville, Ontario` · tag
`Pharmaceutical Manufacturing · Live Demo`. Countdown reads
"FDR shortage-reporting provisions in force in **{n} days**".

`daysUntilInForce` is a single named constant with a comment stating it is set by hand. The deck
says "2026–2027" without naming a date, so this is not derived from a real published date and
must not pretend to be. It is also the only way to avoid reading the clock, which the
determinism rule forbids.

### The pitch

Headline: "Six agents carry the regulatory load — your 200 people stay on judgement, not
paperwork."

Sub: "SteriMax goes from FDR compliance that depends on someone remembering, to compliance that
is simply handled."

**Today (without agents)** — four lines:
- One person remembers the reporting window — and they're on vacation next week.
- Shortage reports get drafted from scratch, on deadline, by the people least able to spare the time.
- 100+ SKUs are watched by exception, which means by whoever happens to notice.
- Submission prep eats days that speed to market cannot afford.

**After deploy (with agents)** — four lines:
- Every SKU is watched continuously; the 250% trigger fires the day it appears.
- Filings arrive pre-populated and queued on deadline, needing review rather than authorship.
- RA and QA spend their hours on judgement calls, not document assembly.
- Every action is audit-logged and human-signed before anything is submitted.

### Worked example

"A 250% demand surge lands on SKU 40118" — **30 hrs → 3m 51s**.

| Step | Without | With | Note |
|---|---|---|---|
| Detect the surge | 8 hrs | 2s | Someone notices the order pattern on a weekly review — or doesn't. |
| Confirm against inventory | 4 hrs | 6s | Cross-check ERP positions and days of cover for the SKU. |
| Locate the prevention plan | 2 hrs | 3s | Find the current shortage-prevention plan and safety-stock target. |
| Draft the filing | 16 hrs | 3m 40s | Populate every mandatory field and queue it for RA sign-off. |

The headline totals are computed from the step rows, and a test asserts the two agree — the same
drift risk as the ROI figures.

Presenter cue, styled as the reference's sales guidance: "Show the prospect: *This is what
happens between the surge appearing in your order book and the report being ready for your RA
lead to sign.*"

### Command center

Status tiles: Active agents `6` / "of 10 · 163 runs today"; SKUs monitored `104` / "3 above
escalation threshold"; Filings this quarter `14` / "4 awaiting sign-off"; Deadlines tracked `28`
/ "next in 4 days".

Controls, matching the reference's four: **Pause All Agents** ("Halt every agent immediately"),
**Push New Task** ("Run a one-off across all agents"), **Add Agent** ("Spin up a new
specialist"), **Escalate to Human** ("Route the next decision to a person").

These are presentation affordances, not wired actions. Each is a button that visibly
acknowledges the click by toggling a short confirmation label for a few seconds. It must never
look broken, and it must never imply it did something it did not.

### Standing by

Four agents, in a block clearly headed "Standing By · Idle & Queued" with the note "spin up on
trigger — no idle cost":

| Agent | Status | Workload | Saves |
|---|---|---|---|
| Lot Release & CoA Review | Idle | 22 lots reviewed / wk | 5h/wk |
| Complaint Intake & Triage | Idle | 31 complaints / wk | 4h/wk |
| Health Canada Correspondence | Idle | 9 letters / mo | 3h/wk |
| Cold-Chain Excursion Review | Queued | 14 excursions / mo | 2.5h/wk |

**These four are invented.** They are credible functions for a sterile injectables manufacturer
but appear nowhere in the deck SteriMax received. They live in one array so they can be deleted
in one edit, and the source file says so in a comment.

### Live operating cost

Tokens/mo `18.4 M` ("18,412,640 total"); Active runtime `54.2 hrs` ("this month"); Cost/month
`$1,306` ("163 tasks today"); vs human team `95% saved` ("$27,441/mo human cost"). The last two
are derived, not typed.

## Start Demo

`LiveClock` gains an optional `autoStart` prop, default `true`, so the roster and agent detail
pages are unaffected. The OS page passes `autoStart={false}` and the header's **Start Demo**
button calls `start()` from the clock context.

```ts
type ClockValue = { tick: number; running: boolean; start: () => void };
export function useClock(): ClockValue;
export function useTick(): number;   // retained; existing call sites keep working
```

Before Start Demo the page is static at `tick === 0` — every figure shows its base value. After
it, the tick advances and the time-saved counter and task count climb. The button then reads
"Demo running" and is disabled rather than disappearing, so the presenter can see the state.

## Testing

- `lib/sterimax-roi.test.ts` — every derivation against hand-computed expectations; FTE, annual
  hours and annual cost consistent with one another; `percentSavedVsHuman` bounded 0–100 and
  correct for the known inputs; `formatHoursMinutesSeconds` zero-pads.
- `data/sterimax-impact.test.ts` — every live agent id resolves against `data/sterimax-agents.ts`;
  standing-by agents have no id collision with real agents; all `hoursPerWeek` positive; worked
  example step totals equal the stated headline totals; the four control buttons each have a
  label and description.

Plus `npm run build`, `npm run lint` clean on new files, and a manual pass.

## Styling

Unchanged token rules. The Overview keeps the `#040e1a` command-centre background with
`#071e3d` panels. The before/after columns use a red-tinted left (`#ef4444` at low opacity,
borders only — never as a fill) and a teal-tinted right, which is the one place `--destructive`
is legitimately used to mean "the status quo", not an error.
