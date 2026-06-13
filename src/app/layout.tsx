import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageTracker } from "@/components/page-tracker";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "VASP Systemic - AI & IoT Solutions for Railway Operations",
    template: "%s | VASP Systemic",
  },
  description:
    "VASP Systemic delivers enterprise-grade AI, IoT, and safety solutions for Indian Railways, Metro Rail, and Government Infrastructure organizations.",
  keywords: [
    "Railway Technology",
    "AI Railway Solutions",
    "IoT Railway Monitoring",
    "Predictive Maintenance",
    "Railway Safety Systems",
    "Indian Railways",
    "Metro Rail Technology",
    "Smart Infrastructure",
    "Industrial IoT",
    "VASP Systemic",
  ],
  authors: [{ name: "VASP Systemic" }],
  creator: "VASP Systemic",
  publisher: "VASP Systemic",
  metadataBase: new URL("https://vaspsystemic.com"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "VASP Systemic",
    title: "VASP Systemic - AI & IoT Solutions for Railway Operations",
    description:
      "Building India's Intelligent Railway Operations Ecosystem with AI, IoT, and Safety solutions.",
    url: "https://vaspsystemic.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "VASP Systemic - AI & IoT Solutions for Railway Operations",
    description:
      "Building India's Intelligent Railway Operations Ecosystem with AI, IoT, and Safety solutions.",
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    shortcut: "/favicon.png",
    apple: "/vasplogogo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <link rel="canonical" href="https://vaspsystemic.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "VASP Systemic",
              url: "https://vaspsystemic.com",
              email: "vaspsystemic@gmail.com",
              description:
                "AI and IoT solutions for railway operations, predictive maintenance, and safety systems.",
              industry: ["Railway Technology", "Artificial Intelligence", "Industrial IoT"],
              foundingDate: "2024",
              contactPoint: {
                "@type": "ContactPoint",
                email: "vaspsystemic@gmail.com",
                contactType: "sales",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <PageTracker />
      </body>
    </html>
  );
}
