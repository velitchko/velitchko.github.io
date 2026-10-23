import { Circle, Defs, Document, Font, Image, Line, Link, LinearGradient, Page, Polyline, Rect, StyleSheet, Stop, Svg, Text, View } from "@react-pdf/renderer";
import type { PortfolioProject } from "@/data/portfolio";
import { getProjectVisuals, HERO_VIEWBOX, STRIP_VIEWBOX, type VisualPlan } from "@/lib/placeholderArt";

function fontAssetSource(fileName: string): string {
  if (typeof window !== "undefined") return `/fonts/${fileName}`;
  return `${process.cwd()}/public/fonts/${fileName}`;
}

Font.register({
  family: "Playfair Display",
  fonts: [
    { src: fontAssetSource("PlayfairDisplay-Regular.woff"), fontWeight: 400 },
    { src: fontAssetSource("PlayfairDisplay-Bold.woff"), fontWeight: 700 },
  ],
});

Font.register({
  family: "Lora",
  fonts: [
    { src: fontAssetSource("Lora-Regular.woff"), fontWeight: 400 },
    { src: fontAssetSource("Lora-Italic.woff"), fontWeight: 400, fontStyle: "italic" },
    { src: fontAssetSource("Lora-SemiBold.woff"), fontWeight: 600 },
  ],
});

