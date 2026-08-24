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
    { title: "Wires", desc: "Into your stack: ERP, quality, and regulatory systems, not a parallel tool." },
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
      "David watches the shortage landscape and your inventory continuously, and drafts the mandatory filings before the clock runs out, so FDR compliance stops depending on someone remembering.",
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
      "Sam turns shortage response into shortage prevention, modelling demand and supply risk across every SKU so planning decisions are made weeks earlier.",
    rosterDesc: "Predicts shortages across 100+ SKUs",
    capabilities: [
      { title: "Forecasts demand", desc: "Sales history, seasonality, and channel mix modelled per SKU across the full portfolio." },
      { title: "Reads the market", desc: "Competitor shortage signals and supplier lead times folded into the risk picture." },
      { title: "Optimizes safety stock", desc: "Recommends target levels by SKU rather than a single blanket rule." },
      { title: "Cues importation", desc: "Surfaces candidates for exceptional-importation planning before supply is critical." },
    ],
    wiresInto: ["ERP & sales history", "supplier lead times", "Drug Shortages Canada", "S&OP reporting"],
    guardrail: "Proactive, not reactive. The forecast refreshes daily and escalates only what changed.",
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
      { title: "Surfaces SOPs", desc: "The current, approved procedure served in context, not the copy on someone's desktop." },
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
