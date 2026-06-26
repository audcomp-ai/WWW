import type { Metadata } from "next";
import { Arimo, Open_Sans } from "next/font/google";
import "./globals.css";
import SiteShell from "@/components/SiteShell";

const arimo = Arimo({
  subsets: ["latin"],
  variable: "--font-arimo",
  weight: ["400", "500", "600", "700"],
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Audcomp | Trusted IT Consulting Services in Canada",
  description:
    "Audcomp empowers businesses to operate confidently and more efficiently by providing tailored IT solutions. Serving Hamilton, Burlington, Oakville, London, Niagara, and surrounding areas since 1986.",
  openGraph: {
    title: "Audcomp | Trusted IT Consulting Services",
    description: "Tailored IT solutions for businesses in Hamilton, Burlington, Oakville, London, and Niagara.",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Audcomp",
  "image": "https://www.audcomp.com/audcomp-logo.png",
  "telephone": "905-304-1775",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "611 Tradewind Drive, Suite 100",
    "addressLocality": "Ancaster",
    "addressRegion": "ON",
    "addressCountry": "CA"
  },
  "areaServed": [
    "Hamilton",
    "Burlington",
    "Oakville",
    "London",
    "Niagara",
    "Ancaster"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${arimo.variable} ${openSans.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
