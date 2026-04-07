import type { ShapeConfig, CompositionConfig } from '../illustrations/Generative';

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
function randInt(min: number, max: number) {
  return Math.floor(rand(min, max + 1));
}
function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const FILLS = ['primary', 'dark', 'complementary'] as const;
const STROKES = ['primary', 'dark', 'complementary'] as const;

function poly(cx: number, cy: number, r: number, sides: number): string {
  return Array.from({ length: sides }, (_, i) => {
    const a = (i * (360 / sides) - 90) * Math.PI / 180;
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  }).join(' ');
}

// =============================================
// OBJECT BUILDERS — each constructs a small recognizable form
// =============================================

function buildEye(): ShapeConfig[] {
  const cy = 100;
  const fill = pick(FILLS);
  const stroke = pick(STROKES);
  return [
    // Eye outline (almond shape via arc)
    { type: 'arc', props: { d: `M50,${cy} Q100,${cy - 40} 150,${cy}`, stroke, strokeWidth: 2, opacity: rand(0.5, 0.9) } },
    { type: 'arc', props: { d: `M50,${cy} Q100,${cy + 40} 150,${cy}`, stroke, strokeWidth: 2, opacity: rand(0.5, 0.9) } },
    // Iris
    { type: 'circle', props: { cx: 100, cy, r: 18, fill, stroke: 'none', strokeWidth: 0, opacity: rand(0.5, 0.9) } },
    // Pupil
    { type: 'circle', props: { cx: 100, cy, r: 7, fill: 'dark', stroke: 'none', strokeWidth: 0, opacity: rand(0.7, 1) } },
  ];
}

function buildSun(): ShapeConfig[] {
  const cx = 100, cy = 100;
  const fill = pick(FILLS);
  const stroke = pick(STROKES);
  const rayCount = pick([8, 10, 12]);
  const innerR = rand(16, 22);
  const outerR = rand(38, 50);
  const shapes: ShapeConfig[] = [];

  for (let i = 0; i < rayCount; i++) {
    const a = (i * (360 / rayCount)) * Math.PI / 180;
    shapes.push({ type: 'line', props: {
      x1: cx + innerR * Math.cos(a), y1: cy + innerR * Math.sin(a),
      x2: cx + outerR * Math.cos(a), y2: cy + outerR * Math.sin(a),
      stroke, strokeWidth: rand(1.5, 2.5), opacity: rand(0.4, 0.8),
    }});
  }
  shapes.push({ type: 'circle', props: { cx, cy, r: innerR, fill, stroke: 'none', strokeWidth: 0, opacity: rand(0.6, 1) } });
  return shapes;
}

function buildHouse(): ShapeConfig[] {
  const fill = pick(FILLS);
  const stroke = pick(STROKES);
  return [
    // Roof
    { type: 'triangle', props: { points: '100,45 55,90 145,90', fill, opacity: rand(0.5, 0.9) } },
    // Body
    { type: 'rect', props: { x: 62, y: 90, w: 76, h: 55, rx: 0, fill: 'dark', opacity: rand(0.3, 0.6) } },
    // Door
    { type: 'rect', props: { x: 90, y: 110, w: 20, h: 35, rx: 0, fill: pick(FILLS), opacity: rand(0.5, 0.9) } },
    // Window
    { type: 'rect', props: { x: 70, y: 100, w: 14, h: 14, rx: 0, fill: pick(FILLS), stroke: 'none', strokeWidth: 0, opacity: rand(0.5, 0.8) } },
  ];
}

function buildArrow(): ShapeConfig[] {
  const stroke = pick(STROKES);
  const fill = pick(FILLS);
  const angle = pick([0, 45, 90, -45]); // right, diagonal up-right, up, diagonal up-left
  const rad = angle * Math.PI / 180;
  const cx = 100, cy = 100;
  const len = rand(40, 55);

  const x1 = cx - len * Math.cos(rad);
  const y1 = cy + len * Math.sin(rad);
  const x2 = cx + len * Math.cos(rad);
  const y2 = cy - len * Math.sin(rad);

  // Arrowhead
  const headSize = 14;
  const ha1 = rad + 2.6;
  const ha2 = rad - 2.6;

  return [
    { type: 'line', props: { x1, y1, x2, y2, stroke, strokeWidth: 2.5, opacity: rand(0.5, 0.9) } },
    { type: 'triangle', props: {
      points: `${x2},${y2} ${x2 - headSize * Math.cos(ha1)},${y2 + headSize * Math.sin(ha1)} ${x2 - headSize * Math.cos(ha2)},${y2 + headSize * Math.sin(ha2)}`,
      fill, opacity: rand(0.6, 1),
    }},
    // Tail dot
    { type: 'circle', props: { cx: x1, cy: y1, r: rand(3, 5), fill: 'dark', stroke: 'none', strokeWidth: 0, opacity: rand(0.3, 0.6) } },
  ];
}

function buildFlower(): ShapeConfig[] {
  const cx = 100, cy = 95;
  const petalR = rand(16, 22);
  const petalDist = rand(18, 24);
  const petalCount = pick([5, 6]);
  const fill = pick(FILLS);
  const shapes: ShapeConfig[] = [];

  for (let i = 0; i < petalCount; i++) {
    const a = (i * (360 / petalCount) - 90) * Math.PI / 180;
    shapes.push({ type: 'circle', props: {
      cx: cx + petalDist * Math.cos(a), cy: cy + petalDist * Math.sin(a),
      r: petalR, fill, stroke: 'none', strokeWidth: 0, opacity: rand(0.3, 0.6),
    }});
  }
  // Center
  shapes.push({ type: 'circle', props: { cx, cy, r: rand(8, 12), fill: pick(FILLS), stroke: 'none', strokeWidth: 0, opacity: rand(0.7, 1) } });
  // Stem
  shapes.push({ type: 'line', props: { x1: cx, y1: cy + petalDist + 5, x2: cx, y2: 165, stroke: pick(STROKES), strokeWidth: 2, opacity: rand(0.3, 0.7) } });
  return shapes;
}

function buildGem(): ShapeConfig[] {
  const fill = pick(FILLS);
  const stroke = pick(STROKES);
  return [
    // Top facet
    { type: 'triangle', props: { points: '100,50 65,90 135,90', fill, opacity: rand(0.6, 1) } },
    // Bottom facet
    { type: 'triangle', props: { points: '65,90 135,90 100,145', fill: 'dark', opacity: rand(0.3, 0.6) } },
    // Dividing line
    { type: 'line', props: { x1: 65, y1: 90, x2: 135, y2: 90, stroke, strokeWidth: 1.5, opacity: rand(0.4, 0.8) } },
    // Inner facet lines
    { type: 'line', props: { x1: 100, y1: 50, x2: 85, y2: 90, stroke, strokeWidth: 1, opacity: rand(0.2, 0.5) } },
    { type: 'line', props: { x1: 100, y1: 50, x2: 115, y2: 90, stroke, strokeWidth: 1, opacity: rand(0.2, 0.5) } },
  ];
}

function buildTarget(): ShapeConfig[] {
  const cx = 100, cy = 100;
  const stroke = pick(STROKES);
  const fill = pick(FILLS);
  return [
    { type: 'ring', props: { cx, cy, r: 50, stroke, strokeWidth: 2, opacity: rand(0.3, 0.7) } },
    { type: 'ring', props: { cx, cy, r: 34, stroke, strokeWidth: 1.5, opacity: rand(0.3, 0.6) } },
    { type: 'ring', props: { cx, cy, r: 18, stroke, strokeWidth: 1.5, opacity: rand(0.3, 0.6) } },
    { type: 'circle', props: { cx, cy, r: 6, fill, stroke: 'none', strokeWidth: 0, opacity: rand(0.7, 1) } },
  ];
}

function buildCrown(): ShapeConfig[] {
  const fill = pick(FILLS);
  const stroke = pick(STROKES);
  return [
    // Crown body
    { type: 'rect', props: { x: 60, y: 100, w: 80, h: 30, rx: 0, fill: 'dark', opacity: rand(0.3, 0.5) } },
    // Crown peaks
    { type: 'polygon', props: {
      points: '60,100 70,70 85,95 100,60 115,95 130,70 140,100',
      fill, stroke: 'none', strokeWidth: 0, opacity: rand(0.5, 0.9),
    }},
    // Jewels
    { type: 'circle', props: { cx: 100, cy: 68, r: 4, fill: pick(FILLS), stroke: 'none', strokeWidth: 0, opacity: rand(0.6, 1) } },
    { type: 'circle', props: { cx: 75, cy: 78, r: 3, fill: pick(FILLS), stroke: 'none', strokeWidth: 0, opacity: rand(0.5, 0.9) } },
    { type: 'circle', props: { cx: 125, cy: 78, r: 3, fill: pick(FILLS), stroke: 'none', strokeWidth: 0, opacity: rand(0.5, 0.9) } },
    // Base line
    { type: 'line', props: { x1: 58, y1: 130, x2: 142, y2: 130, stroke, strokeWidth: 2, opacity: rand(0.3, 0.6) } },
  ];
}

function buildMolecule(): ShapeConfig[] {
  const fill = pick(FILLS);
  const stroke = pick(STROKES);
  const cx = 100, cy = 100;
  const atoms = randInt(3, 5);
  const bondLen = rand(25, 35);
  const shapes: ShapeConfig[] = [];

  // Central atom
  shapes.push({ type: 'circle', props: { cx, cy, r: rand(10, 14), fill, stroke: 'none', strokeWidth: 0, opacity: rand(0.6, 1) } });

  const startAngle = rand(0, Math.PI * 2);
  for (let i = 0; i < atoms; i++) {
    const a = startAngle + (i * Math.PI * 2) / atoms;
    const ax = cx + bondLen * Math.cos(a);
    const ay = cy + bondLen * Math.sin(a);
    // Bond
    shapes.push({ type: 'line', props: { x1: cx, y1: cy, x2: ax, y2: ay, stroke, strokeWidth: 2, opacity: rand(0.4, 0.7) } });
    // Outer atom
    shapes.push({ type: 'circle', props: { cx: ax, cy: ay, r: rand(6, 10), fill: pick(FILLS), stroke: 'none', strokeWidth: 0, opacity: rand(0.5, 0.9) } });
  }
  return shapes;
}

