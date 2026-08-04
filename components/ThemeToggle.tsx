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
            {/* Robot icon */}
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M12 2a3 3 0 0 1 3 3v6H9V5a3 3 0 0 1 3-3z" />
            <circle cx="9" cy="15" r="1" fill="currentColor" />
            <circle cx="15" cy="15" r="1" fill="currentColor" />
            <line x1="9" y1="19" x2="15" y2="19" />
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
