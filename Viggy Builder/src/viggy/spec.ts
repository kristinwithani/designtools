import { ARTWORK, type ArtworkKey, type PaintToken } from "./artwork";

/**
 * Geometry transcribed from the `Pal` component in the Viggle Brand Exploration file.
 * https://www.figma.com/design/Sbi9IWWKkEkixLI9DevyBX/Viggle-Brand-Exploration?node-id=531-13
 *
 * `Pal` is a 2400 x 2400 frame holding four slots. Every measurement below lives in
 * that 2400-unit space, so the whole mascot renders as a single SVG and every part
 * lands exactly where Figma puts it — no scaling, no drift.
 */
export const CANVAS = 2400;

/** A slot rect in Pal space. */
export type Slot = { x: number; y: number; w: number; h: number };

export const SLOTS = {
  // Pal Body — 8.42% inset top/bottom, horizontally centred.
  body: { x: 202, y: 202, w: 1996, h: 1996 },
  // Eyes — inset 15.04% / 31.17% / 8.42% / 8.42%.
  eyes: { x: 202, y: 361, w: 1450, h: 1837 },
  // Mouth — inset 35.79% / 8.42% / 8.42% / 21.58%.
  mouth: { x: 518, y: 859, w: 1680, h: 1339 },
  // Decoration — fills the frame.
  decoration: { x: 0, y: 0, w: CANVAS, h: CANVAS },
} as const satisfies Record<string, Slot>;

/** Figma inset, in percent of the parent slot: [top, right, bottom, left]. */
export type Inset = readonly [number, number, number, number];

export type Layer = {
  art: ArtworkKey;
  inset: Inset;
  /** Degrees, for the one layer Figma stores rotated. */
  rotate?: number;
};

export type Variant = { id: string; label: string; layers: readonly Layer[] };

// --- Body -------------------------------------------------------------------

export const BODY_STYLES = [
  { id: "solid", label: "Solid", layers: [{ art: "body-solid", inset: [0, 0, 0, 0] }] },
  // The outline sits 3.16% proud of the body box on every side.
  { id: "outline", label: "Outline", layers: [{ art: "body-stroke", inset: [-3.156, -3.156, -3.156, -3.156] }] },
] as const satisfies readonly Variant[];

export type BodyStyleId = (typeof BODY_STYLES)[number]["id"];

// --- Eyes -------------------------------------------------------------------

export const EYES: Variant[] = [
  { id: "default", label: "Default", layers: [{ art: "eyes-default", inset: [29.51, 44.97, 37.17, 11.77] }] },
  { id: "laughing", label: "Laughing", layers: [{ art: "eyes-laughing", inset: [16.87, 19.83, 25.86, 7.86] }] },
  { id: "angry", label: "Angry", layers: [{ art: "eyes-angry", inset: [20.38, 20.63, 29.61, 2.98], rotate: -14.12 }] },
  { id: "sad", label: "Sad", layers: [{ art: "eyes-sad", inset: [26.8, 25.23, 28.38, 17.72] }] },
  { id: "dizzy", label: "Dizzy", layers: [{ art: "eyes-dizzy", inset: [20.3, 20.42, 28.69, 8.11] }] },
  { id: "small", label: "Small", layers: [{ art: "eyes-small", inset: [45.13, 47.86, 42.24, 12.97] }] },
  { id: "heart", label: "Heart", layers: [{ art: "eyes-heart", inset: [18.34, 25.32, 31.39, 7.82] }] },
  { id: "xx", label: "XX", layers: [{ art: "eyes-xx", inset: [11.98, 18.07, 28.85, 6.16] }] },
  { id: "relaxed", label: "Relaxed", layers: [{ art: "eyes-relaxed", inset: [21.97, 25.48, 30, 15.05] }] },
];

// --- Mouth ------------------------------------------------------------------