function buildMountain(): ShapeConfig[] {
  const fill = pick(FILLS);
  return [
    // Back mountain
    { type: 'triangle', props: { points: '40,150 90,60 140,150', fill: 'dark', opacity: rand(0.3, 0.5) } },
    // Front mountain
    { type: 'triangle', props: { points: '70,150 120,45 170,150', fill, opacity: rand(0.5, 0.9) } },
    // Snow cap
    { type: 'triangle', props: { points: '120,45 112,68 128,68', fill: 'complementary', opacity: rand(0.4, 0.8) } },
    // Ground line
    { type: 'line', props: { x1: 30, y1: 150, x2: 170, y2: 150, stroke: pick(STROKES), strokeWidth: 1.5, opacity: rand(0.2, 0.5) } },
  ];
}

function buildHeart(): ShapeConfig[] {
  const fill = pick(FILLS);
  return [
    // Left lobe
    { type: 'circle', props: { cx: 82, cy: 85, r: 22, fill, stroke: 'none', strokeWidth: 0, opacity: rand(0.5, 0.9) } },
    // Right lobe
    { type: 'circle', props: { cx: 118, cy: 85, r: 22, fill, stroke: 'none', strokeWidth: 0, opacity: rand(0.5, 0.9) } },
    // Bottom point
    { type: 'triangle', props: { points: '62,95 138,95 100,140', fill, opacity: rand(0.5, 0.9) } },
    // Highlight
    { type: 'circle', props: { cx: 90, cy: 80, r: 5, fill: 'complementary', stroke: 'none', strokeWidth: 0, opacity: rand(0.3, 0.6) } },
  ];
}

function buildFlag(): ShapeConfig[] {
  const fill = pick(FILLS);
  const stroke = pick(STROKES);
  return [
    // Pole
    { type: 'line', props: { x1: 70, y1: 45, x2: 70, y2: 155, stroke, strokeWidth: 2.5, opacity: rand(0.5, 0.9) } },
    // Flag body
    { type: 'rect', props: { x: 70, y: 48, w: 60, h: 40, rx: 0, fill, opacity: rand(0.5, 0.9) } },
    // Flag stripe
    { type: 'rect', props: { x: 70, y: 60, w: 60, h: 12, rx: 0, fill: pick(FILLS), opacity: rand(0.3, 0.6) } },
    // Base
    { type: 'rect', props: { x: 62, y: 150, w: 16, h: 6, rx: 1, fill: 'dark', opacity: rand(0.3, 0.6) } },
  ];
}

function buildLightning(): ShapeConfig[] {
  const fill = pick(FILLS);
  const stroke = pick(STROKES);
  return [
    // Bolt
    { type: 'polygon', props: { points: '110,40 85,100 105,100 90,160 130,90 108,90', fill, opacity: rand(0.5, 0.9) } },
    // Glow circle
    { type: 'ring', props: { cx: 100, cy: 100, r: 50, stroke, strokeWidth: 1.5, opacity: rand(0.15, 0.35), dash: '4 6' } },
  ];
}

function buildGrid(): ShapeConfig[] {
  const fill = pick(FILLS);
  const cols = pick([3, 4]);
  const rows = pick([3, 4]);
  const cellSize = rand(16, 22);
  const gap = rand(3, 6);
  const totalW = cols * cellSize + (cols - 1) * gap;
  const totalH = rows * cellSize + (rows - 1) * gap;
  const startX = 100 - totalW / 2;
  const startY = 100 - totalH / 2;
  const shapes: ShapeConfig[] = [];
  const highlightIdx = randInt(0, cols * rows - 1);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const idx = r * cols + c;
      const x = startX + c * (cellSize + gap);
      const y = startY + r * (cellSize + gap);
      shapes.push({ type: 'rect', props: {
        x, y, w: cellSize, h: cellSize, rx: rand(0, 2),
        fill: idx === highlightIdx ? pick(FILLS) : fill,
        opacity: idx === highlightIdx ? rand(0.7, 1) : rand(0.3, 0.6),
      }});
    }
  }
  return shapes;
}

function buildWaves(): ShapeConfig[] {
  const shapes: ShapeConfig[] = [];
  const count = randInt(3, 5);
  const baseY = 100;
  const gap = rand(12, 20);
  const amp = rand(12, 25);
  const stroke = pick(STROKES);

  for (let i = 0; i < count; i++) {
    const y = baseY + (i - (count - 1) / 2) * gap;
    shapes.push({ type: 'wave', props: {
      d: `M35,${y} Q67,${y - amp} 100,${y} Q133,${y + amp} 165,${y}`,
      stroke, strokeWidth: rand(1.5, 2.5), opacity: rand(0.3, 0.8),
    }});
  }
  return shapes;
}

// --- 50 additional object builders ---

function buildClock(): ShapeConfig[] {
  const s = pick(STROKES), f = pick(FILLS);
  return [
    { type: 'ring', props: { cx: 100, cy: 100, r: 45, stroke: s, strokeWidth: 2, opacity: rand(0.4, 0.8) } },
    { type: 'line', props: { x1: 100, y1: 100, x2: 100, y2: 65, stroke: s, strokeWidth: 2.5, opacity: rand(0.5, 0.9) } },
    { type: 'line', props: { x1: 100, y1: 100, x2: 125, y2: 100, stroke: f, strokeWidth: 2, opacity: rand(0.5, 0.9) } },
    { type: 'circle', props: { cx: 100, cy: 100, r: 4, fill: f, stroke: 'none', strokeWidth: 0, opacity: rand(0.7, 1) } },
  ];
}

function buildKey(): ShapeConfig[] {
  const f = pick(FILLS), s = pick(STROKES);
  return [
    { type: 'ring', props: { cx: 75, cy: 80, r: 20, stroke: s, strokeWidth: 2.5, opacity: rand(0.5, 0.9) } },
    { type: 'line', props: { x1: 95, y1: 80, x2: 150, y2: 80, stroke: s, strokeWidth: 2, opacity: rand(0.5, 0.9) } },
    { type: 'line', props: { x1: 140, y1: 80, x2: 140, y2: 95, stroke: s, strokeWidth: 2, opacity: rand(0.4, 0.8) } },
    { type: 'line', props: { x1: 150, y1: 80, x2: 150, y2: 100, stroke: s, strokeWidth: 2, opacity: rand(0.4, 0.8) } },
    { type: 'circle', props: { cx: 75, cy: 80, r: 7, fill: f, stroke: 'none', strokeWidth: 0, opacity: rand(0.5, 0.8) } },
  ];
}

function buildLock(): ShapeConfig[] {
  const f = pick(FILLS), s = pick(STROKES);
  return [
    { type: 'rect', props: { x: 70, y: 95, w: 60, h: 45, rx: 4, fill: f, opacity: rand(0.4, 0.8) } },
    { type: 'arc', props: { d: 'M82,95 Q82,65 100,65 Q118,65 118,95', stroke: s, strokeWidth: 2.5, opacity: rand(0.5, 0.9) } },
    { type: 'circle', props: { cx: 100, cy: 114, r: 6, fill: 'dark', stroke: 'none', strokeWidth: 0, opacity: rand(0.6, 1) } },
  ];
}

function buildStar(): ShapeConfig[] {
  const f = pick(FILLS), s = pick(STROKES);
  return [
    { type: 'polygon', props: { points: poly(100, 100, 45, 5), fill: f, stroke: 'none', strokeWidth: 0, opacity: rand(0.4, 0.8) } },
    { type: 'polygon', props: { points: poly(100, 100, 25, 5), fill: 'none', stroke: s, strokeWidth: 1.5, opacity: rand(0.3, 0.6) } },
    { type: 'circle', props: { cx: 100, cy: 100, r: 5, fill: pick(FILLS), stroke: 'none', strokeWidth: 0, opacity: rand(0.6, 1) } },
  ];
}

function buildMoon(): ShapeConfig[] {
  const f = pick(FILLS);
  return [
    { type: 'circle', props: { cx: 95, cy: 100, r: 38, fill: f, stroke: 'none', strokeWidth: 0, opacity: rand(0.5, 0.9) } },
    { type: 'circle', props: { cx: 115, cy: 88, r: 30, fill: 'dark', stroke: 'none', strokeWidth: 0, opacity: rand(0.8, 1) } },
    { type: 'dots', props: { dots: [{ cx: 70, cy: 75, r: 2 }, { cx: 60, cy: 95, r: 1.5 }, { cx: 75, cy: 115, r: 2 }], fill: pick(FILLS), opacity: rand(0.3, 0.7) } },
  ];
}

function buildDrop(): ShapeConfig[] {
  const f = pick(FILLS);
  return [
    { type: 'circle', props: { cx: 100, cy: 115, r: 28, fill: f, stroke: 'none', strokeWidth: 0, opacity: rand(0.4, 0.8) } },
    { type: 'triangle', props: { points: '100,55 78,115 122,115', fill: f, opacity: rand(0.4, 0.8) } },
    { type: 'circle', props: { cx: 92, cy: 105, r: 5, fill: 'complementary', stroke: 'none', strokeWidth: 0, opacity: rand(0.3, 0.6) } },
  ];
}

function buildCloud(): ShapeConfig[] {
  const f = pick(FILLS);
  return [
    { type: 'circle', props: { cx: 85, cy: 100, r: 25, fill: f, stroke: 'none', strokeWidth: 0, opacity: rand(0.4, 0.7) } },
    { type: 'circle', props: { cx: 115, cy: 100, r: 22, fill: f, stroke: 'none', strokeWidth: 0, opacity: rand(0.4, 0.7) } },
    { type: 'circle', props: { cx: 100, cy: 88, r: 28, fill: f, stroke: 'none', strokeWidth: 0, opacity: rand(0.5, 0.8) } },
    { type: 'rect', props: { x: 65, y: 100, w: 70, h: 20, rx: 0, fill: f, opacity: rand(0.4, 0.7) } },
  ];
}

