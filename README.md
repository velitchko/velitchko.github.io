# 🌐 Retro-Futuristic Academic Portfolio

A stunning personal academic website with a CRT/vaporwave aesthetic, built with Next.js and deployed on GitHub Pages.

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)

## 🎯 Sections

1. **Hero/Home** - Eye-catching landing with animated elements
2. **Publications** - Interactive publication list with:
   - Keyword filtering (top 15 keywords)
   - BibTeX export for each publication
   - Year-based grouping
   - DOI/arXiv links
3. **Co-author Network** - Force-directed graph visualization of research collaborations
4. **Blog** - Academic blog with markdown support
5. **Fun Easter Egg** - Hidden retro chicken clicker game (try `/chicken` - can you reach the high score?)
6. **Contact** - Footer with social links

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Git installed
- A GitHub account

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   Navigate to `http://localhost:3000` to see your site!

## 📝 Customization Guide

### 1. Update Personal Information

Edit `/app/page.tsx` and replace the placeholder text:

- `YOUR NAME` - Your actual name
- `[Your Title]` - Your academic title
- `[Your Institution]` - Your university/organization
- `[Your Research Area]` - Your field of study
- `[Your Field]` - Your specific area
- Email addresses and social links

### 2. Update Navigation Logo

In `/components/Navigation.tsx`, change:
```tsx
<h1 className="text-xl sm:text-2xl font-retro neon-glow-pink glitch">
  &lt;YourName/&gt;
</h1>
```

### 3. Customize Research Interests

In `/app/page.tsx`, update the research interests array with your actual areas:
```tsx
{
  title: "Your Research Area",
  description: "Your description here",
  icon: "🔬"
}
```

### 4. Add Your Projects

Replace the placeholder projects with your actual work:
```tsx
{
  title: "Your Project Name",
  description: "Project description",
  tags: ["Tech1", "Tech2", "Tech3"],
  link: "https://github.com/yourusername/project"
}
```

### 5. Update Publications

You have two options for managing publications:

**Option A: Use BibTeX (Recommended)**
1. Add your publications to `data/publications.bib`
2. Run the parser:
   ```bash
   node scripts/parse-bibtex.js
   ```
3. The script will automatically generate `data/publications-generated.ts`

See `data/QUICK_START.md` for detailed instructions on BibTeX format and supported fields.

**Option B: Manual Entry**
Edit `data/publications.ts` and add publications manually in TypeScript format.

## 📚 Bibliography Management

This website features a powerful automated BibTeX-to-TypeScript workflow that makes managing academic publications effortless.

### How It Works

1. **Source**: Maintain your publications in `data/publications.bib` (standard BibTeX format)
2. **Parse**: Run `node scripts/parse-bibtex.js` to convert BibTeX to TypeScript
3. **Output**: Auto-generates `data/publications-generated.ts` with full type safety
4. **Display**: Publications appear on the main page with filtering and export features

### Supported BibTeX Fields

The parser automatically extracts and converts:

- **Standard Fields**: `title`, `author`, `year`, `booktitle`/`journal`, `doi`, `url`
- **Special Fields**:
  - `keywords` → Enables keyword filtering (semicolon or comma separated)
  - `invited = {true}` → Marks invited talks/papers
  - `award` → Displays awards or honors
  - `eprint` + `eprinttype = {arXiv}` → Adds arXiv links
- **Character Handling**: Automatically converts LaTeX special characters (e.g., `\"o` → ö)

### BibTeX Workflow

1. **Export from Google Scholar**:
   - Search for your papers
   - Click "Cite" → "BibTeX"
   - Copy the BibTeX entry

2. **Add to publications.bib**:
   ```bibtex
   @article{YourKey2024,
       title        = {{Your Paper Title}},
       author       = {Your Name and Coauthor Name},
       year         = 2024,
       booktitle    = {Conference Name},
       doi          = {10.xxxx/xxxxx},
       keywords     = {Keyword1; Keyword2; Keyword3},
       invited      = {true}
   }
   ```

3. **Generate TypeScript**:
   ```bash
   node scripts/parse-bibtex.js
   ```
   ✅ Successfully generated 42 publications to data/publications-generated.ts

4. **Verify**: Check your localhost - publications update automatically!

### Publication Features

- **Keyword Filtering**: Top 15 keywords displayed as clickable filters
- **BibTeX Export**: Each publication has an expandable BibTeX citation
- **Year Grouping**: Publications organized by year (newest first)
- **Smart Links**: DOI and arXiv links automatically formatted
- **Author Highlighting**: Your name highlighted in neon pink

### 6. Update Contact Information

In the Contact section, update:
- Email address
- Institution/Location
- Social media links (GitHub, Google Scholar, LinkedIn, Twitter/X)

### 7. Add Profile Picture

Replace the emoji placeholder in the About section with your actual photo.

### 8. Blog Management

Share your research insights, thoughts, and updates through the built-in blog system.

#### Creating a New Blog Post

1. **Create a Markdown file** in `data/blog-posts/`:
   ```bash
   # Example: my-new-post.md
   ```

