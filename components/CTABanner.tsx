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
    <section className="bg-[#0056a8] py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-4">{title}</h2>
        <p className="text-blue-100 text-lg mb-8">{subtitle}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="bg-white text-[#0056a8] font-semibold px-8 py-3 rounded-md hover:bg-gray-100 transition-colors"
          >
            Contact Us
          </Link>
          <a
            href="tel:9053041775"
            className="border-2 border-white text-white font-semibold px-8 py-3 rounded-md hover:bg-white hover:text-[#0056a8] transition-colors"
          >
            905-304-1775
          </a>
        </div>
      </div>
    </section>
  );
}
