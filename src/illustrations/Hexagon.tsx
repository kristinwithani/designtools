import type { IllustrationProps } from './types';
import { getShapeStyle, DEFAULT_ANIMATION_PARAMS } from '../utils/animationUtils';

export default function Hexagon({ primary, dark, light, complementary, animated = false, animationParams = DEFAULT_ANIMATION_PARAMS }: IllustrationProps) {
  const hex = (r: number) => Array.from({ length: 6 }, (_, i) => {
    const a = (i * 60 - 90) * Math.PI / 180;
    return `${100 + r * Math.cos(a)},${100 + r * Math.sin(a)}`;
  }).join(' ');

  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <g style={getShapeStyle(0, animationParams, animated)}>
        <polygon points={hex(55)} fill={primary} opacity="0.3" />
      </g>
      <g style={getShapeStyle(1, animationParams, animated)}>
        <polygon points={hex(38)} fill="none" stroke={dark} strokeWidth="2" />
      </g>
      <g style={getShapeStyle(2, animationParams, animated)}>
        <polygon points={hex(20)} fill={complementary} opacity="0.35" />
      </g>
      <g style={getShapeStyle(3, animationParams, animated)}>
        <circle cx="100" cy="100" r="5" fill={dark} opacity="0.3" />
      </g>
    </svg>
  );
}