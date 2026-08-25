import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { maintenanceHtml, RETRY_AFTER_SECONDS } from "@/lib/maintenance-page";

// Next 16 renamed the middleware file convention to proxy, and the exported
// function with it. See node_modules/next/dist/docs/01-app/03-api-reference/
// 03-file-conventions/proxy.md.

const BYPASS_COOKIE = "aud-maintenance-bypass";

// Assets are still served while the site is down, so a browser that has the
// page cached does not render it unstyled, and so a status page or uptime
// check can still fetch a favicon.
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images/|logos/|.*\\.(?:png|jpg|jpeg|webp|svg|ico|mp4|woff2?)$).*)"],
};

function servePage(status: number): Response {
  const headers: Record<string, string> = {
    "content-type": "text/html; charset=utf-8",
    // Never let a CDN or browser hold on to this once the site is back.
    "cache-control": "no-store, must-revalidate",
  };
  if (status === 503) {
    // Tells crawlers this is temporary so the pages are not dropped from the
    // index. A 200 here would get the maintenance copy indexed instead.
    headers["retry-after"] = String(RETRY_AFTER_SECONDS);
  }
  return new Response(maintenanceHtml(), { status, headers });
}

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Always viewable, so the page can be checked without taking the site down.
  if (pathname === "/maintenance") return servePage(200);

  if (process.env.MAINTENANCE_MODE !== "1") return NextResponse.next();

  // A bypass lets the team confirm the real site while visitors see the notice.
  // This gates a preview, not private data: treat the token as a convenience,
  // not a credential.
  const token = process.env.MAINTENANCE_BYPASS_TOKEN;
  if (token) {
    if (searchParams.get("bypass") === token) {
      const response = NextResponse.next();
      response.cookies.set(BYPASS_COOKIE, token, {
        httpOnly: true,
        sameSite: "lax",
        secure: true,
        path: "/",
        maxAge: 60 * 60 * 8,
      });
      return response;
    }
    if (request.cookies.get(BYPASS_COOKIE)?.value === token) {
      return NextResponse.next();
    }
  }

  return servePage(503);
}