export const MOUTHS: Variant[] = [
  {
    id: "smile",
    label: "Smile",
    layers: [
      { art: "mouth-smile-main", inset: [16.71, 32.67, 12.62, 11.31] },
      { art: "mouth-smile-tooth", inset: [25.5, 44.28, 52.73, 39.16] },
    ],
  },
  {
    id: "sad",
    label: "Sad",
    layers: [
      { art: "mouth-sad-main", inset: [27.93, 14.58, 12.62, 21.31] },
      { art: "mouth-sad-tooth", inset: [29.07, 39.4, 52.43, 41.3] },
    ],
  },
  { id: "smirk", label: "Smirk", layers: [{ art: "mouth-smirk", inset: [30.77, 34.7, 31.22, 35] }] },
  { id: "straight", label: "Straight", layers: [{ art: "mouth-straight", inset: [37.45, 15.65, 14.15, 6.66] }] },
  { id: "sour", label: "Sour", layers: [{ art: "mouth-sour", inset: [60.46, 25.77, 17.1, 6.01] }] },
  { id: "cute", label: "Cute", layers: [{ art: "mouth-cute", inset: [60.04, 35.86, 14.52, 18.57] }] },
];

// --- Decoration -------------------------------------------------------------

export const DECORATIONS: Variant[] = [
  { id: "sweat", label: "Sweat", layers: [{ art: "deco-sweat", inset: [7.11, 8.58, 65.46, 68.79] }] },
  { id: "stress", label: "Stress", layers: [{ art: "deco-stress", inset: [8.42, 8.38, 64.08, 64.13] }] },
  { id: "speech", label: "Speech", layers: [{ art: "deco-speech", inset: [0, 0, 49.63, 58.83] }] },
  { id: "blush", label: "Blush", layers: [{ art: "deco-blush", inset: [44.96, 30.03, 26.82, 31.92] }] },
  { id: "tear", label: "Tear", layers: [{ art: "deco-tear", inset: [73.19, 74.92, 15.42, 15.46] }] },
  { id: "question", label: "???", layers: [{ art: "deco-question", inset: [2.43, 3.09, 65.1, 54.57] }] },
];

// --- Placement --------------------------------------------------------------

/** The box a layer occupies in Pal space, before any rotation. */
export function layerBox(slot: Slot, layer: Layer) {
  const art = ARTWORK[layer.art];
  return {
    x: slot.x + (layer.inset[3] / 100) * slot.w,
    y: slot.y + (layer.inset[0] / 100) * slot.h,
    // The artwork viewBox is the layer's own bounding box in Figma, so it needs no scaling.
    w: art.w,
    h: art.h,
    // Rotated layers are stored by their unrotated container, which is wider than the art.
    containerW: (slot.w * (100 - layer.inset[1] - layer.inset[3])) / 100,
    containerH: (slot.h * (100 - layer.inset[0] - layer.inset[2])) / 100,
  };
}

const round = (n: number) => Math.round(n * 1000) / 1000;

/** SVG transform placing a layer's artwork into Pal space. */
export function layerTransform(slot: Slot, layer: Layer): string {
  const box = layerBox(slot, layer);
  if (layer.rotate) {
    const cx = box.x + box.containerW / 2;
    const cy = box.y + box.containerH / 2;
    return `translate(${round(cx)} ${round(cy)}) rotate(${layer.rotate}) translate(${round(-box.w / 2)} ${round(-box.h / 2)})`;
  }
  return `translate(${round(box.x)} ${round(box.y)})`;
}

export type PlacedPath = { d: string; fill: PaintToken; fillRule?: "evenodd" };
export type PlacedLayer = { key: string; transform: string; paths: readonly PlacedPath[] };

/** Flatten a variant into placed layers ready to draw. */
export function placeVariant(slot: Slot, variant: Variant | undefined, prefix: string): PlacedLayer[] {
  if (!variant) return [];
  return variant.layers.map((layer, i) => ({
    key: `${prefix}-${layer.art}-${i}`,
    transform: layerTransform(slot, layer),
    paths: ARTWORK[layer.art].paths,
  }));
}

/** Tight bounding box around a variant, used to frame the thumbnails. */
export function variantBounds(slot: Slot, variant: Variant) {
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const layer of variant.layers) {
    const box = layerBox(slot, layer);
    // For the rotated layer the unrotated container is the honest outer bound.
    const w = layer.rotate ? box.containerW : box.w;
    const h = layer.rotate ? box.containerH : box.h;
    x0 = Math.min(x0, box.x);
    y0 = Math.min(y0, box.y);
    x1 = Math.max(x1, box.x + w);
    y1 = Math.max(y1, box.y + h);
  }
  return { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
}
