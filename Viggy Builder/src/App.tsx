import { useCallback, useEffect, useState } from "react";
import ColorField from "./components/ColorField";
import PartPicker from "./components/PartPicker";
import { HAIRLINE, LABEL, PANEL_BG, SECTION_LABEL, buttonStyle } from "./components/ui";
import Viggy from "./viggy/Viggy";
import { DEFAULT_CONFIG, randomConfig, type ViggyConfig } from "./viggy/compose";
import { COLOURWAYS, buildPalette } from "./viggy/palette";
import { BODY_STYLES, DECORATIONS, EYES, MOUTHS, SLOTS } from "./viggy/spec";
import { downloadPng } from "./utils/exportPng";
import { downloadSvg } from "./utils/exportSvg";
import { useHistory } from "./utils/useHistory";

const PNG_SIZES = [512, 1024, 2400] as const;

export default function App() {
  const { state: config, commit, undo, redo, canUndo, canRedo } = useHistory<ViggyConfig>(DEFAULT_CONFIG);
  const [transparent, setTransparent] = useState(false);
  const [pngSize, setPngSize] = useState<(typeof PNG_SIZES)[number]>(1024);

  const set = <K extends keyof ViggyConfig>(key: K, value: ViggyConfig[K]) =>
    commit((prev) => ({ ...prev, [key]: value }));

  /** Colour pickers fire continuously while dragging, so a run of them is one undo step. */
  const setColour = (key: keyof ViggyConfig, value: string) =>
    commit((prev) => ({ ...prev, [key]: value }), key);

  const randomize = useCallback(() => commit((prev) => randomConfig(prev, COLOURWAYS)), [commit]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key.toLowerCase() === "z") {
        e.preventDefault();
        if (e.shiftKey) redo();
        else undo();
        return;
      }
      if (mod && e.key.toLowerCase() === "y") {
        e.preventDefault();
        redo();
        return;
      }
      if (e.key.toLowerCase() === "r" && !mod) randomize();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [randomize, undo, redo]);

  const palette = buildPalette(config);
  const name = `viggy-${config.eyes}-${config.mouth}${config.decoration ? `-${config.decoration}` : ""}`;
  const activeColourway = COLOURWAYS.find(
    (c) => c.body === config.body && c.ink === config.ink && c.outline === config.outline && c.paper === config.paper,
  );

  return (
    <div style={{ display: "flex", height: "100vh", background: "#0C0C0C", color: "#fff", fontFamily: "Inter, system-ui, sans-serif" }}>
      {/* Stage */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <header style={{ padding: "18px 24px", display: "flex", alignItems: "baseline", gap: 12 }}>
          <h1 style={{ fontSize: 12, letterSpacing: "0.5em", textTransform: "uppercase", fontWeight: 600, margin: 0 }}>
            Viggy Builder
          </h1>
          <span style={{ ...LABEL, letterSpacing: "0.15em" }}>Viggle mascot kit</span>
        </header>

        <div style={{ flex: 1, display: "grid", placeItems: "center", padding: "0 24px 24px", minHeight: 0 }}>
          <div
            style={{
              width: "min(100%, 72vh)",
              aspectRatio: "1 / 1",
              borderRadius: 24,
              overflow: "hidden",
              background: transparent ? undefined : config.background,
              backgroundImage: transparent
                ? "conic-gradient(from 90deg, rgba(255,255,255,0.05) 25%, transparent 0 50%, rgba(255,255,255,0.05) 0 75%, transparent 0)"
                : undefined,
              backgroundSize: transparent ? "32px 32px" : undefined,
              boxShadow: "0 24px 60px rgba(0,0,0,0.45)",
              transition: "background 0.2s",
            }}
          >
            <Viggy config={config} style={{ display: "block", width: "100%", height: "100%" }} />
          </div>
        </div>

        <footer style={{ padding: "0 24px 22px", display: "flex", alignItems: "center", gap: 8 }}>
          <button onClick={randomize} style={{ ...buttonStyle(false), background: "rgba(255,255,255,0.1)", color: "#fff" }}>
            Randomize
          </button>
          <button onClick={() => commit(DEFAULT_CONFIG)} style={buttonStyle(false)}>
            Reset
          </button>
          <span style={{ width: 1, height: 16, background: "rgba(255,255,255,0.1)", margin: "0 2px" }} />
          <button onClick={undo} disabled={!canUndo} title="Undo (⌘Z)" style={buttonStyle(false, !canUndo)}>
            ↶ Undo
          </button>
          <button onClick={redo} disabled={!canRedo} title="Redo (⇧⌘Z)" style={buttonStyle(false, !canRedo)}>
            ↷ Redo
          </button>
          <span style={{ ...LABEL, marginLeft: 4, letterSpacing: "0.1em" }}>R to shuffle · ⌘Z to undo</span>
        </footer>
      </main>

      {/* Controls */}
      <aside
        style={{
          width: 360,
          flexShrink: 0,
          background: PANEL_BG,
          borderLeft: HAIRLINE,
          overflowY: "auto",
          padding: 24,
          display: "flex",
          flexDirection: "column",
          gap: 22,
        }}
      >
        <PartPicker
          label="Eyes"
          slot={SLOTS.eyes}
          variants={EYES}
          value={config.eyes}
          onChange={(id) => set("eyes", id!)}
          palette={palette}
        />

        <PartPicker
          label="Mouth"
          slot={SLOTS.mouth}
          variants={MOUTHS}
          value={config.mouth}
          onChange={(id) => set("mouth", id!)}
          palette={palette}
        />

        <PartPicker
          label="Accessory"
          slot={SLOTS.decoration}
          variants={DECORATIONS}
          value={config.decoration}
          onChange={(id) => set("decoration", id)}
          palette={palette}
          allowNone
        />

        <section style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <span style={SECTION_LABEL}>Body</span>
          <div style={{ display: "flex", gap: 4 }}>
            {BODY_STYLES.map((style) => (
              <button key={style.id} onClick={() => set("bodyStyle", style.id)} style={buttonStyle(config.bodyStyle === style.id)}>
                {style.label}
              </button>
            ))}
          </div>
        </section>

        <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <span style={SECTION_LABEL}>Colour</span>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 6 }}>
            {COLOURWAYS.map((c) => (
              <button
                key={c.id}
                onClick={() => commit((prev) => ({ ...prev, body: c.body, ink: c.ink, outline: c.outline, paper: c.paper, background: c.background }))}
                title={c.label}
                aria-label={c.label}
                aria-pressed={activeColourway?.id === c.id}
                style={{
                  width: "100%",
                  aspectRatio: "1 / 1",
                  borderRadius: 8,
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  background: c.body,
                  boxShadow: `inset 0 -10px 0 0 ${c.ink}`,
                  outline: activeColourway?.id === c.id ? "2px solid rgba(255,255,255,0.9)" : "1px solid rgba(255,255,255,0.12)",
                  outlineOffset: activeColourway?.id === c.id ? 1 : 0,
                }}
              />
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <ColorField label="Body" value={config.body} onChange={(v) => setColour("body", v)} />
            <ColorField label="Ink" value={config.ink} onChange={(v) => setColour("ink", v)} />
            <ColorField label="Outline" value={config.outline} onChange={(v) => setColour("outline", v)} />
            <ColorField label="Highlight" value={config.paper} onChange={(v) => setColour("paper", v)} />
            <ColorField label="Backdrop" value={config.background} onChange={(v) => setColour("background", v)} />
          </div>
        </section>

        <section style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <span style={SECTION_LABEL}>Export</span>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ ...LABEL, flex: 1 }}>Transparent</span>
            <button onClick={() => setTransparent((t) => !t)} style={buttonStyle(transparent)}>
              {transparent ? "On" : "Off"}
            </button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ ...LABEL, flex: 1 }}>PNG size</span>
            <div style={{ display: "flex", gap: 4 }}>
              {PNG_SIZES.map((s) => (
                <button key={s} onClick={() => setPngSize(s)} style={buttonStyle(pngSize === s)}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            <button onClick={() => downloadPng(config, name, transparent, pngSize)} style={{ ...buttonStyle(false), flex: 1 }}>
              Download PNG
            </button>
            <button onClick={() => downloadSvg(config, name, transparent)} style={{ ...buttonStyle(false), flex: 1 }}>
              SVG
            </button>
          </div>
        </section>
      </aside>
    </div>
  );
}
