import Link from "next/link";

interface CTABannerProps {
  title?: string;
  subtitle?: string;
}

export default function CTABanner({
  title = "Ready to get started?",
  subtitle = "Talk to our team about how Audcomp can help your business operate more efficiently and securely.",
}: CTABannerProps) {
  return (
    <section className="relative py-32 px-4 overflow-hidden" style={{ background: "linear-gradient(135deg, #071e3d 0%, #0d2d55 50%, #071e3d 100%)" }}>
      {/* Teal radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[400px] rounded-full opacity-20" style={{ background: "radial-gradient(ellipse, #06b6d4 0%, transparent 70%)" }} />
      </div>

      {/* Blue accent glow */}
      <div className="absolute top-0 right-1/4 pointer-events-none">
        <div className="w-[400px] h-[300px] rounded-full opacity-15" style={{ background: "radial-gradient(ellipse, #0071e3 0%, transparent 70%)" }} />
      </div>

      {/* Subtle separator lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />

      <div className="relative max-w-3xl mx-auto text-center">
        <p className="text-xs font-semibold text-[#06b6d4] uppercase tracking-widest mb-5">
          Get started today
        </p>
        <h2 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6 text-gradient-dark">
          {title}
        </h2>
        <p className="text-white/55 text-lg mb-12 leading-relaxed max-w-xl mx-auto">
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium px-8 py-3.5 rounded-full transition-colors duration-200 text-sm"
          >
            Contact Us
          </Link>
          <a
            href="tel:9053041775"
            className="border border-white/25 text-white/75 hover:text-white hover:border-white/50 font-medium px-8 py-3.5 rounded-full transition-all duration-200 text-sm"
          >
            905-304-1775
          </a>
        </div>
      </div>
    </section>
  );
}
