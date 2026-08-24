// AI OS dashboard figures, transcribed from page 14 of the SteriMax recommendations deck.
// `byAgent` must sum to `monthToDate` — a test enforces it, so the panel can never
// contradict itself on screen.

export type SpendRow = { agentId: string; label: string; amount: number };

/** `agoSeconds` is a base age; the feed adds elapsed demo time so entries visibly age. */
export type ActivityEntry = { agentId: string; title: string; detail: string; agoSeconds: number };

/** Entries that stream in once the demo starts, at `appearsAt` seconds after Start Demo. */
export type IncomingEntry = ActivityEntry & { appearsAt: number };
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
    agoSeconds: 240,
  },
  {
    agentId: "sam",
    title: "Sam refreshed 30-day supply risk",
    detail: "104 SKUs scored · 3 escalated to planning",
    agoSeconds: 1320,
  },
  {
    agentId: "olivia",
    title: "Olivia assembled a submission package",
    detail: "Awaiting RA sign-off · human-in-the-loop",
    agoSeconds: 3600,
  },
  {
    agentId: "wilfred",
    title: "Wilfred rebalanced model routing",
    detail: "Cut projected spend 14%",
    agoSeconds: 7200,
  },
];

/**
 * Streamed in after Start Demo, newest first, so the feed visibly fills during the pitch.
 * `appearsAt` is seconds after the presenter starts the demo.
 */
export const osIncomingActivity: IncomingEntry[] = [
  { appearsAt: 3, agentId: "maya", title: "Maya triaged 6 inbound queries", detail: "2 routed to medical review · 4 answered from label", agoSeconds: 0 },
  { appearsAt: 9, agentId: "quinn", title: "Quinn matched a new tender posting", detail: "Provincial injectables bid 2026-114 · checklist built", agoSeconds: 0 },
  { appearsAt: 16, agentId: "claire", title: "Claire answered a deviation question", detail: "SOP-QA-014 rev 6 cited · Andone conflict surfaced", agoSeconds: 0 },
  { appearsAt: 24, agentId: "david", title: "David checked Drug Shortages Canada", detail: "41 new notices ingested · 104 SKUs cross-referenced", agoSeconds: 0 },
  { appearsAt: 33, agentId: "sam", title: "Sam detected supplier lead-time drift", detail: "3 suppliers beyond contracted lead time · risk rescored", agoSeconds: 0 },
  { appearsAt: 43, agentId: "olivia", title: "Olivia flagged 2 stale references", detail: "Module 2.3 and 3.2.S.4 · surfaced before RA review", agoSeconds: 0 },
  { appearsAt: 54, agentId: "maya", title: "Maya coded an adverse event to MedDRA", detail: "Case 2026-0419 · escalated to qualified reviewer", agoSeconds: 0 },
  { appearsAt: 66, agentId: "wilfred", title: "Wilfred rebalanced model routing", detail: "Low-stakes work moved to cheaper models · spend −9%", agoSeconds: 0 },
  { appearsAt: 79, agentId: "david", title: "David queued a discontinuation report", detail: "SKU 40602 · deadline in 11 days · awaiting RA sign-off", agoSeconds: 0 },
  { appearsAt: 93, agentId: "quinn", title: "Quinn tracked a clarification deadline", detail: "Bid 2026-114 · 6 days remaining · calendar updated", agoSeconds: 0 },
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
    review: "Answer cited, no review required",
  },
  {
    time: "15:12",
    agentId: "wilfred",
    action: "Rebalanced model routing",
    detail: "Projected monthly spend reduced 14%",
    review: "Automatic, within policy",
  },
  {
    time: "14:35",
    agentId: "david",
    action: "Refreshed mitigation plans",
    detail: "7 products updated following formulation change",
    review: "Awaiting RA sign-off",
  },
];
