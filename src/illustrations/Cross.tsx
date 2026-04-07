import type { IllustrationProps } from './types';
import { getShapeStyle, DEFAULT_ANIMATION_PARAMS } from '../utils/animationUtils';

export default function Cross({ primary, dark, light, complementary, animated = false, animationParams = DEFAULT_ANIMATION_PARAMS }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <g style={getShapeStyle(0, animationParams, animated)}>
        <rect x="85" y="40" width="30" height="120" rx="4" fill={primary} opacity="0.4" />
      </g>
      <g style={getShapeStyle(1, animationParams, animated)}>
        <rect x="40" y="85" width="120" height="30" rx="4" fill={primary} opacity="0.4" />
      </g>
      <g style={getShapeStyle(2, animationParams, animated)}>
        <circle cx="100" cy="100" r="15" fill="none" stroke={dark} strokeWidth="1.5" strokeDasharray="4 3" />
      </g>
      <g style={getShapeStyle(3, animationParams, animated)}>
        <circle cx="100" cy="100" r="5" fill={complementary} opacity="0.6" />
      </g>
    </svg>
  );
}