"use client";

interface PartnerLogoProps {
  name: string;
  domain: string;
  category: string;
}

export default function PartnerLogo({ name, domain, category }: PartnerLogoProps) {
  return (
    <div className="group flex flex-col items-center justify-center bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-lg hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 gap-5">
      <img
        src={`https://logo.clearbit.com/${domain}`}
        alt={name}
        className="h-10 w-auto object-contain"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
        }}
      />
      <div className="text-center">
        <p className="font-semibold text-[#0a2540] text-sm">{name}</p>
        <p className="text-xs text-slate-400 mt-0.5">{category}</p>
      </div>
    </div>
  );
}
