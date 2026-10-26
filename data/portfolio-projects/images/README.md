# Portfolio asset inventory

## Canonical convention

Keep the source asset once in this directory, named with hyphens as
`<project>-<role>.png`. Portfolio Markdown uses typed media objects with a
root-relative `src` of `/portfolio/<filename>`, descriptive `alt` text, and an
optional caption. Alt text is the concise, faithful description of the visible
image for people using assistive technology; it must not depend on a filename
or repeat the surrounding heading. A caption is visible supporting context:
use it only when it explains why the image matters or names the view's role.
Do not use captions to restate alt text. `public/portfolio` is a tracked symlink to this directory;
Next's static export therefore publishes these project-local files without a
second committed asset copy. Missing named files deliberately remain in the
Markdown so the web and PDF fallback treatment is visible until artwork is
supplied.

## Project coverage

| Project | Linked supplied assets | Genuine missing slots |
| --- | --- | --- |
| ArtVis | `artvis-hero.png`, `artvis-1.png`, `artvis-2.png`, `artvis-3.png` | None |
| AustroVis | `austrovis-hero.png` | Hero-only by design; no further images are currently supplied. |
| CV3 | `cv3-1.png`, `cv3-2.png`, `cv3-3.png`, `cv3-4.png` | None; `cv3-1.png` is used as the hero because no dedicated hero file was supplied. |
| Hyperlines | `hyperlines-hero.png`, `hyperlines-1.png`, `hyperlines-2.png`, `hyperlines-3.png` | `hyperlines-4.png` |
| Interactive Music Mapping Vienna | `immv-hero.png`, `immv-1.png`, `immv-2.png` | `immv-3.png` |
| iPal | `ipal-1.png`, `ipal-2.png` | `ipal-3.png`; `ipal-1.png` is used as the hero because no dedicated hero file was supplied. |
| PolyCube | None | `polycube-hero.png`, `polycube-1.png`, `polycube-2.png`, `polycube-3.png` |
| refhub.io | `refhub-hero.png`, `refhub-1.png`, `refhub-2.png`, `refhub-3.png`, `refhub-4.png`, `refhub-5.png` | None |
| SANE / TimeLighting | `timelighting-hero.png`, `timelighting-1.png`, `timelighting-2.png`, `timelighting-3.png` | None; the TimeLighting views are intentionally linked from SANE. |
| Vellum | `vellum-hero.png`, `vellum-1.png` | None; both are captured from a seeded local demonstration workspace. |
| VisGames | `visgames-1.png` | Hero-only by design; no further images are currently supplied. |

## Unreferenced supplied assets

None. The TimeLighting files are intentionally linked from SANE because
TimeLighting is the case study described in that project.
