import type { Voxel, GenerationRules } from "../types";
import type { Rng } from "./random";
import { parseHSL, makeHSL } from "./scenemath";
import { paletteHue, paletteSL, paletteIsMonochromatic, type PaletteType } from "./palette";

export function fillBox(
  x0: number, y0: number, z0: number,
  x1: number, y1: number, z1: number,
  color: string
): Voxel[] {
  const voxels: Voxel[] = [];
  for (let x = x0; x <= x1; x++)
    for (let y = y0; y <= y1; y++)
      for (let z = z0; z <= z1; z++)
        voxels.push({ x, y, z, color });
  return voxels;
}

export function fillColumn(
  x: number, z: number,
  y0: number, y1: number,
  color: string
): Voxel[] {
  return fillBox(x, y0, z, x, y1, z, color);
}

export function fillPlane(
  x0: number, z0: number,
  x1: number, z1: number,
  y: number,
  color: string
): Voxel[] {
  return fillBox(x0, y, z0, x1, y, z1, color);
}

export function hollowBox(
  x0: number, y0: number, z0: number,
  x1: number, y1: number, z1: number,
  color: string
): Voxel[] {
  const voxels: Voxel[] = [];
  for (let x = x0; x <= x1; x++)
    for (let y = y0; y <= y1; y++)
      for (let z = z0; z <= z1; z++) {
        const onEdge =
          x === x0 || x === x1 ||
          y === y0 || y === y1 ||
          z === z0 || z === z1;
        if (onEdge) voxels.push({ x, y, z, color });
      }
  return voxels;
}

export function fillCylinder(
  cx: number, cz: number,
  radius: number,
  y0: number, y1: number,
  color: string
): Voxel[] {
  const voxels: Voxel[] = [];
  const r2 = (radius + 0.5) * (radius + 0.5);
  for (let x = cx - radius; x <= cx + radius; x++)
    for (let z = cz - radius; z <= cz + radius; z++) {
      const dx = x - cx;
      const dz = z - cz;
      if (dx * dx + dz * dz <= r2) {
        for (let y = y0; y <= y1; y++)
          voxels.push({ x, y, z, color });
      }
    }
  return voxels;
}

export function fillSphere(
  cx: number, cy: number, cz: number,
  radius: number,
  color: string
): Voxel[] {
  const voxels: Voxel[] = [];
  const r2 = (radius + 0.5) * (radius + 0.5);
  for (let x = cx - radius; x <= cx + radius; x++)
    for (let y = cy - radius; y <= cy + radius; y++)
      for (let z = cz - radius; z <= cz + radius; z++) {
        const dx = x - cx;
        const dy = y - cy;
        const dz = z - cz;
        if (dx * dx + dy * dy + dz * dz <= r2) {
          voxels.push({ x, y, z, color });
        }
      }
  return voxels;
}

export function recolor(voxels: Voxel[], color: string): Voxel[] {
  return voxels.map((v) => ({ ...v, color }));
}

export function translate(voxels: Voxel[], dx: number, dy: number, dz: number): Voxel[] {
  return voxels.map((v) => ({ ...v, x: v.x + dx, y: v.y + dy, z: v.z + dz }));
}

const DIRS = [[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]] as const;
const key = (x: number, y: number, z: number) => `${x},${y},${z}`;

/** Find the largest connected component via BFS */
function largestConnected(voxels: Voxel[]): Voxel[] {
  const posMap = new Map<string, Voxel>();
  for (const v of voxels) posMap.set(key(v.x, v.y, v.z), v);

  const visited = new Set<string>();
  let best: Voxel[] = [];

  for (const v of voxels) {
    const k = key(v.x, v.y, v.z);
    if (visited.has(k)) continue;

    // BFS
    const component: Voxel[] = [];
    const queue = [v];
    visited.add(k);
    while (queue.length > 0) {
      const cur = queue.pop()!;
      component.push(cur);
      for (const [dx, dy, dz] of DIRS) {
        const nk = key(cur.x + dx, cur.y + dy, cur.z + dz);
        if (!visited.has(nk) && posMap.has(nk)) {
          visited.add(nk);
          queue.push(posMap.get(nk)!);
        }
      }
    }
    if (component.length > best.length) best = component;
  }
  return best;
}

