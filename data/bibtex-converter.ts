/**
 * BibTeX to TypeScript Converter Utility
 * 
 * This script helps convert a .bib file to TypeScript format
 * Usage: Uncomment and run this in a Node.js environment
 */

/*
import fs from 'fs';
import { parseBibtex } from './publications';

// Read your .bib file
const bibtexContent = fs.readFileSync('./publications.bib', 'utf-8');

// Parse it
const parsed = parseBibtex(bibtexContent);

// Generate TypeScript code
console.log('// Add these to your publications array:\n');

parsed.forEach(pub => {
  console.log(`{
  id: "${pub.id}",
  title: "${pub.title}",
  authors: [${pub.authors.map(a => `"${a}"`).join(', ')}],
  venue: "${pub.venue}",
  year: ${pub.year},
  type: "${pub.type}",
  ${pub.doi ? `doi: "${pub.doi}",` : ''}
  ${pub.url ? `url: "${pub.url}",` : ''}
  bibtex: \`${pub.bibtex}\`
},\n`);
});
*/

// Manual conversion helper functions
export function convertGoogleScholarBibtex(bibtexEntry: string): string {
  // Extract key information
  const titleMatch = bibtexEntry.match(/title\s*=\s*\{([^}]+)\}/);
  const authorMatch = bibtexEntry.match(/author\s*=\s*\{([^}]+)\}/);
  const yearMatch = bibtexEntry.match(/year\s*=\s*\{?(\d{4})\}?/);
  const doiMatch = bibtexEntry.match(/doi\s*=\s*\{([^}]+)\}/);
  const venueMatch = bibtexEntry.match(/(?:journal|booktitle)\s*=\s*\{([^}]+)\}/);
  const keyMatch = bibtexEntry.match(/@\w+\{([^,]+),/);
  
  const title = titleMatch ? titleMatch[1] : 'Unknown Title';
  const authors = authorMatch 
    ? authorMatch[1].split(' and ').map(a => {
        // Convert "Last, First" or "First Last" to consistent format
        const parts = a.trim().split(',');
        if (parts.length > 1) {
          return `${parts[0].trim()}, ${parts[1].trim()[0]}.`;
        }
        const names = a.trim().split(' ');
        if (names.length > 1) {
          return `${names[names.length - 1]}, ${names[0][0]}.`;
        }
        return a.trim();
      })
    : ['Unknown Author'];
  const year = yearMatch ? yearMatch[1] : '2024';
  const doi = doiMatch ? doiMatch[1] : '';
  const venue = venueMatch ? venueMatch[1] : 'Unknown Venue';
  const id = keyMatch ? keyMatch[1] : 'unknown';
  
  // Determine type
  const isJournal = bibtexEntry.includes('journal');
  const isConference = bibtexEntry.includes('booktitle') || bibtexEntry.includes('inproceedings');
  const type = isJournal ? 'Journal' : isConference ? 'Conference' : 'Preprint';
  
  return `{
  id: "${id}",
  title: "${title}",
  authors: [${authors.map(a => `"${a}"`).join(', ')}],
  venue: "${venue}",
  year: ${year},
  type: "${type}",${doi ? `\n  doi: "${doi}",\n  url: "https://doi.org/${doi}",` : ''}
  bibtex: \`${bibtexEntry.trim()}\`
}`;
}

// Example usage in comments:
/*
const exampleBibtex = `@article{filipov2024example,
  title={Example Paper Title},
  author={Filipov, Velitchko and Smith, John},
  journal={Journal Name},
  year={2024},
  doi={10.1234/example}
}`;

console.log(convertGoogleScholarBibtex(exampleBibtex));
*/

export function validatePublication(pub: any): string[] {
  const errors: string[] = [];
  
  if (!pub.id) errors.push('Missing id');
  if (!pub.title) errors.push('Missing title');
  if (!pub.authors || pub.authors.length === 0) errors.push('Missing authors');
  if (!pub.venue) errors.push('Missing venue');
  if (!pub.year) errors.push('Missing year');
  if (!pub.type) errors.push('Missing type');
  if (!pub.bibtex) errors.push('Missing bibtex');
  
  return errors;
}

export function checkForDuplicates(publications: any[]): string[] {
  const ids = publications.map(p => p.id);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  
  return [...new Set(duplicates)];
}

// Batch validation helper
export function validateAllPublications(publications: any[]): void {
  console.log('🔍 Validating publications...\n');
  
  let hasErrors = false;
  
  publications.forEach((pub, index) => {
    const errors = validatePublication(pub);
    if (errors.length > 0) {
      console.error(`❌ Publication ${index + 1} (${pub.id || 'unknown'}): ${errors.join(', ')}`);
      hasErrors = true;
    }
  });
  
  const duplicates = checkForDuplicates(publications);
  if (duplicates.length > 0) {
    console.error(`\n❌ Duplicate IDs found: ${duplicates.join(', ')}`);
    hasErrors = true;
  }
  
  if (!hasErrors) {
    console.log('✅ All publications are valid!');
    console.log(`📚 Total publications: ${publications.length}`);
  }
}
