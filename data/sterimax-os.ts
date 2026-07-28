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
