import type { IllustrationProps } from './types';
import { getShapeStyle } from '../utils/animationUtils';
import { DEFAULT_ANIMATION_PARAMS } from '../utils/animationUtils';

export default function Compass({ primary, dark, light, complementary, animated = false, animationParams = DEFAULT_ANIMATION_PARAMS }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <g style={getShapeStyle(0, animationParams, animated)}>
        <circle cx="100" cy="100" r="65" fill="none" stroke={primary} strokeWidth="3" />
      </g>
      <g style={getShapeStyle(1, animationParams, animated)}>
        <circle cx="100" cy="100" r="40" fill="none" stroke={dark} strokeWidth="1.5" strokeDasharray="8 6" />
      </g>
      <g style={getShapeStyle(2, animationParams, animated)}>
        <line x1="30" y1="30" x2="170" y2="170" stroke={complementary} strokeWidth="2.5" />
        <line x1="170" y1="30" x2="30" y2="170" stroke={complementary} strokeWidth="2.5" />
      </g>
      <g style={getShapeStyle(3, animationParams, animated)}>
        <circle cx="100" cy="100" r="8" fill={dark} />
        <circle cx="100" cy="100" r="3" fill={light} />
      </g>
    </svg>
  );
}