/**
 * Normalize a voxel array to exactly `target` cubes.
 * Ensures all cubes are connected (touching face-to-face).
 */
export function normalizeCount(voxels: Voxel[], target: number, rng: Rng): Voxel[] {
  // Deduplicate by position
  const seen = new Set<string>();
  const unique: Voxel[] = [];
  for (const v of voxels) {
    const k = key(v.x, v.y, v.z);
    if (!seen.has(k)) {
      seen.add(k);
      unique.push(v);
    }
  }

  // Start from the largest connected component
  let result = largestConnected(unique);

  // Trim: remove from the end (lowest priority) while staying connected
  if (result.length > target) {
    // Keep priority order but ensure connectivity
    // Rebuild: take first voxel, BFS-add in priority order up to target
    const posSet = new Set(result.map(v => key(v.x, v.y, v.z)));
    const priorityMap = new Map<string, number>();
    for (let i = 0; i < result.length; i++) {
      priorityMap.set(key(result[i].x, result[i].y, result[i].z), i);
    }

    const kept: Voxel[] = [result[0]];
    const keptSet = new Set([key(result[0].x, result[0].y, result[0].z)]);
    // BFS frontier sorted by priority
    const frontier: { v: Voxel; pri: number }[] = [];

    const addNeighbors = (v: Voxel) => {
      for (const [dx, dy, dz] of DIRS) {
        const nk = key(v.x + dx, v.y + dy, v.z + dz);
        if (posSet.has(nk) && !keptSet.has(nk)) {
          keptSet.add(nk);
          const nv = result.find(r => key(r.x, r.y, r.z) === nk)!;
          frontier.push({ v: nv, pri: priorityMap.get(nk) ?? Infinity });
        }
      }
      frontier.sort((a, b) => a.pri - b.pri);
    };

    addNeighbors(result[0]);
    while (kept.length < target && frontier.length > 0) {
      const { v } = frontier.shift()!;
      kept.push(v);
      addNeighbors(v);
    }
    result = kept;
  }

  // Grow: add neighbors to reach target
  if (result.length < target) {
    const occupied = new Set(result.map(v => key(v.x, v.y, v.z)));

    while (result.length < target) {
      const src = result[Math.floor(rng.next() * result.length)];
      const [dx, dy, dz] = DIRS[Math.floor(rng.next() * 6)];
      const nx = src.x + dx, ny = src.y + dy, nz = src.z + dz;
      const nk = key(nx, ny, nz);
      if (!occupied.has(nk)) {
        occupied.add(nk);
        result.push({ x: nx, y: ny, z: nz, color: src.color });
      }
    }
  }

  return result;
}

// ---- Generation Rules Post-Processing ----

// Fixed values for removed parameters (previously tweakable, now baked in)
const FIXED_BOUNDING_BOX = 10;
const FIXED_COMPACTNESS = 0.5;
const FIXED_BRANCHING = 0.3;

export const DEFAULT_RULES: GenerationRules = {
  symmetryX: false,
  symmetryY: false,
  symmetryZ: false,
  heightBias: 0.5,
  maxColors: 1,
  gradientDir: "none",
  contrast: 0.5,
  organic: 0.5,
};

function neighborCount(v: Voxel, occupied: Set<string>): number {
  let n = 0;
  for (const [dx, dy, dz] of DIRS) {
    if (occupied.has(key(v.x + dx, v.y + dy, v.z + dz))) n++;
  }
  return n;
}

