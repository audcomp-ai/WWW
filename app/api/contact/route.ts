// Receives the contact form and mails it on. Until this existed the form had
// no action and no handler, so submitting it did a GET to /contact and the
// visitor's details ended up in their own URL bar and nowhere else.

// Sent through Microsoft Graph from Audcomp's own tenant rather than a
// third-party mail service: no new vendor holding enquiry data, and no DNS
// change to let someone else send as audcomp.com. Plain fetch, so there is no
// SDK in the dependency tree to keep current.

const LOGIN_HOST = "https://login.microsoftonline.com";
const GRAPH_HOST = "https://graph.microsoft.com";

const TO = process.env.CONTACT_TO_EMAIL || "sales@audcomp.com";

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

// Graph tokens last about an hour. Holding one for the life of the serverless
// instance saves an auth round trip per enquiry; a cold start just fetches a
// new one. Sixty seconds of headroom so a token cannot expire mid-send.
let cachedToken: { value: string; expiresAt: number } | null = null;

async function getToken(tenant: string, clientId: string, secret: string) {
  if (cachedToken && cachedToken.expiresAt > Date.now()) return cachedToken.value;

  const res = await fetch(`${LOGIN_HOST}/${encodeURIComponent(tenant)}/oauth2/v2.0/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: secret,
      scope: `${GRAPH_HOST}/.default`,
      grant_type: "client_credentials",
    }),
  });

  if (!res.ok) {
    // The body carries the reason (wrong secret, consent not granted) but can
    // also echo the client id, so it stays out of anything the visitor sees.
    throw new Error(`token request failed: ${res.status} ${await res.text()}`);
  }

  const body = (await res.json()) as { access_token: string; expires_in: number };
  cachedToken = {
    value: body.access_token,
    expiresAt: Date.now() + (body.expires_in - 60) * 1000,
  };
  return cachedToken.value;
}

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

  const tenant = process.env.M365_TENANT_ID;
  const clientId = process.env.M365_CLIENT_ID;
  const secret = process.env.M365_CLIENT_SECRET;
  const sender = process.env.M365_SENDER_EMAIL;
  // Graph has to address a user or shared mailbox — sendMail does not exist on a
  // group. Setting from separately lets the mail still appear to come from a
  // group address like ai@audcomp.com, which needs SendAs on that group granted
  // to the sending mailbox. Optional: without it the sending mailbox is the From.
  const fromAddress = process.env.M365_FROM_EMAIL || sender;

  if (!tenant || !clientId || !secret || !sender) {
    // Better a visible failure with a phone number than a form that appears to
    // work and quietly loses the enquiry, which is what used to happen here.
    console.error("[contact] Microsoft 365 credentials are not configured; cannot send.");
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
  ].filter((line) => line !== null);

  const unavailable = Response.json(
    { error: "We could not send your message. Please call 905-304-1775 or email sales@audcomp.com." },
    { status: 502 },
  );

  try {
    const token = await getToken(tenant, clientId, secret);

    const res = await fetch(`${GRAPH_HOST}/v1.0/users/${encodeURIComponent(sender)}/sendMail`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        message: {
          subject: `Website enquiry from ${name}${company ? ` (${company})` : ""}`,
          body: { contentType: "Text", content: lines.join("\n") },
          from: { emailAddress: { address: fromAddress } },
          toRecipients: [{ emailAddress: { address: TO } }],
          // Replying in Outlook goes to the enquirer, not to the site mailbox.
          replyTo: [{ emailAddress: { address: email } }],
        },
        // Keep a copy in the sending mailbox, so there is a record of what went
        // out even if the enquiry never gets answered.
        saveToSentItems: true,
      }),
    });

    // sendMail answers 202 Accepted with an empty body when it works.
    if (!res.ok) {
      console.error("[contact] Graph rejected the send:", res.status, await res.text());
      return unavailable;
    }
  } catch (err) {
    console.error("[contact] Send failed:", err);
    return unavailable;
  }

  return Response.json({ ok: true });
}
