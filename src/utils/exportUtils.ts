import html2canvas from 'html2canvas';
import type { ColorPalette } from './colorUtils';
import type { AnimationParams } from './animationUtils';
import type { ExportFormat } from '../components/ExportMenu';
import { buildLottieJson } from './lottieBuilder';

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

// PNG export
async function exportAsPng(element: HTMLElement, filename: string): Promise<void> {
  element.classList.add('downloading');
  try {
    const canvas = await html2canvas(element, { backgroundColor: null, scale: 2 });
    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, `${filename}.png`);
    }, 'image/png');
  } finally {
    element.classList.remove('downloading');
  }
}

// SVG export
function exportAsSvg(element: HTMLElement, filename: string, palette: ColorPalette): void {
  const svgEl = element.querySelector('svg');
  if (!svgEl) return;

  const clone = svgEl.cloneNode(true) as SVGElement;
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  clone.setAttribute('width', '400');
  clone.setAttribute('height', '400');

  // Inline a background rect
  const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  bg.setAttribute('width', '200');
  bg.setAttribute('height', '200');
  bg.setAttribute('fill', palette.cardBg);
  bg.setAttribute('rx', '4');
  clone.insertBefore(bg, clone.firstChild);

  // Remove animation styles for static SVG
  clone.querySelectorAll('g').forEach(g => {
    g.removeAttribute('style');
    g.removeAttribute('class');
  });

  const svgString = new XMLSerializer().serializeToString(clone);
  const blob = new Blob([svgString], { type: 'image/svg+xml' });
  downloadBlob(blob, `${filename}.svg`);
}

// GIF export
async function exportAsGif(element: HTMLElement, filename: string, animationParams: AnimationParams): Promise<void> {
  const GIF = (await import('gif.js')).default;

  const frameCount = 16;
  const duration = animationParams.speed * 1000;
  const frameDelay = duration / frameCount;

  const gif = new GIF({
    workers: 2,
    quality: 10,
    width: 400,
    height: 400,
    workerScript: undefined,
  });

  // Capture frames by cycling through the animation
  for (let i = 0; i < frameCount; i++) {
    const canvas = await html2canvas(element, { backgroundColor: null, scale: 2 });

    // Resize to 400x400
    const resized = document.createElement('canvas');
    resized.width = 400;
    resized.height = 400;
    const ctx = resized.getContext('2d')!;
    ctx.drawImage(canvas, 0, 0, 400, 400);

    gif.addFrame(resized, { delay: frameDelay, copy: true });
  }

  return new Promise((resolve) => {
    gif.on('finished', (blob: Blob) => {
      downloadBlob(blob, `${filename}.gif`);
      resolve();
    });
    gif.render();
  });
}

// Lottie export
function exportAsLottie(
  element: HTMLElement,
  filename: string,
  palette: ColorPalette,
  animationParams: AnimationParams
): void {
  const svgEl = element.querySelector('svg');
  if (!svgEl) return;

  const json = buildLottieJson(svgEl, palette, animationParams);
  const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' });
  downloadBlob(blob, `${filename}.json`);
}

// Main export dispatcher
export async function exportCard(
  element: HTMLElement,
  filename: string,
  format: ExportFormat,
  palette: ColorPalette,
  animationParams: AnimationParams
): Promise<void> {
  switch (format) {
    case 'png':
      return exportAsPng(element, filename);
    case 'svg':
      return exportAsSvg(element, filename, palette);
    case 'gif':
      return exportAsGif(element, filename, animationParams);
    case 'lottie':
      return exportAsLottie(element, filename, palette, animationParams);
  }
}

export async function downloadAllCards(
  elements: HTMLElement[],
  names: string[],
  format: ExportFormat,
  palette: ColorPalette,
  animationParams: AnimationParams
): Promise<void> {
  for (let i = 0; i < elements.length; i++) {
    await exportCard(elements[i], names[i] || `illustra-${i + 1}`, format, palette, animationParams);
    await new Promise((r) => setTimeout(r, 300));
  }
}