export function applyGenerationRules(
  voxels: Voxel[],
  target: number,
  rules: GenerationRules,
  rng: Rng,
  palette: string = "random",
  colorRng?: Rng,
): Voxel[] {
  // Use an independent RNG for color assignment so shape parameter changes don't shift hues
  const cRng = colorRng ?? rng;
  let result = [...voxels];

  // 1. Max bounding box — clamp to NxNxN cube
  const half = Math.floor(FIXED_BOUNDING_BOX / 2);
  result = result.filter(v =>
    Math.abs(v.x) <= half && v.y >= 0 && v.y <= FIXED_BOUNDING_BOX && Math.abs(v.z) <= half
  );

  // Isometric-aligned mirror operations — produce EXACT visible mirrors in screen space:
  //   X toggle → horizontal screen mirror (reflection across plane x=z; swaps voxel x and z)
  //   Y toggle → vertical screen mirror (reflection through origin; inverts x, y, z)
  //   Z toggle → 180° rotation around Y axis (flips both voxel x and z)
  // These are chosen so that each toggle produces a visually EXACT symmetric rendering
  // when projected through the isometric camera.
  const mirrorOps: Array<(v: Voxel) => Voxel> = [];
  if (rules.symmetryX) mirrorOps.push((v) => ({ ...v, x: v.z, z: v.x }));
  if (rules.symmetryY) mirrorOps.push((v) => ({ ...v, x: -v.x, y: -v.y, z: -v.z }));
  if (rules.symmetryZ) mirrorOps.push((v) => ({ ...v, x: -v.x, z: -v.z }));
  const symMultiplier = 1 << mirrorOps.length;
  const growTarget = Math.max(1, Math.ceil(target / symMultiplier));

  // Fundamental domain — one side of each mirror plane:
  //   X mirror (swap x,z) → x >= z half-space
  //   Y mirror (point inv) → x + z + y >= 0 half-space (one side of the inversion "through origin"; we use a plane through origin)
  //   Z mirror (180° rot)  → x >= 0 half-space (one half of the two-fold rotation)
  if (mirrorOps.length > 0) {
    result = result.filter(v =>
      (!rules.symmetryX || v.x >= v.z) &&
      (!rules.symmetryY || v.x + v.y + v.z >= 0) &&
      (!rules.symmetryZ || v.x >= 0)
    );
  }

  // 2. Organic — high values create sporadic/chaotic surface erosion
  // Low organic = no erosion (clean, grounded shape)
  // High organic = aggressive random surface removal (sporadic, irregular shape)
  if (rules.organic > 0.5) {
    const chaos = (rules.organic - 0.5) * 2; // 0..1
    const erosion = chaos * 0.55;             // up to 55% chance of removing a surface cube
    for (let pass = 0; pass < 2; pass++) {
      const occupied = new Set(result.map(v => key(v.x, v.y, v.z)));
      result = result.filter(v => {
        const nc = neighborCount(v, occupied);
        if (nc < 6) return rng.next() > erosion; // surface voxel: randomly remove
        return true;                              // interior: keep
      });
    }
  }


  // Ensure connectivity after removals
  result = largestConnected(result);

  // Grow to fundamental-domain target; final count will multiply by symMultiplier
  result = biasedGrow(result, growTarget, rules, rng, mirrorOps.length > 0 ? {
    x: rules.symmetryX, y: rules.symmetryY, z: rules.symmetryZ,
  } : undefined);

  // Fill holes — any empty position surrounded by voxels on all 6 sides becomes filled
  // This guarantees the shape has no internal cavities that could appear as "open cubes"
  {
    const occupied = new Set(result.map(v => key(v.x, v.y, v.z)));
    const candidates = new Set<string>();
    for (const v of result) {
      for (const [dx, dy, dz] of DIRS) {
        const nx = v.x + dx, ny = v.y + dy, nz = v.z + dz;
        const k = key(nx, ny, nz);
        if (!occupied.has(k)) candidates.add(k);
      }
    }
    for (const ck of candidates) {
      const [x, y, z] = ck.split(",").map(Number);
      let allFilled = true;
      for (const [dx, dy, dz] of DIRS) {
        if (!occupied.has(key(x + dx, y + dy, z + dz))) { allFilled = false; break; }
      }
      if (allFilled) {
        // Use an average-ish color from neighbors
        const neighbor = result.find(v =>
          DIRS.some(([dx, dy, dz]) => v.x === x + dx && v.y === y + dy && v.z === z + dz)
        );
        result.push({ x, y, z, color: neighbor?.color ?? "hsl(0,0%,50%)" });
        occupied.add(ck);
      }
    }
  }

  // 6. Color rules — applied BEFORE mirror so mirror pairs share identical colors

  // Max colors — assign exactly N palette-distinct colors (hue + palette-specific s/l)
  if (rules.maxColors >= 1 && rules.maxColors <= 5) {
    const n = rules.maxColors;
    const pal = palette as PaletteType;
    // For monochromatic palettes, all N buckets share a single hue
    const baseHue = paletteHue(cRng, pal);
    const colors: { h: number; s: number; l: number }[] = [];
    for (let i = 0; i < n; i++) {
      const h = paletteIsMonochromatic(pal) ? baseHue : paletteHue(cRng, pal);
      const { s, l } = paletteSL(cRng, pal);
      colors.push({ h, s, l });
    }
    result = result.map((v, i) => {
      const c = colors[i % n];
      return { ...v, color: makeHSL(c.h, c.s, c.l) };
    });
  }

  // Gradient — use absolute coordinates on mirrored axes so mirror pairs get same gradient value
  if (rules.gradientDir !== "none") {
    const ys = result.map(v => v.y);
    const minY = Math.min(...ys), maxY = Math.max(...ys);
    const rangeY = maxY - minY || 1;
    // Use mirrored axis coordinates so mirror pairs evaluate to the same t
    const coordX = (v: Voxel) => rules.symmetryX ? Math.abs(v.x) : v.x;
    const coordZ = (v: Voxel) => rules.symmetryZ ? Math.abs(v.z) : v.z;
    const coordY = (v: Voxel) => rules.symmetryY ? Math.abs(v.y) : v.y;
    const cx = result.reduce((s, v) => s + coordX(v), 0) / result.length;
    const cz = result.reduce((s, v) => s + coordZ(v), 0) / result.length;
    const maxDist = Math.max(...result.map(v => Math.sqrt((coordX(v) - cx) ** 2 + (coordZ(v) - cz) ** 2))) || 1;

    result = result.map(v => {
      const [h, s] = parseHSL(v.color);
      let t: number;
      if (rules.gradientDir === "vertical") {
        t = (coordY(v) - (rules.symmetryY ? 0 : minY)) / rangeY;
      } else {
        t = Math.sqrt((coordX(v) - cx) ** 2 + (coordZ(v) - cz) ** 2) / maxDist;
      }
      const newL = 20 + t * 65;
      return { ...v, color: makeHSL(h, s, Math.round(newL)) };
    });
  }

  // Contrast — always affects every object by adding/removing per-voxel lightness variation.
  // At contrast = 0.5: no change.
  // At contrast > 0.5: adds deterministic per-voxel lightness jitter (makes cubes pop).
  // At contrast < 0.5: compresses lightness toward the object's average (flattens the look).
  if (Math.abs(rules.contrast - 0.5) > 0.02) {
    const c = (rules.contrast - 0.5) * 2; // -1 .. 1
    const avgL = result.reduce((s, v) => s + parseHSL(v.color)[2], 0) / result.length;
    result = result.map(v => {
      const [h, s, l] = parseHSL(v.color);
      // Deterministic per-voxel jitter from position (mirror pairs get identical |coords| → same jitter when used with |x|,|y|,|z|)
      const seed = Math.abs(v.x) * 12.9898 + Math.abs(v.y) * 78.233 + Math.abs(v.z) * 37.719;
      const hashRaw = Math.sin(seed) * 43758.5453;
      const frac = hashRaw - Math.floor(hashRaw);
      const jitter = (frac - 0.5) * 50; // -25 .. +25 lightness shift at full contrast
      let newL: number;
      if (c >= 0) {
        // Amplify existing deviation AND add per-voxel jitter
        newL = l + (l - avgL) * c * 2 + jitter * c;
      } else {
        // Pull toward mean
        newL = l + (avgL - l) * Math.abs(c);
      }
      return { ...v, color: makeHSL(h, s, Math.max(5, Math.min(95, Math.round(newL)))) };
    });
  }

  // 7. Final symmetry pass — apply all 2^n combinations of mirror operations.
  //    Each mirrored copy inherits the color of its source voxel, guaranteeing symmetric coloring.
  if (mirrorOps.length > 0) {
    const combos: Array<(v: Voxel) => Voxel> = [(v) => v];
    for (const op of mirrorOps) {
      const len = combos.length;
      for (let i = 0; i < len; i++) {
        const prev = combos[i];
        combos.push((v) => op(prev(v)));
      }
    }
    const seen = new Set<string>();
    const mirrored: Voxel[] = [];
    for (const v of result) {
      for (const combo of combos) {
        const nv = combo(v);
        const k = key(nv.x, nv.y, nv.z);
        if (!seen.has(k)) {
          seen.add(k);
          mirrored.push(nv);
        }
      }
    }
    result = mirrored;
  }

  return result;
}

