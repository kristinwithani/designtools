import type { GeneratorParams, GeneratedObject, Voxel } from "../types";
import { createRng } from "../utils/random";
import { paletteHue, type PaletteType } from "../utils/palette";

const DIRS: [number, number, number][] = [
  [1, 0, 0], [-1, 0, 0],
  [0, 1, 0], [0, -1, 0],
  [0, 0, 1], [0, 0, -1],
];

const key = (x: number, y: number, z: number) => `${x},${y},${z}`;

function neighborCount(x: number, y: number, z: number, occupied: Set<string>): number {
  let n = 0;
  for (const [dx, dy, dz] of DIRS) {
    if (occupied.has(key(x + dx, y + dy, z + dz))) n++;
  }
  return n;
}

export function generateRandomShape(params: GeneratorParams): GeneratedObject {
  const rng = createRng(params.seed);
  const rules = params.rules;
  const target = params.cubeCount;
  const pal = (params.palette ?? "random") as PaletteType;

  // Generate a base hue from the palette
  const baseHue = paletteHue(rng, pal);

  // Start with a single seed voxel
  const voxels: Voxel[] = [{ x: 0, y: 0, z: 0, color: `hsl(${baseHue}, 55%, 50%)` }];
  const occupied = new Set<string>([key(0, 0, 0)]);

  // Center of mass tracking
  let cx = 0, cy = 0, cz = 0;

  // Grow to target count
  while (voxels.length < target) {
    const MAX_BOX = 10;

    // Organic drives growth chaos:
    //   low organic → dense, center-biased, low branching (clean basic shape)
    //   high organic → sprawling, tip-biased, high branching (sporadic random shape)
    const organic = rules?.organic ?? 0.5;
    const compactness = 0.9 - organic * 0.75;  // 0.9 (very compact) → 0.15 (sprawling)
    const branching = organic * 0.7;           // 0 (none) → 0.7 (heavy tips)
    const chaosJitter = organic;               // random direction weight at high organic

    // Pick source voxel — branching prefers tips
    let src: Voxel;
    if (rng.next() < branching) {
      const tips = voxels.filter(v => neighborCount(v.x, v.y, v.z, occupied) <= 2);
      src = tips.length > 0 ? tips[Math.floor(rng.next() * tips.length)] : voxels[Math.floor(rng.next() * voxels.length)];
    } else {
      src = voxels[Math.floor(rng.next() * voxels.length)];
    }

    // Pick direction with biases
    const candidates: { dx: number; dy: number; dz: number; w: number }[] = [];
    for (const [dx, dy, dz] of DIRS) {
      const nx = src.x + dx, ny = src.y + dy, nz = src.z + dz;
      if (occupied.has(key(nx, ny, nz))) continue;

      // Bounding box check
      const half = Math.floor(MAX_BOX / 2);
      if (Math.abs(nx) > half || ny < 0 || ny > MAX_BOX || Math.abs(nz) > half) continue;

      let w = 1;

      // Height bias
      const hb = rules?.heightBias ?? 0.5;
      if (dy > 0) w *= 0.1 + hb * 8;
      if (dy < 0) w *= 0.1 + (1 - hb) * 4;
      if (dx !== 0 || dz !== 0) w *= 0.1 + (1 - hb) * 6;

      // Compactness: low organic pulls toward center, high organic pushes outward
      const dist = Math.sqrt((nx - cx) ** 2 + (ny - cy) ** 2 + (nz - cz) ** 2);
      if (compactness > 0.5) {
        w *= 1 / (1 + dist * (compactness - 0.5) * 4);
      } else {
        w *= 1 + dist * (0.5 - compactness) * 3;
      }

      // Chaos: at high organic, add random weight jitter so growth picks are less predictable
      if (chaosJitter > 0.3) {
        w *= 1 + (rng.next() - 0.5) * chaosJitter * 3;
      }

      candidates.push({ dx, dy, dz, w: Math.max(0.01, w) });
    }

    if (candidates.length === 0) continue;

    // Weighted random pick
    const totalW = candidates.reduce((s, c) => s + c.w, 0);
    let r = rng.next() * totalW;
    let pick = candidates[0];
    for (const c of candidates) {
      r -= c.w;
      if (r <= 0) { pick = c; break; }
    }

    const nx = src.x + pick.dx;
    const ny = src.y + pick.dy;
    const nz = src.z + pick.dz;
    occupied.add(key(nx, ny, nz));

    // Color: slight hue variation from base
    const hueShift = (rng.next() - 0.5) * 20;
    const h = (baseHue + hueShift + 360) % 360;
    const s = 45 + rng.next() * 20;
    const l = 40 + rng.next() * 20;
    voxels.push({ x: nx, y: ny, z: nz, color: `hsl(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%)` });

    // Update center of mass
    const n = voxels.length;
    cx = cx * (n - 1) / n + nx / n;
    cy = cy * (n - 1) / n + ny / n;
    cz = cz * (n - 1) / n + nz / n;
  }

  return { name: "Shape", voxels };
}
