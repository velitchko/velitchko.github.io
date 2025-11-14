'use client';

import { useEffect, useState } from 'react';

type FontSize = 'small' | 'medium' | 'large' | 'xlarge';

export default function FontSizeControl() {
  const [fontSize, setFontSize] = useState<FontSize>('medium');
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load saved preference from localStorage
    const saved = localStorage.getItem('blog-font-size') as FontSize;
    if (saved && ['small', 'medium', 'large', 'xlarge'].includes(saved)) {
      setFontSize(saved);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // Apply to all blog-content and home-content elements
    const blogContent = document.querySelectorAll('.blog-content, .home-content');
    blogContent.forEach(el => {
      el.setAttribute('data-font-size', fontSize);
    });
    
    // Apply to document root for global font size control
    document.documentElement.setAttribute('data-font-size', fontSize);
    
    // Save preference
    localStorage.setItem('blog-font-size', fontSize);
  }, [fontSize, mounted]);

  const sizes: { value: FontSize; label: string; icon: string }[] = [
    { value: 'small', label: 'Small', icon: 'A' },
    { value: 'medium', label: 'Medium', icon: 'A' },
    { value: 'large', label: 'Large', icon: 'A' },
    { value: 'xlarge', label: 'X-Large', icon: 'A' },
  ];

  if (!mounted) return null;

  return (
    <div className="hidden md:block fixed right-0 top-1/2 -translate-y-1/2 z-50">
      <div className="flex flex-row items-center">
        {/* Collapsible panel */}
        <div
          className={`bg-retro-darker border-2 border-neon-cyan/50 p-3 backdrop-blur-sm transition-all duration-300 ${
            isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
          }`}
        >
          <div className="text-xs font-mono text-neon-cyan mb-2 text-center whitespace-nowrap">
            FONT SIZE
          </div>
          <div className="flex flex-col gap-1">
            {sizes.map(({ value, label, icon }) => (
              <button
                key={value}
                onClick={() => {
                  setFontSize(value);
                  setIsOpen(false);
                }}
                className={`
                  px-3 py-2 text-sm font-mono border-2 transition-all duration-300 relative overflow-hidden group
                  ${fontSize === value
                    ? 'border-neon-cyan text-retro-darker bg-neon-cyan font-bold'
                    : 'border-neon-cyan/30 text-neon-cyan bg-neon-cyan/5 hover:border-neon-cyan hover:bg-neon-cyan/10'
                  }
                `}
                style={{ 
                  fontSize: value === 'small' ? '0.75rem' : 
                           value === 'medium' ? '0.875rem' : 
                           value === 'large' ? '1rem' : '1.125rem'
                }}
                title={label}
              >
                <span className={`${fontSize === value ? '' : 'group-hover:text-neon-cyan'} transition-colors duration-300`}>
                  {icon}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Chevron toggle button - sticks to right edge */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:scale-110 transition-all duration-300 group"
          aria-label="Toggle font size control"
        >
          <svg
            className={`w-8 h-8 text-neon-cyan transition-all duration-300 ${
              isOpen ? 'rotate-180' : ''
            } group-hover:text-neon-pink group-hover:drop-shadow-[0_0_10px_rgba(255,0,255,0.8)]`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
