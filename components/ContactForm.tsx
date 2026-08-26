"use client";

import { useState } from "react";

// The page itself stays a server component; only the form needs state, so only
// the form ships as client JS.

const FIELD =
  "w-full border border-border rounded-md px-4 py-2.5 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent";
const LABEL = "block text-sm font-medium text-foreground mb-1";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm({ services }: { services: string[] }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    // Without this the browser falls back to a GET of this same page, which is
    // exactly what the form used to do: reload, fields in the URL, nothing sent.
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(body.error || "Something went wrong. Please call 905-304-1775.");
        setStatus("error");
        return;
      }
      form.reset();
      setStatus("sent");
    } catch {
      setError("We could not reach the server. Please call 905-304-1775 or email sales@audcomp.com.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="text-center py-10" role="status">
        <p className="text-2xl font-bold text-foreground mb-3">Thanks, we have your message.</p>
        <p className="text-muted-foreground text-sm mb-6">
          It has gone to our team and we typically respond within one business day.
          If it is urgent, call{" "}
          <a href="tel:9053041775" className="text-primary hover:underline">905-304-1775</a>.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-sm font-semibold text-primary hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit} noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={LABEL} htmlFor="name">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input id="name" name="name" type="text" required maxLength={120} autoComplete="name" className={FIELD} placeholder="Jane Smith" />
        </div>
        <div>
          <label className={LABEL} htmlFor="email">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input id="email" name="email" type="email" required maxLength={200} autoComplete="email" className={FIELD} placeholder="jane@company.com" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={LABEL} htmlFor="company">Company Name</label>
          <input id="company" name="company" type="text" maxLength={160} autoComplete="organization" className={FIELD} placeholder="Acme Corp" />
        </div>
        <div>
          <label className={LABEL} htmlFor="phone">Phone Number</label>
          <input id="phone" name="phone" type="tel" maxLength={40} autoComplete="tel" className={FIELD} placeholder="905-555-0100" />
        </div>
      </div>

      <div>
        <label className={LABEL} htmlFor="service">Service Interest</label>
        <select id="service" name="service" className={FIELD}>
          <option value="">Select a service...</option>
          {services.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={LABEL} htmlFor="message">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          maxLength={5000}
          rows={5}
          className={`${FIELD} resize-none`}
          placeholder="Tell us about your IT environment, current challenges, or what you're looking for..."
        />
      </div>

      {/* Honeypot. Hidden from people and from screen readers, so anything that
          fills it is automated. Not `display:none`, which some bots skip. */}
      <div className="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-4 py-3" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="w-full bg-primary text-white font-semibold py-3 rounded-full hover:brightness-110 transition-all shadow-lg text-sm disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {sending ? "Sending..." : "Send Message"}
      </button>
      <p className="text-xs text-muted-foreground text-center">
        We typically respond within one business day.
      </p>
    </form>
  );
}
