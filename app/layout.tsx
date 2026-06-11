import type { Metadata } from "next";
import { Arimo, Open_Sans } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

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
    "Audcomp empowers businesses to operate confidently and more efficiently by providing tailored IT solutions. Serving Hamilton, Ancaster, and beyond since 1986.",
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
      </head>
      <body className="min-h-full flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
