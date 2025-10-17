'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const sciFiReferences = [
  {
    quote: "These aren't the droids you're looking for.",
    movie: "Star Wars: A New Hope",
    suggestion: "Move along... move along."
  },
  {
    quote: "I'm sorry, Dave. I'm afraid I can't do that.",
    movie: "2001: A Space Odyssey",
    suggestion: "This mission is too important for me to allow you to jeopardize it."
  },
  {
    quote: "Roads? Where we're going, we don't need roads.",
    movie: "Back to the Future",
    suggestion: "But we do need valid URLs."
  },
  {
    quote: "404: Game over, man! Game over!",
    movie: "Aliens",
    suggestion: "What are we gonna do now?"
  },
  {
    quote: "This page is not available in your dimension.",
    movie: "Rick and Morty",
    suggestion: "Try another timeline, Morty!"
  },
  {
    quote: "There is no page. Only Zuul.",
    movie: "Ghostbusters",
    suggestion: "Who you gonna call? The webmaster!"
  },
  {
    quote: "404: I'll be back.",
    movie: "The Terminator",
    suggestion: "(But this page won't)"
  },
  {
    quote: "The page you seek does not exist. Or does it?",
    movie: "The Matrix",
    suggestion: "There is no spoon... or page."
  },
  {
    quote: "Space... the final frontier. This page, however, is not.",
    movie: "Star Trek",
    suggestion: "These are the voyages that went nowhere."
  },
  {
    quote: "Great Scott! The page is missing!",
    movie: "Back to the Future",
    suggestion: "If my calculations are correct... you need to go back."
  },
  {
    quote: "404: In space, no one can hear you click.",
    movie: "Alien",
    suggestion: "This link has been... terminated."
  },
  {
    quote: "The page must flow. But this one doesn't.",
    movie: "Dune",
    suggestion: "Navigate without rhythm, it won't attract the page."
  },
  {
    quote: "Houston, we have a 404 problem.",
    movie: "Apollo 13",
    suggestion: "Failure is not an option... but this page is gone."
  },
  {
    quote: "I find your lack of page... disturbing.",
    movie: "Star Wars: Empire Strikes Back",
    suggestion: "The force is not strong with this URL."
  },
  {
    quote: "404: Multipass denied.",
    movie: "The Fifth Element",
    suggestion: "Leeloo Dallas says: Wrong address!"
  },
  {
    quote: "This is Ripley, last survivor of the Nostromo, signing off... for this page.",
    movie: "Alien",
    suggestion: "The page didn't make it."
  },
  {
    quote: "You're gonna need a bigger URL.",
    movie: "Jaws",
    suggestion: "(Wrong franchise but we had to)"
  },
  {
    quote: "404: The cake is a lie.",
    movie: "Portal",
    suggestion: "Would you like to go back to testing?"
  }
];

export default function NotFound() {
  const [reference, setReference] = useState<typeof sciFiReferences[0] | null>(null);

  useEffect(() => {
    // Select a random reference on client-side to avoid hydration mismatch
    const randomIndex = Math.floor(Math.random() * sciFiReferences.length);
    setReference(sciFiReferences[randomIndex]);
  }, []);

  // Show loading state until client-side random selection is complete
  if (!reference) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center p-8">
          <div className="text-cyan-400 text-4xl animate-pulse">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden grid-bg px-4">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-purple/5 to-transparent pointer-events-none"></div>
      
      {/* VHS scanlines */}
      <div className="vhs-lines absolute inset-0 pointer-events-none"></div>
      
      <div className="max-w-2xl w-full text-center space-y-8 relative z-10">
        {/* Glitchy 404 with scanline effect */}
        <div className="relative space-y-4">
          <h1 
            className="glitch text-8xl md:text-9xl font-bold text-cyan-400"
            style={{ fontFamily: "'Press Start 2P', cursive" }}
            data-text="404"
          >
            404
          </h1>
          <div 
            className="absolute inset-0 text-8xl md:text-9xl font-bold text-cyan-400 opacity-20 blur-xl pointer-events-none"
            style={{ fontFamily: "'Press Start 2P', cursive" }}
          >
            404
          </div>
          <p 
            className="text-2xl md:text-3xl tracking-widest"
            style={{ 
              fontFamily: "'VT323', monospace",
              color: '#ff00ff',
              textShadow: '0 0 5px #ff00ff, 0 0 10px #ff00ff, 0 0 20px #ff00ff'
            }}
          >
            FOUR OH FOUR
          </p>
        </div>

        {/* Movie Quote */}
        <div className="space-y-4 p-6 border-2 bg-black/50 backdrop-blur relative overflow-hidden" style={{ borderColor: '#00ffff' }}>
          {/* Scanline effect */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="h-full w-full bg-gradient-to-b from-transparent to-transparent animate-scan" style={{ background: 'linear-gradient(to bottom, transparent, rgba(0, 255, 255, 0.05), transparent)' }}></div>
          </div>
          
          <p 
            className="text-3xl italic leading-relaxed mb-6"
            style={{ 
              fontFamily: "'VT323', monospace",
              color: '#00ffff',
              textShadow: '0 0 5px #00ffff, 0 0 10px #00ffff'
            }}
          >
            &quot;{reference.quote}&quot;
          </p>
          
          <p 
            className="text-lg"
            style={{ 
              fontFamily: "'VT323', monospace",
              color: '#ff00ff'
            }}
          >
            — {reference.movie}
          </p>
          
          <p 
            className="text-xl italic"
            style={{ 
              fontFamily: "'VT323', monospace",
              color: 'rgba(0, 255, 255, 0.6)'
            }}
          >
            {reference.suggestion}
          </p>
        </div>

        {/* Navigation buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="group relative px-8 py-4 border-2 text-lg font-bold overflow-hidden transition-all duration-300"
            style={{ 
              fontFamily: "'Press Start 2P', cursive",
              borderColor: '#00ffff',
              color: '#00ffff',
              boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)'
            }}
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-black">Go Home</span>
            <div 
              className="absolute inset-0 transition-transform duration-300 transform translate-y-full group-hover:translate-y-0"
              style={{ backgroundColor: '#00ffff', zIndex: 0 }}
            ></div>
          </Link>
          
          <Link
            href="/blog"
            className="group relative px-8 py-4 border-2 text-lg font-bold overflow-hidden transition-all duration-300"
            style={{ 
              fontFamily: "'Press Start 2P', cursive",
              borderColor: '#ff00ff',
              color: '#ff00ff',
              boxShadow: '0 0 10px rgba(255, 0, 255, 0.5)'
            }}
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-black">Read Blog</span>
            <div 
              className="absolute inset-0 transition-transform duration-300 transform translate-y-full group-hover:translate-y-0"
              style={{ backgroundColor: '#ff00ff', zIndex: 0 }}
            ></div>
          </Link>
        </div>

        {/* Easter egg hint */}
        <p 
          className="text-sm text-gray-600 mt-8"
          style={{ fontFamily: "'VT323', monospace" }}
        >
          Refresh to see another reference • {sciFiReferences.length} references available
        </p>
      </div>
    </div>
  );
}
