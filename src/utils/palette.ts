import type { Rng } from "./random";

export type PaletteType =
  | "random"
  | "warm"
  | "cool"
  | "pastel"
  | "neon"
  | "mono"
  | "earth"
  | "ocean"
  | "bw";

export const PALETTES: { value: PaletteType; label: string }[] = [
  { value: "random", label: "Random" },
  { value: "warm", label: "Warm" },
  { value: "cool", label: "Cool" },
  { value: "pastel", label: "Pastel" },
  { value: "neon", label: "Neon" },
  { value: "mono", label: "Mono" },
  { value: "earth", label: "Earth" },
  { value: "ocean", label: "Ocean" },
  { value: "bw", label: "B&W" },
];

/** Returns a hue constrained by the palette */
export function paletteHue(rng: Rng, palette: PaletteType): number {
  switch (palette) {
    case "warm":
      return rng.int(0, 60);
    case "cool":
      return rng.int(180, 300);
    case "earth":
      return rng.next() > 0.5 ? rng.int(20, 45) : rng.int(90, 130);
    case "ocean":
      return rng.int(180, 220);
    case "bw":
      return 0;
    case "mono":
    case "pastel":
    case "neon":
    case "random":
    default:
      return rng.int(0, 360);
  }
}

/** Returns palette-specific saturation and lightness ranges (with some rng variation). */
export function paletteSL(rng: Rng, palette: PaletteType): { s: number; l: number } {
  switch (palette) {
    case "pastel":
      // Soft, washed out, light — low saturation, high lightness
      return { s: rng.int(35, 55), l: rng.int(72, 85) };
    case "neon":
      // Vibrant, electric — very high saturation, medium lightness
      return { s: rng.int(90, 100), l: rng.int(50, 60) };
    case "mono":
      // Subdued, near-grayscale — very low saturation, varied lightness
      return { s: rng.int(5, 18), l: rng.int(35, 65) };
    case "bw":
      return { s: 0, l: rng.next() > 0.5 ? rng.int(8, 22) : rng.int(78, 92) };
    case "warm":
    case "cool":
    case "earth":
    case "ocean":
      return { s: rng.int(50, 70), l: rng.int(42, 58) };
    case "random":
    default:
      // Varied bright palette
      return { s: rng.int(55, 80), l: rng.int(45, 62) };
  }
}

/** Whether a palette should use only a single hue across all N max-color slots. */
export function paletteIsMonochromatic(palette: PaletteType): boolean {
  return palette === "mono" || palette === "bw";
}

/** Returns a full HSL color string constrained by the palette */
export function paletteColor(rng: Rng, palette: PaletteType): string {
  const h = paletteHue(rng, palette);
  const { s, l } = paletteSL(rng, palette);
  return `hsl(${h}, ${s}%, ${l}%)`;
}
