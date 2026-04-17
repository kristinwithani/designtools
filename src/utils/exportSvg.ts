import type { Voxel } from "../types";
import { computeExportLayout, cubeFaceColors, cubeFacePolygons } from "./scenemath";

export function buildSvgString(voxels: Voxel[], cubeSize: number): string {
  const layout = computeExportLayout(voxels, cubeSize);
  if (!layout) return "<svg></svg>";

  const { projected, viewMinX, viewMinY, viewW, viewH } = layout;
  const faces = cubeFacePolygons(cubeSize);
  const half = cubeSize / 2;

  const cubesSvg = projected.map(({ v, sx, sy }) => {
    const colors = cubeFaceColors(v.color);
    const tx = sx;
    const ty = sy - half;
    return `<g transform="translate(${tx},${ty})">
  <polygon points="${faces.left}" fill="${colors.left}" stroke="${colors.stroke}" stroke-width="0.5" stroke-linejoin="round"/>
  <polygon points="${faces.right}" fill="${colors.right}" stroke="${colors.stroke}" stroke-width="0.5" stroke-linejoin="round"/>
  <polygon points="${faces.top}" fill="${colors.top}" stroke="${colors.stroke}" stroke-width="0.5" stroke-linejoin="round"/>
</g>`;
  }).join("\n");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewMinX} ${viewMinY} ${viewW} ${viewH}" width="${Math.round(viewW * 2)}" height="${Math.round(viewH * 2)}">
${cubesSvg}
</svg>`;
}

export function downloadSvg(voxels: Voxel[], cubeSize: number, name: string) {
  const svg = buildSvgString(voxels, cubeSize);
  const blob = new Blob([svg], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${name}.svg`;
  a.click();
  URL.revokeObjectURL(url);
}