function buildBell(): ShapeConfig[] {
  const f = pick(FILLS), s = pick(STROKES);
  return [
    { type: 'arc', props: { d: 'M65,120 Q65,65 100,60 Q135,65 135,120', stroke: s, strokeWidth: 2.5, opacity: rand(0.5, 0.9) } },
    { type: 'line', props: { x1: 60, y1: 120, x2: 140, y2: 120, stroke: s, strokeWidth: 2, opacity: rand(0.4, 0.8) } },
    { type: 'circle', props: { cx: 100, cy: 132, r: 6, fill: f, stroke: 'none', strokeWidth: 0, opacity: rand(0.5, 0.9) } },
    { type: 'line', props: { x1: 100, y1: 48, x2: 100, y2: 60, stroke: s, strokeWidth: 2, opacity: rand(0.4, 0.8) } },
  ];
}

function buildAnchor(): ShapeConfig[] {
  const s = pick(STROKES), f = pick(FILLS);
  return [
    { type: 'ring', props: { cx: 100, cy: 55, r: 10, stroke: s, strokeWidth: 2, opacity: rand(0.5, 0.9) } },
    { type: 'line', props: { x1: 100, y1: 65, x2: 100, y2: 145, stroke: s, strokeWidth: 2.5, opacity: rand(0.5, 0.9) } },
    { type: 'line', props: { x1: 70, y1: 95, x2: 130, y2: 95, stroke: s, strokeWidth: 2, opacity: rand(0.4, 0.8) } },
    { type: 'arc', props: { d: 'M65,135 Q100,155 135,135', stroke: s, strokeWidth: 2, opacity: rand(0.4, 0.8) } },
    { type: 'circle', props: { cx: 100, cy: 55, r: 4, fill: f, stroke: 'none', strokeWidth: 0, opacity: rand(0.5, 0.9) } },
  ];
}

function buildLeaf(): ShapeConfig[] {
  const f = pick(FILLS), s = pick(STROKES);
  return [
    { type: 'arc', props: { d: 'M100,50 Q145,85 100,150', stroke: s, strokeWidth: 2, opacity: rand(0.5, 0.9) } },
    { type: 'arc', props: { d: 'M100,50 Q55,85 100,150', stroke: s, strokeWidth: 2, opacity: rand(0.5, 0.9) } },
    { type: 'circle', props: { cx: 100, cy: 95, r: 25, fill: f, stroke: 'none', strokeWidth: 0, opacity: rand(0.2, 0.4) } },
    { type: 'line', props: { x1: 100, y1: 55, x2: 100, y2: 145, stroke: s, strokeWidth: 1.5, opacity: rand(0.3, 0.6) } },
  ];
}

function buildMusicalNote(): ShapeConfig[] {
  const f = pick(FILLS), s = pick(STROKES);
  return [
    { type: 'circle', props: { cx: 85, cy: 125, r: 14, fill: f, stroke: 'none', strokeWidth: 0, opacity: rand(0.5, 0.9) } },
    { type: 'line', props: { x1: 99, y1: 125, x2: 99, y2: 55, stroke: s, strokeWidth: 2.5, opacity: rand(0.5, 0.9) } },
    { type: 'rect', props: { x: 99, y: 55, w: 25, h: 8, rx: 2, fill: f, opacity: rand(0.5, 0.9) } },
  ];
}

function buildHourglass(): ShapeConfig[] {
  const f = pick(FILLS), s = pick(STROKES);
  return [
    { type: 'triangle', props: { points: '65,55 135,55 100,100', fill: f, opacity: rand(0.4, 0.7) } },
    { type: 'triangle', props: { points: '65,145 135,145 100,100', fill: 'dark', opacity: rand(0.3, 0.5) } },
    { type: 'line', props: { x1: 60, y1: 55, x2: 140, y2: 55, stroke: s, strokeWidth: 2, opacity: rand(0.5, 0.9) } },
    { type: 'line', props: { x1: 60, y1: 145, x2: 140, y2: 145, stroke: s, strokeWidth: 2, opacity: rand(0.5, 0.9) } },
    { type: 'circle', props: { cx: 100, cy: 100, r: 3, fill: pick(FILLS), stroke: 'none', strokeWidth: 0, opacity: rand(0.6, 1) } },
  ];
}

function buildCup(): ShapeConfig[] {
  const f = pick(FILLS), s = pick(STROKES);
  return [
    { type: 'rect', props: { x: 65, y: 75, w: 55, h: 55, rx: 4, fill: f, opacity: rand(0.4, 0.7) } },
    { type: 'arc', props: { d: 'M120,85 Q145,90 145,105 Q145,120 120,125', stroke: s, strokeWidth: 2, opacity: rand(0.4, 0.8) } },
    { type: 'line', props: { x1: 60, y1: 130, x2: 125, y2: 130, stroke: s, strokeWidth: 1.5, opacity: rand(0.3, 0.6) } },
    { type: 'wave', props: { d: 'M72,68 Q80,60 88,68 Q96,60 104,68', stroke: pick(STROKES), strokeWidth: 1.5, opacity: rand(0.3, 0.6) } },
  ];
}

function buildCamera(): ShapeConfig[] {
  const f = pick(FILLS), s = pick(STROKES);
  return [
    { type: 'rect', props: { x: 55, y: 75, w: 90, h: 60, rx: 5, fill: 'dark', opacity: rand(0.3, 0.5) } },
    { type: 'ring', props: { cx: 100, cy: 105, r: 20, stroke: s, strokeWidth: 2, opacity: rand(0.5, 0.9) } },
    { type: 'circle', props: { cx: 100, cy: 105, r: 10, fill: f, stroke: 'none', strokeWidth: 0, opacity: rand(0.5, 0.9) } },
    { type: 'rect', props: { x: 85, y: 65, w: 30, h: 12, rx: 2, fill: 'dark', opacity: rand(0.3, 0.5) } },
  ];
}

function buildEnvelope(): ShapeConfig[] {
  const f = pick(FILLS), s = pick(STROKES);
  return [
    { type: 'rect', props: { x: 50, y: 70, w: 100, h: 65, rx: 3, fill: 'dark', opacity: rand(0.2, 0.4) } },
    { type: 'triangle', props: { points: '50,70 100,110 150,70', fill: f, opacity: rand(0.5, 0.9) } },
    { type: 'circle', props: { cx: 100, cy: 115, r: 8, fill: pick(FILLS), stroke: 'none', strokeWidth: 0, opacity: rand(0.5, 0.9) } },
  ];
}

function buildRocket(): ShapeConfig[] {
  const f = pick(FILLS), s = pick(STROKES);
  return [
    { type: 'rect', props: { x: 88, y: 60, w: 24, h: 70, rx: 12, fill: f, opacity: rand(0.5, 0.9) } },
    { type: 'triangle', props: { points: '100,45 88,70 112,70', fill: f, opacity: rand(0.6, 1) } },
    { type: 'triangle', props: { points: '82,130 88,110 94,130', fill: pick(FILLS), opacity: rand(0.4, 0.7) } },
    { type: 'triangle', props: { points: '106,130 112,110 118,130', fill: pick(FILLS), opacity: rand(0.4, 0.7) } },
    { type: 'circle', props: { cx: 100, cy: 85, r: 5, fill: 'dark', stroke: 'none', strokeWidth: 0, opacity: rand(0.5, 0.9) } },
  ];
}

function buildCompass(): ShapeConfig[] {
  const s = pick(STROKES), f = pick(FILLS);
  return [
    { type: 'ring', props: { cx: 100, cy: 100, r: 45, stroke: s, strokeWidth: 2, opacity: rand(0.4, 0.8) } },
    { type: 'triangle', props: { points: '100,58 94,100 106,100', fill: f, opacity: rand(0.6, 1) } },
    { type: 'triangle', props: { points: '100,142 94,100 106,100', fill: 'dark', opacity: rand(0.4, 0.7) } },
    { type: 'circle', props: { cx: 100, cy: 100, r: 4, fill: pick(FILLS), stroke: 'none', strokeWidth: 0, opacity: rand(0.7, 1) } },
  ];
}

function buildLightbulb(): ShapeConfig[] {
  const f = pick(FILLS), s = pick(STROKES);
  return [
    { type: 'circle', props: { cx: 100, cy: 85, r: 30, fill: f, stroke: 'none', strokeWidth: 0, opacity: rand(0.4, 0.7) } },
    { type: 'ring', props: { cx: 100, cy: 85, r: 30, stroke: s, strokeWidth: 2, opacity: rand(0.4, 0.8) } },
    { type: 'rect', props: { x: 88, y: 115, w: 24, h: 18, rx: 2, fill: 'dark', opacity: rand(0.3, 0.6) } },
    { type: 'line', props: { x1: 88, y1: 121, x2: 112, y2: 121, stroke: s, strokeWidth: 1, opacity: rand(0.3, 0.5) } },
    { type: 'line', props: { x1: 88, y1: 127, x2: 112, y2: 127, stroke: s, strokeWidth: 1, opacity: rand(0.3, 0.5) } },
  ];
}

function buildDiamond(): ShapeConfig[] {
  const f = pick(FILLS), s = pick(STROKES);
  return [
    { type: 'polygon', props: { points: '100,45 145,100 100,155 55,100', fill: f, stroke: 'none', strokeWidth: 0, opacity: rand(0.4, 0.7) } },
    { type: 'polygon', props: { points: '100,60 130,100 100,140 70,100', fill: 'none', stroke: s, strokeWidth: 1.5, opacity: rand(0.4, 0.7) } },
    { type: 'line', props: { x1: 55, y1: 100, x2: 145, y2: 100, stroke: s, strokeWidth: 1, opacity: rand(0.3, 0.5) } },
  ];
}

