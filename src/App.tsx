import { useMemo, useState } from "react";
import VoxelGrid from "./components/VoxelGrid";
import { generateObjects } from "./generators";
import { PALETTES, type PaletteType } from "./utils/palette";
import { DEFAULT_RULES } from "./utils/voxelHelpers";
import type { RenderConfig, GenerationRules } from "./types";

const MIN_CUBES = 8;
const MAX_CUBES = 150;
const GRID_SIZE = 4;

const BASE_RENDER_CONFIG: RenderConfig = {
  gridGap: 16, fitFactor: 0.8, maxCubeSize: 40,
  cardPadding: 12, cardRadius: 12, cardBgOpacity: 0.05, cardHoverOpacity: 0.08,
  strokeWidth: 0.5, topLightness: 12, leftDarkness: 12, strokeDarkness: 20, strokeDesaturation: 10,
  flickerInterval: 80, flickerFraction: 0.2, flickerTransition: 0,
};

// --- Unified design tokens ---
const LABEL: React.CSSProperties = {
  fontSize: 10,
  color: "rgba(255,255,255,0.45)",
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  fontWeight: 500,
  minWidth: 68,
};
const VALUE: React.CSSProperties = {
  fontSize: 10,
  color: "rgba(255,255,255,0.35)",
  width: 36,
  textAlign: "right",
  fontVariantNumeric: "tabular-nums",
};
const SECTION_LABEL: React.CSSProperties = {
  fontSize: 9,
  color: "rgba(255,255,255,0.25)",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  fontWeight: 600,
};
const CONTROL_GAP = 10;
const SLIDER_WIDTH = 96;
const BTN_SIZE = 22;

// --- Unified control components ---

function Slider({ label, value, min, max, step, onChange, format }: {
  label: string; value: number; min: number; max: number; step: number;
  onChange: (v: number) => void; format?: (v: number) => string;
}) {
  return (
    <div className="flex items-center" style={{ gap: CONTROL_GAP }}>
      <span style={LABEL}>{label}</span>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="accent-white/50" style={{ width: SLIDER_WIDTH, height: 2 }} />
      <span style={VALUE}>{format ? format(value) : (step < 1 ? value.toFixed(2) : value)}</span>
    </div>
  );
}

