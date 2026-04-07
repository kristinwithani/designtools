import type { IllustrationProps } from './types';
import { getShapeStyle, DEFAULT_ANIMATION_PARAMS } from '../utils/animationUtils';

export default function Magnifier({ primary, dark, light, complementary, animated = false, animationParams = DEFAULT_ANIMATION_PARAMS }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <g style={getShapeStyle(0, animationParams, animated)}>
        <circle cx="85" cy="85" r="45" fill="none" stroke={primary} strokeWidth="3.5" />
      </g>
      <g style={getShapeStyle(1, animationParams, animated)}>
        <circle cx="130" cy="130" r="22" fill="none" stroke={dark} strokeWidth="2" opacity="0.4" />
      </g>
      <g style={getShapeStyle(2, animationParams, animated)}>
        <line x1="120" y1="120" x2="165" y2="165" stroke={complementary} strokeWidth="3" strokeLinecap="round" />
      </g>
      <g style={getShapeStyle(3, animationParams, animated)}>
        <circle cx="85" cy="85" r="18" fill={dark} opacity="0.08" />
      </g>
    </svg>
  );
}