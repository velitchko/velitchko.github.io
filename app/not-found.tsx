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
  },
  {
    quote: "Here's looking at you, kid.",
    movie: "Casablanca",
    suggestion: "Perhaps a different address will do the trick."
  },
  {
    quote: "Why so serious?",
    movie: "The Dark Knight",
    suggestion: "Lighten up — try the homepage."
  },
  {
    quote: "I'm the king of the world!",
    movie: "Titanic",
    suggestion: "Not quite — this page sank."
  },
  {
    quote: "I see dead people.",
    movie: "The Sixth Sense",
    suggestion: "That page might be beyond help. Try another link."
  },
  {
    quote: "No, I am your father.",
    movie: "Star Wars: The Empire Strikes Back",
    suggestion: "Family drama aside, this URL is missing."
  },
  {
    quote: "You shall not pass!",
    movie: "The Lord of the Rings: The Fellowship of the Ring",
    suggestion: "Guardians denied access — try a different path."
  },
  {
    quote: "Toto, I've a feeling we're not in Kansas anymore.",
    movie: "The Wizard of Oz",
    suggestion: "This place is different. Head back home."
  },
  {
    quote: "Say hello to my little friend!",
    movie: "Scarface",
    suggestion: "This page won't help — try another approach."
  },
  {
    quote: "You talking to me?",
    movie: "Taxi Driver",
    suggestion: "No pages here. Try a different route."
  },
  {
    quote: "I'll have what she's having.",
    movie: "When Harry Met Sally",
    suggestion: "She's not having this page. Try the blog or go home."
  },
  {
    quote: "After all, tomorrow is another day.",
    movie: "Gone with the Wind",
    suggestion: "Refresh or navigate back — maybe tomorrow it'll exist."
  },
  {
    quote: "You shall not pass!",
    movie: "Monty Python and the Holy Grail",
    suggestion: "The bridgekeeper denies this URL. Try elsewhere."
  },
  {
    quote: "Inception: your mind is the scene of the crime.",
    movie: "Inception",
    suggestion: "Dream up a new address or go home."
  },
  {
    quote: "Keep your friends close, but your enemies closer.",
    movie: "The Godfather Part II",
    suggestion: "Keep a bookmark of useful pages — this one isn't one."
  },
  {
    quote: "You're gonna need a bigger search.",
    movie: "Jaws ",
    suggestion: "Try searching the site or return to the homepage."
  },
  {
    quote: "The truth is out there — just not here.",
    movie: "The X-Files",
    suggestion: "Try a different query or explore the archive."
  },
  {
    quote: "I want to believe this page exists.",
    movie: "The X-Files",
    suggestion: "We want to believe — try another link or search the site."
  },
  {
    quote: "Hello. My name is Inigo Montoya. You killed my page.",
    movie: "The Princess Bride",
    suggestion: "Revenge is best served via the search box."
  },
  {
    quote: "All those moments will be lost in time, like tears in rain... and this page.",
    movie: "Blade Runner",
    suggestion: "Maybe a different address will stick around."
  },
  {
    quote: "Avengers assemble? Not here — try the homepage.",
    movie: "The Avengers",
    suggestion: "A team effort won't recover this URL."
  },
  {
    quote: "The first rule of Fight Club: you do not talk about this page.",
    movie: "Fight Club",
    suggestion: "The second rule: try another link."
  },
  {
    quote: "Get busy living, or get busy searching — this page is gone.",
    movie: "The Shawshank Redemption",
    suggestion: "Search the site for treasure instead."
  },
  {
    quote: "That rug really tied the room together — unlike this missing page.",
    movie: "The Big Lebowski",
    suggestion: "Dude, try the homepage."
  },
  {
    quote: "I love the smell of burned links in the morning.",
    movie: "Apocalypse Now",
    suggestion: "This link didn't survive the jungle."
  },
  {
    quote: "I'm having an old friend for dinner — unlike this page, which is missing.",
    movie: "The Silence of the Lambs",
    suggestion: "Try another address."
  },
  {
    quote: "A census taker once tried to test me — this page failed.",
    movie: "The Shawshank Redemption",
    suggestion: "Try inspecting the logs or the sitemap."
  },
  {
    quote: "Why did it have to be this link?",
    movie: "Raiders of the Lost Ark",
    suggestion: "Search for an alternative route."
  },
  {
    quote: "Do. Or do not. There is no try — and there is no page.",
    movie: "The Empire Strikes Back",
    suggestion: "May the correct URL be with you."
  },
  {
    quote: "Groundhog Day: you hit refresh and still no page.",
    movie: "Groundhog Day",
    suggestion: "Maybe try a different link this time."
  }
];

export default function NotFound() {
  // store the selected index to make it easy to pick a different random entry
  const [index, setIndex] = useState<number | null>(null);
  const reference = index !== null ? sciFiReferences[index] : null;

  useEffect(() => {
    // Select a random reference on client-side to avoid hydration mismatch
    const randomIndex = Math.floor(Math.random() * sciFiReferences.length);
    setIndex(randomIndex);
  }, []);

  const refreshReference = () => {
    if (sciFiReferences.length === 0) return;
    let next = Math.floor(Math.random() * sciFiReferences.length);
    // try a few times to avoid repeating the same entry
    if (next === index) {
      let attempts = 0;
      while (next === index && attempts < 10) {
        next = Math.floor(Math.random() * sciFiReferences.length);
        attempts++;
      }
    }
    setIndex(next);
  };

  // Press state for tactile feedback on touch devices
  const [isPressed, setIsPressed] = useState(false);
  const handlePointerDown = () => setIsPressed(true);
  const handlePointerUp = () => setIsPressed(false);
  const handlePointerCancel = () => setIsPressed(false);

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
    <div className="notfound-page min-h-screen flex items-center justify-center relative overflow-hidden grid-bg px-4">
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
        <div className="space-y-4 p-6 border-2 bg-black/20 backdrop-blur relative overflow-hidden" style={{ borderColor: '#00ffff' }}>
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

        {/* Easter egg hint + refresh button (centered above text) */}
        <div className="flex flex-col items-center gap-3 mt-8">
          <div className="relative flex items-center justify-center refresh-wrapper">
            {/* soft golden glow ring */}
            <span aria-hidden className="refresh-glow" />

            {/* subtle golden border ring that pulses */}
            <span aria-hidden className="refresh-pulse-ring" />

            <button
              onClick={refreshReference}
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerCancel}
              onPointerLeave={handlePointerCancel}
              aria-label="Refresh reference"
              title="Get a new reference"
              className={`refresh-btn ${isPressed ? 'pressed' : ''}`}
            >
              {/* micro-adjust the icon so it reads visually centered in the circle */}
              <span className="refresh-icon">↻</span>
            </button>
          </div>

          <p 
            className="text-lg text-center"
            style={{ fontFamily: "'VT323', monospace", color: '#00ffff' }}
          >
            Refresh to see another reference • {sciFiReferences.length} references available
          </p>
        </div>
      </div>
    </div>
  );
}
