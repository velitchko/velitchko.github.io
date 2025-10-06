export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t-2 border-neon-cyan/50 bg-retro-darker/90 backdrop-blur-md mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1 */}
          <div>
            <h3 className="text-lg font-retro neon-glow-pink mb-4">SYSTEM.INFO</h3>
            <p className="text-neon-cyan/80 text-sm mb-3">
              Vibe coded by{' '}
              <a
                href="https://github.com/velitchko"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neon-pink hover:neon-glow transition-colors"
              >
                👨‍💻 @velitchko
              </a>
              {' '}& 🤖 Claude Sonnet
            </p>
            <a
              href="https://github.com/velitchko/velitchko.github.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neon-cyan/80 hover:text-neon-pink hover:neon-glow transition-colors text-sm inline-flex items-center mb-3"
            >
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              View Source
            </a>
            <p className="text-neon-cyan/60 text-xs font-mono">
              ✅ No kernel panics detected
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-lg font-retro neon-glow-cyan mb-4">QUICK.ACCESS</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#research" className="text-neon-cyan/80 hover:text-neon-pink hover:neon-glow transition-colors">
                  → Research
                </a>
              </li>
              <li>
                <a href="#projects" className="text-neon-cyan/80 hover:text-neon-pink hover:neon-glow transition-colors">
                  → Projects
                </a>
              </li>
              <li>
                <a href="#publications" className="text-neon-cyan/80 hover:text-neon-pink hover:neon-glow transition-colors">
                  → Publications
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-lg font-retro neon-glow-pink mb-4">CONNECT</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com/velitchko"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neon-cyan hover:text-neon-pink hover:neon-glow transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com/in/velitchko-filipov"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neon-cyan hover:text-neon-pink hover:neon-glow transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="https://orcid.org/0000-0003-0786-7368"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neon-cyan hover:text-neon-pink hover:neon-glow transition-colors"
                aria-label="ORCID"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.016-5.325 5.016h-3.919V7.416zm1.444 1.303v7.444h2.297c2.359 0 4.078-1.266 4.078-3.722 0-2.203-1.344-3.722-3.925-3.722h-2.45z"/>
                </svg>
              </a>
              <a
                href="mailto:velitchko.filipov@tuwien.ac.at"
                className="text-neon-cyan hover:text-neon-pink hover:neon-glow transition-colors"
                aria-label="Email"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-neon-cyan/30 text-center">
          <p className="text-neon-cyan/60 text-sm font-mono">
            © {currentYear} [SYS.BOOT.v1.0] • Built with Next.js & Tailwind CSS
          </p>
          <p className="text-neon-pink/60 text-xs font-mono mt-2">
            [ RETRO-FUTURISM ENGAGED ]
          </p>
        </div>
      </div>
    </footer>
  );
}
