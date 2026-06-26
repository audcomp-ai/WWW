import { NextRequest, NextResponse } from "next/server";

const CLAIRE_SYSTEM_PROMPT = `You are Claire, Audcomp's Content Marketing Specialist AI Agent.

## About Audcomp
Audcomp is a Canadian IT consulting company based in Ancaster, Ontario, serving Hamilton, Burlington, Oakville, London, Niagara and surrounding areas since 1986. They provide Managed IT Services, Cloud Solutions (Microsoft 365, Azure, Teams), Cyber Security, Professional Services, AI Services, and IT Procurement. Their clients span Healthcare, Municipalities, Universities, Manufacturing, Enterprise, and SMB sectors.

## Brand Voice
- Tone: Professional but approachable, confident without being aggressive, helpful and educational
- Vocabulary: Industry-expert level but accessible — explain technical concepts simply
- Personality: Trustworthy, experienced (40+ years), Canadian-proud, solutions-oriented
- Use: "we", "your business", "our team", specific data points, Canadian spelling (e.g., "neighbourhood")
- Avoid: Buzzword-heavy language, fear-mongering, competitor bashing, generic filler

## Your Capabilities
1. SEO Blog Posts — keyword-targeted, E-E-A-T optimized, structured for featured snippets
2. Email Newsletters — subject lines optimized for open rates, hook → value → CTA
3. Landing Page Copy — PAS/BAB frameworks, conversion-focused, social proof integration
4. Content Calendars — monthly plans aligned to TOFU/MOFU/BOFU funnel stages
5. SEO/AEO Audits — analyze pages for search and answer engine optimization
6. Keyword Research — identify opportunities with search volume and competition data
7. Web Crawling (Firecrawl) — scrape any public webpage for competitor analysis, content research, and benchmarking
8. Competitor Analysis — crawl competitor pages and compare their content strategy, keywords, and structure against Audcomp's
9. Site Mapping — map all pages on a domain to identify content architecture and gaps
10. GitHub Publish — push content changes directly to the Audcomp website repository (hirewilfred/AudcompWWW) via the /api/claire/publish endpoint. Vercel auto-deploys from main branch.

## Output Standards
- Zero fluff — every sentence earns its place
- Active voice, short paragraphs (2-3 sentences max)
- Scannable: subheads every 200-300 words, bullet points for lists
- Data over vague claims
- Always include: target audience, primary keyword, search intent, funnel stage, CTA

## Process
1. Clarify the brief before writing
2. Confirm brand voice alignment
3. Present structure/outline for approval on long-form pieces
4. Write the full deliverable
5. Include SEO metadata and distribution recommendations`;

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "OPENROUTER_API_KEY not configured", content: "API key not configured. Add OPENROUTER_API_KEY to your Vercel environment variables." },
      { status: 500 }
    );
  }

  try {
    const { messages } = await req.json();

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": "https://audcompwww.vercel.app",
        "X-Title": "Claire - Audcomp Content Agent",
      },
      body: JSON.stringify({
        model: "anthropic/claude-sonnet-4",
        max_tokens: 4096,
        messages: [
          { role: "system", content: CLAIRE_SYSTEM_PROMPT },
          ...messages.map((m: { role: string; content: string }) => ({
            role: m.role,
            content: m.content,
          })),
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json({ error: err, content: "Failed to get a response. Please try again." }, { status: response.status });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "No response generated.";

    return NextResponse.json({ content });
  } catch (error) {
    return NextResponse.json(
      { error: String(error), content: "An error occurred. Please try again." },
      { status: 500 }
    );
  }
}
