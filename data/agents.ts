// Shared agent dataset — used by the Agent Studio roster and the per-agent detail pages.

export type Capability = { title: string; desc: string };
export type TimeRow = { task: string; human: string; agent: string; saved: string };
export type Stat = { value: string; label: string };

export type Agent = {
  id: string;
  name: string;
  role: string;        // short role used on the roster cards
  domain: string;      // small badge / pill label on the roster
  icon: string;        // FontAwesome class
  image: string;
  video?: string;      // optional background video for the detail-page hero
  desc: string;        // roster blurb
  tier: 'senior' | 'junior' | 'realtor';
  // Rich detail (seniors only)
  title?: string;      // full title shown on the detail hero
  tagline?: string;
  about?: string[];
  capabilities?: Capability[];
  timeTable?: TimeRow[];
  stats?: Stat[];
};

export const workforce: Agent[] = [
  {
    id: 'quinn', name: 'Quinn', role: 'AI Bookkeeper', domain: 'Finance', icon: 'fa-file-invoice-dollar', image: '/images/agents/quinn.png', tier: 'senior',
    desc: 'Reconciliations, payroll runs, and tax filings with a clean monthly close. Every cycle, without you chasing it.',
    title: 'QuickBooks Bookkeeper',
    tagline: 'Reconciles bank feeds, categorizes expenses, matches invoices to payments, and ensures your books are flawlessly closed every single week.',
    stats: [{ value: '$1,200/mo', label: 'vs $65K/yr human' }, { value: '48 hrs', label: 'to start' }, { value: 'Zero', label: 'reconciliation errors' }],
    about: [
      'Quinn natively connects to your QuickBooks Online account and treats your chart of accounts like gospel. Instead of waiting until month-end, Quinn reconciles transactions daily, identifying missing receipts and flagging anomalies immediately.',
      'With read-write API access governed by strict rules, Quinn never deletes historical data, acting as a tireless co-pilot to your external CPA.',
    ],
    capabilities: [
      { title: 'Bank reconciliation', desc: 'Automatically matches thousands of line items across all your connected accounts.' },
      { title: 'Expense categorization', desc: 'Learns your specific vendor rules and properly tags every outgoing dollar.' },
      { title: 'Accounts receivable', desc: 'Sends friendly automated follow-ups for outstanding invoices.' },
      { title: 'Receipt matching', desc: 'Pairs Dext/Hubdoc uploads directly to the corresponding bank transaction.' },
      { title: 'Weekly reporting', desc: 'Sends a clean summary of cash flow and outstanding balances every Friday.' },
      { title: 'Anomaly detection', desc: 'Flags duplicate charges or unusual vendor spikes for your review.' },
      { title: 'Accounts payable', desc: 'Captures invoices from email and uploads, codes them to your chart of accounts, and schedules payment within terms.' },
      { title: 'Payroll', desc: 'Runs CRA-compliant pay cycles, T4/T4A prep, and source deduction remittances on schedule.' },
      { title: 'GST/HST & PST filings', desc: 'Calculates, prepares, and submits sales tax returns federally and provincially. Never miss a deadline.' },
      { title: 'Monthly close', desc: 'Reconciliations, accruals, and depreciation entries, done by the first Friday of every month.' },
      { title: 'Audit trail', desc: 'Every entry logged in QuickBooks with reasoning and source document. Exportable, immutable, audit-ready.' },
    ],
    timeTable: [
      { task: 'Month-end close', human: '16h', agent: '15 min', saved: '15.75h' },
      { task: 'Daily transaction coding', human: '45 min', agent: '2 min', saved: '43 min' },
      { task: 'Vendor statement matching', human: '2h', agent: '5 min', saved: '1.9h' },
      { task: 'Chasing unpaid invoices', human: '1.5h', agent: '0 min (auto)', saved: '1.5h' },
    ],
  },
  {
    id: 'sam', name: 'Sam', role: 'AI SDR', domain: 'Sales', icon: 'fa-bullhorn', image: '/images/agents/sam.png', tier: 'senior',
    desc: 'Books meetings on autopilot, qualifies inbound leads, and runs personalized outreach across email, LinkedIn, and your CRM.',
    title: 'Sales Development Rep',
    tagline: "Sources high-fit prospects, runs personalized outreach at scale, and books qualified meetings on your reps' calendars, without the burnout.",
    stats: [{ value: '$1,997/mo', label: 'vs $85K/yr human' }, { value: '48 hrs', label: 'to start' }, { value: '500+ leads/wk', label: 'contacted' }],
    about: [
      'Sam handles the top of the funnel end-to-end. He sources prospects from Apollo, Clay, and LinkedIn Sales Navigator, enriches them, writes personalized first-touch emails, runs multi-step follow-up cadences, and books meetings, then logs everything in HubSpot, Pipedrive, or Salesforce so your AEs walk into qualified calls.',
      'Sam respects unsubscribes, pauses on out-of-office, never double-touches the same person, and stays inside CASL and CAN-SPAM compliance automatically.',
    ],
    capabilities: [
      { title: 'ICP sourcing', desc: '100–500 net-new prospects per week from Apollo, Clay, LinkedIn.' },
      { title: 'Lead enrichment', desc: 'Email, phone, LinkedIn, role, tech stack, company funding.' },
      { title: 'Personalized outreach', desc: 'First-touch emails referencing trigger events.' },
      { title: 'Follow-up cadences', desc: '6–8 step sequences with smart cadencing.' },
      { title: 'Meeting booking', desc: 'Calendly, Cal.com, Chili Piper integration.' },
      { title: 'CRM updates', desc: 'HubSpot, Pipedrive, Salesforce, Close.' },
      { title: 'Account research', desc: 'Pre-call briefs for high-value prospects.' },
      { title: 'Compliance', desc: 'CASL, CAN-SPAM, GDPR honored automatically.' },
    ],
    timeTable: [
      { task: 'Lead research + enrich (per prospect)', human: '8 min', agent: '<1 min', saved: '7 min' },
      { task: 'Personalized first-touch email', human: '6 min', agent: '<1 min', saved: '5 min' },
      { task: 'Follow-up sequence (6 steps)', human: '15 min', agent: '<1 min', saved: '14 min' },
      { task: 'CRM updates per lead', human: '3 min', agent: '0 min', saved: '3 min' },
      { task: 'Pre-meeting account brief', human: '20 min', agent: '2 min', saved: '18 min' },
    ],
  },
  {
    id: 'claire', name: 'Claire', role: 'AI Content Marketer', domain: 'Marketing', icon: 'fa-pen-nib', image: '/images/agents/claire.png', tier: 'senior',
    desc: 'Writes and ranks your blog, repurposes long-form into social, runs newsletters, and drives inbound. No content team required.',
    title: 'Content Marketing Specialist',
    tagline: 'Writes ranking SEO blog posts, opens-getting newsletters, and landing-page copy that converts, in your brand voice.',
    stats: [{ value: '$1,497/mo', label: 'vs $94K/yr human' }, { value: '48 hrs', label: 'to start' }, { value: '30+ hrs/wk', label: 'typical time saved' }],
    about: [
      'Claire is a senior-level content marketer trained on B2B SaaS, MSP, legal, healthcare, and financial verticals. She studies your existing content to mirror your brand voice, runs keyword research before writing, and produces drafts that read like a human wrote them, because the structure, tone, and examples are calibrated to your audience.',
      'Connect Google Search Console, Ahrefs, and your CMS, and Claire ships a full editorial calendar, briefs, and finished posts. Every piece is reviewed against an internal eval suite for hallucinations, brand voice match, and SEO compliance before it lands in your draft folder.',
    ],
    capabilities: [
      { title: 'SEO blog posts', desc: '1,500–2,500 word, keyword-researched, in your voice with internal links and meta tags.' },
      { title: 'Newsletters', desc: 'Weekly or biweekly, with curated highlights and original commentary.' },
      { title: 'LinkedIn threads', desc: 'Multi-post threads optimized for the LinkedIn algorithm.' },
      { title: 'Landing-page copy', desc: 'Hero, features, social proof, FAQ, CTA. All in one brief.' },
      { title: 'Content briefs', desc: 'For human writers when you need them, with H-tags and source links.' },
      { title: 'Repurposing', desc: 'Turn one blog into 5 social posts, a newsletter, and a video script.' },
      { title: 'Keyword research', desc: 'Clusters, intent mapping, and gap analysis from GSC and Ahrefs.' },
      { title: 'Performance reports', desc: 'Weekly dashboards on rankings, traffic, and conversions.' },
    ],
    timeTable: [
      { task: 'SEO blog post (1,800 words)', human: '6h', agent: '25 min', saved: '5h 35m' },
      { task: 'Weekly newsletter', human: '3h', agent: '12 min', saved: '2h 48m' },
      { task: 'LinkedIn thread', human: '1h', agent: '8 min', saved: '52 min' },
      { task: 'Landing-page copy', human: '4h', agent: '20 min', saved: '3h 40m' },
      { task: 'Repurpose 1 → 5 formats', human: '2.5h', agent: '10 min', saved: '2h 20m' },
    ],
  },
  {
    id: 'olivia', name: 'Olivia', role: 'AI Executive Assistant', domain: 'Operations', icon: 'fa-calendar-check', image: '/images/agents/olivia.png', tier: 'senior',
    desc: 'Triages your inbox, manages complex calendars, books travel, and preps meeting briefs, so you walk in already prepared.',
    title: 'Executive Assistant',
    tagline: 'Triages your inbox, books your meetings, drafts replies in your voice, and protects your deep-work blocks. Operates 24/7.',
    stats: [{ value: '$997/mo', label: 'vs $78K/yr human' }, { value: '48 hrs', label: 'to start' }, { value: '2+ hrs/day', label: 'back on inbox alone' }],
    about: [
      'Olivia connects to Microsoft 365 or Google Workspace and immediately takes over the rote work of running your day. She learns your priorities (who matters, what you say yes to, what you delegate), drafts replies in your voice, and surfaces only the items that need you.',
      'Every action she takes is logged and reversible. You stay in control. She just removes the friction.',
    ],
    capabilities: [
      { title: 'Inbox triage', desc: 'Sorts into priority / action-needed / FYI / archive with one-tap controls.' },
      { title: 'Draft replies', desc: 'In your voice for routine emails. You approve in one click.' },
      { title: 'Calendar mgmt', desc: 'Protects deep-work blocks, resolves conflicts, sets buffers.' },
      { title: 'Meeting scheduling', desc: 'Coordinates internal + external attendees across time zones.' },
      { title: 'Travel booking', desc: 'Flights, hotels, ground transport. Within your policy.' },
      { title: 'Expense reports', desc: 'Auto-generated from receipts and credit-card feeds.' },
      { title: 'Pre-meeting briefs', desc: 'Attendees, last interaction, key talking points.' },
      { title: 'Agendas + summaries', desc: 'Drafted before, recapped after every meeting.' },
    ],
    timeTable: [
      { task: 'Inbox triage (50 emails)', human: '1h', agent: '5 min', saved: '55 min' },
      { task: 'Schedule meeting (4 attendees)', human: '25 min', agent: '2 min', saved: '23 min' },
      { task: 'Pre-meeting brief', human: '20 min', agent: '3 min', saved: '17 min' },
      { task: 'Expense report (50 line items)', human: '30 min', agent: '4 min', saved: '26 min' },
      { task: 'Travel booking (round trip)', human: '45 min', agent: '5 min', saved: '40 min' },
    ],
  },
  {
    id: 'david', name: 'David', role: 'AI Paralegal', domain: 'Legal', icon: 'fa-scale-balanced', image: '/images/agents/david.png', tier: 'senior',
    desc: 'Reviews contracts against your playbook, flags compliance risks, drafts standard documents, and prepares matter summaries.',
    title: 'Paralegal / Compliance Analyst',
    tagline: 'Reviews contracts at speed, flags risky clauses, drafts standard agreements, and pulls compliance summaries. Every action audit-logged.',
    stats: [{ value: '$1,997/mo', label: 'vs $91K/yr human' }, { value: '48 hrs', label: 'to start' }, { value: '20+ contracts/wk', label: 'reviewed' }],
    about: [
      'David is trained on Canadian law including PIPEDA, Quebec Law 25, provincial employment standards, and common commercial templates. He reviews contracts in minutes, produces redlines and plain-language summaries, drafts standard agreements from your templates, and maintains an audit log of every clause flagged with reasoning.',
      'For regulated industries, David runs in Sovereign mode: dedicated Canadian Azure tenant, customer-managed encryption keys, 7-year immutable audit retention.',
    ],
    capabilities: [
      { title: 'Contract review', desc: 'NDAs, MSAs, vendor, employment. Redline + plain-language summary.' },
      { title: 'Risk flagging', desc: 'Uncapped liability, IP assignment, exclusivity, auto-renewal traps.' },
      { title: 'Drafting', desc: 'Standard agreements from your templates with party-specific fields.' },
      { title: 'Version compare', desc: 'Surfaces material changes between contract versions.' },
      { title: 'Compliance checklists', desc: 'PIPEDA, Law 25, PHIPA for new initiatives.' },
      { title: 'Legal research', desc: 'Regulatory excerpts and case-law citations on request.' },
      { title: 'Repository mgmt', desc: 'Central contract repo with renewal alerts.' },
      { title: 'Audit log', desc: 'Every clause flagged + reasoning, exportable, immutable.' },
    ],
    timeTable: [
      { task: 'NDA review + redline', human: '1.5h', agent: '4 min', saved: '1h 26m' },
      { task: 'MSA full review', human: '4h', agent: '12 min', saved: '3h 48m' },
      { task: 'Vendor agreement redline', human: '2h', agent: '8 min', saved: '1h 52m' },
      { task: 'Compliance checklist (PIPEDA)', human: '3h', agent: '10 min', saved: '2h 50m' },
      { task: 'Contract version compare', human: '1h', agent: '3 min', saved: '57 min' },
    ],
  },
  {
    id: 'maya', name: 'Maya', role: 'AI Receptionist', domain: 'Front Desk', icon: 'fa-headset', image: '/images/agents/maya.png', tier: 'senior',
    desc: 'Answers every call 24/7, routes inquiries, books appointments, and captures lead details straight into your CRM. No missed calls.',
    title: 'Virtual Receptionist',
    tagline: 'Answers every call and chat in <2 rings, 24/7. Qualifies inquiries, books appointments, and never lets a lead drop.',
    stats: [{ value: '$497/mo', label: 'vs $62K/yr human' }, { value: '24/7', label: 'availability' }, { value: '0%', label: 'missed calls' }],
    about: [
      'Maya is a voice + chat agent powered by Twilio and your knowledge base. She picks up calls in under two rings, sounds professional, knows your hours, and remembers context across conversations. After-hours? She handles routine inquiries and escalates urgent ones via SMS or Slack.',
      'Multi-language out of the box (English, French, Spanish), with full Quebec Law 25 compliance for Quebec-based callers.',
    ],
    capabilities: [
      { title: 'Voice + chat', desc: 'Picks up in <2 rings, transcribes every conversation.' },
      { title: 'FAQ answering', desc: 'Pulls from your knowledge base, never makes things up.' },
      { title: 'Lead qualification', desc: 'New client / existing / urgent / spam categorization.' },
      { title: 'Appointment booking', desc: 'Direct into Acuity, Cal.com, Calendly, or your PMS.' },
      { title: 'Smart routing', desc: 'Urgent issues escalate via SMS or Slack with context.' },
      { title: 'CRM logging', desc: 'Every conversation logged with summary and outcome.' },
      { title: 'Multi-language', desc: 'EN / FR / ES native, others on request.' },
      { title: 'After-hours', desc: 'Handles routine, escalates urgent. Never sleeps.' },
    ],
    timeTable: [
      { task: 'Average inbound call', human: '4 min', agent: '0 min (she handles it)', saved: '4 min' },
      { task: 'Appointment booking', human: '5 min', agent: '0 min', saved: '5 min' },
      { task: 'Lead qualification', human: '6 min', agent: '0 min', saved: '6 min' },
      { task: 'FAQ response', human: '3 min', agent: '0 min', saved: '3 min' },
      { task: 'After-hours coverage', human: 'n/a (missed)', agent: '24/7', saved: 'No leads dropped' },
    ],
  },
  {
    id: 'theo', name: 'Theo', role: 'AI Support Lead', domain: 'Community & Support', icon: 'fa-comments', image: '/images/agents/theo.png', tier: 'senior',
    desc: 'Resolves support tickets, engages your community, moderates Slack and Discord, and escalates the edge cases. A full CX team in one seat.',
    title: 'Community & Support Manager',
    tagline: 'Monitors your community across every channel, replies to common questions, escalates the rest, and tracks sentiment, so you stop refreshing tabs.',
    stats: [{ value: '$1,497/mo', label: 'vs $75K/yr human' }, { value: '24/7', label: 'monitoring' }, { value: '<5 min', label: 'response time' }],
    about: [
      'Theo plugs into Slack, Discord, LinkedIn, your support inbox, and your help desk. He answers common questions from your knowledge base, flags anything ambiguous for human review, posts welcome messages and weekly digests, and tracks sentiment over time.',
      "He never makes things up. When he doesn't know, he says so and escalates. Every reply is logged, exportable, and reviewable.",
    ],
    capabilities: [
      { title: 'Multi-channel monitoring', desc: 'Slack, Discord, LinkedIn comments, support inbox.' },
      { title: 'FAQ responses', desc: 'Pulls from your KB, cites sources, never hallucinates.' },
      { title: 'Smart escalation', desc: 'Flags ambiguous or high-risk questions for human review.' },
      { title: 'Sentiment tracking', desc: 'Alerts when sentiment dips, tracks NPS-style trends.' },
      { title: 'Welcome messages', desc: 'Onboarding new members with the right context.' },
      { title: 'Weekly digests', desc: 'Top discussions, new members, sentiment summary.' },
      { title: 'KB suggestions', desc: 'Flags repeat questions as new FAQ entries.' },
      { title: 'Support tickets', desc: 'Drafts replies in Zendesk, Intercom, HelpScout.' },
    ],
    timeTable: [
      { task: 'Reply to common question', human: '5 min', agent: '<1 min', saved: '4 min' },
      { task: 'Weekly digest write-up', human: '1.5h', agent: '5 min', saved: '1h 25m' },
      { task: 'Sentiment monitoring (daily)', human: '30 min', agent: '0 min', saved: '30 min/day' },
      { task: 'Support ticket draft', human: '8 min', agent: '1 min', saved: '7 min' },
      { task: 'New-member welcome', human: '3 min', agent: '0 min', saved: '3 min' },
    ],
  },
];

