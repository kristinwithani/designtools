# designtools

**Print Ink Effects** — a browser tool to import a PNG and tune print-like looks (halftone, bleed, misregistration, grain, scratches, smudge, paper texture, edge roughness) with real-time WebGL2 shaders. Presets included; export full-resolution PNG with alpha.

## Setup

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` — Vite dev server
- `npm run build` — TypeScript + production build
- `npm run preview` — Preview production build

## Stack

React 19, Vite, TypeScript, Tailwind CSS v4, WebGL2 (multi-pass fragment shaders).

## Usage

1. **Import PNG** (or drop a file on the window).
2. Pick a **preset** or adjust **sliders** per effect group.
3. **Drag** the preview to pan, **scroll** to zoom (preview is capped at 2048px for speed).
4. **Export PNG** runs the same pipeline at the image’s full resolution with alpha.

Requires a browser with **WebGL2**.
