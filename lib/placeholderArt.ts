/**
 * Deterministic "concept visual" generator for portfolio case studies that don't
 * yet have real screenshots. Produces abstract, visualization-themed SVG shape
 * plans (node-link graphs, bar/scatter charts, flow lines, grids) seeded by the
 * project slug, so a given project always renders the same colorful artwork —
 * on the web page and in the exported PDF brochure — until real media is added.
 *
 * These are intentionally abstract (not fake screenshots) to stay non-deceptive;
 * see data/portfolio-projects for the real case-study copy.
 */

export type VisualVariant = "network" | "bars" | "scatter" | "flow" | "grid";

export type VisualShape =
  | { kind: "circle"; cx: number; cy: number; r: number; color: string; opacity?: number }
  | { kind: "line"; x1: number; y1: number; x2: number; y2: number; color: string; width: number; opacity?: number }
  | { kind: "rect"; x: number; y: number; w: number; h: number; color: string; opacity?: number; rx?: number }
  | { kind: "polyline"; points: [number, number][]; color: string; width: number; opacity?: number };

export type VisualPlan = {
  variant: VisualVariant;
  width: number;
  height: number;
  background: [string, string];
  shapes: VisualShape[];
};

export type ProjectVisualSet = {
  palette: [string, string, string];
  hero: VisualPlan;
  strip: { plan: VisualPlan; caption: string }[];
};

/** Hero and gallery-strip canvases share these aspect ratios across web + PDF. */
export const HERO_VIEWBOX = { w: 320, h: 130 };
export const STRIP_VIEWBOX = { w: 220, h: 160 };

const PALETTES: [string, string, string][] = [
  ["#ff6b6b", "#ffd166", "#06d6a0"],
  ["#00c2ff", "#7b2ff7", "#f72585"],
  ["#f9c74f", "#f3722c", "#f94144"],
  ["#06d6a0", "#118ab2", "#073b4c"],
  ["#ff007f", "#7209b7", "#3a0ca3"],
  ["#80ed99", "#38a3a5", "#22577a"],
  ["#ffbe0b", "#fb5607", "#ff006e"],
  ["#8338ec", "#3a86ff", "#06d6a0"],
];

const VARIANTS: VisualVariant[] = ["network", "bars", "scatter", "flow", "grid"];

const CAPTION_POOL = [
  "Interface walkthrough",
  "Interaction detail",
  "Data exploration view",
  "System architecture sketch",
  "User study moment",
  "Annotated interaction flow",
  "Comparative layout study",
  "Node-link exploration",
  "Early concept sketch",
  "Usability session capture",
];

