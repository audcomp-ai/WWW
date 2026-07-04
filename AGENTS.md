<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Design System

Before building or changing UI, read `design-system/README.md`. It is the single source of
truth for Audcomp's visual language — **navy + white + teal** — with the full token set in
`design-system/tokens.json` and rendered component references under `design-system/`.
Tokens mirror `app/globals.css`; if you change a token, update both files. Do not introduce
colors, radii, or type styles that aren't in the system.
