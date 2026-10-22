"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { PortfolioProject } from "@/data/portfolio";
import { getProjectVisuals, type ProjectVisualSet } from "@/lib/placeholderArt";
import { ProjectHero, ProjectVisualStrip } from "@/components/ProjectVisual";

function ProjectMedia({ project, visuals }: { project: PortfolioProject; visuals: ProjectVisualSet }) {
  if (!project.gallery?.length) {
    return <ProjectVisualStrip id={project.slug} items={visuals.strip} />;
  }

  return (
    <div className="portfolio-media-grid" aria-label="Supporting project media">
      {project.gallery.map((media, index) => (
        <figure key={media.src}>
          {media.isAvailable ? (
            // Native img keeps static export and local GIFs simple.
            // eslint-disable-next-line @next/next/no-img-element -- local images/GIFs stay compatible with static export
            <img src={media.src} alt={media.alt} />
          ) : (
            <div className="portfolio-media-placeholder" role="img" aria-label={`Supporting image ${index + 1} pending`}>
              <span>Supporting image {index + 1}</span>
              <small>Local asset and descriptive text pending</small>
            </div>
          )}
          {media.caption && <figcaption>{media.caption}</figcaption>}
        </figure>
      ))}
    </div>
  );
}

export default function PortfolioClient({ projects }: { projects: PortfolioProject[] }) {
  const [activeProject, setActiveProject] = useState(projects[0]?.slug);
  const [isNavigatorOpen, setIsNavigatorOpen] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const navigatorTriggerRef = useRef<HTMLButtonElement>(null);
  const navigatorCloseRef = useRef<HTMLButtonElement>(null);

  // Deterministic per-project so the same project always gets the same concept
  // art, both in the live page and in the exported PDF brochure.
  const visualsBySlug = useMemo(() => {
    const map = new Map<string, ProjectVisualSet>();
    projects.forEach((project) => map.set(project.slug, getProjectVisuals(project.slug)));
    return map;
  }, [projects]);

  const handleExportPdf = async () => {
    if (isExportingPdf) return;
    setIsExportingPdf(true);
    try {
      const [{ pdf }, { default: PortfolioPdfDocument }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("@/components/PortfolioPdfDocument"),
      ]);
      const blob = await pdf(<PortfolioPdfDocument projects={projects} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "velitchko-filipov-portfolio.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to generate portfolio PDF, falling back to browser print.", error);
      window.print();
    } finally {
      setIsExportingPdf(false);
    }
  };

  const jumpTo = (slug: string) => {
    setActiveProject(slug);
    setIsNavigatorOpen(false);
    document.getElementById(slug)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    if (!isNavigatorOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsNavigatorOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    const trigger = navigatorTriggerRef.current;
    document.body.style.overflow = "hidden";
    navigatorCloseRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      trigger?.focus();
    };
  }, [isNavigatorOpen]);

  const ProjectMetadata = ({ project }: { project: PortfolioProject }) => (
    <>
      {project.abstract && <section><h3>Project summary</h3><p>{project.abstract}</p></section>}
      {project.role && <section><h3>Contribution</h3><p>{project.role}</p></section>}
      {project.collaborators?.length && <section><h3>Collaborators</h3><p>{project.collaborators.join(", ")}</p></section>}
      {project.outcomes?.length && <section><h3>Outcomes</h3><ul>{project.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul></section>}
    </>
  );

  const hasMetadata = (project: PortfolioProject) => Boolean(project.abstract || project.role || project.collaborators?.length || project.outcomes?.length);

  return (
    <div className="portfolio-page">
      <section className="portfolio-cover print-page">
        <p className="portfolio-eyebrow"><span className="retro-only">[selected_work.exe]</span><span className="pro-only">Selected work</span></p>
        <h1>Projects that make complex systems easier to see, explore, and discuss.</h1>
        <p className="portfolio-lede">A working portfolio of research and applied projects across visual analytics, network visualization, and collaborative data exploration.</p>
        <div className="portfolio-cover-actions no-print">
          <button className="retro-button" onClick={handleExportPdf} type="button" disabled={isExportingPdf} aria-busy={isExportingPdf}>
            <span className="retro-only">{isExportingPdf ? "GENERATING PDF…" : "SAVE AS PDF"}</span>
            <span className="pro-only">{isExportingPdf ? "Generating PDF…" : "Save as PDF"}</span>
          </button>
          <a href="#case-studies" className="portfolio-text-link">Browse case studies ↓</a>
        </div>
        <p className="portfolio-print-note print-only">Portfolio · Velitchko Filipov · Visualization Researcher</p>
      </section>

      <div className="portfolio-shell">
        <div className="portfolio-navigator no-print">
          <button
            ref={navigatorTriggerRef}
            className="portfolio-navigator-trigger"
            type="button"
            aria-haspopup="dialog"
            aria-expanded={isNavigatorOpen}
            aria-controls="portfolio-project-navigator"
            aria-label="Open project navigation"
            title="Open project navigation"
            onClick={() => setIsNavigatorOpen(true)}
          >
            <span className="portfolio-navigator-chevron" aria-hidden="true">›</span>
          </button>
          {isNavigatorOpen && (
            <div className="portfolio-navigator-layer" role="presentation">
              <button className="portfolio-navigator-backdrop" type="button" aria-label="Close project navigation" onClick={() => setIsNavigatorOpen(false)} />
              <aside id="portfolio-project-navigator" className="portfolio-quick-nav" role="dialog" aria-modal="true" aria-label="Portfolio projects">
                <div className="portfolio-nav-heading">
                  <p className="portfolio-nav-label">Quick navigation</p>
                  <button ref={navigatorCloseRef} className="portfolio-navigator-close" type="button" onClick={() => setIsNavigatorOpen(false)}>Close <span aria-hidden="true">×</span></button>
                </div>
                <ol>
                  {projects.map((project, index) => (
                    <li key={project.slug}>
                      <button className={activeProject === project.slug ? "is-active" : ""} type="button" onClick={() => jumpTo(project.slug)} aria-current={activeProject === project.slug ? "location" : undefined}>
                        <span>{String(index + 1).padStart(2, "0")}</span>{project.title}
                      </button>
                    </li>
                  ))}
                </ol>
                <button className="portfolio-print-button" type="button" onClick={handleExportPdf} disabled={isExportingPdf}>{isExportingPdf ? "Generating PDF…" : "Save as PDF"}</button>
              </aside>
            </div>
          )}
        </div>
        <main id="case-studies" className="portfolio-case-studies" aria-label="Portfolio case studies">
          {projects.map((project, index) => {
            const visuals = visualsBySlug.get(project.slug)!;
            return (
            <article className="portfolio-case-study print-page" id={project.slug} key={project.slug} tabIndex={-1}>
              <div className="portfolio-index">{String(index + 1).padStart(2, "0")}</div>
              <div className="portfolio-case-content">
                <header className="portfolio-case-header">
                  {project.hero?.isAvailable ? (
                    <figure className="portfolio-hero portfolio-hero-image">
                      {/* eslint-disable-next-line @next/next/no-img-element -- local images/GIFs stay compatible with static export */}
                      <img src={project.hero.src} alt={project.hero.alt} />
                      {project.hero.caption && <figcaption>{project.hero.caption}</figcaption>}
                    </figure>
                  ) : (
                    <ProjectHero id={project.slug} plan={visuals.hero} label={project.hero ? "Hero image pending" : "Concept visual"} />
                  )}
                  <div className="portfolio-case-header-text">
                    <div className="portfolio-meta"><span>{project.status ?? "project"}</span>{project.date && <span>{project.date}</span>}</div>
                    <h2>{project.title}</h2>
                    <p className="portfolio-blurb">{project.blurb}</p>
                  </div>
                </header>
                <ProjectMedia project={project} visuals={visuals} />
                {project.contentHtml && <section className="portfolio-markdown" aria-label={`${project.title} case study`} dangerouslySetInnerHTML={{ __html: project.contentHtml }} />}
                {hasMetadata(project) && <div className="portfolio-details portfolio-details-desktop"><ProjectMetadata project={project} /></div>}
                {hasMetadata(project) && <details className="portfolio-details-mobile">
                  <summary>Project metadata</summary>
                  <div className="portfolio-details"><ProjectMetadata project={project} /></div>
                </details>}
                <footer className="portfolio-case-footer">
                  <div className="portfolio-tags" aria-label="Project tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  <div className="portfolio-links">{project.links.map((link) => <a key={link.url} href={link.url} target="_blank" rel="noreferrer"><span className="portfolio-link-kind">{link.kind}</span>{link.label} <span aria-hidden="true">↗</span><span className="print-url"> · {link.url}</span></a>)}</div>
                </footer>
              </div>
            </article>
            );
          })}

          <section className="portfolio-outro print-page" aria-labelledby="portfolio-contact-title">
            <p className="portfolio-eyebrow">Let&apos;s make something legible</p>
            <h2 id="portfolio-contact-title">Interested in a research collaboration or visualization project?</h2>
            <p>I work on visual analytics, network visualization, visualization literacy, and collaborative ways of engaging with complex data.</p>
            <div className="portfolio-contact-links">
              <a href="mailto:velitchko.filipov@tuwien.ac.at">velitchko.filipov@tuwien.ac.at</a>
              <a href="https://github.com/velitchko">github.com/velitchko</a>
              <a href="https://www.linkedin.com/in/velitchko-filipov">linkedin.com/in/velitchko-filipov</a>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
