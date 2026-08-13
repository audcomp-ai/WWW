// Single source of truth for blog posts. Shared by the /blog index and the
// /blog/[slug] detail pages, so a title or image only ever changes in one place.
//
// Deliberately free of unverified statistics: where a number would normally
// carry a claim, the copy makes the argument qualitatively instead. Add real
// figures here when they are known rather than inventing them.

export type BlogSection = { heading: string; paras: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  image: string;
  /** ISO date. Display strings are derived from this so posts can sort. */
  publishedAt: string;
  excerpt: string;
  intro: string;
  sections: BlogSection[];
  cta: { label: string; href: string };
};

export const posts: BlogPost[] = [
  {
    slug: "microsoft-365-backup-gap",
    title: "Your Microsoft 365 Data Isn't Backed Up. Here's What Microsoft Actually Covers.",
    category: "Cyber Security",
    image: "/images/blog/microsoft-365-backup-gap.jpg",
    publishedAt: "2026-08-13",
    excerpt:
      "Microsoft keeps the service running. Keeping your data recoverable is your side of the agreement, and most organizations find that out at the worst possible moment.",
    intro:
      "Most organizations assume that because their email and files live in Microsoft 365, they are backed up. Microsoft's own shared responsibility model says otherwise, and the gap only becomes visible when someone needs a file back.",
    sections: [
      {
        heading: "What Microsoft is responsible for",
        paras: [
          "Microsoft guarantees the availability of the service: the infrastructure, the uptime, the replication between their own data centres. If a disk fails in an Azure region, that is Microsoft's problem and they solve it well.",
          "What Microsoft does not guarantee is the state of your data over time. Retention policies and recycle bins are short-lived by design, measured in days rather than years, and they are not built to reconstruct a mailbox or a SharePoint library months after something went wrong.",
        ],
      },
      {
        heading: "Where the gap actually bites",
        paras: [
          "Three situations account for most of the data loss we are asked to recover from. An employee deletes a folder and nobody notices for a quarter. A departing staff member's mailbox is removed to reclaim the licence, then needed for a legal request. Ransomware encrypts a synced OneDrive, and the encrypted versions replicate to the cloud copy.",
          "In each case the service was working exactly as designed. That is the point: availability and recoverability are different problems.",
        ],
      },
      {
        heading: "What to put in place",
        paras: [
          "Independent backup means a copy of your Microsoft 365 data held outside Microsoft's control, on its own retention schedule, restorable at the item level. Ask three questions of any solution: how far back can it restore, how granular is that restore, and where does the copy physically live.",
          "For organizations with Canadian data residency obligations, that third question matters as much as the first two.",
        ],
      },
    ],
    cta: { label: "See Office 365 Backup", href: "/office-365-backup" },
  },
  {
    slug: "stored-in-canada-contract-term",
    title: "“Stored in Canada” Should Be a Contract Term, Not a Badge",
    category: "Cloud Solutions",
    image: "/images/blog/stored-in-canada-contract-term.jpg",
    publishedAt: "2026-08-12",
    excerpt:
      "Plenty of vendors say your data stays in Canada. Far fewer will write down which region, who holds the encryption keys, and where the backups replicate.",
    intro:
      "Data residency has become a marketing line, which makes it easy to stop asking questions once you hear it. For regulated organizations, the phrase is only worth what the contract says it is.",
    sections: [
      {
        heading: "Four questions worth asking",
        paras: [
          "Which specific region does the primary workload run in? “Canada” is not a region; Canada Central and Canada East are. A vendor who cannot name one is describing an intention, not an architecture.",
          "Where do backups and disaster recovery copies replicate to? Primary storage frequently sits in Canada while the secondary copy quietly lands elsewhere. Ask for both.",
        ],
      },
      {
        heading: "Keys and access",
        paras: [
          "Who holds the encryption keys, and can staff outside Canada access the data for support purposes? A Canadian-hosted service administered by a support team elsewhere may still create a disclosure obligation you need to understand.",
          "This is not hypothetical for healthcare, municipal, and education clients, where the question comes up in procurement and has to be answered in writing.",
        ],
      },
      {
        heading: "Get it in the agreement",
        paras: [
          "If residency matters to your organization, it belongs in the contract alongside uptime and support response, not in a logo on a website. A vendor who means it will put it there without much argument.",
        ],
      },
    ],
    cta: { label: "Talk to us about residency", href: "/contact" },
  },
  {
    slug: "ai-agents-where-they-save-time",
    title: "Where AI Agents Actually Save Time",
    category: "AI Services",
    image: "/images/blog/ai-agents-where-they-save-time.jpg",
    publishedAt: "2026-08-11",
    excerpt:
      "The useful question is not whether AI can do a job, but which specific tasks inside that job are repetitive, rule-bound, and reviewable.",
    intro:
      "Most AI pilots stall because they start with the technology and look for somewhere to put it. The ones that stick start from a task that is done the same way every week and takes longer than anyone would like to admit.",
    sections: [
      {
        heading: "The tasks that suit an agent",
        paras: [
          "Three properties make a task a good candidate. It repeats on a predictable schedule. It follows rules that can be written down. And its output can be checked quickly by a person who knows what right looks like.",
          "Reconciling a bank feed, triaging a support queue, drafting a first pass of a document from a template: all three qualify. Deciding whether to take on a client does not.",
        ],
      },
      {
        heading: "Keep a human at the decision point",
        paras: [
          "The agents worth deploying draft, sort, and prepare. A person approves anything that leaves the building or changes a record of consequence. That boundary is what makes the time saving safe to bank.",
          "It also makes failure cheap. A bad draft costs a minute to reject; an unreviewed action can cost considerably more.",
        ],
      },
      {
        heading: "Start with one role",
        paras: [
          "Pick the single task your team complains about most, measure how long it currently takes, and deploy against that. One measured result is worth more than a broad rollout nobody can evaluate.",
        ],
      },
    ],
    cta: { label: "See Agent Studio", href: "/ai-services/agent-studio" },
  },
  {
    slug: "cost-of-downtime",
    title: "What an Hour of Downtime Actually Costs",
    category: "Managed IT",
    image: "/images/blog/cost-of-downtime.jpg",
    publishedAt: "2026-08-07",
    excerpt:
      "Downtime is usually priced as lost revenue, which understates it. The bigger numbers are idle payroll and the work that has to be redone afterwards.",
    intro:
      "Ask most business owners what an outage costs and they will estimate lost sales. That is the smallest line in the calculation, and the one most likely to recover on its own once systems come back.",
    sections: [
      {
        heading: "The arithmetic nobody runs",
        paras: [
          "Start with idle payroll: staff who cannot work, multiplied by their fully loaded hourly cost, multiplied by the length of the outage. For a business of any size this is usually the largest single component, and it is entirely knowable in advance.",
          "Add recovery labour, which is rarely just the length of the outage. Systems come back in an order, data gets reconciled, and someone spends the evening confirming nothing was lost.",
        ],
      },
      {
        heading: "The costs that arrive later",
        paras: [
          "Deferred work does not disappear; it lands on top of next week. Missed commitments carry a reputational cost that does not show up on any invoice but shapes the next renewal conversation.",
          "For regulated organizations, an outage that touches personal data can also start a reporting clock, which turns a technical problem into a compliance one.",
        ],
      },
      {
        heading: "Run the number for your own business",
        paras: [
          "Take your headcount, your average loaded hourly cost, and a realistic outage length based on your last incident. The result is the budget you are implicitly setting aside every year by not investing in monitoring and recovery.",
        ],
      },
    ],
    cta: { label: "See Managed IT Services", href: "/managed-it-services" },
  },
  {
    slug: "copilot-readiness-not-licences",
    title: "Copilot Rollouts Stall on Readiness, Not Licences",
    category: "AI Services",
    image: "/images/blog/copilot-readiness-not-licences.jpg",
    publishedAt: "2026-08-05",
    excerpt:
      "Buying the licences is the easy part. What determines whether Copilot is useful is the state of your permissions and your documents.",
    intro:
      "Copilot answers questions using what a user can already see. That single fact explains most disappointing pilots, and most of the uncomfortable surprises.",
    sections: [
      {
        heading: "Permissions become visible",
        paras: [
          "In most tenants, files have accumulated broad sharing over years. Nobody notices, because nobody browses SharePoint looking for documents they were accidentally given access to. Copilot browses on their behalf.",
          "The result is that oversharing which was theoretically discoverable becomes practically discoverable. Reviewing site permissions and sharing links before rollout is not optional housekeeping; it is the rollout.",
        ],
      },
      {
        heading: "Stale content produces stale answers",
        paras: [
          "If three versions of a policy exist and two are outdated, Copilot will cheerfully cite whichever it finds. Archiving superseded documents does more for answer quality than any amount of prompt training.",
        ],
      },
      {
        heading: "Sequence the rollout",
        paras: [
          "Assess the tenant, remediate sharing and retention, pilot with one team that has a defined use case, then expand. Teams that skip to the last step tend to conclude the tool does not work, when what did not work was the ground it was standing on.",
        ],
      },
    ],
    cta: { label: "See Copilot Enablement", href: "/microsoft-copilot-enablement" },
  },
  {
    slug: "buy-lease-or-daas",
    title: "Buy, Lease, or Device as a Service: Comparing a Four-Year Refresh",
    category: "Managed IT",
    image: "/images/blog/buy-lease-or-daas.jpg",
    publishedAt: "2026-08-01",
    excerpt:
      "The sticker price of a laptop is the smallest part of what it costs you over four years. Comparing models on purchase price alone hides most of the difference.",
    intro:
      "Hardware decisions are usually made on capital cost, because that is the number on the quote. Over a refresh cycle, the costs that matter most are the ones that arrive after the box is opened.",
    sections: [
      {
        heading: "What the quote leaves out",
        paras: [
          "Imaging and deployment, warranty administration, the spare pool you keep for failures, and the labour of decommissioning and disposing of machines securely at end of life. These land in different budgets, which is precisely why they rarely get compared.",
          "There is also the cost of aging hardware in year four: slower machines, more support tickets, and staff working around problems rather than reporting them.",
        ],
      },
      {
        heading: "Where each model fits",
        paras: [
          "Buying suits organizations with stable headcount, capital available, and internal capacity to manage the lifecycle. Leasing shifts the capital cost but leaves the operational work with you.",
          "Device as a Service bundles hardware, deployment, support, and refresh into a predictable monthly figure per seat. It suits organizations whose headcount moves, or who would rather not run a spare pool.",
        ],
      },
      {
        heading: "Compare over the cycle",
        paras: [
          "Whichever way you go, compare four years of total cost per seat rather than one purchase price. That is the only comparison that reflects what you actually spend.",
        ],
      },
    ],
    cta: { label: "See Device as a Service", href: "/daas" },
  },
  {
    slug: "microsoft-copilot-modern-workspace",
    title: "How Microsoft Copilot is Changing the Modern Workspace",
    category: "AI Services",
    image: "/images/blog_copilot.png",
    publishedAt: "2026-07-22",
    excerpt:
      "Copilot is most useful in the small, repeated tasks that fill a working day rather than the dramatic ones it gets demonstrated with.",
    intro:
      "The demonstrations show a full report generated from a prompt. The real value shows up somewhere less impressive: the meeting nobody had time to write up, the thread nobody wants to read back through.",
    sections: [
      {
        heading: "Where teams see it first",
        paras: [
          "Summarising a long email thread before replying, catching up on a meeting you missed, and turning rough notes into a first draft are the uses that survive past the novelty period. They are small individually and add up across a week.",
        ],
      },
      {
        heading: "What it does not replace",
        paras: [
          "Copilot works from what is already written down. It does not know the context that lives in someone's head, and it does not know which of two conflicting documents is current. Judgement stays where it was.",
        ],
      },
    ],
    cta: { label: "See Copilot Enablement", href: "/microsoft-copilot-enablement" },
  },
  {
    slug: "zero-trust-architecture",
    title: "Zero Trust Architecture: No Longer Just for Enterprise",
    category: "Cyber Security",
    image: "/images/cyber_security_hero.png",
    publishedAt: "2026-07-08",
    excerpt:
      "Zero trust is less a product than a default: verify every request, regardless of where it comes from.",
    intro:
      "The traditional model trusted anything inside the network perimeter. Remote work and cloud services removed the perimeter, which left the trust assumption without anything to stand on.",
    sections: [
      {
        heading: "The working definition",
        paras: [
          "Every request is authenticated and authorised on its own merits, whether it originates in the office or a coffee shop. Access is granted narrowly and reviewed rather than assumed from network location.",
        ],
      },
      {
        heading: "Where smaller organizations start",
        paras: [
          "Multi-factor authentication everywhere, conditional access based on device health, and least-privilege access reviews cover most of the practical benefit. None of these require an enterprise budget, and each one closes a path that attackers use routinely.",
        ],
      },
    ],
    cta: { label: "See Security Services", href: "/security-services" },
  },
  {
    slug: "azure-hybrid-benefit-cloud-spend",
    title: "Optimizing Your Cloud Spend with Azure Hybrid Benefit",
    category: "Cloud Solutions",
    image: "/images/cloud_solutions_hero.png",
    publishedAt: "2026-06-18",
    excerpt:
      "Most Azure bills contain licences you have already paid for once. Hybrid Benefit is how you stop paying twice.",
    intro:
      "Cloud cost conversations usually start with resizing virtual machines. The larger saving is often sitting in licensing you already own.",
    sections: [
      {
        heading: "What it covers",
        paras: [
          "Organizations with Windows Server or SQL Server licences under Software Assurance can apply those licences to Azure workloads instead of paying the pay-as-you-go rate that bundles the licence in.",
        ],
      },
      {
        heading: "Why it goes unclaimed",
        paras: [
          "It has to be applied per resource, and it is easy to miss on machines created after the initial migration. A periodic review of which workloads have it enabled tends to find some that do not.",
        ],
      },
    ],
    cta: { label: "See Microsoft Azure", href: "/microsoft-azure" },
  },
  {
    slug: "case-for-managed-it",
    title: "The Case for Managed IT: Why In-House Alone Falls Short",
    category: "Managed IT",
    image: "/images/managed_it_hero.png",
    publishedAt: "2026-06-04",
    excerpt:
      "A single internal IT person is a single point of failure, and the role has quietly grown to need several specialisms at once.",
    intro:
      "In-house IT knows your environment and your people, which is genuinely valuable. The difficulty is that the job now spans networking, cloud, security operations, and compliance, and one person cannot hold all of it.",
    sections: [
      {
        heading: "The coverage problem",
        paras: [
          "Holidays, illness, and departures leave gaps that do not coordinate themselves with incidents. Around-the-clock monitoring is difficult to provide with a team that also has to sleep.",
        ],
      },
      {
        heading: "The better arrangement",
        paras: [
          "The strongest setups are not either-or. Internal staff keep the relationships and the institutional knowledge; a managed provider supplies depth, coverage, and the tooling it would not make sense to buy for one site.",
        ],
      },
    ],
    cta: { label: "See Managed IT Services", href: "/managed-it-services" },
  },
  {
    slug: "ransomware-canadian-business",
    title: "Ransomware: What Every Canadian Business Needs to Know",
    category: "Cyber Security",
    image: "/images/cyber_security_hero.png",
    publishedAt: "2026-05-20",
    excerpt:
      "Modern ransomware steals data before encrypting it, which means paying for a decryption key no longer ends the incident.",
    intro:
      "The defining change in ransomware is that encryption is now the second step. Attackers take a copy of the data first, which turns every incident into a disclosure problem as well as an availability one.",
    sections: [
      {
        heading: "Why backups alone stopped being enough",
        paras: [
          "Restoring from backup solves the encryption. It does nothing about the copy the attacker already has, which is what the extortion is now based on. Backups remain essential and are no longer sufficient on their own.",
        ],
      },
      {
        heading: "What reduces the odds",
        paras: [
          "Most intrusions still begin with a phished credential or an unpatched internet-facing service. Multi-factor authentication, disciplined patching, and monitoring that notices unusual data movement address the majority of real-world entry points.",
          "Backups should be tested and held where an attacker with domain access cannot reach them.",
        ],
      },
    ],
    cta: { label: "See SOC & MDR", href: "/security-operations-centre-and-mdr" },
  },
  {
    slug: "what-is-a-virtual-cio",
    title: "What is a Virtual CIO, and Does Your Business Need One?",
    category: "Professional Services",
    image: "/images/professional_services_hero.png",
    publishedAt: "2026-05-06",
    excerpt:
      "A vCIO answers the questions that sit above day-to-day support: what to invest in, in what order, and why.",
    intro:
      "Plenty of organizations have competent IT support and no IT strategy. The gap shows up as reactive spending, renewals that arrive as surprises, and projects chosen by whoever asked most recently.",
    sections: [
      {
        heading: "What the role covers",
        paras: [
          "Budget planning across a multi-year horizon, a technology roadmap tied to business plans rather than product cycles, vendor and renewal management, and risk reporting in terms a board can act on.",
        ],
      },
      {
        heading: "When it makes sense",
        paras: [
          "When technology decisions have started carrying real financial or regulatory weight, but the organization is not large enough to justify a full-time executive hire. Fractional gets you the judgement without the salary.",
        ],
      },
    ],
    cta: { label: "See Virtual CIO", href: "/virtual-cio" },
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

/**
 * Everything that renders a list of posts reads this, so "newest" is decided in
 * one place. Add a post to `posts` with a publishedAt and it appears on the
 * homepage, the blog index, and the related strip in the right position without
 * touching any page.
 */
export const postsByNewest: BlogPost[] = [...posts].sort((a, b) =>
  b.publishedAt.localeCompare(a.publishedAt)
);

/** "2026-08-13" -> "August 2026". Fixed locale so server and client agree. */
export function formatPostDate(iso: string): string {
  const [year, month] = iso.split("-");
  const name = new Date(Date.UTC(Number(year), Number(month) - 1, 1))
    .toLocaleString("en-CA", { month: "long", timeZone: "UTC" });
  return `${name} ${year}`;
}

/** Card shape shared by the homepage, the blog index, and anywhere else. */
export const toCard = (p: BlogPost) => ({
  title: p.title,
  category: p.category,
  image: p.image,
  href: `/blog/${p.slug}`,
});
