import fs from "node:fs";
import path from "node:path";

// Posts live one-per-file in content/blog. They used to be a single array in
// this file, which was fine while a developer added them by hand: an agent
// appending to a shared 22KB array can break the build for the whole site with
// one malformed edit, whereas a bad standalone file cannot corrupt a good one.
//
// Deliberately free of unverified statistics: where a number would normally
// carry a claim, the copy makes the argument qualitatively instead. A post
// written from a source must cite it, and a number that is not in the cited
// source does not belong in the post.
//
// Read at module scope, so this runs once at build time. Every consumer
// (app/blog, app/blog/[slug], app/page) is a server component, so nothing here
// reaches the browser.

export type BlogSection = { heading: string; paras: string[] };

export type BlogSource = { title: string; url: string };

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
  /** Where the post was written from. Shown on the page. */
  sources?: BlogSource[];
  /** Absent means published: the twelve posts that predate this field are live. */
  published?: boolean;
};

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

function loadPosts(): BlogPost[] {
  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((name) => name.endsWith(".json"));

  return files.map((name) => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, name), "utf8");
    let post: BlogPost;
    try {
      post = JSON.parse(raw) as BlogPost;
    } catch (err) {
      // Fail the build with the filename rather than a bare JSON error, which
      // says nothing about which of a hundred posts is at fault.
      throw new Error(`content/blog/${name} is not valid JSON: ${String(err)}`);
    }

    // The slug is the URL, so a mismatch would route to a page that cannot be
    // found by its own filename.
    const expected = name.replace(/\.json$/, "");
    if (post.slug !== expected) {
      throw new Error(`content/blog/${name} has slug "${post.slug}"; it must match the filename`);
    }
    for (const field of ["title", "category", "image", "publishedAt", "excerpt", "intro"] as const) {
      if (!post[field]) throw new Error(`content/blog/${name} is missing ${field}`);
    }
    if (!Array.isArray(post.sections) || post.sections.length === 0) {
      throw new Error(`content/blog/${name} has no sections`);
    }
    return post;
  });
}

/** Drafts are excluded everywhere, so an unapproved post cannot appear. */
export const posts: BlogPost[] = loadPosts().filter((p) => p.published !== false);

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

/**
 * Everything that renders a list of posts reads this, so "newest" is decided in
 * one place. Add a post to content/blog with a publishedAt and it appears on the
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
