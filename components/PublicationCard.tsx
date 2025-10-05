'use client';

import { useState } from 'react';
import { Publication, formatAuthors, YOUR_NAME } from '@/data/publications';

interface PublicationCardProps {
  publication: Publication;
}

export default function PublicationCard({ publication }: PublicationCardProps) {
  const [showBibtex, setShowBibtex] = useState(false);
  const [copied, setCopied] = useState(false);

  const authors = formatAuthors(publication.authors, YOUR_NAME);

  const handleCopyBibtex = async () => {
    try {
      await navigator.clipboard.writeText(publication.bibtex);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy BibTeX:', err);
    }
  };

  const handleDownloadBibtex = () => {
    const blob = new Blob([publication.bibtex], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${publication.id}.bib`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="retro-card">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
        <span className="inline-block px-3 py-1 text-xs border border-neon-cyan/50 text-neon-cyan bg-neon-cyan/10 mb-2 md:mb-0 w-fit">
          {publication.type}
        </span>
        <span className="text-neon-pink font-mono text-sm">{publication.year}</span>
      </div>

      <h3 className="text-lg font-bold text-neon-cyan mb-3 leading-relaxed">
        {publication.title}
      </h3>

      <p className="text-neon-cyan/70 text-sm mb-2 flex flex-wrap gap-1">
        {authors.map((author, index) => (
          <span key={index} className="inline-flex items-center">
            <span
              className={
                author.isYou
                  ? 'font-bold text-neon-pink neon-glow-pink'
                  : ''
              }
            >
              {author.name}
            </span>
            {index < authors.length - 1 && <span className="mr-1">,</span>}
          </span>
        ))}
      </p>

      <p className="text-neon-cyan/60 text-sm italic mb-4">
        {publication.venue}
      </p>

      <div className="flex flex-wrap gap-4 text-sm mb-4">
        {publication.doi && (
          <a
            href={publication.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neon-pink hover:neon-glow transition-colors inline-flex items-center"
            title={`DOI: ${publication.doi}`}
          >
            <span className="mr-1">→</span> DOI
          </a>
        )}

        {publication.pdfUrl && (
          <a
            href={publication.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neon-cyan hover:text-neon-pink transition-colors inline-flex items-center"
          >
            <span className="mr-1">→</span> PDF
          </a>
        )}

        {publication.arxiv && (
          <a
            href={`https://arxiv.org/abs/${publication.arxiv}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neon-cyan hover:text-neon-pink transition-colors inline-flex items-center"
          >
            <span className="mr-1">→</span> arXiv
          </a>
        )}

        {publication.codeUrl && (
          <a
            href={publication.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neon-cyan hover:text-neon-pink transition-colors inline-flex items-center"
          >
            <span className="mr-1">→</span> Code
          </a>
        )}

        <button
          onClick={() => setShowBibtex(!showBibtex)}
          className="text-neon-cyan hover:text-neon-pink transition-colors inline-flex items-center"
        >
          <span className="mr-1">{showBibtex ? '▼' : '▶'}</span> BibTeX
        </button>
      </div>

      {showBibtex && (
        <div className="border-2 border-neon-cyan/30 bg-retro-darker/50 p-4 rounded">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs text-neon-cyan/60 font-mono">BIBTEX CITATION</span>
            <div className="flex gap-2">
              <button
                onClick={handleCopyBibtex}
                className="text-xs px-3 py-1 border border-neon-pink/50 text-neon-pink bg-neon-pink/10 hover:bg-neon-pink/20 transition-colors"
                title="Copy to clipboard"
              >
                {copied ? '✓ COPIED' : '⧉ COPY'}
              </button>
              <button
                onClick={handleDownloadBibtex}
                className="text-xs px-3 py-1 border border-neon-cyan/50 text-neon-cyan bg-neon-cyan/10 hover:bg-neon-cyan/20 transition-colors"
                title="Download .bib file"
              >
                ⬇ EXPORT
              </button>
            </div>
          </div>
          <pre className="text-xs text-neon-cyan/80 overflow-x-auto font-mono whitespace-pre-wrap break-all">
            {publication.bibtex}
          </pre>
        </div>
      )}
    </div>
  );
}
