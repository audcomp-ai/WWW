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
    <section className="bg-primary py-20 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-4">{title}</h2>
        <p className="text-orange-100 text-lg mb-10">{subtitle}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="bg-white text-primary font-semibold px-8 py-4 rounded-full hover:brightness-95 transition-all shadow-sm"
          >
            Contact Us
          </Link>
          <a
            href="tel:9053041775"
            className="border-2 border-white text-white font-semibold px-8 py-4 rounded-full hover:bg-white hover:text-primary transition-all"
          >
            905-304-1775
          </a>
        </div>
      </div>
    </section>
  );
}