function buildPlanet(): ShapeConfig[] {
  const f = pick(FILLS), s = pick(STROKES);
  return [
    { type: 'circle', props: { cx: 100, cy: 100, r: 28, fill: f, stroke: 'none', strokeWidth: 0, opacity: rand(0.5, 0.9) } },
    { type: 'arc', props: { d: 'M55,90 Q100,120 145,90', stroke: s, strokeWidth: 2, opacity: rand(0.3, 0.7) } },
    { type: 'arc', props: { d: 'M55,110 Q100,80 145,110', stroke: s, strokeWidth: 2, opacity: rand(0.3, 0.7) } },
    { type: 'circle', props: { cx: 90, cy: 92, r: 4, fill: 'dark', stroke: 'none', strokeWidth: 0, opacity: rand(0.2, 0.4) } },
  ];
}

function buildTree(): ShapeConfig[] {
  const f = pick(FILLS), s = pick(STROKES);
  return [
    { type: 'triangle', props: { points: '100,40 60,95 140,95', fill: f, opacity: rand(0.4, 0.8) } },
    { type: 'triangle', props: { points: '100,65 55,120 145,120', fill: f, opacity: rand(0.5, 0.9) } },
    { type: 'rect', props: { x: 92, y: 120, w: 16, h: 30, rx: 0, fill: 'dark', opacity: rand(0.4, 0.7) } },
  ];
}

function buildUmbrella(): ShapeConfig[] {
  const f = pick(FILLS), s = pick(STROKES);
  return [
    { type: 'arc', props: { d: 'M50,105 Q50,55 100,55 Q150,55 150,105', stroke: s, strokeWidth: 2, opacity: rand(0.5, 0.9) } },
    { type: 'circle', props: { cx: 100, cy: 75, r: 25, fill: f, stroke: 'none', strokeWidth: 0, opacity: rand(0.3, 0.5) } },
    { type: 'line', props: { x1: 100, y1: 55, x2: 100, y2: 150, stroke: s, strokeWidth: 2, opacity: rand(0.5, 0.9) } },
    { type: 'arc', props: { d: 'M100,150 Q108,145 108,140', stroke: s, strokeWidth: 2, opacity: rand(0.4, 0.8) } },
  ];
}

function buildShield(): ShapeConfig[] {
  const f = pick(FILLS), s = pick(STROKES);
  return [
    { type: 'polygon', props: { points: '100,45 140,65 140,115 100,150 60,115 60,65', fill: f, stroke: 'none', strokeWidth: 0, opacity: rand(0.4, 0.7) } },
    { type: 'polygon', props: { points: '100,55 130,72 130,110 100,138 70,110 70,72', fill: 'none', stroke: s, strokeWidth: 1.5, opacity: rand(0.4, 0.7) } },
    { type: 'cross', props: { cx: 100, cy: 98, size: 18, stroke: pick(STROKES), strokeWidth: 2, opacity: rand(0.4, 0.8) } },
  ];
}

function buildFeather(): ShapeConfig[] {
  const s = pick(STROKES), f = pick(FILLS);
  return [
    { type: 'arc', props: { d: 'M60,150 Q95,80 140,50', stroke: s, strokeWidth: 2, opacity: rand(0.5, 0.9) } },
    { type: 'arc', props: { d: 'M80,130 Q55,95 80,65', stroke: f, strokeWidth: 1.5, opacity: rand(0.3, 0.6) } },
    { type: 'arc', props: { d: 'M95,115 Q120,80 115,55', stroke: f, strokeWidth: 1.5, opacity: rand(0.3, 0.6) } },
    { type: 'circle', props: { cx: 140, cy: 50, r: 3, fill: pick(FILLS), stroke: 'none', strokeWidth: 0, opacity: rand(0.5, 0.9) } },
  ];
}

function buildPrism(): ShapeConfig[] {
  const f = pick(FILLS);
  return [
    { type: 'triangle', props: { points: '100,50 60,140 140,140', fill: 'dark', opacity: rand(0.3, 0.5) } },
    { type: 'line', props: { x1: 40, y1: 100, x2: 80, y2: 100, stroke: pick(STROKES), strokeWidth: 2, opacity: rand(0.4, 0.8) } },
    { type: 'line', props: { x1: 120, y1: 85, x2: 165, y2: 70, stroke: f, strokeWidth: 1.5, opacity: rand(0.4, 0.7) } },
    { type: 'line', props: { x1: 120, y1: 100, x2: 165, y2: 100, stroke: 'complementary', strokeWidth: 1.5, opacity: rand(0.4, 0.7) } },
    { type: 'line', props: { x1: 120, y1: 115, x2: 165, y2: 130, stroke: pick(FILLS), strokeWidth: 1.5, opacity: rand(0.4, 0.7) } },
  ];
}

function buildAtom(): ShapeConfig[] {
  const s = pick(STROKES), f = pick(FILLS);
  return [
    { type: 'ring', props: { cx: 100, cy: 100, r: 40, stroke: s, strokeWidth: 1.5, opacity: rand(0.3, 0.6) } },
    { type: 'arc', props: { d: 'M55,80 Q100,40 145,80', stroke: s, strokeWidth: 1.5, opacity: rand(0.3, 0.6) } },
    { type: 'arc', props: { d: 'M55,120 Q100,160 145,120', stroke: s, strokeWidth: 1.5, opacity: rand(0.3, 0.6) } },
    { type: 'circle', props: { cx: 100, cy: 100, r: 8, fill: f, stroke: 'none', strokeWidth: 0, opacity: rand(0.6, 1) } },
  ];
}

function buildInfinity(): ShapeConfig[] {
  const s = pick(STROKES);
  return [
    { type: 'arc', props: { d: 'M100,100 Q130,65 155,100 Q130,135 100,100', stroke: s, strokeWidth: 2.5, opacity: rand(0.5, 0.9) } },
    { type: 'arc', props: { d: 'M100,100 Q70,65 45,100 Q70,135 100,100', stroke: s, strokeWidth: 2.5, opacity: rand(0.5, 0.9) } },
    { type: 'circle', props: { cx: 100, cy: 100, r: 4, fill: pick(FILLS), stroke: 'none', strokeWidth: 0, opacity: rand(0.6, 1) } },
  ];
}

function buildCrosshatch(): ShapeConfig[] {
  const s = pick(STROKES);
  const shapes: ShapeConfig[] = [];
  for (let i = 0; i < 5; i++) {
    const p = 55 + i * 22;
    shapes.push({ type: 'line', props: { x1: p, y1: 55, x2: p, y2: 145, stroke: s, strokeWidth: 1, opacity: rand(0.2, 0.5) } });
    shapes.push({ type: 'line', props: { x1: 55, y1: p, x2: 145, y2: p, stroke: s, strokeWidth: 1, opacity: rand(0.2, 0.5) } });
  }
  shapes.push({ type: 'circle', props: { cx: 100, cy: 100, r: 8, fill: pick(FILLS), stroke: 'none', strokeWidth: 0, opacity: rand(0.6, 1) } });
  return shapes;
}

function buildBow(): ShapeConfig[] {
  const f = pick(FILLS);
  return [
    { type: 'triangle', props: { points: '100,95 60,75 60,115', fill: f, opacity: rand(0.4, 0.8) } },
    { type: 'triangle', props: { points: '100,95 140,75 140,115', fill: f, opacity: rand(0.4, 0.8) } },
    { type: 'circle', props: { cx: 100, cy: 95, r: 8, fill: pick(FILLS), stroke: 'none', strokeWidth: 0, opacity: rand(0.6, 1) } },
    { type: 'line', props: { x1: 100, y1: 103, x2: 100, y2: 145, stroke: pick(STROKES), strokeWidth: 1.5, opacity: rand(0.3, 0.6) } },
  ];
}

function buildDNA(): ShapeConfig[] {
  const s = pick(STROKES), f = pick(FILLS);
  const shapes: ShapeConfig[] = [];
  for (let i = 0; i < 5; i++) {
    const y = 50 + i * 25;
    const xOff = 15 * Math.sin(i * 1.2);
    shapes.push({ type: 'line', props: { x1: 85 + xOff, y1: y, x2: 115 - xOff, y2: y, stroke: s, strokeWidth: 1.5, opacity: rand(0.3, 0.6) } });
    shapes.push({ type: 'circle', props: { cx: 85 + xOff, cy: y, r: 4, fill: f, stroke: 'none', strokeWidth: 0, opacity: rand(0.4, 0.8) } });
    shapes.push({ type: 'circle', props: { cx: 115 - xOff, cy: y, r: 4, fill: pick(FILLS), stroke: 'none', strokeWidth: 0, opacity: rand(0.4, 0.8) } });
  }
  return shapes;
}

function buildSpiral(): ShapeConfig[] {
  const s = pick(STROKES);
  return [
    { type: 'arc', props: { d: 'M100,100 Q115,85 125,100 Q135,120 115,130 Q85,140 75,115 Q65,80 90,65 Q125,50 145,80', stroke: s, strokeWidth: 2, opacity: rand(0.5, 0.9) } },
    { type: 'circle', props: { cx: 100, cy: 100, r: 4, fill: pick(FILLS), stroke: 'none', strokeWidth: 0, opacity: rand(0.5, 0.9) } },
  ];
}

function buildSnowflake(): ShapeConfig[] {
  const s = pick(STROKES);
  const shapes: ShapeConfig[] = [];
  for (let i = 0; i < 6; i++) {
    const a = (i * 60) * Math.PI / 180;
    shapes.push({ type: 'line', props: { x1: 100, y1: 100, x2: 100 + 40 * Math.cos(a), y2: 100 + 40 * Math.sin(a), stroke: s, strokeWidth: 2, opacity: rand(0.4, 0.8) } });
    // Branch tips
    const bx = 100 + 30 * Math.cos(a);
    const by = 100 + 30 * Math.sin(a);
    const ba1 = a + 0.5;
    const ba2 = a - 0.5;
    shapes.push({ type: 'line', props: { x1: bx, y1: by, x2: bx + 12 * Math.cos(ba1), y2: by + 12 * Math.sin(ba1), stroke: s, strokeWidth: 1.5, opacity: rand(0.3, 0.6) } });
    shapes.push({ type: 'line', props: { x1: bx, y1: by, x2: bx + 12 * Math.cos(ba2), y2: by + 12 * Math.sin(ba2), stroke: s, strokeWidth: 1.5, opacity: rand(0.3, 0.6) } });
  }
  shapes.push({ type: 'circle', props: { cx: 100, cy: 100, r: 4, fill: pick(FILLS), stroke: 'none', strokeWidth: 0, opacity: rand(0.6, 1) } });
  return shapes;
}

