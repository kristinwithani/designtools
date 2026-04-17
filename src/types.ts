export interface Voxel {
  x: number;
  y: number;
  z: number;
  color: string; // HSL string e.g. "hsl(30, 60%, 50%)"
}

export interface GenerationRules {
  symmetryX: boolean;
  symmetryY: boolean;
  symmetryZ: boolean;
  heightBias: number;    // 0=flat/wide, 1=tall/thin
  maxColors: number;     // 1-5 distinct hues per object
  gradientDir: "none" | "vertical" | "radial";
  contrast: number;      // 0-1
  organic: number;       // 0=geometric, 1=organic
}

export interface RenderConfig {
  gridGap: number;
  fitFactor: number;
  maxCubeSize: number;
  cardPadding: number;
  cardRadius: number;
  cardBgOpacity: number;
  cardHoverOpacity: number;
  strokeWidth: number;
  topLightness: number;
  leftDarkness: number;
  strokeDarkness: number;
  strokeDesaturation: number;
  flickerInterval: number;
  flickerFraction: number;
  flickerTransition: number;
}

export interface GeneratorParams {
  cubeCount: number;
  seed: number;
  palette: string;
  rules: GenerationRules;
}

export interface GeneratedObject {
  name: string;
  voxels: Voxel[];
}

export type ObjectGenerator = (params: GeneratorParams) => GeneratedObject;