export const juniors: Agent[] = [
  {
    id: 'sage', name: 'Sage', role: 'Junior Community Manager', domain: 'Community', icon: 'fa-seedling', image: '/images/agents/sage.png', tier: 'junior',
    desc: 'Posts in your communities on a steady cadence, pulls topics from research, and rotates insight, story, tip, and mindset formats on autopilot.',
    title: 'Junior Community Manager',
    tagline: "Posts in your communities on a steady weekly cadence, mines research for fresh angles, and rotates insight, story, tip, and mindset formats so your presence never goes quiet.",
    stats: [{ value: '$497/mo', label: 'vs $45K/yr human' }, { value: '48 hrs', label: 'to start' }, { value: '5x', label: 'posts per week' }],
    about: [
      "Sage plugs into your Slack workspaces, Discord servers, and Circle or Skool communities, pulling approved talking points from a shared Notion content library before drafting each post. It works from a four-format rotation of insight, story, tip, and mindset, so the feed stays varied instead of repetitive, and queues everything for your review before anything goes live.",
      "Sage never DMs members, makes promises, or speaks on pricing without an approved snippet, and it tags any post touching sensitive topics for human sign-off. Every draft lands in a Slack approval channel with the source it was built from, so you always know where a take came from.",
    ],
    capabilities: [
      { title: 'Format rotation', desc: "Cycles insight, story, tip, and mindset posts so the community feed never feels one-note." },
      { title: 'Cadence control', desc: "Holds a fixed weekly posting schedule across every channel without gaps or bunching." },
      { title: 'Topic sourcing', desc: "Pulls angles from Scout's research feed and your Notion library before writing a word." },
      { title: 'Slack approvals', desc: "Drops every draft into an approval channel with its source for fast human sign-off." },
      { title: 'Engagement triage', desc: "Surfaces comments worth a personal reply and flags anything needing a human voice." },
      { title: 'Voice matching', desc: "Writes to a saved tone guide so posts sound like your brand, not a template." },
      { title: 'Recycle library', desc: "Resurfaces your best-performing past posts as refreshed updates when the queue runs thin." },
    ],
    timeTable: [
      { task: 'Weekly post batch', human: '3h', agent: '12 min', saved: '2.8h' },
      { task: 'Sourcing post ideas', human: '45 min', agent: '3 min', saved: '42 min' },
      { task: 'Comment triage', human: '40 min', agent: '5 min', saved: '35 min' },
      { task: 'Drafting a single post', human: '20 min', agent: '90 sec', saved: '18.5 min' },
    ],
  },
  {
    id: 'scout', name: 'Scout', role: 'Junior Research Assistant', domain: 'Research', icon: 'fa-magnifying-glass', image: '/images/agents/scout.png', video: '/images/agents/scoutagent.mp4', tier: 'junior',
    desc: 'Gathers data and web insights, summarizes competitor activity and industry reports, and feeds fresh topics to the rest of the team.',
    title: 'Junior Research Assistant',
    tagline: "Gathers web data, summarizes competitor moves and industry reports, and feeds vetted topics to the rest of your team every morning.",
    stats: [{ value: '$497/mo', label: 'vs $45K/yr human' }, { value: '24/7', label: 'always scanning' }, { value: '10+', label: 'sources per brief' }],
    about: [
      "Scout runs scheduled web sweeps across news sites, competitor blogs, LinkedIn, and industry newsletters, then distills what it finds into a structured Notion brief with links back to every source. It tracks a watchlist of competitors and keywords you define, flagging launches, pricing changes, and notable posts so nothing relevant slips past you.",
      "Scout cites every claim and never presents an unsourced assertion as fact, marking anything it can't verify as unconfirmed. It hands clean, deduplicated topic lists to Sage and Finn so the content team always starts from real signal instead of a blank page.",
    ],
    capabilities: [
      { title: 'Competitor watch', desc: "Monitors a defined rival list for launches, pricing shifts, and messaging changes." },
      { title: 'Daily briefs', desc: "Compiles a sourced morning summary of the most relevant developments in your space." },
      { title: 'Report digests', desc: "Condenses long industry PDFs and articles into the three points that actually matter." },
      { title: 'Topic feeding', desc: "Passes vetted, deduplicated content angles directly to your writers and community manager." },
      { title: 'Source citing', desc: "Links every claim to its origin and flags anything it cannot independently verify." },
      { title: 'Keyword tracking', desc: "Watches your chosen search terms and surfaces new mentions across the web." },
      { title: 'Trend spotting', desc: "Notices recurring themes across sources and calls them out before they peak." },
    ],
    timeTable: [
      { task: 'Daily research brief', human: '90 min', agent: '6 min', saved: '84 min' },
      { task: 'Competitor scan', human: '60 min', agent: '4 min', saved: '56 min' },
      { task: 'Summarizing a report', human: '50 min', agent: '3 min', saved: '47 min' },
      { task: 'Topic shortlist', human: '30 min', agent: '2 min', saved: '28 min' },
    ],
  },
  {
    id: 'jace', name: 'Jace', role: 'Junior Social Media Assistant', domain: 'Social', icon: 'fa-hashtag', image: '/images/agents/jace.png', tier: 'junior',
    desc: 'Drafts posts for LinkedIn, X, and Facebook, schedules and queues updates, and monitors basic engagement metrics and comments.',
    title: 'Junior Social Media Assistant',
    tagline: "Drafts posts for LinkedIn, X, and Facebook, schedules and queues every update, and keeps an eye on engagement and comments so nothing goes unanswered.",
    stats: [{ value: '$497/mo', label: 'vs $45K/yr human' }, { value: '3', label: 'platforms covered' }, { value: '48 hrs', label: 'to start' }],
    about: [
      "Jace drafts platform-native posts for LinkedIn, X, and Facebook, reshaping a single idea to fit each channel's length and tone, then schedules everything through Buffer or your native schedulers on the cadence you set. It pulls source material from your Notion calendar and Scout's research so every queued post traces back to something approved.",
      "Jace monitors basic engagement (likes, comments, and reach) and flags comments that need a human reply rather than answering on its own. It never posts outside the approved queue or DMs anyone, keeping you in control of anything that carries your name.",
    ],
    capabilities: [
      { title: 'Multi-platform drafts', desc: "Adapts one idea into native posts for LinkedIn, X, and Facebook in the right format each." },
      { title: 'Scheduling', desc: "Queues approved posts through Buffer or native tools on your chosen cadence." },
      { title: 'Engagement tracking', desc: "Logs likes, comments, and reach so you see what's landing without opening five tabs." },
      { title: 'Comment monitoring', desc: "Watches replies and flags the ones that need a real human response." },
      { title: 'Hashtag sets', desc: "Applies tested, platform-appropriate hashtag groups to extend each post's reach." },
      { title: 'Queue management', desc: "Keeps every channel stocked a week ahead so the feed never runs dry." },
      { title: 'Best-time posting', desc: "Schedules updates into the windows your audience is most active." },
    ],
    timeTable: [
      { task: 'Weekly post drafting', human: '2.5h', agent: '10 min', saved: '2.3h' },
      { task: 'Scheduling a batch', human: '45 min', agent: '3 min', saved: '42 min' },
      { task: 'Engagement check', human: '30 min', agent: '2 min', saved: '28 min' },
      { task: 'Reformatting one post', human: '15 min', agent: '45 sec', saved: '14 min' },
    ],
  },
  {
    id: 'piper', name: 'Piper', role: 'Junior Data Entry Clerk', domain: 'Operations', icon: 'fa-table-list', image: '/images/agents/piper.png', tier: 'junior',
    desc: 'Organizes spreadsheets, inputs customer details, cleans formatting errors, and migrates records between your tools.',
    title: 'Junior Data Entry Clerk',
    tagline: "Organizes spreadsheets, inputs customer details, scrubs formatting errors, and migrates records cleanly between your tools.",
    stats: [{ value: '$497/mo', label: 'vs $45K/yr human' }, { value: '99.9%', label: 'entry accuracy' }, { value: '24/7', label: 'always on' }],
    about: [
      "Piper works across Google Sheets, Excel, Airtable, and your CRM, entering customer details, standardizing phone and address formats, and stripping duplicate or malformed rows. It follows a defined field schema for every dataset, so names, dates, and statuses always land in the right column in the right format.",
      "Piper never overwrites a populated field without logging the original value and never deletes records outright, archiving them instead. During migrations it validates row counts and key fields on both sides before and after, so nothing silently goes missing in the move.",
    ],
    capabilities: [
      { title: 'Data entry', desc: "Inputs customer and order details into your sheets and CRM against a fixed field schema." },
      { title: 'Format cleaning', desc: "Standardizes phone numbers, dates, and addresses into one consistent style." },
      { title: 'Dedup', desc: "Finds and merges duplicate records without losing any unique field values." },
      { title: 'Record migration', desc: "Moves data between tools and validates row counts on both ends to catch losses." },
      { title: 'Validation', desc: "Checks entries against expected formats and flags anything that looks off for review." },
      { title: 'Audit logging', desc: "Records every change with the original value so nothing is overwritten blindly." },
      { title: 'Bulk updates', desc: "Applies consistent edits across thousands of rows in one controlled pass." },
    ],
    timeTable: [
      { task: 'Cleaning a 1,000-row sheet', human: '4h', agent: '8 min', saved: '3.9h' },
      { task: 'CRM record migration', human: '3h', agent: '15 min', saved: '2.75h' },
      { task: 'Entering 100 contacts', human: '2h', agent: '4 min', saved: '1.9h' },
      { task: 'Dedup pass', human: '75 min', agent: '3 min', saved: '72 min' },
    ],
  },
  {
    id: 'finn', name: 'Finn', role: 'Junior Content Writer', domain: 'Content', icon: 'fa-pen', image: '/images/agents/finn.png', tier: 'junior',
    desc: 'Writes first-draft outlines for blogs and guides, compiles notes for newsletters, and proofreads documents for grammar and tone.',
    title: 'Junior Content Writer',
    tagline: "Drafts blog and guide outlines, compiles newsletter notes, and proofreads documents for grammar, clarity, and tone.",
    stats: [{ value: '$497/mo', label: 'vs $45K/yr human' }, { value: '48 hrs', label: 'to start' }, { value: '4x', label: 'drafts per day' }],
    about: [
      "Finn builds first-draft outlines and rough copy for blogs and guides, working from Scout's research briefs and your Notion style guide so structure and voice are right from the start. It assembles newsletter notes by pulling the week's highlights into a clean running doc and proofreads existing documents for grammar, clarity, and tone consistency.",
      "Finn produces drafts, not final published copy, and always routes work back for human editing before anything ships. It never invents statistics or sources, leaving a bracketed note wherever a fact needs verification so editors know exactly what to check.",
    ],
    capabilities: [
      { title: 'Blog outlines', desc: "Structures headers, key points, and flow for guides and posts before the first sentence." },
      { title: 'First drafts', desc: "Turns an approved outline into rough copy in your saved brand voice." },
      { title: 'Newsletter prep', desc: "Compiles the week's highlights into a tidy running doc ready for editing." },
      { title: 'Proofreading', desc: "Catches grammar, spelling, and tone slips across any document you hand it." },
      { title: 'Style matching', desc: "Writes to your Notion style guide so drafts read like your team wrote them." },
      { title: 'Fact flagging', desc: "Marks every claim needing a source rather than inventing numbers or quotes." },
      { title: 'Repurposing', desc: "Reshapes one long piece into shorter formats for social and email." },
    ],
    timeTable: [
      { task: 'Blog outline', human: '60 min', agent: '3 min', saved: '57 min' },
      { task: 'First draft of a post', human: '2h', agent: '6 min', saved: '1.9h' },
      { task: 'Proofreading a doc', human: '40 min', agent: '2 min', saved: '38 min' },
      { task: 'Newsletter notes', human: '45 min', agent: '4 min', saved: '41 min' },
    ],
  },
  {
    id: 'rory', name: 'Rory', role: 'Junior Inbox Manager', domain: 'Inbox', icon: 'fa-inbox', image: '/images/agents/rory.png', tier: 'junior',
    desc: 'Sorts and labels incoming email, drafts templates for common FAQs, and flags high-priority messages for human review.',
    title: 'Junior Inbox Manager',
    tagline: "Sorts and labels incoming email, drafts replies for common questions, and flags high-priority messages for human review.",
    stats: [{ value: '$497/mo', label: 'vs $45K/yr human' }, { value: '24/7', label: 'always on' }, { value: '<2 min', label: 'to triage' }],
    about: [
      "Rory connects to Gmail or Google Workspace and triages your inbox in real time, applying labels by topic and urgency, archiving noise, and sorting messages into the queues you've defined. For recurring questions it drafts replies from an approved template set, leaving them in your drafts folder for a quick read-and-send.",
      "Rory never sends an email on its own, never deletes a message, and never touches anything outside its defined rules. Anything urgent, sensitive, or unfamiliar gets flagged and surfaced to you immediately rather than handled silently.",
    ],
    capabilities: [
      { title: 'Inbox sorting', desc: "Labels and routes incoming mail by topic and urgency the moment it arrives." },
      { title: 'Template drafts', desc: "Prepares replies to common FAQs from your approved snippets, ready to send." },
      { title: 'Priority flagging', desc: "Surfaces time-sensitive and high-value messages so they never get buried." },
      { title: 'Noise archiving', desc: "Clears newsletters and notifications out of the way without deleting them." },
      { title: 'Follow-up tracking', desc: "Flags threads awaiting a reply so nothing slips through the cracks." },
      { title: 'Spam triage', desc: "Separates genuine outreach from junk while quarantining nothing important." },
      { title: 'Daily digest', desc: "Summarizes what landed and what needs you in a single morning rundown." },
    ],
    timeTable: [
      { task: 'Morning inbox triage', human: '50 min', agent: '3 min', saved: '47 min' },
      { task: 'Drafting FAQ replies', human: '35 min', agent: '2 min', saved: '33 min' },
      { task: 'Labeling 50 emails', human: '25 min', agent: '90 sec', saved: '23.5 min' },
      { task: 'End-of-day cleanup', human: '20 min', agent: '1 min', saved: '19 min' },
    ],
  },
];

