import { summit } from "@/data/security-summit";

// Serves the summit as a downloadable .ics. Generated from the same `summit`
// object the page renders, so the invite cannot drift from the advertised date.

// RFC 5545 escaping for TEXT values: backslash, semicolon and comma are
// literal-escaped, and newlines become \n.
function escapeText(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

// Content lines are limited to 75 octets; longer ones continue on the next
// line prefixed with a single space. Outlook tolerates unfolded lines, but
// stricter parsers do not.
function fold(line: string) {
  const bytes = Buffer.from(line, "utf8");
  if (bytes.length <= 75) return line;
  const out: string[] = [];
  let start = 0;
  while (start < bytes.length) {
    const limit = out.length === 0 ? 75 : 74;
    let end = Math.min(start + limit, bytes.length);
    // Don't split a multi-byte character across the fold.
    while (end > start && end < bytes.length && (bytes[end] & 0xc0) === 0x80) end--;
    out.push((out.length === 0 ? "" : " ") + bytes.subarray(start, end).toString("utf8"));
    start = end;
  }
  return out.join("\r\n");
}

export const dynamic = "force-static";

export function GET() {
  const name = `${summit.title} Summit`;
  const description = `${summit.tagline}. ${summit.schedule}. RSVP with your Audcomp account manager at sales@audcomp.com or 905-304-1775.`;

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Audcomp//Events//EN",
    "CALSCALE:GREGORIAN",
    // PUBLISH rather than REQUEST: this is a file someone downloads, not an
    // invitation addressed to them, so no attendee handling is implied.
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    "UID:modern-cyber-security-summit-2026@audcomp.com",
    // No fractional seconds, and Z throughout — the times are already UTC.
    `DTSTAMP:${summit.startUtc}`,
    `DTSTART:${summit.startUtc}`,
    `DTEND:${summit.endUtc}`,
    `SUMMARY:${escapeText(name)}`,
    `DESCRIPTION:${escapeText(description)}`,
    `URL:https://dev.audcomp.ai${summit.detailHref}`,
    "ORGANIZER;CN=Audcomp:mailto:sales@audcomp.com",
    "STATUS:CONFIRMED",
    "TRANSP:OPAQUE",
    // A day-before nudge, which is what most people want from a save-the-date.
    "BEGIN:VALARM",
    "TRIGGER:-P1D",
    "ACTION:DISPLAY",
    `DESCRIPTION:${escapeText(name)} is tomorrow`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  // CRLF is required by the spec, and Outlook is one of the parsers that cares.
  const body = lines.map(fold).join("\r\n") + "\r\n";

  return new Response(body, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition":
        'attachment; filename="modern-cyber-security-summit.ics"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
