# Velitchko Filipov

Source for [velitchko.github.io](https://velitchko.github.io): a static personal academic website for research, projects, publications, writing, and contact information.

The site is built with Next.js and TypeScript, exported as static files, and deployed to GitHub Pages. It has a retro theme alongside a restrained professional theme; the visitor's choice is stored locally in the browser.

## What lives here

- The homepage in `app/page.tsx`: profile, research interests, projects, publications, and contact details.
- Publication utilities and types in `data/publications.ts`.
- A BibTeX source of truth in `data/publications.bib`, plus generated data in `data/publications-generated.ts`.
- The co-author network at `/coauthors`, built with `d3-force`.
- Markdown posts in `data/blog-posts/`, served under `/blog`.
- Markdown-backed portfolio case studies in `data/portfolio-projects/`, served under `/portfolio`.
- Static assets, including the CV, in `public/`.

## Local development

The deployment workflow uses Node.js 20. Use the same major version locally.

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Useful checks:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

`npm run build` produces the static export in `out/`. The GitHub Actions deployment runs `npm ci` and the production build on every push to `main`.

## Publications

Do not edit `data/publications-generated.ts` by hand. Edit `data/publications.bib`, then regenerate:

```bash
node scripts/parse-bibtex.js
```

Commit the BibTeX source and generated TypeScript file together. The parser handles authors, venues, DOI/arXiv links, keywords, awards, and invited status.

Use standard entry types where possible. Presentations use `@presentation`; the website renders them as **Presentation** and automatically adds the **Invited** badge.

```bibtex
@presentation{example2026,
  author   = {First Author and Velitchko Filipov},
  title    = {{Example Presentation}},
  year     = {2026},
  venue    = {Example Workshop, Vienna, Austria},
  doi      = {10.xxxx/example},
  keywords = {Visualization; Visual Analytics}
}
```

For other invited work, add `invited = {true}`. Keyword values are semicolon- or comma-separated and feed the publication filter.

## Writing

Create a Markdown file in `data/blog-posts/` with front matter such as:

```markdown
---
title: "Post title"
subtitle: "Optional subtitle"
date: "2026-08-27"
author: "Velitchko Filipov"
hashtags: ["#datavis"]
categories: ["Research"]
excerpt: "A short listing summary."
---
```

Posts support GitHub-flavoured Markdown, code highlighting, and math. Drafts or material not meant for publication belong in `data/blog-posts/backlog/`.

## Deployment

`.github/workflows/deploy.yml` deploys the static export to GitHub Pages after pushes to `main`; it can also be triggered manually from GitHub Actions. The workflow accepts the optional `NEXT_PUBLIC_SITE_URL` secret to render absolute Open Graph URLs.

## Maintenance

- Keep generated publication data in sync with the BibTeX source.
- Prefer small, focused pull requests and include the checks you ran.
- Do not commit credentials, local configuration, or generated dependency directories.

This repository is the live website source, not a generic portfolio template.

## Portfolio case studies

Each Markdown file in `data/portfolio-projects/` is one case study and is the single source of truth for the interactive portfolio and browser-printable brochure. Start a new project by copying the blank template:

```bash
cp data/portfolio-projects/.template/project-template.md \\
  data/portfolio-projects/my-project.md
```

Use the filename as the stable project URL anchor (for example, `my-project.md` becomes `#my-project`). Required front matter is `title`, `blurb`, one or more `links`, and numeric `order`. `tags` is strongly recommended. Optional fields are `date`, `abstract`, `role`, `collaborators`, `outcomes`, `status`, and `featured`. The Markdown body is for the fuller case-study prose; headings, lists, links, emphasis, and tables are supported. Raw HTML is intentionally not rendered.

### Portfolio front-matter schema

Links are an ordered list of `{ label, url, kind }`; `kind` is one of `project`, `publication`, `repository`, `demo`, `documentation`, or `external`. Use a `hero` object for the leading image and an ordered `gallery` list for supporting figures. Each media object has a local `src`, descriptive `alt`, optional `caption`, and optional `type` (`image` or `gif`). Alt text is a concise, faithful description of what is visible for people using assistive technology; do not use a filename or repeat the project title. A caption is visible context, so add one only when it helps explain the image's role or significance without restating the alt text:

```yaml
hero:
  src: "/portfolio/my-project/hero.jpg"
  alt: "A concise description of the information visible in the image"
  caption: "Optional visible context explaining why this view matters"
gallery:
  - src: "/portfolio/my-project/01.jpg"
    alt: "What this supporting image shows"
  - src: "/portfolio/my-project/02.jpg"
    alt: "What this supporting image shows"
  - src: "/portfolio/my-project/03.jpg"
    alt: "What this supporting image shows"
```

Put canonical assets in `data/portfolio-projects/images/`; `public/portfolio` is the tracked symlink published by the static export. Their `src` begins with `/portfolio/` and must not use an external host. The renderer checks that the local file exists and that useful alternative text is supplied. Until either is ready, it keeps the authored hero/gallery slot as a clearly labelled placeholder rather than a broken or misleading image. The older `hero: filename.png`, `images: [filename.png]`, and `media` forms remain read-compatible, but should be migrated to the schema above when accurate alt text and assets are available.

The Portfolio navigation item leads to `/portfolio`; its sticky project list supports jumping through long case studies. Select **Save as PDF** to generate and download a brochure-style PDF containing only case studies marked `featured: true` (cover, one page per selected case study, and a closing contact page) rendered client-side with `@react-pdf/renderer` — see [components/PortfolioPdfDocument.tsx](components/PortfolioPdfDocument.tsx). The interactive portfolio continues to show every project. The page's print stylesheet (`@media print` in [app/globals.css](app/globals.css)) remains available as a fallback via the browser's print command.
