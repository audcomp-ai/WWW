# SteriMax Agent Portal Demo — Design

**Date:** 2026-07-28
**Repo:** `aud_new_website`
**Status:** Approved for planning

## Purpose

A live-pitch demo shown to SteriMax Inc. executives. It renders the six named agents from
the *SteriMax AI Agent Recommendations* deck as a running system — a roster where every agent
visibly works, and per-agent detail pages that mirror the deck's agent spreads.

The demo is presented by an Audcomp rep from a laptop in the room. It must never depend on a
network call, an API key, or a model response.

## Non-goals

- The AI OS dashboard (deck p.14 — token spend, `$2,000` cap, cross-agent activity feed) is
  **out of scope** for this spec. It is the intended follow-on, and the data model below does
  not preclude it.
- No changes to `data/agents.ts` or `app/ai-services/agent-studio/`.
- No authentication. `/admin` is unlinked and noindexed, not secured.

## Routes

```
app/admin/layout.tsx                                   admin shell
app/admin/sales-training/page.tsx                      demo launcher
app/admin/sales-training/sterimax/page.tsx             roster
app/admin/sales-training/sterimax/[agentId]/page.tsx   agent detail
```

`app/admin/layout.tsx` renders its own slim shell. The public `Nav` and `Footer` are suppressed
by extending the bypass already present in `components/SiteShell.tsx` — it returns bare children
for `/claire`, and now also for `/admin`. A second root layout is not possible under the app's
single root layout. `app/admin/layout.tsx` exports `metadata.robots = { index: false, follow:
false }`, which Next applies to all nested routes.

The launcher at `/admin/sales-training` lists available demos. Today that is one card
(SteriMax) linking to the roster. It exists so a second prospect is a data addition, not a
route refactor.

`[agentId]` implements `generateStaticParams` over the dataset and calls `notFound()` for an
unknown id.

## Data model

New file `data/sterimax-agents.ts`. Deliberately separate from `data/agents.ts`: three names
collide across the two rosters with different roles (Quinn is a bookkeeper in Agent Studio and
a GPO tender specialist at SteriMax; Sam is an SDR vs. a demand forecaster; Claire is a content
marketer vs. knowledge & integration). One shared shape would force one of the two stories to
be wrong.

```ts
export type Capability = { title: string; desc: string };

export type SteriMaxAgent = {
  id: string;              // 'david' — route segment
  name: string;            // 'David'
  role: string;            // 'Drug Shortage Monitoring & Regulatory Compliance'
  domain: string;          // 'Shortage & Compliance' — roster pill
  agentNo?: string;        // '007406' — printed on deck agent pages; absent for Wilfred and Claire
  image: string;           // '/images/agents/david.png'
  headline: string;        // 'Never miss a reporting window.'
  headlineAccent: string;  // 'a reporting window.' — italic/accent tail of the headline
  blurb: string;           // paragraph under the headline
  rosterDesc: string;      // short line for the roster card
  capabilities: Capability[];  // exactly 4 — the deck's 2x2 grid
  wiresInto: string[];     // 'WIRES INTO' strip
  guardrail: string;       // grey footnote under the strip
  surface: 'dark' | 'light';
  badge?: string;          // 'HIGHEST-VALUE FIT' | 'POST-ANDONE'
  liveScript: string[];    // rotating current-task lines
  baseRuns: number;        // feed the run counter in lib/sterimax-live.ts
  runCadence: number;      // feed the run counter in lib/sterimax-live.ts
};

export const orchestrator: SteriMaxAgent;   // Wilfred
export const sterimaxAgents: SteriMaxAgent[];  // David, Sam, Olivia, Maya, Quinn, Claire — in deck order
```

Wilfred is exported separately, not as a seventh array member. The deck presents him as the
manager of the other six; the roster features him above them rather than beside them.

`surface` reproduces the deck's alternation — David dark, Sam light, Olivia dark, Maya light,
Quinn dark, Claire dark. It drives both the roster card treatment and the detail page.

### Content source

All copy is transcribed verbatim from the deck so the demo matches what SteriMax already
received. Per agent:

