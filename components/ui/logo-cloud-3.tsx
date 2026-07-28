"use client";

import type { ComponentType } from "react";
import { RiMicrosoftFill } from "@remixicon/react";

// Audcomp's partners are enterprise IT vendors; @remixicon/react only ships a
// mark for Microsoft, so the rest resolve to monochrome vectors via simple-icons.
// `Icon` wins when present, else `src`; with neither, the name renders alone.
export type LogoCloudItem = {
  name: string;
  Icon?: ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>;
  src?: string;
};

const MARK = "4a6785"; // --muted-foreground, keeps every mark monochrome

const defaultLogos: LogoCloudItem[] = [
  { name: "Microsoft", Icon: RiMicrosoftFill },
  { name: "Dell", src: `https://cdn.simpleicons.org/dell/${MARK}` },
  { name: "Cisco", src: `https://cdn.simpleicons.org/cisco/${MARK}` },
  { name: "Fortinet", src: `https://cdn.simpleicons.org/fortinet/${MARK}` },
  { name: "Lenovo", src: `https://cdn.simpleicons.org/lenovo/${MARK}` },
  { name: "VMware", src: `https://cdn.simpleicons.org/vmware/${MARK}` },
  { name: "Veeam", src: `https://cdn.simpleicons.org/veeam/${MARK}` },
  { name: "Intel", src: `https://cdn.simpleicons.org/intel/${MARK}` },
  { name: "HP", src: `https://cdn.simpleicons.org/hp/${MARK}` },
  // No simple-icons entry for these three — they render as wordmarks only.
  { name: "Sophos" },
  { name: "Field Effect" },
  { name: "Eaton" },
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
            {[...logos, ...logos].map(({ name, Icon, src }, index) => (
              <div
                key={`${name}-${index}`}
                className="flex shrink-0 items-center gap-2.5 px-8 text-muted-foreground transition-colors duration-200 hover:text-foreground"
                aria-hidden={index >= logos.length ? "true" : undefined}
              >
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
                <span className="text-lg font-semibold tracking-tight whitespace-nowrap">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