function hashString(input: string): number {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return function random() {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function range(rng: () => number, min: number, max: number): number {
  return round(min + rng() * (max - min));
}

function round(n: number): number {
  return Math.round(n * 100) / 100;
}

function pick<T>(rng: () => number, items: readonly T[]): T {
  return items[Math.floor(rng() * items.length) % items.length];
}

function generateVisualPlan(
  seed: number,
  variant: VisualVariant,
  palette: [string, string, string],
  width: number,
  height: number,
): VisualPlan {
  const rng = mulberry32(seed);
  const shapes: VisualShape[] = [];
  const margin = Math.min(width, height) * 0.12;

  if (variant === "network") {
    const count = Math.round(range(rng, 6, 10));
    const nodes = Array.from({ length: count }, () => ({
      x: range(rng, margin, width - margin),
      y: range(rng, margin, height - margin),
    }));
    nodes.forEach((node, i) => {
      const neighborCount = i === 0 ? 2 : Math.round(range(rng, 1, 2));
      const ranked = nodes
        .map((other, j) => ({ j, dist: (other.x - node.x) ** 2 + (other.y - node.y) ** 2 }))
        .filter((entry) => entry.j !== i)
        .sort((a, b) => a.dist - b.dist)
        .slice(0, neighborCount);
      ranked.forEach(({ j }) => {
        shapes.push({
          kind: "line",
          x1: node.x,
          y1: node.y,
          x2: nodes[j].x,
          y2: nodes[j].y,
          color: palette[1],
          width: 0.8,
          opacity: 0.55,
        });
      });
    });
    nodes.forEach((node) => {
      shapes.push({
        kind: "circle",
        cx: node.x,
        cy: node.y,
        r: range(rng, 2.6, 5.2),
        color: pick(rng, palette),
        opacity: range(rng, 0.75, 1),
      });
    });
  } else if (variant === "bars") {
    const count = Math.round(range(rng, 6, 9));
    const gap = width / count;
    const barWidth = gap * 0.55;
    for (let i = 0; i < count; i++) {
      const barHeight = range(rng, height * 0.22, height * 0.85);
      shapes.push({
        kind: "rect",
        x: round(gap * i + (gap - barWidth) / 2),
        y: round(height - barHeight),
        w: round(barWidth),
        h: barHeight,
        color: pick(rng, palette),
        opacity: range(rng, 0.75, 1),
        rx: 1.5,
      });
    }
  } else if (variant === "scatter") {
    const count = Math.round(range(rng, 22, 34));
    for (let i = 0; i < count; i++) {
      shapes.push({
        kind: "circle",
        cx: range(rng, margin * 0.5, width - margin * 0.5),
        cy: range(rng, margin * 0.5, height - margin * 0.5),
        r: range(rng, 1.2, 3.4),
        color: pick(rng, palette),
        opacity: range(rng, 0.35, 0.95),
      });
    }
  } else if (variant === "flow") {
    const lineCount = 3;
    for (let line = 0; line < lineCount; line++) {
      const amplitude = range(rng, height * 0.08, height * 0.22);
      const frequency = range(rng, 1.4, 2.6);
      const phase = range(rng, 0, Math.PI * 2);
      const baseline = height * (0.3 + line * 0.22);
      const points: [number, number][] = [];
      const steps = 24;
      for (let s = 0; s <= steps; s++) {
        const x = round((width / steps) * s);
        const y = round(baseline + Math.sin((s / steps) * Math.PI * frequency + phase) * amplitude);
        points.push([x, y]);
      }
      shapes.push({
        kind: "polyline",
        points,
        color: palette[line % palette.length],
        width: range(rng, 1.4, 2.4),
        opacity: 0.85 - line * 0.15,
      });
    }
  } else {
    const spacing = Math.min(width, height) / 9;
    const cols = Math.floor(width / spacing);
    const rows = Math.floor(height / spacing);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const highlight = rng() > 0.82;
        shapes.push({
          kind: "circle",
          cx: round(spacing * (c + 0.5)),
          cy: round(spacing * (r + 0.5)),
          r: highlight ? range(rng, 2.6, 3.6) : 1.1,
          color: highlight ? palette[2] : palette[1],
          opacity: highlight ? 0.95 : 0.4,
        });
      }
    }
  }

  return {
    variant,
    width,
    height,
    background: [palette[0], palette[1]],
    shapes,
  };
}

export function getProjectVisuals(
  slug: string,
  heroSize: { w: number; h: number } = HERO_VIEWBOX,
  stripSize: { w: number; h: number } = STRIP_VIEWBOX,
): ProjectVisualSet {
  const seed = hashString(slug);
  const palette = PALETTES[seed % PALETTES.length];
  const heroVariant = VARIANTS[seed % VARIANTS.length];
  const hero = generateVisualPlan(seed, heroVariant, palette, heroSize.w, heroSize.h);

  const stripCount = 1 + (hashString(`${slug}:count`) % 3);
  const usedCaptions = new Set<number>();
  const strip = Array.from({ length: stripCount }, (_, i) => {
    const subSeed = seed + (i + 1) * 977;
    const variant = VARIANTS[(seed + (i + 1) * 53) % VARIANTS.length];
    const plan = generateVisualPlan(subSeed, variant, palette, stripSize.w, stripSize.h);
    let captionIndex = (seed + i * 31) % CAPTION_POOL.length;
    while (usedCaptions.has(captionIndex)) {
      captionIndex = (captionIndex + 1) % CAPTION_POOL.length;
    }
    usedCaptions.add(captionIndex);
    return { plan, caption: CAPTION_POOL[captionIndex] };
  });

  return { palette, hero, strip };
}
