// What each live agent is working on, moment to moment, while the demo runs.
// Durations are short so a presenter sees several tasks complete inside a minute;
// startOffset staggers the agents so the progress bars never move in lockstep.

import type { AgentCycle } from "@/lib/sterimax-inflight";

export const agentCycles: AgentCycle[] = [
  {
    agentId: "david",
    name: "David",
    startOffset: 0,
    tasks: [
      { label: "Scanning Drug Shortages Canada", durationSeconds: 9 },
      { label: "Cross-referencing ERP inventory · 104 SKUs", durationSeconds: 12 },
      { label: "Evaluating surge thresholds", durationSeconds: 7 },
      { label: "Drafting shortage report · SKU 40118", durationSeconds: 14 },
      { label: "Queuing for RA sign-off", durationSeconds: 6 },
    ],
  },
  {
    agentId: "sam",
    name: "Sam",
    startOffset: 5,
    tasks: [
      { label: "Loading 36 months of sales history", durationSeconds: 10 },
      { label: "Applying seasonality per SKU", durationSeconds: 8 },
      { label: "Folding in supplier lead times", durationSeconds: 11 },
      { label: "Scoring 30-day supply risk", durationSeconds: 13 },
      { label: "Escalating 3 SKUs to planning", durationSeconds: 6 },
    ],
  },
  {
    agentId: "olivia",
    name: "Olivia",
    startOffset: 11,
    tasks: [
      { label: "Pulling current GMP document versions", durationSeconds: 13 },
      { label: "Pre-populating eCTD Module 1", durationSeconds: 15 },
      { label: "Validating against GUI-0148", durationSeconds: 9 },
      { label: "Flagging stale cross-references", durationSeconds: 7 },
      { label: "Compiling package for RA review", durationSeconds: 10 },
    ],
  },
  {
    agentId: "maya",
    name: "Maya",
    startOffset: 3,
    tasks: [
      { label: "Triaging inbound HCP queries", durationSeconds: 8 },
      { label: "Structuring adverse-event intake", durationSeconds: 11 },
      { label: "Applying MedDRA coding", durationSeconds: 9 },
      { label: "Assessing seriousness criteria", durationSeconds: 7 },
      { label: "Routing to qualified reviewer", durationSeconds: 5 },
    ],
  },
  {
    agentId: "quinn",
    name: "Quinn",
    startOffset: 17,
    tasks: [
      { label: "Watching GPO and provincial portals", durationSeconds: 12 },
      { label: "Extracting bid requirements", durationSeconds: 10 },
      { label: "Building the document checklist", durationSeconds: 8 },
      { label: "Drafting from prior winning bid", durationSeconds: 16 },
      { label: "Updating the deadline calendar", durationSeconds: 6 },
    ],
  },
  {
    agentId: "claire",
    name: "Claire",
    startOffset: 8,
    tasks: [
      { label: "Indexing the updated SOP library", durationSeconds: 11 },
      { label: "Reconciling product master data", durationSeconds: 14 },
      { label: "Answering employee questions", durationSeconds: 7 },
      { label: "Citing source documents", durationSeconds: 6 },
      { label: "Mapping Andone exceptions", durationSeconds: 9 },
    ],
  },
];
