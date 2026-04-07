export interface AnimationParams {
  enabled: boolean;
  speed: number;        // 0.5–3s cycle duration
  intensity: number;    // 1–8 degrees of rotation
  staggerOffset: number; // 0–200ms delay between shapes
}

export const DEFAULT_ANIMATION_PARAMS: AnimationParams = {
  enabled: false,
  speed: 1.5,
  intensity: 3,
  staggerOffset: 80,
};

export function getShapeStyle(
  index: number,
  params: AnimationParams,
  animated: boolean
): React.CSSProperties {
  if (!animated) return {};
  return {
    animation: `wiggle ${params.speed}s ease-in-out infinite`,
    animationDelay: `${index * params.staggerOffset}ms`,
    transformOrigin: 'center center',
    ['--wiggle-intensity' as string]: `${params.intensity}deg`,
  };
}