export const realtorPack: Agent[] = [
  {
    id: 'rex', name: 'Rex', role: 'Listing Coordinator', domain: '01 · Listings', icon: 'fa-house', image: '/images/agents/rex.png', tier: 'realtor',
    desc: 'Writes MLS and listing descriptions, manages photo uploads and go-live deadlines, and tracks price changes and open house dates.',
    title: 'Listing Coordinator',
    tagline: "Writes MLS and listing descriptions, manages photo uploads and go-live deadlines, and tracks every price change and open house date.",
    stats: [{ value: '$997/mo', label: 'vs $55K/yr human' }, { value: '48 hrs', label: 'to start' }, { value: 'Zero', label: 'missed go-lives' }],
    about: [
      "Rex drafts compliant MLS remarks and polished public listing descriptions from your property details, then coordinates photo uploads, feature sheets, and go-live timing so listings hit the market exactly when planned. It tracks every active listing's status, price, and open house schedule in one view and sends you a checklist before each go-live.",
      "Rex writes to RECO and CREA advertising guidelines, avoiding fair-housing-sensitive language and never publishing a listing without your final approval. Any price change or status update is logged with a timestamp so you always have a clean history of the listing's life.",
    ],
    capabilities: [
      { title: 'MLS descriptions', desc: "Writes compliant MLS remarks and public copy from your property details in minutes." },
      { title: 'Photo management', desc: "Organizes and uploads listing photos in the right order with captions ready." },
      { title: 'Go-live tracking', desc: "Holds every listing's launch deadline and runs a pre-publish checklist with you." },
      { title: 'Price monitoring', desc: "Logs price changes with timestamps so you keep a clean adjustment history." },
      { title: 'Open house calendar', desc: "Tracks open house dates and times across all your active listings in one view." },
      { title: 'Compliance check', desc: "Screens copy against RECO and CREA advertising rules before anything publishes." },
      { title: 'Feature sheets', desc: "Generates branded property feature sheets from the same listing data." },
      { title: 'Status updates', desc: "Keeps active, conditional, and sold statuses current across your listing set." },
    ],
    timeTable: [
      { task: 'Writing a listing description', human: '45 min', agent: '3 min', saved: '42 min' },
      { task: 'Photo upload and ordering', human: '30 min', agent: '4 min', saved: '26 min' },
      { task: 'Go-live coordination', human: '40 min', agent: '5 min', saved: '35 min' },
      { task: 'Updating prices across listings', human: '25 min', agent: '2 min', saved: '23 min' },
    ],
  },
  {
    id: 'nova', name: 'Nova', role: 'Lead Nurture Agent', domain: '02 · Lead Nurture', icon: 'fa-mobile-screen', image: '/images/agents/nova.png', tier: 'realtor',
    desc: 'Follows up with buyer and seller leads within minutes, qualifies them against your criteria, and books showings into your calendar.',
    title: 'Lead Nurture Agent',
    tagline: "Follows up with buyer and seller leads within minutes, qualifies them against your criteria, and books showings straight into your calendar.",
    stats: [{ value: '$997/mo', label: 'vs $55K/yr human' }, { value: '<5 min', label: 'lead response' }, { value: '24/7', label: 'always on' }],
    about: [
      "Nova responds to new leads from your website, Follow Up Boss, or portal inquiries within minutes, opening a natural conversation by text and email to qualify timeline, budget, financing, and motivation against the criteria you set. Qualified buyers and sellers get routed to you with a clean summary, and showings are booked directly into your Google Calendar around your availability.",
      "Nova works from approved scripts, never quotes a price or makes a commitment on your behalf, and hands off to a human the moment a lead is ready to transact or asks something outside its lane. Every conversation is logged back to Follow Up Boss so your CRM stays current without manual notes.",
    ],
    capabilities: [
      { title: 'Instant follow-up', desc: "Reaches every new lead within minutes by text and email before they go cold." },
      { title: 'Lead qualification', desc: "Scores leads on timeline, budget, and motivation against your defined criteria." },
      { title: 'Showing booking', desc: "Schedules showings directly into your Google Calendar around your availability." },
      { title: 'CRM logging', desc: "Writes every conversation back to Follow Up Boss so your pipeline stays current." },
      { title: 'Long-term nurture', desc: "Keeps not-yet-ready leads warm with periodic, relevant check-ins." },
      { title: 'Smart handoff', desc: "Passes hot or sensitive conversations to you the moment they need a human." },
      { title: 'Speed-to-lead', desc: "Runs around the clock so after-hours inquiries never wait until morning." },
    ],
    timeTable: [
      { task: 'Initial lead follow-up', human: '15 min', agent: '30 sec', saved: '14.5 min' },
      { task: 'Qualifying a lead', human: '20 min', agent: '2 min', saved: '18 min' },
      { task: 'Booking a showing', human: '12 min', agent: '1 min', saved: '11 min' },
      { task: 'Logging to CRM', human: '8 min', agent: '15 sec', saved: '7.75 min' },
    ],
  },
  {
    id: 'dot', name: 'Dot', role: 'Transaction Coordinator', domain: '03 · Transactions', icon: 'fa-clipboard-check', image: '/images/agents/dot.png', tier: 'realtor',
    desc: 'Tracks conditions, deadlines, and documents, sends reminders to lawyers and clients, and flags deals at risk before conditions expire.',
    title: 'Transaction Coordinator',
    tagline: "Tracks conditions, deadlines, and documents, sends reminders to lawyers and clients, and flags deals at risk before conditions expire.",
    stats: [{ value: '$997/mo', label: 'vs $55K/yr human' }, { value: 'Zero', label: 'missed deadlines' }, { value: '48 hrs', label: 'to start' }],
    about: [
      "Dot builds a timeline for every accepted offer, tracking financing, inspection, and other conditions alongside document collection and closing dates. It sends proactive reminders to clients, lawyers, and the cooperating agent before each deadline and maintains a live checklist so you always know what's outstanding on every file.",
      "Dot watches for conditions approaching expiry and flags any deal at risk early enough to act, escalating to you rather than waiving or extending anything itself. It never signs or alters documents, keeping a clean audit trail of every reminder sent and every item received.",
    ],
    capabilities: [
      { title: 'Condition tracking', desc: "Monitors financing, inspection, and status conditions with their hard deadlines." },
      { title: 'Document checklist', desc: "Tracks every required form and shows what's still outstanding on each file." },
      { title: 'Deadline reminders', desc: "Nudges clients, lawyers, and co-op agents before key dates arrive." },
      { title: 'Risk flagging', desc: "Surfaces deals nearing condition expiry early enough for you to act." },
      { title: 'Closing prep', desc: "Assembles the document set and timeline leading into each closing date." },
      { title: 'Status dashboard', desc: "Keeps a live view of where every active transaction stands at a glance." },
      { title: 'Audit trail', desc: "Logs every reminder sent and document received for a clean file history." },
    ],
    timeTable: [
      { task: 'Setting up a new deal file', human: '50 min', agent: '5 min', saved: '45 min' },
      { task: 'Deadline reminder round', human: '30 min', agent: '2 min', saved: '28 min' },
      { task: 'Document follow-up', human: '25 min', agent: '2 min', saved: '23 min' },
      { task: 'Closing checklist review', human: '40 min', agent: '4 min', saved: '36 min' },
    ],
  },
  {
    id: 'lena', name: 'Lena', role: 'Social Media Manager', domain: '04 · Social Media', icon: 'fa-camera', image: '/images/agents/lena.png', tier: 'realtor',
    desc: 'Posts new listings and sold announcements, creates weekly market updates, and schedules branded content automatically.',
    title: 'Social Media Manager',
    tagline: "Posts new listings and sold announcements, builds weekly market updates, and schedules branded content automatically.",
    stats: [{ value: '$997/mo', label: 'vs $55K/yr human' }, { value: '48 hrs', label: 'to start' }, { value: '7x', label: 'posts per week' }],
    about: [
      "Lena turns your listing data into branded social posts (just-listed, open house, and just-sold announcements) formatted natively for Instagram, Facebook, and LinkedIn and scheduled through Buffer on a steady cadence. Every week it assembles a local market update from area stats so your feed mixes promotion with genuine value.",
      "Lena posts only from your approved branded templates and listing data, never invents a sale or a statistic, and queues everything for your review before it goes live. It keeps your handles consistent and your presence active without you opening an app.",
    ],
    capabilities: [
      { title: 'Listing posts', desc: "Turns new listings into branded just-listed and open house announcements automatically." },
      { title: 'Sold announcements', desc: "Builds celebratory just-sold posts from your closed-deal data on demand." },
      { title: 'Market updates', desc: "Compiles a weekly local-stats post that gives your audience real value." },
      { title: 'Auto-scheduling', desc: "Queues branded content through Buffer on a consistent weekly cadence." },
      { title: 'Template branding', desc: "Applies your colors, logo, and handle so every post looks unmistakably yours." },
      { title: 'Multi-platform', desc: "Formats each post natively for Instagram, Facebook, and LinkedIn." },
      { title: 'Content mix', desc: "Balances promotion with value so the feed never reads as wall-to-wall ads." },
    ],
    timeTable: [
      { task: 'Just-listed post', human: '30 min', agent: '2 min', saved: '28 min' },
      { task: 'Weekly market update', human: '60 min', agent: '5 min', saved: '55 min' },
      { task: 'Scheduling a week of posts', human: '45 min', agent: '3 min', saved: '42 min' },
      { task: 'Just-sold announcement', human: '25 min', agent: '90 sec', saved: '23.5 min' },
    ],
  },
  {
    id: 'miles', name: 'Miles', role: 'CRM & Database Manager', domain: '05 · CRM', icon: 'fa-address-book', image: '/images/agents/miles.png', tier: 'realtor',
    desc: 'Tags contacts by buyer, seller, and investor status, logs every touchpoint, and surfaces warm leads ready to transact this quarter.',
    title: 'CRM & Database Manager',
    tagline: "Tags contacts by buyer, seller, and investor status, logs every touchpoint, and surfaces the warm leads ready to transact this quarter.",
    stats: [{ value: '$997/mo', label: 'vs $55K/yr human' }, { value: '24/7', label: 'always on' }, { value: '100%', label: 'contacts tagged' }],
    about: [
      "Miles keeps your Follow Up Boss or CRM clean and segmented, tagging every contact by buyer, seller, or investor status, deduplicating records, and logging each call, email, and showing so no touchpoint goes unrecorded. It scores contacts on recency and engagement to surface the warm leads most likely to transact this quarter.",
      "Miles never deletes a contact or overwrites notes, archiving and logging instead, and it flags stale or incomplete records for you to fix rather than guessing. Every quarter it hands you a prioritized list of who to call, built from real activity in your database.",
    ],
    capabilities: [
      { title: 'Contact tagging', desc: "Segments every record by buyer, seller, and investor status as it comes in." },
      { title: 'Touchpoint logging', desc: "Records each call, email, and showing against the right contact automatically." },
      { title: 'Warm-lead surfacing', desc: "Scores contacts by recency and engagement to flag who's ready to transact." },
      { title: 'Deduplication', desc: "Merges duplicate contacts without losing a single note or field." },
      { title: 'Data hygiene', desc: "Flags stale or incomplete records so your database stays trustworthy." },
      { title: 'Quarterly call list', desc: "Delivers a prioritized who-to-call list built from real activity each quarter." },
      { title: 'Pipeline sync', desc: "Keeps stages and statuses current so your CRM matches reality." },
    ],
    timeTable: [
      { task: 'Tagging a contact batch', human: '40 min', agent: '2 min', saved: '38 min' },
      { task: "Logging the week's touchpoints", human: '60 min', agent: '3 min', saved: '57 min' },
      { task: 'Building a warm-lead list', human: '90 min', agent: '4 min', saved: '86 min' },
      { task: 'Database dedup pass', human: '75 min', agent: '5 min', saved: '70 min' },
    ],
  },
  {
    id: 'harper', name: 'Harper', role: 'Reviews & Reputation Agent', domain: '06 · Reputation', icon: 'fa-star', image: '/images/agents/harper.png', tier: 'realtor',
    desc: 'Requests reviews post-close, monitors your online ratings, and drafts professional responses to every review.',
    title: 'Reviews & Reputation Agent',
    tagline: "Requests reviews after every close, monitors your online ratings, and drafts professional responses to every review you receive.",
    stats: [{ value: '$997/mo', label: 'vs $55K/yr human' }, { value: '24/7', label: 'always monitoring' }, { value: '100%', label: 'reviews answered' }],
    about: [
      "Harper triggers a personalized review request to each client shortly after closing, sending well-timed asks by text and email with a direct link to your Google Business Profile so the path to a five-star review is frictionless. It monitors Google, Facebook, and realtor review sites continuously and alerts you the moment a new rating lands.",
      "Harper drafts a professional, on-brand response to every review, positive or negative, and routes each one to you for approval before it posts, never replying publicly on its own. Negative reviews are escalated immediately with a recommended response and a private-resolution suggestion so issues are handled with care, not reflex.",
    ],
    capabilities: [
      { title: 'Review requests', desc: "Sends a timed, personalized ask to each client right after closing." },
      { title: 'Rating monitoring', desc: "Watches Google, Facebook, and realtor sites for new reviews around the clock." },
      { title: 'Response drafting', desc: "Writes professional replies to every review for your one-click approval." },
      { title: 'Negative escalation', desc: "Flags critical reviews instantly with a careful, recommended response." },
      { title: 'Google Business sync', desc: "Links requests straight to your Google Business Profile for frictionless reviews." },
      { title: 'Approval routing', desc: "Sends every drafted reply to you before anything posts publicly." },
      { title: 'Reputation reporting', desc: "Tracks your average rating and review volume trend over time." },
    ],
    timeTable: [
      { task: 'Sending review requests', human: '20 min', agent: '30 sec', saved: '19.5 min' },
      { task: 'Drafting a review response', human: '15 min', agent: '1 min', saved: '14 min' },
      { task: 'Monitoring across sites', human: '30 min', agent: '1 min', saved: '29 min' },
      { task: 'Handling a negative review', human: '35 min', agent: '3 min', saved: '32 min' },
    ],
  },
];

// The Junior Series is retired from Agent Studio — juniors are deliberately not
// spread in here, so no junior profile pages are generated and they no longer
// appear in cross-links. The `juniors` array above is kept intact so the series
// can be restored by adding it back to this list.
export const allAgents: Agent[] = [...workforce, ...realtorPack];

export const getAgent = (id: string | undefined): Agent | undefined =>
  allAgents.find((a) => a.id === id);
