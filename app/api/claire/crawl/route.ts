import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const firecrawlKey = process.env.FIRECRAWL_API_KEY;
  if (!firecrawlKey) {
    return NextResponse.json({ error: "FIRECRAWL_API_KEY not configured" }, { status: 500 });
  }

  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  if (!anthropicKey) {
    return NextResponse.json({ error: "ANTHROPIC_API_KEY not configured" }, { status: 500 });
  }

  try {
    const { url, action } = await req.json();

    if (action === "scrape") {
      const res = await fetch("https://api.firecrawl.dev/v1/scrape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${firecrawlKey}`,
        },
        body: JSON.stringify({
          url,
          formats: ["markdown"],
          onlyMainContent: true,
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        return NextResponse.json({ error: `Firecrawl error: ${err}` }, { status: 500 });
      }

      const data = await res.json();
      return NextResponse.json({
        markdown: data.data?.markdown || "",
        metadata: data.data?.metadata || {},
        links: data.data?.links || [],
      });
    }

    if (action === "map") {
      const res = await fetch("https://api.firecrawl.dev/v1/map", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${firecrawlKey}`,
        },
        body: JSON.stringify({ url }),
      });

      if (!res.ok) {
        const err = await res.text();
        return NextResponse.json({ error: `Firecrawl map error: ${err}` }, { status: 500 });
      }

      const data = await res.json();
      return NextResponse.json({ links: data.links || [] });
    }

    if (action === "competitor-analysis") {
      const scrapeRes = await fetch("https://api.firecrawl.dev/v1/scrape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${firecrawlKey}`,
        },
        body: JSON.stringify({
          url,
          formats: ["markdown"],
          onlyMainContent: true,
        }),
      });

      if (!scrapeRes.ok) {
        return NextResponse.json({ error: "Failed to scrape competitor page" }, { status: 500 });
      }

      const scrapeData = await scrapeRes.json();
      const competitorContent = (scrapeData.data?.markdown || "").substring(0, 15000);
      const competitorMeta = scrapeData.data?.metadata || {};

      const analysisRes = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": anthropicKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 2048,
          system: `You are Claire, Audcomp's Content Marketing Specialist. Analyze this competitor page and return actionable insights for Audcomp. Return JSON with this structure:
{
  "competitor": "company name",
  "url": "the URL",
  "strengths": ["what they do well"],
  "weaknesses": ["gaps we can exploit"],
  "keywords": ["keywords they target"],
  "contentGaps": ["topics they cover that Audcomp doesn't"],
  "recommendations": ["specific actions Audcomp should take"],
  "estimatedWordCount": number,
  "hasStructuredData": boolean,
  "hasFAQ": boolean,
  "contentQualityScore": 0-100
}
Return ONLY JSON, no markdown.`,
          messages: [
            {
              role: "user",
              content: `Analyze this competitor page:\nURL: ${url}\nTitle: ${competitorMeta.title || "Unknown"}\nDescription: ${competitorMeta.description || "None"}\n\nContent:\n${competitorContent}`,
            },
          ],
        }),
      });

      if (!analysisRes.ok) {
        return NextResponse.json({ error: "Analysis failed" }, { status: 500 });
      }

      const analysisData = await analysisRes.json();
      const text = analysisData.content?.[0]?.text || "{}";

      try {
        return NextResponse.json(JSON.parse(text));
      } catch {
        return NextResponse.json({ error: "Could not parse analysis", raw: text }, { status: 500 });
      }
    }

    return NextResponse.json({ error: "Invalid action. Use: scrape, map, or competitor-analysis" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
