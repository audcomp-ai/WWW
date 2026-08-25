// The maintenance page is a single self-contained HTML string rather than a
// route under app/. Two reasons: proxy.ts has to return it with a 503 status,
// which a rendered page cannot set, and a maintenance page is most useful
// exactly when the app build is broken, so it should not depend on one.
//
// That means no Tailwind here. Colours are copied from design-system/tokens.json
// and must be changed in both places if the brand palette moves.
const NAVY = "#071e3d";
const TEAL = "#06b6d4";

export const RETRY_AFTER_SECONDS = 1800;

export function maintenanceHtml(): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Back shortly | Audcomp</title>
<style>
  *, *::before, *::after { box-sizing: border-box; }
  html, body { height: 100%; }
  body {
    margin: 0;
    background: ${NAVY};
    color: #ffffff;
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }
  .glow {
    position: fixed;
    top: 50%; left: 50%;
    width: min(700px, 120vw); height: min(360px, 60vh);
    transform: translate(-50%, -60%);
    background: radial-gradient(ellipse, ${TEAL} 0%, transparent 70%);
    opacity: 0.14;
    pointer-events: none;
  }
  main { position: relative; max-width: 560px; text-align: center; }
  .brand {
    font-size: 13px; font-weight: 700; letter-spacing: 0.32em;
    text-transform: uppercase; color: #ffffff; margin: 0 0 40px;
  }
  .eyebrow {
    font-size: 11px; font-weight: 600; letter-spacing: 0.16em;
    text-transform: uppercase; color: ${TEAL}; margin: 0 0 18px;
  }
  h1 {
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif;
    font-size: clamp(30px, 6vw, 46px); font-weight: 700;
    letter-spacing: -0.02em; line-height: 1.1; margin: 0 0 20px;
  }
  p { font-size: 17px; line-height: 1.65; color: rgba(255,255,255,0.62); margin: 0 auto 32px; max-width: 42ch; }
  .divider { width: 40px; height: 2px; background: ${TEAL}; opacity: 0.5; margin: 0 auto 32px; border: 0; }
  .urgent { font-size: 13px; color: rgba(255,255,255,0.45); margin: 0 0 12px; }
  .call {
    display: inline-flex; align-items: center; gap: 10px;
    background: #ffffff; color: ${NAVY};
    font-size: 16px; font-weight: 600; text-decoration: none;
    padding: 14px 30px; border-radius: 999px;
    transition: background 0.2s ease;
  }
  .call:hover { background: #f0f7ff; }
  .call:focus-visible { outline: 3px solid ${TEAL}; outline-offset: 3px; }
  @media (prefers-reduced-motion: no-preference) {
    main { animation: rise 0.5s ease-out both; }
    @keyframes rise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
  }
</style>
</head>
<body>
  <div class="glow" aria-hidden="true"></div>
  <main>
    <p class="brand">Audcomp</p>
    <p class="eyebrow">Scheduled maintenance</p>
    <h1>We are back shortly.</h1>
    <hr class="divider">
    <p>
      The site is down for planned maintenance. Our managed IT, security,
      and cloud services are running normally, and our team is on duty.
    </p>
    <p class="urgent">Need support right now?</p>
    <a class="call" href="tel:+19053041775">Call 905-304-1775</a>
  </main>
</body>
</html>`;
}
