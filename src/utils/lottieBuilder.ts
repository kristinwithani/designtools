import type { ColorPalette } from './colorUtils';
import type { AnimationParams } from './animationUtils';

// Convert hex or hsl colour string to [r, g, b] normalized to 0-1
function colorToRgb(color: string): [number, number, number] {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return [r / 255, g / 255, b / 255];
}

interface LottieShape {
  type: string;
  attrs: Record<string, string>;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
}

function parseSvgShapes(svgEl: SVGElement): LottieShape[][] {
  const groups: LottieShape[][] = [];
  const gElements = svgEl.querySelectorAll(':scope > g');

  gElements.forEach((g) => {
    const shapes: LottieShape[] = [];
    g.querySelectorAll('circle, rect, line, polygon, polyline, ellipse, path').forEach((el) => {
      const attrs: Record<string, string> = {};
      for (const attr of Array.from(el.attributes)) {
        attrs[attr.name] = attr.value;
      }
      shapes.push({
        type: el.tagName.toLowerCase(),
        attrs,
        fill: el.getAttribute('fill') || undefined,
        stroke: el.getAttribute('stroke') || undefined,
        strokeWidth: parseFloat(el.getAttribute('stroke-width') || '0') || undefined,
        opacity: parseFloat(el.getAttribute('opacity') || '1'),
      });
    });
    if (shapes.length > 0) groups.push(shapes);
  });

  return groups;
}

function buildShapeLayer(
  shapes: LottieShape[],
  index: number,
  params: AnimationParams,
  totalFrames: number,
  fps: number
) {
  const staggerFrames = Math.round((params.staggerOffset / 1000) * fps * index);
  const intensity = params.intensity;

  // Build Lottie shape items from SVG shapes
  const shapeItems: unknown[] = shapes.map((shape) => {
    const fill = shape.fill && shape.fill !== 'none'
      ? colorToRgb(shape.fill)
      : null;
    const stroke = shape.stroke && shape.stroke !== 'none'
      ? colorToRgb(shape.stroke)
      : null;

    const items: unknown[] = [];

    // Simple ellipse for circles
    if (shape.type === 'circle') {
      const cx = parseFloat(shape.attrs.cx || '0');
      const cy = parseFloat(shape.attrs.cy || '0');
      const r = parseFloat(shape.attrs.r || '0');
      items.push({
        ty: 'el',
        p: { a: 0, k: [cx, cy] },
        s: { a: 0, k: [r * 2, r * 2] },
      });
    } else if (shape.type === 'rect') {
      const x = parseFloat(shape.attrs.x || '0');
      const y = parseFloat(shape.attrs.y || '0');
      const w = parseFloat(shape.attrs.width || '0');
      const h = parseFloat(shape.attrs.height || '0');
      const rx = parseFloat(shape.attrs.rx || '0');
      items.push({
        ty: 'rc',
        p: { a: 0, k: [x + w / 2, y + h / 2] },
        s: { a: 0, k: [w, h] },
        r: { a: 0, k: rx },
      });
    } else {
      // For complex shapes, use a simple placeholder rectangle
      items.push({
        ty: 'rc',
        p: { a: 0, k: [100, 100] },
        s: { a: 0, k: [20, 20] },
        r: { a: 0, k: 0 },
      });
    }

    if (fill) {
      items.push({
        ty: 'fl',
        c: { a: 0, k: [...fill, 1] },
        o: { a: 0, k: (shape.opacity || 1) * 100 },
      });
    }

    if (stroke) {
      items.push({
        ty: 'st',
        c: { a: 0, k: [...stroke, 1] },
        o: { a: 0, k: 100 },
        w: { a: 0, k: shape.strokeWidth || 1 },
      });
    }

    return items;
  }).flat();

  // Rotation keyframes for wiggle
  const rotationKeyframes = {
    a: 1,
    k: [
      { t: staggerFrames, s: [0], i: { x: [0.42], y: [0] }, o: { x: [0.58], y: [1] } },
      { t: staggerFrames + totalFrames * 0.25, s: [intensity], i: { x: [0.42], y: [0] }, o: { x: [0.58], y: [1] } },
      { t: staggerFrames + totalFrames * 0.75, s: [-intensity], i: { x: [0.42], y: [0] }, o: { x: [0.58], y: [1] } },
      { t: staggerFrames + totalFrames, s: [0] },
    ],
  };

  return {
    ty: 4, // shape layer
    nm: `Group ${index + 1}`,
    ind: index,
    ip: 0,
    op: totalFrames,
    st: 0,
    ks: {
      o: { a: 0, k: 100 },
      r: rotationKeyframes,
      p: { a: 0, k: [100, 100, 0] },
      a: { a: 0, k: [100, 100, 0] },
      s: { a: 0, k: [100, 100, 100] },
    },
    shapes: shapeItems,
  };
}

export function buildLottieJson(
  svgEl: SVGElement,
  _palette: ColorPalette,
  animationParams: AnimationParams
) {
  const fps = 30;
  const totalFrames = Math.round(animationParams.speed * fps);
  const shapeGroups = parseSvgShapes(svgEl);

  const layers = shapeGroups.map((shapes, i) =>
    buildShapeLayer(shapes, i, animationParams, totalFrames, fps)
  );

  return {
    v: '5.7.4',
    fr: fps,
    ip: 0,
    op: totalFrames,
    w: 200,
    h: 200,
    nm: 'Illustra Export',
    ddd: 0,
    assets: [],
    layers,
  };
}