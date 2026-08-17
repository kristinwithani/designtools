import { LABEL } from "./ui";

export default function ColorField({ label, value, onChange }: {
  label: string;
  value: string;
  onChange: (hex: string) => void;
}) {
  return (
    <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
      <span
        style={{
          width: 22,
          height: 22,
          borderRadius: 5,
          background: value,
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.15)",
          flexShrink: 0,
        }}
      />
      <span style={{ ...LABEL, flex: 1 }}>{label}</span>
      <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", fontVariantNumeric: "tabular-nums" }}>
        {value.toUpperCase()}
      </span>
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: 0, height: 0, opacity: 0, position: "absolute", pointerEvents: "none" }}
      />
    </label>
  );
}