const COLORS = {
  navy: "#132b4c",
  accent: "#6d2b71",
  accentTint: "#f2e9f3",
  ink: "#242424",
  muted: "#5a5a5a",
  line: "#d8d0da",
  paper: "#fffdfb",
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 64,
    paddingBottom: 60,
    paddingHorizontal: 56,
    fontFamily: "Lora",
    fontSize: 10.5,
    color: COLORS.ink,
    backgroundColor: COLORS.paper,
  },
  topBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 7,
    backgroundColor: COLORS.accent,
  },
  ruleSpaced: {
    height: 1,
    backgroundColor: COLORS.line,
    marginTop: 18,
    marginBottom: 18,
  },
  accentUnderline: {
    width: 34,
    height: 2.5,
    backgroundColor: COLORS.accent,
    marginTop: 8,
    marginBottom: 20,
  },

  // Cover
  coverEyebrow: {
    fontFamily: "Lora",
    fontSize: 10,
    letterSpacing: 2.5,
    textTransform: "uppercase",
    color: COLORS.accent,
  },
  coverTitle: {
    fontFamily: "Playfair Display",
    fontWeight: 700,
    fontSize: 32,
    color: COLORS.navy,
    lineHeight: 1.28,
    marginTop: 140,
    marginBottom: 20,
    maxWidth: 430,
  },
  coverLede: {
    fontFamily: "Lora",
    fontStyle: "italic",
    fontSize: 13,
    lineHeight: 1.6,
    color: COLORS.muted,
    maxWidth: 400,
  },
  coverFooter: {
    position: "absolute",
    bottom: 60,
    left: 56,
    right: 56,
  },
  coverFooterRule: {
    height: 1,
    backgroundColor: COLORS.line,
    marginBottom: 10,
  },
  coverFooterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  coverFooterLabel: {
    fontFamily: "Lora",
    fontSize: 9.5,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: COLORS.muted,
  },
  coverFooterLink: {
    fontFamily: "Lora",
    fontSize: 9.5,
    color: COLORS.navy,
  },

  // Project page
  spine: {
    position: "absolute",
    top: 64,
    bottom: 60,
    left: 56,
    width: 2,
    backgroundColor: COLORS.accentTint,
  },
  caseBody: {
    marginLeft: 20,
  },
  index: {
    fontFamily: "Playfair Display",
    fontWeight: 700,
    fontSize: 13,
    color: COLORS.accent,
    marginBottom: 10,
  },
  metaRow: {
    flexDirection: "row",
    fontFamily: "Lora",
    fontWeight: 600,
    fontSize: 9,
    textTransform: "uppercase",
    letterSpacing: 1.2,
    color: COLORS.accent,
    marginBottom: 8,
  },
  metaPill: {
    borderWidth: 1,
    borderColor: COLORS.accent,
    borderRadius: 9,
    paddingVertical: 2.5,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  title: {
    fontFamily: "Playfair Display",
    fontWeight: 700,
    fontSize: 21,
    color: COLORS.navy,
    marginBottom: 10,
    lineHeight: 1.3,
    maxWidth: 440,
  },
  blurb: {
    fontFamily: "Lora",
    fontStyle: "italic",
    fontSize: 12,
    color: COLORS.muted,
    lineHeight: 1.55,
    marginBottom: 6,
    maxWidth: 440,
  },
  sectionHeading: {
    fontFamily: "Lora",
    fontWeight: 600,
    fontSize: 9.5,
    textTransform: "uppercase",
    letterSpacing: 1.3,
    color: COLORS.accent,
    marginBottom: 6,
    marginTop: 16,
  },
  sectionRule: {
    width: 18,
    height: 1.5,
    backgroundColor: COLORS.accent,
    marginBottom: 7,
    marginTop: -2,
  },
  paragraph: {
    fontFamily: "Lora",
    fontSize: 10.5,
    lineHeight: 1.5,
    color: COLORS.ink,
    marginBottom: 7,
    maxWidth: 440,
  },
  bulletRow: {
    flexDirection: "row",
    marginBottom: 4,
    maxWidth: 440,
  },
  bulletMark: {
    fontFamily: "Lora",
    fontSize: 10.5,
    color: COLORS.accent,
    width: 12,
  },
  bulletText: {
    fontFamily: "Lora",
    fontSize: 10.5,
    lineHeight: 1.45,
    color: COLORS.ink,
    flex: 1,
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 18,
  },
  tag: {
    fontFamily: "Lora",
    fontSize: 8.5,
    color: COLORS.accent,
    backgroundColor: COLORS.accentTint,
    borderRadius: 9,
    paddingVertical: 3,
    paddingHorizontal: 9,
    marginRight: 6,
    marginBottom: 6,
  },
  links: {
    marginTop: 12,
  },
  linkRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  linkArrow: {
    fontFamily: "Lora",
    fontSize: 9.5,
    color: COLORS.accent,
    width: 12,
  },
  link: {
    fontFamily: "Lora",
    fontSize: 9.5,
    color: COLORS.navy,
    textDecoration: "underline",
  },
  footer: {
    position: "absolute",
    bottom: 28,
    left: 56,
    right: 56,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerText: {
    fontFamily: "Lora",
    fontSize: 8.5,
    color: COLORS.muted,
    letterSpacing: .5,
  },

  // Concept visuals (hero banner + gallery strip)
  heroWrap: {
    marginBottom: 6,
    borderRadius: 4,
    overflow: "hidden",
  },
  mediaHero: {
    height: 190,
    marginBottom: 16,
    objectFit: "cover",
  },
  heroCaption: {
    fontFamily: "Lora",
    fontStyle: "italic",
    fontSize: 8,
    color: COLORS.muted,
    marginBottom: 12,
  },
  stripRow: {
    flexDirection: "row",
    marginTop: 4,
    marginBottom: 14,
  },
  stripCardFrame: {
    borderWidth: 1,
    borderColor: COLORS.line,
    borderRadius: 4,
    overflow: "hidden",
  },
  mediaCaption: {
    fontFamily: "Lora",
    fontSize: 7.5,
    color: COLORS.muted,
    lineHeight: 1.25,
    marginTop: 4,
  },
  galleryItem: {
    marginTop: 14,
    marginBottom: 16,
  },
  galleryImage: {
    height: 300,
    objectFit: "contain",
    width: "100%",
  },
  figureLabel: {
    fontFamily: "Lora",
    fontWeight: 600,
    fontSize: 8.5,
    textTransform: "uppercase",
    letterSpacing: 1.1,
    color: COLORS.accent,
    marginBottom: 5,
  },
  stripCaption: {
    fontFamily: "Lora",
    fontSize: 7.5,
    lineHeight: 1.35,
    color: COLORS.muted,
    marginTop: 4,
  },
  stripTag: {
    fontFamily: "Lora",
    fontWeight: 600,
    color: COLORS.accent,
  },

  // Outro
  outroTitle: {
    fontFamily: "Playfair Display",
    fontWeight: 700,
    fontSize: 23,
    color: COLORS.navy,
    lineHeight: 1.35,
    marginTop: 150,
    marginBottom: 18,
    maxWidth: 420,
  },
  outroBody: {
    fontFamily: "Lora",
    fontSize: 11.5,
    lineHeight: 1.55,
    color: COLORS.muted,
    maxWidth: 420,
    marginBottom: 26,
  },
  contactLink: {
    fontFamily: "Lora",
    fontWeight: 600,
    fontSize: 11,
    color: COLORS.navy,
    marginBottom: 8,
  },
});

