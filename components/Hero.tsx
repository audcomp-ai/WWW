import Link from "next/link";

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  bgColor?: "blue" | "dark" | "light";
}

export default function Hero({
  title,
  subtitle,
  ctaText,
  ctaHref,
  secondaryCtaText,
  secondaryCtaHref,
  bgColor = "blue",
}: HeroProps) {
  const bgClass =
    bgColor === "blue"
      ? "bg-[#0056a8]"
      : bgColor === "dark"
      ? "bg-[#1a1a2e]"
      : "bg-[#e8f0fe]";

  const textClass =
    bgColor === "light" ? "text-[#1a1a2e]" : "text-white";

  const subtitleClass =
    bgColor === "light" ? "text-gray-600" : "text-blue-100";

  return (
    <section className={`${bgClass} ${textClass} py-20 px-4`}>
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
          {title}
        </h1>
        <p className={`text-lg sm:text-xl ${subtitleClass} mb-8 max-w-2xl mx-auto leading-relaxed`}>
          {subtitle}
        </p>
        {(ctaText || secondaryCtaText) && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {ctaText && ctaHref && (
              <Link
                href={ctaHref}
                className={`px-8 py-3 rounded-md font-semibold text-sm transition-colors ${
                  bgColor === "light"
                    ? "bg-[#0056a8] text-white hover:bg-[#003d7a]"
                    : "bg-white text-[#0056a8] hover:bg-gray-100"
                }`}
              >
                {ctaText}
              </Link>
            )}
            {secondaryCtaText && secondaryCtaHref && (
              <Link
                href={secondaryCtaHref}
                className={`px-8 py-3 rounded-md font-semibold text-sm border-2 transition-colors ${
                  bgColor === "light"
                    ? "border-[#0056a8] text-[#0056a8] hover:bg-[#0056a8] hover:text-white"
                    : "border-white text-white hover:bg-white hover:text-[#0056a8]"
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
