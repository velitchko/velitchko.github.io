/**
 * Types for Markdown-backed portfolio case studies.
 *
 * Author project records in data/portfolio-projects/*.md. The parser in
 * lib/portfolio.ts reads those files at build time for both the web page and
 * its printable brochure layout.
 */
export type PortfolioLinkKind = "project" | "publication" | "repository" | "demo" | "documentation" | "external";

export type PortfolioLink = {
  label: string;
  url: string;
  kind: PortfolioLinkKind;
};

export type PortfolioMedia = {
  src: string;
  alt: string;
  caption?: string;
  type?: "image" | "gif";
  /** `false` keeps an authored slot visible without rendering a broken image. */
  isAvailable: boolean;
};

export type PortfolioProject = {
  slug: string;
  title: string;
  date?: string;
  blurb: string;
  abstract?: string;
  role?: string;
  collaborators?: string[];
  tags: string[];
  status?: "ongoing" | "completed" | "research";
  outcomes?: string[];
  links: PortfolioLink[];
  /** The main case-study image, displayed before the project title. */
  hero?: PortfolioMedia;
  /** Ordered supporting figures. `media` remains supported for older entries. */
  gallery?: PortfolioMedia[];
  featured?: boolean;
  order: number;
  contentHtml: string;
};
