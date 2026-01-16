'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import PublicationCard from '@/components/PublicationCard';
import FontSizeControl from '@/components/FontSizeControl';
import { publications, groupPublicationsByYear, getKeywordsWithCounts, filterPublicationsByKeyword, sortPublicationsByYear } from '@/data/publications';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Get top 15 keywords
  const topKeywords = getKeywordsWithCounts(publications).slice(0, 15);
  
  // Filter publications based on selected keyword
  const filteredPublications = selectedKeyword 
    ? sortPublicationsByYear(filterPublicationsByKeyword(publications, selectedKeyword))
    : publications;

  return (
    <div className="min-h-screen">
      <FontSizeControl />
      {/* Hero Section */}
      <section id="home" className="hero-section min-h-screen flex items-center justify-center relative overflow-hidden grid-bg">
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

      {/* Rest of content with font control */}
      <div className="home-content">
      {/* About Section */}
      <section className="py-20 bg-retro-darker/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-retro neon-glow-pink mb-12 text-center">
            [about.md]
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="retro-card">
                <div className="aspect-[3/4] bg-gradient-to-br from-neon-cyan/20 to-neon-pink/20 rounded-lg flex items-center justify-center border-2 border-neon-cyan/50 overflow-hidden">
                  <Image
                    src="/nerd.jpg"
                    alt="Velitchko Filipov Profile"
                    width={500}
                    height={667}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
              </div>
              
              {/* CV Download Button */}
              <a
                href="/cv.pdf"
                download="Velitchko_Filipov_CV.pdf"
                className="retro-button w-full text-center inline-flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                DOWNLOAD CV
              </a>
            </div>

            <div className="space-y-6">
              <div className="retro-card">
                <h3 className="text-xl font-retro text-neon-cyan mb-4">INFO</h3>
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
              </div>

              <div className="retro-card">
                <h3 className="text-xl font-retro text-neon-cyan mb-4">EDUCATION</h3>
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
              <div key={index} className="retro-card group flex flex-col h-full min-h-0">
                <div className="text-4xl mb-4 group-hover:animate-pulse flex-shrink-0">{interest.icon}</div>
                <h3 className="text-lg sm:text-xl font-retro text-neon-cyan mb-3 flex-shrink-0 break-words">{interest.title}</h3>
                <p className="text-neon-cyan/80 text-xs sm:text-sm leading-relaxed flex-grow overflow-hidden break-words">
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

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "refhub.io",
                description: "A modern reference management platform for organizing academic publications, building citation networks, and sharing research collections.",
                tags: ["Reference Management", "Productivity", "Knowledge Graphs"],
                link: "https://refhub.io/"
              },
              {
                title: "ArtVis",
                description: "Network visualization system modeling complex interactions between persons, objects, places, institutions, and events in art history over time.",
                tags: ["Dynamic Networks", "Digital Humanities", "Art History"],
                link: "https://artvis.cvast.tuwien.ac.at/"
              },
              {
                title: "SANE",
                description: "Visual analytics framework for event-based information diffusion with uncertainty across dynamic networks like pandemics and misinformation campaigns.",
                tags: ["Dynamic Networks", "Diffusion Processes", "Uncertainty"],
                link: "https://www.cvast.tuwien.ac.at/projects/sane"
              },
              {
                title: "VisGames",
                description: "Workshop advancing data visualization games as dynamic tools for communication, co-creation, and collaborative problem-solving beyond education.",
                tags: ["Visualization Activities", "Collaboration", "Co-Creation"],
                link: "https://visgames.netlify.app/"
              },
              {
                title: "iPal",
                description: "Web3 infrastructure addressing information overload through decentralized, structured content aggregation and visualization to reduce biases and improve search.",
                tags: ["Web3", "Decentralization", "Knowledge Graphs"],
                link: "https://ipal.network/"
              },
              {
                title: "TimeLighting",
                description: "Interactive visual analytics tool exploring temporal networks by projecting node trajectories and edge surfaces from 3D space-time cubes to 2D.",
                tags: ["Dynamic Networks", "Event-Based Graphs", "Projections"],
                link: "https://github.com/velitchko/timelighting"
              },
              {
                title: "CV3",
                description: "Interactive exploration environment enabling recruiters to explore, assess, and compare multiple CVs simultaneously for efficient candidate selection.",
                tags: ["Visual Analytics", "Comparison", "Human Resources"],
                link: "https://github.com/velitchko/cvthree"
              },
              {
                title: "PolyCube",
                description: "Space-time cube visualization method for exploring cultural heritage data, integrating spatial and temporal information to improve mental model construction.",
                tags: ["Space-Time-Cube", "Cultural Heritage", "Cognitive Science"],
                link: "https://bigdata-vis.github.io/polycube/combined/home"
              },
              
              {
                title: "IMMV",
                description: "Interactive visual analytics platform exploring music as an urban identification tool, making the interaction between music and urban texture accessible.",
                tags: ["Visual Analytics", "Musicology", "Cultural Heritage"],
                link: "https://github.com/velitchko/interactive-music-mapping-vienna"
              }
            ].map((project, index) => (
              <div key={index} className="retro-card">
                <h3 className="text-lg font-retro text-neon-cyan mb-2">{project.title}</h3>
                <p className="text-neon-cyan/80 text-xs mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 text-xs border-2 border-neon-pink/50 text-neon-pink bg-neon-pink/10 transition-all duration-300 hover:border-neon-pink hover:shadow-[0_0_15px_rgba(255,0,255,0.6)] cursor-default relative overflow-hidden group"
                    >
                      <span className="absolute inset-0 bg-neon-pink transform translate-y-full transition-transform duration-300 group-hover:translate-y-0 -z-10"></span>
                      <span className="relative z-10 group-hover:text-retro-darker transition-colors duration-300">{tag}</span>
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-xs text-neon-cyan hover:text-neon-pink hover:neon-glow transition-colors"
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
          <div className="flex items-center justify-center mb-6 gap-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-retro neon-glow-cyan m-0">
              [pubs.bib]
            </h2>
          </div>

          {/* Keyword Filter */}
          {topKeywords.length > 0 && (
            <div className="mb-12">
              <div className="flex flex-wrap justify-center gap-3">
                {selectedKeyword && (
                  <button
                    onClick={() => setSelectedKeyword(null)}
                    className="px-4 py-2 text-sm font-mono border-2 border-neon-pink/50 text-neon-pink bg-neon-pink/10 hover:border-neon-pink transition-all duration-300 relative overflow-hidden group"
                  >
                    <span className="absolute inset-0 bg-neon-pink transform translate-y-full transition-transform duration-300 group-hover:translate-y-0 -z-10"></span>
                    <span className="relative z-10 transition-colors duration-300 group-hover:text-retro-darker">✕ CLEAR FILTER</span>
                  </button>
                )}
                {topKeywords.map(({ keyword, count }) => (
                  <button
                    key={keyword}
                    onClick={() => setSelectedKeyword(keyword)}
                    className={`px-4 py-2 text-sm font-mono border-2 transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                      selectedKeyword === keyword
                        ? 'border-neon-pink text-retro-darker bg-neon-pink font-bold'
                        : 'border-neon-cyan/50 text-neon-cyan bg-neon-cyan/10 hover:border-neon-cyan'
                    }`}
                  >
                    <span className={`absolute inset-0 bg-neon-cyan transform translate-y-full transition-transform duration-300 ${selectedKeyword === keyword ? '' : 'group-hover:translate-y-0'} -z-10`}></span>
                    <span className={`relative z-10 transition-colors duration-300 ${selectedKeyword === keyword ? '' : 'group-hover:text-retro-darker'}`}>
                      #{keyword} <span className={`opacity-70 ${selectedKeyword === keyword ? '' : 'group-hover:opacity-100'}`}>({count})</span>
                    </span>
                  </button>
                ))}
              </div>
              
              {selectedKeyword && (
                <div className="text-center mt-6">
                  <p className="text-neon-pink text-sm font-mono">
                    Showing {filteredPublications.length} publication{filteredPublications.length !== 1 ? 's' : ''} tagged with #{selectedKeyword}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Golden separator with icon (under keywords, before first publication) */}
          <div className="flex items-center justify-center mb-8">
            <a href="/coauthors" className="inline-block text-sm text-neon-cyan hover:text-neon-pink hover:neon-glow transition-colors" aria-label="Explore co-author network">
              → Explore co-author network
            </a>
          </div>

          {/* Publications List */}
          <div className="space-y-12">
            {selectedKeyword ? (
              // Filtered view: flat list sorted by year
              <div className="space-y-6">
                {filteredPublications.map((pub) => (
                  <PublicationCard key={pub.id} publication={pub} />
                ))}
              </div>
            ) : (
              // Default view: grouped by year
              Object.entries(groupPublicationsByYear(filteredPublications))
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
                ))
            )}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-retro-darker/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-retro neon-glow-pink mb-12">
            [contact.sh]
          </h2>

          <div className="retro-card mb-12 border-neon-pink/30">
            <h3 className="text-xl sm:text-2xl text-neon-pink neon-glow-pink mb-4 leading-relaxed font-retro">
              Let&apos;s connect! 🚀
            </h3>
            <p className="text-lg text-neon-cyan/80 mb-8 leading-relaxed">
              Whether you want to collaborate on research, discuss visualization projects, 
              or just chat about unconventional ideas—I&apos;m always happy to hear from you.
            </p>

            {/* Social Links with Icons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <a
                href="https://github.com/velitchko"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link border-2 border-neon-cyan/30 p-4 flex flex-col items-center gap-2"
              >
                <svg className="w-8 h-8 text-neon-cyan transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span className="text-sm text-neon-cyan transition-colors font-mono">GitHub</span>
              </a>

              <a
                href="https://scholar.google.com/citations?user=2FYZ3QYAAAAJ"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link border-2 border-neon-cyan/30 p-4 flex flex-col items-center gap-2"
              >
                <svg className="w-8 h-8 text-neon-cyan transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 9a8 8 0 0 1 7.162 4.44L24 9.5z"/>
                </svg>
                <span className="text-sm text-neon-cyan transition-colors font-mono">Scholar</span>
              </a>

              <a
                href="https://www.linkedin.com/in/velitchko-filipov"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link border-2 border-neon-cyan/30 p-4 flex flex-col items-center gap-2"
              >
                <svg className="w-8 h-8 text-neon-cyan transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span className="text-sm text-neon-cyan transition-colors font-mono">LinkedIn</span>
              </a>

              <a
                href="https://orcid.org/0000-0001-9592-2179"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link border-2 border-neon-cyan/30 p-4 flex flex-col items-center gap-2"
              >
                <svg className="w-8 h-8 text-neon-cyan transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.016-5.325 5.016h-3.919V7.416zm1.444 1.303v7.444h2.297c2.359 0 4.078-1.266 4.078-3.722 0-2.203-1.344-3.722-3.925-3.722h-2.45z"/>
                </svg>
                <span className="text-sm text-neon-cyan transition-colors font-mono">ORCID</span>
              </a>
            </div>

            {/* Contact Info */}
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="border-2 border-neon-cyan/30 p-6 hover:border-neon-cyan hover:neon-glow transition-colors flex flex-col">
                <h3 className="text-base font-retro text-neon-cyan mb-3">📧 EMAIL</h3>
                <p className="text-neon-cyan/80 mb-4 text-sm flex-grow">
                  Drop me a line about anything—questions, ideas, or collaborations.
                </p>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = 'mailto:' + 'velitchko.filipov' + '@' + 'tuwien.ac.at';
                  }}
                  className="contact-button inline-block px-4 py-2 text-sm self-end"
                >
                  Send email →
                </a>
              </div>

              <div className="border-2 border-neon-cyan/30 p-6 hover:border-neon-cyan hover:neon-glow transition-colors">
                <h3 className="text-base font-retro text-neon-cyan mb-3">📍 LOCATION</h3>
                <p className="text-neon-cyan/80 text-sm">
                  TU Wien<br />
                  Visual Analytics Research Unit (E193-07)<br />
                  Favoritenstrasse 9-11<br />
                  1040 Vienna, Austria
                </p>
              </div>

              <div className="border-2 border-neon-cyan/30 p-6 hover:border-neon-cyan hover:neon-glow transition-colors flex flex-col">
                <h3 className="text-base font-retro text-neon-cyan mb-3">💬 SCHEDULE</h3>
                <p className="text-neon-cyan/80 mb-4 text-sm flex-grow">
                  Let&apos;s chat about research, collaboration, or ideas.
                </p>
                <a
                  href="https://cal.com/velitchko-filipov-x1pkcx/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-button inline-block px-4 py-2 text-sm self-end"
                >
                  Schedule a call →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div> {/* End home-content wrapper */}
    </div>
  );
}
