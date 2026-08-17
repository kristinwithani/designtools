import type { PaintToken } from "./artwork";

/**
 * Every paint in the Figma artwork maps to one of these tokens, so a Viggy can be
 * recoloured without touching the vectors. The defaults are the exact values from
 * the `Pal` component.
 */
export type Palette = Record<PaintToken, string>;

/** Accent paints that belong to the brand rather than the colourway. */
export const FIXED_PAINTS = {
  drop: "#A8FFF6", // sweat / tear
  blush: "#E05A00", // blush marks / stress lines
  muted: "#AAAAAA", // speech-bubble secondary
} as const;

/** The colours a colourway drives. Everything else is a fixed brand accent. */
export type Colours = {
  body: string;
  /** Eyes and mouths. */
  ink: string;
  /** Body outline, speech bubble, "???" — black in the Figma source. */
  outline: string;
  /** Tooth highlights. */
  paper: string;
  background: string;
};

export type Colourway = Colours & { id: string; label: string };

export const COLOURWAYS: Colourway[] = [
  { id: "viggle", label: "Viggle", body: "#00E05A", ink: "#18402A", outline: "#000000", paper: "#FFFFFF", background: "#434343" },
  { id: "paper", label: "Paper", body: "#FFFFFF", ink: "#18402A", outline: "#000000", paper: "#00E05A", background: "#434343" },
  { id: "inkwell", label: "Inkwell", body: "#18402A", ink: "#00E05A", outline: "#00E05A", paper: "#A8FFF6", background: "#0E1F16" },
  { id: "citrus", label: "Citrus", body: "#FFD84D", ink: "#4A2E00", outline: "#4A2E00", paper: "#FFFFFF", background: "#3B3222" },
  { id: "bubblegum", label: "Bubblegum", body: "#FF8FC7", ink: "#4A1130", outline: "#4A1130", paper: "#FFFFFF", background: "#3A2430" },
  { id: "sky", label: "Sky", body: "#A8FFF6", ink: "#10413C", outline: "#10413C", paper: "#FFFFFF", background: "#23383A" },
  { id: "lilac", label: "Lilac", body: "#C9B8FF", ink: "#2E1B5E", outline: "#2E1B5E", paper: "#FFFFFF", background: "#2C2740" },
  { id: "coal", label: "Coal", body: "#2A2A2A", ink: "#00E05A", outline: "#00E05A", paper: "#A8FFF6", background: "#141414" },
];

export function buildPalette(colours: Colours): Palette {
  return { body: colours.body, ink: colours.ink, outline: colours.outline, paper: colours.paper, ...FIXED_PAINTS };
}
