"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import type { PortfolioMedia, PortfolioProject } from "@/data/portfolio";
import { getProjectVisuals, type ProjectVisualSet } from "@/lib/placeholderArt";
import { ProjectHero, ProjectVisualStrip } from "@/components/ProjectVisual";

type AssetLightboxState = {
  projectTitle: string;
  media: PortfolioMedia[];
  index: number;
};

const portfolioFontScales = [
  { value: "small", label: "Small", scale: 0.9 },
  { value: "default", label: "Default", scale: 1 },
  { value: "large", label: "Large", scale: 1.15 },
  { value: "extra-large", label: "Extra large", scale: 1.3 },
] as const;

type PortfolioFontScale = (typeof portfolioFontScales)[number]["value"];

function isPortfolioFontScale(value: string | null): value is PortfolioFontScale {
  return portfolioFontScales.some((size) => size.value === value);
}

function ProjectMedia({ project, visuals, onOpen }: { project: PortfolioProject; visuals: ProjectVisualSet; onOpen: (media: PortfolioMedia[], index: number, trigger: HTMLButtonElement) => void }) {
  if (!project.gallery?.length) {
    return <ProjectVisualStrip id={project.slug} items={visuals.strip} />;
  }

  const availableMedia = project.gallery.filter((media) => media.isAvailable);

  return (
    <div className="portfolio-media-grid" aria-label="Supporting project media">
      {project.gallery.map((media, index) => (
        <figure key={media.src}>
          {media.isAvailable ? (
            <button
              type="button"
              className="portfolio-media-trigger"
              onClick={(event) => onOpen(availableMedia, availableMedia.indexOf(media), event.currentTarget)}
              aria-label={`Enlarge supporting image ${index + 1}: ${media.alt}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- local images/GIFs stay compatible with static export */}
              <img src={media.src} alt={media.alt} />
            </button>
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
  const [assetLightbox, setAssetLightbox] = useState<AssetLightboxState | null>(null);
  const navigatorTriggerRef = useRef<HTMLButtonElement>(null);
  const navigatorCloseRef = useRef<HTMLButtonElement>(null);
  const assetLightboxCloseRef = useRef<HTMLButtonElement>(null);
  const assetLightboxTriggerRef = useRef<HTMLButtonElement | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [fontScale, setFontScale] = useState<PortfolioFontScale>("default");

  useEffect(() => {
    const savedFontScale = window.localStorage.getItem("portfolio-font-scale");
    if (isPortfolioFontScale(savedFontScale)) setFontScale(savedFontScale);
  }, []);

  const selectedFontScale = portfolioFontScales.find((size) => size.value === fontScale)!;

  const handleFontScaleChange = (value: PortfolioFontScale) => {
    setFontScale(value);
    window.localStorage.setItem("portfolio-font-scale", value);
  };

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

  useEffect(() => setIsMounted(true), []);

  const openAssetLightbox = (projectTitle: string, media: PortfolioMedia[], index: number, trigger: HTMLButtonElement) => {
    assetLightboxTriggerRef.current = trigger;
    setAssetLightbox({ projectTitle, media, index });
  };

  const closeAssetLightbox = () => {
    setAssetLightbox(null);
    assetLightboxTriggerRef.current?.focus();
  };

  const moveAssetLightbox = (direction: -1 | 1) => {
    setAssetLightbox((current) => current && {
      ...current,
      index: Math.min(Math.max(current.index + direction, 0), current.media.length - 1),
    });
  };

  useEffect(() => {
    if (!assetLightbox) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeAssetLightbox();
      if (event.key === "ArrowRight") moveAssetLightbox(1);
      if (event.key === "ArrowLeft") moveAssetLightbox(-1);
      if (event.key === "Tab") {
        const dialog = document.querySelector<HTMLElement>(".portfolio-asset-lightbox");
        const focusable = dialog ? Array.from(dialog.querySelectorAll<HTMLElement>('button:not([disabled])')) : [];
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!first || !last) return;
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    assetLightboxCloseRef.current?.focus();
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  // The state object changes as images advance; keep focus on the control the
  // visitor used instead of refocusing the close button on every navigation.
  // eslint-disable-next-line react-hooks/exhaustive-deps -- deliberately bind only while the dialog opens/closes
  }, [Boolean(assetLightbox)]);

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
    <div className="portfolio-page" style={{ "--portfolio-text-scale": selectedFontScale.scale } as CSSProperties}>
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
        <fieldset className="portfolio-font-control no-print">
          <legend>Reading size</legend>
          <div className="portfolio-font-control-options">
            {portfolioFontScales.map((size) => (
              <label key={size.value}>
                <input
                  type="radio"
                  name="portfolio-font-scale"
                  value={size.value}
                  checked={fontScale === size.value}
                  onChange={() => handleFontScaleChange(size.value)}
                />
                <span>{size.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
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
            const availableProjectMedia = [project.hero, ...(project.gallery ?? [])].filter((media): media is PortfolioMedia => Boolean(media?.isAvailable));
            return (
            <article className="portfolio-case-study print-page" id={project.slug} key={project.slug} tabIndex={-1}>
              <div className="portfolio-index">{String(index + 1).padStart(2, "0")}</div>
              <div className="portfolio-case-content">
                <header className="portfolio-case-header">
                  {project.hero?.isAvailable ? (
                    <figure className="portfolio-hero portfolio-hero-image">
                      <button
                        type="button"
                        className="portfolio-hero-trigger"
                        onClick={(event) => openAssetLightbox(project.title, availableProjectMedia, 0, event.currentTarget)}
                        aria-label={`Enlarge hero image: ${project.hero.alt}`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element -- local images/GIFs stay compatible with static export */}
                        <img src={project.hero.src} alt={project.hero.alt} />
                      </button>
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
                <ProjectMedia project={project} visuals={visuals} onOpen={(media, imageIndex, trigger) => openAssetLightbox(project.title, [project.hero, ...media].filter((item): item is PortfolioMedia => Boolean(item?.isAvailable)), project.hero?.isAvailable ? imageIndex + 1 : imageIndex, trigger)} />
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
      {isMounted && assetLightbox && createPortal(
        <div className="portfolio-lightbox-backdrop no-print" onClick={closeAssetLightbox}>
          <div className="portfolio-lightbox portfolio-asset-lightbox" role="dialog" aria-modal="true" aria-label={`${assetLightbox.projectTitle}: ${assetLightbox.media[assetLightbox.index].alt}`} onClick={(event) => event.stopPropagation()}>
            <button ref={assetLightboxCloseRef} type="button" className="portfolio-lightbox-close" onClick={closeAssetLightbox} aria-label="Close enlarged image">
              <svg className="portfolio-icon" viewBox="0 0 24 24" aria-hidden="true"><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></svg>
            </button>
            <div className="portfolio-asset-lightbox-frame">
              {/* eslint-disable-next-line @next/next/no-img-element -- local images/GIFs stay compatible with static export */}
              <img src={assetLightbox.media[assetLightbox.index].src} alt={assetLightbox.media[assetLightbox.index].alt} />
            </div>
            {(assetLightbox.media[assetLightbox.index].caption || assetLightbox.media.length > 1) && <p className="portfolio-lightbox-caption">{assetLightbox.media[assetLightbox.index].caption}{assetLightbox.media.length > 1 && <span className="portfolio-lightbox-count">{assetLightbox.index + 1} / {assetLightbox.media.length}</span>}</p>}
            {assetLightbox.media.length > 1 && <>
              <button type="button" className="portfolio-lightbox-nav portfolio-lightbox-nav-prev" onClick={() => moveAssetLightbox(-1)} aria-label="Previous image" disabled={assetLightbox.index === 0}>
                <svg className="portfolio-icon" viewBox="0 0 24 24" aria-hidden="true"><polyline points="15 6 9 12 15 18" /></svg>
              </button>
              <button type="button" className="portfolio-lightbox-nav portfolio-lightbox-nav-next" onClick={() => moveAssetLightbox(1)} aria-label="Next image" disabled={assetLightbox.index === assetLightbox.media.length - 1}>
                <svg className="portfolio-icon" viewBox="0 0 24 24" aria-hidden="true"><polyline points="9 6 15 12 9 18" /></svg>
              </button>
            </>}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
