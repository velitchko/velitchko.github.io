'use client';

import { useEffect, useState } from 'react';

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
              className={`text-4xl sm:text-6xl lg:text-7xl font-retro neon-glow-cyan mb-8 ${mounted ? 'glitch' : ''}`}
              data-text="YOUR NAME"
            >
              YOUR NAME
            </h1>
            
            <div className="text-xl sm:text-2xl text-neon-pink neon-glow-pink font-mono mb-8">
              <span className="cursor">PhD Researcher | Computer Scientist</span>
            </div>
            
            <p className="text-lg sm:text-xl text-neon-cyan/80 max-w-3xl mx-auto mb-12 leading-relaxed">
              Exploring the frontiers of [Your Research Area] at the intersection of theory and practice. 
              Passionate about pushing the boundaries of what&apos;s possible in [Your Field].
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
          <h2 className="text-3xl sm:text-4xl font-retro neon-glow-pink mb-12 text-center">
            [ ABOUT.ME ]
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="retro-card">
              <div className="aspect-square bg-gradient-to-br from-neon-cyan/20 to-neon-pink/20 rounded-lg flex items-center justify-center border-2 border-neon-cyan/50">
                <div className="text-center">
                  <div className="text-6xl mb-4">👨‍💻</div>
                  <p className="text-neon-cyan/60 text-sm">[ PROFILE.IMG ]</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="retro-card">
                <h3 className="text-xl font-retro text-neon-cyan mb-4">SYSTEM.INFO</h3>
                <p className="text-neon-cyan/80 leading-relaxed mb-4">
                  I&apos;m a [Your Title] at [Your Institution], where I focus on [brief description of your work]. 
                  My research combines [Field 1] and [Field 2] to address fundamental questions in [Your Area].
                </p>
                <p className="text-neon-cyan/80 leading-relaxed">
                  With a background in [Your Background], I&apos;m particularly interested in [Specific Interest] 
                  and its applications in [Application Area].
                </p>
              </div>
              
              <div className="retro-card">
                <h3 className="text-xl font-retro text-neon-pink mb-4">EDUCATION</h3>
                <ul className="space-y-3 text-neon-cyan/80">
                  <li className="flex items-start">
                    <span className="text-neon-pink mr-2">▸</span>
                    <span>PhD in [Field], [University] (Expected 20XX)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-neon-pink mr-2">▸</span>
                    <span>MSc in [Field], [University] (20XX)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-neon-pink mr-2">▸</span>
                    <span>BSc in [Field], [University] (20XX)</span>
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
          <h2 className="text-3xl sm:text-4xl font-retro neon-glow-cyan mb-12 text-center">
            [ RESEARCH.INTERESTS ]
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Machine Learning",
                description: "Deep learning architectures, neural networks, and their applications in solving complex computational problems.",
                icon: "🧠"
              },
              {
                title: "Computer Vision",
                description: "Image processing, object detection, and visual recognition systems for real-world applications.",
                icon: "👁️"
              },
              {
                title: "Natural Language Processing",
                description: "Language models, semantic analysis, and understanding human-computer interaction through text.",
                icon: "💬"
              },
              {
                title: "Data Science",
                description: "Statistical analysis, data mining, and extracting insights from large-scale datasets.",
                icon: "📊"
              },
              {
                title: "Artificial Intelligence",
                description: "Intelligent systems, autonomous agents, and the future of human-AI collaboration.",
                icon: "🤖"
              },
              {
                title: "Ethics in AI",
                description: "Responsible AI development, fairness, transparency, and societal impact of technology.",
                icon: "⚖️"
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
          <h2 className="text-3xl sm:text-4xl font-retro neon-glow-pink mb-12 text-center">
            [ PROJECTS.PORTFOLIO ]
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
          <h2 className="text-3xl sm:text-4xl font-retro neon-glow-cyan mb-12 text-center">
            [ PUBLICATIONS.LOG ]
          </h2>
          
          <div className="space-y-6">
            {[
              {
                title: "Deep Learning Approaches to [Problem]: A Comprehensive Study",
                authors: "Your Name, Co-Author A., Co-Author B.",
                venue: "Proceedings of International Conference on [Topic] (IC[TOPIC] 2024)",
                year: "2024",
                link: "https://arxiv.org",
                type: "Conference"
              },
              {
                title: "Novel Framework for [Application] Using [Method]",
                authors: "Your Name, Collaborator C.",
                venue: "Journal of [Field], Vol. XX, No. X",
                year: "2024",
                link: "https://arxiv.org",
                type: "Journal"
              },
              {
                title: "Scalable Solutions for [Challenge] in [Domain]",
                authors: "Co-Author D., Your Name, Co-Author E.",
                venue: "Workshop on [Topic] at [Major Conference] 2023",
                year: "2023",
                link: "https://arxiv.org",
                type: "Workshop"
              },
              {
                title: "Towards Better [System]: An Empirical Analysis",
                authors: "Your Name",
                venue: "arXiv preprint",
                year: "2023",
                link: "https://arxiv.org",
                type: "Preprint"
              },
            ].map((pub, index) => (
              <div key={index} className="retro-card">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <span className="inline-block px-3 py-1 text-xs border border-neon-cyan/50 text-neon-cyan bg-neon-cyan/10 mb-2 md:mb-0">
                    {pub.type}
                  </span>
                  <span className="text-neon-pink font-mono text-sm">{pub.year}</span>
                </div>
                
                <h3 className="text-lg font-bold text-neon-cyan mb-2 leading-relaxed">
                  {pub.title}
                </h3>
                
                <p className="text-neon-cyan/70 text-sm mb-2">
                  {pub.authors}
                </p>
                
                <p className="text-neon-cyan/60 text-sm italic mb-4">
                  {pub.venue}
                </p>
                
                <div className="flex flex-wrap gap-4 text-sm">
                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neon-pink hover:neon-glow transition-colors"
                  >
                    → PDF
                  </a>
                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neon-cyan hover:text-neon-pink transition-colors"
                  >
                    → BibTeX
                  </a>
                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neon-cyan hover:text-neon-pink transition-colors"
                  >
                    → Code
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-retro-darker/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-retro neon-glow-pink mb-12">
            [ CONTACT.INIT ]
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
