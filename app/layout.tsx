import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { ThemeProvider } from "@/contexts/ThemeContext";

const PUBLIC_SITE = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://velitchko.github.io";
const SITE_URL = new URL(PUBLIC_SITE);
const OG_PATH = "/og-image.png";
const ogImage = new URL(OG_PATH, SITE_URL).toString();

export const metadata: Metadata = {
  metadataBase: SITE_URL,
  title: {
    default: "Velitchko Filipov | Visualization Researcher",
    template: "%s | Velitchko Filipov",
  },
  description:
    "Velitchko Filipov is a visualization researcher studying network analysis, visual analytics, and interactive data exploration.",
  keywords: [
    "Velitchko Filipov",
    "Visualization Research",
    "Visual Analytics",
    "Network Visualization",
    "Human-Computer Interaction",
    "Data Visualization",
    "Academic Research",
    "Postdoctoral Researcher",
  ],
  applicationName: "Velitchko Filipov",
  authors: [{ name: "Velitchko Filipov" }],
  creator: "Velitchko Filipov",
  publisher: "Velitchko Filipov",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.png' },
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Velitchko Filipov",
    title: "Velitchko Filipov | Visualization Researcher",
    description:
      "Research on visualization, network analysis, and interactive data exploration.",
    url: SITE_URL.origin,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Velitchko Filipov personal website preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Velitchko Filipov | Visualization Researcher",
    description:
      "Research on visualization, network analysis, and interactive data exploration.",
    images: [ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Prevent flash of unstyled theme — reads localStorage before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('site-theme')||'professional';document.documentElement.setAttribute('data-theme',t);}catch(e){}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Velitchko Filipov',
              jobTitle: 'Postdoctoral Researcher',
              affiliation: {
                '@type': 'Organization',
                name: 'TU Wien',
              },
              url: SITE_URL.origin,
              image: ogImage,
              knowsAbout: [
                'Visualization',
                'Visual Analytics',
                'Network Science',
                'Human-Computer Interaction',
              ],
            }),
          }}
        />
        {/* Syntax highlighting CSS */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css"
        />
        {/* KaTeX CSS for LaTeX math rendering */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"
          integrity="sha384-n8MVd4RsNIU0tAv4ct0nTaAbDJwPJzDEaqSD1odI+WdtXRGWt2kTvGFasHpSy3SV"
          crossOrigin="anonymous"
        />
        {/* GoatCounter analytics (https://www.goatcounter.com) */}
        <script
          data-goatcounter="https://velitchko.goatcounter.com/count"
          async
          src="//gc.zgo.at/count.js"
        ></script>
      </head>
      <body className="crt-screen">
        <ThemeProvider>
          {/* Background geometric shapes */}
          <div className="retro-bg-shapes">
            <div className="shape-1"></div>
            <div className="shape-2"></div>
            <div className="shape-3"></div>
            <div className="shape-4"></div>
            <div className="shape-5"></div>
            <div className="shape-6"></div>
          </div>

          {/* Scanline overlay */}
          <div className="scanlines"></div>

          <Navigation />

          <main className="relative z-10 pt-16">
            {children}
          </main>

          <Footer />

          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
