import Link from "next/link";

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  category?: string;
}

export default function ServiceCard({ title, description, href, category }: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="group block bg-card border-l-4 border-primary rounded-2xl p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
    >
      {category && (
        <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">
          {category}
        </p>
      )}
      <h3 className="text-xl font-bold text-foreground mb-3">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      <span className="text-sm font-semibold text-primary flex items-center gap-1 mt-4 group-hover:gap-2 transition-all">
        Learn more →
      </span>
    </Link>
  );
}
