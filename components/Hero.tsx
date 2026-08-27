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
  backgroundImage?: string;
  /** mp4 played muted and looping behind the hero. backgroundImage is its poster. */
  backgroundVideo?: string;
  /** optional webm, offered first because it is usually the smaller file */
  backgroundVideoWebm?: string;
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
  backgroundImage,
  backgroundVideo,
  backgroundVideoWebm,
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

  const hasMedia = !!backgroundImage || !!backgroundVideo;
  const isDark = resolved === "dark" || hasMedia;

  return (
    <section
      className={`relative overflow-hidden ${!hasMedia && isDark ? "bg-[#181E2C]" : !hasMedia ? "bg-white" : ""} py-32 md:py-40 px-4`}
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
    >
      {backgroundVideo && (
        // Decoration: the headline already carries the meaning, so it is hidden
        // from assistive tech. globals.css drops it under prefers-reduced-motion
        // and the poster underneath takes over.
        <video
          className="hero-video absolute inset-0 w-full h-full object-cover z-0"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={backgroundImage}
          aria-hidden="true"
        >
          {backgroundVideoWebm && <source src={backgroundVideoWebm} type="video/webm" />}
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      )}
      {hasMedia && (
        // A still takes one flat scrim. Footage takes a lighter one plus the
        // same radial bed the home carousel uses, because a bright frame can
        // drift under the subtitle and a flat scrim dark enough to fix that
        // would flatten the whole shot.
        <div className={`absolute inset-0 z-0 ${backgroundVideo ? "bg-[#071e3d]/45" : "bg-[#181E2C]/80"}`}></div>
      )}
      {backgroundVideo && (
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_150%_46%_at_50%_50%,rgba(7,30,61,0.93)_0%,rgba(7,30,61,0.74)_54%,transparent_88%)] sm:bg-[radial-gradient(ellipse_75%_58%_at_50%_50%,rgba(7,30,61,0.86)_0%,rgba(7,30,61,0.58)_56%,transparent_86%)]"></div>
      )}
      <div className="relative max-w-6xl mx-auto text-center z-10">
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
