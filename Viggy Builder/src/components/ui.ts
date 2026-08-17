import type { CSSProperties } from "react";

/** Shared control tokens, matching the rest of the design-tools suite. */
export const SECTION_LABEL: CSSProperties = {
  fontSize: 9,
  color: "rgba(255,255,255,0.3)",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  fontWeight: 600,
};

export const LABEL: CSSProperties = {
  fontSize: 10,
  color: "rgba(255,255,255,0.45)",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  fontWeight: 500,
};

export const PANEL_BG = "#141414";
export const HAIRLINE = "1px solid rgba(255,255,255,0.07)";

export function buttonStyle(active: boolean, disabled = false): CSSProperties {
  return {
    height: 24,
    padding: "0 10px",
    fontSize: 10,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    fontWeight: 500,
    borderRadius: 5,
    border: "none",
    cursor: disabled ? "default" : "pointer",
    transition: "all 0.15s",
    background: active ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.04)",
    color: active ? "#fff" : "rgba(255,255,255,0.45)",
    opacity: disabled ? 0.35 : 1,
  };
}
