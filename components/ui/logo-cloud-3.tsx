"use client";

import type { ComponentType } from "react";

// Audcomp's partners are enterprise IT vendors. Colored brand glyphs come from
// simple-icons' CDN, which serves each mark in its official brand color by
// default. `Icon` wins when present, else `src`; brands with no icon-library
// entry fall back to a wordmark tinted with `color`.
export type LogoCloudItem = {
  name: string;
  Icon?: ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>;
  src?: string;
  color?: string;
  // Full wordmark logo — rendered on its own, replacing the glyph + text.
  wordmark?: string;
};

// Microsoft was removed from simple-icons over branding policy, so its 4-color
// mark is inlined here.
function MicrosoftMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#F25022" d="M1 1h10v10H1z" />
      <path fill="#7FBA00" d="M13 1h10v10H13z" />
      <path fill="#00A4EF" d="M1 13h10v10H1z" />
      <path fill="#FFB900" d="M13 13h10v10H13z" />
    </svg>
  );
}

const defaultLogos: LogoCloudItem[] = [
  { name: "Microsoft", Icon: MicrosoftMark },
  { name: "Dell", src: "https://cdn.simpleicons.org/dell" },
  { name: "Cisco", src: "https://cdn.simpleicons.org/cisco" },
  { name: "Fortinet", src: "https://cdn.simpleicons.org/fortinet" },
  { name: "Lenovo", src: "https://cdn.simpleicons.org/lenovo" },
  { name: "VMware", src: "https://cdn.simpleicons.org/vmware" },
  { name: "Veeam", src: "https://cdn.simpleicons.org/veeam" },
  { name: "Intel", src: "https://cdn.simpleicons.org/intel" },
  { name: "HP", src: "https://cdn.simpleicons.org/hp" },
  // No simple-icons entry — wordmark tinted with the brand's primary color.
  { name: "Sophos", src: "/logos/sophos.svg" },
  { name: "Field Effect", src: "/logos/field-effect.svg" },
  { name: "Eaton", wordmark: "/logos/eaton.svg" },
];

export default function LogoCloudBlock({
  logos = defaultLogos,
  eyebrow = "Powered by the industry's leading vendors",
  className,
}: {
  logos?: LogoCloudItem[];
  eyebrow?: string;
  className?: string;
}) {
  return (
    <section
      className={`flex w-full flex-col items-center bg-background px-6 py-20 text-foreground ${className ?? ""}`}
    >
      <style>{`
        @keyframes logo-cloud-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .logo-cloud-track {
          animation: logo-cloud-marquee 32s linear infinite;
        }
        .logo-cloud-mask:hover .logo-cloud-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .logo-cloud-track {
            animation: none;
          }
        }
      `}</style>

      <div className="w-full max-w-5xl text-center">
        <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
          {eyebrow}
        </p>

        <div className="logo-cloud-mask relative mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <div className="logo-cloud-track flex w-max items-center">
            {[...logos, ...logos].map(({ name, Icon, src, color, wordmark }, index) => (
              <div
                key={`${name}-${index}`}
                className="flex shrink-0 items-center gap-2.5 px-8 opacity-90 transition-opacity duration-200 hover:opacity-100"
                aria-hidden={index >= logos.length ? "true" : undefined}
              >
                {wordmark ? (
                  <img
                    src={wordmark}
                    alt={name}
                    loading="lazy"
                    className="h-6 w-auto object-contain"
                  />
                ) : (
                  <>
                    {Icon ? (
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    ) : src ? (
                      <img
                        src={src}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        className="h-6 w-6 object-contain"
                      />
                    ) : null}
                    <span
                      className="text-lg font-semibold tracking-tight whitespace-nowrap text-foreground"
                      style={color ? { color } : undefined}
                    >
                      {name}
                    </span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
