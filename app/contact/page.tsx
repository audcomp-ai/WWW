import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Hero from "@/components/Hero";
import { SectionAngle } from "@/components/SectionAngle";

export const metadata: Metadata = {
  title: "Contact Audcomp | IT Support in Hamilton, Burlington & Niagara",
  description:
    "Get in touch with Audcomp's IT experts serving Hamilton, Burlington, Oakville, London, and Niagara. Call 905-304-1775 or fill out our form.",
};

const services = [
  "Managed IT Services",
  "Cloud Solutions (Microsoft 365, Azure)",
  "Cyber Security",
  "Help Desk Support",
  "Backup & Disaster Recovery",
  "AI Services & Microsoft Copilot",
  "IT Procurement",
  "Professional Services / vCIO",
  "Other",
];

export default function ContactPage() {
  return (
    <>
      <Hero
        title="Talk to Our Specialist Team"
        subtitle="Tell us about your IT environment and challenges. Our team responds within one business day."
        variant="dark"
        backgroundImage="/images/professional_services_hero.png"
      />

      <SectionAngle from="#071e3d" to="#f0f7ff" flip={false} height={64} />

      <section className="bg-muted py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-bold text-foreground mb-8">Contact Information</h2>

            <div className="flex flex-col gap-6">
              <div>
                <p className="font-semibold text-foreground mb-1">Our Office</p>
                <p className="text-muted-foreground text-sm">611 Tradewind Drive, Suite 100</p>
                <p className="text-muted-foreground text-sm">Ancaster, Ontario</p>
              </div>

              <div>
                <p className="font-semibold text-foreground mb-1">Phone</p>
                <a href="tel:9053041775" className="text-primary hover:underline text-sm">
                  905-304-1775
                </a>
              </div>

              <div>
                <p className="font-semibold text-foreground mb-1">Support Hours</p>
                <p className="text-muted-foreground text-sm">24/7 monitoring and emergency support</p>
                <p className="text-muted-foreground text-sm">Business hours: Mon, Fri, 8am, 5pm ET</p>
              </div>

              <div>
                <p className="font-semibold text-foreground mb-1">Based in Canada</p>
                <p className="text-muted-foreground text-sm">All technicians and data centers are Canadian.</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2 bg-card rounded-2xl border border-border shadow-sm p-8">
            <h2 className="text-3xl font-bold text-foreground mb-6">Send Us a Message</h2>
            <ContactForm services={services} />
          </div>
        </div>
      </section>
    </>
  );
}
