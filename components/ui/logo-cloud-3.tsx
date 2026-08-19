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
  // Measured ink width / ink height of the mark. Aspects here run from 1:1
  // glyphs to Unitrends' 11:1 letterspaced word, so sizing is derived from this
  // rather than hardcoded per brand — see `markSize`.
  aspect?: number;
  // Measured share of that box the mark's ink actually fills. Lenovo's solid red
  // block is ~1.0; ConnectWise's hairline swoosh is ~0.15, so the two need very
  // different sizes to carry the same weight.
  ink?: number;
};

// Sizing every mark to one height makes wide wordmarks tower over square
// glyphs; one width does the reverse. Height is derived from the two measured
// properties instead:
//   aspect^-0.4 — between "equal height" (0) and "equal bounding-box area"
//                 (0.5), so an 11:1 wordmark shrinks without going illegible.
//   ink^-0.2    — clamped, so a solid block doesn't outshout a hairline mark.
const MARK_HEIGHT = 33;
const ASPECT_DAMPING = 0.4;
const INK_DAMPING = 0.2;
const INK_REFERENCE = 0.4;
const INK_SCALE_MIN = 0.85;
const INK_SCALE_MAX = 1.12;
const LOCKUP_GLYPH_HEIGHT = 24;

function markSize({ aspect = 1, ink = INK_REFERENCE }: Pick<LogoCloudItem, "aspect" | "ink">) {
  const inkScale = Math.min(
    INK_SCALE_MAX,
    Math.max(INK_SCALE_MIN, (INK_REFERENCE / ink) ** INK_DAMPING),
  );
  const height = (MARK_HEIGHT / aspect ** ASPECT_DAMPING) * inkScale;
  return { height: `${height.toFixed(1)}px`, width: `${(height * aspect).toFixed(1)}px` };
}

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

const infrastructureLogos: LogoCloudItem[] = [
  { name: "Microsoft", Icon: MicrosoftMark },
  { name: "Dell", src: "https://cdn.simpleicons.org/dell" },
  { name: "Cisco", wordmark: "/logos/cisco.svg", aspect: 1.9, ink: 0.24 },
  { name: "Fortinet", src: "https://cdn.simpleicons.org/fortinet" },
  { name: "Lenovo", wordmark: "/logos/lenovo.svg", aspect: 3.0, ink: 1.0 },
  { name: "VMware", wordmark: "/logos/vmware.svg", aspect: 6.55, ink: 0.43 },
  { name: "Veeam", wordmark: "/logos/veeam.svg", aspect: 3.32, ink: 0.98 },
  { name: "Intel", wordmark: "/logos/intel.svg", aspect: 1.51, ink: 0.3 },
  { name: "HP", src: "https://cdn.simpleicons.org/hp" },
  // No simple-icons entry — wordmark tinted with the brand's primary color.
  { name: "Sophos", src: "/logos/sophos.svg" },
  { name: "Field Effect", src: "/logos/field-effect.svg" },
  { name: "Eaton", wordmark: "/logos/eaton.svg", aspect: 3.78, ink: 0.57 },
];

const managedServiceLogos: LogoCloudItem[] = [
  { name: "ConnectWise", wordmark: "/logos/connectwise.svg", aspect: 6.45, ink: 0.15 },
  { name: "Bitdefender", wordmark: "/logos/bitdefender.svg", aspect: 6.8, ink: 0.39 },
  { name: "Unitrends", wordmark: "/logos/unitrends.svg", aspect: 11.2, ink: 0.38 },
  { name: "Datto", wordmark: "/logos/datto.svg", aspect: 3.04, ink: 0.43 },
  { name: "Aruba", wordmark: "/logos/aruba.svg", aspect: 3.95, ink: 0.4 },
  { name: "HPE", wordmark: "/logos/hpe.svg", aspect: 3.4, ink: 0.48 },
  { name: "Barracuda", wordmark: "/logos/barracuda.svg", aspect: 4.21, ink: 0.19 },
  { name: "Hornetsecurity", src: "/logos/hornetsecurity.webp", aspect: 1.55 },
];

const defaultRows: LogoCloudItem[][] = [infrastructureLogos, managedServiceLogos];

function LogoRow({ logos, reverse }: { logos: LogoCloudItem[]; reverse?: boolean }) {
  return (
    <div className="logo-cloud-mask relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <div className={`logo-cloud-track flex w-max items-center ${reverse ? "logo-cloud-track--reverse" : ""}`}>
        {[...logos, ...logos].map(({ name, Icon, src, color, wordmark, aspect, ink }, index) => (
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
                style={markSize({ aspect, ink })}
                className="object-contain"
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
                    style={{
                      height: `${LOCKUP_GLYPH_HEIGHT}px`,
                      width: `${LOCKUP_GLYPH_HEIGHT * (aspect ?? 1)}px`,
                    }}
                    className="object-contain"
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
  );
}

export default function LogoCloudBlock({
  rows = defaultRows,
  eyebrow = "Powered by the industry's leading vendors",
  className,
}: {
  rows?: LogoCloudItem[][];
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
        .logo-cloud-track--reverse {
          animation-duration: 38s;
          animation-direction: reverse;
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

        <div className="mt-10 flex flex-col gap-8">
          {rows.map((logos, index) => (
            <LogoRow key={index} logos={logos} reverse={index % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