function buildButterfly(): ShapeConfig[] {
  const f = pick(FILLS);
  return [
    { type: 'circle', props: { cx: 78, cy: 85, r: 22, fill: f, stroke: 'none', strokeWidth: 0, opacity: rand(0.4, 0.7) } },
    { type: 'circle', props: { cx: 122, cy: 85, r: 22, fill: f, stroke: 'none', strokeWidth: 0, opacity: rand(0.4, 0.7) } },
    { type: 'circle', props: { cx: 82, cy: 115, r: 14, fill: pick(FILLS), stroke: 'none', strokeWidth: 0, opacity: rand(0.3, 0.6) } },
    { type: 'circle', props: { cx: 118, cy: 115, r: 14, fill: pick(FILLS), stroke: 'none', strokeWidth: 0, opacity: rand(0.3, 0.6) } },
    { type: 'line', props: { x1: 100, y1: 70, x2: 100, y2: 140, stroke: pick(STROKES), strokeWidth: 2, opacity: rand(0.5, 0.9) } },
  ];
}

function buildCactus(): ShapeConfig[] {
  const f = pick(FILLS), s = pick(STROKES);
  return [
    { type: 'rect', props: { x: 90, y: 55, w: 20, h: 80, rx: 10, fill: f, opacity: rand(0.5, 0.9) } },
    { type: 'rect', props: { x: 65, y: 80, w: 25, h: 12, rx: 6, fill: f, opacity: rand(0.4, 0.8) } },
    { type: 'rect', props: { x: 65, y: 72, w: 12, h: 25, rx: 6, fill: f, opacity: rand(0.4, 0.8) } },
    { type: 'rect', props: { x: 110, y: 65, w: 25, h: 12, rx: 6, fill: f, opacity: rand(0.4, 0.8) } },
    { type: 'rect', props: { x: 123, y: 55, w: 12, h: 25, rx: 6, fill: f, opacity: rand(0.4, 0.8) } },
    { type: 'rect', props: { x: 75, y: 135, w: 50, h: 10, rx: 2, fill: 'dark', opacity: rand(0.3, 0.5) } },
  ];
}

function buildSkull(): ShapeConfig[] {
  const f = pick(FILLS), s = pick(STROKES);
  return [
    { type: 'circle', props: { cx: 100, cy: 88, r: 32, fill: f, stroke: 'none', strokeWidth: 0, opacity: rand(0.4, 0.7) } },
    { type: 'circle', props: { cx: 88, cy: 85, r: 8, fill: 'dark', stroke: 'none', strokeWidth: 0, opacity: rand(0.6, 1) } },
    { type: 'circle', props: { cx: 112, cy: 85, r: 8, fill: 'dark', stroke: 'none', strokeWidth: 0, opacity: rand(0.6, 1) } },
    { type: 'rect', props: { x: 85, y: 118, w: 30, h: 20, rx: 2, fill: f, opacity: rand(0.4, 0.7) } },
    { type: 'line', props: { x1: 93, y1: 118, x2: 93, y2: 138, stroke: 'dark', strokeWidth: 1.5, opacity: rand(0.3, 0.6) } },
    { type: 'line', props: { x1: 100, y1: 118, x2: 100, y2: 138, stroke: 'dark', strokeWidth: 1.5, opacity: rand(0.3, 0.6) } },
    { type: 'line', props: { x1: 107, y1: 118, x2: 107, y2: 138, stroke: 'dark', strokeWidth: 1.5, opacity: rand(0.3, 0.6) } },
  ];
}

function buildPeace(): ShapeConfig[] {
  const s = pick(STROKES);
  return [
    { type: 'ring', props: { cx: 100, cy: 100, r: 42, stroke: s, strokeWidth: 2.5, opacity: rand(0.5, 0.9) } },
    { type: 'line', props: { x1: 100, y1: 58, x2: 100, y2: 142, stroke: s, strokeWidth: 2, opacity: rand(0.5, 0.9) } },
    { type: 'line', props: { x1: 100, y1: 100, x2: 72, y2: 130, stroke: s, strokeWidth: 2, opacity: rand(0.5, 0.9) } },
    { type: 'line', props: { x1: 100, y1: 100, x2: 128, y2: 130, stroke: s, strokeWidth: 2, opacity: rand(0.5, 0.9) } },
  ];
}

function buildHexGrid(): ShapeConfig[] {
  const s = pick(STROKES);
  const shapes: ShapeConfig[] = [];
  const size = 18;
  const positions = [[100, 75], [78, 95], [122, 95], [100, 115], [78, 135], [122, 135]];
  for (const [cx, cy] of positions) {
    shapes.push({ type: 'polygon', props: { points: poly(cx, cy, size, 6), fill: 'none', stroke: s, strokeWidth: 1.5, opacity: rand(0.3, 0.7) } });
  }
  shapes.push({ type: 'circle', props: { cx: 100, cy: 95, r: 5, fill: pick(FILLS), stroke: 'none', strokeWidth: 0, opacity: rand(0.5, 0.9) } });
  return shapes;
}

function buildChessKnight(): ShapeConfig[] {
  const f = pick(FILLS);
  return [
    { type: 'rect', props: { x: 70, y: 130, w: 60, h: 12, rx: 2, fill: 'dark', opacity: rand(0.4, 0.7) } },
    { type: 'rect', props: { x: 80, y: 120, w: 40, h: 14, rx: 2, fill: 'dark', opacity: rand(0.3, 0.5) } },
    { type: 'polygon', props: { points: '85,120 85,75 75,85 95,55 110,80 115,120', fill: f, opacity: rand(0.5, 0.9) } },
    { type: 'circle', props: { cx: 92, cy: 80, r: 3, fill: 'dark', stroke: 'none', strokeWidth: 0, opacity: rand(0.6, 1) } },
  ];
}

function buildSatellite(): ShapeConfig[] {
  const f = pick(FILLS), s = pick(STROKES);
  return [
    { type: 'rect', props: { x: 88, y: 88, w: 24, h: 24, rx: 2, fill: f, opacity: rand(0.5, 0.9) } },
    { type: 'rect', props: { x: 55, y: 94, w: 33, h: 12, rx: 1, fill: pick(FILLS), opacity: rand(0.3, 0.6) } },
    { type: 'rect', props: { x: 112, y: 94, w: 33, h: 12, rx: 1, fill: pick(FILLS), opacity: rand(0.3, 0.6) } },
    { type: 'line', props: { x1: 88, y1: 88, x2: 70, y2: 70, stroke: s, strokeWidth: 1.5, opacity: rand(0.3, 0.6) } },
    { type: 'arc', props: { d: 'M55,55 Q65,50 75,55', stroke: s, strokeWidth: 1.5, opacity: rand(0.3, 0.5) } },
    { type: 'arc', props: { d: 'M48,48 Q65,40 82,48', stroke: s, strokeWidth: 1, opacity: rand(0.2, 0.4) } },
  ];
}

function buildPyramid(): ShapeConfig[] {
  const f = pick(FILLS);
  return [
    { type: 'triangle', props: { points: '100,45 45,140 155,140', fill: 'dark', opacity: rand(0.2, 0.4) } },
    { type: 'triangle', props: { points: '100,45 100,140 155,140', fill: f, opacity: rand(0.4, 0.7) } },
    { type: 'line', props: { x1: 30, y1: 140, x2: 170, y2: 140, stroke: pick(STROKES), strokeWidth: 1.5, opacity: rand(0.2, 0.5) } },
    { type: 'circle', props: { cx: 100, cy: 90, r: 10, fill: pick(FILLS), stroke: 'none', strokeWidth: 0, opacity: rand(0.5, 0.9) } },
  ];
}

function buildBridge(): ShapeConfig[] {
  const s = pick(STROKES);
  return [
    { type: 'arc', props: { d: 'M40,120 Q70,70 100,120', stroke: s, strokeWidth: 2, opacity: rand(0.4, 0.8) } },
    { type: 'arc', props: { d: 'M100,120 Q130,70 160,120', stroke: s, strokeWidth: 2, opacity: rand(0.4, 0.8) } },
    { type: 'line', props: { x1: 35, y1: 120, x2: 165, y2: 120, stroke: s, strokeWidth: 2.5, opacity: rand(0.5, 0.9) } },
    { type: 'line', props: { x1: 40, y1: 120, x2: 40, y2: 140, stroke: s, strokeWidth: 2, opacity: rand(0.3, 0.6) } },
    { type: 'line', props: { x1: 100, y1: 120, x2: 100, y2: 140, stroke: s, strokeWidth: 2, opacity: rand(0.3, 0.6) } },
    { type: 'line', props: { x1: 160, y1: 120, x2: 160, y2: 140, stroke: s, strokeWidth: 2, opacity: rand(0.3, 0.6) } },
  ];
}

function buildWifi(): ShapeConfig[] {
  const s = pick(STROKES), f = pick(FILLS);
  return [
    { type: 'arc', props: { d: 'M50,95 Q100,50 150,95', stroke: s, strokeWidth: 2, opacity: rand(0.3, 0.6) } },
    { type: 'arc', props: { d: 'M65,105 Q100,70 135,105', stroke: s, strokeWidth: 2, opacity: rand(0.4, 0.7) } },
    { type: 'arc', props: { d: 'M80,115 Q100,90 120,115', stroke: s, strokeWidth: 2, opacity: rand(0.5, 0.8) } },
    { type: 'circle', props: { cx: 100, cy: 125, r: 5, fill: f, stroke: 'none', strokeWidth: 0, opacity: rand(0.6, 1) } },
  ];
}

