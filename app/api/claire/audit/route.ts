import { NextRequest, NextResponse } from "next/server";

const AUDIT_PROMPT = `You are Claire, an SEO and AEO (Answer Engine Optimization) auditor for Audcomp's website (audcompwww.vercel.app).

You receive page content crawled by Firecrawl in clean markdown format, plus the raw metadata (title, description, headers, links, structured data).

Analyze the given page and return a JSON object with this exact structure:
{
  "url": "/the-page-path",
  "timestamp": "ISO timestamp",
  "scores": {
    "seo": 0-100,
    "aeo": 0-100,
    "content": 0-100,
    "technical": 0-100
  },
  "issues": [
    {"severity": "high|medium|low", "message": "description", "category": "SEO|AEO|Content|Technical"}
  ],
  "suggestions": ["actionable recommendation strings"]
}

SEO scoring criteria: meta tags, heading hierarchy, keyword usage, internal linking, image optimization, mobile-friendliness, page speed indicators, structured data.

AEO scoring criteria: FAQ schema markup, question-based headings, concise answer paragraphs (40-60 words for featured snippets), HowTo schema, speakable markup, entity optimization, conversational query targeting.

Content scoring: readability, content depth, E-E-A-T signals, CTA presence, social proof, unique value proposition.

Technical scoring: valid HTML, accessibility, Core Web Vitals indicators, canonical tags, robots directives, sitemap inclusion.

Return ONLY the JSON object, no markdown formatting.`;

async function crawlWithFirecrawl(url: string) {
  const firecrawlKey = process.env.FIRECRAWL_API_KEY;
  if (!firecrawlKey) return null;

  try {
    const res = await fetch("https://api.firecrawl.dev/v1/scrape", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${firecrawlKey}`,
      },
      body: JSON.stringify({
        url,
        formats: ["markdown", "html"],
        onlyMainContent: false,
        includeTags: ["title", "meta", "h1", "h2", "h3", "h4", "p", "a", "img", "script[type='application/ld+json']", "link[rel='canonical']"],
      }),
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.data || null;
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "ANTHROPIC_API_KEY not configured" }, { status: 500 });
  }

  try {
    const { url } = await req.json();

    const isExternal = url.startsWith("http");
    const pageUrl = isExternal ? url : `https://audcompwww.vercel.app${url}`;

    let pageContent = "";
    let metadata = "";

    const firecrawlData = await crawlWithFirecrawl(pageUrl);

    if (firecrawlData) {
      pageContent = firecrawlData.markdown || "";
      metadata = JSON.stringify({
        title: firecrawlData.metadata?.title || "",
        description: firecrawlData.metadata?.description || "",
        ogTitle: firecrawlData.metadata?.ogTitle || "",
        ogDescription: firecrawlData.metadata?.ogDescription || "",
        statusCode: firecrawlData.metadata?.statusCode,
        links: firecrawlData.links?.slice(0, 50) || [],
      }, null, 2);
      pageContent = pageContent.substring(0, 20000);
    } else {
      try {
        const pageRes = await fetch(pageUrl);
        if (pageRes.ok) {
          pageContent = await pageRes.text();
          pageContent = pageContent.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "");
          pageContent = pageContent.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "");
          pageContent = pageContent.substring(0, 15000);
          metadata = "Fallback: raw HTML fetch (Firecrawl unavailable)";
        }
      } catch {
        pageContent = `Could not fetch page at ${pageUrl}`;
      }
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 2048,
        system: AUDIT_PROMPT,
        messages: [
          {
            role: "user",
            content: `Audit this page: ${url}\n\n## Page Metadata\n${metadata}\n\n## Page Content (Markdown)\n${pageContent}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Audit failed" }, { status: 500 });
    }

    const data = await response.json();
    const text = data.content?.[0]?.text || "{}";

    try {
      const auditResult = JSON.parse(text);
      auditResult.crawlSource = firecrawlData ? "firecrawl" : "fallback";
      return NextResponse.json(auditResult);
    } catch {
      return NextResponse.json({
        url,
        timestamp: new Date().toISOString(),
        scores: { seo: 0, aeo: 0, content: 0, technical: 0 },
        issues: [{ severity: "high" as const, message: "Could not parse audit results", category: "Technical" }],
        suggestions: ["Re-run the audit"],
        crawlSource: firecrawlData ? "firecrawl" : "fallback",
      });
    }
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
