# Audcomp Design System

The single source of truth for Audcomp's visual language — for **Wilfred** and for **AI agents**
building on `AudcompWWW`. Read this before adding UI. It mirrors the tokens defined in
`app/globals.css` and the patterns already used across `components/`.

## What this is

A self-contained, framework-agnostic reference. Every preview is a standalone HTML file
(inline CSS, no build step) tagged with a `<!-- @dsCard group="…" -->` marker on its first
line, so it renders as a card in Claude Design's Design System pane and can be pushed to
claude.ai/design with the `/design-sync` skill.

```
design-system/
├── README.md              ← you are here
├── tokens.json            ← machine-readable design tokens (colors, type, spacing, radius)
├── foundations/
│   ├── colors.html        ← brand palette + semantic tokens
│   ├── typography.html    ← type families, scale, gradient text
│   ├── spacing-radius.html← spacing scale + corner radii
│   └── elevation.html     ← shadows, borders, glassmorphism
└── components/
    ├── buttons.html
    ├── badges.html        ← eyebrow labels + pills
    ├── service-cards.html ← light + dark glass variants
    ├── content-cards.html ← blog / news cards
    ├── testimonial-cards.html
    ├── cta-banner.html    ← navy gradient with teal glow
    ├── navbar.html
    ├── footer.html
    └── agent-card.html    ← AI agent profile card (dark)
```

## Brand in one line

**Navy + white + teal.** Calm, trustworthy, enterprise IT — with a confident blue action
color and a teal/sky accent for AI and energy. Apple-adjacent restraint: generous whitespace,
tight tracking on headings, soft shadows, pill buttons, rounded-2xl cards.

## Core tokens (see `tokens.json` for the full set)

| Token | Value | Use |
|-------|-------|-----|
| `--navy` | `#071e3d` | Darkest brand bg (nav, hero, dark sections) |
| `--navy-mid` | `#0d2d55` | Gradient midpoint on dark sections |
| `--foreground` | `#0a2540` | Primary text on light |
| `--primary` | `#0071e3` | Primary action (buttons, links). Hover `#0077ed` |
| `--teal` | `#06b6d4` | Eyebrow labels, accents, AI energy |
| `--sky` | `#38bdf8` | Links/arrows on dark, secondary accent |
| `--muted` | `#f0f7ff` | Section tints, secondary surfaces |
| `--muted-foreground` | `#4a6785` | Secondary text (also `slate-500` in bodies) |
| `--border` | `#dde8f5` | Hairline borders on light |
| `--destructive` | `#ef4444` | Errors only |
| `--radius` | `1rem` | Base radius; cards `rounded-2xl`, buttons `rounded-full` |

## Rules AI agents must follow

1. **Never hardcode a hex that isn't in `tokens.json`.** Use the CSS variables from
   `app/globals.css` (e.g. `text-[#0a2540]`, `bg-[#0071e3]`) exactly as existing components do.
2. **Eyebrow labels** are always teal `#06b6d4`, uppercase, `font-semibold`,
   `tracking-widest`, small (`text-xs`/`text-[11px]`).
3. **Headings** use the display stack, `font-bold`/`font-black`, `tracking-tight`
   (`-0.02em`). On dark gradient sections use `.text-gradient-dark`.
4. **Buttons** are pills (`rounded-full`): primary = solid `#0071e3`; secondary = outline.
   The Agent Studio surface uses squarer `rounded-2xl` + `uppercase font-black tracking-widest`.
5. **Cards** are `rounded-2xl` with a hairline border and soft shadow on light; on dark they
   are glass: `bg-white/[0.06] border border-white/[0.1] backdrop-blur-sm`.
6. **Dark sections** = navy gradient `linear-gradient(135deg,#071e3d,#0d2d55,#071e3d)` with
   subtle teal/blue radial glows. The footer is pure black `#000000`.
7. **Motion** is subtle: `hover:-translate-y-1`, `duration-300`, cubic-bezier
   `[0.25,0.46,0.45,0.94]`. Respect `prefers-reduced-motion` (already handled globally).
8. **Two card variants exist for most components: `light` and `dark`.** Match the section
   background you're placing them on.

## Keeping it in sync

- Tokens live in `app/globals.css` (`:root` + `@theme inline`). This system documents them;
  if you change a token, update both `app/globals.css` and `design-system/tokens.json`.
- To publish to Claude Design: run the `/design-sync` skill (uses the `DesignSync` tool).
  It reads the `@dsCard` markers and uploads each preview as a card. Requires design-system
  authorization (`/design-login`) in an interactive session.
