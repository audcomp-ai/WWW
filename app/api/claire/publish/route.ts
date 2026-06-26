import { NextRequest, NextResponse } from "next/server";

const GITHUB_REPO = "hirewilfred/AudcompWWW";

interface GitHubFile {
  path: string;
  content: string;
  message?: string;
}

async function getFileSha(token: string, path: string): Promise<string | null> {
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/contents/${path}`,
    { headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github.v3+json" } }
  );
  if (!res.ok) return null;
  const data = await res.json();
  return data.sha || null;
}

export async function POST(req: NextRequest) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "GITHUB_TOKEN not configured. Add it to your Vercel environment variables." },
      { status: 500 }
    );
  }

  try {
    const { files, commitMessage } = (await req.json()) as {
      files: GitHubFile[];
      commitMessage: string;
    };

    if (!files?.length || !commitMessage) {
      return NextResponse.json(
        { error: "Request must include `files` array and `commitMessage`." },
        { status: 400 }
      );
    }

    const results: { path: string; status: string; url?: string }[] = [];

    for (const file of files) {
      const sha = await getFileSha(token, file.path);
      const body: Record<string, string> = {
        message: file.message || commitMessage,
        content: Buffer.from(file.content).toString("base64"),
      };
      if (sha) body.sha = sha;

      const res = await fetch(
        `https://api.github.com/repos/${GITHUB_REPO}/contents/${file.path}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github.v3+json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (res.ok) {
        const data = await res.json();
        results.push({
          path: file.path,
          status: sha ? "updated" : "created",
          url: data.content?.html_url,
        });
      } else {
        const err = await res.text();
        results.push({ path: file.path, status: `failed: ${err}` });
      }
    }

    const succeeded = results.filter((r) => r.status !== "failed");
    return NextResponse.json({
      success: succeeded.length === files.length,
      committed: succeeded.length,
      total: files.length,
      results,
      repoUrl: `https://github.com/${GITHUB_REPO}`,
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
