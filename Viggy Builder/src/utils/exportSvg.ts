import { composeLayers, type ViggyConfig } from "../viggy/compose";
import { buildPalette } from "../viggy/palette";
import { CANVAS } from "../viggy/spec";

export function buildSvgString(config: ViggyConfig, { transparent }: { transparent: boolean }): string {
  const palette = buildPalette(config);
  const groups = composeLayers(config)
    .map((layer) => {
      const paths = layer.paths
        .map((p) => `    <path d="${p.d}" fill="${palette[p.fill]}"${p.fillRule ? ` fill-rule="${p.fillRule}"` : ""}/>`)
        .join("\n");
      return `  <g transform="${layer.transform}">\n${paths}\n  </g>`;
    })
    .join("\n");
  const backdrop = transparent ? "" : `  <rect width="${CANVAS}" height="${CANVAS}" fill="${config.background}"/>\n`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${CANVAS} ${CANVAS}" width="${CANVAS}" height="${CANVAS}">
${backdrop}${groups}
</svg>
`;
}

function download(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function downloadSvg(config: ViggyConfig, name: string, transparent: boolean) {
  const svg = buildSvgString(config, { transparent });
  download(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }), `${name}.svg`);
}

export { download };
