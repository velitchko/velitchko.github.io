'use client';

import { useEffect } from 'react';

/**
 * Makes checkboxes in markdown content interactive by enabling them
 * and persisting their state in localStorage
 */
export default function InteractiveCheckboxes({ slug }: { slug: string }) {
  useEffect(() => {
    // Enable all checkboxes (they're disabled by default in remark output)
    const checkboxes = document.querySelectorAll<HTMLInputElement>(
      '.blog-content input[type="checkbox"]'
    );

    checkboxes.forEach((checkbox, index) => {
      // Enable the checkbox
      checkbox.disabled = false;

      // Create a unique ID for this checkbox based on slug and index
      const checkboxId = `checkbox-${slug}-${index}`;

      // Load saved state from localStorage
      const savedState = localStorage.getItem(checkboxId);
      if (savedState === 'true') {
        checkbox.checked = true;
      }

      // Save state on change
      const handleChange = () => {
        localStorage.setItem(checkboxId, checkbox.checked.toString());
      };

      checkbox.addEventListener('change', handleChange);

      // Cleanup
      return () => {
        checkbox.removeEventListener('change', handleChange);
      };
    });
  }, [slug]);

  return null;
}
