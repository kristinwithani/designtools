import type { GeneratorParams, GeneratedObject } from "../types";
import { createRng } from "../utils/random";
import { parseHSL } from "../utils/scenemath";
import { applyGenerationRules, DEFAULT_RULES } from "../utils/voxelHelpers";
import { generateRandomShape } from "./algorithmic";

export function generateObjects(
  count: number,
  params: GeneratorParams
): GeneratedObject[] {
  const rules = params.rules ?? DEFAULT_RULES;

  return Array.from({ length: count }, (_, i) => {
    const subSeed = params.seed + i * 7919 + i * 31;
    const obj = generateRandomShape({ ...params, seed: subSeed, rules });

    // Apply generation rules as post-processing
    const rulesRng = createRng(subSeed + 999);
    // Separate RNG for color — stable across shape parameter changes, only depends on seed + palette
    const colorRng = createRng(subSeed + 1337);
    // Every object uses the full maxColors count — so the Hues parameter affects every object equally
    obj.voxels = applyGenerationRules(obj.voxels, params.cubeCount, rules, rulesRng, params.palette, colorRng);

    // Force grayscale for B&W palette
    if (params.palette === "bw") {
      obj.voxels = obj.voxels.map((v) => {
        const [, , l] = parseHSL(v.color);
        return { ...v, color: `hsl(0, 0%, ${l}%)` };
      });
    }

    return obj;
  });
}
