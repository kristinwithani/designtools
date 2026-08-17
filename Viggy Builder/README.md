# Viggy Builder

A mascot builder for Viggy. Pick eyes, a mouth, an accessory and a colourway, then export a PNG or SVG.

Every part is the real vector artwork from the **Viggle Brand Exploration** Figma file, placed with the exact
geometry of the `Pal` component — so a Viggy built here is byte-for-byte the same shape as one assembled in Figma.

Source: <https://www.figma.com/design/Sbi9IWWKkEkixLI9DevyBX/Viggle-Brand-Exploration?node-id=531-13>

## Run it

```bash
npm install
npm run dev
```

`npm run build` type-checks and produces `dist/`.

## How the pixel-perfect placement works

`Pal` is a 2400 × 2400 frame with four slots. All measurements live in that 2400-unit space, and the whole
mascot renders as one `<svg viewBox="0 0 2400 2400">`, so nothing is ever rescaled or rounded twice.

| Slot       | Figma inset (T/R/B/L)          | Rect in Pal space           |
| ---------- | ------------------------------ | --------------------------- |
| Pal Body   | 8.42% all round, centred       | `202, 202, 1996 × 1996`     |
| Decoration | 0                              | `0, 0, 2400 × 2400`         |
| Eyes       | 15.04 / 31.17 / 8.42 / 8.42    | `202, 361, 1450 × 1837`     |
| Mouth      | 35.79 / 8.42 / 8.42 / 21.58    | `518, 859, 1680 × 1339`     |

Inside a slot each layer is positioned by its Figma inset, and drawn at its **natural** size — an exported
layer's SVG `viewBox` *is* its Figma bounding box, so no scale factor is needed anywhere. The one exception is
the `angry` eyes layer, which Figma stores rotated; it is centred in its container and rotated −14.12°.

Stacking order follows `Pal`: body → decoration → eyes → mouth.

Verified against Figma's own render of `Pal`: mean absolute pixel difference **0.4/255**, with zero pixels
differing by more than 32 — the residual is antialiasing between two rasterisers.

## Colour tokens

Each Figma paint maps to a recolourable token, so a Viggy can take any colourway without touching the vectors.

| Token      | Figma paint | Used by                                    | Editable         |
| ---------- | ----------- | ------------------------------------------ | ---------------- |
| `body`     | `#00E05A`   | the shell                                  | yes — *Body*     |
| `ink`      | `#18402A`   | eyes, mouths                               | yes — *Ink*      |
| `outline`  | `#000000`   | outline body, speech bubble, `???`         | yes — *Outline*  |
| `paper`    | `#FFFFFF`   | tooth highlights                           | yes — *Highlight*|
| `drop`     | `#A8FFF6`   | sweat, tear                                | fixed accent     |
| `blush`    | `#E05A00`   | blush marks, stress lines                  | fixed accent     |
| `muted`    | `#AAAAAA`   | speech-bubble text                         | fixed accent     |

The defaults reproduce `Pal` exactly. Fixed accents live in `FIXED_PAINTS` in `src/viggy/palette.ts`.

## Layout of the code

```
src/viggy/artwork.ts   auto-generated path data, one entry per Figma vector layer
src/viggy/spec.ts      slot rects, variant insets, and the placement maths
src/viggy/compose.ts   config type + the layer stack for a given Viggy
src/viggy/palette.ts   colourways and paint tokens
src/viggy/Viggy.tsx    renders the composed layers (also powers the option thumbnails)
src/utils/export*.ts   SVG string builder, shared by the SVG and PNG downloads
```

## Re-exporting from Figma

`artwork.ts` is generated — don't hand-edit it. To pick up artwork changes, re-export each vector layer as SVG
(`get_design_context` on the `Pal Body`, `Eyes`, `Mouth` and `Decoration` component sets returns both the asset
URLs and the inset percentages), then regenerate the file and update the insets in `spec.ts` to match.
