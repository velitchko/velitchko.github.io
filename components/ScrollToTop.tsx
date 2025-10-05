'use client';

import { useState, useEffect } from 'react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-4 bg-retro-screen border-2 border-neon-cyan hover:border-neon-pink transition-all duration-300 group"
          aria-label="Scroll to top"
          style={{
            boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
          }}
        >
          <svg
            className="w-6 h-6 text-neon-cyan group-hover:text-neon-pink transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
          <div className="absolute inset-0 border border-neon-cyan/30 group-hover:border-neon-pink/50 transition-all" 
               style={{ transform: 'translate(4px, 4px)' }}></div>
        </button>
      )}
    </>
  );
}