type MarkdownBlock = {
  kind: "heading" | "paragraph" | "listItem";
  text: string;
};

type NarrativeSection = {
  key: string;
  blocks: MarkdownBlock[];
};

type NumberedFigure = {
  media: NonNullable<PortfolioProject["gallery"]>[number];
  figureNumber: number;
};

function textFromHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Keep author-provided Markdown structure in the brochure. The website
 * already serializes Markdown to a safe, small HTML subset at build time, so
 * reading its block tags here keeps the PDF and web case-study narratives in
 * sync without inventing any copy.
 */
function htmlToMarkdownBlocks(html: string): MarkdownBlock[] {
  const blocks: MarkdownBlock[] = [];
  const blockPattern = /<(h[1-6]|p|li)[^>]*>([\s\S]*?)<\/\1>/gi;
  let match: RegExpExecArray | null;

  while ((match = blockPattern.exec(html))) {
    const text = textFromHtml(match[2]);
    if (!text) continue;
    const tag = match[1].toLowerCase();
    blocks.push({
      kind: tag.startsWith("h") ? "heading" : tag === "li" ? "listItem" : "paragraph",
      text,
    });
  }

  return blocks;
}

/**
 * A Markdown heading starts a new authored section. Keeping its following
 * blocks together gives supporting figures meaningful places to interrupt the
 * narrative without ever splitting an authored paragraph.
 */
function markdownSections(blocks: MarkdownBlock[]): NarrativeSection[] {
  const sections: NarrativeSection[] = [];
  let current: MarkdownBlock[] = [];

  blocks.forEach((block) => {
    if (block.kind === "heading" && current.length) {
      sections.push({ key: `markdown-${sections.length}`, blocks: current });
      current = [];
    }
    current.push(block);
  });

  if (current.length) sections.push({ key: `markdown-${sections.length}`, blocks: current });
  return sections;
}

function PageFooter({ label }: { label: string }) {
  return (
    <View style={styles.footer} fixed>
      <Text style={styles.footerText}>{label}</Text>
      <Text style={styles.footerText} render={({ pageNumber }) => `${String(pageNumber).padStart(2, "0")}`} />
    </View>
  );
}

/** Usable width inside caseBody: page width minus horizontal padding and the spine indent. */
const CASE_WIDTH = 595.28 - 56 * 2 - 20;

function pdfAssetSource(src: string): string {
  return typeof window === "undefined" ? src : new URL(src, window.location.href).href;
}

