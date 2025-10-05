'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'home', label: '[ HOME ]' },
    { id: 'research', label: '[ RESEARCH ]' },
    { id: 'projects', label: '[ PROJECTS ]' },
    { id: 'publications', label: '[ PUBLICATIONS ]' },
    { id: 'contact', label: '[ CONTACT ]' },
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 64; // Height of the fixed navbar (h-16 = 64px)
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-retro-darker/90 backdrop-blur-md border-b-2 border-neon-cyan/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl sm:text-2xl font-retro neon-glow-pink glitch">
              &lt;vfilipov/&gt;
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-2 text-sm font-mono transition-all duration-300 ${
                    activeSection === item.id
                      ? 'text-neon-pink neon-glow-pink'
                      : 'text-neon-cyan hover:text-neon-pink hover:neon-glow'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => {
                const menu = document.getElementById('mobile-menu');
                menu?.classList.toggle('hidden');
              }}
              className="text-neon-cyan hover:text-neon-pink p-2"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div id="mobile-menu" className="hidden md:hidden bg-retro-darker/95 border-t border-neon-cyan/30">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                scrollToSection(item.id);
                document.getElementById('mobile-menu')?.classList.add('hidden');
              }}
              className={`block w-full text-left px-3 py-2 text-base font-mono ${
                activeSection === item.id
                  ? 'text-neon-pink neon-glow-pink'
                  : 'text-neon-cyan hover:text-neon-pink'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