| Agent | No. | Role | Surface | Badge |
|-------|-----|------|---------|-------|
| Wilfred | — | Orchestrator | dark | — |
| David | 007406 | Drug Shortage Monitoring & Regulatory Compliance | dark | HIGHEST-VALUE FIT |
| Sam | 007402 | Demand Forecasting & Supply Chain Risk | light | — |
| Olivia | 007404 | Regulatory Submission & Documentation | dark | — |
| Maya | 007403 | Medical Information & Pharmacovigilance | light | — |
| Quinn | 007405 | Tender & GPO Bid Management | dark | — |
| Claire | — | Knowledge & Integration | dark | POST-ANDONE |

Neither Claire nor Wilfred carries an agent number in the deck, so `agentNo` is optional and
omitted for both. Her four capabilities are not spelled out on a dedicated deck spread, so they are
derived from her p.12 summary (unifying product/regulatory/customer data, answering employee
questions, surfacing SOPs, turning M&A friction into institutional memory).

## Liveness

One `components/sterimax/LiveClock.tsx` client component provides a React context holding a
single `tick` counter, incremented by one `setInterval` at 3000ms. Every live element
subscribes to that context. A single timer keeps all seven agents in step; seven independent
timers would drift apart on screen during a long meeting.

Derived per agent from `tick` — no randomness anywhere:

- **Status dot** — pulsing teal, CSS animation only.
- **Current task** — `liveScript[(tick + indexOffset) % liveScript.length]`, where
  `indexOffset` is the agent's position in the array. The offset staggers agents so they don't
  all change line on the same tick.
- **Last action** — a seconds-since counter that climbs and resets when the task line rotates.
- **Run counter** — a per-agent base count plus a fixed per-tick increment.

Detail pages reuse the same clock to drive an activity stream for that one agent, prepending a
new entry each time its task line rotates and capping the list at eight.

### Hydration

The provider initialises `tick` at `0` and starts its interval inside `useEffect`. Server and
first client render therefore produce identical markup from `tick === 0`; motion begins after
mount. No `Date.now()`, no `Math.random()`, no `suppressHydrationWarning`.

## Styling

Governed by `design-system/README.md` and `design-system/tokens.json`. No hex value is
introduced that is not already a token.

- Dark surfaces: `linear-gradient(135deg,#071e3d,#0d2d55,#071e3d)` with teal/blue radial glows.
- Light surfaces: `#f0f7ff` tint, cards `rounded-2xl` with `#dde8f5` hairline and soft shadow.
- Dark cards are glass: `bg-white/[0.06] border border-white/[0.1] backdrop-blur-sm`.
- Eyebrows are teal `#06b6d4`, uppercase, `font-semibold`, `tracking-widest`, `text-[11px]`.
- Headings `font-black tracking-tight`; the accent tail (`headlineAccent`) renders italic in
  `#06b6d4` on dark and `#0071e3` on light, matching the deck.
- Buttons follow the Agent Studio surface convention: `rounded-2xl`, `uppercase font-black
  tracking-widest`.

Deck fidelity comes from layout and full-bleed photography, not from new colour.

## Page composition

**Roster** (`/admin/sales-training/sterimax`) — dark. Deck-derived header ("You hire a team,
not a product"), a featured Wilfred band (deck p.4: Hires / Wires / 24/7 / Reports), then a
six-card grid. Each card carries the portrait, domain pill, agent number, badge if present,
`rosterDesc`, and the live block (status dot, current task, last action, run count). Cards link
to the detail route.

**Detail** (`/admin/sales-training/sterimax/[agentId]`) — reproduces the deck spread. Full-bleed
portrait on one side, content on the other, sides alternating and surface set by `surface`.
Content order: eyebrow (`role` + `agentNo`), headline with accent tail, blurb, 2×2 capability
grid, `WIRES INTO` strip, grey `guardrail` footnote. Below that, the live activity stream and
prev/next navigation through the roster in deck order.

## Testing

The repo has no test runner configured, so verification is by build and inspection:

1. `npm run build` succeeds and `generateStaticParams` emits seven agent routes.
2. `npm run lint` clean.
3. Dev server: roster renders, all seven cards tick and stay in sync, no hydration warning in
   the console, every card navigates to a detail page that matches its deck spread.
4. An unknown `agentId` returns the 404 page.
5. `/admin/sales-training/sterimax` does not appear in the public nav and carries
   `noindex` in its response head.

## Follow-on

The AI OS dashboard becomes `app/admin/sales-training/sterimax/os/page.tsx`, consuming the same
`LiveClock` context and the same dataset, adding only spend figures per agent. Nothing in this
spec needs to change to accommodate it.
