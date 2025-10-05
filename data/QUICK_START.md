# Quick Reference: Adding Your Publications

## 🚀 3-Step Quick Start

### Step 1: Update Your Name
Open `data/publications.ts` and change:
```typescript
export const YOUR_NAME = "Filipov, V."; // ← Change this to your name
```

### Step 2: Get BibTeX from Google Scholar
1. Go to [Google Scholar](https://scholar.google.com)
2. Search for your name
3. Click on each paper → "Cite" → "BibTeX"
4. Copy the BibTeX text

### Step 3: Add to publications.ts
Replace the example publications with yours:

```typescript
export const publications: Publication[] = [
  {
    id: "your-citation-key-2024",        // From @article{HERE,
    title: "Your Paper Title",           
    authors: ["Your Name", "Co-Author"],  // Keep consistent format!
    venue: "Conference/Journal Name",     
    year: 2024,                          
    type: "Conference",                   // or "Journal", "Workshop", etc.
    doi: "10.xxxx/xxxxx",                // Optional but recommended
    url: "https://doi.org/10.xxxx/xxxxx", // Link to paper
    pdfUrl: "https://...",               // Optional - direct PDF link
    arxiv: "2024.12345",                 // Optional - arXiv ID
    codeUrl: "https://github.com/...",  // Optional - code repo
    bibtex: `@article{...}`              // Paste full BibTeX here
  },
];
```

## 📋 Template for Copy-Paste

```typescript
{
  id: "",
  title: "",
  authors: [""],
  venue: "",
  year: 2024,
  type: "Conference",
  doi: "",
  url: "",
  bibtex: ``
},
```

## ✨ Features You Get

- ✅ **Name Highlighted** in neon pink automatically
- ✅ **DOI Link** → Direct to official paper page
- ✅ **PDF Link** → Direct download
- ✅ **arXiv Link** → arXiv page
- ✅ **Code Link** → GitHub repository
- ✅ **BibTeX** → Click to expand, copy, or export
- ✅ **Auto-sorted** by year (newest first)
- ✅ **Mobile-friendly** responsive design

## 🎯 Common Author Name Formats

Choose the format that matches how you appear in citations:

```typescript
// Format 1: Last, First Initial
export const YOUR_NAME = "Filipov, V.";

// Format 2: Full name
export const YOUR_NAME = "Filipov, Velitchko";

// Format 3: First Initial Last
export const YOUR_NAME = "V. Filipov";
```

Then use the **same format** in your `authors` arrays!

## 🔍 Finding Your Information

### DOI
- Check the publisher's website
- Look for "DOI: 10.xxxx/xxxxx" on the paper page
- Some papers don't have DOI (that's ok!)

### arXiv ID
- If on arXiv, URL is: `arxiv.org/abs/XXXX.XXXXX`
- Copy the number part: `2024.12345`

### PDF URL
- Publisher website "Download PDF" button
- Your personal website
- arXiv: `https://arxiv.org/pdf/XXXX.XXXXX.pdf`

## 🎨 Publication Types

```typescript
type: "Conference"      // Conference papers
type: "Journal"         // Journal articles  
type: "Workshop"        // Workshop papers
type: "Preprint"        // arXiv, bioRxiv, etc.
type: "Book Chapter"    // Book chapters
```

## 💡 Pro Tips

1. **Consistent Names**: Use the same format for your name across all publications
2. **Include DOIs**: Helps readers find the official version
3. **Add Code Links**: Increases impact and citations
4. **Full BibTeX**: Always include complete BibTeX for proper citations
5. **Check Formatting**: Test on localhost before deploying

## 🐛 Troubleshooting

**Name not highlighting?**
- Check that `YOUR_NAME` exactly matches how it appears in `authors` array
- Try different name formats (see above)

**BibTeX not showing?**
- Make sure BibTeX is wrapped in backticks: \`...\`
- Check for unescaped special characters

**Links not working?**
- Verify URLs are complete with `https://`
- Check for typos in DOI numbers

## 📚 Need More Help?

See full guide: `data/README.md`

---

**That's it!** Update `data/publications.ts` → See changes on your site! 🎉
