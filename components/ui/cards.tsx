"use client";

import { cn } from "@/lib/utils";

interface BlogCard {
  title: string;
  category: string;
  image: string;
  href?: string;
}

interface BlogCardsProps {
  title?: string;
  subtitle?: string;
  cards?: BlogCard[];
  className?: string;
}

const defaultCards: BlogCard[] = [
  {
    title: "How Microsoft Copilot is Changing the Modern Workspace",
    category: "AI Services",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&h=540&auto=format&fit=crop&q=80",
  },
  {
    title: "Zero Trust Architecture: No Longer Just for Enterprise",
    category: "Cyber Security",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=540&auto=format&fit=crop&q=80",
  },
  {
    title: "Optimizing Your Cloud Spend with Azure Hybrid Benefits",
    category: "Cloud Solutions",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=540&auto=format&fit=crop&q=80",
  },
];

export function BlogCards({
  title = "Latest Insights",
  subtitle = "IT expertise and industry updates from the Audcomp team",
  cards = defaultCards,
  className,
}: BlogCardsProps) {
  return (
    <div className={cn("flex flex-col items-center w-full", className)}>
      <h2 className="text-3xl sm:text-4xl font-bold text-[#0a2540] tracking-tight">{title}</h2>
      <p className="text-sm text-slate-500 mt-3 max-w-lg text-center leading-relaxed">{subtitle}</p>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-8 w-full">
        {cards.map((card) => (
          <a
            key={card.title}
            href={card.href ?? "#"}
            className="group block hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="overflow-hidden rounded-2xl aspect-[4/3]">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src={card.image}
                alt={card.title}
              />
            </div>
            <h3 className="text-base text-[#0a2540] font-semibold mt-4 leading-snug tracking-tight">
              {card.title}
            </h3>
            <p className="text-xs text-[#06b6d4] font-semibold mt-1.5 uppercase tracking-widest">
              {card.category}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
