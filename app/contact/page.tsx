import type { Metadata } from "next";
import Hero from "@/components/Hero";

export const metadata: Metadata = {
  title: "Contact Audcomp | IT Support in Hamilton & Ancaster",
  description:
    "Get in touch with Audcomp's IT experts. Call 905-304-1775 or fill out our form to discuss your IT needs.",
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
        title="Get in Touch"
        subtitle="Our team is ready to help. Tell us about your IT needs and we'll respond within one business day."
        bgColor="blue"
      />

      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-[#1a1a2e] mb-8">Contact Information</h2>

            <div className="flex flex-col gap-6">
              <div className="flex gap-4">
                <div className="text-2xl">📍</div>
                <div>
                  <p className="font-semibold text-[#1a1a2e] mb-1">Our Office</p>
                  <p className="text-gray-600 text-sm">611 Tradewind Drive, Suite 100</p>
                  <p className="text-gray-600 text-sm">Ancaster, Ontario</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-2xl">📞</div>
                <div>
                  <p className="font-semibold text-[#1a1a2e] mb-1">Phone</p>
                  <a href="tel:9053041775" className="text-[#0056a8] hover:underline text-sm">
                    905-304-1775
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-2xl">🕐</div>
                <div>
                  <p className="font-semibold text-[#1a1a2e] mb-1">Support Hours</p>
                  <p className="text-gray-600 text-sm">24/7 monitoring and emergency support</p>
                  <p className="text-gray-600 text-sm">Business hours: Mon–Fri, 8am–6pm ET</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-2xl">🇨🇦</div>
                <div>
                  <p className="font-semibold text-[#1a1a2e] mb-1">100% Canadian</p>
                  <p className="text-gray-600 text-sm">All engineers and data centers are Canadian.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-8">
            <h2 className="text-2xl font-bold text-[#1a1a2e] mb-6">Send Us a Message</h2>
            <form className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0056a8] focus:border-transparent"
                    placeholder="Jane Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0056a8] focus:border-transparent"
                    placeholder="jane@company.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="company">
                    Company Name
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0056a8] focus:border-transparent"
                    placeholder="Acme Corp"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0056a8] focus:border-transparent"
                    placeholder="905-555-0100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="service">
                  Service Interest
                </label>
                <select
                  id="service"
                  name="service"
                  className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0056a8] focus:border-transparent bg-white"
                >
                  <option value="">Select a service...</option>
                  {services.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="message">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0056a8] focus:border-transparent resize-none"
                  placeholder="Tell us about your IT environment, current challenges, or what you're looking for..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#0056a8] text-white font-semibold py-3 rounded-md hover:bg-[#003d7a] transition-colors text-sm"
              >
                Send Message
              </button>
              <p className="text-xs text-gray-400 text-center">
                We typically respond within one business day.
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
