import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

// Build an absolute OG image URL when a public site URL is provided via env.
// In dev this will remain a relative path (localhost) which is expected.
const PUBLIC_SITE = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "";
const OG_PATH = "/og-image.png";
const ogImage = PUBLIC_SITE ? new URL(OG_PATH, PUBLIC_SITE).toString() : OG_PATH;

export const metadata: Metadata = {
  title: "<vfilipov/>",
  description: "Personal academic website showcasing research, projects, and publications",
  icons: {
    icon: [
      { url: '/favicon.png' },
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    images: [
      {
        url: ogImage,
        alt: 'Open graph preview',
      },
    ],
    // If we have a public site URL, expose it here; otherwise leave undefined.
    url: PUBLIC_SITE || undefined,
  },
  twitter: {
    card: 'summary_large_image',
    images: [ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
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
      </body>
    </html>
  );
}
