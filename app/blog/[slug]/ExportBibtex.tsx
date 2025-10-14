'use client';

import { useState } from 'react';
import type { BlogPost } from '@/data/blog';

interface ExportBibtexProps {
  post: BlogPost;
  websiteUrl?: string;
}

export default function ExportBibtex({ post, websiteUrl = 'https://velitchko.github.io' }: ExportBibtexProps) {
  const [copied, setCopied] = useState(false);

  const generateBibtex = (): string => {
    // Generate a citation key from title (remove special chars, convert to lowercase)
    const citationKey = post.title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '')
      .substring(0, 20);

    const year = new Date(post.date).getFullYear();
    const month = new Date(post.date).toLocaleString('en-US', { month: 'long' }).toLowerCase();
    
    // Format author (handle multiple authors if needed)
    const author = post.author || 'Anonymous';
    
    // Clean title for BibTeX (escape special characters)
    const title = post.title.replace(/[{}]/g, '');
    const subtitle = post.subtitle ? `: ${post.subtitle.replace(/[{}]/g, '')}` : '';
    
    // Get current date for "Accessed on" note
    const accessDate = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    const bibtex = `@misc{${citationKey}${year},
  author = {${author}},
  title = {${title}${subtitle}},
  year = {${year}},
  month = {${month}},
  howpublished = {\\url{${websiteUrl}/blog/${post.slug}}},
  note = {Blog post${post.hashtags.length > 0 ? `, keywords: ${post.hashtags.join(', ')}` : ''}. Accessed on ${accessDate}}
}`;

    return bibtex;
  };

  const handleCopy = async () => {
    const bibtex = generateBibtex();
    try {
      await navigator.clipboard.writeText(bibtex);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDownload = () => {
    const bibtex = generateBibtex();
    const blob = new Blob([bibtex], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${post.slug}.bib`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-12 pt-8 border-t border-neon-cyan/20">
      <h3 className="text-xl font-retro text-neon-cyan mb-4">
        [ CITE THIS POST ]
      </h3>
      
      <div className="retro-card bg-retro-darker/50">
        <pre className="text-sm text-neon-cyan/80 font-mono overflow-x-auto mb-4 p-4 bg-black/30 border border-neon-cyan/20">
          {generateBibtex()}
        </pre>
        
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleCopy}
            className="px-4 py-2 text-sm font-mono border-2 border-neon-cyan/50 text-neon-cyan bg-neon-cyan/10 hover:border-neon-cyan transition-all duration-300 relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-neon-cyan transform translate-y-full transition-transform duration-300 group-hover:translate-y-0 -z-10"></span>
            <span className="relative z-10 transition-colors duration-300 group-hover:text-retro-darker flex items-center gap-2">
              {copied ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  COPIED!
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  COPY BIBTEX
                </>
              )}
            </span>
          </button>

          <button
            onClick={handleDownload}
            className="px-4 py-2 text-sm font-mono border-2 border-neon-pink/50 text-neon-pink bg-neon-pink/10 hover:border-neon-pink transition-all duration-300 relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-neon-pink transform translate-y-full transition-transform duration-300 group-hover:translate-y-0 -z-10"></span>
            <span className="relative z-10 transition-colors duration-300 group-hover:text-retro-darker flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              DOWNLOAD .BIB
            </span>
          </button>
        </div>

        <p className="text-xs text-neon-cyan/50 font-mono mt-4">
          Use this BibTeX entry to cite this blog post in your academic work.
        </p>
      </div>
    </div>
  );
}