/** Renders a deterministic concept-visual plan as native PDF vector shapes. `fade` adds a gradient wash into the page background, used for hero banners. */
function PdfVisual({ id, plan, width, height, fade }: { id: string; plan: VisualPlan; width: number; height: number; fade?: boolean }) {
  const gradId = `pv-${id}-bg`;
  const fadeId = `pv-${id}-fade`;
  return (
    <Svg width={width} height={height} viewBox={`0 0 ${plan.width} ${plan.height}`} preserveAspectRatio="xMidYMid slice">
      <Defs>
        <LinearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor={plan.background[0]} />
          <Stop offset="1" stopColor={plan.background[1]} />
        </LinearGradient>
        {fade && (
          <LinearGradient id={fadeId} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={COLORS.paper} stopOpacity={0} />
            <Stop offset="1" stopColor={COLORS.paper} stopOpacity={1} />
          </LinearGradient>
        )}
      </Defs>
      <Rect x={0} y={0} width={plan.width} height={plan.height} fill={`url(#${gradId})`} />
      {plan.shapes.map((shape, i) => {
        if (shape.kind === "circle") {
          return <Circle key={i} cx={shape.cx} cy={shape.cy} r={shape.r} fill={shape.color} fillOpacity={shape.opacity ?? 1} />;
        }
        if (shape.kind === "line") {
          return <Line key={i} x1={shape.x1} y1={shape.y1} x2={shape.x2} y2={shape.y2} stroke={shape.color} strokeWidth={shape.width} strokeOpacity={shape.opacity ?? 1} />;
        }
        if (shape.kind === "rect") {
          return <Rect key={i} x={shape.x} y={shape.y} width={shape.w} height={shape.h} fill={shape.color} fillOpacity={shape.opacity ?? 1} rx={shape.rx ?? 0} />;
        }
        return (
          <Polyline
            key={i}
            points={shape.points.map(([x, y]) => `${x},${y}`).join(" ")}
            fill="none"
            stroke={shape.color}
            strokeWidth={shape.width}
            strokeOpacity={shape.opacity ?? 1}
          />
        );
      })}
      {fade && <Rect x={0} y={plan.height * 0.35} width={plan.width} height={plan.height * 0.65} fill={`url(#${fadeId})`} />}
    </Svg>
  );
}

function SupportingFigure({ media, figureNumber, imageHeight }: { media: NonNullable<PortfolioProject["gallery"]>[number]; figureNumber: number; imageHeight: number }) {
  const caption = media.caption ?? media.alt;

  return (
    <View style={styles.galleryItem} wrap={false} minPresenceAhead={340}>
      <Text style={styles.figureLabel}>Supporting figure {figureNumber}</Text>
      <View style={styles.stripCardFrame}>
        {/* eslint-disable-next-line jsx-a11y/alt-text -- @react-pdf/renderer Image does not expose an alt prop */}
        <Image src={pdfAssetSource(media.src)} style={[styles.galleryImage, { height: imageHeight }]} />
      </View>
      <Text style={styles.mediaCaption}>Figure {figureNumber}. {caption}</Text>
    </View>
  );
}

/**
 * A section can have fewer boundaries than selected figures. Keep such figure
 * runs together at a reduced but still full-width reading size so a short case
 * study does not turn into a sequence of image-only pages.
 */
function SupportingFigures({ figures }: { figures: NumberedFigure[] }) {
  const imageHeight = figures.length === 1 ? 300 : figures.length === 2 ? 205 : 145;

  return (
    <View wrap={false} minPresenceAhead={figures.length === 1 ? 340 : 500}>
      {figures.map(({ media, figureNumber }) => (
        <SupportingFigure
          key={media.src}
          media={media}
          figureNumber={figureNumber}
          imageHeight={imageHeight}
        />
      ))}
    </View>
  );
}

