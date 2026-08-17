import type { CSSProperties } from "react";
import { composeLayers, type ViggyConfig } from "./compose";
import { buildPalette } from "./palette";
import { CANVAS, type PlacedLayer, type Slot } from "./spec";

/** Draws already-placed layers with the palette applied. Shared by the mascot and the thumbnails. */
export function LayerPaths({ layers, palette }: { layers: PlacedLayer[]; palette: Record<string, string> }) {
  return (
    <>
      {layers.map((layer) => (
        <g key={layer.key} transform={layer.transform}>
          {layer.paths.map((path, i) => (
            <path key={i} d={path.d} fill={palette[path.fill]} fillRule={path.fillRule} />
          ))}
        </g>
      ))}
    </>
  );
}

export default function Viggy({ config, className, style }: { config: ViggyConfig; className?: string; style?: CSSProperties }) {
  const layers = composeLayers(config);
  const palette = buildPalette(config);
  return (
    <svg viewBox={`0 0 ${CANVAS} ${CANVAS}`} className={className} style={style} xmlns="http://www.w3.org/2000/svg">
      <LayerPaths layers={layers} palette={palette} />
    </svg>
  );
}

/** A single part, framed to its own bounds — used for the option thumbnails. */
export function PartThumb({ layers, bounds, palette, pad = 0.12, size = 40 }: {
  layers: PlacedLayer[];
  bounds: Slot;
  palette: Record<string, string>;
  pad?: number;
  size?: number;
}) {
  // Square the box off around its longest edge so parts keep their relative proportions.
  const edge = Math.max(bounds.w, bounds.h) * (1 + pad * 2);
  const x = bounds.x + bounds.w / 2 - edge / 2;
  const y = bounds.y + bounds.h / 2 - edge / 2;
  return (
    <svg viewBox={`${x} ${y} ${edge} ${edge}`} width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <LayerPaths layers={layers} palette={palette} />
    </svg>
  );
}
