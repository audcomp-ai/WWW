import Link from "next/link";

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  href: string;
}

export default function ServiceCard({ icon, title, description, href }: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="group block bg-white border border-gray-200 rounded-xl p-6 hover:border-[#0056a8] hover:shadow-lg transition-all duration-200"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-[#1a1a2e] mb-2 group-hover:text-[#0056a8] transition-colors">
        {title}
      </h3>
      <p className="text-sm text-gray-600 leading-relaxed mb-4">{description}</p>
      <span className="text-sm font-medium text-[#0056a8] flex items-center gap-1">
        Learn more
        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </Link>
  );
}
