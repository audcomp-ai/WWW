# Deploying aud_new_website → GitHub + Vercel

This repo was cloned from `hirewilfred/AudcompWWW`, content-rewritten, and is ready to become
`audcomp-ai/aud_new_website` with a fresh Vercel deployment.

## 1. Create the new GitHub repo
On GitHub, under the **audcomp-ai** org, create an **empty** repository named **`aud_new_website`**
(no README, no .gitignore, no license — keep it empty so the push is clean).

## 2. Push this code
From `C:\Users\vgreco\Projects\aud_new_website` (already a git repo with commits):

```bash
git remote remove origin
git remote add origin https://github.com/audcomp-ai/aud_new_website.git
git branch -M main
git push -u origin main
```

Authenticate when prompted (browser sign-in, Git Credential Manager, or a Personal Access Token
with `repo` scope). If your terminal can't prompt, run `gh auth login` first (GitHub CLI).

## 3. Deploy on Vercel
1. Go to **vercel.com → Add New → Project → Import Git Repository**.
2. Select **audcomp-ai/aud_new_website** (authorize Vercel for the org if asked).
3. Framework preset auto-detects **Next.js**. Leave build command / output at defaults.
4. **(Optional) Environment variables** — only needed for the "Claire" AI tool, not the marketing site:
   - `FIRECRAWL_API_KEY`
   - `OPENROUTER_API_KEY`
   - `GITHUB_TOKEN`
5. Click **Deploy**. Vercel returns a live URL like `https://aud-new-website.vercel.app`.

## 4. (Later) Point the real domain
When ready to cut over from the current site, add `audcomp.com` / `www.audcomp.com` under
**Vercel → Project → Settings → Domains** and update DNS.

## Content notes
- All page copy was rewritten per `../audcomp-content/` research. Search the codebase for
  **`[CONFIRM:`** and replace each placeholder with a real figure (or delete that element) before
  going to production — these mark stats that could not be verified and must not be published as-is.
- Nothing about the owner/company was invented; founder, awards, testimonials, and the case study
  are drawn from Audcomp's own live sites.
