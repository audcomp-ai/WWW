import Link from "next/link";

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  category?: string;
  variant?: "light" | "dark";
}

export default function ServiceCard({
  title,
  description,
  href,
  category,
  variant = "light",
}: ServiceCardProps) {
  if (variant === "dark") {
    return (
      <Link
        href={href}
        className="group relative block rounded-2xl p-px overflow-hidden"
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.12] to-white/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative rounded-2xl bg-white/[0.06] border border-white/[0.1] p-7 h-full backdrop-blur-sm transition-all duration-300 group-hover:bg-white/[0.1] group-hover:border-white/[0.18]">
          {category && (
            <span className="text-[11px] font-semibold text-[#06b6d4] uppercase tracking-widest mb-5 block">
              {category}
            </span>
          )}
          <h3 className="text-base font-semibold text-white mb-3 tracking-tight">{title}</h3>
          <p className="text-sm text-white/55 leading-relaxed mb-5">{description}</p>
          <span className="inline-flex items-center gap-1.5 text-sm text-[#38bdf8]">
            Learn more
            <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="group block bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-blue-200 transition-all duration-300"
    >
      {category && (
        <span className="text-[11px] font-semibold text-[#06b6d4] uppercase tracking-widest mb-5 block">
          {category}
        </span>
      )}
      <h3 className="text-base font-semibold text-[#0a2540] mb-3 tracking-tight">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed mb-5">{description}</p>
      <span className="inline-flex items-center gap-1.5 text-sm text-[#0071e3] font-medium">
        Learn more
        <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </Link>
  );
}
