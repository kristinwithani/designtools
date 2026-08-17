import type { Colours } from "./palette";
import { BODY_STYLES, DECORATIONS, EYES, MOUTHS, SLOTS, placeVariant, type BodyStyleId, type PlacedLayer, type Variant } from "./spec";

export type ViggyConfig = Colours & {
  bodyStyle: BodyStyleId;
  eyes: string;
  mouth: string;
  /** `null` renders no accessory. */
  decoration: string | null;
};

/** The `Pal` component exactly as it stands in Figma. */
export const DEFAULT_CONFIG: ViggyConfig = {
  bodyStyle: "solid",
  eyes: "default",
  mouth: "smile",
  decoration: "sweat",
  body: "#00E05A",
  ink: "#18402A",
  outline: "#000000",
  paper: "#FFFFFF",
  background: "#434343",
};

const byId = (list: readonly Variant[], id: string | null) => list.find((v) => v.id === id);

/**
 * Stacking order is the one Figma uses inside `Pal`:
 * body, then decoration, then eyes, then mouth on top.
 */
export function composeLayers(config: ViggyConfig): PlacedLayer[] {
  return [
    ...placeVariant(SLOTS.body, byId(BODY_STYLES, config.bodyStyle), "body"),
    ...placeVariant(SLOTS.decoration, byId(DECORATIONS, config.decoration), "deco"),
    ...placeVariant(SLOTS.eyes, byId(EYES, config.eyes), "eyes"),
    ...placeVariant(SLOTS.mouth, byId(MOUTHS, config.mouth), "mouth"),
  ];
}

export function randomConfig(current: ViggyConfig, colourways: readonly Colours[]): ViggyConfig {
  const pick = <T,>(list: readonly T[]) => list[Math.floor(Math.random() * list.length)];
  const { body, ink, outline, paper, background } = pick(colourways);
  return {
    ...current,
    body, ink, outline, paper, background,
    bodyStyle: Math.random() < 0.15 ? "outline" : "solid",
    eyes: pick(EYES).id,
    mouth: pick(MOUTHS).id,
    // Roughly one in five Viggies goes without an accessory.
    decoration: Math.random() < 0.2 ? null : pick(DECORATIONS).id,
  };
}
