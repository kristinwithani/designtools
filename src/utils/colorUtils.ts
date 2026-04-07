export type ThemeMode = 'dark' | 'light';

export interface ColorPalette {
  primary: string;
  cardBg: string;
  dark: string;
  appBg: string;
  complementary: string;
  white: string;
  black: string;
  mode: ThemeMode;
}

export function getPalette(hue: number, mode: ThemeMode = 'dark'): ColorPalette {
  if (mode === 'light') {
    return {
      primary: `hsl(${hue}, 65%, 45%)`,
      cardBg: `hsl(${hue}, 8%, 96%)`,
      dark: `hsl(${hue}, 12%, 25%)`,
      appBg: `hsl(${hue}, 5%, 92%)`,
      complementary: `hsl(${(hue + 180) % 360}, 45%, 45%)`,
      white: `hsl(${hue}, 5%, 99%)`,
      black: `hsl(${hue}, 8%, 15%)`,
      mode,
    };
  }
  return {
    primary: `hsl(${hue}, 70%, 55%)`,
    cardBg: `hsl(${hue}, 5%, 12%)`,
    dark: `hsl(${hue}, 10%, 75%)`,
    appBg: `hsl(${hue}, 3%, 7%)`,
    complementary: `hsl(${(hue + 180) % 360}, 50%, 50%)`,
    white: `hsl(${hue}, 5%, 88%)`,
    black: `hsl(${hue}, 5%, 4%)`,
    mode,
  };
}

export function updateCSSVariables(hue: number, mode: ThemeMode = 'dark'): void {
  const palette = getPalette(hue, mode);
  const root = document.documentElement;
  root.style.setProperty('--color-primary', palette.primary);
  root.style.setProperty('--color-card-bg', palette.cardBg);
  root.style.setProperty('--color-dark', palette.dark);
  root.style.setProperty('--color-app-bg', palette.appBg);
  root.style.setProperty('--color-complementary', palette.complementary);
  root.style.setProperty('--color-white', palette.white);
  root.style.setProperty('--color-black', palette.black);

  // Theme-aware UI tokens
  if (mode === 'light') {
    root.style.setProperty('--border-alpha', '0.1');
    root.style.setProperty('--border-color', 'rgba(0, 0, 0, 0.08)');
    root.style.setProperty('--hover-glow', 'rgba(0, 0, 0, 0.06)');
    root.style.setProperty('--overlay-bg', 'rgba(255, 255, 255, 0.9)');
    root.style.setProperty('--dropdown-bg', palette.white);
    root.style.setProperty('--text-muted', 'rgba(0, 0, 0, 0.4)');
  } else {
    root.style.setProperty('--border-alpha', '0.06');
    root.style.setProperty('--border-color', 'rgba(255, 255, 255, 0.06)');
    root.style.setProperty('--hover-glow', 'rgba(0, 255, 100, 0.04)');
    root.style.setProperty('--overlay-bg', 'rgba(0, 0, 0, 0.9)');
    root.style.setProperty('--dropdown-bg', palette.black);
    root.style.setProperty('--text-muted', 'rgba(255, 255, 255, 0.4)');
  }
}

export function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}