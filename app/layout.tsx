import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export const metadata: Metadata = {
  title: "Your Name - Academic Portfolio",
  description: "Personal academic website showcasing research, projects, and publications",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
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
