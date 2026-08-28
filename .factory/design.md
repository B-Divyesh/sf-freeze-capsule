# Freeze Capsule visual system

## Direction

**Blueprint drafting sheet.** A system freeze leaves indirect clues. The site treats those clues like a field engineer's marked drawing: measured, annotated, and calm. Fine grid lines, crop marks, numbered callouts, and a cutaway capsule diagram explain preservation without turning the page into a generic security site.

## Palette

The default is a single-mode deep blueprint surface. This makes the product recognisable and keeps the diagram legible.

| Token | Value | Use |
| --- | --- | --- |
| `--blueprint` | `#082A4A` | page background |
| `--blueprint-deep` | `#041A2E` | footer and terminal |
| `--paper` | `#F4F0DF` | primary text and raised sheets |
| `--paper-muted` | `#C5D5D7` | secondary text |
| `--cyan-line` | `#61D6E6` | grid, focus, links |
| `--safety` | `#FFCB45` | primary action and warnings |
| `--coral` | `#FF806D` | failures and destructive notes |
| `--ok` | `#74D5A4` | verified output |

Body text on blueprint is at least 8.5:1. Dark text on safety yellow is above 9:1. Fine grid lines are decorative and never carry state.

## Type

- Display: **IBM Plex Mono** when bundled, then `ui-monospace`. Uppercase labels and tabular numerals echo drafting annotations.
- Body: **Atkinson Hyperlegible** when bundled, then system sans. Open letterforms keep instructions readable on small screens.
- The initial build uses local system fallbacks to avoid a font payload. No font is requested from a third party.

## Spacing and shape

- 8 px base unit; section gaps are 64–112 px.
- Content measure is 68 characters. The working sheet is capped at 1180 px.
- Corners are 2–6 px, like cut paper rather than soft SaaS cards.
- Dashed rules mean a boundary or optional step. Solid double rules mean preserved output.
- Buttons resemble yellow drawing labels, with a 3 px offset shadow.

## Interaction grammar

- Links are cyan and underlined. Buttons are filled safety labels.
- The live terminal advances through a real bundled demo transcript. Its controls keep standard button semantics.
- Download detection changes one labelled plate; the manual choices remain visible.
- Route changes focus the page heading and announce it.

## Motion

The signature motion is a single **scan line** across the capsule cutaway when it enters view. It lasts 900 ms and runs once. UI feedback uses 160–220 ms opacity and transform changes. With `prefers-reduced-motion: reduce`, the scan is absent and every state change is immediate. Nothing loops.

## Original asset plan and provenance

- Hero: an original raster editorial cutaway of an evidence capsule on a Linux diagnostic blueprint. Generated for this product with `/opt/fleet/lib/gen-image.sh` using the factory image deployment, then cropped and encoded as WebP under 300 KB. No text is embedded because all essential words remain HTML.
- Wordmark and favicon: hand-authored geometric SVG using an `FC` capsule outline. Original to this repository.
- Social card: composed locally from the hero and product typography at 1200×630.

The image prompt and output details are recorded beside the final assets in this document after generation.

