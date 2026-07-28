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
