import type { Voxel } from "../types";
import { buildSvgString } from "./exportSvg";

export function downloadPng(voxels: Voxel[], cubeSize: number, name: string) {
  const svg = buildSvgString(voxels, cubeSize);
  const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const img = new Image();
  img.onload = () => {
    const scale = 2; // 2x resolution
    const canvas = document.createElement("canvas");
    canvas.width = img.width * scale;
    canvas.height = img.height * scale;
    const ctx = canvas.getContext("2d")!;
    ctx.scale(scale, scale);
    ctx.drawImage(img, 0, 0);
    URL.revokeObjectURL(url);

    canvas.toBlob((pngBlob) => {
      if (!pngBlob) return;
      const pngUrl = URL.createObjectURL(pngBlob);
      const a = document.createElement("a");
      a.href = pngUrl;
      a.download = `${name}.png`;
      a.click();
      URL.revokeObjectURL(pngUrl);
    }, "image/png");
  };
  img.src = url;
}
