'use client';

import { useTheme } from '@/contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isProfessional = theme === 'professional';

  return (
    <button
      onClick={toggleTheme}
      title={isProfessional ? 'Switch to Retro' : 'Switch to Classic'}
      aria-label="Toggle theme"
      className="theme-toggle-btn"
    >
      {isProfessional ? (
        /* In professional mode: button to go back to retro */
        <span className="theme-toggle-inner">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {/* Terminal / CRT icon */}
            <rect x="2" y="3" width="20" height="15" rx="2" />
            <polyline points="8 21 12 17 16 21" />
            <line x1="5" y1="10" x2="8" y2="10" />
            <line x1="5" y1="13" x2="11" y2="13" />
          </svg>
          <span>RETRO</span>
        </span>
      ) : (
        /* In retro mode: button to go to professional */
        <span className="theme-toggle-inner">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {/* Newspaper / article icon */}
            <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
            <path d="M18 14h-8" />
            <path d="M15 18h-5" />
            <path d="M10 6h8v4h-8V6Z" />
          </svg>
          <span>CLASSIC</span>
        </span>
      )}
    </button>
  );
}
