export type AnimationMode = 'wiggle' | 'float' | 'pulse' | 'spin';
export type AnimationEasing = 'ease-in-out' | 'linear' | 'ease-in' | 'steps(6)';

export interface AnimationParams {
  enabled: boolean;
  speed: number;          // 0.5–3s cycle duration
  intensity: number;      // 1–15 degrees of rotation
  staggerOffset: number;  // 0–200ms delay between shapes
  mode: AnimationMode;
  drift: number;          // 0–15px vertical float
  scale: number;          // 0–0.3 scale pulse amount
  opacity: number;        // 0–0.5 opacity fluctuation
  easing: AnimationEasing;
}

export const DEFAULT_ANIMATION_PARAMS: AnimationParams = {
  enabled: false,
  speed: 1.5,
  intensity: 5,
  staggerOffset: 80,
  mode: 'wiggle',
  drift: 8,
  scale: 0.15,
  opacity: 0,
  easing: 'ease-in-out',
};

export function getShapeStyle(
  index: number,
  params: AnimationParams,
  animated: boolean
): React.CSSProperties {
  if (!animated) return {};

  const delay = `${index * params.staggerOffset}ms`;
  const duration = `${params.speed}s`;
  const easing = params.easing;

  // Determine which CSS variables to set based on mode
  // wiggle: rotation via intensity + drift + scale all combined
  // float: drift only (no rotation), + scale
  // pulse: scale only (no rotation, no drift)
  // spin: continuous rotation + drift + scale

  const wiggleIntensity = params.mode === 'wiggle' ? params.intensity : 0;
  const driftAmount = (params.mode === 'float' || params.mode === 'wiggle' || params.mode === 'spin')
    ? params.drift : 0;
  const scaleAmount = params.scale;

  const animName = params.mode === 'spin' ? 'spin' : 'shape-motion';
  // Bake delay into each animation shorthand to avoid mixing shorthand + longhand
  const animations = [`${animName} ${duration} ${easing} ${delay} infinite`];

  if (params.opacity > 0) {
    animations.push(`fade ${duration} ${easing} ${delay} infinite`);
  }

  return {
    animation: animations.join(', '),
    transformOrigin: 'center center',
    ['--wiggle-intensity' as string]: `${wiggleIntensity}deg`,
    ['--drift-amount' as string]: `${driftAmount}px`,
    ['--scale-amount' as string]: `${scaleAmount}`,
    ['--opacity-min' as string]: `${1 - params.opacity}`,
    ['--opacity-range' as string]: `${params.opacity}`,
  };
}