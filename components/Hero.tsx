import Link from "next/link";

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  variant?: "dark" | "light";
  /** @deprecated use variant instead */
  bgColor?: "blue" | "dark" | "light";
}

export default function Hero({
  title,
  subtitle,
  ctaText,
  ctaHref,
  secondaryCtaText,
  secondaryCtaHref,
  variant,
  bgColor,
}: HeroProps) {
  // Resolve variant: new `variant` prop takes priority, then fall back to legacy `bgColor`
  const resolved: "dark" | "light" =
    variant === "light"
      ? "light"
      : variant === "dark"
      ? "dark"
      : bgColor === "light"
      ? "light"
      : "dark"; // blue and dark both map to dark navy

  const isDark = resolved === "dark";

  return (
    <section
      className={`${isDark ? "bg-[#181E2C]" : "bg-white"} py-32 md:py-40 px-4`}
    >
      <div className="max-w-6xl mx-auto text-center">
        <h1
          className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-8 ${
            isDark ? "text-white" : "text-foreground"
          }`}
        >
          {title}
        </h1>
        <p
          className={`text-xl leading-relaxed mb-10 max-w-2xl mx-auto ${
            isDark ? "text-gray-400" : "text-muted-foreground"
          }`}
        >
          {subtitle}
        </p>
        {(ctaText || secondaryCtaText) && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {ctaText && ctaHref && (
              <Link
                href={ctaHref}
                className="bg-primary text-white font-semibold px-8 py-4 rounded-full hover:brightness-110 transition-all shadow-md"
              >
                {ctaText}
              </Link>
            )}
            {secondaryCtaText && secondaryCtaHref && (
              <Link
                href={secondaryCtaHref}
                className={`font-semibold px-8 py-4 rounded-full border-2 transition-all ${
                  isDark
                    ? "border-white text-white hover:bg-white hover:text-[#181E2C]"
                    : "border-[#181E2C] text-[#181E2C] hover:bg-[#181E2C] hover:text-white"
                }`}
              >
                {secondaryCtaText}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
