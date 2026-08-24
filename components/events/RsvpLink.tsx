"use client";

// RSVP opens a mail draft and hands over the calendar file in the same click,
// so nobody has to notice a second button to end up with the date in their
// diary. The page itself is a server component, so this small piece is the
// only part that ships as client JS.
export default function RsvpLink({
  href,
  calendarHref,
  className,
  children,
}: {
  href: string;
  calendarHref: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => {
        // A mailto hands off to the mail client rather than navigating the
        // page, so this download is not cancelled by the default action.
        // Anchor + click rather than fetch, so the Content-Disposition
        // filename from the route is what gets saved.
        const link = document.createElement("a");
        link.href = calendarHref;
        link.download = "";
        link.rel = "noopener";
        document.body.appendChild(link);
        link.click();
        link.remove();
      }}
    >
      {children}
    </a>
  );
}
