# Publications Data Management

## How to Add Your Publications

### Method 1: Manual Entry (Recommended for Small Collections)

1. Open `data/publications.ts`
2. Add your publication to the `publications` array following this template:

```typescript
{
  id: "unique-id", // Use citation key like "filipov2024paper"
  title: "Your Paper Title",
  authors: ["Filipov, V.", "Co-Author, A.", "Co-Author, B."],
  venue: "Conference/Journal Name",
  year: 2024,
  type: "Conference", // or "Journal", "Workshop", "Preprint", "Book Chapter"
  doi: "10.1234/example", // Optional
  url: "https://doi.org/10.1234/example", // Optional - link to paper
  arxiv: "2024.12345", // Optional - arXiv ID
  pdfUrl: "https://example.com/paper.pdf", // Optional
  codeUrl: "https://github.com/username/repo", // Optional
  bibtex: `@inproceedings{filipov2024paper,
  title={Your Paper Title},
  author={Filipov, Velitchko and Co-Author, Alice and Co-Author, Bob},
  booktitle={Conference Name},
  year={2024},
  doi={10.1234/example}
}`
}
```

### Method 2: Export from Google Scholar

1. Go to your Google Scholar profile
2. Select the publications you want to add
3. Click "Export" → "BibTeX"
4. Copy the BibTeX entries
5. For each entry, convert it to the format above

**Example from Google Scholar BibTeX:**

```bibtex
@article{filipov2024visualization,
  title={Advanced Visualization Techniques},
  author={Filipov, Velitchko and Smith, John},
  journal={IEEE TVCG},
  volume={30},
  number={1},
  pages={1--12},
  year={2024},
  publisher={IEEE}
}
```

**Convert to:**

```typescript
{
  id: "filipov2024visualization",
  title: "Advanced Visualization Techniques",
  authors: ["Filipov, V.", "Smith, J."],
  venue: "IEEE Transactions on Visualization and Computer Graphics, Vol. 30, No. 1",
  year: 2024,
  type: "Journal",
  doi: "10.1109/TVCG.2024.xxxxx", // Add if available
  bibtex: `@article{filipov2024visualization,
  title={Advanced Visualization Techniques},
  author={Filipov, Velitchko and Smith, John},
  journal={IEEE Transactions on Visualization and Computer Graphics},
  volume={30},
  number={1},
  pages={1--12},
  year={2024},
  publisher={IEEE}
}`
}
```

### Method 3: Bulk Import from .bib File (Advanced)

If you have a `.bib` file with all your publications:

1. Save your `.bib` file in this directory (e.g., `my-publications.bib`)
2. Use the `parseBibtex()` function to parse it
3. Manually review and enhance the entries with DOI links, PDF URLs, etc.

```typescript
import { parseBibtex } from './publications';
import fs from 'fs';

// Read your .bib file
const bibtexContent = fs.readFileSync('my-publications.bib', 'utf-8');
const parsedPubs = parseBibtex(bibtexContent);

// Review and enhance the parsed publications
console.log(parsedPubs);
```

## Customization

### Update Your Name

In `publications.ts`, change this line to match how your name appears in citations:

```typescript
export const YOUR_NAME = "Filipov, V."; // Adjust to match your citation style
```

Common formats:
- `"Filipov, V."`
- `"Filipov, Velitchko"`
- `"V. Filipov"`

### Publication Types

Available types:
- `Conference` - Conference papers
- `Journal` - Journal articles
- `Workshop` - Workshop papers
- `Preprint` - arXiv or other preprints
- `Book Chapter` - Book chapters

## Features

✅ **Name Highlighting**: Your name is automatically highlighted in pink with glow effect  
✅ **DOI Links**: Direct links to paper DOI  
✅ **Multiple Links**: Support for PDF, arXiv, Code repositories  
✅ **BibTeX Export**: Click to view BibTeX, copy to clipboard, or download .bib file  
✅ **Auto-sorting**: Publications automatically sorted by year (most recent first)  

## Tips

- Keep your BibTeX formatted consistently
- Always include the full BibTeX entry for accurate citations
- Add DOI links whenever available for better accessibility
- Include links to code repositories to increase impact
- Use consistent author name format across all publications

## Example: Adding a New Publication

1. Get the BibTeX from Google Scholar or the publisher
2. Add the entry to `publications` array in `publications.ts`
3. Fill in all available fields (DOI, PDF URL, code URL)
4. Save the file
5. The publication will automatically appear on your website

That's it! Your publications are now beautifully displayed with full BibTeX support.
