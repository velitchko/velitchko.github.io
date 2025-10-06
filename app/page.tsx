'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import PublicationCard from '@/components/PublicationCard';
import { publications, groupPublicationsByYear } from '@/data/publications';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden grid-bg">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-purple/5 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center relative z-10">
          <div className="vhs-lines">
            <h1
              className={`text-4xl sm:text-6xl lg:text-6xl font-retro neon-glow-cyan mb-8 ${mounted ? 'glitch' : ''}`}
              data-text="velitchko filipov"
            >
              velitchko filipov
            </h1>

            <div className="text-xl sm:text-2xl text-neon-pink neon-glow-pink font-mono mb-8">
              <span className="cursor">postdoc researcher | visualization expert</span>
            </div>

            <p className="text-lg sm:text-xl text-neon-cyan/80 max-w-3xl mx-auto mb-12 leading-relaxed relative">
              <span className="cylon-scan">
                Rethinking how we visualize, analyze, and learn from complex networks.
              </span>
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a href="#research" className="retro-button">
                VIEW RESEARCH
              </a>
              <a href="#publications" className="retro-button">
                PUBLICATIONS
              </a>
              <a href="#contact" className="retro-button">
                GET IN TOUCH
              </a>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="mt-16 flex justify-center items-center space-x-4 text-neon-cyan/40">
            <span className="animate-pulse">▼</span>
            <span>SCROLL TO EXPLORE</span>
            <span className="animate-pulse">▼</span>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-retro-darker/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-retro neon-glow-pink mb-12 text-center">
            [about.md]
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="retro-card">
              <div className="aspect-[3/4] bg-gradient-to-br from-neon-cyan/20 to-neon-pink/20 rounded-lg flex items-center justify-center border-2 border-neon-cyan/50 overflow-hidden">
                <Image
                  src="/nerd.png"
                  alt="Velitchko Filipov Profile"
                  width={500}
                  height={667}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="retro-card">
                <h3 className="text-xl font-retro text-neon-cyan mb-4">SYSTEM.INFO</h3>
                <p className="text-neon-cyan/80 leading-relaxed mb-4">
                  I&apos;m a postdoctoral researcher at&nbsp;
                  <a
                    href="https://www.cvast.tuwien.ac.at/"
                    className="text-neon-pink neon-glow-pink underline transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    TU Wien in the Visual Analytics group
                  </a>, where I study how people interact with and make sense of complex networked data.
                  My research combines visualization and computational analysis to develop expressive and collaborative ways of exploring temporal, spatial, and relational structures.
                </p>

                <div className="flex flex-wrap gap-2 text-sm">
                  <span className="px-3 py-1 bg-neon-pink/20 text-neon-pink rounded-full">Network Visualization</span>
                  <span className="px-3 py-1 bg-neon-cyan/20 text-neon-cyan rounded-full">Visualization Literacy</span>
                  <span className="px-3 py-1 bg-neon-yellow/20 text-neon-yellow rounded-full">Visualization Games</span>
                  <span className="px-3 py-1 bg-neon-green/20 text-neon-green rounded-full">Data Physicalization</span>
                  <span className="px-3 py-1 bg-neon-orange/20 text-neon-orange rounded-full">Cryptography & Blockchain</span>
                </div>
              </div>

              <div className="retro-card">
                <h3 className="text-xl font-retro text-neon-pink mb-4">EDUCATION</h3>
                <ul className="space-y-3 text-neon-cyan/80">
                  <li className="flex items-start">
                    <span className="text-neon-pink mr-2">▸</span>
                    <span>PhD in Visual Analytics, TU Wien, 2024</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-neon-pink mr-2">▸</span>
                    <span>MSc in Media Informatics, TU Wien 2018</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-neon-pink mr-2">▸</span>
                    <span>BSc in Computer Science, TU Wien, 2013</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Interests */}
      <section id="research" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-retro neon-glow-cyan mb-12 text-center">
            [research.json]
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Network Visualization",
                description: "Developing novel visual representations and interactive techniques for exploring complex network structures, temporal dynamics, and multi-layered relationships in data.",
                icon: "⚛️"
              },
              {
                title: "Digital Humanities",
                description: "Applying computational methods and visualization techniques to humanities research, enabling new perspectives on cultural heritage, historical data, and textual analysis.",
                icon: "📚"
              },
              {
                title: "Visualization Literacy",
                description: "Investigating how people read, interpret, and learn from data visualizations, with focus on improving design practices and educational approaches.",
                icon: "📊"
              },
              {
                title: "Visualization Games",
                description: "Creating playful and engaging ways to learn visualization concepts through game mechanics, fostering skill development and data literacy.",
                icon: "🎮"
              },
              {
                title: "Data Physicalization",
                description: "Exploring tangible and physical representations of data, bridging digital and physical worlds to create embodied experiences with information.",
                icon: "🎲"
              },
              {
                title: "Cryptography & Blockchain",
                description: "Visualizing cryptographic protocols and blockchain networks to make complex distributed systems more transparent and understandable.",
                icon: "🔐"
              },
            ].map((interest, index) => (
              <div key={index} className="retro-card group">
                <div className="text-4xl mb-4 group-hover:animate-pulse">{interest.icon}</div>
                <h3 className="text-xl font-retro text-neon-pink mb-4">{interest.title}</h3>
                <p className="text-neon-cyan/80 text-sm leading-relaxed">
                  {interest.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-20 bg-retro-darker/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-retro neon-glow-pink mb-12 text-center">
            [projects.tsx]
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Project Alpha",
                description: "A cutting-edge implementation of [Technology] for [Purpose]. Achieved X% improvement over baseline.",
                tags: ["Python", "TensorFlow", "Docker"],
                link: "https://github.com"
              },
              {
                title: "Research Framework",
                description: "Open-source framework for [Task]. Used by researchers worldwide for [Application].",
                tags: ["TypeScript", "React", "Node.js"],
                link: "https://github.com"
              },
              {
                title: "Data Pipeline",
                description: "Scalable data processing pipeline handling [Volume] of data for [Purpose].",
                tags: ["Python", "Apache Spark", "AWS"],
                link: "https://github.com"
              },
              {
                title: "ML Model Suite",
                description: "Collection of pre-trained models for [Task]. Includes benchmarks and evaluation tools.",
                tags: ["PyTorch", "CUDA", "Python"],
                link: "https://github.com"
              },
              {
                title: "Visualization Tool",
                description: "Interactive visualization platform for [Data Type]. Supports real-time analysis.",
                tags: ["D3.js", "WebGL", "React"],
                link: "https://github.com"
              },
              {
                title: "Research App",
                description: "Mobile application demonstrating [Concept]. Featured in [Publication/Conference].",
                tags: ["React Native", "Firebase", "ML Kit"],
                link: "https://github.com"
              },
            ].map((project, index) => (
              <div key={index} className="retro-card">
                <h3 className="text-xl font-retro text-neon-cyan mb-4">{project.title}</h3>
                <p className="text-neon-cyan/80 text-sm mb-6 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 text-xs border border-neon-pink/50 text-neon-pink bg-neon-pink/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm text-neon-cyan hover:text-neon-pink hover:neon-glow transition-colors"
                >
                  → VIEW PROJECT
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Publications */}
      <section id="publications" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-retro neon-glow-cyan mb-12 text-center">
            [pubs.bib]
          </h2>

          <div className="space-y-12">
            {Object.entries(groupPublicationsByYear(publications))
              .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
              .map(([year, pubs]) => (
                <div key={year} className="space-y-6">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-retro text-neon-pink mb-6">
                    <span className="cylon-scan inline-block">
                      {year}
                    </span>
                  </h3>
                  {pubs.map((pub) => (
                    <PublicationCard key={pub.id} publication={pub} />
                  ))}
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-retro-darker/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-retro neon-glow-pink mb-12">
            [contact.sh]
          </h2>

          <div className="retro-card mb-12">
            <p className="text-xl text-neon-cyan mb-8 leading-relaxed">
              Interested in collaboration, research opportunities, or just want to chat about [Your Field]?
              Feel free to reach out!
            </p>

            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="border-2 border-neon-cyan/30 p-6 hover:border-neon-pink/50 transition-colors">
                <h3 className="text-lg font-retro text-neon-cyan mb-3">EMAIL</h3>
                <a
                  href="mailto:your.email@university.edu"
                  className="text-neon-pink hover:neon-glow break-all"
                >
                  your.email@university.edu
                </a>
              </div>

              <div className="border-2 border-neon-cyan/30 p-6 hover:border-neon-pink/50 transition-colors">
                <h3 className="text-lg font-retro text-neon-cyan mb-3">LOCATION</h3>
                <p className="text-neon-cyan/80">
                  [Your Institution]<br />
                  [City, Country]
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="retro-button"
            >
              GITHUB
            </a>
            <a
              href="https://scholar.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="retro-button"
            >
              GOOGLE SCHOLAR
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="retro-button"
            >
              LINKEDIN
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="retro-button"
            >
              TWITTER/X
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