function ButtonGroup<T extends string | number>({ label, value, options, onChange, renderLabel, compact, alignTop }: {
  label: string; value: T; options: readonly T[]; onChange: (v: T) => void;
  renderLabel?: (o: T) => string; compact?: boolean; alignTop?: boolean;
}) {
  return (
    <div className="flex" style={{ gap: CONTROL_GAP, alignItems: alignTop ? "flex-start" : "center" }}>
      <span style={{ ...LABEL, lineHeight: `${BTN_SIZE}px` }}>{label}</span>
      <div className="flex flex-wrap" style={{ gap: 2 }}>
        {options.map((opt) => {
          const active = value === opt;
          const text = renderLabel ? renderLabel(opt) : String(opt);
          return (
            <button key={String(opt)} onClick={() => onChange(opt)}
              style={{
                height: BTN_SIZE,
                minWidth: compact ? BTN_SIZE : undefined,
                padding: compact ? 0 : "0 8px",
                fontSize: 10,
                borderRadius: 4,
                transition: "all 0.15s",
                background: active ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.03)",
                color: active ? "#fff" : "rgba(255,255,255,0.45)",
                border: "none",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}>
              {text}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ToggleGroup({ label, values, onToggle, options }: {
  label: string; values: Record<string, boolean>;
  options: readonly string[]; onToggle: (key: string) => void;
}) {
  return (
    <div className="flex items-center" style={{ gap: CONTROL_GAP }}>
      <span style={LABEL}>{label}</span>
      <div className="flex" style={{ gap: 2 }}>
        {options.map((opt) => {
          const active = values[opt];
          return (
            <button key={opt} onClick={() => onToggle(opt)}
              style={{
                width: BTN_SIZE,
                height: BTN_SIZE,
                fontSize: 10,
                fontWeight: 600,
                borderRadius: 4,
                transition: "all 0.15s",
                background: active ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.03)",
                color: active ? "#fff" : "rgba(255,255,255,0.45)",
                border: "none",
                cursor: "pointer",
              }}>
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: () => void }) {
  return (
    <div className="flex items-center" style={{ gap: CONTROL_GAP }}>
      <span style={LABEL}>{label}</span>
      <button
        onClick={onChange}
        className="relative inline-flex rounded-full transition-colors"
        style={{
          width: 28,
          height: 14,
          background: value ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.10)",
          border: "none",
          cursor: "pointer",
          padding: 0,
        }}
      >
        <span
          className="absolute rounded-full transition-all"
          style={{
            top: 2,
            left: 2,
            width: 10,
            height: 10,
            background: value ? "#fff" : "rgba(255,255,255,0.4)",
            transform: value ? "translateX(14px)" : "none",
          }}
        />
      </button>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col" style={{ gap: 10 }}>
      <span style={SECTION_LABEL}>{title}</span>
      <div className="flex flex-col" style={{ gap: 8 }}>
        {children}
      </div>
    </div>
  );
}

function SectionDivider() {
  return <span style={{ height: 1, width: "100%", background: "rgba(255,255,255,0.06)" }} />;
}

// --- App ---

export default function App() {
  const [cubeCount, setCubeCount] = useState(50);
  const [seed, setSeed] = useState(42);
  const [palette, setPalette] = useState<PaletteType>("random");
  const [animating, setAnimating] = useState(false);
  const [animSpeed, setAnimSpeed] = useState(80);
  const [animFraction, setAnimFraction] = useState(0.2);
  const [rules, setRules] = useState<GenerationRules>({ ...DEFAULT_RULES });

  const renderConfig: RenderConfig = {
    ...BASE_RENDER_CONFIG,
    flickerInterval: animSpeed,
    flickerFraction: animFraction,
    flickerTransition: 0,
  };

  const setRule = <K extends keyof GenerationRules>(key: K, val: GenerationRules[K]) =>
    setRules((r) => ({ ...r, [key]: val }));

  const objectCount = GRID_SIZE * GRID_SIZE;

  const objects = useMemo(
    () => generateObjects(objectCount, { cubeCount, seed, palette, rules }),
    [cubeCount, seed, palette, objectCount, rules]
  );

  return (
    <div className="min-h-screen flex bg-black text-white">
      {/* Sidebar */}
      <aside
        className="flex-shrink-0 border-r border-white/[0.06] overflow-y-auto"
        style={{ width: 300, padding: "24px 20px", height: "100vh", position: "sticky", top: 0 }}
      >
        <div className="flex flex-col" style={{ gap: 24 }}>
          {/* Header */}
          <div className="flex flex-col" style={{ gap: 4 }}>
            <h1 className="text-xl font-semibold uppercase" style={{ letterSpacing: "6pt" }}>Cubescape</h1>
            <p className="text-[10px] text-white/25 uppercase tracking-[0.2em]">Voxel Generator</p>
          </div>

          <SectionDivider />

          <Section title="Output">
            <Slider label="Cubes" value={cubeCount} min={MIN_CUBES} max={MAX_CUBES} step={1} onChange={setCubeCount} format={(v) => String(v)} />
            <Toggle label="Animate" value={animating} onChange={() => setAnimating(!animating)} />
            {animating && (
              <>
                <Slider label="Speed" value={420 - animSpeed} min={20} max={400} step={10}
                  onChange={(v) => setAnimSpeed(420 - v)} format={() => `${animSpeed}ms`} />
                <Slider label="Amount" value={animFraction} min={0.05} max={0.8} step={0.05}
                  onChange={setAnimFraction} format={(v) => `${Math.round(v * 100)}%`} />
              </>
            )}
          </Section>

          <SectionDivider />

          <Section title="Shape">
            <ToggleGroup label="Mirror" values={{ X: rules.symmetryX, Y: rules.symmetryY, Z: rules.symmetryZ }}
              options={["X", "Y", "Z"]}
              onToggle={(axis) => setRule(`symmetry${axis}` as keyof GenerationRules, !rules[`symmetry${axis}` as "symmetryX"] as never)} />
            <Slider label="Height" value={rules.heightBias} min={0} max={1} step={0.05} onChange={(v) => setRule("heightBias", v)} />
            <Slider label="Organic" value={rules.organic} min={0} max={1} step={0.05} onChange={(v) => setRule("organic", v)} />
          </Section>

          <SectionDivider />

          <Section title="Color">
            <ButtonGroup label="Palette" value={palette} options={PALETTES.map(p => p.value) as readonly PaletteType[]} onChange={setPalette} renderLabel={(v) => PALETTES.find(p => p.value === v)?.label ?? String(v)} alignTop />
            <ButtonGroup label="Hues" value={rules.maxColors} options={[1, 2, 3, 4, 5] as const} onChange={(n) => setRule("maxColors", n)} compact />
            <ButtonGroup label="Gradient" value={rules.gradientDir} options={["none", "vertical", "radial"] as const}
              onChange={(v) => setRule("gradientDir", v as GenerationRules["gradientDir"])} />
            <Slider label="Contrast" value={rules.contrast} min={0} max={1} step={0.05} onChange={(v) => setRule("contrast", v)} />
          </Section>

          <SectionDivider />

          <button
            onClick={() => setSeed(Date.now())}
            className="transition-all"
            style={{
              padding: "10px 0",
              fontSize: 10,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontWeight: 500,
              color: "#000",
              background: "rgba(255,255,255,0.9)",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            Regenerate
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex items-start justify-center" style={{ padding: "48px 32px" }}>
        <VoxelGrid objects={objects} cols={GRID_SIZE} animating={animating} rc={renderConfig} />
      </main>
    </div>
  );
}
