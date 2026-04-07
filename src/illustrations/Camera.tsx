import type { IllustrationProps } from './types';
import { getShapeStyle, DEFAULT_ANIMATION_PARAMS } from '../utils/animationUtils';

export default function Camera({ primary, dark, light, complementary, animated = false, animationParams = DEFAULT_ANIMATION_PARAMS }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <g style={getShapeStyle(0, animationParams, animated)}>
        <rect x="45" y="70" width="110" height="75" rx="6" fill={primary} opacity="0.35" />
      </g>
      <g style={getShapeStyle(1, animationParams, animated)}>
        <circle cx="100" cy="107" r="25" fill="none" stroke={dark} strokeWidth="2.5" />
      </g>
      <g style={getShapeStyle(2, animationParams, animated)}>
        <circle cx="100" cy="107" r="12" fill={complementary} opacity="0.4" />
      </g>
      <g style={getShapeStyle(3, animationParams, animated)}>
        <rect x="80" y="58" width="40" height="14" rx="3" fill={dark} opacity="0.25" />
        <circle cx="140" cy="82" r="4" fill={complementary} opacity="0.5" />
      </g>
    </svg>
  );
}