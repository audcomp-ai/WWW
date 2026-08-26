// Single source of truth for the Modern Cyber Security Summit (Sept 22, 2026).
// Shared by the events page hero and the /events/security-summit detail page.

export const summit = {
  title: "Modern Cyber Security",
  tagline: "Defending Business in the Age of AI",
  date: "September 22, 2026",
  dateShort: "Sept 22, 2026",
  schedule: "10:30am Reg. · Keynote 11am · Ends 2pm",
  speakerCount: 4,
  // Registration is handled by RSVPify, not by us — the buttons hand off to it.
  rsvpHref: "https://audcompsecuritysummit2026.rsvpify.com",
  // Still offered alongside it, for anyone who would rather write to their
  // Account Manager than fill in a form.
  mailtoHref:
    "mailto:sales@audcomp.com?subject=RSVP%3A%20Modern%20Cyber%20Security%20Summit%20%E2%80%94%20September%2022%2C%202026",
  detailHref: "/events/security-summit",
  // No page links to the .ics any more, but the route still serves it at
  // /events/security-summit/calendar.ics for anything already pointing there.
  // Machine-readable times for that file, in UTC so no VTIMEZONE block
  // is needed. September 22 is EDT in Toronto (UTC-4), so the 10:30am
  // registration above is 14:30Z and the 2pm finish is 18:00Z. If the schedule
  // string changes, these change with it.
  startUtc: "20260922T143000Z",
  endUtc: "20260922T180000Z",
};

export const agenda = [
  { time: "10:30 AM", label: "Registration" },
  { time: "11:00 AM", label: "First Keynote" },
  { time: "12:00 PM", label: "Lunch served" },
  { time: "2:00 PM", label: "Event concludes" },
];

// CountUp renders integers only — decimals (3.4 billion emails/day, 82.6%
// AI-generated) live in the supporting copy instead of these tiles.
export const threatStats = [
  {
    value: 42,
    suffix: "%",
    label: "Rise in ransomware attacks in early 2026",
  },
  {
    value: 89,
    suffix: "%",
    label: "Jump in attacks by AI-enabled adversaries",
  },
  {
    value: 54,
    suffix: "%",
    label: "Click rate on the most convincing AI phishing",
  },
  {
    value: 27,
    suffix: "s",
    label: "Fastest recorded breakout time inside a network",
  },
];

export const reasonsToAttend = [
  "Understand how AI is reshaping cyber crime",
  "See how AI-generated phishing is evading defences",
  "Hear from expert IT Security speakers",
  "Speak one-on-one with Audcomp and our partners",
  "Learn about AI-powered threat detection & response",
  "Explore Multifactor & Zero-Trust security",
  "Strengthen backup & ransomware resilience",
  "Find the right security solutions for your business",
  "Have your voice heard in the interactive panel",
  "Cover your assets and close security gaps",
  "Keep your organization out of the headlines",
  "Connect with peers on what works in IT security",
  "Enjoy a great lunch",
];

export const summitVendors = [
  { name: "Audcomp", slug: undefined, domain: "audcomp.com", category: "Host" },
  { name: "Field Effect", slug: undefined, domain: "fieldeffect.com", category: "Security Specialists" },
  { name: "Hornetsecurity", slug: undefined, logo: "/logos/hornetsecurity-mark.webp", category: "Security Specialists" },
];

export const cooQuote = {
  quote:
    "Cyber criminals are now using AI to attack businesses faster, cheaper and at greater scale than ever before. The good news is that the businesses that stay protected aren't the ones with the biggest budgets. They're the ones with the right layers of defence in place before an attack begins. At Audcomp's Modern Cyber Security event, you'll hear from experts on how to evolve your strategy and simplify your defences for the threats of today and tomorrow.",
  author: "Jon Binkosky",
  title: "COO, Audcomp",
};
