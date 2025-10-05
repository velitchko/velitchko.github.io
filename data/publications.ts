export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  type: 'Conference' | 'Journal' | 'Workshop' | 'Preprint' | 'Book Chapter';
  doi?: string;
  url?: string;
  arxiv?: string;
  pdfUrl?: string;
  codeUrl?: string;
  bibtex: string;
}

// Your name to highlight in publications
export const YOUR_NAME = "Filipov, V."; // Adjust this to match your name in citations

// Sample publications - Replace with your actual publications from Google Scholar
export const publications: Publication[] = [
  {
    id: "pub1",
    title: "Deep Learning Approaches to Complex Problems: A Comprehensive Study",
    authors: ["Filipov, V.", "Smith, J.", "Johnson, A."],
    venue: "Proceedings of International Conference on Machine Learning (ICML)",
    year: 2024,
    type: "Conference",
    doi: "10.1145/example.2024.001",
    url: "https://doi.org/10.1145/example.2024.001",
    pdfUrl: "https://arxiv.org/pdf/example.pdf",
    arxiv: "2024.12345",
    codeUrl: "https://github.com/yourusername/project",
    bibtex: `@inproceedings{filipov2024deep,
  title={Deep Learning Approaches to Complex Problems: A Comprehensive Study},
  author={Filipov, Velitchko and Smith, John and Johnson, Alice},
  booktitle={Proceedings of International Conference on Machine Learning},
  year={2024},
  organization={ICML},
  doi={10.1145/example.2024.001}
}`
  },
  {
    id: "pub2",
    title: "Novel Framework for Data Visualization Using Modern Web Technologies",
    authors: ["Filipov, V.", "Brown, M."],
    venue: "IEEE Transactions on Visualization and Computer Graphics, Vol. 30, No. 5",
    year: 2024,
    type: "Journal",
    doi: "10.1109/TVCG.2024.12345",
    url: "https://doi.org/10.1109/TVCG.2024.12345",
    pdfUrl: "https://example.com/paper.pdf",
    bibtex: `@article{filipov2024novel,
  title={Novel Framework for Data Visualization Using Modern Web Technologies},
  author={Filipov, Velitchko and Brown, Michael},
  journal={IEEE Transactions on Visualization and Computer Graphics},
  volume={30},
  number={5},
  pages={123--145},
  year={2024},
  publisher={IEEE},
  doi={10.1109/TVCG.2024.12345}
}`
  },
  {
    id: "pub3",
    title: "Scalable Solutions for Large-Scale Data Processing",
    authors: ["Wilson, K.", "Filipov, V.", "Davis, R."],
    venue: "Workshop on Big Data Analytics at NeurIPS 2023",
    year: 2023,
    type: "Workshop",
    doi: "10.48550/arXiv.2023.54321",
    url: "https://arxiv.org/abs/2023.54321",
    arxiv: "2023.54321",
    bibtex: `@inproceedings{wilson2023scalable,
  title={Scalable Solutions for Large-Scale Data Processing},
  author={Wilson, Karen and Filipov, Velitchko and Davis, Robert},
  booktitle={Workshop on Big Data Analytics at NeurIPS},
  year={2023},
  doi={10.48550/arXiv.2023.54321}
}`
  },
  {
    id: "pub4",
    title: "Towards Better Interactive Systems: An Empirical Analysis",
    authors: ["Filipov, V."],
    venue: "arXiv preprint arXiv:2023.11111",
    year: 2023,
    type: "Preprint",
    arxiv: "2023.11111",
    url: "https://arxiv.org/abs/2023.11111",
    pdfUrl: "https://arxiv.org/pdf/2023.11111.pdf",
    bibtex: `@article{filipov2023towards,
  title={Towards Better Interactive Systems: An Empirical Analysis},
  author={Filipov, Velitchko},
  journal={arXiv preprint arXiv:2023.11111},
  year={2023}
}`
  }
];

// Utility function to format authors with your name highlighted
export function formatAuthors(authors: string[], yourName: string = YOUR_NAME): Array<{ name: string; isYou: boolean }> {
  return authors.map(author => ({
    name: author,
    isYou: author === yourName || author.includes(yourName.split(',')[0])
  }));
}

// Utility function to parse BibTeX from a .bib file content
export function parseBibtex(bibtexContent: string): Publication[] {
  const entries: Publication[] = [];
  
  // Simple regex-based parser for BibTeX entries
  // Note: This is a basic parser. For production, consider using a library like bibtex-parse-js
  const entryRegex = /@(\w+)\{([^,]+),\s*([\s\S]*?)\n\}/g;
  const fieldRegex = /(\w+)\s*=\s*\{([^}]*)\}/g;
  
  let match;
  while ((match = entryRegex.exec(bibtexContent)) !== null) {
    const entryType = match[1];
    const citationKey = match[2];
    const fields = match[3];
    
    const entry: Partial<Publication> = {
      id: citationKey,
      bibtex: match[0]
    };
    
    let fieldMatch;
    while ((fieldMatch = fieldRegex.exec(fields)) !== null) {
      const key = fieldMatch[1].toLowerCase();
      const value = fieldMatch[2];
      
      switch (key) {
        case 'title':
          entry.title = value;
          break;
        case 'author':
          entry.authors = value.split(' and ').map(a => a.trim());
          break;
        case 'year':
          entry.year = parseInt(value);
          break;
        case 'journal':
        case 'booktitle':
          entry.venue = value;
          break;
        case 'doi':
          entry.doi = value;
          entry.url = `https://doi.org/${value}`;
          break;
      }
    }
    
    // Determine publication type from BibTeX entry type
    const typeMap: Record<string, Publication['type']> = {
      'article': 'Journal',
      'inproceedings': 'Conference',
      'incollection': 'Book Chapter',
      'misc': 'Preprint'
    };
    
    entry.type = typeMap[entryType.toLowerCase()] || 'Conference';
    
    if (entry.title && entry.authors && entry.venue && entry.year) {
      entries.push(entry as Publication);
    }
  }
  
  return entries;
}

// Sort publications by year (most recent first)
export function sortPublicationsByYear(pubs: Publication[]): Publication[] {
  return [...pubs].sort((a, b) => b.year - a.year);
}

// Group publications by year
export function groupPublicationsByYear(pubs: Publication[]): Record<number, Publication[]> {
  return pubs.reduce((acc, pub) => {
    if (!acc[pub.year]) {
      acc[pub.year] = [];
    }
    acc[pub.year].push(pub);
    return acc;
  }, {} as Record<number, Publication[]>);
}
