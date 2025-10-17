'use client';

import { useEffect, useState } from 'react';

type FontSize = 'small' | 'medium' | 'large' | 'xlarge';

export default function FontSizeControl() {
  const [fontSize, setFontSize] = useState<FontSize>('medium');
  const [mounted, setMounted] = useState(false);

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
    
    // Apply to all blog-content elements
    const blogContent = document.querySelectorAll('.blog-content');
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
    <div className="hidden md:flex fixed right-8 top-1/2 -translate-y-1/2 z-50 flex-col gap-2">
      <div className="bg-retro-darker border-2 border-neon-cyan/50 p-3 backdrop-blur-sm">
        <div className="text-xs font-mono text-neon-cyan mb-2 text-center">
          FONT SIZE
        </div>
        <div className="flex flex-col gap-1">
          {sizes.map(({ value, label, icon }) => (
            <button
              key={value}
              onClick={() => setFontSize(value)}
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
    </div>
  );
}
