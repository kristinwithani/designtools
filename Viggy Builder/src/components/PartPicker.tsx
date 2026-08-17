import type { ReactNode } from "react";
import { PartThumb } from "../viggy/Viggy";
import { placeVariant, variantBounds, type Slot, type Variant } from "../viggy/spec";
import type { Palette } from "../viggy/palette";
import { SECTION_LABEL } from "./ui";

const THUMB = 48;

function Tile({ selected, background, onClick, title, children }: {
  selected: boolean;
  background: string;
  onClick: () => void;
  title: string;
  children: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      aria-label={title}
      aria-pressed={selected}
      style={{
        width: "100%",
        aspectRatio: "1 / 1",
        display: "grid",
        placeItems: "center",
        borderRadius: 8,
        background,
        cursor: "pointer",
        padding: 0,
        transition: "box-shadow 0.15s, transform 0.15s",
        border: "none",
        outline: selected ? "2px solid rgba(255,255,255,0.9)" : "1px solid rgba(255,255,255,0.12)",
        outlineOffset: selected ? 1 : 0,
        transform: selected ? "translateY(-1px)" : undefined,
      }}
    >
      {children}
    </button>
  );
}

export default function PartPicker({ label, slot, variants, value, onChange, palette, allowNone }: {
  label: string;
  slot: Slot;
  variants: Variant[];
  value: string | null;
  onChange: (id: string | null) => void;
  palette: Palette;
  allowNone?: boolean;
}) {
  return (
    <section style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <span style={SECTION_LABEL}>{label}</span>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
        {allowNone && (
          <Tile selected={value === null} background="rgba(255,255,255,0.04)" onClick={() => onChange(null)} title="None">
            <span style={{ fontSize: 10, letterSpacing: "0.12em", color: "rgba(255,255,255,0.4)" }}>NONE</span>
          </Tile>
        )}
        {variants.map((variant) => (
          <Tile
            key={variant.id}
            selected={value === variant.id}
            background={palette.body}
            onClick={() => onChange(variant.id)}
            title={variant.label}
          >
            <PartThumb
              layers={placeVariant(slot, variant, variant.id)}
              bounds={variantBounds(slot, variant)}
              palette={palette}
              size={THUMB}
            />
          </Tile>
        ))}
      </div>
    </section>
  );
}
