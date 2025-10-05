# 🌐 Retro-Futuristic Academic Portfolio

A stunning personal academic website with a CRT/vaporwave aesthetic, built with Next.js and deployed on GitHub Pages.

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)

## ✨ Features

- 🎨 **Retro CRT Aesthetic**: Scanlines, neon glow effects, and vaporwave color palette
- 📱 **Fully Responsive**: Perfect on desktop, tablet, and mobile
- ⚡ **Fast Performance**: Static site generation with Next.js
- 🎯 **SEO Optimized**: Proper meta tags and semantic HTML
- 🚀 **Auto-Deployment**: GitHub Actions workflow for seamless publishing
- 💫 **Smooth Animations**: Glitch effects, glow transitions, and terminal cursors
- 📝 **Academic Focus**: Sections for research, projects, publications, and contact

## 🎯 Sections

1. **Hero/Home** - Eye-catching landing with animated elements
2. **About** - Personal bio, photo placeholder, and education
3. **Research Interests** - Showcase your areas of expertise
4. **Projects** - Portfolio of your work with tags and links
5. **Publications** - List of papers with citation info
6. **Contact** - Get in touch section with social links

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

Add your real publications:
```tsx
{
  title: "Your Paper Title",
  authors: "Author list",
  venue: "Conference/Journal name",
  year: "2024",
  link: "https://doi.org/...",
  type: "Conference" // or "Journal", "Workshop", "Preprint"
}
```

### 6. Update Contact Information

In the Contact section, update:
- Email address
- Institution/Location
- Social media links (GitHub, Google Scholar, LinkedIn, Twitter/X)

### 7. Add Profile Picture

Replace the emoji placeholder in the About section with your actual photo.

### 8. Customize Colors

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
│   ├── layout.tsx          # Root layout with CRT effects
│   ├── page.tsx            # Main page with all sections
│   └── globals.css         # Global styles and CRT CSS
├── components/
│   ├── Navigation.tsx      # Nav bar component
│   └── Footer.tsx          # Footer component
├── public/                 # Static assets
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions deployment
├── next.config.ts          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
└── package.json
```

## 🤝 Contributing

Feel free to fork this project and customize it for your needs!

## 📄 License

MIT License - feel free to use this template for your personal academic website.

---

**Made with 💜 and lots of neon glow**
