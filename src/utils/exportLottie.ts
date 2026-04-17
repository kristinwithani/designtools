import type { Voxel } from "../types";
import { computeExportLayout, cubeFaceColors, parseHSL } from "./scenemath";

function hslToRgb01(hsl: string): [number, number, number] {
  const [h, s, l] = parseHSL(hsl);
  const sn = s / 100;
  const ln = l / 100;
  const c = (1 - Math.abs(2 * ln - 1)) * sn;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = ln - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else { r = c; b = x; }
  return [r + m, g + m, b + m];
}

function makeShapePath(points: string) {
  // Parse "x1,y1 x2,y2 x3,y3 x4,y4" polygon points into Lottie bezier path
  const pts = points.split(" ").map((p) => {
    const [x, y] = p.split(",").map(Number);
    return [x, y];
  });
  return {
    c: true, // closed
    v: pts.map(([x, y]) => [x, y]),
    i: pts.map(() => [0, 0]), // no bezier handles
    o: pts.map(() => [0, 0]),
  };
}

function makeFlickerKeyframes(totalFrames: number, seed: number) {
  // Generate opacity keyframes: randomly 0 or 100 every ~5 frames
  const keyframes: { t: number; s: number[] }[] = [];
  let rng = seed;
  for (let f = 0; f < totalFrames; f += 5) {
    rng = ((rng * 1103515245 + 12345) & 0x7fffffff);
    const visible = (rng % 100) > 18; // ~18% chance hidden
    keyframes.push({ t: f, s: [visible ? 100 : 0] });
  }
  return keyframes;
}

export function buildLottieJson(voxels: Voxel[], cubeSize: number): object {
  const layout = computeExportLayout(voxels, cubeSize);
  if (!layout) return {};

  const { projected, viewMinX, viewMinY, viewW, viewH } = layout;
  const half = cubeSize / 2;
  const fps = 30;
  const duration = 3; // seconds
  const totalFrames = fps * duration;

  const w = cubeSize;

  // Face point templates
  const topPts = `${w / 2},0 ${w},${half / 2} ${w / 2},${half} 0,${half / 2}`;
  const leftPts = `0,${half / 2} ${w / 2},${half} ${w / 2},${half * 2} 0,${half + half / 2}`;
  const rightPts = `${w / 2},${half} ${w},${half / 2} ${w},${half + half / 2} ${w / 2},${half * 2}`;

  // Build layers (one per cube, rendered back-to-front)
  const layers = projected.map(({ v, sx, sy }, i) => {
    const colors = cubeFaceColors(v.color);
    const tx = sx - viewMinX;
    const ty = sy - half - viewMinY;

    const makeFace = (pts: string, color: string, strokeColor: string) => {
      const rgb = hslToRgb01(color);
      const strokeRgb = hslToRgb01(strokeColor);
      return {
        ty: "gr",
        it: [
          {
            ty: "sh",
            ks: { a: 0, k: makeShapePath(pts) },
          },
          {
            ty: "fl",
            c: { a: 0, k: [...rgb, 1] },
            o: { a: 0, k: 100 },
          },
          {
            ty: "st",
            c: { a: 0, k: [...strokeRgb, 1] },
            o: { a: 0, k: 100 },
            w: { a: 0, k: 0.5 },
            lj: 2, // round join
          },
          {
            ty: "tr",
            p: { a: 0, k: [0, 0] },
            a: { a: 0, k: [0, 0] },
            s: { a: 0, k: [100, 100] },
            r: { a: 0, k: 0 },
            o: { a: 0, k: 100 },
          },
        ],
      };
    };

    const flickerKf = makeFlickerKeyframes(totalFrames, i * 7919 + 42);

    return {
      ty: 4, // shape layer
      nm: `cube_${i}`,
      ip: 0,
      op: totalFrames,
      st: 0,
      ks: {
        p: { a: 0, k: [tx, ty, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] },
        r: { a: 0, k: 0 },
        o: {
          a: 1,
          k: flickerKf.map((kf, idx) => ({
            t: kf.t,
            s: kf.s,
            e: idx < flickerKf.length - 1 ? flickerKf[idx + 1].s : kf.s,
          })),
        },
      },
      shapes: [
        makeFace(leftPts, colors.left, colors.stroke),
        makeFace(rightPts, colors.right, colors.stroke),
        makeFace(topPts, colors.top, colors.stroke),
      ],
    };
  });

  return {
    v: "5.7.1",
    fr: fps,
    ip: 0,
    op: totalFrames,
    w: Math.round(viewW),
    h: Math.round(viewH),
    nm: "VoxelObject",
    ddd: 0,
    assets: [],
    layers: layers.reverse(), // Lottie renders first layer on top, so reverse painter order
  };
}

export function downloadLottie(voxels: Voxel[], cubeSize: number, name: string) {
  const json = buildLottieJson(voxels, cubeSize);
  const str = JSON.stringify(json);
  const blob = new Blob([str], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${name}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