function ProjectPages({ project, index }: { project: PortfolioProject; index: number }) {
  const markdownBlocks = project.contentHtml ? htmlToMarkdownBlocks(project.contentHtml) : [];
  const gallery = project.gallery?.filter((media) => media.isAvailable) ?? [];
  // Preserve the established three-figure selection; pages below keep images readable.
  const brochureGallery = gallery.slice(0, 3);
  const hasRealMedia = Boolean(project.hero?.isAvailable || gallery.length);
  const visuals = hasRealMedia ? null : getProjectVisuals(project.slug);
  const heroWidth = CASE_WIDTH;
  const heroHeight = visuals ? heroWidth * (HERO_VIEWBOX.h / HERO_VIEWBOX.w) : 0;
  const stripGap = 10;
  const stripCount = visuals?.strip.length ?? 0;
  const stripCardWidth = stripCount ? (CASE_WIDTH - stripGap * (stripCount - 1)) / stripCount : 0;
  const stripCardHeight = stripCardWidth * (STRIP_VIEWBOX.h / STRIP_VIEWBOX.w);
  const narrativeSections: NarrativeSection[] = [
    ...(project.abstract ? [{
      key: "project-summary",
      blocks: [
        { kind: "heading" as const, text: "Project summary" },
        { kind: "paragraph" as const, text: project.abstract },
      ],
    }] : []),
    ...markdownSections(markdownBlocks),
  ];
  // Keep the opening context text-first, then spread the established three
  // figures over the remaining authored section boundaries. If there is only
  // one section, each figure still follows that context in the normal page
  // flow rather than becoming a detached figure page.
  const figuresAfterSection = new Map<number, NumberedFigure[]>();
  if (narrativeSections.length) {
    brochureGallery.forEach((media, figureIndex) => {
      const sectionIndex = brochureGallery.length === 1
        ? 0
        : Math.round((figureIndex * (narrativeSections.length - 1)) / (brochureGallery.length - 1));
      const figures = figuresAfterSection.get(sectionIndex) ?? [];
      figures.push({ media, figureNumber: figureIndex + 1 });
      figuresAfterSection.set(sectionIndex, figures);
    });
  }

  const renderBlock = (block: MarkdownBlock, key: string) => {
    if (block.kind === "heading") {
      // Keep an authored heading and its rule away from a page bottom.
      return <View key={key} wrap={false} minPresenceAhead={42}>
        <Text style={styles.sectionHeading}>{block.text}</Text>
        <View style={styles.sectionRule} />
      </View>;
    }
    if (block.kind === "listItem") {
      return <View key={key} style={styles.bulletRow}>
        <Text style={styles.bulletMark}>{"\u2022"}</Text>
        <Text style={styles.bulletText}>{block.text}</Text>
      </View>;
    }
    return <Text key={key} style={styles.paragraph}>{block.text}</Text>;
  };

  return (
    <>
      <Page size="A4" style={styles.page}>
      <View style={styles.topBar} fixed />
      <View style={styles.spine} fixed />
      <View style={styles.caseBody}>
        <Text style={styles.index}>{String(index + 1).padStart(2, "0")}</Text>

        {project.hero?.isAvailable && (
          <>
            {/* eslint-disable-next-line jsx-a11y/alt-text -- @react-pdf/renderer Image does not expose an alt prop */}
            <Image src={pdfAssetSource(project.hero.src)} style={[styles.mediaHero, { width: CASE_WIDTH }]} />
            {project.hero.caption && <Text style={styles.mediaCaption}>{project.hero.caption}</Text>}
          </>
        )}

        {visuals && (
          <View style={styles.heroWrap}>
            <PdfVisual id={`${project.slug}-hero`} plan={visuals.hero} width={heroWidth} height={heroHeight} fade />
          </View>
        )}

        <View style={styles.metaRow}>
          <Text style={styles.metaPill}>{project.status ?? "project"}</Text>
          {project.date && <Text style={styles.metaPill}>{project.date}</Text>}
        </View>
        <Text style={styles.title}>{project.title}</Text>
        <Text style={styles.blurb}>{project.blurb}</Text>

        {visuals && (
          <>
            <View style={styles.stripRow}>
              {visuals.strip.map((item, i) => (
                <View key={i} style={i < stripCount - 1 ? { width: stripCardWidth, marginRight: stripGap } : { width: stripCardWidth }}>
                  <View style={[styles.stripCardFrame, { height: stripCardHeight }]}>
                    <PdfVisual id={`${project.slug}-strip-${i}`} plan={item.plan} width={stripCardWidth} height={stripCardHeight} />
                  </View>
                  <Text style={styles.stripCaption}><Text style={styles.stripTag}>Fig. {i + 1}</Text> {item.caption}</Text>
                </View>
              ))}
            </View>
            <Text style={styles.heroCaption}>Concept visuals — placeholders until final artwork is added.</Text>
          </>
        )}

        <View style={styles.ruleSpaced} />

        {narrativeSections.map((section, sectionIndex) => (
          <View key={section.key}>
            {section.blocks.map((block, blockIndex) => renderBlock(block, `${section.key}-${blockIndex}`))}
            {figuresAfterSection.get(sectionIndex) && (
              <SupportingFigures figures={figuresAfterSection.get(sectionIndex)!} />
            )}
          </View>
        ))}

        {!narrativeSections.length && brochureGallery.length > 0 && <SupportingFigures figures={brochureGallery.map((media, figureIndex) => ({ media, figureNumber: figureIndex + 1 }))} />}

        {project.role && (
          <View wrap={false}>
            <Text style={styles.sectionHeading}>Contribution</Text>
            <View style={styles.sectionRule} />
            <Text style={styles.paragraph}>{project.role}</Text>
          </View>
        )}

        {project.collaborators?.length ? (
          <View wrap={false}>
            <Text style={styles.sectionHeading}>Collaborators</Text>
            <View style={styles.sectionRule} />
            <Text style={styles.paragraph}>{project.collaborators.join(", ")}</Text>
          </View>
        ) : null}

        {project.outcomes?.length ? (
          <View>
            <Text style={styles.sectionHeading}>Outcomes</Text>
            <View style={styles.sectionRule} />
            {project.outcomes.map((outcome, i) => (
              <View key={i} style={styles.bulletRow}>
                <Text style={styles.bulletMark}>{"\u2022"}</Text>
                <Text style={styles.bulletText}>{outcome}</Text>
              </View>
            ))}
          </View>
        ) : null}

        <View style={styles.tagsRow}>
          {project.tags.map((tag) => (
            <Text key={tag} style={styles.tag}>{tag}</Text>
          ))}
        </View>

        <View style={styles.links}>
          {project.links.map((link) => (
            <View key={link.url} style={styles.linkRow}>
              <Text style={styles.linkArrow}>{"\u2192"}</Text>
              <Link src={link.url} style={styles.link}>{link.label} · {link.url}</Link>
            </View>
          ))}
        </View>
      </View>

        <PageFooter label="Portfolio · Velitchko Filipov" />
      </Page>

    </>
  );
}