function buildPower(): ShapeConfig[] {
  const s = pick(STROKES), f = pick(FILLS);
  return [
    { type: 'arc', props: { d: 'M70,75 Q60,100 70,125 Q85,155 115,155 Q130,155 140,125 Q150,100 140,75', stroke: s, strokeWidth: 2.5, opacity: rand(0.5, 0.9) } },
    { type: 'line', props: { x1: 105, y1: 55, x2: 105, y2: 105, stroke: s, strokeWidth: 2.5, opacity: rand(0.5, 0.9) } },
  ];
}

function buildPaperPlane(): ShapeConfig[] {
  const f = pick(FILLS);
  return [
    { type: 'triangle', props: { points: '45,55 155,100 45,120', fill: f, opacity: rand(0.5, 0.9) } },
    { type: 'triangle', props: { points: '45,120 155,100 90,120', fill: 'dark', opacity: rand(0.3, 0.6) } },
    { type: 'line', props: { x1: 90, y1: 120, x2: 90, y2: 145, stroke: pick(STROKES), strokeWidth: 1.5, opacity: rand(0.3, 0.5) } },
  ];
}

function buildYinYang(): ShapeConfig[] {
  const f = pick(FILLS), s = pick(STROKES);
  return [
    { type: 'circle', props: { cx: 100, cy: 100, r: 40, fill: f, stroke: 'none', strokeWidth: 0, opacity: rand(0.4, 0.7) } },
    { type: 'arc', props: { d: 'M100,60 Q80,80 100,100', stroke: 'none', strokeWidth: 0, opacity: 0 } },
    { type: 'circle', props: { cx: 100, cy: 80, r: 20, fill: 'dark', stroke: 'none', strokeWidth: 0, opacity: rand(0.5, 0.8) } },
    { type: 'circle', props: { cx: 100, cy: 120, r: 20, fill: f, stroke: 'none', strokeWidth: 0, opacity: rand(0.5, 0.8) } },
    { type: 'circle', props: { cx: 100, cy: 80, r: 6, fill: f, stroke: 'none', strokeWidth: 0, opacity: rand(0.6, 1) } },
    { type: 'circle', props: { cx: 100, cy: 120, r: 6, fill: 'dark', stroke: 'none', strokeWidth: 0, opacity: rand(0.6, 1) } },
    { type: 'ring', props: { cx: 100, cy: 100, r: 40, stroke: s, strokeWidth: 2, opacity: rand(0.4, 0.8) } },
  ];
}

function buildDice(): ShapeConfig[] {
  const f = pick(FILLS);
  return [
    { type: 'rect', props: { x: 65, y: 65, w: 70, h: 70, rx: 8, fill: f, opacity: rand(0.4, 0.7) } },
    { type: 'circle', props: { cx: 82, cy: 82, r: 5, fill: 'dark', stroke: 'none', strokeWidth: 0, opacity: rand(0.6, 1) } },
    { type: 'circle', props: { cx: 118, cy: 82, r: 5, fill: 'dark', stroke: 'none', strokeWidth: 0, opacity: rand(0.6, 1) } },
    { type: 'circle', props: { cx: 100, cy: 100, r: 5, fill: 'dark', stroke: 'none', strokeWidth: 0, opacity: rand(0.6, 1) } },
    { type: 'circle', props: { cx: 82, cy: 118, r: 5, fill: 'dark', stroke: 'none', strokeWidth: 0, opacity: rand(0.6, 1) } },
    { type: 'circle', props: { cx: 118, cy: 118, r: 5, fill: 'dark', stroke: 'none', strokeWidth: 0, opacity: rand(0.6, 1) } },
  ];
}

function buildBarChart(): ShapeConfig[] {
  const f = pick(FILLS), s = pick(STROKES);
  const bars = [rand(30, 70), rand(40, 85), rand(25, 60), rand(50, 90), rand(35, 75)];
  const shapes: ShapeConfig[] = [];
  bars.forEach((h, i) => {
    shapes.push({ type: 'rect', props: { x: 50 + i * 22, y: 140 - h, w: 16, h, rx: 0, fill: i === bars.indexOf(Math.max(...bars)) ? pick(FILLS) : f, opacity: rand(0.4, 0.9) } });
  });
  shapes.push({ type: 'line', props: { x1: 45, y1: 140, x2: 165, y2: 140, stroke: s, strokeWidth: 1.5, opacity: rand(0.3, 0.6) } });
  return shapes;
}

function buildTornado(): ShapeConfig[] {
  const s = pick(STROKES);
  return [
    { type: 'line', props: { x1: 50, y1: 60, x2: 150, y2: 60, stroke: s, strokeWidth: 2.5, opacity: rand(0.5, 0.9) } },
    { type: 'line', props: { x1: 60, y1: 78, x2: 140, y2: 78, stroke: s, strokeWidth: 2, opacity: rand(0.4, 0.8) } },
    { type: 'line', props: { x1: 70, y1: 96, x2: 130, y2: 96, stroke: s, strokeWidth: 2, opacity: rand(0.4, 0.7) } },
    { type: 'line', props: { x1: 80, y1: 114, x2: 120, y2: 114, stroke: s, strokeWidth: 1.5, opacity: rand(0.3, 0.6) } },
    { type: 'line', props: { x1: 90, y1: 132, x2: 110, y2: 132, stroke: s, strokeWidth: 1.5, opacity: rand(0.3, 0.5) } },
    { type: 'circle', props: { cx: 100, cy: 148, r: 3, fill: pick(FILLS), stroke: 'none', strokeWidth: 0, opacity: rand(0.4, 0.8) } },
  ];
}

function buildEarth(): ShapeConfig[] {
  const f = pick(FILLS), s = pick(STROKES);
  return [
    { type: 'circle', props: { cx: 100, cy: 100, r: 40, fill: f, stroke: 'none', strokeWidth: 0, opacity: rand(0.3, 0.6) } },
    { type: 'ring', props: { cx: 100, cy: 100, r: 40, stroke: s, strokeWidth: 2, opacity: rand(0.5, 0.9) } },
    { type: 'arc', props: { d: 'M100,60 Q115,80 100,100 Q85,120 100,140', stroke: s, strokeWidth: 1.5, opacity: rand(0.3, 0.6) } },
    { type: 'line', props: { x1: 60, y1: 90, x2: 140, y2: 90, stroke: s, strokeWidth: 1, opacity: rand(0.2, 0.5) } },
    { type: 'line', props: { x1: 60, y1: 110, x2: 140, y2: 110, stroke: s, strokeWidth: 1, opacity: rand(0.2, 0.5) } },
  ];
}

// --- More everyday objects ---

function buildScissors(): ShapeConfig[] {
  const s = pick(STROKES), f = pick(FILLS);
  return [
    { type: 'ring', props: { cx: 80, cy: 130, r: 12, stroke: s, strokeWidth: 2, opacity: rand(0.5, 0.9) } },
    { type: 'ring', props: { cx: 120, cy: 130, r: 12, stroke: s, strokeWidth: 2, opacity: rand(0.5, 0.9) } },
    { type: 'line', props: { x1: 80, y1: 118, x2: 115, y2: 60, stroke: s, strokeWidth: 2, opacity: rand(0.5, 0.9) } },
    { type: 'line', props: { x1: 120, y1: 118, x2: 85, y2: 60, stroke: s, strokeWidth: 2, opacity: rand(0.5, 0.9) } },
    { type: 'circle', props: { cx: 100, cy: 90, r: 3, fill: f, stroke: 'none', strokeWidth: 0, opacity: rand(0.5, 0.9) } },
  ];
}

function buildGlasses(): ShapeConfig[] {
  const s = pick(STROKES);
  return [
    { type: 'ring', props: { cx: 75, cy: 100, r: 20, stroke: s, strokeWidth: 2, opacity: rand(0.5, 0.9) } },
    { type: 'ring', props: { cx: 125, cy: 100, r: 20, stroke: s, strokeWidth: 2, opacity: rand(0.5, 0.9) } },
    { type: 'arc', props: { d: 'M95,100 Q100,95 105,100', stroke: s, strokeWidth: 2, opacity: rand(0.4, 0.8) } },
    { type: 'line', props: { x1: 55, y1: 95, x2: 40, y2: 90, stroke: s, strokeWidth: 1.5, opacity: rand(0.3, 0.7) } },
    { type: 'line', props: { x1: 145, y1: 95, x2: 160, y2: 90, stroke: s, strokeWidth: 1.5, opacity: rand(0.3, 0.7) } },
  ];
}

function buildPencil(): ShapeConfig[] {
  const f = pick(FILLS), s = pick(STROKES);
  return [
    { type: 'rect', props: { x: 90, y: 50, w: 20, h: 85, rx: 1, fill: f, opacity: rand(0.5, 0.9) } },
    { type: 'triangle', props: { points: '90,135 110,135 100,155', fill: 'dark', opacity: rand(0.5, 0.9) } },
    { type: 'rect', props: { x: 90, y: 48, w: 20, h: 10, rx: 0, fill: pick(FILLS), opacity: rand(0.4, 0.7) } },
  ];
}

function buildBook(): ShapeConfig[] {
  const f = pick(FILLS), s = pick(STROKES);
  return [
    { type: 'rect', props: { x: 55, y: 65, w: 42, h: 70, rx: 2, fill: f, opacity: rand(0.4, 0.7) } },
    { type: 'rect', props: { x: 103, y: 65, w: 42, h: 70, rx: 2, fill: 'dark', opacity: rand(0.3, 0.5) } },
    { type: 'line', props: { x1: 100, y1: 60, x2: 100, y2: 140, stroke: s, strokeWidth: 2, opacity: rand(0.5, 0.9) } },
    { type: 'line', props: { x1: 65, y1: 82, x2: 90, y2: 82, stroke: s, strokeWidth: 1, opacity: rand(0.2, 0.5) } },
    { type: 'line', props: { x1: 65, y1: 92, x2: 88, y2: 92, stroke: s, strokeWidth: 1, opacity: rand(0.2, 0.5) } },
    { type: 'line', props: { x1: 65, y1: 102, x2: 85, y2: 102, stroke: s, strokeWidth: 1, opacity: rand(0.2, 0.5) } },
  ];
}

