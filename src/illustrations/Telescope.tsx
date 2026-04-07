import type { IllustrationProps } from './types';
import { getShapeStyle, DEFAULT_ANIMATION_PARAMS } from '../utils/animationUtils';

export default function Telescope({ primary, dark, light, complementary, animated = false, animationParams = DEFAULT_ANIMATION_PARAMS }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <g style={getShapeStyle(0, animationParams, animated)}>
        <rect x="40" y="60" width="80" height="35" rx="3" fill={primary} transform="rotate(-15 80 77)" />
      </g>
      <g style={getShapeStyle(1, animationParams, animated)}>
        <rect x="90" y="90" width="60" height="25" rx="3" fill={dark} opacity="0.5" transform="rotate(20 120 102)" />
      </g>
      <g style={getShapeStyle(2, animationParams, animated)}>
        <rect x="55" y="120" width="45" height="20" rx="2" fill={complementary} opacity="0.35" transform="rotate(-5 77 130)" />
      </g>
      <g style={getShapeStyle(3, animationParams, animated)}>
        <circle cx="150" cy="65" r="12" fill="none" stroke={dark} strokeWidth="2" />
        <circle cx="150" cy="65" r="4" fill={complementary} />
      </g>
    </svg>
  );
}