export default function PortfolioPdfDocument({ projects }: { projects: PortfolioProject[] }) {
  return (
    <Document title="Velitchko Filipov · Portfolio" author="Velitchko Filipov">
      <Page size="A4" style={styles.page}>
        <View style={styles.topBar} />
        <Text style={styles.coverEyebrow}>Selected work</Text>
        <View style={styles.accentUnderline} />
        <Text style={styles.coverTitle}>Projects that make complex systems easier to see, explore, and discuss.</Text>
        <Text style={styles.coverLede}>A working portfolio of research and applied projects across visual analytics, network visualization, and collaborative data exploration.</Text>

        <View style={styles.coverFooter}>
          <View style={styles.coverFooterRule} />
          <View style={styles.coverFooterRow}>
            <Text style={styles.coverFooterLabel}>Velitchko Filipov · Visualization Researcher</Text>
            <Text style={styles.coverFooterLink}>velitchko.filipov@tuwien.ac.at</Text>
          </View>
        </View>
      </Page>

      {projects.map((project, index) => (
        <ProjectPages key={project.slug} project={project} index={index} />
      ))}

      <Page size="A4" style={styles.page}>
        <View style={styles.topBar} />
        <Text style={styles.coverEyebrow}>Let&apos;s make something legible</Text>
        <View style={styles.accentUnderline} />
        <Text style={styles.outroTitle}>Interested in a research collaboration or visualization project?</Text>
        <Text style={styles.outroBody}>I work on visual analytics, network visualization, visualization literacy, and collaborative ways of engaging with complex data.</Text>
        <Link src="mailto:velitchko.filipov@tuwien.ac.at" style={styles.contactLink}>velitchko.filipov@tuwien.ac.at</Link>
        <Link src="https://github.com/velitchko" style={styles.contactLink}>github.com/velitchko</Link>
        <Link src="https://www.linkedin.com/in/velitchko-filipov" style={styles.contactLink}>linkedin.com/in/velitchko-filipov</Link>

        <PageFooter label="Portfolio · Velitchko Filipov" />
      </Page>
    </Document>
  );
}