function buildHeadphones(): ShapeConfig[] {
  const s = pick(STROKES), f = pick(FILLS);
  return [
    { type: 'arc', props: { d: 'M65,110 Q65,60 100,60 Q135,60 135,110', stroke: s, strokeWidth: 2.5, opacity: rand(0.5, 0.9) } },
    { type: 'rect', props: { x: 55, y: 105, w: 16, h: 28, rx: 4, fill: f, opacity: rand(0.5, 0.9) } },
    { type: 'rect', props: { x: 129, y: 105, w: 16, h: 28, rx: 4, fill: f, opacity: rand(0.5, 0.9) } },
  ];
}

function buildWatch(): ShapeConfig[] {
  const s = pick(STROKES), f = pick(FILLS);
  return [
    { type: 'rect', props: { x: 100 - 18, y: 60, w: 36, h: 14, rx: 2, fill: 'dark', opacity: rand(0.3, 0.5) } },
    { type: 'rect', props: { x: 100 - 18, y: 126, w: 36, h: 14, rx: 2, fill: 'dark', opacity: rand(0.3, 0.5) } },
    { type: 'ring', props: { cx: 100, cy: 100, r: 30, stroke: s, strokeWidth: 2.5, opacity: rand(0.5, 0.9) } },
    { type: 'line', props: { x1: 100, y1: 100, x2: 100, y2: 78, stroke: s, strokeWidth: 2, opacity: rand(0.5, 0.9) } },
    { type: 'line', props: { x1: 100, y1: 100, x2: 118, y2: 100, stroke: f, strokeWidth: 1.5, opacity: rand(0.5, 0.9) } },
    { type: 'circle', props: { cx: 100, cy: 100, r: 3, fill: f, stroke: 'none', strokeWidth: 0, opacity: rand(0.6, 1) } },
  ];
}

function buildMagnifier(): ShapeConfig[] {
  const s = pick(STROKES), f = pick(FILLS);
  return [
    { type: 'ring', props: { cx: 88, cy: 88, r: 30, stroke: s, strokeWidth: 2.5, opacity: rand(0.5, 0.9) } },
    { type: 'line', props: { x1: 110, y1: 110, x2: 145, y2: 145, stroke: s, strokeWidth: 3, opacity: rand(0.5, 0.9) } },
    { type: 'circle', props: { cx: 80, cy: 80, r: 5, fill: f, stroke: 'none', strokeWidth: 0, opacity: rand(0.3, 0.6) } },
  ];
}

function buildPlug(): ShapeConfig[] {
  const s = pick(STROKES), f = pick(FILLS);
  return [
    { type: 'rect', props: { x: 80, y: 90, w: 40, h: 35, rx: 4, fill: f, opacity: rand(0.4, 0.7) } },
    { type: 'line', props: { x1: 92, y1: 90, x2: 92, y2: 70, stroke: s, strokeWidth: 3, opacity: rand(0.5, 0.9) } },
    { type: 'line', props: { x1: 108, y1: 90, x2: 108, y2: 70, stroke: s, strokeWidth: 3, opacity: rand(0.5, 0.9) } },
    { type: 'line', props: { x1: 100, y1: 125, x2: 100, y2: 150, stroke: s, strokeWidth: 2, opacity: rand(0.4, 0.7) } },
  ];
}

function buildCandle(): ShapeConfig[] {
  const f = pick(FILLS), s = pick(STROKES);
  return [
    { type: 'rect', props: { x: 88, y: 80, w: 24, h: 65, rx: 2, fill: f, opacity: rand(0.5, 0.9) } },
    { type: 'line', props: { x1: 100, y1: 80, x2: 100, y2: 65, stroke: s, strokeWidth: 1.5, opacity: rand(0.4, 0.7) } },
    { type: 'circle', props: { cx: 100, cy: 58, r: 8, fill: pick(FILLS), stroke: 'none', strokeWidth: 0, opacity: rand(0.5, 0.9) } },
    { type: 'triangle', props: { points: '100,48 94,62 106,62', fill: 'complementary', opacity: rand(0.5, 0.8) } },
  ];
}

function buildBattery(): ShapeConfig[] {
  const f = pick(FILLS), s = pick(STROKES);
  return [
    { type: 'rect', props: { x: 65, y: 75, w: 60, h: 50, rx: 4, fill: 'none', stroke: s, strokeWidth: 2, opacity: rand(0.5, 0.9) } },
    { type: 'rect', props: { x: 125, y: 90, w: 10, h: 20, rx: 2, fill: s, opacity: rand(0.4, 0.7) } },
    { type: 'rect', props: { x: 70, y: 80, w: 35, h: 40, rx: 2, fill: f, opacity: rand(0.4, 0.8) } },
  ];
}

function buildSpeaker(): ShapeConfig[] {
  const f = pick(FILLS), s = pick(STROKES);
  return [
    { type: 'rect', props: { x: 60, y: 75, w: 35, h: 50, rx: 3, fill: f, opacity: rand(0.4, 0.7) } },
    { type: 'triangle', props: { points: '95,75 130,55 130,145 95,125', fill: f, opacity: rand(0.5, 0.9) } },
    { type: 'arc', props: { d: 'M138,80 Q150,100 138,120', stroke: s, strokeWidth: 2, opacity: rand(0.4, 0.7) } },
    { type: 'arc', props: { d: 'M145,70 Q162,100 145,130', stroke: s, strokeWidth: 1.5, opacity: rand(0.3, 0.5) } },
  ];
}

function buildBulb(): ShapeConfig[] {
  const f = pick(FILLS), s = pick(STROKES);
  return [
    { type: 'circle', props: { cx: 100, cy: 85, r: 32, fill: f, stroke: 'none', strokeWidth: 0, opacity: rand(0.3, 0.6) } },
    { type: 'ring', props: { cx: 100, cy: 85, r: 32, stroke: s, strokeWidth: 2, opacity: rand(0.5, 0.9) } },
    { type: 'rect', props: { x: 88, y: 117, w: 24, h: 16, rx: 2, fill: 'dark', opacity: rand(0.4, 0.6) } },
    { type: 'line', props: { x1: 90, y1: 123, x2: 110, y2: 123, stroke: s, strokeWidth: 1, opacity: rand(0.3, 0.5) } },
    { type: 'line', props: { x1: 90, y1: 128, x2: 110, y2: 128, stroke: s, strokeWidth: 1, opacity: rand(0.3, 0.5) } },
    { type: 'line', props: { x1: 92, y1: 75, x2: 108, y2: 95, stroke: pick(FILLS), strokeWidth: 1.5, opacity: rand(0.3, 0.5) } },
  ];
}

function buildPhone(): ShapeConfig[] {
  const f = pick(FILLS), s = pick(STROKES);
  return [
    { type: 'rect', props: { x: 78, y: 50, w: 44, h: 100, rx: 6, fill: 'dark', opacity: rand(0.3, 0.5) } },
    { type: 'rect', props: { x: 82, y: 60, w: 36, h: 72, rx: 2, fill: f, opacity: rand(0.3, 0.5) } },
    { type: 'circle', props: { cx: 100, cy: 142, r: 4, fill: 'none', stroke: s, strokeWidth: 1.5, opacity: rand(0.4, 0.7) } },
  ];
}

function buildLaptop(): ShapeConfig[] {
  const f = pick(FILLS), s = pick(STROKES);
  return [
    { type: 'rect', props: { x: 60, y: 65, w: 80, h: 55, rx: 3, fill: 'dark', opacity: rand(0.3, 0.5) } },
    { type: 'rect', props: { x: 65, y: 70, w: 70, h: 44, rx: 1, fill: f, opacity: rand(0.3, 0.5) } },
    { type: 'rect', props: { x: 50, y: 120, w: 100, h: 8, rx: 3, fill: 'dark', opacity: rand(0.4, 0.6) } },
  ];
}

function buildBag(): ShapeConfig[] {
  const f = pick(FILLS), s = pick(STROKES);
  return [
    { type: 'rect', props: { x: 65, y: 85, w: 70, h: 60, rx: 4, fill: f, opacity: rand(0.5, 0.9) } },
    { type: 'arc', props: { d: 'M80,85 Q80,60 100,60 Q120,60 120,85', stroke: s, strokeWidth: 2, opacity: rand(0.5, 0.9) } },
    { type: 'line', props: { x1: 65, y1: 100, x2: 135, y2: 100, stroke: s, strokeWidth: 1, opacity: rand(0.2, 0.5) } },
    { type: 'circle', props: { cx: 100, cy: 108, r: 5, fill: pick(FILLS), stroke: 'none', strokeWidth: 0, opacity: rand(0.4, 0.8) } },
  ];
}

function buildLamp(): ShapeConfig[] {
  const f = pick(FILLS), s = pick(STROKES);
  return [
    { type: 'triangle', props: { points: '100,55 65,110 135,110', fill: f, opacity: rand(0.4, 0.7) } },
    { type: 'line', props: { x1: 100, y1: 110, x2: 100, y2: 145, stroke: s, strokeWidth: 2, opacity: rand(0.5, 0.9) } },
    { type: 'line', props: { x1: 85, y1: 145, x2: 115, y2: 145, stroke: s, strokeWidth: 2, opacity: rand(0.5, 0.9) } },
    { type: 'circle', props: { cx: 100, cy: 90, r: 5, fill: 'complementary', stroke: 'none', strokeWidth: 0, opacity: rand(0.4, 0.7) } },
  ];
}

function buildBottle(): ShapeConfig[] {
  const f = pick(FILLS);
  return [
    { type: 'rect', props: { x: 85, y: 85, w: 30, h: 60, rx: 4, fill: f, opacity: rand(0.5, 0.9) } },
    { type: 'rect', props: { x: 92, y: 60, w: 16, h: 28, rx: 2, fill: f, opacity: rand(0.4, 0.8) } },
    { type: 'rect', props: { x: 94, y: 52, w: 12, h: 10, rx: 1, fill: 'dark', opacity: rand(0.4, 0.6) } },
    { type: 'line', props: { x1: 88, y1: 105, x2: 112, y2: 105, stroke: pick(STROKES), strokeWidth: 1, opacity: rand(0.2, 0.4) } },
  ];
}

