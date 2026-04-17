import type { Voxel } from "../types";

// --- Color math ---

export function parseHSL(hsl: string): [number, number, number] {
  const match = hsl.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
  if (!match) return [0, 0, 50];
  return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
}

export function makeHSL(h: number, s: number, l: number): string {
  return `hsl(${h}, ${Math.max(0, Math.min(100, s))}%, ${Math.max(0, Math.min(100, l))}%)`;
}

export function cubeFaceColors(
  color: string,
  topLight = 12,
  leftDark = 12,
  strokeDark = 20,
  strokeDesat = 10,
) {
  const [h, s, l] = parseHSL(color);
  return {
    top: makeHSL(h, s, l + topLight),
    right: makeHSL(h, s, l),
    left: makeHSL(h, s, l - leftDark),
    stroke: makeHSL(h, Math.max(0, s - strokeDesat), Math.max(0, l - strokeDark)),
  };
}

// --- Projection ---

export function project(x: number, y: number, z: number, size: number) {
  const half = size / 2;
  const quarter = size / 4;
  return {
    sx: (x - z) * half,
    sy: (x + z) * quarter - y * half,
  };
}

// --- Face polygon points (relative to 0,0) ---

export function cubeFacePolygons(size: number) {
  const w = size;
  const half = size / 2;
  return {
    top: `${w / 2},0 ${w},${half / 2} ${w / 2},${half} 0,${half / 2}`,
    left: `0,${half / 2} ${w / 2},${half} ${w / 2},${half * 2} 0,${half + half / 2}`,
    right: `${w / 2},${half} ${w},${half / 2} ${w},${half + half / 2} ${w / 2},${half * 2}`,
  };
}

// --- Sorting ---

export function sortVoxelsPainter(voxels: Voxel[]): Voxel[] {
  return [...voxels].sort((a, b) => (a.x + a.z - a.y) - (b.x + b.z - b.y));
}

// --- Bounding box & centering ---

export interface SceneLayout {
  sorted: Voxel[];
  projected: { v: Voxel; sx: number; sy: number; origIdx: number }[];
  offsetX: number;
  offsetY: number;
  minSx: number;
  minSy: number;
  maxSx: number;
  maxSy: number;
}

export function computeSceneLayout(
  voxels: Voxel[],
  cubeSize: number,
  width: number,
  height: number,
): SceneLayout | null {
  if (voxels.length === 0) return null;

  let minX = Infinity, maxX = -Infinity;
  let minY = Infinity, maxY = -Infinity;
  let minZ = Infinity, maxZ = -Infinity;
  for (const v of voxels) {
    if (v.x < minX) minX = v.x;
    if (v.x > maxX) maxX = v.x;
    if (v.y < minY) minY = v.y;
    if (v.y > maxY) maxY = v.y;
    if (v.z < minZ) minZ = v.z;
    if (v.z > maxZ) maxZ = v.z;
  }

  const sorted = sortVoxelsPainter(voxels);
  const indexMap = new Map<Voxel, number>();
  voxels.forEach((v, i) => indexMap.set(v, i));

  const projected = sorted.map((v) => {
    const { sx, sy } = project(v.x - minX, v.y - minY, v.z - minZ, cubeSize);
    return { v, sx, sy, origIdx: indexMap.get(v) ?? 0 };
  });

  let sMinX = Infinity, sMaxX = -Infinity;
  let sMinY = Infinity, sMaxY = -Infinity;
  for (const p of projected) {
    if (p.sx < sMinX) sMinX = p.sx;
    if (p.sx + cubeSize > sMaxX) sMaxX = p.sx + cubeSize;
    if (p.sy - cubeSize / 2 < sMinY) sMinY = p.sy - cubeSize / 2;
    if (p.sy + cubeSize / 2 > sMaxY) sMaxY = p.sy + cubeSize / 2;
  }

  const offsetX = (width - (sMaxX + sMinX)) / 2;
  const offsetY = (height - (sMaxY + sMinY)) / 2;

  return { sorted, projected, offsetX, offsetY, minSx: sMinX, minSy: sMinY, maxSx: sMaxX, maxSy: sMaxY };
}

/**
 * Compute scene layout without centering — tight bounding box for export.
 */
export function computeExportLayout(voxels: Voxel[], cubeSize: number) {
  if (voxels.length === 0) return null;

  let minX = Infinity, maxX = -Infinity;
  let minY = Infinity, maxY = -Infinity;
  let minZ = Infinity, maxZ = -Infinity;
  for (const v of voxels) {
    if (v.x < minX) minX = v.x;
    if (v.x > maxX) maxX = v.x;
    if (v.y < minY) minY = v.y;
    if (v.y > maxY) maxY = v.y;
    if (v.z < minZ) minZ = v.z;
    if (v.z > maxZ) maxZ = v.z;
  }

  const sorted = sortVoxelsPainter(voxels);
  const half = cubeSize / 2;

  const projected = sorted.map((v) => {
    const { sx, sy } = project(v.x - minX, v.y - minY, v.z - minZ, cubeSize);
    return { v, sx, sy };
  });

  // Find tight bounds
  let sMinX = Infinity, sMaxX = -Infinity;
  let sMinY = Infinity, sMaxY = -Infinity;
  for (const p of projected) {
    if (p.sx < sMinX) sMinX = p.sx;
    if (p.sx + cubeSize > sMaxX) sMaxX = p.sx + cubeSize;
    if (p.sy - half < sMinY) sMinY = p.sy - half;
    if (p.sy + half > sMaxY) sMaxY = p.sy + half;
  }

  const padding = 4;
  const viewMinX = sMinX - padding;
  const viewMinY = sMinY - padding;
  const viewW = sMaxX - sMinX + padding * 2;
  const viewH = sMaxY - sMinY + padding * 2;

  return { sorted, projected, viewMinX, viewMinY, viewW, viewH };
}