/** Grow voxels to target count with strong biases */
function biasedGrow(
  voxels: Voxel[],
  target: number,
  rules: GenerationRules,
  rng: Rng,
  fundamentalDomain?: { x: boolean; y: boolean; z: boolean },
): Voxel[] {
  if (voxels.length >= target) {
    return voxels.slice(0, target);
  }

  const result = [...voxels];
  const occupied = new Set(result.map(v => key(v.x, v.y, v.z)));

  let cx = 0, cy = 0, cz = 0;
  for (const v of result) { cx += v.x; cy += v.y; cz += v.z; }
  cx /= result.length; cy /= result.length; cz /= result.length;

  while (result.length < target) {
    // Branching: always bias toward tips proportional to value
    let src: Voxel;
    if (rng.next() < FIXED_BRANCHING) {
      const tips = result.filter(v => neighborCount(v, occupied) <= 2);
      src = tips.length > 0 ? tips[Math.floor(rng.next() * tips.length)] : result[Math.floor(rng.next() * result.length)];
    } else {
      src = result[Math.floor(rng.next() * result.length)];
    }

    const candidates: [number, number, number, number][] = [];
    for (const [dx, dy, dz] of DIRS) {
      const nx = src.x + dx, ny = src.y + dy, nz = src.z + dz;
      if (occupied.has(key(nx, ny, nz))) continue;

      // Fundamental domain — matches mirror op semantics:
      //   X (swap x,z)    → x >= z
      //   Y (point inv)   → x + y + z >= 0
      //   Z (180° rot Y)  → x >= 0
      if (fundamentalDomain) {
        if (fundamentalDomain.x && nx < nz) continue;
        if (fundamentalDomain.y && nx + ny + nz < 0) continue;
        if (fundamentalDomain.z && nx < 0) continue;
      }

      let weight = 1;

      // Height bias — dramatic: at 1.0, upward is 8x more likely; at 0.0, horizontal is 8x
      const hb = rules.heightBias;
      if (dy > 0) weight *= 0.1 + hb * 8;
      if (dy < 0) weight *= 0.1 + (1 - hb) * 4;
      if (dx !== 0 || dz !== 0) weight *= 0.1 + (1 - hb) * 6;

      // Compactness — dramatic
      const dist = Math.sqrt((nx - cx) ** 2 + (ny - cy) ** 2 + (nz - cz) ** 2);
      if (FIXED_COMPACTNESS > 0.5) {
        weight *= 1 / (1 + dist * (FIXED_COMPACTNESS - 0.5) * 3);
      } else {
        weight *= 1 + dist * (0.5 - FIXED_COMPACTNESS) * 2;
      }

      candidates.push([dx, dy, dz, Math.max(0.01, weight)]);
    }

    if (candidates.length === 0) continue;

    const totalW = candidates.reduce((s, c) => s + c[3], 0);
    let r = rng.next() * totalW;
    let pick = candidates[0];
    for (const c of candidates) {
      r -= c[3];
      if (r <= 0) { pick = c; break; }
    }

    const nx = src.x + pick[0], ny = src.y + pick[1], nz = src.z + pick[2];
    occupied.add(key(nx, ny, nz));
    result.push({ x: nx, y: ny, z: nz, color: src.color });

    const n = result.length;
    cx = cx * (n - 1) / n + nx / n;
    cy = cy * (n - 1) / n + ny / n;
    cz = cz * (n - 1) / n + nz / n;
  }

  return result;
}
