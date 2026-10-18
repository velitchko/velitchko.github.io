"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { VisualPlan } from "@/lib/placeholderArt";

function VisualSvg({ id, plan, className }: { id: string; plan: VisualPlan; className?: string }) {
  const gradientId = `pv-${id}`;
  return (
    <svg
      className={className}
      viewBox={`0 0 ${plan.width} ${plan.height}`}
      preserveAspectRatio="xMidYMid slice"
      role="presentation"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={plan.background[0]} />
          <stop offset="1" stopColor={plan.background[1]} />
        </linearGradient>
      </defs>
      <rect x={0} y={0} width={plan.width} height={plan.height} fill={`url(#${gradientId})`} />
      {plan.shapes.map((shape, i) => {
        if (shape.kind === "circle") {
          return <circle key={i} cx={shape.cx} cy={shape.cy} r={shape.r} fill={shape.color} opacity={shape.opacity ?? 1} />;
        }
        if (shape.kind === "line") {
          return <line key={i} x1={shape.x1} y1={shape.y1} x2={shape.x2} y2={shape.y2} stroke={shape.color} strokeWidth={shape.width} opacity={shape.opacity ?? 1} />;
        }
        if (shape.kind === "rect") {
          return <rect key={i} x={shape.x} y={shape.y} width={shape.w} height={shape.h} fill={shape.color} opacity={shape.opacity ?? 1} rx={shape.rx ?? 0} />;
        }
        return (
          <polyline
            key={i}
            points={shape.points.map(([x, y]) => `${x},${y}`).join(" ")}
            fill="none"
            stroke={shape.color}
            strokeWidth={shape.width}
            opacity={shape.opacity ?? 1}
          />
        );
      })}
    </svg>
  );
}

/** Full-bleed concept banner behind a case study's header, fading into the page. */
export function ProjectHero({ id, plan }: { id: string; plan: VisualPlan }) {
  return (
    <div className="portfolio-hero">
      <VisualSvg id={`${id}-hero`} plan={plan} className="portfolio-hero-svg" />
      <div className="portfolio-hero-fade" aria-hidden="true" />
      <span className="portfolio-visual-badge">Concept visual</span>
    </div>
  );
}

/** Horizontally scrollable, clickable strip of 1-3 explorable concept figures. */
export function ProjectVisualStrip({ id, items }: { id: string; items: { plan: VisualPlan; caption: string }[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const scrollByCard = (dir: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".portfolio-visual-card");
    const amount = (card?.offsetWidth ?? 220) + 16;
    el.scrollBy({ left: amount * dir, behavior: "smooth" });
  };

  const openAt = (i: number, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setOpenIndex(i);
  };

  const close = () => {
    setOpenIndex(null);
    triggerRef.current?.focus();
  };

  useEffect(() => {
    if (openIndex === null) return;
    closeRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") setOpenIndex((i) => (i === null ? i : (i + 1) % items.length));
      if (e.key === "ArrowLeft") setOpenIndex((i) => (i === null ? i : (i - 1 + items.length) % items.length));
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only needs to re-bind when the modal opens/closes
  }, [openIndex, items.length]);

  return (
    <div className="portfolio-visual-strip-wrap">
      <div className="portfolio-visual-strip" role="list" aria-label="Concept visuals — placeholders for final artwork" ref={scrollRef}>
        {items.map((item, i) => (
          <figure className="portfolio-visual-card" key={i} role="listitem">
            <button
              type="button"
              className="portfolio-visual-card-frame"
              onClick={(e) => openAt(i, e.currentTarget)}
              aria-label={`Open concept visual: ${item.caption}`}
            >
              <VisualSvg id={`${id}-strip-${i}`} plan={item.plan} className="portfolio-visual-card-svg" />
              <span className="portfolio-visual-badge">Concept</span>
            </button>
            <figcaption>{item.caption}</figcaption>
          </figure>
        ))}
      </div>
      {items.length > 1 && (
        <>
          <button type="button" className="portfolio-visual-nav portfolio-visual-nav-prev" onClick={() => scrollByCard(-1)} aria-label="Scroll to previous concept visual">
            <svg className="portfolio-icon" viewBox="0 0 24 24" aria-hidden="true"><polyline points="15 6 9 12 15 18" /></svg>
          </button>
          <button type="button" className="portfolio-visual-nav portfolio-visual-nav-next" onClick={() => scrollByCard(1)} aria-label="Scroll to next concept visual">
            <svg className="portfolio-icon" viewBox="0 0 24 24" aria-hidden="true"><polyline points="9 6 15 12 9 18" /></svg>
          </button>
        </>
      )}
      {mounted && openIndex !== null && createPortal(
        <div className="portfolio-lightbox-backdrop" onClick={close}>
          <div
            className="portfolio-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={items[openIndex].caption}
            onClick={(e) => e.stopPropagation()}
          >
            <button type="button" className="portfolio-lightbox-close" onClick={close} aria-label="Close" ref={closeRef}>
              <svg className="portfolio-icon" viewBox="0 0 24 24" aria-hidden="true"><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></svg>
            </button>
            <div className="portfolio-lightbox-frame">
              <VisualSvg id={`${id}-lightbox-${openIndex}`} plan={items[openIndex].plan} className="portfolio-lightbox-svg" />
            </div>
            <p className="portfolio-lightbox-caption">{items[openIndex].caption}</p>
            {items.length > 1 && (
              <>
                <button
                  type="button"
                  className="portfolio-lightbox-nav portfolio-lightbox-nav-prev"
                  onClick={() => setOpenIndex((i) => (i === null ? i : (i - 1 + items.length) % items.length))}
                  aria-label="Previous concept visual"
                >
                  <svg className="portfolio-icon" viewBox="0 0 24 24" aria-hidden="true"><polyline points="15 6 9 12 15 18" /></svg>
                </button>
                <button
                  type="button"
                  className="portfolio-lightbox-nav portfolio-lightbox-nav-next"
                  onClick={() => setOpenIndex((i) => (i === null ? i : (i + 1) % items.length))}
                  aria-label="Next concept visual"
                >
                  <svg className="portfolio-icon" viewBox="0 0 24 24" aria-hidden="true"><polyline points="9 6 15 12 9 18" /></svg>
                </button>
              </>
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
