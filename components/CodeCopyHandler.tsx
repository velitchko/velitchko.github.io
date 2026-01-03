'use client';

import { useEffect } from 'react';

// Use a WeakSet to track which buttons already have handlers attached
const attachedButtons = new WeakSet<HTMLButtonElement>();

export default function CodeCopyHandler() {
  useEffect(() => {
    function attachCopyHandlers() {
      document.querySelectorAll('button.copy-code-btn[data-code-copy]').forEach((btn) => {
        const button = btn as HTMLButtonElement;
        if (attachedButtons.has(button)) return;
        attachedButtons.add(button);
        
        button.addEventListener('click', () => {
          const codeElement = button.nextElementSibling as HTMLElement;
          const code = codeElement?.innerText;
          
          if (code && navigator.clipboard) {
            navigator.clipboard.writeText(code).then(() => {
              button.classList.add('copied');
              setTimeout(() => {
                button.classList.remove('copied');
              }, 1200);
            }).catch((err) => {
              console.error('Failed to copy code:', err);
            });
          }
        });
      });
    }

    // Attach handlers after component mounts and content is rendered
    attachCopyHandlers();
  }, []); // Empty dependency array means this runs once after mount

  return null; // This component doesn't render anything
}
