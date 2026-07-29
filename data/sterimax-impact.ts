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
  headline:
    "Six agents carry the regulatory load — your 200 people stay on judgement, not paperwork.",
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
  subtitle:
    "The regulatory clock starts the moment the surge appears. Here is the same event, twice.",
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