function buildChair(): ShapeConfig[] {
  const s = pick(STROKES), f = pick(FILLS);
  return [
    { type: 'rect', props: { x: 70, y: 60, w: 8, h: 90, rx: 1, fill: s, opacity: rand(0.4, 0.7) } },
    { type: 'rect', props: { x: 122, y: 95, w: 8, h: 55, rx: 1, fill: s, opacity: rand(0.4, 0.7) } },
    { type: 'rect', props: { x: 70, y: 95, w: 60, h: 8, rx: 1, fill: f, opacity: rand(0.5, 0.9) } },
    { type: 'rect', props: { x: 70, y: 60, w: 8, h: 40, rx: 1, fill: f, opacity: rand(0.5, 0.9) } },
  ];
}

function buildPlant(): ShapeConfig[] {
  const f = pick(FILLS), s = pick(STROKES);
  return [
    { type: 'rect', props: { x: 80, y: 115, w: 40, h: 35, rx: 3, fill: 'dark', opacity: rand(0.3, 0.5) } },
    { type: 'line', props: { x1: 100, y1: 115, x2: 100, y2: 75, stroke: s, strokeWidth: 2, opacity: rand(0.5, 0.9) } },
    { type: 'arc', props: { d: 'M100,90 Q75,75 80,55', stroke: f, strokeWidth: 2, opacity: rand(0.5, 0.9) } },
    { type: 'arc', props: { d: 'M100,80 Q125,65 122,48', stroke: f, strokeWidth: 2, opacity: rand(0.5, 0.9) } },
    { type: 'circle', props: { cx: 80, cy: 55, r: 8, fill: f, stroke: 'none', strokeWidth: 0, opacity: rand(0.3, 0.6) } },
    { type: 'circle', props: { cx: 122, cy: 48, r: 6, fill: f, stroke: 'none', strokeWidth: 0, opacity: rand(0.3, 0.6) } },
  ];
}

function buildMail(): ShapeConfig[] {
  const f = pick(FILLS), s = pick(STROKES);
  return [
    { type: 'rect', props: { x: 50, y: 75, w: 100, h: 60, rx: 3, fill: 'dark', opacity: rand(0.2, 0.4) } },
    { type: 'line', props: { x1: 50, y1: 75, x2: 100, y2: 108, stroke: s, strokeWidth: 2, opacity: rand(0.5, 0.9) } },
    { type: 'line', props: { x1: 150, y1: 75, x2: 100, y2: 108, stroke: s, strokeWidth: 2, opacity: rand(0.5, 0.9) } },
    { type: 'circle', props: { cx: 130, cy: 90, r: 8, fill: f, stroke: 'none', strokeWidth: 0, opacity: rand(0.4, 0.7) } },
  ];
}

const OBJECT_BUILDERS = [
  buildEye, buildSun, buildHouse, buildArrow, buildFlower,
  buildGem, buildTarget, buildCrown, buildMolecule, buildMountain,
  buildHeart, buildFlag, buildLightning, buildGrid, buildWaves,
  // 50 new builders
  buildClock, buildKey, buildLock, buildStar, buildMoon,
  buildDrop, buildCloud, buildBell, buildAnchor, buildLeaf,
  buildMusicalNote, buildHourglass, buildCup, buildCamera, buildEnvelope,
  buildRocket, buildCompass, buildLightbulb, buildDiamond, buildPlanet,
  buildTree, buildUmbrella, buildShield, buildFeather, buildPrism,
  buildAtom, buildInfinity, buildCrosshatch, buildBow, buildDNA,
  buildSpiral, buildSnowflake, buildButterfly, buildCactus, buildSkull,
  buildPeace, buildHexGrid, buildChessKnight, buildSatellite, buildPyramid,
  buildBridge, buildWifi, buildPower, buildPaperPlane, buildYinYang,
  buildDice, buildBarChart, buildTornado, buildEarth,
  // Everyday objects
  buildScissors, buildGlasses, buildPencil, buildBook, buildHeadphones,
  buildWatch, buildMagnifier, buildPlug, buildCandle, buildBattery,
  buildSpeaker, buildBulb, buildPhone, buildLaptop, buildBag,
  buildLamp, buildBottle, buildChair, buildPlant, buildMail,
];

// --- Text phrases ---

const PHRASES = [
  { lines: ['CREATE', 'MORE'], fontSize: 28 },
  { lines: ['DREAM', 'BIG'], fontSize: 30 },
  { lines: ['FIND', 'YOUR', 'WAY'], fontSize: 18 },
  { content: 'EXPLORE', fontSize: 30 },
  { lines: ['BE', 'STILL'], fontSize: 28 },
  { content: 'LET GO', fontSize: 22 },
  { lines: ['KEEP', 'GOING'], fontSize: 24 },
  { content: 'WONDER', fontSize: 34 },
  { lines: ['START', 'HERE'], fontSize: 26 },
  { content: 'NOT YET', fontSize: 36 },
  { lines: ['SLOW', 'DOWN'], fontSize: 28 },
  { content: 'TRUST IT', fontSize: 26 },
  { content: 'BREATHE', fontSize: 28 },
  { content: 'FOCUS', fontSize: 34 },
  { lines: ['LOOK', 'UP'], fontSize: 30 },
  { content: 'BEGIN', fontSize: 36 },
  { content: 'RISE', fontSize: 40 },
  { lines: ['STAY', 'OPEN'], fontSize: 26 },
  { content: 'ENOUGH', fontSize: 30 },
  { lines: ['TRY', 'AGAIN'], fontSize: 26 },
  // 20 more phrases
  { lines: ['DO', 'THE', 'WORK'], fontSize: 20 },
  { content: 'PERSIST', fontSize: 32 },
  { lines: ['JUST', 'START'], fontSize: 28 },
  { content: 'DARE', fontSize: 42 },
  { lines: ['BE', 'HERE', 'NOW'], fontSize: 20 },
  { content: 'FLOW', fontSize: 40 },
  { lines: ['MAKE', 'IT', 'MATTER'], fontSize: 18 },
  { content: 'LEAP', fontSize: 42 },
  { lines: ['GO', 'FURTHER'], fontSize: 28 },
  { content: 'ALIGN', fontSize: 34 },
  { lines: ['HOLD', 'STEADY'], fontSize: 26 },
  { content: 'ADAPT', fontSize: 34 },
  { lines: ['LESS', 'IS', 'MORE'], fontSize: 20 },
  { content: 'ITERATE', fontSize: 28 },
  { lines: ['SHOW', 'UP'], fontSize: 30 },
  { content: 'EVOLVE', fontSize: 32 },
  { lines: ['OWN', 'IT'], fontSize: 32 },
  { content: 'DEPTH', fontSize: 38 },
  { lines: ['TAKE', 'SPACE'], fontSize: 26 },
  { content: 'COMMIT', fontSize: 30 },
  // 20 single words
  { content: 'WANDER', fontSize: 30 },
  { content: 'SHIFT', fontSize: 36 },
  { content: 'BLOOM', fontSize: 36 },
  { content: 'IGNITE', fontSize: 30 },
  { content: 'EMERGE', fontSize: 30 },
  { content: 'CLARITY', fontSize: 28 },
  { content: 'ANCHOR', fontSize: 30 },
  { content: 'PAUSE', fontSize: 36 },
  { content: 'STRIVE', fontSize: 32 },
  { content: 'THRIVE', fontSize: 32 },
  { content: 'GRIT', fontSize: 42 },
  { content: 'GRACE', fontSize: 36 },
  { content: 'SPARK', fontSize: 36 },
  { content: 'GROW', fontSize: 42 },
  { content: 'ROAM', fontSize: 38 },
  { content: 'CRAFT', fontSize: 34 },
  { content: 'BUILD', fontSize: 36 },
  { content: 'HUSTLE', fontSize: 28 },
  { content: 'DREAM', fontSize: 38 },
  { content: 'AWAKE', fontSize: 32 },
];

// --- Composition builder ---

export function generateComposition(): CompositionConfig {
  const isTextBased = Math.random() < 0.25;

  if (isTextBased) {
    const phrase = pick(PHRASES);
    const lineCount = 'lines' in phrase ? phrase.lines!.length : 1;
    const totalHeight = lineCount * phrase.fontSize * 1.2;
    const startY = 100 - totalHeight / 2 + phrase.fontSize * 0.8;

    // Small accent from a random object builder (just take 1-2 shapes, scaled small)
    const accents: ShapeConfig[] = [];
    if (Math.random() > 0.3) {
      const side = pick(['top-right', 'bottom-left', 'top-left']);
      const acx = side.includes('right') ? rand(145, 170) : rand(30, 55);
      const acy = side.includes('top') ? rand(35, 60) : rand(140, 165);
      accents.push({ type: pick(['circle', 'ring']), props:
        Math.random() > 0.5
          ? { cx: acx, cy: acy, r: rand(8, 16), stroke: pick(STROKES), strokeWidth: 1.5, opacity: rand(0.25, 0.5) }
          : { cx: acx, cy: acy, r: rand(5, 12), fill: pick(FILLS), stroke: 'none', strokeWidth: 0, opacity: rand(0.3, 0.6) }
      });
    }
    if (Math.random() > 0.5) {
      const ly = startY + totalHeight + rand(8, 16);
      accents.push({ type: 'line', props: { x1: 100 - rand(25, 45), y1: ly, x2: 100 + rand(25, 45), y2: ly, stroke: pick(STROKES), strokeWidth: 1.5, opacity: rand(0.2, 0.4) } });
    }

    return {
      shapes: accents,
      text: {
        content: 'content' in phrase ? phrase.content! : '',
        fontSize: phrase.fontSize,
        y: startY,
        lines: 'lines' in phrase ? phrase.lines : undefined,
      },
    };
  }

  const builder = pick(OBJECT_BUILDERS);
  return { shapes: builder() };
}