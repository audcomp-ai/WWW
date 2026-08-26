// Receives the contact form and mails it on. Until this existed the form had
// no action and no handler, so submitting it did a GET to /contact and the
// visitor's details ended up in their own URL bar and nowhere else.

// Resend's REST API rather than its SDK: one fetch, no new dependency in a
// repo other people are working in, and nothing to keep up to date.
const RESEND_ENDPOINT = "https://api.resend.com/emails";

const TO = process.env.CONTACT_TO_EMAIL || "sales@audcomp.com";
// Must be on a domain verified in Resend, or the send is rejected.
const FROM = process.env.CONTACT_FROM_EMAIL || "website@audcomp.com";

// Caps so a single submission cannot post a novel. Generous for real enquiries.
const LIMITS = { name: 120, email: 200, company: 160, phone: 40, service: 120, message: 5000 };

type Field = keyof typeof LIMITS;

function clean(value: unknown, field: Field) {
  if (typeof value !== "string") return "";
  // Strip control characters, which is what would otherwise let a value break
  // out of the header it lands in. The message keeps its newlines; every other
  // field is a single line, so it loses them too.
  const pattern = field === "message" ? /[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/g : /[\x00-\x1f\x7f]/g;
  return value.replace(pattern, "").trim().slice(0, LIMITS[field]);
}

// Deliberately loose: the aim is to catch typos and reject anything that could
// not be an address, not to adjudicate RFC 5322.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Malformed request." }, { status: 400 });
  }

  // Honeypot. Real people never see this field, so anything in it is a bot.
  // Answer 200 so the bot has no signal that it was caught.
  if (clean(body.website, "name")) return Response.json({ ok: true });

  const name = clean(body.name, "name");
  const email = clean(body.email, "email");
  const company = clean(body.company, "company");
  const phone = clean(body.phone, "phone");
  const service = clean(body.service, "service");
  const message = clean(body.message, "message");

  if (!name || !email || !message) {
    return Response.json({ error: "Name, email and message are required." }, { status: 400 });
  }
  if (!EMAIL.test(email)) {
    return Response.json({ error: "That email address does not look right." }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    // Better a visible failure with a phone number than a form that appears to
    // work and quietly loses the enquiry, which is what used to happen here.
    console.error("[contact] RESEND_API_KEY is not set; cannot send.");
    return Response.json(
      { error: "Our contact form is temporarily unavailable. Please call 905-304-1775 or email sales@audcomp.com." },
      { status: 503 },
    );
  }

  const lines = [
    `Name:    ${name}`,
    `Email:   ${email}`,
    company ? `Company: ${company}` : null,
    phone ? `Phone:   ${phone}` : null,
    service ? `Service: ${service}` : null,
    "",
    message,
  ].filter((l) => l !== null);

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: `Audcomp Website <${FROM}>`,
        to: [TO],
        // Replying in the mail client goes to the enquirer, not to the site.
        reply_to: email,
        subject: `Website enquiry from ${name}${company ? ` (${company})` : ""}`,
        text: lines.join("\n"),
      }),
    });

    if (!res.ok) {
      // Log the provider's reason for us; tell the visitor something useful.
      console.error("[contact] Resend rejected the send:", res.status, await res.text());
      return Response.json(
        { error: "We could not send your message. Please call 905-304-1775 or email sales@audcomp.com." },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("[contact] Send failed:", err);
    return Response.json(
      { error: "We could not send your message. Please call 905-304-1775 or email sales@audcomp.com." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