2. **Add frontmatter** at the top:
   ```markdown
   ---
   title: "Your Post Title"
   subtitle: "Optional subtitle"
   date: "2025-12-15"
   author: "Your Name"
   hashtags: ["#research", "#visualization", "#datascience"]
   categories: ["Research", "Tutorial"]
   excerpt: "A brief summary of your post that appears in the listing."
   featured: true
   ---

   Your markdown content here...
   ```

3. **Write in Markdown**: Full markdown support including:
   - Headers, lists, code blocks
   - Images and links
   - LaTeX math equations (inline `$...$` or block `$$...$$`)
   - Syntax highlighting for code

4. **Register the post** in `data/blog.ts`:
   ```typescript
   import { readFileSync } from 'fs';
   import matter from 'gray-matter';
   
   // The blog system automatically parses .md files from blog-posts/
   ```

5. **Preview**: Navigate to `/blog` to see your posts

#### Blog Features

- **Markdown Support**: Write naturally with full markdown syntax
- **Syntax Highlighting**: Beautiful code blocks with language detection
- **LaTeX Math**: Render equations using KaTeX
- **Hashtags**: Organize posts with hashtags
- **Reading Time**: Automatically calculated
- **Responsive Design**: Looks great on all devices
- **BibTeX Integration**: Reference your publications in blog posts

### 9. Customize Colors

Edit `/tailwind.config.ts` to change the color scheme:
```ts
colors: {
  neon: {
    pink: '#ff00ff',
    cyan: '#00ffff',
    purple: '#b19cd9',
    blue: '#00d9ff',
    green: '#39ff14',
  }
}
```

## 🚀 Deployment to GitHub Pages

### Step 1: Update Repository Name

If your GitHub username is `username`, rename this repository to `username.github.io` in GitHub settings.

### Step 2: Update Configuration

In `next.config.ts`, update the basePath:
```ts
basePath: process.env.NODE_ENV === 'production' ? '' : '',
assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
```

If using a project repo (not `username.github.io`), keep it as `/github.io`.

### Step 3: Enable GitHub Pages

1. Go to your repository settings
2. Navigate to **Pages** section
3. Under **Source**, select **GitHub Actions**

### Step 4: Push and Deploy

```bash
git add .
git commit -m "Initial deployment"
git push origin main
```

The GitHub Action will automatically build and deploy your site!

### Step 5: Access Your Site

Your site will be available at:
- **User site**: `https://username.github.io`
- **Project site**: `https://username.github.io/github.io`

## 🛠️ Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🎨 Design Features

### CRT Screen Effects
- Scanline overlay
- Screen flicker
- Monitor glow
- VHS tracking lines

### Typography
- **VT323**: Retro terminal font for body text
- **Press Start 2P**: Pixel font for headings

### Animations
- Glitch effect on main title
- Neon glow pulse
- Terminal cursor blink
- Smooth hover transitions
- Card lift effects

### Color Palette
- **Primary**: Cyan (#00ffff)
- **Secondary**: Magenta (#ff00ff)
- **Accent**: Purple (#b19cd9)
- **Background**: Deep black (#0a0a0a)

## 📁 Project Structure

```
github.io/
├── app/
│   ├── layout.tsx                    # Root layout with CRT effects
│   ├── page.tsx                      # Publications page with filtering
│   ├── globals.css                   # Global styles and CRT CSS
│   ├── blog/
│   │   ├── page.tsx                  # Blog listing page
│   │   ├── BlogListing.tsx           # Blog post component
│   │   └── [slug]/
│   │       ├── page.tsx              # Individual blog post
│   │       └── ExportBibtex.tsx      # BibTeX export component
│   ├── coauthors/
│   │   └── page.tsx                  # Co-author network visualization
│   └── chicken/
│       └── page.tsx                  # Easter egg page
├── components/
│   ├── Navigation.tsx                # Nav bar component
│   ├── Footer.tsx                    # Footer component
│   ├── PublicationCard.tsx           # Publication display component
│   ├── CoauthorNetwork.tsx           # Network graph visualization
│   ├── FontSizeControl.tsx           # Accessibility controls
│   └── ScrollToTop.tsx               # Scroll to top button
├── data/
│   ├── publications.bib              # BibTeX source file
│   ├── publications-generated.ts     # Auto-generated from BibTeX
│   ├── publications.ts               # Publication utilities & types
│   ├── blog.ts                       # Blog post metadata
│   └── blog-posts/                   # Markdown blog posts
├── lib/
│   └── markdown.ts                   # Markdown processing utilities
├── scripts/
│   └── parse-bibtex.js               # BibTeX to TypeScript converter
├── public/                           # Static assets
├── .github/
│   └── workflows/
│       └── deploy.yml                # GitHub Actions deployment
├── next.config.ts                    # Next.js configuration
├── tailwind.config.ts                # Tailwind CSS configuration
└── package.json
```

## 🤝 Contributing

Feel free to fork this project and customize it for your needs!

## 📄 License

MIT License - feel free to use this template for your personal academic website.

---

**Made with 💜 and lots of neon glow**
