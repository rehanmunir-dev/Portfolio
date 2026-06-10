import type { Metadata } from "next";
import { JetBrains_Mono, Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

const siteUrl = "https://rehanmunir.tech";
const siteTitle = "Rehan Munir | Software Engineer, Frontend Developer & UI/UX Designer";
const siteDescription =
  "Rehan Munir is a software engineer, frontend developer, and UI/UX designer in Islamabad, Pakistan, building modern React, Next.js, TypeScript, Tailwind CSS, and Figma-based web products.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Rehan Munir Portfolio",
  title: {
    default: siteTitle,
    template: "%s | Rehan Munir",
  },
  description: siteDescription,
  keywords: [
    "Rehan Munir",
    "Rehan",
    "Rehan Munir portfolio",
    "rehanmunir.tech",
    "Software Engineer",
    "Software Engineer Pakistan",
    "Software Engineer Islamabad",
    "Frontend Engineer",
    "UI/UX Designer",
    "UI UX Designer",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Tailwind CSS Developer",
    "Web Developer",
    "Website Developer",
    "Full Stack Developer",
    "Portfolio Website",
    "Figma Designer",
    "Product Designer",
    "Web Design",
    "Responsive Web Design",
    "JavaScript Developer",
    "Node.js Developer",
    "Firebase Developer",
    "Supabase Developer",
    "REST API Developer",
    "Design to Code",
    "SaaS Developer",
    "Ecommerce Website Developer",
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Figma",
    "Islamabad",
    "Pakistan",
  ],
  authors: [{ name: "Rehan Munir", url: siteUrl }],
  creator: "Rehan Munir",
  publisher: "Rehan Munir",
  category: "Portfolio",
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "Rehan Munir",
    images: [
      {
        url: "/linkedinn%20banner.png",
        width: 1200,
        height: 630,
        alt: "Rehan Munir software engineer and UI/UX designer portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/linkedinn%20banner.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Rehan Munir",
      url: siteUrl,
      image: `${siteUrl}/profile%20pic.png`,
      jobTitle: "Software Engineer and UI/UX Designer",
      email: "rehanmunir034455@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Islamabad",
        addressCountry: "PK",
      },
      knowsAbout: [
        "Software Engineering",
        "Frontend Development",
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Node.js",
        "UI/UX Design",
        "Figma",
        "Responsive Web Design",
        "Design Systems",
      ],
      sameAs: [
        "https://linkedin.com/in/rehanmunir343",
        "https://github.com/rehanmunir-dev",
        "https://www.behance.net/rehanmunir2",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Rehan Munir Portfolio",
      description: siteDescription,
      publisher: {
        "@id": `${siteUrl}/#person`,
      },
      inLanguage: "en-US",
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#service`,
      name: "Rehan Munir Web Development and UI/UX Design",
      url: siteUrl,
      email: "rehanmunir034455@gmail.com",
      areaServed: "Worldwide",
      founder: {
        "@id": `${siteUrl}/#person`,
      },
      serviceType: [
        "Software Engineering",
        "Frontend Development",
        "Website Development",
        "UI/UX Design",
        "Figma to React Development",
        "Next.js Development",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
        lang="en"
        className={`${montserrat.variable} ${playfair.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
      >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
