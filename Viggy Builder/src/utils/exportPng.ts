import type { ViggyConfig } from "../viggy/compose";
import { buildSvgString, download } from "./exportSvg";

export function downloadPng(config: ViggyConfig, name: string, transparent: boolean, size: number) {
  const svg = buildSvgString(config, { transparent });
  const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }));

  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0, size, size);
    URL.revokeObjectURL(url);

    canvas.toBlob((blob) => {
      if (blob) download(blob, `${name}.png`);
    }, "image/png");
  };
  img.src = url;
}
