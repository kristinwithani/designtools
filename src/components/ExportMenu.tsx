import { useState, useRef, useEffect } from "react";
import type { Voxel } from "../types";
import { downloadSvg } from "../utils/exportSvg";
import { downloadPng } from "../utils/exportPng";
import { downloadLottie } from "../utils/exportLottie";

interface ExportMenuProps {
  voxels: Voxel[];
  cubeSize: number;
  name: string;
}

export default function ExportMenu({ voxels, cubeSize, name }: ExportMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const slug = name.toLowerCase().replace(/\s+/g, "-");

  return (
    <div ref={ref} className="absolute top-2 right-2 z-10">
      <button
        onClick={() => setOpen(!open)}
        className="w-7 h-7 flex items-center justify-center rounded-md bg-black/50 hover:bg-black/70 text-white/60 hover:text-white transition-colors text-xs"
        title="Export"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 1v8M3.5 5.5L7 9l3.5-3.5M2 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {open && (
        <div className="absolute top-8 right-0 bg-neutral-900 border border-white/10 rounded-lg shadow-xl overflow-hidden min-w-[100px]">
          <button
            onClick={() => { downloadPng(voxels, cubeSize, slug); setOpen(false); }}
            className="w-full px-3 py-1.5 text-xs text-white/70 hover:bg-white/10 hover:text-white text-left transition-colors"
          >
            PNG
          </button>
          <button
            onClick={() => { downloadSvg(voxels, cubeSize, slug); setOpen(false); }}
            className="w-full px-3 py-1.5 text-xs text-white/70 hover:bg-white/10 hover:text-white text-left transition-colors"
          >
            SVG
          </button>
          <button
            onClick={() => { downloadLottie(voxels, cubeSize, slug); setOpen(false); }}
            className="w-full px-3 py-1.5 text-xs text-white/70 hover:bg-white/10 hover:text-white text-left transition-colors"
          >
            Lottie
          </button>
        </div>
      )}
    </div>
  );
}
