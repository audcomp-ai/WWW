"use client";

interface PartnerLogoProps {
  name: string;
  slug?: string;
  domain?: string;
  category: string;
}

export default function PartnerLogo({ name, slug, domain, category }: PartnerLogoProps) {
  let imgSrc = `https://s2.googleusercontent.com/s2/favicons?domain=${domain}&sz=128`;
  
  if (slug === 'microsoft') {
    imgSrc = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23475569'%3E%3Cpath d='M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z'/%3E%3C/svg%3E";
  } else if (slug) {
    imgSrc = `https://cdn.simpleicons.org/${slug}/475569`;
  }

  return (
    <div className="group flex flex-col items-center justify-center bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-lg hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 gap-5">
      <img
        src={imgSrc}
        alt={name}
        className="h-10 w-auto object-contain transition-opacity duration-300 group-hover:opacity-100 opacity-80"
        style={!slug ? { filter: "grayscale(100%)", mixBlendMode: "multiply", opacity: 0.7 } : undefined}
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
